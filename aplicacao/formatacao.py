from datetime import datetime


def agora_iso():
    return datetime.now().astimezone().isoformat()


def formatar_moeda(valor, moeda):
    if valor in [None, ""]:
        return "Não disponível"
    codigo = moeda or "BRL"
    numero = f"{float(valor):,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    if codigo == "BRL":
        return f"R$ {numero}"
    return f"{codigo} {numero}"
