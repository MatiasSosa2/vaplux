import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_JS = ROOT / "data" / "products.js"

UNWANTED_PATTERNS = [
    r"env[ií]o", r"env[ií]os", r"compra protegida", r"cuotas", r"inter[eé]s",
    r"mercado pago|mercado libre", r"devoluci[oó]n", r"garant[ií]a",
    r"llega|entrega|pedido|hoy|d[ií]a", r"beneficios|puntos|tarjeta",
    r"factura|tienda oficial", r"promoci[oó]n|oferta",
    r"✓|©|❤|\u2665|\u2713",
]

def is_unwanted_line(s: str) -> bool:
    s_low = s.lower()
    for pat in UNWANTED_PATTERNS:
        if re.search(pat, s_low):
            return True
    if len(s_low) < 8:
        return True
    if re.fullmatch(r"[\W_]+", s_low) or s_low.endswith("..."):
        return True
    return False


def sanitize_existing_specs(js_text: str) -> str:
    def _repl(match):
        raw = match.group(1)
        items = re.findall(r"'([^']+)'", raw)
        cleaned = [s for s in items if not is_unwanted_line(s)]
        arr = ", ".join([f"'{s}'" for s in cleaned])
        return f"specs: [{arr}]"
    return re.sub(r"specs:\s*\[([^\]]*)\]", lambda m: _repl(m), js_text)


def main():
    js = PRODUCTS_JS.read_text(encoding="utf-8")
    sanitized = sanitize_existing_specs(js)
    if sanitized != js:
        PRODUCTS_JS.write_text(sanitized, encoding="utf-8")
        print("[WRITE] data/products.js sanitizado (limpieza de envíos/cuotas)")
    else:
        print("[WRITE] No hubo nada para sanitizar")

if __name__ == "__main__":
    main()
