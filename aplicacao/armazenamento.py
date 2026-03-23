import sqlite3
from pathlib import Path
from threading import Lock

from aplicacao.formatacao import agora_iso, formatar_moeda


class Armazenamento:
    def __init__(self, caminho):
        self.caminho = Path(caminho)
        self.trava = Lock()
        self.preparar()

    def preparar(self):
        self.caminho.parent.mkdir(parents=True, exist_ok=True)
        with self._conectar() as conexao:
            conexao.executescript(
                """
                CREATE TABLE IF NOT EXISTS jogos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    url TEXT NOT NULL UNIQUE,
                    identificador_steam TEXT,
                    moeda TEXT,
                    preco_atual REAL,
                    ultimo_preco_salvo REAL,
                    preco_alvo REAL,
                    status_promocao TEXT NOT NULL,
                    percentual_desconto INTEGER NOT NULL DEFAULT 0,
                    ultima_verificacao TEXT,
                    criado_em TEXT NOT NULL,
                    atualizado_em TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS historico_precos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    jogo_id INTEGER NOT NULL,
                    preco REAL,
                    moeda TEXT,
                    status_promocao TEXT NOT NULL,
                    percentual_desconto INTEGER NOT NULL DEFAULT 0,
                    registrado_em TEXT NOT NULL,
                    FOREIGN KEY (jogo_id) REFERENCES jogos (id)
                );

                CREATE TABLE IF NOT EXISTS alertas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    jogo_id INTEGER,
                    titulo TEXT NOT NULL,
                    mensagem TEXT NOT NULL,
                    tipo TEXT NOT NULL,
                    criado_em TEXT NOT NULL,
                    FOREIGN KEY (jogo_id) REFERENCES jogos (id)
                );

                CREATE TABLE IF NOT EXISTS logs_robot (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    jogo_id INTEGER,
                    origem TEXT NOT NULL,
                    etapa TEXT NOT NULL,
                    mensagem TEXT NOT NULL,
                    criado_em TEXT NOT NULL,
                    FOREIGN KEY (jogo_id) REFERENCES jogos (id)
                );
                """
            )
            conexao.commit()

    def listar_jogos(self):
        with self._conectar() as conexao:
            registros = conexao.execute(
                "SELECT * FROM jogos ORDER BY atualizado_em DESC, id DESC"
            ).fetchall()
        return [self._serializar_jogo(registro) for registro in registros]

    def listar_alertas(self, limite=12):
        with self._conectar() as conexao:
            registros = conexao.execute(
                """
                SELECT
                    alertas.id,
                    alertas.jogo_id,
                    alertas.titulo,
                    alertas.mensagem,
                    alertas.tipo,
                    alertas.criado_em,
                    jogos.nome AS nome_jogo
                FROM alertas
                LEFT JOIN jogos ON jogos.id = alertas.jogo_id
                ORDER BY alertas.criado_em DESC, alertas.id DESC
                LIMIT ?
                """,
                (limite,),
            ).fetchall()
        return [dict(registro) for registro in registros]

    def listar_logs_robot(self, limite=40, offset=0):
        with self._conectar() as conexao:
            registros = conexao.execute(
                """
                SELECT
                    logs_robot.id,
                    logs_robot.jogo_id,
                    logs_robot.origem,
                    logs_robot.etapa,
                    logs_robot.mensagem,
                    logs_robot.criado_em,
                    jogos.nome AS nome_jogo
                FROM logs_robot
                LEFT JOIN jogos ON jogos.id = logs_robot.jogo_id
                ORDER BY logs_robot.criado_em DESC, logs_robot.id DESC
                LIMIT ?
                OFFSET ?
                """,
                (limite, offset),
            ).fetchall()
        return [dict(registro) for registro in registros]

    def contar_logs_robot(self):
        with self._conectar() as conexao:
            registro = conexao.execute(
                "SELECT COUNT(*) AS total FROM logs_robot"
            ).fetchone()
        return int((registro or {"total": 0})["total"] or 0)

    def listar_historico(self, jogo_id, limite=30):
        with self._conectar() as conexao:
            registros = conexao.execute(
                """
                SELECT
                    id,
                    jogo_id,
                    preco,
                    moeda,
                    status_promocao,
                    percentual_desconto,
                    registrado_em
                FROM historico_precos
                WHERE jogo_id = ?
                ORDER BY registrado_em DESC, id DESC
                LIMIT ?
                """,
                (jogo_id, limite),
            ).fetchall()
        historico = []
        for registro in registros:
            item = dict(registro)
            item["preco_texto"] = formatar_moeda(item["preco"], item["moeda"])
            historico.append(item)
        return historico

    def buscar_jogo_por_id(self, jogo_id):
        with self._conectar() as conexao:
            registro = conexao.execute(
                "SELECT * FROM jogos WHERE id = ?",
                (jogo_id,),
            ).fetchone()
        if not registro:
            return None
        return self._serializar_jogo(registro)

    def buscar_jogo_por_url(self, url):
        with self._conectar() as conexao:
            registro = conexao.execute(
                "SELECT * FROM jogos WHERE url = ?",
                (url,),
            ).fetchone()
        if not registro:
            return None
        return self._serializar_jogo(registro)

    def remover_jogo(self, jogo_id):
        jogo = self.buscar_jogo_por_id(jogo_id)
        if not jogo:
            raise ValueError("Jogo não encontrado.")
        with self.trava:
            with self._conectar() as conexao:
                conexao.execute("DELETE FROM historico_precos WHERE jogo_id = ?", (jogo_id,))
                conexao.execute("DELETE FROM alertas WHERE jogo_id = ?", (jogo_id,))
                conexao.execute("DELETE FROM logs_robot WHERE jogo_id = ?", (jogo_id,))
                conexao.execute("DELETE FROM jogos WHERE id = ?", (jogo_id,))
                conexao.commit()
        return jogo

    def criar_jogo(self, coleta, preco_alvo=None):
        agora = agora_iso()
        preco = self._numero_ou_none(coleta.get("preco"))
        percentual = int(coleta.get("percentual_desconto") or 0)
        status = self._montar_status(preco, preco, percentual, preco_alvo)
        with self.trava:
            with self._conectar() as conexao:
                cursor = conexao.execute(
                    """
                    INSERT INTO jogos (
                        nome,
                        url,
                        identificador_steam,
                        moeda,
                        preco_atual,
                        ultimo_preco_salvo,
                        preco_alvo,
                        status_promocao,
                        percentual_desconto,
                        ultima_verificacao,
                        criado_em,
                        atualizado_em
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        coleta.get("nome"),
                        coleta.get("url"),
                        coleta.get("identificador_steam"),
                        coleta.get("moeda") or "BRL",
                        preco,
                        preco,
                        preco_alvo,
                        status,
                        percentual,
                        agora,
                        agora,
                        agora,
                    ),
                )
                jogo_id = cursor.lastrowid
                self._inserir_historico(conexao, jogo_id, preco, coleta.get("moeda") or "BRL", status, percentual, agora)
                self._inserir_alerta(
                    conexao,
                    jogo_id,
                    "Jogo adicionado",
                    f"{coleta.get('nome')} entrou no monitoramento com preço {formatar_moeda(preco, coleta.get('moeda'))}.",
                    "informacao",
                    agora,
                )
                if percentual > 0:
                    self._inserir_alerta(
                        conexao,
                        jogo_id,
                        "Promoção detectada",
                        f"{coleta.get('nome')} está com {percentual}% de desconto.",
                        "promocao",
                        agora,
                    )
                if preco_alvo not in [None, ""] and preco is not None and preco <= preco_alvo:
                    self._inserir_alerta(
                        conexao,
                        jogo_id,
                        "Preço-alvo atingido",
                        f"{coleta.get('nome')} chegou em {formatar_moeda(preco, coleta.get('moeda'))}.",
                        "alvo",
                        agora,
                    )
                conexao.commit()
        return self.buscar_jogo_por_id(jogo_id)

    def atualizar_preco_alvo(self, jogo_id, preco_alvo):
        agora = agora_iso()
        with self.trava:
            with self._conectar() as conexao:
                conexao.execute(
                    """
                    UPDATE jogos
                    SET preco_alvo = ?, atualizado_em = ?
                    WHERE id = ?
                    """,
                    (preco_alvo, agora, jogo_id),
                )
                jogo = conexao.execute(
                    "SELECT * FROM jogos WHERE id = ?",
                    (jogo_id,),
                ).fetchone()
                if jogo and preco_alvo not in [None, ""] and jogo["preco_atual"] is not None and jogo["preco_atual"] <= preco_alvo:
                    self._inserir_alerta(
                        conexao,
                        jogo_id,
                        "Preço-alvo atingido",
                        f"{jogo['nome']} está em {formatar_moeda(jogo['preco_atual'], jogo['moeda'])}.",
                        "alvo",
                        agora,
                    )
                conexao.commit()
        return self.buscar_jogo_por_id(jogo_id)

    def registrar_coleta(self, jogo_id, coleta):
        agora = agora_iso()
        with self.trava:
            with self._conectar() as conexao:
                atual = conexao.execute(
                    "SELECT * FROM jogos WHERE id = ?",
                    (jogo_id,),
                ).fetchone()
                if not atual:
                    raise ValueError("Jogo não encontrado.")
                preco_anterior = self._numero_ou_none(atual["preco_atual"])
                percentual_anterior = int(atual["percentual_desconto"] or 0)
                novo_preco = self._numero_ou_none(coleta.get("preco"))
                novo_percentual = int(coleta.get("percentual_desconto") or 0)
                preco_alvo = self._numero_ou_none(atual["preco_alvo"])
                status = self._montar_status(novo_preco, preco_anterior, novo_percentual, preco_alvo)
                conexao.execute(
                    """
                    UPDATE jogos
                    SET
                        nome = ?,
                        url = ?,
                        identificador_steam = ?,
                        moeda = ?,
                        preco_atual = ?,
                        ultimo_preco_salvo = ?,
                        status_promocao = ?,
                        percentual_desconto = ?,
                        ultima_verificacao = ?,
                        atualizado_em = ?
                    WHERE id = ?
                    """,
                    (
                        coleta.get("nome"),
                        coleta.get("url"),
                        coleta.get("identificador_steam"),
                        coleta.get("moeda") or atual["moeda"] or "BRL",
                        novo_preco,
                        preco_anterior if preco_anterior is not None else novo_preco,
                        status,
                        novo_percentual,
                        agora,
                        agora,
                        jogo_id,
                    ),
                )
                self._inserir_historico(
                    conexao,
                    jogo_id,
                    novo_preco,
                    coleta.get("moeda") or atual["moeda"] or "BRL",
                    status,
                    novo_percentual,
                    agora,
                )
                preco_mudou = (
                    preco_anterior is None
                    or novo_preco != preco_anterior
                    or novo_percentual != percentual_anterior
                )
                if preco_mudou and preco_anterior is not None and novo_preco is not None and novo_preco < preco_anterior:
                    self._inserir_alerta(
                        conexao,
                        jogo_id,
                        "Preço caiu",
                        f"{coleta.get('nome')} caiu de {formatar_moeda(preco_anterior, coleta.get('moeda') or atual['moeda'])} para {formatar_moeda(novo_preco, coleta.get('moeda') or atual['moeda'])}.",
                        "promocao",
                        agora,
                    )
                if preco_mudou and novo_percentual > 0:
                    self._inserir_alerta(
                        conexao,
                        jogo_id,
                        "Promoção detectada",
                        f"{coleta.get('nome')} está com {novo_percentual}% de desconto.",
                        "promocao",
                        agora,
                    )
                if preco_mudou and preco_alvo not in [None, ""] and novo_preco is not None and novo_preco <= preco_alvo:
                    self._inserir_alerta(
                        conexao,
                        jogo_id,
                        "Preço-alvo atingido",
                        f"{coleta.get('nome')} chegou em {formatar_moeda(novo_preco, coleta.get('moeda') or atual['moeda'])}.",
                        "alvo",
                        agora,
                    )
                conexao.commit()
        return self.buscar_jogo_por_id(jogo_id)

    def registrar_logs_robot(self, logs, jogo_id=None):
        if not logs:
            return
        with self.trava:
            with self._conectar() as conexao:
                for log in logs:
                    conexao.execute(
                        """
                        INSERT INTO logs_robot (
                            jogo_id,
                            origem,
                            etapa,
                            mensagem,
                            criado_em
                        ) VALUES (?, ?, ?, ?, ?)
                        """,
                        (
                            jogo_id,
                            log.get("origem") or "sistema",
                            log.get("etapa") or "evento",
                            log.get("mensagem") or "",
                            log.get("registrado_em") or agora_iso(),
                        ),
                    )
                conexao.commit()

    def registrar_alerta(self, titulo, mensagem, tipo="informacao", jogo_id=None):
        agora = agora_iso()
        with self.trava:
            with self._conectar() as conexao:
                self._inserir_alerta(conexao, jogo_id, titulo, mensagem, tipo, agora)
                conexao.commit()

    def _conectar(self):
        conexao = sqlite3.connect(self.caminho)
        conexao.row_factory = sqlite3.Row
        return conexao

    def _serializar_jogo(self, registro):
        jogo = dict(registro)
        jogo["preco_atual"] = self._numero_ou_none(jogo.get("preco_atual"))
        jogo["ultimo_preco_salvo"] = self._numero_ou_none(jogo.get("ultimo_preco_salvo"))
        jogo["preco_alvo"] = self._numero_ou_none(jogo.get("preco_alvo"))
        jogo["percentual_desconto"] = int(jogo.get("percentual_desconto") or 0)
        jogo["preco_atual_texto"] = formatar_moeda(jogo.get("preco_atual"), jogo.get("moeda"))
        jogo["ultimo_preco_salvo_texto"] = formatar_moeda(jogo.get("ultimo_preco_salvo"), jogo.get("moeda"))
        jogo["preco_alvo_texto"] = formatar_moeda(jogo.get("preco_alvo"), jogo.get("moeda"))
        return jogo

    def _montar_status(self, preco_atual, preco_anterior, percentual_desconto, preco_alvo):
        partes = []
        if int(percentual_desconto or 0) > 0:
            partes.append("Em promoção")
        if preco_anterior is not None and preco_atual is not None and preco_atual < preco_anterior:
            partes.append("Preço caiu")
        if preco_alvo not in [None, ""] and preco_atual is not None and preco_atual <= preco_alvo:
            partes.append("Abaixo do preço alvo")
        if not partes:
            return "Sem promoção"
        return " | ".join(dict.fromkeys(partes))

    def _inserir_historico(self, conexao, jogo_id, preco, moeda, status, percentual, registrado_em):
        conexao.execute(
            """
            INSERT INTO historico_precos (
                jogo_id,
                preco,
                moeda,
                status_promocao,
                percentual_desconto,
                registrado_em
            ) VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                jogo_id,
                preco,
                moeda,
                status,
                int(percentual or 0),
                registrado_em,
            ),
        )

    def _inserir_alerta(self, conexao, jogo_id, titulo, mensagem, tipo, criado_em):
        conexao.execute(
            """
            INSERT INTO alertas (
                jogo_id,
                titulo,
                mensagem,
                tipo,
                criado_em
            ) VALUES (?, ?, ?, ?, ?)
            """,
            (jogo_id, titulo, mensagem, tipo, criado_em),
        )

    def _numero_ou_none(self, valor):
        if valor in [None, ""]:
            return None
        return float(valor)
