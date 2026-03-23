import json
from pathlib import Path
from threading import Lock


class Configuracao:
    def __init__(self, caminho):
        self.caminho = Path(caminho)
        self.trava = Lock()
        self.padrao = {
            "porta": 5000,
            "intervalo_minutos": 15,
            "abrir_navegador": True,
            "foco_coleta": "automatico",
            "idioma_loja": "brazilian",
            "pais_loja": "br",
            "timeout_requisicao_segundos": 30,
            "registrar_logs_robot": True,
            "limite_logs_robot": 40,
            "notificacoes_navegador_ativas": False,
        }
        self.focos_validos = {"automatico", "api", "pagina"}
        self.idiomas_validos = {"brazilian"}
        self.paises_validos = {"br"}

    def garantir(self):
        self.caminho.parent.mkdir(parents=True, exist_ok=True)
        if not self.caminho.exists():
            self._escrever(self.padrao)
            return
        atual = self._ler_arquivo()
        mudou = False
        for chave, valor in self.padrao.items():
            if chave not in atual:
                atual[chave] = valor
                mudou = True
        if atual.get("foco_coleta") not in self.focos_validos:
            atual["foco_coleta"] = self.padrao["foco_coleta"]
            mudou = True
        if atual.get("idioma_loja") not in self.idiomas_validos:
            atual["idioma_loja"] = self.padrao["idioma_loja"]
            mudou = True
        if atual.get("pais_loja") not in self.paises_validos:
            atual["pais_loja"] = self.padrao["pais_loja"]
            mudou = True
        if mudou:
            self._escrever(atual)

    def ler(self):
        self.garantir()
        with self.trava:
            return self._ler_arquivo()

    def atualizar(self, dados):
        atuais = self.ler()

        if "porta" in dados and dados["porta"] not in [None, ""]:
            try:
                atuais["porta"] = max(1024, int(dados["porta"]))
            except (TypeError, ValueError) as erro:
                raise ValueError("Informe uma porta válida.") from erro

        if "intervalo_minutos" in dados and dados["intervalo_minutos"] not in [None, ""]:
            try:
                atuais["intervalo_minutos"] = max(1, int(dados["intervalo_minutos"]))
            except (TypeError, ValueError) as erro:
                raise ValueError("Informe um intervalo de monitoramento válido.") from erro

        if "abrir_navegador" in dados and dados["abrir_navegador"] is not None:
            atuais["abrir_navegador"] = bool(dados["abrir_navegador"])

        if "foco_coleta" in dados and dados["foco_coleta"] not in [None, ""]:
            foco = str(dados["foco_coleta"]).strip().lower()
            if foco not in self.focos_validos:
                raise ValueError("Informe um foco de coleta válido.")
            atuais["foco_coleta"] = foco

        if "idioma_loja" in dados and dados["idioma_loja"] not in [None, ""]:
            idioma = str(dados["idioma_loja"]).strip().lower()
            if idioma not in self.idiomas_validos:
                raise ValueError("Informe um idioma de loja válido.")
            atuais["idioma_loja"] = idioma

        if "pais_loja" in dados and dados["pais_loja"] not in [None, ""]:
            pais = str(dados["pais_loja"]).strip().lower()
            if pais not in self.paises_validos:
                raise ValueError("Informe um país de loja válido.")
            atuais["pais_loja"] = pais

        if "timeout_requisicao_segundos" in dados and dados["timeout_requisicao_segundos"] not in [None, ""]:
            try:
                atuais["timeout_requisicao_segundos"] = max(5, int(dados["timeout_requisicao_segundos"]))
            except (TypeError, ValueError) as erro:
                raise ValueError("Informe um tempo limite válido para as requisições.") from erro

        if "registrar_logs_robot" in dados and dados["registrar_logs_robot"] is not None:
            atuais["registrar_logs_robot"] = bool(dados["registrar_logs_robot"])

        if "limite_logs_robot" in dados and dados["limite_logs_robot"] not in [None, ""]:
            try:
                atuais["limite_logs_robot"] = max(10, min(200, int(dados["limite_logs_robot"])))
            except (TypeError, ValueError) as erro:
                raise ValueError("Informe um limite válido para os logs do robô.") from erro

        if "notificacoes_navegador_ativas" in dados and dados["notificacoes_navegador_ativas"] is not None:
            atuais["notificacoes_navegador_ativas"] = bool(dados["notificacoes_navegador_ativas"])

        with self.trava:
            self._escrever(atuais)
        return atuais

    def _ler_arquivo(self):
        with self.caminho.open("r", encoding="utf-8") as arquivo:
            return json.load(arquivo)

    def _escrever(self, dados):
        with self.caminho.open("w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=2)
