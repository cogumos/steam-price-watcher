import json
import uuid
from io import StringIO
from pathlib import Path

from robot import run


class ExecutorRobot:
    def __init__(self, caminho_suite, diretorio_saida):
        self.caminho_suite = Path(caminho_suite)
        self.diretorio_saida = Path(diretorio_saida)
        self.diretorio_saida.mkdir(parents=True, exist_ok=True)

    def coletar(self, url, configuracao=None):
        configuracao = configuracao or {}
        identificador = uuid.uuid4().hex
        arquivo_json = self.diretorio_saida / f"coleta_{identificador}.json"
        saida_terminal = StringIO()
        codigo = run(
            str(self.caminho_suite),
            variable=[
                f"URL:{url}",
                f"SAIDA_JSON:{arquivo_json}",
                f"FOCO_COLETA:{configuracao.get('foco_coleta', 'automatico')}",
                f"IDIOMA_LOJA:{configuracao.get('idioma_loja', 'brazilian')}",
                f"PAIS_LOJA:{configuracao.get('pais_loja', 'br')}",
                f"TIMEOUT_REQUISICAO:{configuracao.get('timeout_requisicao_segundos', 30)}",
                f"REGISTRAR_LOGS:{'sim' if configuracao.get('registrar_logs_robot', True) else 'nao'}",
            ],
            outputdir=str(self.diretorio_saida),
            output=None,
            log=None,
            report=None,
            stdout=saida_terminal,
            stderr=saida_terminal,
        )
        if not arquivo_json.exists():
            raise RuntimeError("A coleta via Robot Framework não gerou o arquivo JSON esperado.")
        with arquivo_json.open("r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
        arquivo_json.unlink(missing_ok=True)
        dados["saida_terminal"] = saida_terminal.getvalue().strip()
        if codigo != 0 or not dados.get("sucesso", False):
            raise RuntimeError(dados.get("erro") or "A coleta via Robot Framework falhou.")
        return dados
