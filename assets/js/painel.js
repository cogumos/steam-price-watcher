const elementos = {
    telaAbertura: document.getElementById("tela-abertura"),
    barraTelaAbertura: document.getElementById("tela-abertura-barra"),
    statusTelaAbertura: document.getElementById("tela-abertura-status"),
    aplicacaoPrincipal: document.getElementById("aplicacao-principal"),
    linksVisao: Array.from(document.querySelectorAll("[data-visao-link]")),
    visoes: Array.from(document.querySelectorAll(".visao")),
    formularioJogo: document.getElementById("formulario-jogo"),
    botaoAdicionarJogoFormulario: document.getElementById("botao-adicionar-jogo-formulario"),
    formularioConfiguracao: document.getElementById("formulario-configuracao"),
    formularioBuscaSteam: document.getElementById("formulario-busca-steam"),
    botoesMonitorarAgora: Array.from(document.querySelectorAll(".botao-monitorar-agora")),
    botaoIrConfiguracao: document.getElementById("botao-ir-configuracao"),
    botaoIrBiblioteca: document.getElementById("botao-ir-biblioteca"),
    botaoVoltarBiblioteca: document.getElementById("botao-voltar-biblioteca"),
    botaoAtualizarDetalhe: document.getElementById("botao-atualizar-detalhe"),
    botaoSlideAnterior: document.getElementById("botao-slide-anterior"),
    botaoSlideProximo: document.getElementById("botao-slide-proximo"),
    botaoSlidePausa: document.getElementById("botao-slide-pausa"),
    carrossel: document.querySelector(".carrossel"),
    campoUrl: document.getElementById("url-jogo"),
    campoPrecoAlvo: document.getElementById("preco-alvo"),
    campoIntervalo: document.getElementById("intervalo-minutos"),
    buscaJogos: document.getElementById("busca-jogos"),
    progressoBuscaSteam: document.getElementById("busca-steam-progresso"),
    barraProgressoBuscaSteam: document.getElementById("busca-steam-progresso-barra"),
    painelBuscaSteam: document.getElementById("painel-busca-steam"),
    listaBuscaSteam: document.getElementById("lista-busca-steam"),
    tituloBuscaSteam: document.getElementById("titulo-busca-steam"),
    contagemBuscaSteam: document.getElementById("contagem-busca-steam"),
    resumoJogos: document.getElementById("resumo-jogos"),
    resumoPromocoes: document.getElementById("resumo-promocoes"),
    resumoAlertas: document.getElementById("resumo-alertas"),
    resumoProxima: document.getElementById("resumo-proxima"),
    contadorJogosVisiveis: document.getElementById("contador-jogos-visiveis"),
    buscaBiblioteca: document.getElementById("busca-biblioteca"),
    ordenacaoBiblioteca: document.getElementById("ordenacao-biblioteca"),
    filtrosBiblioteca: Array.from(document.querySelectorAll("[data-filtro-biblioteca]")),
    resumoBiblioteca: document.getElementById("resumo-biblioteca"),
    portaLocal: document.getElementById("porta-local"),
    portaLocalHome: document.getElementById("porta-local-home"),
    estadoMonitoramento: document.getElementById("estado-monitoramento"),
    estadoResumidoHome: document.getElementById("estado-resumido-home"),
    statusUltimaExecucao: document.getElementById("status-ultima-execucao"),
    statusProximaExecucao: document.getElementById("status-proxima-execucao"),
    statusUltimoErro: document.getElementById("status-ultimo-erro"),
    listaJogos: document.getElementById("lista-jogos"),
    listaAlertas: document.getElementById("lista-alertas"),
    listaAlertasHome: document.getElementById("lista-alertas-home"),
    gradeDestaques: document.getElementById("grade-destaques"),
    carrosselPrincipal: document.getElementById("carrossel-principal"),
    listaMiniaturasSlide: document.getElementById("lista-miniaturas-slide"),
    listaIndicadoresSlide: document.getElementById("lista-indicadores-slide"),
    textoSlideAtual: document.getElementById("texto-slide-atual"),
    tituloDetalheJogo: document.getElementById("titulo-detalhe-jogo"),
    subtituloDetalheJogo: document.getElementById("subtitulo-detalhe-jogo"),
    painelDetalheJogo: document.getElementById("painel-detalhe-jogo"),
    versaoProjetoTopo: document.getElementById("versao-projeto-topo"),
    versaoProjetoHome: document.getElementById("versao-projeto-home"),
    versaoProjetoStatus: document.getElementById("versao-projeto-status"),
    versaoProjetoConfig: document.getElementById("versao-projeto-config"),
    versaoProjetoCard: document.getElementById("versao-projeto-card"),
    focoColetaHome: document.getElementById("foco-coleta-home"),
    origemColetaHome: document.getElementById("origem-coleta-home"),
    estadoNotificacaoHome: document.getElementById("estado-notificacao-home"),
    origemColetaStatus: document.getElementById("origem-coleta-status"),
    timeoutRequisicaoStatus: document.getElementById("timeout-requisicao-status"),
    listaLogsRobot: document.getElementById("lista-logs-robot"),
    acoesLogsRobot: document.getElementById("acoes-logs-robot"),
    contadorLogsRobot: document.getElementById("contador-logs-robot"),
    botaoCarregarMaisLogs: document.getElementById("botao-carregar-mais-logs"),
    buscaLogsRobot: document.getElementById("busca-logs-robot"),
    filtrosLogsRobot: Array.from(document.querySelectorAll("[data-filtro-log]")),
    campoFocoColeta: document.getElementById("foco-coleta"),
    opcoesFocoColeta: Array.from(document.querySelectorAll("[data-foco-coleta-opcao]")),
    campoIdiomaLoja: document.getElementById("idioma-loja"),
    campoPaisLoja: document.getElementById("pais-loja"),
    campoTimeoutRequisicao: document.getElementById("timeout-requisicao"),
    campoLimiteLogsRobot: document.getElementById("limite-logs-robot"),
    campoRegistrarLogsRobot: document.getElementById("registrar-logs-robot"),
    campoAbrirNavegador: document.getElementById("abrir-navegador"),
    statusNotificacao: document.getElementById("status-notificacao"),
    botaoHabilitarNotificacoes: document.getElementById("botao-habilitar-notificacoes"),
    botaoDesativarNotificacoes: document.getElementById("botao-desativar-notificacoes"),
    focoColetaConfig: document.getElementById("foco-coleta-config"),
    origemColetaConfig: document.getElementById("origem-coleta-config"),
    menuContexto: document.getElementById("menu-contexto"),
    mensagem: document.getElementById("mensagem-flutuante"),
};

const estado = {
    painel: null,
    carregandoPainel: false,
    filtro: "",
    biblioteca: {
        busca: "",
        filtro: "todos",
        ordenacao: "atualizacao",
    },
    detalheHistorico: {
        jogoId: null,
        periodo: "recentes",
        limite: 6,
    },
    detalheMidia: {
        jogoId: null,
        indice: 0,
        progresso: 0,
        pausadoManual: false,
        emFoco: false,
    },
    visaoAtual: "inicio",
    jogoSelecionadoId: null,
    historicos: new Map(),
    slides: [],
    indiceSlide: 0,
    carrosselPausado: false,
    carrosselEmFoco: false,
    ultimoAlertaNotificadoId: Number(window.localStorage.getItem("steampricewatcher_alerta_notificado") || 0),
    buscaSteam: {
        termo: "",
        resultados: [],
        total: 0,
        carregando: false,
        erro: "",
        progresso: 0,
        urlsAdicionando: new Set(),
    },
    logsRobot: {
        itens: [],
        total: 0,
        offset: 0,
        limite: 40,
        temMais: false,
        carregando: false,
        quantidadeDesejada: 40,
        busca: "",
        origem: "todos",
    },
    abertura: {
        progresso: 0,
        iniciouEm: 0,
        concluida: false,
    },
};

let promessaPainel = null;
let temporizadorMensagem = null;
let temporizadorCarrossel = null;
let temporizadorAtualizacao = null;
let temporizadorBuscaSteam = null;
let temporizadorProgressoBuscaSteam = null;
let temporizadorDetalheMidia = null;
let temporizadorTelaAbertura = null;
let controladorBuscaSteam = null;
let identificadorBuscaSteam = 0;
const DURACAO_ROTACAO_DETALHE_MS = 6200;
const DURACAO_MINIMA_TELA_ABERTURA_MS = 1550;

function corrigirTexto(valor) {
    if (valor === null || valor === undefined) {
        return "";
    }

    const mapa = {
        "Ã§": "ç",
        "Ã£": "ã",
        "Ã¡": "á",
        "Ã ": "à",
        "Ã¢": "â",
        "Ã¤": "ä",
        "Ã©": "é",
        "Ã¨": "è",
        "Ãª": "ê",
        "Ã«": "ë",
        "Ã­": "í",
        "Ã¬": "ì",
        "Ã®": "î",
        "Ã³": "ó",
        "Ã²": "ò",
        "Ã´": "ô",
        "Ãµ": "õ",
        "Ã¶": "ö",
        "Ãº": "ú",
        "Ã¹": "ù",
        "Ã»": "û",
        "Ã¼": "ü",
        "Ã‡": "Ç",
        "Ã‰": "É",
        "ÃŠ": "Ê",
        "Ã“": "Ó",
        "Ã”": "Ô",
        "Ãš": "Ú",
        "Âº": "º",
        "Âª": "ª",
        "Â": "",
        "â€“": "-",
        "â€”": "-",
        "â€˜": "'",
        "â€™": "'",
        "â€œ": "\"",
        "â€�": "\"",
        "â€¦": "...",
    };

    let texto = String(valor);
    Object.entries(mapa).forEach(([origem, destino]) => {
        texto = texto.split(origem).join(destino);
    });

    const mapaUtf8 = {
        "\u00c3\u00a7": "\u00e7",
        "\u00c3\u00a3": "\u00e3",
        "\u00c3\u00a1": "\u00e1",
        "\u00c3\u00a0": "\u00e0",
        "\u00c3\u00a2": "\u00e2",
        "\u00c3\u00a9": "\u00e9",
        "\u00c3\u00aa": "\u00ea",
        "\u00c3\u00ad": "\u00ed",
        "\u00c3\u00b3": "\u00f3",
        "\u00c3\u00b4": "\u00f4",
        "\u00c3\u00b5": "\u00f5",
        "\u00c3\u00ba": "\u00fa",
        "\u00c3\u0087": "\u00c7",
        "\u00c3\u0089": "\u00c9",
        "\u00c3\u0093": "\u00d3",
        "\u00c3\u0094": "\u00d4",
        "\u00c3\u009a": "\u00da",
        "\u00c2": "",
    };

    Object.entries(mapaUtf8).forEach(([origem, destino]) => {
        texto = texto.split(origem).join(destino);
    });
    return texto;
}

function formatarMoeda(valor, moeda) {
    if (valor === null || valor === undefined) {
        return "Não disponível";
    }

    try {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: corrigirTexto(moeda || "BRL"),
        }).format(Number(valor));
    } catch {
        return `${corrigirTexto(moeda || "BRL")} ${Number(valor).toFixed(2).replace(".", ",")}`;
    }
}

function formatarData(valor) {
    if (!valor) {
        return "Sem registro";
    }

    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) {
        return "Sem registro";
    }
    return data.toLocaleString("pt-BR");
}

function escaparHtml(valor) {
    return String(valor || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function normalizarTexto(valor) {
    return corrigirTexto(valor)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function mostrarMensagem(texto, tipo = "sucesso") {
    elementos.mensagem.textContent = corrigirTexto(texto);
    elementos.mensagem.dataset.tipo = tipo;
    elementos.mensagem.classList.remove("oculto");

    window.clearTimeout(temporizadorMensagem);
    temporizadorMensagem = window.setTimeout(() => {
        elementos.mensagem.classList.add("oculto");
    }, 3200);
}

function atualizarTelaAbertura(progresso, status = "") {
    const valorFinal = Math.max(0, Math.min(100, Number(progresso || 0)));
    estado.abertura.progresso = valorFinal;
    if (elementos.barraTelaAbertura) {
        elementos.barraTelaAbertura.style.width = `${valorFinal}%`;
    }
    if (status && elementos.statusTelaAbertura) {
        elementos.statusTelaAbertura.textContent = corrigirTexto(status);
    }
}

function iniciarTelaAbertura() {
    estado.abertura.iniciouEm = performance.now();
    estado.abertura.concluida = false;
    atualizarTelaAbertura(6, "Iniciando ambiente local");

    document.body.classList.add("pagina-carregando");
    document.body.classList.remove("pagina-revelando", "pagina-pronta");

    window.clearInterval(temporizadorTelaAbertura);
    temporizadorTelaAbertura = window.setInterval(() => {
        if (estado.abertura.progresso >= 86 || estado.abertura.concluida) {
            return;
        }
        const proximo = estado.abertura.progresso + Math.max(2, (86 - estado.abertura.progresso) * 0.12);
        atualizarTelaAbertura(proximo);
    }, 120);
}

async function concluirTelaAbertura() {
    if (estado.abertura.concluida) {
        return;
    }

    estado.abertura.concluida = true;
    window.clearInterval(temporizadorTelaAbertura);

    const tempoDecorrido = performance.now() - estado.abertura.iniciouEm;
    const esperaMinima = Math.max(0, DURACAO_MINIMA_TELA_ABERTURA_MS - tempoDecorrido);
    if (esperaMinima) {
        await new Promise((resolver) => {
            window.setTimeout(resolver, esperaMinima);
        });
    }

    atualizarTelaAbertura(100, "Ambiente pronto");
    await new Promise((resolver) => {
        window.setTimeout(resolver, 220);
    });

    document.body.classList.remove("pagina-carregando");
    document.body.classList.add("pagina-revelando");

    await new Promise((resolver) => {
        window.setTimeout(resolver, 760);
    });

    elementos.telaAbertura?.classList.add("oculto");
    document.body.classList.remove("pagina-revelando");
    document.body.classList.add("pagina-pronta");
}

function traduzirErro(erro, mensagemPadrao) {
    const texto = corrigirTexto(erro?.message || erro || "").trim();
    if (!texto) {
        return mensagemPadrao;
    }

    const textoNormalizado = normalizarTexto(texto);
    if (
        textoNormalizado.includes("failed to fetch") ||
        textoNormalizado.includes("network error") ||
        textoNormalizado.includes("networkerror") ||
        textoNormalizado.includes("load failed")
    ) {
        return "Não foi possível conectar ao servidor local.";
    }

    if (textoNormalizado.includes("aborterror")) {
        return "A operação foi interrompida antes da conclusão.";
    }

    return texto;
}

async function lerResposta(resposta) {
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) {
        throw new Error(corrigirTexto(dados.erro || "A requisição não pode ser concluída."));
    }
    return dados;
}

async function enviarRequisicao(url, opcoes = {}) {
    try {
        const resposta = await fetch(url, opcoes);
        return await lerResposta(resposta);
    } catch (erro) {
        if (erro?.name === "AbortError") {
            throw erro;
        }
        throw new Error(traduzirErro(erro, "Não foi possível concluir a operação."));
    }
}

function obterRotaAtual() {
    const hash = window.location.hash.replace("#", "").trim();
    if (!hash) {
        return { visao: "inicio", jogoId: null };
    }

    if (hash.startsWith("jogo-")) {
        const jogoId = Number(hash.split("-")[1]);
        return { visao: "detalhe", jogoId: Number.isFinite(jogoId) ? jogoId : null };
    }

    if (["inicio", "biblioteca", "alertas", "status", "configuracao", "detalhe"].includes(hash)) {
        return { visao: hash, jogoId: null };
    }

    return { visao: "inicio", jogoId: null };
}

function navegarPara(visao, jogoId = null) {
    if (visao === "detalhe" && jogoId) {
        window.location.hash = `jogo-${jogoId}`;
        return;
    }

    window.location.hash = visao;
}

function atualizarTituloPagina(visao) {
    const titulos = {
        inicio: "Stecogu | Início",
        biblioteca: "Stecogu | Biblioteca",
        alertas: "Stecogu | Alertas",
        status: "Stecogu | Status",
        configuracao: "Stecogu | Configuração",
        detalhe: "Stecogu | Detalhe do jogo",
    };
    document.title = titulos[visao] || "Stecogu | Monitoramento local";
}

function definirVisaoAtiva(visao) {
    const mudouVisao = estado.visaoAtual !== visao;
    estado.visaoAtual = visao;
    if (visao !== "detalhe") {
        estado.detalheMidia.emFoco = false;
    }

    elementos.visoes.forEach((visaoElemento) => {
        visaoElemento.classList.toggle("visao--ativa", visaoElemento.dataset.visao === visao);
    });

    const visaoAtivaNosMenus = visao === "detalhe" ? "biblioteca" : visao;
    elementos.linksVisao.forEach((link) => {
        const destino = link.getAttribute("href").replace("#", "");
        const ativo = destino === visaoAtivaNosMenus || (visao === "detalhe" && destino === "detalhe");
        link.classList.toggle("ativo", ativo);
    });

    atualizarTituloPagina(visao);

    if (mudouVisao) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

function obterJogoPorId(jogoId) {
    return estado.painel?.jogos?.find((jogo) => Number(jogo.id) === Number(jogoId)) || null;
}

function estadoDaTag(status) {
    const texto = normalizarTexto(status);
    if (texto.includes("abaixo do preco alvo")) {
        return "alvo";
    }
    if (texto.includes("promocao") || texto.includes("preco caiu")) {
        return "promocao";
    }
    return "padrao";
}

function obterResumoMonitoramento(monitoramento) {
    if (monitoramento?.em_execucao) {
        return "Executando agora";
    }
    if (monitoramento?.ultimo_erro) {
        return "Com problema recente";
    }
    if (monitoramento?.ultima_execucao) {
        return "Em operação";
    }
    return "Aguardando";
}

function formatarEnderecoLocal(porta) {
    return porta ? `127.0.0.1:${porta}` : "--";
}

function textoFocoColeta(valor) {
    const mapa = {
        automatico: "Automático",
        api: "Somente API",
        pagina: "Somente página",
    };
    return mapa[String(valor || "").toLowerCase()] || "Automático";
}

function textoIdiomaLoja(valor) {
    const mapa = {
        brazilian: "Português do Brasil",
    };
    return mapa[String(valor || "").toLowerCase()] || "Português do Brasil";
}

function textoPaisLoja(valor) {
    const mapa = {
        br: "Brasil",
    };
    return mapa[String(valor || "").toLowerCase()] || "Brasil";
}

function obterStatusNotificacao() {
    if (!("Notification" in window)) {
        return "Notificações não suportadas";
    }
    const ativasNoPainel = Boolean(estado.painel?.configuracao?.notificacoes_navegador_ativas);
    if (Notification.permission === "granted") {
        return ativasNoPainel ? "Ativas" : "Permitidas, mas desligadas";
    }
    if (Notification.permission === "denied") {
        return "Bloqueadas no navegador";
    }
    return "Permissão não solicitada";
}

function atualizarStatusNotificacao() {
    const status = obterStatusNotificacao();
    elementos.statusNotificacao.textContent = status;
    elementos.estadoNotificacaoHome.textContent = status;
}

function obterLogsRobotAtuais() {
    return estado.logsRobot?.itens?.length ? estado.logsRobot.itens : (estado.painel?.logs_robot || []);
}

function obterLogsRobotFiltrados() {
    const origemAtiva = estado.logsRobot.origem || "todos";
    const busca = normalizarTexto(estado.logsRobot.busca);
    return obterLogsRobotAtuais().filter((log) => {
        if (origemAtiva !== "todos" && String(log.origem || "").toLowerCase() !== origemAtiva) {
            return false;
        }
        if (!busca) {
            return true;
        }
        return [
            log.origem,
            log.etapa,
            log.mensagem,
            log.nome_jogo,
        ].some((campo) => normalizarTexto(campo).includes(busca));
    });
}

function atualizarVisualFiltrosLogsRobot() {
    elementos.filtrosLogsRobot.forEach((botao) => {
        const ativo = botao.dataset.filtroLog === estado.logsRobot.origem;
        botao.classList.toggle("chip-filtro--ativo", ativo);
        botao.setAttribute("aria-pressed", ativo ? "true" : "false");
    });
    elementos.buscaLogsRobot.value = estado.logsRobot.busca;
}

function obterUltimoLogDeColeta() {
    const logs = obterLogsRobotAtuais();
    return logs.find((log) => ["api", "pagina"].includes(String(log.origem || "").toLowerCase())) || null;
}

function normalizarUrlSteamComparacao(valor) {
    return String(valor || "")
        .split("?")[0]
        .replace(/\/+$/, "")
        .toLowerCase();
}

function dataEhDeHoje(valor) {
    if (!valor) {
        return false;
    }
    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) {
        return false;
    }
    const agora = new Date();
    return (
        data.getFullYear() === agora.getFullYear() &&
        data.getMonth() === agora.getMonth() &&
        data.getDate() === agora.getDate()
    );
}

function valorNumericoOuPadrao(valor, padrao = Number.POSITIVE_INFINITY) {
    const numero = Number(valor);
    return Number.isFinite(numero) ? numero : padrao;
}

function obterJogosBibliotecaProcessados() {
    const jogos = [...(estado.painel?.jogos || [])];
    const busca = normalizarTexto(estado.biblioteca.busca);
    const filtro = estado.biblioteca.filtro || "todos";
    const ordenacao = estado.biblioteca.ordenacao || "atualizacao";

    let filtrados = jogos.filter((jogo) => {
        if (!busca) {
            return true;
        }
        return [
            jogo.nome,
            jogo.url,
            jogo.identificador_steam,
            jogo.status_promocao,
        ].some((campo) => normalizarTexto(campo).includes(busca));
    });

    if (filtro === "promocao") {
        filtrados = filtrados.filter((jogo) => Number(jogo.percentual_desconto || 0) > 0);
    } else if (filtro === "alvo") {
        filtrados = filtrados.filter((jogo) => jogo.preco_alvo !== null && jogo.preco_alvo !== undefined);
    } else if (filtro === "recentes") {
        filtrados = filtrados.filter((jogo) => dataEhDeHoje(jogo.ultima_verificacao));
    }

    filtrados.sort((a, b) => {
        if (ordenacao === "desconto") {
            return Number(b.percentual_desconto || 0) - Number(a.percentual_desconto || 0)
                || valorNumericoOuPadrao(new Date(b.ultima_verificacao).getTime(), 0) - valorNumericoOuPadrao(new Date(a.ultima_verificacao).getTime(), 0);
        }
        if (ordenacao === "preco") {
            return valorNumericoOuPadrao(a.preco_atual) - valorNumericoOuPadrao(b.preco_atual)
                || corrigirTexto(a.nome).localeCompare(corrigirTexto(b.nome), "pt-BR");
        }
        if (ordenacao === "nome") {
            return corrigirTexto(a.nome).localeCompare(corrigirTexto(b.nome), "pt-BR");
        }
        return valorNumericoOuPadrao(new Date(b.ultima_verificacao).getTime(), 0) - valorNumericoOuPadrao(new Date(a.ultima_verificacao).getTime(), 0);
    });

    return filtrados;
}

function atualizarVisualFiltrosBiblioteca() {
    elementos.filtrosBiblioteca.forEach((botao) => {
        const ativo = botao.dataset.filtroBiblioteca === estado.biblioteca.filtro;
        botao.classList.toggle("chip-filtro--ativo", ativo);
        botao.setAttribute("aria-pressed", ativo ? "true" : "false");
    });
    elementos.buscaBiblioteca.value = estado.biblioteca.busca;
    elementos.ordenacaoBiblioteca.value = estado.biblioteca.ordenacao;
}

function renderizarResumoBiblioteca(jogosFiltrados) {
    const jogos = estado.painel?.jogos || [];
    const totalPromocao = jogos.filter((jogo) => Number(jogo.percentual_desconto || 0) > 0).length;
    const totalAlvo = jogos.filter((jogo) => jogo.preco_alvo !== null && jogo.preco_alvo !== undefined).length;
    const totalHoje = jogos.filter((jogo) => dataEhDeHoje(jogo.ultima_verificacao)).length;

    elementos.resumoBiblioteca.innerHTML = `
        <article class="resumo-categoria">
            <span>Exibindo agora</span>
            <strong>${jogosFiltrados.length}</strong>
            <small>resultado${jogosFiltrados.length === 1 ? "" : "s"} após os filtros</small>
        </article>
        <article class="resumo-categoria">
            <span>Em promoção</span>
            <strong>${totalPromocao}</strong>
            <small>jogo${totalPromocao === 1 ? "" : "s"} com desconto ativo</small>
        </article>
        <article class="resumo-categoria">
            <span>Com preço-alvo</span>
            <strong>${totalAlvo}</strong>
            <small>monitoramentos com alvo definido</small>
        </article>
        <article class="resumo-categoria">
            <span>Atualizados hoje</span>
            <strong>${totalHoje}</strong>
            <small>coletas registradas hoje</small>
        </article>
    `;
}

function obterJogoMonitoradoPorResultado(resultado) {
    const jogos = estado.painel?.jogos || [];
    const identificador = String(resultado?.identificador_steam || "").trim();
    const url = normalizarUrlSteamComparacao(resultado?.url);

    return jogos.find((jogo) => {
        if (identificador && String(jogo.identificador_steam || "").trim() === identificador) {
            return true;
        }
        return url && normalizarUrlSteamComparacao(jogo.url) === url;
    }) || null;
}

function abrirPainelBuscaSteam() {
    elementos.painelBuscaSteam.classList.remove("oculto");
}

function fecharPainelBuscaSteam() {
    elementos.painelBuscaSteam.classList.add("oculto");
}

function limparBuscaSteam() {
    if (controladorBuscaSteam) {
        controladorBuscaSteam.abort();
        controladorBuscaSteam = null;
    }

    const urlsAdicionando = estado.buscaSteam.urlsAdicionando || new Set();
    estado.buscaSteam = {
        termo: "",
        resultados: [],
        total: 0,
        carregando: false,
        erro: "",
        progresso: 0,
        urlsAdicionando,
    };
    elementos.buscaJogos.value = "";
    resetarProgressoBuscaSteam();
    fecharPainelBuscaSteam();
    renderizarBuscaSteam();
}

function focarBuscaSteam() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    abrirPainelBuscaSteam();
    renderizarBuscaSteam();

    window.setTimeout(() => {
        elementos.buscaJogos.focus();
        elementos.buscaJogos.select();
    }, 220);
}

function iniciarProgressoBuscaSteam() {
    window.clearInterval(temporizadorProgressoBuscaSteam);
    elementos.progressoBuscaSteam.classList.remove("oculto");
    elementos.barraProgressoBuscaSteam.style.width = "12%";
    estado.buscaSteam.progresso = 12;

    temporizadorProgressoBuscaSteam = window.setInterval(() => {
        estado.buscaSteam.progresso = Math.min(92, estado.buscaSteam.progresso + Math.max(4, (100 - estado.buscaSteam.progresso) * 0.12));
        elementos.barraProgressoBuscaSteam.style.width = `${estado.buscaSteam.progresso}%`;
    }, 120);
}

function finalizarProgressoBuscaSteam() {
    window.clearInterval(temporizadorProgressoBuscaSteam);
    estado.buscaSteam.progresso = 100;
    elementos.barraProgressoBuscaSteam.style.width = "100%";
    window.setTimeout(() => {
        elementos.progressoBuscaSteam.classList.add("oculto");
        elementos.barraProgressoBuscaSteam.style.width = "0%";
        estado.buscaSteam.progresso = 0;
    }, 180);
}

function resetarProgressoBuscaSteam() {
    window.clearInterval(temporizadorProgressoBuscaSteam);
    estado.buscaSteam.progresso = 0;
    elementos.progressoBuscaSteam.classList.add("oculto");
    elementos.barraProgressoBuscaSteam.style.width = "0%";
}

const IMAGEM_PADRAO_PROJETO = "/assets/imagens/logo-stecogu.png";

function obterImagemJogo(jogo) {
    return jogo?.imagem_capa || jogo?.imagem_capsula || jogo?.imagem_header || jogo?.imagem_banner || IMAGEM_PADRAO_PROJETO;
}

function obterCapsulaJogo(jogo) {
    return jogo?.imagem_capsula || jogo?.imagem_capa || jogo?.imagem_header || jogo?.imagem_banner || IMAGEM_PADRAO_PROJETO;
}

function obterBannerJogo(jogo) {
    return jogo?.imagem_banner || jogo?.imagem_header || jogo?.imagem_capa || jogo?.imagem_capsula || IMAGEM_PADRAO_PROJETO;
}

function obterFallbackImagemJogo(jogo) {
    return jogo?.imagem_capa || jogo?.imagem_capsula || jogo?.imagem_header || jogo?.imagem_banner || IMAGEM_PADRAO_PROJETO;
}

function obterImagemResultadoSteam(resultado) {
    return resultado?.imagem_capsula || resultado?.imagem_capa || resultado?.imagem || IMAGEM_PADRAO_PROJETO;
}

function obterGaleriaJogo(jogo) {
    const itens = [];
    const vistos = new Set();
    const adicionar = (imagem, miniatura, rotulo) => {
        const imagemFinal = String(imagem || "").trim();
        if (!imagemFinal || vistos.has(imagemFinal)) {
            return;
        }
        vistos.add(imagemFinal);
        itens.push({
            imagem: imagemFinal,
            miniatura: String(miniatura || imagemFinal).trim() || imagemFinal,
            rotulo,
        });
    };

    adicionar(obterBannerJogo(jogo), jogo?.imagem_banner || jogo?.imagem_header, "Destaque");
    adicionar(obterImagemJogo(jogo), jogo?.imagem_capsula || jogo?.imagem_capa, "Capa");
    (jogo?.capturas_tela || []).forEach((captura, indice) => {
        adicionar(captura?.imagem, captura?.miniatura, `Foto ${indice + 1}`);
    });

    if (!itens.length) {
        adicionar(IMAGEM_PADRAO_PROJETO, IMAGEM_PADRAO_PROJETO, "Imagem");
    }

    return itens;
}

function obterRotuloTipoItem(tipoItem) {
    return {
        jogo: "Jogo",
        pacote: "Pacote",
        bundle: "Bundle",
        item: "Item",
    }[String(tipoItem || "").toLowerCase()] || "Item";
}

function formatarListaDetalhe(itens, textoPadrao = "Não informado") {
    const lista = Array.isArray(itens)
        ? itens.map((item) => corrigirTexto(item).trim()).filter(Boolean)
        : [];
    return lista.length ? lista.join(", ") : textoPadrao;
}

function obterResumoCurtoJogo(jogo) {
    const resumo = corrigirTexto(jogo?.descricao_curta || "").trim();
    if (resumo) {
        return resumo;
    }
    return `Acompanhe ${corrigirTexto(jogo?.nome || "este jogo")} em uma vitrine local com preço atual, histórico recente e alertas de promoção.`;
}

function obterEtiquetasJogo(jogo) {
    const vistos = new Set();
    const etiquetas = [];
    [...(jogo?.generos || []), ...(jogo?.marcadores || []), ...(jogo?.plataformas || [])].forEach((item) => {
        const texto = corrigirTexto(item).trim();
        const chave = normalizarTexto(texto);
        if (!texto || vistos.has(chave)) {
            return;
        }
        vistos.add(chave);
        etiquetas.push(texto);
    });
    return etiquetas.slice(0, 10);
}

function obterStatusRotacaoDetalhe(totalMidias) {
    if (totalMidias <= 1) {
        return "Galeria fixa";
    }
    if (estado.detalheMidia.pausadoManual) {
        return "Rotação automática pausada";
    }
    if (estado.detalheMidia.emFoco) {
        return "Rotação pausada enquanto você explora a galeria";
    }
    const restante = Math.max(1, Math.ceil(((100 - (estado.detalheMidia.progresso || 0)) / 100) * (DURACAO_ROTACAO_DETALHE_MS / 1000)));
    return `Próxima mídia em ${restante}s`;
}

function atualizarProgressoMidiaDetalhe() {
    const jogo = obterJogoPorId(estado.jogoSelecionadoId);
    const galeria = jogo ? obterGaleriaJogo(jogo) : [];
    const barra = elementos.painelDetalheJogo.querySelector("[data-detalhe-progresso]");
    const status = elementos.painelDetalheJogo.querySelector("[data-detalhe-status-rotacao]");
    if (barra) {
        const valor = galeria.length > 1 ? Math.max(0, Math.min(100, estado.detalheMidia.progresso || 0)) : 100;
        barra.style.width = `${valor}%`;
    }
    if (status) {
        status.textContent = obterStatusRotacaoDetalhe(galeria.length);
    }
}

function alinharMiniaturaAtivaDetalhe() {
    const miniaturaAtiva = elementos.painelDetalheJogo.querySelector(".detalhe-jogo__miniatura--ativa");
    if (!miniaturaAtiva) {
        return;
    }
    miniaturaAtiva.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
    });
}

function configurarInteracoesMidiaDetalhe() {
    const area = elementos.painelDetalheJogo.querySelector(".detalhe-jogo__bloco--principal");
    if (!area) {
        return;
    }

    estado.detalheMidia.emFoco = area.matches(":hover") || area.contains(document.activeElement);
    atualizarProgressoMidiaDetalhe();

    area.addEventListener("mouseenter", () => {
        estado.detalheMidia.emFoco = true;
        atualizarProgressoMidiaDetalhe();
    });
    area.addEventListener("mouseleave", () => {
        estado.detalheMidia.emFoco = false;
        atualizarProgressoMidiaDetalhe();
    });
    area.addEventListener("focusin", () => {
        estado.detalheMidia.emFoco = true;
        atualizarProgressoMidiaDetalhe();
    });
    area.addEventListener("focusout", (evento) => {
        if (evento.relatedTarget && area.contains(evento.relatedTarget)) {
            return;
        }
        estado.detalheMidia.emFoco = false;
        atualizarProgressoMidiaDetalhe();
    });
}

function iniciarRotacaoAutomaticaDetalhe() {
    window.clearInterval(temporizadorDetalheMidia);
    let ultimoTick = Date.now();

    temporizadorDetalheMidia = window.setInterval(() => {
        const agora = Date.now();
        const diferenca = agora - ultimoTick;
        ultimoTick = agora;

        if (estado.visaoAtual !== "detalhe" || !estado.jogoSelecionadoId || document.hidden) {
            return;
        }

        const jogo = obterJogoPorId(estado.jogoSelecionadoId);
        const galeria = jogo ? obterGaleriaJogo(jogo) : [];
        if (galeria.length <= 1) {
            if (estado.detalheMidia.progresso !== 0) {
                estado.detalheMidia.progresso = 0;
                atualizarProgressoMidiaDetalhe();
            }
            return;
        }

        if (estado.detalheMidia.pausadoManual || estado.detalheMidia.emFoco) {
            atualizarProgressoMidiaDetalhe();
            return;
        }

        estado.detalheMidia.progresso = Math.min(
            100,
            (estado.detalheMidia.progresso || 0) + ((diferenca / DURACAO_ROTACAO_DETALHE_MS) * 100),
        );
        atualizarProgressoMidiaDetalhe();

        if (estado.detalheMidia.progresso >= 100) {
            estado.detalheMidia.progresso = 0;
            void selecionarMidiaDetalhe((estado.detalheMidia.indice || 0) + 1);
        }
    }, 120);
}

function atributoErroImagem(urlFallback) {
    return `this.onerror=null;this.src='${String(urlFallback || IMAGEM_PADRAO_PROJETO).replace(/'/g, "\\'")}';`;
}

function renderizarBuscaSteam() {
    const busca = estado.buscaSteam;
    const termo = corrigirTexto(busca.termo || "");

    elementos.tituloBuscaSteam.textContent = termo ? `Resultados para "${termo}"` : "Buscar na Steam";

    if (!termo) {
        elementos.contagemBuscaSteam.textContent = "Digite pelo menos 2 caracteres para pesquisar.";
        elementos.listaBuscaSteam.innerHTML = '<div class="vazio">Digite o nome de um jogo para buscar na Steam.</div>';
        resetarProgressoBuscaSteam();
        return;
    }

    if (busca.carregando) {
        elementos.contagemBuscaSteam.textContent = `Consultando a busca da Steam ${Math.round(busca.progresso || 0)}%.`;
        elementos.listaBuscaSteam.innerHTML = '<div class="vazio">Buscando jogos na Steam.</div>';
        return;
    }

    if (busca.erro) {
        elementos.contagemBuscaSteam.textContent = "Não foi possível carregar os resultados.";
        elementos.listaBuscaSteam.innerHTML = `<div class="vazio">${escaparHtml(corrigirTexto(busca.erro))}</div>`;
        return;
    }

    if (!busca.resultados.length) {
        elementos.contagemBuscaSteam.textContent = "Nenhum jogo encontrado na Steam para este termo.";
        elementos.listaBuscaSteam.innerHTML = '<div class="vazio">Tente pesquisar com outro nome ou termo mais específico.</div>';
        return;
    }

    const total = Number(busca.total || busca.resultados.length);
    elementos.contagemBuscaSteam.textContent = `${busca.resultados.length} resultado${busca.resultados.length === 1 ? "" : "s"} exibido${busca.resultados.length === 1 ? "" : "s"} de ${total} encontrado${total === 1 ? "" : "s"}.`;

    elementos.listaBuscaSteam.innerHTML = busca.resultados.map((resultado) => {
        const jogoMonitorado = obterJogoMonitoradoPorResultado(resultado);
        const urlCodificada = encodeURIComponent(resultado.url);
        const adicionandoAgora = busca.urlsAdicionando.has(resultado.url);
        const plataformas = (resultado.plataformas || []).map((plataforma) => `
            <span class="resultado-busca-steam__plataforma">${escaparHtml(corrigirTexto(plataforma))}</span>
        `).join("");
        const desconto = Number(resultado.desconto_percentual || 0) > 0
            ? `<span class="resultado-busca-steam__desconto">-${Number(resultado.desconto_percentual || 0)}%</span>`
            : "";
        const precoOriginal = resultado.preco_original_texto
            ? `<span class="resultado-busca-steam__preco-original">${escaparHtml(corrigirTexto(resultado.preco_original_texto))}</span>`
            : "";
        const tipoItem = {
            jogo: "Jogo",
            pacote: "Pacote",
            bundle: "Bundle",
            item: "Item",
        }[String(resultado.tipo_item || "").toLowerCase()] || "Item";
        const seloMonitorado = jogoMonitorado
            ? '<span class="resultado-busca-steam__selo resultado-busca-steam__selo--monitorado">Já monitorado</span>'
            : '<span class="resultado-busca-steam__selo">Disponível para adicionar</span>';
        const acaoPrincipal = jogoMonitorado
            ? `<button class="resultado-busca-steam__botao resultado-busca-steam__botao--secundario" type="button" data-acao="abrir-detalhe" data-jogo="${jogoMonitorado.id}">Abrir detalhe</button>`
            : `<button class="resultado-busca-steam__botao resultado-busca-steam__botao--primario" type="button" data-acao="adicionar-resultado-steam" data-url="${urlCodificada}" ${adicionandoAgora ? "disabled" : ""}>${adicionandoAgora ? "Adicionando..." : "Adicionar"}</button>`;

        return `
            <article class="resultado-busca-steam${jogoMonitorado ? " resultado-busca-steam--monitorado" : ""}">
                <a class="resultado-busca-steam__imagem" href="${escaparHtml(resultado.url)}" target="_blank" rel="noreferrer">
                    <img src="${escaparHtml(obterImagemResultadoSteam(resultado))}" alt="${escaparHtml(corrigirTexto(resultado.nome))}" loading="lazy" decoding="async" onerror="${atributoErroImagem(IMAGEM_PADRAO_PROJETO)}">
                </a>
                <div class="resultado-busca-steam__conteudo">
                    <div class="resultado-busca-steam__topo">
                        <div>
                            <strong>${escaparHtml(corrigirTexto(resultado.nome))}</strong>
                            <div class="resultado-busca-steam__meta">
                                <span>${escaparHtml(tipoItem)}</span>
                                <span>${escaparHtml(corrigirTexto(resultado.data_lancamento || "Data não informada"))}</span>
                            </div>
                        </div>
                        ${seloMonitorado}
                    </div>
                    <div class="resultado-busca-steam__plataformas">${plataformas || '<span class="resultado-busca-steam__plataforma">Plataformas não informadas</span>'}</div>
                    <div class="resultado-busca-steam__precos">
                        ${desconto}
                        <div class="resultado-busca-steam__precos-texto">
                            ${precoOriginal}
                            <strong>${escaparHtml(corrigirTexto(resultado.preco_atual_texto || "Preço indisponível"))}</strong>
                        </div>
                    </div>
                </div>
                <div class="resultado-busca-steam__acoes">
                    ${acaoPrincipal}
                    <a class="resultado-busca-steam__botao resultado-busca-steam__botao--link" href="${escaparHtml(resultado.url)}" target="_blank" rel="noreferrer">Abrir na Steam</a>
                </div>
            </article>
        `;
    }).join("");
}

async function buscarJogosNaSteam(termo) {
    const termoLimpo = corrigirTexto((termo || "").trim());
    const urlsAdicionando = estado.buscaSteam.urlsAdicionando || new Set();
    estado.buscaSteam.termo = termoLimpo;

    if (termoLimpo.length < 2) {
        estado.buscaSteam = {
            termo: termoLimpo,
            resultados: [],
            total: 0,
            carregando: false,
            erro: "",
            progresso: 0,
            urlsAdicionando,
        };
        renderizarBuscaSteam();
        if (!termoLimpo) {
            fecharPainelBuscaSteam();
        } else {
            abrirPainelBuscaSteam();
        }
        return;
    }

    if (controladorBuscaSteam) {
        controladorBuscaSteam.abort();
    }

    controladorBuscaSteam = new AbortController();
    const identificadorAtual = ++identificadorBuscaSteam;

    estado.buscaSteam = {
        termo: termoLimpo,
        resultados: [],
        total: 0,
        carregando: true,
        erro: "",
        progresso: 12,
        urlsAdicionando,
    };
    iniciarProgressoBuscaSteam();
    abrirPainelBuscaSteam();
    renderizarBuscaSteam();

    try {
        const dados = await enviarRequisicao(`/api/steam/busca?termo=${encodeURIComponent(termoLimpo)}&limite=25`, {
            signal: controladorBuscaSteam.signal,
        });

        if (identificadorAtual !== identificadorBuscaSteam) {
            return;
        }

        estado.buscaSteam = {
            termo: corrigirTexto(dados.termo || termoLimpo),
            resultados: dados.resultados || [],
            total: Number(dados.total || 0),
            carregando: false,
            erro: "",
            progresso: 100,
            urlsAdicionando,
        };
        finalizarProgressoBuscaSteam();
        renderizarBuscaSteam();
    } catch (erro) {
        if (erro?.name === "AbortError" || identificadorAtual !== identificadorBuscaSteam) {
            return;
        }

        estado.buscaSteam = {
            termo: termoLimpo,
            resultados: [],
            total: 0,
            carregando: false,
            erro: traduzirErro(erro, "Não foi possível buscar jogos na Steam."),
            progresso: 0,
            urlsAdicionando,
        };
        resetarProgressoBuscaSteam();
        abrirPainelBuscaSteam();
        renderizarBuscaSteam();
    }
}

function agendarBuscaSteam() {
    window.clearTimeout(temporizadorBuscaSteam);
    temporizadorBuscaSteam = window.setTimeout(() => {
        void buscarJogosNaSteam(elementos.buscaJogos.value);
    }, 360);
}

function atualizarVisualFocoColeta(valor) {
    const focoAtual = String(valor || "automatico").toLowerCase();
    elementos.opcoesFocoColeta.forEach((opcao) => {
        const ativa = opcao.dataset.focoColetaOpcao === focoAtual;
        opcao.classList.toggle("escolha-foco--ativa", ativa);
        opcao.setAttribute("aria-pressed", ativa ? "true" : "false");
    });
}

function preencherConfiguracao(configuracao) {
    const focoColeta = configuracao?.foco_coleta || "automatico";
    elementos.campoIntervalo.value = configuracao?.intervalo_minutos || 15;
    elementos.campoFocoColeta.value = focoColeta;
    elementos.campoIdiomaLoja.value = "brazilian";
    elementos.campoPaisLoja.value = "br";
    elementos.campoTimeoutRequisicao.value = configuracao?.timeout_requisicao_segundos || 30;
    elementos.campoLimiteLogsRobot.value = configuracao?.limite_logs_robot || 40;
    elementos.campoRegistrarLogsRobot.checked = Boolean(configuracao?.registrar_logs_robot);
    elementos.campoAbrirNavegador.checked = Boolean(configuracao?.abrir_navegador);
    atualizarVisualFocoColeta(focoColeta);
}

function atualizarResumo(dados) {
    const ultimoLog = obterUltimoLogDeColeta();
    const versaoProjeto = corrigirTexto(dados.projeto?.versao || "1.0");

    elementos.resumoJogos.textContent = dados.resumo?.total_jogos ?? 0;
    elementos.resumoPromocoes.textContent = dados.resumo?.total_promocoes ?? 0;
    elementos.resumoAlertas.textContent = dados.resumo?.total_alertas ?? 0;
    elementos.resumoProxima.textContent = formatarData(dados.monitoramento?.proxima_execucao);
    elementos.portaLocal.textContent = formatarEnderecoLocal(dados.porta);
    elementos.portaLocalHome.textContent = formatarEnderecoLocal(dados.porta);
    elementos.estadoResumidoHome.textContent = obterResumoMonitoramento(dados.monitoramento);
    elementos.statusUltimaExecucao.textContent = formatarData(dados.monitoramento?.ultima_execucao);
    elementos.statusProximaExecucao.textContent = formatarData(dados.monitoramento?.proxima_execucao);
    elementos.statusUltimoErro.textContent = corrigirTexto(dados.monitoramento?.ultimo_erro || "Nenhum");
    elementos.versaoProjetoTopo.textContent = `Versão ${versaoProjeto}`;
    elementos.versaoProjetoHome.textContent = `Versão ${versaoProjeto}`;
    elementos.versaoProjetoStatus.textContent = `Versão ${versaoProjeto}`;
    elementos.versaoProjetoConfig.textContent = `Versão ${versaoProjeto}`;
    elementos.versaoProjetoCard.textContent = versaoProjeto;
    elementos.focoColetaHome.textContent = textoFocoColeta(dados.robot?.foco_coleta);
    elementos.focoColetaConfig.textContent = textoFocoColeta(dados.robot?.foco_coleta);
    elementos.origemColetaHome.textContent = ultimoLog ? corrigirTexto(ultimoLog.origem).toUpperCase() : "Sem coleta recente";
    elementos.origemColetaStatus.textContent = ultimoLog ? `Origem ${corrigirTexto(ultimoLog.origem).toUpperCase()}` : "Sem origem recente";
    elementos.origemColetaConfig.textContent = ultimoLog ? corrigirTexto(ultimoLog.origem).toUpperCase() : "Aguardando";
    elementos.timeoutRequisicaoStatus.textContent = `${dados.robot?.timeout_requisicao_segundos || 30}s`;

    if (dados.monitoramento?.em_execucao) {
        elementos.estadoMonitoramento.textContent = "O robô está consultando os jogos neste momento.";
    } else if (dados.monitoramento?.ultimo_erro) {
        elementos.estadoMonitoramento.textContent = `Último problema encontrado: ${corrigirTexto(dados.monitoramento.ultimo_erro)}`;
    } else if (dados.monitoramento?.ultima_execucao) {
        elementos.estadoMonitoramento.textContent = `Última execução registrada em ${formatarData(dados.monitoramento.ultima_execucao)}.`;
    } else {
        elementos.estadoMonitoramento.textContent = "O monitoramento está pronto e aguardando a primeira execução.";
    }

    elementos.botoesMonitorarAgora.forEach((botao) => {
        botao.disabled = Boolean(dados.monitoramento?.em_execucao);
    });

    atualizarStatusNotificacao();
}

function criarSlides(dados) {
    const jogos = dados?.jogos || [];
    const temas = [
        ["#2b547f", "#102235"],
        ["#563468", "#1d1f39"],
        ["#255d52", "#12282c"],
        ["#6c4429", "#231a1b"],
        ["#475f78", "#151f2e"],
    ];

    if (jogos.length) {
        return jogos.slice(0, 5).map((jogo, indice) => ({
            tipo: "jogo",
            id: jogo.id,
            titulo: corrigirTexto(jogo.nome),
            descricao: `Preço atual em ${formatarMoeda(jogo.preco_atual, jogo.moeda)} com status ${normalizarTexto(jogo.status_promocao) === "sem promocao" ? "sem promoção" : corrigirTexto(jogo.status_promocao).toLowerCase()}. Clique para abrir a tela exclusiva deste jogo e acompanhar histórico, alvo e atualizações.`,
            selo: jogo.percentual_desconto > 0 ? "Jogo em destaque" : "Monitoramento ativo",
            acaoPrimaria: "Ver detalhe",
            acaoSecundaria: "Abrir biblioteca",
            destinoPrimario: "detalhe",
            destinoSecundario: "biblioteca",
            destaque: jogo.preco_alvo !== null ? `Preço alvo ${formatarMoeda(jogo.preco_alvo, jogo.moeda)}` : "Preço alvo não definido",
            metricaA: { rotulo: "Preço atual", valor: formatarMoeda(jogo.preco_atual, jogo.moeda) },
            metricaB: { rotulo: "Último salvo", valor: formatarMoeda(jogo.ultimo_preco_salvo, jogo.moeda) },
            metricaC: { rotulo: "Status", valor: corrigirTexto(jogo.status_promocao) },
            imagemBanner: obterBannerJogo(jogo),
            imagemMiniatura: obterCapsulaJogo(jogo),
            cor1: temas[indice % temas.length][0],
            cor2: temas[indice % temas.length][1],
        }));
    }

    return [
        {
            tipo: "projeto",
            titulo: "Cole o link e comece a monitorar",
            descricao: "Adicione um jogo da Steam, registre o preço inicial e deixe o robô acompanhar automaticamente.",
            selo: "Primeiro passo",
            acaoPrimaria: "Abrir configuração",
            acaoSecundaria: "Ir para biblioteca",
            destinoPrimario: "configuracao",
            destinoSecundario: "biblioteca",
            destaque: "Sem jogos monitorados ainda",
            metricaA: { rotulo: "Fluxo", valor: "Link, coleta e alerta" },
            metricaB: { rotulo: "Tecnologia", valor: "Flask + Robot" },
            metricaC: { rotulo: "Dados", valor: "SQLite local" },
            imagemBanner: "",
            imagemMiniatura: IMAGEM_PADRAO_PROJETO,
            cor1: "#2a4d75",
            cor2: "#101c2d",
        },
        {
            tipo: "projeto",
            titulo: "Receba avisos quando o valor cair",
            descricao: "O sistema compara o novo valor com o último preço salvo e registra alertas quando detecta queda ou promoção.",
            selo: "Histórico local",
            acaoPrimaria: "Ver alertas",
            acaoSecundaria: "Abrir status",
            destinoPrimario: "alertas",
            destinoSecundario: "status",
            destaque: "Monitoramento a cada intervalo definido",
            metricaA: { rotulo: "Alertas", valor: "Promoção e alvo" },
            metricaB: { rotulo: "Visão", valor: "Detalhe por jogo" },
            metricaC: { rotulo: "Execução", valor: "Servidor local" },
            imagemBanner: "",
            imagemMiniatura: IMAGEM_PADRAO_PROJETO,
            cor1: "#4c386f",
            cor2: "#191d36",
        },
        {
            tipo: "projeto",
            titulo: "Navegue por views sem misturar tudo",
            descricao: "Início, biblioteca, alertas, status, configuração e detalhe funcionam na mesma rota sem carregar todos os dados em uma única tela.",
            selo: "Interface refinada",
            acaoPrimaria: "Voltar ao início",
            acaoSecundaria: "Abrir configuração",
            destinoPrimario: "inicio",
            destinoSecundario: "configuracao",
            destaque: "Contexto customizado e rodapé com GitHub",
            metricaA: { rotulo: "Visual", valor: "Inspirado na Steam" },
            metricaB: { rotulo: "Contexto", valor: "Clique direito" },
            metricaC: { rotulo: "Seleção", valor: "Cor personalizada" },
            imagemBanner: "",
            imagemMiniatura: IMAGEM_PADRAO_PROJETO,
            cor1: "#24595a",
            cor2: "#11262b",
        },
    ];
}

function renderizarCarrossel() {
    estado.slides = criarSlides(estado.painel);

    if (!estado.slides.length) {
        elementos.carrosselPrincipal.innerHTML = '<div class="vazio">Nenhum slide disponivel.</div>';
        elementos.listaMiniaturasSlide.innerHTML = "";
        elementos.listaIndicadoresSlide.innerHTML = "";
        elementos.textoSlideAtual.textContent = "Sem destaque";
        return;
    }

    if (estado.indiceSlide >= estado.slides.length) {
        estado.indiceSlide = 0;
    }

    const slide = estado.slides[estado.indiceSlide];
    elementos.textoSlideAtual.textContent = slide.titulo;

    elementos.carrosselPrincipal.innerHTML = `
        <article class="slide-hero" style="--slide-cor-1:${slide.cor1}; --slide-cor-2:${slide.cor2};" data-slide-jogo="${slide.id || ""}">
            ${slide.imagemBanner ? `<div class="slide-hero__midia"><img src="${escaparHtml(slide.imagemBanner)}" alt="${escaparHtml(slide.titulo)}" loading="eager" decoding="async" onerror="${atributoErroImagem(IMAGEM_PADRAO_PROJETO)}"></div>` : ""}
            <div class="slide-hero__camada"></div>
            <div class="slide-hero__conteudo">
                <div>
                    <span class="slide-hero__selo">${slide.selo}</span>
                    <h2 class="slide-hero__titulo">${slide.titulo}</h2>
                    <p class="slide-hero__descricao">${slide.descricao}</p>
                    <div class="slide-hero__acoes">
                        <button class="botao-primario" type="button" data-acao-slide="primaria">${slide.acaoPrimaria}</button>
                        <button class="botao-secundario" type="button" data-acao-slide="secundaria">${slide.acaoSecundaria}</button>
                        <span class="tag-mini">${slide.destaque}</span>
                    </div>
                </div>
                <div class="slide-hero__metricas">
                    <div class="slide-hero__metrica">
                        <span>${slide.metricaA.rotulo}</span>
                        <strong>${slide.metricaA.valor}</strong>
                    </div>
                    <div class="slide-hero__metrica">
                        <span>${slide.metricaB.rotulo}</span>
                        <strong>${slide.metricaB.valor}</strong>
                    </div>
                    <div class="slide-hero__metrica">
                        <span>${slide.metricaC.rotulo}</span>
                        <strong>${slide.metricaC.valor}</strong>
                    </div>
                </div>
            </div>
        </article>
    `;

    elementos.listaMiniaturasSlide.innerHTML = estado.slides
        .map((item, indice) => `
            <button class="mini-slide ${indice === estado.indiceSlide ? "mini-slide--ativo" : ""}" type="button" data-slide="${indice}">
                <span class="mini-slide__imagem">
                    <img src="${escaparHtml(item.imagemMiniatura || IMAGEM_PADRAO_PROJETO)}" alt="${escaparHtml(item.titulo)}" loading="lazy" decoding="async" onerror="${atributoErroImagem(IMAGEM_PADRAO_PROJETO)}">
                </span>
                <span class="mini-slide__info">
                    <span class="mini-slide__rotulo">${item.selo}</span>
                    <strong>${item.titulo}</strong>
                    <p>${item.destaque}</p>
                </span>
            </button>
        `)
        .join("");

    elementos.listaIndicadoresSlide.innerHTML = estado.slides
        .map((item, indice) => `
            <button class="carrossel__ponto ${indice === estado.indiceSlide ? "carrossel__ponto--ativo" : ""}" type="button" data-slide="${indice}" aria-label="Ir para ${item.titulo}"></button>
        `)
        .join("");

    elementos.botaoSlidePausa.textContent = estado.carrosselPausado ? "Retomar" : "Pausar";
}

function mudarSlide(passos) {
    if (!estado.slides.length) {
        return;
    }

    estado.indiceSlide = (estado.indiceSlide + passos + estado.slides.length) % estado.slides.length;
    renderizarCarrossel();
}

function irParaSlide(indice) {
    if (!estado.slides.length) {
        return;
    }

    estado.indiceSlide = indice;
    renderizarCarrossel();
}

function iniciarCarrosselAutomatico() {
    window.clearInterval(temporizadorCarrossel);
    temporizadorCarrossel = window.setInterval(() => {
        if (!estado.slides.length || estado.carrosselPausado || estado.carrosselEmFoco || estado.visaoAtual !== "inicio") {
            return;
        }
        mudarSlide(1);
    }, 6500);
}

function renderizarDestaques() {
    const jogos = estado.painel?.jogos || [];
    if (!jogos.length) {
        elementos.gradeDestaques.innerHTML = '<div class="vazio">Adicione um jogo para preencher a biblioteca em destaque.</div>';
        return;
    }

    elementos.gradeDestaques.innerHTML = jogos.slice(0, 4).map((jogo) => `
        <article class="card-destaque" data-jogo="${jogo.id}">
            <div class="card-destaque__rotulo">
                <span>${jogo.identificador_steam ? `App ${corrigirTexto(jogo.identificador_steam)}` : "Steam"}</span>
                <span class="tag-status" data-estado="${estadoDaTag(jogo.status_promocao)}">${corrigirTexto(jogo.status_promocao)}</span>
            </div>
            <h3>${corrigirTexto(jogo.nome)}</h3>
            <p>Preço atual em ${formatarMoeda(jogo.preco_atual, jogo.moeda)}. Clique para abrir somente a tela desse jogo.</p>
        </article>
    `).join("");
}

function renderizarBiblioteca() {
    const jogosFiltrados = obterJogosBibliotecaProcessados();
    atualizarVisualFiltrosBiblioteca();
    renderizarResumoBiblioteca(jogosFiltrados);

    elementos.contadorJogosVisiveis.textContent = `${jogosFiltrados.length} jogo${jogosFiltrados.length === 1 ? "" : "s"}`;

    if (!jogosFiltrados.length) {
        const mensagem = estado.biblioteca.busca || estado.biblioteca.filtro !== "todos"
            ? "Nenhum jogo corresponde aos filtros atuais."
            : "Nenhum jogo está sendo monitorado ainda.";
        elementos.listaJogos.innerHTML = `<div class="vazio">${mensagem}</div>`;
        return;
    }

    elementos.listaJogos.innerHTML = jogosFiltrados.map((jogo) => {
        const desconto = jogo.percentual_desconto > 0
            ? `<span class="tag-desconto">${jogo.percentual_desconto}% de desconto</span>`
            : "";
        const precoAlvo = jogo.preco_alvo !== null ? formatarMoeda(jogo.preco_alvo, jogo.moeda) : "Não definido";

        return `
            <article class="card-jogo" data-jogo="${jogo.id}">
                <div class="card-jogo__rotulo">
                    <span>${jogo.identificador_steam ? `App ${corrigirTexto(jogo.identificador_steam)}` : "Steam"}</span>
                    <span class="tag-status" data-estado="${estadoDaTag(jogo.status_promocao)}">${corrigirTexto(jogo.status_promocao)}</span>
                </div>
                <h3>${corrigirTexto(jogo.nome)}</h3>
                <p>Última verificação em ${formatarData(jogo.ultima_verificacao)}.</p>
                <a class="card-jogo__link" href="${jogo.url}" target="_blank" rel="noreferrer">Abrir página do jogo na Steam</a>
                <div class="card-jogo__precos">
                    <div class="card-jogo__preco">
                        <span>Preço atual</span>
                        <strong>${formatarMoeda(jogo.preco_atual, jogo.moeda)}</strong>
                    </div>
                    <div class="card-jogo__preco">
                        <span>Último salvo</span>
                        <strong>${formatarMoeda(jogo.ultimo_preco_salvo, jogo.moeda)}</strong>
                    </div>
                    <div class="card-jogo__preco">
                        <span>Preço alvo</span>
                        <strong>${precoAlvo}</strong>
                    </div>
                </div>
                <div class="card-jogo__rodape">
                    <div>${desconto}</div>
                    <div class="acoes-detalhe">
                        <button class="card-jogo__acao" type="button" data-acao="abrir-detalhe" data-jogo="${jogo.id}">Ver detalhe</button>
                        <button class="card-jogo__acao" type="button" data-acao="atualizar-jogo" data-jogo="${jogo.id}">Atualizar agora</button>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function renderizarDestaques() {
    const jogos = estado.painel?.jogos || [];
    if (!jogos.length) {
        elementos.gradeDestaques.innerHTML = '<div class="vazio">Adicione um jogo para preencher a biblioteca em destaque.</div>';
        return;
    }

    elementos.gradeDestaques.innerHTML = jogos.slice(0, 4).map((jogo) => `
        <article class="card-destaque card-destaque--steam" data-jogo="${jogo.id}">
            <div class="card-destaque__midia">
                <img src="${escaparHtml(obterCapsulaJogo(jogo))}" alt="${escaparHtml(corrigirTexto(jogo.nome))}" loading="lazy" decoding="async" onerror="${atributoErroImagem(obterFallbackImagemJogo(jogo))}">
            </div>
            <div class="card-destaque__conteudo">
                <div class="card-destaque__rotulo">
                    <span>${jogo.identificador_steam ? `App ${corrigirTexto(jogo.identificador_steam)}` : "Steam"}</span>
                    <span class="tag-status" data-estado="${estadoDaTag(jogo.status_promocao)}">${corrigirTexto(jogo.status_promocao)}</span>
                </div>
                <h3>${corrigirTexto(jogo.nome)}</h3>
                <p>Preço atual em ${formatarMoeda(jogo.preco_atual, jogo.moeda)}. Abra o detalhe para ver histórico, alertas e ações rápidas.</p>
            </div>
        </article>
    `).join("");
}

function renderizarBiblioteca() {
    const jogosFiltrados = obterJogosBibliotecaProcessados();
    atualizarVisualFiltrosBiblioteca();
    renderizarResumoBiblioteca(jogosFiltrados);

    elementos.contadorJogosVisiveis.textContent = `${jogosFiltrados.length} jogo${jogosFiltrados.length === 1 ? "" : "s"}`;

    if (!jogosFiltrados.length) {
        const mensagem = estado.biblioteca.busca || estado.biblioteca.filtro !== "todos"
            ? "Nenhum jogo corresponde aos filtros atuais."
            : "Nenhum jogo está sendo monitorado ainda.";
        elementos.listaJogos.innerHTML = `<div class="vazio">${mensagem}</div>`;
        return;
    }

    elementos.listaJogos.innerHTML = jogosFiltrados.map((jogo) => {
        const desconto = jogo.percentual_desconto > 0
            ? `<span class="tag-desconto">${jogo.percentual_desconto}% de desconto</span>`
            : "";
        const precoAlvo = jogo.preco_alvo !== null ? formatarMoeda(jogo.preco_alvo, jogo.moeda) : "Não definido";

        return `
            <article class="card-jogo card-jogo--steam" data-jogo="${jogo.id}">
                <div class="card-jogo__midia">
                    <img src="${escaparHtml(obterBannerJogo(jogo))}" alt="${escaparHtml(corrigirTexto(jogo.nome))}" loading="lazy" decoding="async" onerror="${atributoErroImagem(obterFallbackImagemJogo(jogo))}">
                    <div class="card-jogo__midia-sombra"></div>
                    <div class="card-jogo__midia-conteudo">
                        <span>${jogo.identificador_steam ? `App ${corrigirTexto(jogo.identificador_steam)}` : "Steam"}</span>
                        <strong>${corrigirTexto(jogo.nome)}</strong>
                        <small>Última verificação em ${formatarData(jogo.ultima_verificacao)}</small>
                    </div>
                </div>
                <div class="card-jogo__conteudo">
                    <div class="card-jogo__rotulo">
                        <span class="tag-status" data-estado="${estadoDaTag(jogo.status_promocao)}">${corrigirTexto(jogo.status_promocao)}</span>
                        <div class="card-jogo__rotulo-acoes">
                            ${desconto}
                            <a class="card-jogo__link" href="${jogo.url}" target="_blank" rel="noreferrer">Abrir na Steam</a>
                        </div>
                    </div>
                    <div class="card-jogo__precos">
                        <div class="card-jogo__preco">
                            <span>Preço atual</span>
                            <strong>${formatarMoeda(jogo.preco_atual, jogo.moeda)}</strong>
                        </div>
                        <div class="card-jogo__preco">
                            <span>Último salvo</span>
                            <strong>${formatarMoeda(jogo.ultimo_preco_salvo, jogo.moeda)}</strong>
                        </div>
                        <div class="card-jogo__preco">
                            <span>Preço alvo</span>
                            <strong>${precoAlvo}</strong>
                        </div>
                    </div>
                    <div class="card-jogo__rodape">
                        <div class="card-jogo__acoes-grid">
                            <button class="card-jogo__acao" type="button" data-acao="abrir-detalhe" data-jogo="${jogo.id}">Ver detalhe</button>
                            <button class="card-jogo__acao" type="button" data-acao="atualizar-jogo" data-jogo="${jogo.id}">Atualizar agora</button>
                            <button class="card-jogo__acao card-jogo__acao--steam" type="button" data-acao="abrir-steam" data-jogo="${jogo.id}">Abrir na Steam</button>
                            <button class="card-jogo__acao card-jogo__acao--remover" type="button" data-acao="remover-jogo" data-jogo="${jogo.id}">Remover</button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function renderizarAlertas(alertas, destino) {
    if (!alertas.length) {
        destino.innerHTML = '<div class="vazio">Nenhum alerta registrado até agora.</div>';
        return;
    }

    destino.innerHTML = alertas.map((alerta) => `
        <article class="alerta">
            <div class="alerta__topo">
                <strong>${corrigirTexto(alerta.titulo)}</strong>
                <span>${formatarData(alerta.criado_em)}</span>
            </div>
            ${alerta.nome_jogo ? `<p>${corrigirTexto(alerta.nome_jogo)}</p>` : ""}
            <div class="alerta__mensagem">${corrigirTexto(alerta.mensagem)}</div>
        </article>
    `).join("");
}

function renderizarAlertasHome() {
    const alertas = (estado.painel?.alertas || []).slice(0, 4);
    renderizarAlertas(alertas, elementos.listaAlertasHome);
}

function renderizarAlertasCompletos() {
    renderizarAlertas(estado.painel?.alertas || [], elementos.listaAlertas);
}

function aplicarEstadoLogsRobot(dados) {
    const meta = dados?.logs_robot_meta || {};
    const limiteBase = Number(meta.limite || dados?.configuracao?.limite_logs_robot || estado.logsRobot.limite || 40);
    const quantidadeAnterior = Math.max(
        estado.logsRobot.quantidadeDesejada || 0,
        estado.logsRobot.itens?.length || 0,
        limiteBase
    );

    estado.logsRobot = {
        itens: Array.isArray(dados?.logs_robot) ? [...dados.logs_robot] : [],
        total: Number(meta.total || 0),
        offset: Number(meta.offset || (dados?.logs_robot || []).length || 0),
        limite: limiteBase,
        temMais: Boolean(meta.tem_mais),
        carregando: false,
        quantidadeDesejada: quantidadeAnterior,
    };
}

async function preencherLogsRobotAteQuantidadeDesejada() {
    const alvo = Math.min(estado.logsRobot.quantidadeDesejada || 0, estado.logsRobot.total || 0);
    while (estado.logsRobot.itens.length < alvo && estado.logsRobot.temMais) {
        const restante = alvo - estado.logsRobot.itens.length;
        const limite = Math.max(1, Math.min(estado.logsRobot.limite, restante));
        const dados = await enviarRequisicao(`/api/logs-robot?offset=${estado.logsRobot.itens.length}&limite=${limite}`);
        const novos = Array.isArray(dados.itens) ? dados.itens : [];
        if (!novos.length) {
            estado.logsRobot.temMais = false;
            break;
        }
        estado.logsRobot.itens = [...estado.logsRobot.itens, ...novos];
        estado.logsRobot.total = Number(dados.total || estado.logsRobot.total || 0);
        estado.logsRobot.offset = Number(dados.offset || estado.logsRobot.itens.length);
        estado.logsRobot.temMais = Boolean(dados.tem_mais);
    }
}

function atualizarRodapeLogsRobot() {
    const carregados = estado.logsRobot.itens.length;
    const filtrados = obterLogsRobotFiltrados().length;
    const total = estado.logsRobot.total || carregados;
    const filtrosAtivos = estado.logsRobot.origem !== "todos" || Boolean(estado.logsRobot.busca.trim());
    elementos.contadorLogsRobot.textContent = filtrosAtivos
        ? `Exibindo ${filtrados} de ${carregados} logs carregados, ${total} no total`
        : `Exibindo ${carregados} de ${total} logs`;
    elementos.acoesLogsRobot.classList.toggle("oculto", !carregados && !estado.logsRobot.temMais);
    elementos.botaoCarregarMaisLogs.classList.toggle("oculto", !estado.logsRobot.temMais && !estado.logsRobot.carregando);
    elementos.botaoCarregarMaisLogs.disabled = Boolean(estado.logsRobot.carregando);
    elementos.botaoCarregarMaisLogs.textContent = estado.logsRobot.carregando ? "Carregando logs..." : "Carregar mais logs";
}

function renderizarLogsRobot() {
    const logsCarregados = obterLogsRobotAtuais();
    const logs = obterLogsRobotFiltrados();
    atualizarVisualFiltrosLogsRobot();

    if (!logsCarregados.length) {
        elementos.listaLogsRobot.innerHTML = '<div class="vazio">Nenhum log do robô foi registrado até agora.</div>';
        atualizarRodapeLogsRobot();
        return;
    }

    if (!logs.length) {
        elementos.listaLogsRobot.innerHTML = '<div class="vazio">Nenhum log corresponde aos filtros atuais. Ajuste a busca, troque a origem ou carregue mais itens.</div>';
        atualizarRodapeLogsRobot();
        return;
    }

    elementos.listaLogsRobot.innerHTML = logs.map((log) => `
        <article class="log-robot">
            <div class="log-robot__topo">
                <span class="log-robot__origem" data-origem="${corrigirTexto(log.origem).toLowerCase()}">${corrigirTexto(log.origem)}</span>
                <span>${formatarData(log.criado_em)}</span>
            </div>
            <div class="log-robot__mensagem">${corrigirTexto(log.mensagem)}</div>
            <div class="log-robot__rodape">
                <span>${corrigirTexto(log.etapa)}</span>
                <span>${log.nome_jogo ? corrigirTexto(log.nome_jogo) : "Coleta geral"}</span>
            </div>
        </article>
    `).join("");
    atualizarRodapeLogsRobot();
}

async function carregarMaisLogsRobot() {
    if (estado.logsRobot.carregando || !estado.logsRobot.temMais) {
        return;
    }

    estado.logsRobot.carregando = true;
    atualizarRodapeLogsRobot();
    try {
        const dados = await enviarRequisicao(`/api/logs-robot?offset=${estado.logsRobot.itens.length}&limite=${estado.logsRobot.limite}`);
        const novos = Array.isArray(dados.itens) ? dados.itens : [];
        estado.logsRobot.itens = [...estado.logsRobot.itens, ...novos];
        estado.logsRobot.total = Number(dados.total || estado.logsRobot.total || 0);
        estado.logsRobot.offset = Number(dados.offset || estado.logsRobot.itens.length);
        estado.logsRobot.temMais = Boolean(dados.tem_mais);
        estado.logsRobot.quantidadeDesejada = estado.logsRobot.itens.length;
        renderizarLogsRobot();
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível carregar mais logs."), "erro");
    } finally {
        estado.logsRobot.carregando = false;
        atualizarRodapeLogsRobot();
    }
}

function calcularResumoHistorico(jogo, historico) {
    const registros = (historico || [])
        .map((item) => ({
            preco: Number(item.preco),
            moeda: item.moeda || jogo.moeda,
            registradoEm: item.registrado_em,
        }))
        .filter((item) => Number.isFinite(item.preco));

    if (!registros.length && Number.isFinite(Number(jogo.preco_atual))) {
        registros.push({
            preco: Number(jogo.preco_atual),
            moeda: jogo.moeda,
            registradoEm: jogo.ultima_verificacao,
        });
    }

    if (!registros.length) {
        return null;
    }

    const menor = registros.reduce((atual, item) => item.preco < atual.preco ? item : atual, registros[0]);
    const maior = registros.reduce((atual, item) => item.preco > atual.preco ? item : atual, registros[0]);
    const media = registros.reduce((soma, item) => soma + item.preco, 0) / registros.length;
    const faixa = Math.max(0, maior.preco - menor.preco);
    const economiaMaxima = Number.isFinite(Number(jogo.preco_atual)) ? Math.max(0, maior.preco - Number(jogo.preco_atual)) : 0;

    let momento = "Em observação";
    if (Number.isFinite(Number(jogo.preco_atual)) && Number(jogo.preco_atual) <= menor.preco) {
        momento = "Menor valor já registrado";
    } else if (Number(jogo.percentual_desconto || 0) > 0) {
        momento = "Promoção ativa";
    } else if (jogo.preco_alvo !== null && jogo.preco_alvo !== undefined && Number(jogo.preco_atual) <= Number(jogo.preco_alvo)) {
        momento = "Abaixo do preço-alvo";
    }

    return {
        menor,
        maior,
        media,
        faixa,
        economiaMaxima,
        momento,
        totalRegistros: registros.length,
    };
}

function agruparHistoricoPorMudanca(historico) {
    const grupos = [];
    (historico || []).forEach((item) => {
        const ultimoGrupo = grupos[grupos.length - 1];
        const chaveAtual = [
            Number(item.preco || 0),
            String(item.moeda || ""),
            String(item.status_promocao || ""),
            Number(item.percentual_desconto || 0),
        ].join("|");

        if (ultimoGrupo && ultimoGrupo.chave === chaveAtual) {
            ultimoGrupo.itens.push(item);
            return;
        }

        grupos.push({
            chave: chaveAtual,
            itens: [item],
        });
    });
    return grupos;
}

function obterLimitePadraoHistorico(periodo) {
    return periodo === "recentes" ? 6 : 8;
}

function obterDataCorteHistorico(periodo) {
    const agora = new Date();
    if (periodo === "hoje") {
        return new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    }
    if (periodo === "semana") {
        return new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    if (periodo === "mes") {
        return new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    return null;
}

function filtrarGruposHistorico(grupos, periodo) {
    if (periodo === "tudo" || periodo === "recentes") {
        return grupos;
    }
    const dataCorte = obterDataCorteHistorico(periodo);
    if (!dataCorte) {
        return grupos;
    }
    return grupos.filter((grupo) => grupo.itens.some((item) => {
        const data = new Date(item.registrado_em);
        return !Number.isNaN(data.getTime()) && data >= dataCorte;
    }));
}

function textoPeriodoHistorico(periodo) {
    const mapa = {
        recentes: "Mais recentes",
        hoje: "Hoje",
        semana: "7 dias",
        mes: "30 dias",
        tudo: "Tudo",
    };
    return mapa[periodo] || "Mais recentes";
}

function montarHistoricoAgrupado(jogo, historico, opcoes = {}) {
    const grupos = agruparHistoricoPorMudanca(historico);
    const periodo = opcoes.periodo || "recentes";
    const limite = Math.max(1, Number(opcoes.limite || obterLimitePadraoHistorico(periodo)));
    const gruposFiltrados = filtrarGruposHistorico(grupos, periodo);
    const gruposVisiveis = gruposFiltrados.slice(0, limite);
    const maiorPreco = Math.max(...(historico || []).map((item) => Number(item.preco || 0)), Number(jogo.preco_atual || 0), 1);

    if (!gruposFiltrados.length) {
        return {
            html: '<div class="vazio">Nenhum registro foi encontrado para o período selecionado.</div>',
            grupos,
            gruposFiltrados,
            gruposVisiveis,
            atualizacoesSemMudanca: 0,
            temMais: false,
        };
    }

    const html = gruposVisiveis.map((grupo) => {
        const itemBase = grupo.itens[0];
        const largura = Math.max(8, Math.round((Number(itemBase.preco || 0) / maiorPreco) * 100));
        const houveRepeticao = grupo.itens.length > 1;
        const resumo = `
            <div class="historico-item__topo">
                <strong>${formatarMoeda(itemBase.preco, itemBase.moeda)}</strong>
                <span class="tag-status" data-estado="${estadoDaTag(itemBase.status_promocao)}">${corrigirTexto(itemBase.status_promocao)}</span>
            </div>
            <div class="historico-item__barra">
                <span style="width:${largura}%"></span>
            </div>
            <div class="historico-item__rodape">
                <span>${formatarData(itemBase.registrado_em)}</span>
                <span>${itemBase.percentual_desconto ? `${itemBase.percentual_desconto}% de desconto` : "Sem desconto"}</span>
            </div>
        `;

        if (!houveRepeticao) {
            return `<article class="historico-item">${resumo}</article>`;
        }

        return `
            <details class="historico-item historico-item--agrupado">
                <summary class="historico-item__sumario">
                    <div class="historico-item__sumario-conteudo">
                        ${resumo}
                        <div class="historico-item__agrupamento">
                            <span>${grupo.itens.length} atualizações sem mudança de preço</span>
                            <strong>Ver detalhes das atualizações</strong>
                        </div>
                    </div>
                </summary>
                <div class="historico-item__detalhes">
                    ${grupo.itens.map((atualizacao, indice) => `
                        <div class="historico-item__detalhe">
                            <span>${indice === 0 ? "Registro principal" : `Verificação ${indice + 1}`}</span>
                            <strong>${formatarData(atualizacao.registrado_em)}</strong>
                        </div>
                    `).join("")}
                </div>
            </details>
        `;
    }).join("");

    return {
        html,
        grupos,
        gruposFiltrados,
        gruposVisiveis,
        atualizacoesSemMudanca: gruposFiltrados.reduce((total, grupo) => total + Math.max(0, grupo.itens.length - 1), 0),
        temMais: gruposFiltrados.length > gruposVisiveis.length,
    };
}

function montarDetalheJogo(jogo, historico) {
    if (!jogo) {
        elementos.tituloDetalheJogo.textContent = "Selecione um jogo";
        elementos.subtituloDetalheJogo.textContent = "Abra a biblioteca e clique em um card para ver somente os dados daquele jogo.";
        elementos.painelDetalheJogo.className = "detalhe-jogo detalhe-jogo--vazio";
        elementos.painelDetalheJogo.innerHTML = '<div class="vazio">Nenhum jogo foi selecionado.</div>';
        elementos.botaoAtualizarDetalhe.disabled = true;
        delete elementos.botaoAtualizarDetalhe.dataset.jogo;
        estado.detalheMidia.emFoco = false;
        estado.detalheMidia.progresso = 0;
        return;
    }

    if (estado.detalheHistorico.jogoId !== jogo.id) {
        estado.detalheHistorico = {
            jogoId: jogo.id,
            periodo: "recentes",
            limite: obterLimitePadraoHistorico("recentes"),
        };
    }
    if (estado.detalheMidia.jogoId !== jogo.id) {
        estado.detalheMidia = {
            jogoId: jogo.id,
            indice: 0,
            progresso: 0,
            pausadoManual: false,
            emFoco: false,
        };
    }

    const listaHistorico = historico || [];
    const resumoHistorico = calcularResumoHistorico(jogo, listaHistorico);
    const visaoHistorico = montarHistoricoAgrupado(jogo, listaHistorico, estado.detalheHistorico);
    const mudancasReais = visaoHistorico.gruposFiltrados.length;
    const periodoAtual = estado.detalheHistorico.periodo;
    const galeria = obterGaleriaJogo(jogo);
    const totalMidias = Math.max(1, galeria.length);
    const indiceMidia = ((Number(estado.detalheMidia.indice || 0) % totalMidias) + totalMidias) % totalMidias;
    const midiaSelecionada = galeria[indiceMidia] || galeria[0];
    const resumoCurto = obterResumoCurtoJogo(jogo);
    const etiquetas = obterEtiquetasJogo(jogo);
    const textoPrecoAlvo = jogo.preco_alvo !== null && jogo.preco_alvo !== undefined
        ? formatarMoeda(jogo.preco_alvo, jogo.moeda)
        : "Não definido";
    const progressoMidia = totalMidias > 1 ? Math.max(0, Math.min(100, estado.detalheMidia.progresso || 0)) : 100;
    const statusRotacao = obterStatusRotacaoDetalhe(totalMidias);
    const etiquetasHtml = etiquetas.length
        ? etiquetas.map((etiqueta) => `<span class="detalhe-jogo__etiqueta">${escaparHtml(etiqueta)}</span>`).join("")
        : '<span class="detalhe-jogo__etiqueta detalhe-jogo__etiqueta--suave">Monitoramento local</span>';

    estado.detalheMidia.indice = indiceMidia;
    if (totalMidias <= 1) {
        estado.detalheMidia.progresso = 0;
    }

    elementos.tituloDetalheJogo.textContent = corrigirTexto(jogo.nome);
    elementos.subtituloDetalheJogo.textContent = `Galeria da Steam com ${totalMidias} mídia${totalMidias === 1 ? "" : "s"} e ${mudancasReais} bloco${mudancasReais === 1 ? "" : "s"} em ${textoPeriodoHistorico(periodoAtual).toLowerCase()}.`;
    elementos.botaoAtualizarDetalhe.disabled = false;
    elementos.botaoAtualizarDetalhe.dataset.jogo = jogo.id;

    elementos.painelDetalheJogo.className = "detalhe-jogo detalhe-jogo--steam";
    elementos.painelDetalheJogo.innerHTML = `
        <div class="detalhe-jogo__hero">
            <section class="detalhe-jogo__bloco detalhe-jogo__bloco--principal" data-jogo="${jogo.id}">
                <div class="detalhe-jogo__vitrine">
                    <div class="detalhe-jogo__midia">
                        <img src="${escaparHtml(midiaSelecionada.imagem)}" alt="${escaparHtml(corrigirTexto(jogo.nome))}" loading="eager" decoding="async" onerror="${atributoErroImagem(obterFallbackImagemJogo(jogo))}">
                        <div class="detalhe-jogo__midia-sombra"></div>
                        <div class="detalhe-jogo__midia-conteudo">
                            <div class="detalhe-jogo__midia-topo">
                                <span class="tag-status" data-estado="${estadoDaTag(jogo.status_promocao)}">${corrigirTexto(jogo.status_promocao)}</span>
                                <span class="detalhe-jogo__contador-midia">${indiceMidia + 1}/${totalMidias}</span>
                            </div>
                            <div class="detalhe-jogo__midia-rodape">
                                <strong>${corrigirTexto(jogo.nome)}</strong>
                                <small>${midiaSelecionada.rotulo} · ${jogo.identificador_steam ? `App ${corrigirTexto(jogo.identificador_steam)}` : obterRotuloTipoItem(jogo.tipo_item)}</small>
                            </div>
                        </div>
                        ${totalMidias > 1 ? `
                            <button class="detalhe-jogo__seta detalhe-jogo__seta--anterior" type="button" data-acao="midia-detalhe-anterior" aria-label="Mostrar mídia anterior">‹</button>
                            <button class="detalhe-jogo__seta detalhe-jogo__seta--proxima" type="button" data-acao="midia-detalhe-proxima" aria-label="Mostrar próxima mídia">›</button>
                        ` : ""}
                    </div>
                    <div class="detalhe-jogo__controle-midia">
                        <div class="detalhe-jogo__barra-rotacao">
                            <span data-detalhe-progresso style="width:${progressoMidia}%"></span>
                        </div>
                        <div class="detalhe-jogo__controle-linha">
                            <span data-detalhe-status-rotacao>${escaparHtml(statusRotacao)}</span>
                            ${totalMidias > 1 ? `
                                <button class="botao-link detalhe-jogo__controle-botao" type="button" data-acao="alternar-rotacao-detalhe">
                                    ${estado.detalheMidia.pausadoManual ? "Retomar rotação" : "Pausar rotação"}
                                </button>
                            ` : ""}
                        </div>
                    </div>
                    <div class="detalhe-jogo__galeria">
                        ${galeria.map((item, indice) => `
                            <button class="detalhe-jogo__miniatura ${indice === indiceMidia ? "detalhe-jogo__miniatura--ativa" : ""}" type="button" data-acao="selecionar-midia-detalhe" data-indice-midia="${indice}" aria-label="Mostrar ${escaparHtml(item.rotulo)}">
                                <img src="${escaparHtml(item.miniatura || item.imagem)}" alt="${escaparHtml(item.rotulo)}" loading="lazy" decoding="async" onerror="${atributoErroImagem(obterFallbackImagemJogo(jogo))}">
                                <span>${escaparHtml(item.rotulo)}</span>
                            </button>
                        `).join("")}
                    </div>
                    <p class="detalhe-jogo__descricao">Preço atual em ${formatarMoeda(jogo.preco_atual, jogo.moeda)}. Último valor salvo em ${formatarMoeda(jogo.ultimo_preco_salvo, jogo.moeda)}. A galeria troca automaticamente quando você não estiver interagindo.</p>
                </div>
            </section>

            <aside class="detalhe-jogo__bloco detalhe-jogo__bloco--lateral detalhe-jogo__bloco--resumo">
                <div class="detalhe-jogo__capsula-resumo">
                    <img src="${escaparHtml(obterBannerJogo(jogo))}" alt="${escaparHtml(corrigirTexto(jogo.nome))}" loading="lazy" decoding="async" onerror="${atributoErroImagem(obterFallbackImagemJogo(jogo))}">
                </div>
                <p class="detalhe-jogo__resumo-oficial">${escaparHtml(resumoCurto)}</p>
                <div class="detalhe-jogo__painel-preco">
                    <span>Preço atual</span>
                    <strong>${formatarMoeda(jogo.preco_atual, jogo.moeda)}</strong>
                    <small>${jogo.percentual_desconto ? `${jogo.percentual_desconto}% de desconto` : "Sem desconto neste momento"}</small>
                </div>
                <div class="detalhe-jogo__metricas detalhe-jogo__metricas--lateral">
                    <div class="detalhe-jogo__metrica">
                        <span>Último salvo</span>
                        <strong>${formatarMoeda(jogo.ultimo_preco_salvo, jogo.moeda)}</strong>
                    </div>
                    <div class="detalhe-jogo__metrica">
                        <span>Preço-alvo</span>
                        <strong>${textoPrecoAlvo}</strong>
                    </div>
                    <div class="detalhe-jogo__metrica">
                        <span>Última verificação</span>
                        <strong>${formatarData(jogo.ultima_verificacao)}</strong>
                    </div>
                </div>
                <div class="detalhe-jogo__ficha">
                    <div class="detalhe-jogo__ficha-linha">
                        <span>Data de lançamento</span>
                        <strong>${escaparHtml(corrigirTexto(jogo.data_lancamento || "Não informada"))}</strong>
                    </div>
                    <div class="detalhe-jogo__ficha-linha">
                        <span>Tipo</span>
                        <strong>${escaparHtml(obterRotuloTipoItem(jogo.tipo_item))}</strong>
                    </div>
                    <div class="detalhe-jogo__ficha-linha">
                        <span>Identificador</span>
                        <strong>${escaparHtml(corrigirTexto(jogo.identificador_steam || "Não informado"))}</strong>
                    </div>
                    <div class="detalhe-jogo__ficha-linha">
                        <span>Desenvolvedor</span>
                        <strong>${escaparHtml(formatarListaDetalhe(jogo.desenvolvedores))}</strong>
                    </div>
                    <div class="detalhe-jogo__ficha-linha">
                        <span>Distribuidora</span>
                        <strong>${escaparHtml(formatarListaDetalhe(jogo.distribuidoras))}</strong>
                    </div>
                    <div class="detalhe-jogo__ficha-linha">
                        <span>Gêneros</span>
                        <strong>${escaparHtml(formatarListaDetalhe(jogo.generos))}</strong>
                    </div>
                    <div class="detalhe-jogo__ficha-linha">
                        <span>Plataformas</span>
                        <strong>${escaparHtml(formatarListaDetalhe(jogo.plataformas))}</strong>
                    </div>
                </div>
                <div class="detalhe-jogo__etiquetas">${etiquetasHtml}</div>
                <div class="detalhe-jogo__acoes detalhe-jogo__acoes--pilha">
                    <button class="botao-primario" type="button" data-acao="abrir-steam" data-jogo="${jogo.id}">Abrir na Steam</button>
                    <button class="botao-secundario" type="button" data-acao="atualizar-jogo" data-jogo="${jogo.id}">Atualizar agora</button>
                    <button class="botao-link" type="button" data-acao="copiar-link" data-jogo="${jogo.id}">Copiar link</button>
                    <button class="botao-link botao-link--perigo" type="button" data-acao="remover-jogo" data-jogo="${jogo.id}">Remover do monitoramento</button>
                </div>
            </aside>
        </div>

        <section class="detalhe-jogo__bloco">
            <div class="detalhe-jogo__cabecalho-bloco">
                <h3>Radar de preço</h3>
                <span class="tag-mini">${resumoHistorico ? resumoHistorico.momento : "Sem histórico suficiente"}</span>
            </div>
            <div class="detalhe-jogo__metricas detalhe-jogo__metricas--quatro">
                <div class="detalhe-jogo__metrica">
                    <span>Menor histórico</span>
                    <strong>${resumoHistorico ? formatarMoeda(resumoHistorico.menor.preco, resumoHistorico.menor.moeda) : "Sem dados"}</strong>
                </div>
                <div class="detalhe-jogo__metrica">
                    <span>Maior histórico</span>
                    <strong>${resumoHistorico ? formatarMoeda(resumoHistorico.maior.preco, resumoHistorico.maior.moeda) : "Sem dados"}</strong>
                </div>
                <div class="detalhe-jogo__metrica">
                    <span>Preço médio</span>
                    <strong>${resumoHistorico ? formatarMoeda(resumoHistorico.media, jogo.moeda) : "Sem dados"}</strong>
                </div>
                <div class="detalhe-jogo__metrica">
                    <span>Economia máxima</span>
                    <strong>${resumoHistorico ? formatarMoeda(resumoHistorico.economiaMaxima, jogo.moeda) : "Sem dados"}</strong>
                </div>
            </div>
            <div class="detalhe-jogo__faixa">
                <span>Amplitude histórica</span>
                <strong>${resumoHistorico ? formatarMoeda(resumoHistorico.faixa, jogo.moeda) : "Sem dados"}</strong>
                <p>
                    ${resumoHistorico
                        ? `Com ${resumoHistorico.totalRegistros} registro${resumoHistorico.totalRegistros === 1 ? "" : "s"}, o menor preço apareceu em ${formatarData(resumoHistorico.menor.registradoEm)} e o maior em ${formatarData(resumoHistorico.maior.registradoEm)}.`
                        : "Ainda não há registros suficientes para montar a faixa histórica."}
                </p>
            </div>
        </section>

        <section class="detalhe-jogo__bloco">
            <div class="detalhe-jogo__cabecalho-bloco">
                <h3>Histórico de preços</h3>
                <span class="tag-mini">${textoPeriodoHistorico(periodoAtual)}</span>
            </div>
            <div class="faixa-filtros faixa-filtros--historico">
                <button class="chip-filtro ${periodoAtual === "recentes" ? "chip-filtro--ativo" : ""}" type="button" data-acao="filtrar-historico" data-periodo-historico="recentes">Mais recentes</button>
                <button class="chip-filtro ${periodoAtual === "hoje" ? "chip-filtro--ativo" : ""}" type="button" data-acao="filtrar-historico" data-periodo-historico="hoje">Hoje</button>
                <button class="chip-filtro ${periodoAtual === "semana" ? "chip-filtro--ativo" : ""}" type="button" data-acao="filtrar-historico" data-periodo-historico="semana">7 dias</button>
                <button class="chip-filtro ${periodoAtual === "mes" ? "chip-filtro--ativo" : ""}" type="button" data-acao="filtrar-historico" data-periodo-historico="mes">30 dias</button>
                <button class="chip-filtro ${periodoAtual === "tudo" ? "chip-filtro--ativo" : ""}" type="button" data-acao="filtrar-historico" data-periodo-historico="tudo">Tudo</button>
            </div>
            <div class="detalhe-jogo__historico-resumo">
                <span>${visaoHistorico.gruposVisiveis.length} bloco${visaoHistorico.gruposVisiveis.length === 1 ? "" : "s"} visível${visaoHistorico.gruposVisiveis.length === 1 ? "" : "eis"}</span>
                <strong>${visaoHistorico.atualizacoesSemMudanca} atualização${visaoHistorico.atualizacoesSemMudanca === 1 ? "" : "ões"} sem mudança neste recorte</strong>
            </div>
            <div class="detalhe-jogo__historico">
                ${visaoHistorico.html}
            </div>
            ${visaoHistorico.temMais ? `
                <div class="detalhe-jogo__historico-acoes">
                    <button class="botao-secundario" type="button" data-acao="carregar-mais-historico">Mostrar mais deste período</button>
                </div>
            ` : ""}
        </section>
    `;

    configurarInteracoesMidiaDetalhe();
    atualizarProgressoMidiaDetalhe();
    window.requestAnimationFrame(() => {
        alinharMiniaturaAtivaDetalhe();
    });
}

async function carregarHistoricoJogo(jogoId) {
    if (!jogoId) {
        return [];
    }

    if (estado.historicos.has(jogoId)) {
        return estado.historicos.get(jogoId);
    }

    const dados = await enviarRequisicao(`/api/jogos/${jogoId}/historico`);
    const historico = dados.historico || [];
    estado.historicos.set(jogoId, historico);
    return historico;
}

async function renderizarDetalheAtual() {
    const jogo = obterJogoPorId(estado.jogoSelecionadoId);
    if (!jogo) {
        montarDetalheJogo(null, []);
        return;
    }

    if (!estado.historicos.has(jogo.id)) {
        elementos.tituloDetalheJogo.textContent = corrigirTexto(jogo.nome);
        elementos.subtituloDetalheJogo.textContent = "Carregando histórico deste jogo.";
        elementos.painelDetalheJogo.className = "detalhe-jogo detalhe-jogo--vazio";
        elementos.painelDetalheJogo.innerHTML = '<div class="vazio">Carregando histórico do jogo selecionado.</div>';
        elementos.botaoAtualizarDetalhe.disabled = false;
        elementos.botaoAtualizarDetalhe.dataset.jogo = jogo.id;
    }

    try {
        const historico = await carregarHistoricoJogo(jogo.id);
        montarDetalheJogo(jogo, historico);
    } catch (erro) {
        montarDetalheJogo(jogo, []);
        mostrarMensagem(traduzirErro(erro, "Não foi possível carregar o histórico do jogo."), "erro");
    }
}

function renderizarTudo() {
    if (!estado.painel) {
        return;
    }

    preencherConfiguracao(estado.painel.configuracao);
    atualizarResumo(estado.painel);
    renderizarCarrossel();
    renderizarDestaques();
    renderizarBiblioteca();
    renderizarAlertasHome();
    renderizarAlertasCompletos();
    renderizarLogsRobot();
    renderizarBuscaSteam();

    if (estado.jogoSelecionadoId) {
        void renderizarDetalheAtual();
    } else {
        montarDetalheJogo(null, []);
    }
}

async function carregarPainel() {
    if (promessaPainel) {
        return promessaPainel;
    }

    estado.carregandoPainel = true;
    promessaPainel = (async () => {
        try {
            const dados = await enviarRequisicao("/api/painel");
            estado.painel = dados;
            aplicarEstadoLogsRobot(dados);
            try {
                await preencherLogsRobotAteQuantidadeDesejada();
            } catch {
                estado.logsRobot.carregando = false;
            }
            estado.painel.logs_robot = [...estado.logsRobot.itens];
            renderizarTudo();
            emitirNotificacoesNovas();
            return dados;
        } finally {
            estado.carregandoPainel = false;
            promessaPainel = null;
        }
    })();

    return promessaPainel;
}

function emitirNotificacoesNovas() {
    if (!("Notification" in window) || Notification.permission !== "granted") {
        return;
    }

    const configuracao = estado.painel?.configuracao || {};
    if (!configuracao.notificacoes_navegador_ativas) {
        return;
    }

    const alertas = estado.painel?.alertas || [];
    const novos = alertas
        .filter((alerta) => Number(alerta.id) > estado.ultimoAlertaNotificadoId)
        .filter((alerta) => ["promocao", "alvo"].includes(String(alerta.tipo || "").toLowerCase()))
        .sort((a, b) => Number(a.id) - Number(b.id));

    if (!novos.length) {
        return;
    }

    novos.forEach((alerta) => {
        const notificacao = new Notification(corrigirTexto(alerta.titulo), {
            body: corrigirTexto(alerta.mensagem),
            icon: "/assets/imagens/favicon-stecogu.png",
        });
        notificacao.onclick = () => {
            window.focus();
            if (alerta.jogo_id) {
                navegarPara("detalhe", alerta.jogo_id);
            } else {
                navegarPara("alertas");
            }
            notificacao.close();
        };
    });

    estado.ultimoAlertaNotificadoId = Number(novos[novos.length - 1].id);
    window.localStorage.setItem("steampricewatcher_alerta_notificado", String(estado.ultimoAlertaNotificadoId));
}

function normalizarPrecoAlvo(valor) {
    const textoOriginal = String(valor || "").trim();
    if (!textoOriginal) {
        return null;
    }

    let texto = textoOriginal.replace("R$", "").replace(/\s+/g, "");
    if (texto.includes(",") && texto.includes(".")) {
        texto = texto.replace(/\./g, "").replace(",", ".");
    } else if (texto.includes(",")) {
        texto = texto.replace(",", ".");
    }

    const numero = Number(texto);
    if (!Number.isFinite(numero)) {
        throw new Error("Informe um preço-alvo válido.");
    }
    return numero;
}

async function adicionarJogo(url, precoAlvo = null) {
    const dados = await enviarRequisicao("/api/jogos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: String(url || "").trim(),
            preco_alvo: precoAlvo,
        }),
    });

    estado.historicos.clear();
    await carregarPainel();
    renderizarBuscaSteam();

    if (dados.jogo?.id) {
        estado.jogoSelecionadoId = dados.jogo.id;
    }

    return dados;
}

async function enviarJogo(evento) {
    evento.preventDefault();
    const botao = elementos.botaoAdicionarJogoFormulario;
    const textoOriginal = botao.textContent;
    botao.disabled = true;
    botao.textContent = "Adicionando...";

    try {
        const precoAlvo = normalizarPrecoAlvo(elementos.campoPrecoAlvo.value);
        const dados = await adicionarJogo(elementos.campoUrl.value.trim(), precoAlvo);

        elementos.formularioJogo.reset();
        mostrarMensagem(corrigirTexto(dados.mensagem || "Jogo adicionado com sucesso."));

        if (dados.jogo?.id) {
            navegarPara("detalhe", dados.jogo.id);
        }
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível adicionar o jogo."), "erro");
    } finally {
        botao.disabled = false;
        botao.textContent = textoOriginal;
    }
}

async function adicionarResultadoSteam(urlCodificada) {
    const url = decodeURIComponent(urlCodificada || "");
    estado.buscaSteam.urlsAdicionando.add(url);
    renderizarBuscaSteam();

    try {
        const dados = await adicionarJogo(url, null);
        mostrarMensagem(corrigirTexto(dados.mensagem || "Jogo adicionado com sucesso."));
        limparBuscaSteam();

        if (dados.jogo?.id) {
            navegarPara("detalhe", dados.jogo.id);
        }
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível adicionar o jogo pela busca."), "erro");
    } finally {
        estado.buscaSteam.urlsAdicionando.delete(url);
        renderizarBuscaSteam();
    }
}

async function salvarConfiguracao(evento) {
    evento.preventDefault();

    try {
        const intervalo = Number(elementos.campoIntervalo.value);
        if (!Number.isFinite(intervalo) || intervalo < 1) {
            throw new Error("Informe um intervalo válido em minutos.");
        }

        const dados = await enviarRequisicao("/api/configuracao", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                intervalo_minutos: intervalo,
                foco_coleta: elementos.campoFocoColeta.value,
                idioma_loja: elementos.campoIdiomaLoja.value,
                pais_loja: elementos.campoPaisLoja.value,
                timeout_requisicao_segundos: Number(elementos.campoTimeoutRequisicao.value),
                limite_logs_robot: Number(elementos.campoLimiteLogsRobot.value),
                registrar_logs_robot: elementos.campoRegistrarLogsRobot.checked,
                abrir_navegador: elementos.campoAbrirNavegador.checked,
                notificacoes_navegador_ativas: estado.painel?.configuracao?.notificacoes_navegador_ativas || false,
            }),
        });

        await carregarPainel();
        mostrarMensagem(corrigirTexto(dados.mensagem || "Configuração atualizada com sucesso."));
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível salvar a configuração."), "erro");
    }
}

async function monitorarAgora() {
    try {
        const dados = await enviarRequisicao("/api/monitoramento/executar", {
            method: "POST",
        });

        mostrarMensagem(corrigirTexto(dados.mensagem || "Monitoramento iniciado."), "aviso");
        await carregarPainel();

        window.setTimeout(() => {
            void carregarPainel();
        }, 2200);
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível executar o monitoramento."), "erro");
    }
}

async function filtrarHistoricoDetalhe(periodo) {
    if (!estado.jogoSelecionadoId) {
        return;
    }
    estado.detalheHistorico.periodo = String(periodo || "recentes");
    estado.detalheHistorico.limite = obterLimitePadraoHistorico(estado.detalheHistorico.periodo);
    await renderizarDetalheAtual();
}

async function carregarMaisHistoricoDetalhe() {
    if (!estado.jogoSelecionadoId) {
        return;
    }
    estado.detalheHistorico.limite += obterLimitePadraoHistorico(estado.detalheHistorico.periodo);
    await renderizarDetalheAtual();
}

async function selecionarMidiaDetalhe(indice) {
    if (!estado.jogoSelecionadoId) {
        return;
    }
    const jogo = obterJogoPorId(estado.jogoSelecionadoId);
    const totalMidias = Math.max(1, obterGaleriaJogo(jogo).length);
    estado.detalheMidia.jogoId = estado.jogoSelecionadoId;
    estado.detalheMidia.indice = ((Number(indice || 0) % totalMidias) + totalMidias) % totalMidias;
    estado.detalheMidia.progresso = 0;
    estado.detalheMidia.emFoco = false;
    await renderizarDetalheAtual();
}

async function moverMidiaDetalhe(passos) {
    await selecionarMidiaDetalhe((estado.detalheMidia.indice || 0) + Number(passos || 0));
}

async function alternarRotacaoDetalhe() {
    estado.detalheMidia.pausadoManual = !estado.detalheMidia.pausadoManual;
    estado.detalheMidia.progresso = 0;
    await renderizarDetalheAtual();
}

async function atualizarJogo(jogoId, opcoes = {}) {
    const identificador = Number(jogoId);
    if (!identificador) {
        mostrarMensagem("Selecione um jogo válido.", "erro");
        return;
    }

    try {
        const dados = await enviarRequisicao(`/api/jogos/${identificador}/atualizar`, {
            method: "POST",
        });

        estado.historicos.delete(identificador);
        await carregarPainel();
        mostrarMensagem(corrigirTexto(dados.mensagem || "Jogo atualizado com sucesso."));

        if (opcoes.abrirDetalhe) {
            navegarPara("detalhe", identificador);
        } else if (estado.visaoAtual === "detalhe" && estado.jogoSelecionadoId === identificador) {
            void renderizarDetalheAtual();
        }
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível atualizar o jogo."), "erro");
    }
}

async function removerJogo(jogoId, opcoes = {}) {
    const identificador = Number(jogoId);
    const jogo = obterJogoPorId(identificador);
    if (!identificador || !jogo) {
        mostrarMensagem("Selecione um jogo válido.", "erro");
        return;
    }

    const confirmou = window.confirm(`Deseja remover ${corrigirTexto(jogo.nome)} do monitoramento?`);
    if (!confirmou) {
        return;
    }

    try {
        const dados = await enviarRequisicao(`/api/jogos/${identificador}`, {
            method: "DELETE",
        });

        estado.historicos.delete(identificador);
        await carregarPainel();
        renderizarBuscaSteam();
        mostrarMensagem(corrigirTexto(dados.mensagem || "Jogo removido com sucesso."));

        if (estado.jogoSelecionadoId === identificador || opcoes.irParaBiblioteca) {
            estado.jogoSelecionadoId = null;
            navegarPara("biblioteca");
        }
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível remover o jogo."), "erro");
    }
}

async function copiarLinkJogo(jogoId) {
    const jogo = obterJogoPorId(jogoId);
    if (!jogo?.url) {
        mostrarMensagem("Não foi possível localizar o link do jogo.", "erro");
        return;
    }

    try {
        if (!navigator.clipboard?.writeText) {
            throw new Error("A cópia automática não está disponível neste navegador.");
        }
        await navigator.clipboard.writeText(jogo.url);
        mostrarMensagem("Link copiado para a área de transferência.");
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível copiar o link."), "erro");
    }
}

function abrirJogoNaSteam(jogoId) {
    const jogo = obterJogoPorId(jogoId);
    if (!jogo?.url) {
        mostrarMensagem("Não foi possível localizar o jogo selecionado.", "erro");
        return;
    }

    window.open(jogo.url, "_blank", "noopener");
}

function executarAcaoSlide(tipo) {
    const slide = estado.slides[estado.indiceSlide];
    if (!slide) {
        return;
    }

    const destino = tipo === "primaria" ? slide.destinoPrimario : slide.destinoSecundario;
    if (destino === "detalhe" && slide.id) {
        navegarPara("detalhe", slide.id);
        return;
    }

    navegarPara(destino || "inicio");
}

function abrirMenuContexto(evento) {
    const jogoEmClique = evento.target.closest("[data-jogo]");
    const slide = evento.target.closest(".slide-hero");
    const jogoId = jogoEmClique?.dataset.jogo || slide?.dataset.slideJogo || (estado.visaoAtual === "detalhe" ? estado.jogoSelecionadoId : "");
    const itens = [];

    if (jogoId) {
        itens.push(`<button class="menu-contexto__botao" type="button" data-acao="abrir-detalhe" data-jogo="${jogoId}">Abrir detalhes do jogo</button>`);
        itens.push(`<button class="menu-contexto__botao" type="button" data-acao="atualizar-jogo" data-jogo="${jogoId}">Atualizar pre\u00e7o agora</button>`);
        itens.push(`<button class="menu-contexto__botao" type="button" data-acao="abrir-steam" data-jogo="${jogoId}">Abrir p\u00e1gina na Steam</button>`);
        itens.push(`<button class="menu-contexto__botao" type="button" data-acao="copiar-link" data-jogo="${jogoId}">Copiar link do jogo</button>`);
        itens.push(`<button class="menu-contexto__botao menu-contexto__botao--perigo" type="button" data-acao="remover-jogo" data-jogo="${jogoId}">Remover do monitoramento</button>`);
        itens.push('<div class="menu-contexto__divisor"></div>');
    }

    itens.push('<button class="menu-contexto__botao" type="button" data-acao="ir-visao" data-visao-menu="inicio">Ir para o in\u00edcio</button>');
    itens.push('<button class="menu-contexto__botao" type="button" data-acao="ir-visao" data-visao-menu="biblioteca">Abrir a biblioteca</button>');
    itens.push('<button class="menu-contexto__botao" type="button" data-acao="ir-visao" data-visao-menu="configuracao">Abrir as configura\u00e7\u00f5es</button>');
    itens.push('<button class="menu-contexto__botao" type="button" data-acao="monitorar-agora">Executar o monitoramento agora</button>');
    itens.push('<button class="menu-contexto__botao" type="button" data-acao="recarregar-painel">Atualizar os dados do painel</button>');

    elementos.menuContexto.innerHTML = itens.join("");
    elementos.menuContexto.classList.remove("oculto");

    const larguraMenu = 220;
    const alturaMenu = Math.min(window.innerHeight - 16, Math.max(220, itens.length * 38));
    const esquerda = Math.min(evento.clientX, window.innerWidth - larguraMenu - 12);
    const topo = Math.min(evento.clientY, window.innerHeight - alturaMenu - 12);

    elementos.menuContexto.style.left = `${Math.max(12, esquerda)}px`;
    elementos.menuContexto.style.top = `${Math.max(12, topo)}px`;
}

function fecharMenuContexto() {
    elementos.menuContexto.classList.add("oculto");
}

function tratarCliqueCard(evento) {
    const botaoOuLink = evento.target.closest("button, a");
    if (botaoOuLink) {
        return;
    }

    const cardJogo = evento.target.closest(".card-jogo, .card-destaque");
    if (cardJogo?.dataset.jogo) {
        navegarPara("detalhe", Number(cardJogo.dataset.jogo));
    }
}

function tratarAcaoInterface(evento) {
    const alvo = evento.target.closest("[data-acao]");
    if (!alvo) {
        return;
    }

    const acao = alvo.dataset.acao;
    const jogoId = Number(alvo.dataset.jogo || 0);

    if (acao === "abrir-detalhe") {
        navegarPara("detalhe", jogoId);
        return;
    }

    if (acao === "atualizar-jogo") {
        void atualizarJogo(jogoId, { abrirDetalhe: estado.visaoAtual === "detalhe" });
        return;
    }

    if (acao === "copiar-link") {
        void copiarLinkJogo(jogoId);
        return;
    }

    if (acao === "abrir-steam") {
        abrirJogoNaSteam(jogoId);
        return;
    }

    if (acao === "adicionar-resultado-steam") {
        void adicionarResultadoSteam(alvo.dataset.url || "");
        return;
    }

    if (acao === "filtrar-historico") {
        void filtrarHistoricoDetalhe(alvo.dataset.periodoHistorico || "recentes");
        return;
    }

    if (acao === "carregar-mais-historico") {
        void carregarMaisHistoricoDetalhe();
        return;
    }

    if (acao === "selecionar-midia-detalhe") {
        void selecionarMidiaDetalhe(alvo.dataset.indiceMidia || 0);
        return;
    }

    if (acao === "midia-detalhe-anterior") {
        void moverMidiaDetalhe(-1);
        return;
    }

    if (acao === "midia-detalhe-proxima") {
        void moverMidiaDetalhe(1);
        return;
    }

    if (acao === "alternar-rotacao-detalhe") {
        void alternarRotacaoDetalhe();
        return;
    }

    if (acao === "remover-jogo") {
        void removerJogo(jogoId, { irParaBiblioteca: estado.visaoAtual === "detalhe" });
        return;
    }

    if (acao === "monitorar-agora") {
        void monitorarAgora();
        return;
    }

    if (acao === "recarregar-painel") {
        void carregarPainel();
        return;
    }

    if (acao === "ir-visao") {
        navegarPara(alvo.dataset.visaoMenu || "inicio");
    }
}

async function atualizarVisaoPorRota() {
    const rota = obterRotaAtual();

    if (rota.visao === "detalhe") {
        if (rota.jogoId) {
            estado.jogoSelecionadoId = rota.jogoId;
        }
        definirVisaoAtiva("detalhe");
        await renderizarDetalheAtual();
        return;
    }

    definirVisaoAtiva(rota.visao);
}

async function habilitarNotificacoes() {
    if (!("Notification" in window)) {
        mostrarMensagem("Este navegador não oferece suporte a notificações.", "erro");
        return;
    }

    const permissao = await Notification.requestPermission();
    if (permissao !== "granted") {
        atualizarStatusNotificacao();
        mostrarMensagem("A permissão de notificação não foi concedida.", "aviso");
        return;
    }

    try {
        await enviarRequisicao("/api/configuracao", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                notificacoes_navegador_ativas: true,
            }),
        });
        await carregarPainel();
        atualizarStatusNotificacao();
        mostrarMensagem("Notificações do navegador habilitadas.");
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível ativar as notificações."), "erro");
    }
}

async function desativarNotificacoes() {
    try {
        await enviarRequisicao("/api/configuracao", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                notificacoes_navegador_ativas: false,
            }),
        });
        await carregarPainel();
        atualizarStatusNotificacao();
        mostrarMensagem("Notificações do navegador desativadas.");
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível desativar as notificações."), "erro");
    }
}

function configurarEventos() {
    elementos.formularioJogo.addEventListener("submit", enviarJogo);
    elementos.formularioConfiguracao.addEventListener("submit", salvarConfiguracao);
    elementos.formularioBuscaSteam.addEventListener("submit", (evento) => {
        evento.preventDefault();
        void buscarJogosNaSteam(elementos.buscaJogos.value);
    });

    elementos.buscaBiblioteca.addEventListener("input", () => {
        estado.biblioteca.busca = elementos.buscaBiblioteca.value.trim();
        renderizarBiblioteca();
    });

    elementos.ordenacaoBiblioteca.addEventListener("change", () => {
        estado.biblioteca.ordenacao = elementos.ordenacaoBiblioteca.value;
        renderizarBiblioteca();
    });

    elementos.filtrosBiblioteca.forEach((botao) => {
        botao.addEventListener("click", () => {
            estado.biblioteca.filtro = botao.dataset.filtroBiblioteca || "todos";
            renderizarBiblioteca();
        });
    });

    elementos.buscaLogsRobot.addEventListener("input", () => {
        estado.logsRobot.busca = elementos.buscaLogsRobot.value.trim();
        renderizarLogsRobot();
    });

    elementos.filtrosLogsRobot.forEach((botao) => {
        botao.addEventListener("click", () => {
            estado.logsRobot.origem = botao.dataset.filtroLog || "todos";
            renderizarLogsRobot();
        });
    });

    elementos.opcoesFocoColeta.forEach((opcao) => {
        opcao.addEventListener("click", () => {
            elementos.campoFocoColeta.value = opcao.dataset.focoColetaOpcao || "automatico";
            atualizarVisualFocoColeta(elementos.campoFocoColeta.value);
        });
    });

    elementos.botoesMonitorarAgora.forEach((botao) => {
        botao.addEventListener("click", () => {
            void monitorarAgora();
        });
    });

    elementos.botaoIrConfiguracao.addEventListener("click", () => {
        focarBuscaSteam();
    });
    elementos.botaoIrBiblioteca.addEventListener("click", () => navegarPara("biblioteca"));
    elementos.botaoVoltarBiblioteca.addEventListener("click", () => navegarPara("biblioteca"));
    elementos.botaoHabilitarNotificacoes.addEventListener("click", () => {
        void habilitarNotificacoes();
    });
    elementos.botaoDesativarNotificacoes.addEventListener("click", () => {
        void desativarNotificacoes();
    });
    elementos.botaoAtualizarDetalhe.addEventListener("click", () => {
        const jogoId = Number(elementos.botaoAtualizarDetalhe.dataset.jogo || estado.jogoSelecionadoId || 0);
        void atualizarJogo(jogoId, { abrirDetalhe: true });
    });

    elementos.botaoSlideAnterior.addEventListener("click", () => mudarSlide(-1));
    elementos.botaoSlideProximo.addEventListener("click", () => mudarSlide(1));
    elementos.botaoSlidePausa.addEventListener("click", () => {
        estado.carrosselPausado = !estado.carrosselPausado;
        renderizarCarrossel();
    });
    elementos.botaoCarregarMaisLogs.addEventListener("click", () => {
        void carregarMaisLogsRobot();
    });

    elementos.listaMiniaturasSlide.addEventListener("click", (evento) => {
        const botao = evento.target.closest("[data-slide]");
        if (botao) {
            irParaSlide(Number(botao.dataset.slide));
        }
    });

    elementos.listaIndicadoresSlide.addEventListener("click", (evento) => {
        const botao = evento.target.closest("[data-slide]");
        if (botao) {
            irParaSlide(Number(botao.dataset.slide));
        }
    });

    elementos.carrosselPrincipal.addEventListener("click", (evento) => {
        const botao = evento.target.closest("[data-acao-slide]");
        if (botao) {
            executarAcaoSlide(botao.dataset.acaoSlide);
        }
    });

    if (elementos.carrossel) {
        elementos.carrossel.addEventListener("mouseenter", () => {
            estado.carrosselEmFoco = true;
        });

        elementos.carrossel.addEventListener("mouseleave", () => {
            estado.carrosselEmFoco = false;
        });
    }

    elementos.buscaJogos.addEventListener("focus", () => {
        renderizarBuscaSteam();
        abrirPainelBuscaSteam();
    });

    elementos.buscaJogos.addEventListener("input", () => {
        agendarBuscaSteam();
    });

    document.addEventListener("click", (evento) => {
        if (!evento.target.closest("#menu-contexto")) {
            fecharMenuContexto();
        }

        if (!evento.target.closest("#formulario-busca-steam")) {
            fecharPainelBuscaSteam();
        }

        tratarAcaoInterface(evento);
        tratarCliqueCard(evento);
    });

    document.addEventListener("contextmenu", (evento) => {
        evento.preventDefault();
        abrirMenuContexto(evento);
    });

    window.addEventListener("hashchange", () => {
        void atualizarVisaoPorRota();
    });

    window.addEventListener("resize", () => {
        fecharMenuContexto();
        fecharPainelBuscaSteam();
    });
    window.addEventListener("scroll", () => {
        fecharMenuContexto();
        fecharPainelBuscaSteam();
    });
    window.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            fecharMenuContexto();
            fecharPainelBuscaSteam();
        }
    });
}

async function inicializar() {
    iniciarTelaAbertura();

    try {
        configurarEventos();
        atualizarTelaAbertura(22, "Preparando interface");

        elementos.botaoSlideAnterior.textContent = "\u2039";
        elementos.botaoSlideProximo.textContent = "\u203a";
        elementos.botaoSlideAnterior.setAttribute("aria-label", "Slide anterior");
        elementos.botaoSlideProximo.setAttribute("aria-label", "Próximo slide");

        if (!window.location.hash) {
            window.location.hash = "inicio";
        }

        atualizarTelaAbertura(42, "Carregando biblioteca local");
        await carregarPainel();

        atualizarTelaAbertura(72, "Sincronizando vitrine");
        await atualizarVisaoPorRota();
        renderizarCarrossel();

        atualizarTelaAbertura(88, "Ativando monitoramento");
        iniciarCarrosselAutomatico();
        iniciarRotacaoAutomaticaDetalhe();

        window.clearInterval(temporizadorAtualizacao);
        temporizadorAtualizacao = window.setInterval(() => {
            void carregarPainel().then(() => atualizarVisaoPorRota());
        }, 18000);
    } catch (erro) {
        mostrarMensagem(traduzirErro(erro, "Não foi possível iniciar a aplicação local."), "erro");
    } finally {
        await concluirTelaAbertura();
    }
}

void inicializar();
