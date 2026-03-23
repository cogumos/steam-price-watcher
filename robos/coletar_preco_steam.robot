*** Settings ***
Library    bibliotecas/biblioteca_steam.py

*** Variables ***
${URL}
${SAIDA_JSON}
${FOCO_COLETA}
${IDIOMA_LOJA}
${PAIS_LOJA}
${TIMEOUT_REQUISICAO}
${REGISTRAR_LOGS}

*** Tasks ***
Coletar preço do jogo da Steam
    Coletar dados do jogo da steam
    ...    ${URL}
    ...    ${SAIDA_JSON}
    ...    ${FOCO_COLETA}
    ...    ${IDIOMA_LOJA}
    ...    ${PAIS_LOJA}
    ...    ${TIMEOUT_REQUISICAO}
    ...    ${REGISTRAR_LOGS}
