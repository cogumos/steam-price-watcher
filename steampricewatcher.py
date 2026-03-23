import os
import socket
import sys
import webbrowser
from pathlib import Path
from threading import Timer

from aplicacao.servidor import criar_aplicacao
from aplicacao.servidor_local import executar_servidor_local


def descobrir_porta_disponivel(porta_inicial):
    porta = int(porta_inicial)
    limite = porta + 20
    while porta < limite:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as soquete:
            soquete.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            if soquete.connect_ex(("127.0.0.1", porta)) != 0:
                return porta
        porta += 1
    raise RuntimeError("Nenhuma porta disponível foi encontrada.")


def abrir_no_navegador(url):
    webbrowser.open_new(url)


def configurar_saida_console():
    for fluxo in (sys.stdout, sys.stderr):
        if hasattr(fluxo, "reconfigure"):
            fluxo.reconfigure(encoding="utf-8")


if __name__ == "__main__":
    configurar_saida_console()
    raiz = Path(__file__).resolve().parent
    aplicacao = criar_aplicacao(raiz)
    configuracao = aplicacao.config["configuracao"].ler()
    porta_preferida = os.getenv("PORTA_STEAMPRICEWATCHER", configuracao.get("porta", 5000))
    porta = descobrir_porta_disponivel(porta_preferida)
    aplicacao.config["porta_em_uso"] = porta
    agendador = aplicacao.config["agendador"]
    agendador.iniciar()
    if configuracao.get("abrir_navegador", True):
        Timer(1, abrir_no_navegador, args=[f"http://127.0.0.1:{porta}"]).start()
    try:
        executar_servidor_local(aplicacao, "127.0.0.1", porta)
    except KeyboardInterrupt:
        print("Servidor encerrado.")
    finally:
        agendador.parar()
