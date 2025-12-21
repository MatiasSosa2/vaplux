"""
Actualiza características técnicas e imágenes de iPhones desde apple.com.
- Para cada producto categoría "iPhone" en data/products.js:
  - Construye la URL del sitio de Apple (es-ES) a la página de especificaciones
  - Extrae características técnicas (bullets, definiciones, tablas)
  - Obtiene imagen principal (meta og:image)
  - Actualiza specs, image y secondaryImage en products.js

Uso:
  - Sin argumentos: procesa todos los iPhones del catálogo
  - Con nombres: python update_info_from_apple.py "iPhone 14" "iPhone 14 Pro"
"""
import re
import sys
import json
import time
from pathlib import Path
from typing import List, Dict, Optional

import requests
from bs4 import BeautifulSoup
from thefuzz import fuzz, process

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_JS = ROOT / "data" / "products.js"
FUZZ_THRESHOLD = 60
BASE_URL = "https://www.apple.com"
LOCALE_PREFIX = "/es"  # usar sitio en español

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
}

UNWANTED_PATTERNS = [
    r"env[ií]o|env[ií]os|entrega|llega|pedido|hoy|d[ií]a",
    r"compra protegida|devoluci[oó]n|cambios|garant[ií]a|factura",
    r"cuotas|inter[eé]s|beneficios|puntos|tarjeta|promoci[oó]n|oferta",
    r"tienda|sucursal|stock|servicio|vendedor",
    r"nuevo|original|oficial|importado|calidad|marca",
    r"✓|©|❤|\u2665|\u2713",
]
TECH_PATTERNS = [
    r"pantalla|oled|lcd|retina|xdr|promotion|hz",
    r"c[aá]mara|mp|megap[ií]xeles|sensor|teleobjetivo|lidar",
    r"usb|usb\W*c|lightning|magsafe|carga|bater[ií]a|mah",
    r"wifi|wi\W*fi|bluetooth|5g|e\W*sim",
    r"ram|gb|almacenamiento|cpu|gpu|chip|a\d+",
    r"resoluci[oó]n|4k|hdr|dolby|vision",
]


def read_products_js() -> str:
    return PRODUCTS_JS.read_text(encoding="utf-8")


def list_product_names(js_text: str) -> List[str]:
    return [m.group(1) for m in re.finditer(r"name:\s*'([^']+)'", js_text)]


def is_unwanted_line(s: str) -> bool:
    s_low = s.lower()
    for pat in UNWANTED_PATTERNS:
        if re.search(pat, s_low):
            return True
    if len(s_low) < 6:
        return True
    if re.fullmatch(r"[\W_]+", s_low) or s_low.endswith("..."):
        return True
    if not re.search(r"\d", s_low) and not any(re.search(p, s_low) for p in TECH_PATTERNS):
        return True
    return False


def clean_specs_lines(lines: List[str]) -> List[str]:
    cleaned = []
    for s in lines:
        s = re.sub(r"\s+", " ", s).strip()
        if not s:
            continue
        if is_unwanted_line(s):
            continue
        if s not in cleaned:
            cleaned.append(s)
    def score(x: str) -> int:
        sc = 0
        xl = x.lower()
        if re.search(r"\d", xl): sc += 2
        for p in TECH_PATTERNS:
            if re.search(p, xl): sc += 3
        if len(xl) > 80 and sc < 3: sc -= 1
        return sc
    cleaned.sort(key=score, reverse=True)
    return cleaned[:6]


def build_spec_path(slug: str) -> Optional[str]:
    s = slug.lower()
    def path(p: str) -> str:
        return f"{LOCALE_PREFIX}{p}/specs/" if LOCALE_PREFIX else f"{p}/specs/"
    if s.startswith("iphone-11"):
        return path("/iphone-11" if "pro" not in s else "/iphone-11-pro")
    if s.startswith("iphone-12"):
        return path("/iphone-12" if "pro" not in s else "/iphone-12-pro")
    if s.startswith("iphone-13"):
        return path("/iphone-13" if "pro" not in s else "/iphone-13-pro")
    if s.startswith("iphone-14"):
        return path("/iphone-14" if "pro" not in s else "/iphone-14-pro")
    if s.startswith("iphone-15"):
        return path("/iphone-15" if "pro" not in s else "/iphone-15-pro")
    if s.startswith("iphone-16"):
        return path("/iphone-16" if "pro" not in s else "/iphone-16-pro")
    # iPhone 17 / Air: aún no disponibles públicamente
    return None


def fetch_specs_and_image(url: str) -> Dict:
    if not url:
        return {}
    full = f"{BASE_URL}{url}"
    r = requests.get(full, timeout=20, headers=HEADERS)
    if not r.ok:
        return {}
    soup = BeautifulSoup(r.text, "html.parser")
    # Imagen principal via og:image
    img = None
    og = soup.select_one('meta[property="og:image"]')
    if og and og.get("content"):
        img = og.get("content")
        if img.startswith("http://"):
            img = "https://" + img[len("http://"):]
    # Características: combinar bullets y definiciones
    specs: List[str] = []
    # Bullets genéricas
    for li in soup.select("ul li"):
        t = li.get_text(" ", strip=True)
        if t:
            specs.append(t)
    # Definiciones tipo ficha técnica (dt/dd)
    for dl in soup.select("dl"):
        for dt in dl.select("dt"):
            dd = dt.find_next("dd")
            if dt and dd:
                k = dt.get_text(" ", strip=True)
                v = dd.get_text(" ", strip=True)
                if k and v:
                    specs.append(f"{k}: {v}")
    # Tablas
    for tr in soup.select("table tr"):
        th = tr.find("th")
        td = tr.find("td")
        if th and td:
            k = th.get_text(" ", strip=True)
            v = td.get_text(" ", strip=True)
            if k and v:
                specs.append(f"{k}: {v}")
        else:
            t = tr.get_text(" ", strip=True)
            if t:
                specs.append(t)
    specs = clean_specs_lines(specs)
    return {"image": img, "specs": specs}


def update_block(js_text: str, name: str, info: Dict) -> str:
    updated = js_text
    m = re.search(rf"name:\s*'{re.escape(name)}'", updated)
    if not m:
        return updated
    start = m.start()
    end_idx = updated.find("},", start)
    if end_idx == -1:
        end_idx = len(updated)
    block = updated[start:end_idx]
    if info.get("specs"):
        arr = ", ".join([f"'{s}'" for s in info["specs"]])
        block = re.sub(r"specs:\s*\[[^\]]*\]", f"specs: [{arr}]", block, count=1)
    if info.get("image"):
        img = info["image"]
        block = re.sub(r"image:\s*(['\"]).*?(['\"])", lambda _: f"image: '{img}'", block, count=1)
        block = re.sub(r"secondaryImage:\s*(['\"]).*?(['\"])", lambda _: f"secondaryImage: '{img}'", block, count=1)
    updated = updated[:start] + block + updated[end_idx:]
    return updated


def main():
    js = read_products_js()
    names_all = list_product_names(js)
    # Limitar a iPhones
    iphone_names = [n for n in names_all if n.lower().startswith("iphone")]
    if len(sys.argv) > 1:
        requested = sys.argv[1:]
        targets: List[str] = []
        print("Mapeando nombres ingresados → catálogo (fuzzy)...")
        norm_targets = [re.sub(r"\s+", " ", n.lower()).strip() for n in iphone_names]
        for raw in requested:
            best = process.extractOne(re.sub(r"\s+", " ", raw.lower()).strip(), norm_targets, scorer=fuzz.token_set_ratio)
            if best and best[1] >= FUZZ_THRESHOLD:
                idx = norm_targets.index(best[0])
                matched = iphone_names[idx]
                print(f"[Map] '{raw}' → '{matched}' (score {best[1]})")
                targets.append(matched)
            else:
                print(f"[Map] '{raw}' sin match ≥ {FUZZ_THRESHOLD}. Se intenta literal.")
                if raw in iphone_names:
                    targets.append(raw)
        if not targets:
            targets = iphone_names
    else:
        targets = iphone_names

    backup = PRODUCTS_JS.with_suffix(".js.bak")
    try:
        backup.write_text(js, encoding="utf-8")
        print(f"Backup: {backup}")
    except Exception as e:
        print(f"[WARN] No se pudo crear backup: {e}")

    updated = js
    summary: Dict[str, Dict] = {}
    for name in targets:
        # Ubicar slug del bloque para construir path
        m = re.search(rf"name:\s*'{re.escape(name)}'[\s\S]*?slug:\s*'([^']+)'", js)
        slug = m.group(1) if m else None
        spec_path = build_spec_path(slug or "")
        if not spec_path:
            print(f"[SKIP] {name}: sin path de specs en Apple")
            continue
        info = fetch_specs_and_image(spec_path)
        if not info:
            print(f"[SKIP] {name}: sin datos en Apple")
            continue
        before = updated
        updated = update_block(updated, name, info)
        if updated != before:
            summary[name] = {k: info.get(k) for k in ("image", "specs")}
            print(f"[OK] {name}: características {len(info.get('specs', []))} | imagen={'sí' if info.get('image') else 'no'}")
        time.sleep(0.6)

    if summary:
        PRODUCTS_JS.write_text(updated, encoding="utf-8")
        print("\nActualizados desde Apple:")
        print(json.dumps(summary, ensure_ascii=False, indent=2))
    else:
        print("Sin cambios aplicados desde Apple.")

if __name__ == "__main__":
    main()
