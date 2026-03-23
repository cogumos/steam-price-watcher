from datetime import datetime, timedelta
from threading import Event, Lock, Thread


class AgendadorMonitoramento:
    def __init__(self, servico, configuracao):
        self.servico = servico
        self.configuracao = configuracao
        self.evento = Event()
        self.trava = Lock()
        self.em_execucao = False
        self.ultima_execucao = None
        self.proxima_execucao = datetime.now().astimezone()
        self.ultimo_erro = None
        self.thread = Thread(
            target=self._ciclo,
            daemon=True,
            name="steampricewatcher_monitoramento",
        )

    def iniciar(self):
        if not self.thread.is_alive():
            self.thread.start()

    def parar(self):
        self.evento.set()
        if self.thread.is_alive():
            self.thread.join(timeout=3)

    def executar_agora(self):
        with self.trava:
            if self.em_execucao:
                return False
        Thread(target=self._executar, daemon=True, name="steampricewatcher_execucao_manual").start()
        return True

    def reagendar(self):
        intervalo = int(self.configuracao.ler().get("intervalo_minutos", 15))
        with self.trava:
            self.proxima_execucao = datetime.now().astimezone() + timedelta(minutes=intervalo)

    def obter_status(self):
        with self.trava:
            return {
                "em_execucao": self.em_execucao,
                "ultima_execucao": self.ultima_execucao.isoformat() if self.ultima_execucao else None,
                "proxima_execucao": self.proxima_execucao.isoformat() if self.proxima_execucao else None,
                "ultimo_erro": self.ultimo_erro,
            }

    def _ciclo(self):
        while not self.evento.is_set():
            agora = datetime.now().astimezone()
            with self.trava:
                deve_executar = not self.em_execucao and (
                    self.proxima_execucao is None or agora >= self.proxima_execucao
                )
            if deve_executar:
                self._executar()
            self.evento.wait(5)

    def _executar(self):
        with self.trava:
            if self.em_execucao:
                return
            self.em_execucao = True
            self.ultimo_erro = None
        try:
            self.servico.monitorar_todos()
        except Exception as erro:
            with self.trava:
                self.ultimo_erro = str(erro)
        finally:
            agora = datetime.now().astimezone()
            intervalo = int(self.configuracao.ler().get("intervalo_minutos", 15))
            with self.trava:
                self.em_execucao = False
                self.ultima_execucao = agora
                self.proxima_execucao = agora + timedelta(minutes=intervalo)
