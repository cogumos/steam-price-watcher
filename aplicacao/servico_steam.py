import re
from html import unescape
from threading import Lock
from urllib.parse import urljoin, urlsplit, urlunsplit

import requests
from bs4 import BeautifulSoup


class ServicoSteam:
    def __init__(self, armazenamento, executor_robot, configuracao):
        self.armazenamento = armazenamento
        self.executor_robot = executor_robot
        self.configuracao = configuracao
        self.trava = Lock()
        self.cache_imagens = {}
        self.versao_projeto = "1.0"

    def adicionar_jogo(self, url, preco_alvo=None):
        url_limpa = (url or "").strip()
        if not url_limpa:
            raise ValueError("Informe o link do jogo da Steam.")
        with self.trava:
            coleta = self.executor_robot.coletar(url_limpa, self.configuracao.ler())
            existente = self.armazenamento.buscar_jogo_por_url(coleta.get("url"))
            if existente:
                if preco_alvo not in [None, ""]:
                    self.armazenamento.atualizar_preco_alvo(existente["id"], preco_alvo)
                jogo = self._enriquecer_jogo(self.armazenamento.registrar_coleta(existente["id"], coleta))
                self._registrar_logs(coleta, jogo["id"])
                return jogo
            jogo = self._enriquecer_jogo(self.armazenamento.criar_jogo(coleta, preco_alvo))
            self._registrar_logs(coleta, jogo["id"])
            return jogo

    def atualizar_jogo(self, jogo_id):
        with self.trava:
            jogo = self.armazenamento.buscar_jogo_por_id(jogo_id)
            if not jogo:
                raise ValueError("Jogo não encontrado.")
            coleta = self.executor_robot.coletar(jogo["url"], self.configuracao.ler())
            jogo_atualizado = self._enriquecer_jogo(self.armazenamento.registrar_coleta(jogo_id, coleta))
            self._registrar_logs(coleta, jogo_id)
            return jogo_atualizado

    def remover_jogo(self, jogo_id):
        with self.trava:
            return self._enriquecer_jogo(self.armazenamento.remover_jogo(jogo_id))

    def monitorar_todos(self):
        jogos = [self._enriquecer_jogo(jogo) for jogo in self.armazenamento.listar_jogos()]
        resultados = []
        erros = []
        with self.trava:
            for jogo in jogos:
                try:
                    coleta = self.executor_robot.coletar(jogo["url"], self.configuracao.ler())
                    atualizado = self._enriquecer_jogo(self.armazenamento.registrar_coleta(jogo["id"], coleta))
                    self._registrar_logs(coleta, jogo["id"])
                    resultados.append(atualizado)
                except Exception as erro:
                    mensagem = f"Falha ao monitorar {jogo['nome']}: {erro}"
                    self.armazenamento.registrar_alerta(
                        "Falha no monitoramento",
                        mensagem,
                        "erro",
                        jogo["id"],
                    )
                    self.armazenamento.registrar_logs_robot(
                        [
                            {
                                "origem": "erro",
                                "etapa": "monitoramento",
                                "mensagem": mensagem,
                            }
                        ],
                        jogo["id"],
                    )
                    erros.append(mensagem)
        return {"resultados": resultados, "erros": erros}

    def obter_painel(self):
        jogos = [self._enriquecer_jogo(jogo) for jogo in self.armazenamento.listar_jogos()]
        alertas = self.armazenamento.listar_alertas()
        configuracao = self.configuracao.ler()
        limite_logs = configuracao.get("limite_logs_robot", 40)
        logs_robot = self.armazenamento.listar_logs_robot(limite_logs, 0)
        total_logs = self.armazenamento.contar_logs_robot()
        total_promocoes = len(
            [jogo for jogo in jogos if jogo["status_promocao"] != "Sem promoção"]
        )
        return {
            "jogos": jogos,
            "alertas": alertas,
            "logs_robot": logs_robot,
            "logs_robot_meta": {
                "total": total_logs,
                "offset": len(logs_robot),
                "limite": limite_logs,
                "tem_mais": len(logs_robot) < total_logs,
            },
            "robot": {
                "foco_coleta": configuracao.get("foco_coleta", "automatico"),
                "idioma_loja": configuracao.get("idioma_loja", "brazilian"),
                "pais_loja": configuracao.get("pais_loja", "br"),
                "timeout_requisicao_segundos": configuracao.get("timeout_requisicao_segundos", 30),
                "registrar_logs_robot": configuracao.get("registrar_logs_robot", True),
            },
            "projeto": {
                "nome": "SteamPriceWatcher",
                "versao": self.versao_projeto,
            },
            "resumo": {
                "total_jogos": len(jogos),
                "total_promocoes": total_promocoes,
                "total_alertas": len(alertas),
            },
        }

    def obter_logs_robot(self, limite=None, offset=0):
        configuracao = self.configuracao.ler()
        try:
            limite_final = int(limite if limite not in [None, ""] else configuracao.get("limite_logs_robot", 40))
        except (TypeError, ValueError):
            limite_final = configuracao.get("limite_logs_robot", 40)
        try:
            offset_final = max(0, int(offset or 0))
        except (TypeError, ValueError):
            offset_final = 0

        limite_final = max(1, min(200, limite_final))
        itens = self.armazenamento.listar_logs_robot(limite_final, offset_final)
        total = self.armazenamento.contar_logs_robot()
        return {
            "itens": itens,
            "total": total,
            "offset": offset_final + len(itens),
            "limite": limite_final,
            "tem_mais": offset_final + len(itens) < total,
        }

    def buscar_na_loja(self, termo, limite=8):
        texto_busca = self._limpar_texto(termo)
        if len(texto_busca) < 2:
            raise ValueError("Informe pelo menos 2 caracteres para pesquisar na Steam.")

        try:
            quantidade = max(1, min(25, int(limite)))
        except (TypeError, ValueError):
            quantidade = 25

        configuracao = self.configuracao.ler()

        try:
            resposta = requests.get(
                "https://store.steampowered.com/search/results/",
                params={
                    "term": texto_busca,
                    "cc": configuracao.get("pais_loja", "br"),
                    "l": configuracao.get("idioma_loja", "brazilian"),
                    "infinite": "1",
                    "start": 0,
                    "count": quantidade,
                },
                headers=self._cabecalhos_busca(),
                timeout=configuracao.get("timeout_requisicao_segundos", 30),
            )
        except requests.RequestException as erro:
            raise ValueError("Não foi possível consultar a busca da Steam no momento.") from erro

        if resposta.status_code != 200:
            raise ValueError("A Steam não respondeu à busca neste momento.")

        corpo = resposta.json()
        resultados_html = corpo.get("results_html") or ""
        sopa = BeautifulSoup(resultados_html, "html.parser")
        resultados = []

        for item in sopa.select("a.search_result_row"):
            url = self._normalizar_url_resultado(item.get("href"))
            if not url:
                continue

            nome_elemento = item.select_one(".title")
            nome = self._limpar_texto(nome_elemento.get_text()) if nome_elemento else ""
            if not nome:
                continue

            preco = self._extrair_preco_resultado(item)

            resultado = self._enriquecer_resultado_busca(
                {
                    "nome": nome,
                    "url": url,
                    "identificador_steam": self._extrair_identificador_resultado(item),
                    "tipo_item": self._extrair_tipo_resultado(item, url),
                    "imagem": self._extrair_imagem_resultado(item),
                    "data_lancamento": self._extrair_data_resultado(item),
                    "plataformas": self._extrair_plataformas_resultado(item),
                    "preco_atual_texto": preco["preco_atual_texto"],
                    "preco_original_texto": preco["preco_original_texto"],
                    "desconto_percentual": preco["desconto_percentual"],
                    "gratuito": preco["gratuito"],
                }
            )
            resultados.append(resultado)

        return {
            "termo": texto_busca,
            "total": int(corpo.get("total_count") or len(resultados)),
            "resultados": resultados[:quantidade],
        }

    def listar_historico(self, jogo_id):
        return self.armazenamento.listar_historico(jogo_id)

    def _registrar_logs(self, coleta, jogo_id):
        if self.configuracao.ler().get("registrar_logs_robot", True):
            self.armazenamento.registrar_logs_robot(coleta.get("logs") or [], jogo_id)

    def _enriquecer_jogo(self, jogo):
        item = dict(jogo or {})
        identificador = self._limpar_texto(item.get("identificador_steam"))
        tipo_item = self._extrair_tipo_item_por_url(item.get("url"))
        imagens = self._obter_imagens_item(identificador, item.get("url"), tipo_item)
        item["imagem_capsula"] = imagens.get("imagem_capsula", "")
        item["imagem_banner"] = imagens.get("imagem_banner", "")
        item["imagem_header"] = imagens.get("imagem_header", "")
        item["imagem_capa"] = imagens.get("imagem_capa", "")
        item["capturas_tela"] = imagens.get("capturas_tela", [])
        item["descricao_curta"] = imagens.get("descricao_curta", "")
        item["data_lancamento"] = item.get("data_lancamento") or imagens.get("data_lancamento", "")
        item["desenvolvedores"] = imagens.get("desenvolvedores", [])
        item["distribuidoras"] = imagens.get("distribuidoras", [])
        item["generos"] = imagens.get("generos", [])
        item["marcadores"] = imagens.get("marcadores", [])
        item["plataformas"] = imagens.get("plataformas", []) or item.get("plataformas", [])
        item["tipo_item"] = tipo_item
        return item

    def _enriquecer_resultado_busca(self, resultado):
        item = dict(resultado or {})
        imagem = self._normalizar_url_imagem(item.get("imagem"))
        item["imagem"] = imagem
        item["imagem_capsula"] = imagem
        item["imagem_header"] = imagem
        item["imagem_banner"] = imagem
        item["imagem_capa"] = imagem
        item["capturas_tela"] = []
        item["tipo_item"] = item.get("tipo_item") or self._extrair_tipo_item_por_url(item.get("url"))
        return item

    def _obter_imagens_item(self, identificador, url, tipo_item):
        chave_cache = f"{tipo_item}:{self._limpar_texto(identificador)}:{self._limpar_texto(url)}"
        if chave_cache in self.cache_imagens:
            return dict(self.cache_imagens[chave_cache])

        imagens = {
            "imagem_capsula": "",
            "imagem_banner": "",
            "imagem_header": "",
            "imagem_capa": "",
            "capturas_tela": [],
            "descricao_curta": "",
            "data_lancamento": "",
            "desenvolvedores": [],
            "distribuidoras": [],
            "generos": [],
            "marcadores": [],
            "plataformas": [],
        }

        if identificador and tipo_item == "jogo":
            imagens_api = self._obter_imagens_por_appdetails(identificador)
            self._mesclar_dados_loja(imagens, imagens_api)

        if url:
            imagens_pagina = self._obter_imagens_pela_pagina(url)
            self._mesclar_dados_loja(imagens, imagens_pagina)

        imagens["imagem_capsula"] = (
            imagens["imagem_capsula"]
            or imagens["imagem_capa"]
            or imagens["imagem_header"]
            or imagens["imagem_banner"]
        )
        imagens["imagem_header"] = (
            imagens["imagem_header"]
            or imagens["imagem_banner"]
            or imagens["imagem_capa"]
            or imagens["imagem_capsula"]
        )
        imagens["imagem_banner"] = (
            imagens["imagem_banner"]
            or imagens["imagem_header"]
            or imagens["imagem_capa"]
            or imagens["imagem_capsula"]
        )
        imagens["imagem_capa"] = (
            imagens["imagem_capa"]
            or imagens["imagem_capsula"]
            or imagens["imagem_banner"]
            or imagens["imagem_header"]
        )
        if not imagens["capturas_tela"]:
            imagens["capturas_tela"] = self._montar_galeria_fallback(imagens)

        self.cache_imagens[chave_cache] = dict(imagens)
        return imagens

    def _obter_imagens_por_appdetails(self, identificador):
        imagens = {
            "imagem_capsula": "",
            "imagem_banner": "",
            "imagem_header": "",
            "imagem_capa": "",
            "capturas_tela": [],
            "descricao_curta": "",
            "data_lancamento": "",
            "desenvolvedores": [],
            "distribuidoras": [],
            "generos": [],
            "marcadores": [],
            "plataformas": [],
        }

        try:
            configuracao = self.configuracao.ler()
            resposta = requests.get(
                "https://store.steampowered.com/api/appdetails",
                params={
                    "appids": identificador,
                    "cc": configuracao.get("pais_loja", "br"),
                    "l": configuracao.get("idioma_loja", "brazilian"),
                },
                headers=self._cabecalhos_busca(),
                timeout=configuracao.get("timeout_requisicao_segundos", 30),
            )
            if resposta.status_code == 200:
                dados = (resposta.json().get(str(identificador)) or {}).get("data") or {}
                imagens["imagem_capsula"] = self._normalizar_url_imagem(
                    dados.get("capsule_image") or dados.get("capsule_imagev5")
                )
                imagens["imagem_header"] = self._normalizar_url_imagem(dados.get("header_image"))
                imagens["imagem_banner"] = imagens["imagem_header"] or imagens["imagem_capsula"]
                imagens["imagem_capa"] = self._normalizar_url_imagem(dados.get("background") or dados.get("background_raw"))
                imagens["capturas_tela"] = self._extrair_capturas_appdetails(dados.get("screenshots") or [])
                imagens["descricao_curta"] = self._limpar_texto_html(dados.get("short_description"))
                imagens["data_lancamento"] = self._limpar_texto((dados.get("release_date") or {}).get("date"))
                imagens["desenvolvedores"] = self._extrair_lista_textos(dados.get("developers") or [])
                imagens["distribuidoras"] = self._extrair_lista_textos(dados.get("publishers") or [])
                imagens["generos"] = self._extrair_lista_descricoes(dados.get("genres") or [])
                imagens["plataformas"] = self._extrair_plataformas_appdetails(dados.get("platforms") or {})
        except requests.RequestException:
            pass

        return imagens

    def _obter_imagens_pela_pagina(self, url):
        imagens = {
            "imagem_capsula": "",
            "imagem_banner": "",
            "imagem_header": "",
            "imagem_capa": "",
            "capturas_tela": [],
            "descricao_curta": "",
            "data_lancamento": "",
            "desenvolvedores": [],
            "distribuidoras": [],
            "generos": [],
            "marcadores": [],
            "plataformas": [],
        }

        try:
            resposta = requests.get(
                url,
                headers=self._cabecalhos_busca(),
                timeout=self.configuracao.ler().get("timeout_requisicao_segundos", 30),
            )
            if resposta.status_code != 200:
                return imagens
            sopa = BeautifulSoup(resposta.text, "html.parser")
        except requests.RequestException:
            return imagens

        imagem_og = self._extrair_url_imagem(
            sopa,
            [
                "meta[property='og:image']",
                "meta[name='twitter:image']",
                "link[rel='image_src']",
            ],
            "content",
        )
        imagem_header = self._extrair_url_imagem(
            sopa,
            [
                ".game_header_image_full",
                ".package_header img",
                ".bundle_header_capsule img",
                ".bundle_header_preview img",
                ".game_capsule img",
            ],
            "src",
        )

        imagens["imagem_capa"] = imagem_og
        imagens["imagem_header"] = imagem_header or imagem_og
        imagens["imagem_banner"] = imagem_header or imagem_og
        imagens["imagem_capsula"] = imagem_og or imagem_header
        imagens["capturas_tela"] = self._extrair_capturas_pela_pagina(sopa)
        imagens["descricao_curta"] = self._extrair_descricao_pela_pagina(sopa)
        imagens["data_lancamento"] = self._extrair_data_lancamento_pela_pagina(sopa)
        imagens["desenvolvedores"] = self._extrair_links_texto_pela_pagina(
            sopa,
            [".details_block a[href*='/developer/']", ".dev_row a[href*='/developer/']"],
        )
        imagens["distribuidoras"] = self._extrair_links_texto_pela_pagina(
            sopa,
            [".details_block a[href*='/publisher/']", ".dev_row a[href*='/publisher/']"],
        )
        imagens["generos"] = self._extrair_links_texto_pela_pagina(
            sopa,
            [".details_block a[href*='/genre/']", ".details_block a[href*='/tag/']"],
        )
        imagens["marcadores"] = self._extrair_marcadores_pela_pagina(sopa)
        return imagens

    def _extrair_capturas_appdetails(self, capturas):
        itens = []
        vistos = set()
        for captura in capturas or []:
            imagem = self._normalizar_url_imagem(captura.get("path_full"))
            miniatura = self._normalizar_url_imagem(captura.get("path_thumbnail")) or imagem
            if not imagem or imagem in vistos:
                continue
            vistos.add(imagem)
            itens.append(
                {
                    "imagem": imagem,
                    "miniatura": miniatura,
                }
            )
        return itens[:10]

    def _extrair_capturas_pela_pagina(self, sopa):
        itens = []
        vistos = set()
        for elemento in sopa.select("a.highlight_screenshot_link"):
            imagem = self._normalizar_url_imagem(
                elemento.get("href") or elemento.get("data-screenshotid") or ""
            )
            miniatura = self._normalizar_url_imagem(
                (elemento.select_one("img") or {}).get("src") if elemento.select_one("img") else ""
            ) or imagem
            if not imagem or imagem in vistos:
                continue
            vistos.add(imagem)
            itens.append(
                {
                    "imagem": imagem,
                    "miniatura": miniatura,
                }
            )
        return itens[:10]

    def _montar_galeria_fallback(self, imagens):
        itens = []
        vistos = set()
        for chave in ["imagem_banner", "imagem_header", "imagem_capa", "imagem_capsula"]:
            valor = self._normalizar_url_imagem(imagens.get(chave))
            if not valor or valor in vistos:
                continue
            vistos.add(valor)
            itens.append(
                {
                    "imagem": valor,
                    "miniatura": valor,
                }
            )
        return itens

    def _mesclar_dados_loja(self, destino, origem):
        chaves_lista = {"capturas_tela", "desenvolvedores", "distribuidoras", "generos", "marcadores", "plataformas"}
        for chave, valor in (origem or {}).items():
            if chave in chaves_lista:
                if not valor:
                    continue
                destino[chave] = self._mesclar_lista_unica(destino.get(chave) or [], valor)
                continue
            if valor and not destino.get(chave):
                destino[chave] = valor

    def _mesclar_lista_unica(self, atual, novo):
        itens = []
        vistos = set()
        for valor in list(atual or []) + list(novo or []):
            if isinstance(valor, dict):
                chave = self._limpar_texto(valor.get("imagem") or valor.get("miniatura"))
                item_final = {
                    "imagem": self._normalizar_url_imagem(valor.get("imagem")),
                    "miniatura": self._normalizar_url_imagem(valor.get("miniatura")) or self._normalizar_url_imagem(valor.get("imagem")),
                }
                if not item_final["imagem"]:
                    continue
            else:
                texto = self._limpar_texto(valor)
                chave = texto.lower()
                item_final = texto
                if not texto:
                    continue
            if chave in vistos:
                continue
            vistos.add(chave)
            itens.append(item_final)
        return itens

    def _limpar_texto_html(self, valor):
        texto = BeautifulSoup(unescape(str(valor or "")), "html.parser").get_text(" ", strip=True)
        return self._limpar_texto(texto)

    def _extrair_lista_textos(self, itens):
        return [self._limpar_texto(item) for item in itens if self._limpar_texto(item)]

    def _extrair_lista_descricoes(self, itens):
        valores = []
        for item in itens or []:
            texto = self._limpar_texto((item or {}).get("description"))
            if texto:
                valores.append(texto)
        return valores

    def _extrair_plataformas_appdetails(self, plataformas):
        valores = []
        mapa = {
            "windows": "Windows",
            "mac": "macOS",
            "linux": "Linux",
        }
        for chave, rotulo in mapa.items():
            if (plataformas or {}).get(chave):
                valores.append(rotulo)
        return valores

    def _extrair_descricao_pela_pagina(self, sopa):
        for seletor, atributo in [
            ("meta[property='og:description']", "content"),
            ("meta[name='description']", "content"),
            (".game_description_snippet", None),
            (".package_header_desc", None),
        ]:
            elemento = sopa.select_one(seletor)
            if not elemento:
                continue
            valor = elemento.get(atributo) if atributo else elemento.get_text(" ", strip=True)
            texto = self._limpar_texto_html(valor)
            if texto:
                return texto
        return ""

    def _extrair_data_lancamento_pela_pagina(self, sopa):
        for seletor in [".release_date .date", ".date"]:
            elemento = sopa.select_one(seletor)
            texto = self._limpar_texto(elemento.get_text(" ", strip=True)) if elemento else ""
            if texto:
                return texto
        return ""

    def _extrair_links_texto_pela_pagina(self, sopa, seletores):
        itens = []
        vistos = set()
        for seletor in seletores:
            for elemento in sopa.select(seletor):
                texto = self._limpar_texto(elemento.get_text(" ", strip=True))
                chave = texto.lower()
                if not texto or chave in vistos:
                    continue
                vistos.add(chave)
                itens.append(texto)
        return itens

    def _extrair_marcadores_pela_pagina(self, sopa):
        itens = []
        vistos = set()
        for elemento in sopa.select(".glance_tags.popular_tags .app_tag, .popular_tags .app_tag"):
            texto = self._limpar_texto(elemento.get_text(" ", strip=True))
            chave = texto.lower()
            if not texto or chave in vistos:
                continue
            vistos.add(chave)
            itens.append(texto)
        return itens[:10]

    def _limpar_texto(self, valor):
        return re.sub(r"\s+", " ", str(valor or "")).strip()

    def _normalizar_url_resultado(self, url):
        if not url:
            return ""
        partes = urlsplit(str(url).strip())
        caminho = re.sub(r"/+", "/", partes.path or "/")
        caminho = caminho if caminho.endswith("/") else f"{caminho}/"
        return urlunsplit((partes.scheme or "https", partes.netloc or "store.steampowered.com", caminho, "", ""))

    def _extrair_identificador_resultado(self, item):
        bruto = self._limpar_texto(item.get("data-ds-appid"))
        if not bruto:
            encontrado = re.search(r"/(?:app|sub|bundle)/(\d+)", item.get("href") or "")
            return encontrado.group(1) if encontrado else ""
        return bruto.split(",")[0].strip()

    def _extrair_tipo_resultado(self, item, url):
        chave = self._limpar_texto(item.get("data-ds-itemkey")).lower()
        if chave.startswith("app_") or "/app/" in url:
            return "jogo"
        if chave.startswith("sub_") or "/sub/" in url:
            return "pacote"
        if chave.startswith("bundle_") or "/bundle/" in url:
            return "bundle"
        return "item"

    def _extrair_imagem_resultado(self, item):
        imagem = item.select_one(".search_capsule img")
        if not imagem:
            return ""
        return self._normalizar_url_imagem(imagem.get("src") or imagem.get("data-src"))

    def _extrair_tipo_item_por_url(self, url):
        texto = self._limpar_texto(url).lower()
        if "/app/" in texto:
            return "jogo"
        if "/sub/" in texto:
            return "pacote"
        if "/bundle/" in texto:
            return "bundle"
        return "item"

    def _extrair_url_imagem(self, sopa, seletores, atributo):
        for seletor in seletores:
            elemento = sopa.select_one(seletor)
            if not elemento:
                continue
            valor = elemento.get(atributo) or elemento.get("src")
            url = self._normalizar_url_imagem(valor)
            if url:
                return url
        return ""

    def _normalizar_url_imagem(self, url):
        texto = unescape(self._limpar_texto(url))
        if not texto:
            return ""
        if texto.startswith("//"):
            return f"https:{texto}"
        if texto.startswith("/"):
            return urljoin("https://store.steampowered.com", texto)
        return texto

    def _extrair_data_resultado(self, item):
        elemento = item.select_one(".search_released")
        return self._limpar_texto(elemento.get_text()) if elemento else ""

    def _extrair_plataformas_resultado(self, item):
        plataformas = []
        mapa = {
            "win": "Windows",
            "mac": "macOS",
            "linux": "Linux",
        }
        for elemento in item.select(".search_platforms .platform_img"):
            classes = elemento.get("class") or []
            for classe in classes:
                if classe in mapa and mapa[classe] not in plataformas:
                    plataformas.append(mapa[classe])
        return plataformas

    def _extrair_preco_resultado(self, item):
        desconto = 0
        desconto_elemento = item.select_one(".discount_pct")
        if desconto_elemento:
            encontrado = re.search(r"(\d+)", desconto_elemento.get_text(" ", strip=True))
            if encontrado:
                desconto = int(encontrado.group(1))

        preco_original = ""
        preco_atual = ""

        original_elemento = item.select_one(".discount_original_price")
        final_elemento = item.select_one(".discount_final_price")
        simples_elemento = item.select_one(".search_price")

        if original_elemento:
            preco_original = self._limpar_texto(original_elemento.get_text(" ", strip=True))
        if final_elemento:
            preco_atual = self._limpar_texto(final_elemento.get_text(" ", strip=True))
        elif simples_elemento:
            preco_atual = self._limpar_texto(simples_elemento.get_text(" ", strip=True))

        texto_alto = preco_atual.upper()
        gratuito = any(texto in texto_alto for texto in ["GRATUITO", "FREE TO PLAY", "FREE"])

        if gratuito:
            preco_atual = "Gratuito"
            preco_original = ""
            desconto = 0

        if not preco_atual:
            preco_atual = "Preço indisponível"

        return {
            "preco_atual_texto": preco_atual,
            "preco_original_texto": preco_original or "",
            "desconto_percentual": desconto,
            "gratuito": gratuito,
        }

    def _cabecalhos_busca(self):
        return {
            "User-Agent": "SteamPriceWatcher/1.0",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Referer": "https://store.steampowered.com/search/",
        }
