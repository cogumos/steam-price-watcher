import json
import re
from datetime import datetime
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from robot.api.deco import keyword


class BibliotecaSteam:
    @keyword("Coletar dados do jogo da steam")
    def coletar_dados_do_jogo_da_steam(
        self,
        url,
        saida_json,
        foco_coleta="automatico",
        idioma_loja="brazilian",
        pais_loja="br",
        timeout_requisicao=30,
        registrar_logs="sim",
    ):
        caminho_saida = Path(saida_json)
        caminho_saida.parent.mkdir(parents=True, exist_ok=True)
        contexto = self._montar_contexto(
            foco_coleta=foco_coleta,
            idioma_loja=idioma_loja,
            pais_loja=pais_loja,
            timeout_requisicao=timeout_requisicao,
            registrar_logs=registrar_logs,
        )
        try:
            dados = self._coletar(url, contexto)
            dados["sucesso"] = True
        except Exception as erro:
            self._registrar_log(contexto, "erro", "falha", str(erro))
            dados = {
                "sucesso": False,
                "erro": str(erro),
                "url": url,
                "logs": contexto["logs"],
                "parametros": contexto["parametros"],
            }
        with caminho_saida.open("w", encoding="utf-8") as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=2)

    def _montar_contexto(self, foco_coleta, idioma_loja, pais_loja, timeout_requisicao, registrar_logs):
        foco = str(foco_coleta or "automatico").strip().lower()
        idioma = str(idioma_loja or "brazilian").strip().lower()
        pais = str(pais_loja or "br").strip().lower()
        try:
            timeout = max(5, int(timeout_requisicao))
        except (TypeError, ValueError):
            timeout = 30
        return {
            "logs": [],
            "registrar_logs": str(registrar_logs or "sim").strip().lower() != "nao",
            "parametros": {
                "foco_coleta": foco if foco in {"automatico", "api", "pagina"} else "automatico",
                "idioma_loja": idioma or "brazilian",
                "pais_loja": pais or "br",
                "timeout_requisicao_segundos": timeout,
            },
        }

    def _coletar(self, url, contexto):
        url_normalizada = self._normalizar_url(url, contexto["parametros"]["idioma_loja"])
        identificador = self._extrair_identificador(url_normalizada)
        foco = contexto["parametros"]["foco_coleta"]

        self._registrar_log(contexto, "sistema", "inicio", f"Coleta iniciada para {url_normalizada}.")

        if foco in {"automatico", "api"} and identificador:
            try:
                dados = self._coletar_pela_api(identificador, url_normalizada, contexto)
                dados["origem_coleta"] = "api"
                dados["logs"] = contexto["logs"]
                dados["parametros"] = contexto["parametros"]
                return dados
            except Exception as erro:
                self._registrar_log(contexto, "api", "falha", str(erro))
                if foco == "api":
                    raise

        if foco == "api" and not identificador:
            raise ValueError("Não foi possível identificar o aplicativo para coleta via API.")

        dados = self._coletar_pela_pagina(url_normalizada, identificador, contexto)
        dados["origem_coleta"] = "pagina"
        dados["logs"] = contexto["logs"]
        dados["parametros"] = contexto["parametros"]
        return dados

    def _coletar_pela_api(self, identificador, url_normalizada, contexto):
        self._registrar_log(contexto, "api", "requisição", f"Consultando appdetails para o aplicativo {identificador}.")
        resposta = requests.get(
            "https://store.steampowered.com/api/appdetails",
            params={
                "appids": identificador,
                "l": contexto["parametros"]["idioma_loja"],
                "cc": contexto["parametros"]["pais_loja"],
            },
            headers=self._cabecalhos(),
            timeout=contexto["parametros"]["timeout_requisicao_segundos"],
        )
        self._registrar_log(contexto, "api", "resposta", f"API retornou status {resposta.status_code}.")
        if resposta.status_code != 200:
            raise ValueError("Não foi possível consultar os detalhes do jogo.")
        corpo = resposta.json()
        app = corpo.get(str(identificador)) or {}
        if not app.get("success"):
            raise ValueError("O aplicativo informado não retornou dados.")
        dados = app.get("data") or {}
        nome = dados.get("name")
        if not nome:
            raise ValueError("Não foi possível identificar o nome do jogo.")
        if dados.get("is_free"):
            preco = 0.0
            moeda = "BRL"
            percentual_desconto = 0
            self._registrar_log(contexto, "api", "preço", "Jogo gratuito identificado pela API.")
        else:
            visao_preco = dados.get("price_overview") or {}
            if not visao_preco:
                raise ValueError("A Steam não retornou o preço do jogo.")
            preco_final = visao_preco.get("final")
            if preco_final in [None, ""]:
                raise ValueError("A Steam não retornou o preço final do jogo.")
            preco = float(preco_final) / 100
            moeda = visao_preco.get("currency") or "BRL"
            percentual_desconto = int(visao_preco.get("discount_percent") or 0)
            self._registrar_log(contexto, "api", "preço", f"Preço identificado via API em {moeda} {preco:.2f}.")
        return {
            "nome": nome,
            "url": url_normalizada,
            "identificador_steam": identificador,
            "preco": preco,
            "moeda": moeda,
            "percentual_desconto": percentual_desconto,
        }

    def _coletar_pela_pagina(self, url_normalizada, identificador, contexto):
        self._registrar_log(contexto, "pagina", "requisição", "Consultando a página HTML da loja.")
        resposta = requests.get(
            url_normalizada,
            headers=self._cabecalhos(),
            timeout=contexto["parametros"]["timeout_requisicao_segundos"],
        )
        self._registrar_log(contexto, "pagina", "resposta", f"Página retornou status {resposta.status_code}.")
        if resposta.status_code != 200:
            raise ValueError("Não foi possível consultar a página da Steam.")
        sopa = BeautifulSoup(resposta.text, "html.parser")
        nome = self._extrair_nome(sopa)
        preco, moeda = self._extrair_preco(sopa)
        percentual_desconto = self._extrair_desconto(sopa)
        if preco == 0.0:
            percentual_desconto = 0
        self._registrar_log(contexto, "pagina", "preço", f"Preço identificado na página em {moeda} {preco:.2f}.")
        return {
            "nome": nome,
            "url": url_normalizada,
            "identificador_steam": identificador,
            "preco": preco,
            "moeda": moeda,
            "percentual_desconto": percentual_desconto,
        }

    def _normalizar_url(self, url, idioma_loja):
        texto = (url or "").strip()
        if not texto:
            raise ValueError("Informe um link da Steam.")
        if "store.steampowered.com" not in texto:
            raise ValueError("Informe um link válido da loja Steam.")
        identificador = self._extrair_identificador(texto)
        if identificador:
            return f"https://store.steampowered.com/app/{identificador}/?l={idioma_loja}"
        separador = "&" if "?" in texto else "?"
        if "l=" in texto:
            return texto
        return f"{texto}{separador}l={idioma_loja}"

    def _extrair_identificador(self, url):
        encontrado = re.search(r"/app/(\d+)", url or "")
        if not encontrado:
            return None
        return encontrado.group(1)

    def _extrair_nome(self, sopa):
        elemento = sopa.select_one("div.apphub_AppName")
        if elemento:
            return self._limpar(elemento.get_text())
        og_title = sopa.select_one("meta[property='og:title']")
        if og_title and og_title.get("content"):
            return og_title.get("content").replace(" on Steam", "").strip()
        raise ValueError("Não foi possível identificar o nome do jogo.")

    def _extrair_preco(self, sopa):
        moeda_meta = sopa.select_one("meta[itemprop='priceCurrency']")
        preco_meta = sopa.select_one("meta[itemprop='price']")
        if preco_meta and preco_meta.get("content"):
            moeda = moeda_meta.get("content") if moeda_meta else "BRL"
            return self._normalizar_numero(preco_meta.get("content")), moeda
        seletores = [
            ".discount_final_price",
            ".game_purchase_price.price",
            ".game_area_purchase_game .game_purchase_price",
            ".game_purchase_action .price",
        ]
        candidatos = []
        for seletor in seletores:
            for elemento in sopa.select(seletor):
                texto = self._limpar(elemento.get_text(" ", strip=True))
                if texto:
                    candidatos.append(texto)
        for texto in candidatos:
            interpretado = self._interpretar_preco(texto)
            if interpretado:
                return interpretado
        pagina = self._limpar(sopa.get_text(" ", strip=True)).upper()
        if "FREE TO PLAY" in pagina or "JOGO GRATUITO" in pagina or "GRATUITO" in pagina:
            return 0.0, "BRL"
        raise ValueError("Não foi possível localizar o preço do jogo.")

    def _extrair_desconto(self, sopa):
        seletores = [
            ".discount_pct",
            ".game_purchase_discount .discount_pct",
            ".bundle_base_discount",
        ]
        for seletor in seletores:
            for elemento in sopa.select(seletor):
                texto = self._limpar(elemento.get_text())
                encontrado = re.search(r"(\d+)", texto)
                if encontrado:
                    return int(encontrado.group(1))
        return 0

    def _interpretar_preco(self, texto):
        bruto = self._limpar(texto)
        if not bruto:
            return None
        alto = bruto.upper()
        if "FREE TO PLAY" in alto or "JOGO GRATUITO" in alto or "GRATUITO" in alto:
            return 0.0, "BRL"
        moeda = "BRL"
        numero = bruto
        if "R$" in bruto:
            moeda = "BRL"
            numero = bruto.split("R$")[-1]
        elif "USD" in alto:
            moeda = "USD"
            numero = alto.replace("USD", "")
        elif "$" in bruto:
            moeda = "USD"
            numero = bruto.replace("$", "")
        elif "\u20ac" in bruto:
            moeda = "EUR"
            numero = bruto.replace("\u20ac", "")
        elif "\u00a3" in bruto:
            moeda = "GBP"
            numero = bruto.replace("\u00a3", "")
        encontrado = re.search(r"[\d][\d\.,]*", numero)
        if not encontrado:
            return None
        valor = self._normalizar_numero(encontrado.group(0))
        return valor, moeda

    def _normalizar_numero(self, numero):
        texto = re.sub(r"[^\d,\.]", "", numero)
        if "," in texto and "." in texto:
            if texto.rfind(",") > texto.rfind("."):
                texto = texto.replace(".", "").replace(",", ".")
            else:
                texto = texto.replace(",", "")
        elif "," in texto:
            texto = texto.replace(".", "").replace(",", ".")
        return float(texto)

    def _limpar(self, texto):
        return re.sub(r"\s+", " ", texto or "").strip()

    def _registrar_log(self, contexto, origem, etapa, mensagem):
        if not contexto["registrar_logs"]:
            return
        contexto["logs"].append(
            {
                "origem": origem,
                "etapa": etapa,
                "mensagem": mensagem,
                "registrado_em": datetime.now().astimezone().isoformat(),
            }
        )

    def _cabecalhos(self):
        return {
            "User-Agent": "SteamPriceWatcher/1.0",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        }


@keyword("Coletar dados do jogo da steam")
def coletar_dados_do_jogo_da_steam(
    url,
    saida_json,
    foco_coleta="automatico",
    idioma_loja="brazilian",
    pais_loja="br",
    timeout_requisicao=30,
    registrar_logs="sim",
):
    BibliotecaSteam().coletar_dados_do_jogo_da_steam(
        url,
        saida_json,
        foco_coleta,
        idioma_loja,
        pais_loja,
        timeout_requisicao,
        registrar_logs,
    )
