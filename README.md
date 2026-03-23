# SteamPriceWatcher

SteamPriceWatcher é um projeto em Python com Flask e Robot Framework para monitorar preços de jogos da Steam em uma interface web local com visual inspirado na própria Steam.

Ao executar `steampricewatcher.py`, o sistema sobe o servidor local, escolhe uma porta disponível, abre o navegador automaticamente e inicia o monitoramento recorrente dos jogos cadastrados.

## O que o projeto faz

- abre uma interface web local automaticamente
- permite colar links de jogos da Steam
- salva os jogos em banco SQLite
- consulta preço atual com Robot Framework
- registra histórico de preços
- mostra alertas quando há promoção, queda de preço ou preço alvo atingido
- executa monitoramento periódico a cada intervalo configurado

## Estrutura de diretórios

```text
SteamPriceWatcher/
├── steampricewatcher.py
├── README.md
├── requisitos.txt
├── aplicacao/
│   ├── armazenamento.py
│   ├── configuracao.py
│   ├── executor_robot.py
│   ├── formatacao.py
│   ├── monitoramento.py
│   ├── servidor.py
│   ├── servidor_local.py
│   └── servico_steam.py
├── assets/
│   ├── css/
│   │   └── estilo.css
│   └── js/
│       └── painel.js
├── dados/
│   ├── configuracao.json
│   ├── steampricewatcher.db
│   └── saidas_robot/
├── paginas/
│   └── pagina_inicial.html
└── robos/
    ├── coletar_preco_steam.robot
    └── bibliotecas/
        └── biblioteca_steam.py
```

## Tecnologias

- Python
- Flask
- Robot Framework
- Requests
- Beautiful Soup
- SQLite

## Requisitos

- Python 3.11 ou superior
- acesso à internet para consultar a Steam

## Instalação

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requisitos.txt
```

## Execução

```powershell
python steampricewatcher.py
```

Ao iniciar, o terminal mostra a saída em português:

```text
Aplicação Flask: aplicacao.servidor
Modo de depuração: desativado
Servidor local iniciado para o SteamPriceWatcher.
Interface disponível em http://127.0.0.1:5000
Pressione CTRL+C para encerrar.
```

## Configuração em JSON

Arquivo: `dados/configuracao.json`

```json
{
  "porta": 5000,
  "intervalo_minutos": 15,
  "abrir_navegador": true
}
```

Campos:

- `porta`: porta local preferida para subir a aplicação
- `intervalo_minutos`: intervalo do monitoramento automático
- `abrir_navegador`: define se o navegador abre sozinho ao iniciar

## Fluxo do sistema

1. o usuário executa `steampricewatcher.py`
2. a aplicação Flask sobe localmente
3. o navegador abre automaticamente
4. o usuário cola o link do jogo da Steam
5. o robô do Robot Framework consulta o preço
6. o sistema salva o jogo, o preço atual e o histórico
7. o agendador repete a consulta a cada intervalo configurado
8. a interface mostra o status atualizado e os alertas

## API JSON

### `GET /api/painel`

Retorna o estado completo da interface.

Exemplo de resposta:

```json
{
  "jogos": [],
  "alertas": [],
  "resumo": {
    "total_jogos": 0,
    "total_promocoes": 0,
    "total_alertas": 0
  },
  "configuracao": {
    "porta": 5000,
    "intervalo_minutos": 15,
    "abrir_navegador": true
  },
  "monitoramento": {
    "em_execucao": false,
    "ultima_execucao": null,
    "proxima_execucao": null,
    "ultimo_erro": null
  },
  "porta": 5000
}
```

### `POST /api/jogos`

Adiciona um jogo ao monitoramento.

Exemplo de envio:

```json
{
  "url": "https://store.steampowered.com/app/620/Portal_2/",
  "preco_alvo": 19.9
}
```

Exemplo de resposta:

```json
{
  "mensagem": "Jogo salvo no monitoramento.",
  "jogo": {
    "id": 1,
    "nome": "Portal 2"
  }
}
```

### `POST /api/jogos/1/atualizar`

Atualiza imediatamente um jogo já salvo.

### `GET /api/jogos/1/historico`

Retorna o histórico de preços de um jogo.

Exemplo de resposta:

```json
{
  "historico": [
    {
      "jogo_id": 1,
      "preco": 32.99,
      "moeda": "BRL",
      "status_promocao": "Sem promoção",
      "percentual_desconto": 0,
      "registrado_em": "2026-03-11T10:00:00-03:00"
    }
  ]
}
```

### `POST /api/monitoramento/executar`

Dispara um ciclo manual de monitoramento de todos os jogos.

### `PUT /api/configuracao`

Atualiza a configuração da aplicação.

Exemplo de envio:

```json
{
  "intervalo_minutos": 10
}
```

Exemplo de resposta:

```json
{
  "mensagem": "Configuração atualizada.",
  "configuracao": {
    "porta": 5000,
    "intervalo_minutos": 10,
    "abrir_navegador": true
  }
}
```

## Papel do Robot Framework

O arquivo `robos/coletar_preco_steam.robot` chama a biblioteca Python `robos/bibliotecas/biblioteca_steam.py`.

O robô:

- recebe a URL do jogo
- consulta os dados da Steam
- extrai nome, preço, moeda e desconto
- grava a resposta em JSON temporário
- devolve o resultado para a aplicação Flask

## Dados salvos

- `dados/steampricewatcher.db`: banco SQLite com jogos, histórico e alertas
- `dados/configuracao.json`: configuração principal
- `dados/saidas_robot/`: arquivos temporários gerados durante as coletas

## Observações

- o projeto foi preparado para links do formato `https://store.steampowered.com/app/...`
- se a Steam alterar a estrutura dos dados, a extração pode precisar de ajustes na biblioteca do robô
- todo o fluxo roda localmente, sem dependência de serviços externos além da própria Steam
