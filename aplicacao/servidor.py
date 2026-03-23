from pathlib import Path

from flask import Flask, jsonify, render_template, request
from werkzeug.exceptions import HTTPException

from aplicacao.armazenamento import Armazenamento
from aplicacao.configuracao import Configuracao
from aplicacao.executor_robot import ExecutorRobot
from aplicacao.monitoramento import AgendadorMonitoramento
from aplicacao.servico_steam import ServicoSteam


def criar_aplicacao(raiz):
    raiz = Path(raiz).resolve()
    configuracao = Configuracao(raiz / "dados" / "configuracao.json")
    configuracao.garantir()
    armazenamento = Armazenamento(raiz / "dados" / "steampricewatcher.db")
    executor_robot = ExecutorRobot(
        raiz / "robos" / "coletar_preco_steam.robot",
        raiz / "dados" / "saidas_robot",
    )
    servico = ServicoSteam(armazenamento, executor_robot, configuracao)
    agendador = AgendadorMonitoramento(servico, configuracao)

    aplicacao = Flask(
        __name__,
        template_folder=str(raiz / "paginas"),
        static_folder=str(raiz / "assets"),
        static_url_path="/assets",
    )

    aplicacao.config["configuracao"] = configuracao
    aplicacao.config["armazenamento"] = armazenamento
    aplicacao.config["servico"] = servico
    aplicacao.config["agendador"] = agendador

    @aplicacao.get("/")
    def inicio():
        return render_template("pagina_inicial.html")

    @aplicacao.get("/api/painel")
    def painel():
        dados = servico.obter_painel()
        dados["configuracao"] = configuracao.ler()
        dados["monitoramento"] = agendador.obter_status()
        dados["porta"] = aplicacao.config.get("porta_em_uso")
        return jsonify(dados)

    @aplicacao.get("/api/steam/busca")
    def buscar_na_steam():
        termo = (request.args.get("termo") or "").strip()
        limite = request.args.get("limite", 8)
        try:
            dados = servico.buscar_na_loja(termo, limite)
        except Exception as erro:
            return jsonify({"erro": str(erro)}), 400
        return jsonify(dados)

    @aplicacao.get("/api/logs-robot")
    def obter_logs_robot():
        limite = request.args.get("limite")
        offset = request.args.get("offset", 0)
        try:
            dados = servico.obter_logs_robot(limite, offset)
        except Exception as erro:
            return jsonify({"erro": str(erro)}), 400
        return jsonify(dados)

    @aplicacao.post("/api/jogos")
    def adicionar_jogo():
        corpo = request.get_json(silent=True) or request.form
        url = (corpo.get("url") or "").strip()
        preco_alvo = normalizar_preco(corpo.get("preco_alvo"))
        if not url:
            return jsonify({"erro": "Informe o link do jogo da Steam."}), 400
        try:
            jogo = servico.adicionar_jogo(url, preco_alvo)
        except Exception as erro:
            return jsonify({"erro": str(erro)}), 400
        return jsonify({"mensagem": "Jogo salvo no monitoramento.", "jogo": jogo})

    @aplicacao.post("/api/jogos/<int:jogo_id>/atualizar")
    def atualizar_jogo(jogo_id):
        try:
            jogo = servico.atualizar_jogo(jogo_id)
        except Exception as erro:
            return jsonify({"erro": str(erro)}), 400
        return jsonify({"mensagem": "Preço atualizado com sucesso.", "jogo": jogo})

    @aplicacao.get("/api/jogos/<int:jogo_id>/historico")
    def historico(jogo_id):
        return jsonify({"historico": servico.listar_historico(jogo_id)})

    @aplicacao.delete("/api/jogos/<int:jogo_id>")
    def remover_jogo(jogo_id):
        try:
            jogo = servico.remover_jogo(jogo_id)
        except Exception as erro:
            return jsonify({"erro": str(erro)}), 400
        return jsonify({"mensagem": f"{jogo.get('nome')} foi removido do monitoramento.", "jogo": jogo})

    @aplicacao.post("/api/monitoramento/executar")
    def executar_monitoramento():
        iniciou = agendador.executar_agora()
        if not iniciou:
            return jsonify({"erro": "Já existe um monitoramento em execução."}), 409
        return jsonify({"mensagem": "Monitoramento iniciado."}), 202

    @aplicacao.get("/api/configuracao")
    def obter_configuracao():
        return jsonify(configuracao.ler())

    @aplicacao.put("/api/configuracao")
    def atualizar_configuracao():
        corpo = request.get_json(silent=True) or {}
        try:
            dados = configuracao.atualizar(
                {
                    "porta": corpo.get("porta"),
                    "intervalo_minutos": corpo.get("intervalo_minutos"),
                    "abrir_navegador": corpo.get("abrir_navegador"),
                    "foco_coleta": corpo.get("foco_coleta"),
                    "idioma_loja": corpo.get("idioma_loja"),
                    "pais_loja": corpo.get("pais_loja"),
                    "timeout_requisicao_segundos": corpo.get("timeout_requisicao_segundos"),
                    "registrar_logs_robot": corpo.get("registrar_logs_robot"),
                    "limite_logs_robot": corpo.get("limite_logs_robot"),
                    "notificacoes_navegador_ativas": corpo.get("notificacoes_navegador_ativas"),
                }
            )
            agendador.reagendar()
        except Exception as erro:
            return jsonify({"erro": str(erro)}), 400
        return jsonify({"mensagem": "Configuração atualizada.", "configuracao": dados})

    @aplicacao.errorhandler(HTTPException)
    def tratar_erro_http(erro):
        if not request.path.startswith("/api/"):
            return erro.description, erro.code
        mensagens = {
            400: "A requisição enviada não é válida.",
            404: "A rota solicitada não foi encontrada.",
            405: "O método informado não é permitido para esta rota.",
            500: "Ocorreu um erro interno na aplicação.",
        }
        mensagem = mensagens.get(erro.code, erro.description or "Ocorreu um erro na aplicação.")
        return jsonify({"erro": mensagem}), erro.code

    @aplicacao.errorhandler(Exception)
    def tratar_erro_inesperado(erro):
        if not request.path.startswith("/api/"):
            return "Ocorreu um erro inesperado na aplicação.", 500
        return jsonify({"erro": "Ocorreu um erro inesperado durante o processamento."}), 500

    return aplicacao


def normalizar_preco(valor):
    if valor in [None, ""]:
        return None
    texto = str(valor).strip().replace("R$", "").replace(" ", "")
    if "," in texto and "." in texto:
        texto = texto.replace(".", "").replace(",", ".")
    elif "," in texto:
        texto = texto.replace(",", ".")
    try:
        return float(texto)
    except ValueError as erro:
        raise ValueError("Informe um preço-alvo válido.") from erro
