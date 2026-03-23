import logging

from werkzeug.serving import WSGIRequestHandler, make_server


class TratadorSilencioso(WSGIRequestHandler):
    def log(self, tipo, mensagem, *argumentos):
        return

    def log_message(self, formato, *argumentos):
        return

    def log_request(self, codigo="-", tamanho="-"):
        return

    def log_error(self, formato, *argumentos):
        return


def executar_servidor_local(aplicacao, host, porta):
    logging.getLogger("werkzeug").disabled = True
    servidor = make_server(host, porta, aplicacao, request_handler=TratadorSilencioso)
    print(f"Aplicação Flask: {aplicacao.import_name}")
    print("Modo de depuração: desativado")
    print("Servidor local iniciado para o SteamPriceWatcher.")
    print(f"Interface disponível em http://{host}:{porta}")
    print("Pressione CTRL+C para encerrar.")
    servidor.serve_forever()
