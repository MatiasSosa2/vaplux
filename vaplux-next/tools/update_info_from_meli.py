"""
Actualiza información de productos (precio, specs, imagen) en data/products.js tomando datos de Mercado Libre (AR).
- Busca por nombre en el listado público (HTML) para evitar 403 de la API.
- Elige el mejor resultado por fuzzy matching de título.
- En la página del producto obtiene título, precio, imágenes y especificaciones.
- Escribe en products.js los campos: price (ARS), specs (lista corta), image/secondaryImage.

Uso:
  - Sin argumentos: procesa todos los productos del catálogo.
  - Con nombres: python update_info_from_meli.py "AirPods Pro 2" "JBL GO 4" ...
"""
import re
import sys
import json
import time
import unicodedata
from pathlib import Path
from typing import Optional, List, Dict
from unittest import result

import requests
from bs4 import BeautifulSoup
from thefuzz import fuzz, process

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_JS = ROOT / "data" / "products.js"
SPECS_OVERRIDES = ROOT / "tools" / "specs_overrides.json"
FUZZ_THRESHOLD = 60

HEADERS_HTML = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "es-AR,es;q=0.9,en;q=0.8",
}

# Palabras/expresiones a excluir por ser genéricas/no relacionadas al producto
UNWANTED_PATTERNS = [
    r"env[ií]o|env[ií]os|entrega|llega|pedido|hoy|d[ií]a",
    r"compra protegida|devoluci[oó]n|cambios|garant[ií]a|factura",
    r"cuotas|inter[eé]s|beneficios|puntos|tarjeta|promoci[oó]n|oferta",
    r"mercado pago|mercado libre|tienda oficial|sucursal|stock",
    r"nuevo|original|oficial|importado|calidad|marca",
    r"servicio|atenci[oó]n|vendedor|envase|consumo",
    r"✓|©|❤|\u2665|\u2713",
]

# Patrones técnicos deseados para priorizar y filtrar
TECH_PATTERNS = [
    r"pantalla|oled|lcd|retina|xdr|promotion|hz",
    r"c[aá]mara|mp|megap[ií]xeles|sensor|teleobjetivo|lidar",
    r"usb|usb\W*c|lightning|magsafe|carga|bater[ií]a|mah",
    r"wifi|wi\W*fi|bluetooth|5g|e\W*sim",
    r"ram|gb|almacenamiento|cpu|gpu|chip|a\d+",
    r"resoluci[oó]n|4k|hdr|dolby|vision",
    r"ipx|resistencia|agua|polvo|audio espacial|anc",
    r"proyector|tv box|tv stick",
]

def is_unwanted_line(s: str) -> bool:
    s_low = s.lower()
    for pat in UNWANTED_PATTERNS:
        if re.search(pat, s_low):
            return True
    # descartar muy cortas o sin contenido
    if len(s_low) < 8:
        return True
    # descartar si solo tiene símbolos o elipsis
    if re.fullmatch(r"[\W_]+", s_low) or s_low.endswith("..."):
        return True
    # si no contiene dígitos ni patrones técnicos, probablemente sea marketing
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
    # limitar a 6 y priorizar líneas técnicas
    def score(x: str) -> int:
        sc = 0
        xl = x.lower()
        if re.search(r"\d", xl): sc += 2
        for p in TECH_PATTERNS:
            if re.search(p, xl):
                sc += 3
        # penalizar frases largas no técnicas
        if len(xl) > 80 and sc < 3: sc -= 1
        return sc
    cleaned.sort(key=score, reverse=True)
    return cleaned[:6]


def normalize_query(q: str) -> str:
    q = re.sub(r"\([^\)]*\)", "", q)
    q = unicodedata.normalize("NFKD", q).encode("ascii", "ignore").decode("ascii")
    q = re.sub(r"\s+", " ", q).strip()
    return q


def read_products_js() -> str:
    return PRODUCTS_JS.read_text(encoding="utf-8")


def list_product_names(js_text: str) -> List[str]:
    return [m.group(1) for m in re.finditer(r"name:\s*'([^']+)'", js_text)]


def parse_price_to_int(text: str) -> Optional[int]:
    if not text:
        return None
    digits = re.sub(r"[^0-9]", "", text)
    if not digits:
        return None
    try:
        return int(digits)
    except Exception:
        return None


def fetch_listing_results_html(query: str) -> List[Dict]:
    slug = re.sub(r"\s+", "-", normalize_query(query))
    url = f"https://listado.mercadolibre.com.ar/{slug}"
    print(f"[LISTING] {url}")
    r = requests.get(url, timeout=20, headers=HEADERS_HTML)
    if not r.ok:
        print(f"[LISTING] Status {r.status_code}")
        return []
    soup = BeautifulSoup(r.text, "html.parser")
    items = []
    cards = soup.select("li.ui-search-layout__item") or soup.select("div.ui-search-result")
    for card in cards[:10]:
        a = card.select_one("a.ui-search-link") or card.select_one("a")
        title_el = card.select_one("h2.ui-search-item__title") or card.select_one("h2")
        img = card.select_one("img")
        price_el = card.select_one("span.ui-search-price__second-line") or card.select_one("span.andes-money-amount__fraction")
        if not a or not title_el:
            a = card.find("a")
            title_el = card.find("h2")
        title = (title_el.get_text(strip=True) if title_el else "").strip()
        href = a.get("href") if a else None
        thumb = img.get("data-src") or img.get("src") if img else None
        price_txt = price_el.get_text(strip=True) if price_el else ""
        items.append({"title": title, "url": href, "thumb": thumb, "price_txt": price_txt})
    print(f"[LISTING] Items encontrados: {len(items)}")
    return items


def pick_best_result(items: List[Dict], query: str) -> Optional[Dict]:
    if not items:
        return None
    choices = [i.get("title") or "" for i in items]
    best = process.extractOne(normalize_query(query), [normalize_query(c) for c in choices], scorer=fuzz.token_set_ratio)
    if best:
        idx = [normalize_query(c) for c in choices].index(best[0])
        print(f"[PICK] Mejor match: '{choices[idx]}' (score {best[1]})")
        return items[idx]
    return items[0]


def fetch_product_page_details(url: str) -> Dict:
    if not url:
        return {}
    print(f"[PDP] {url}")
    r = requests.get(url, timeout=20, headers=HEADERS_HTML)
    if not r.ok:
        print(f"[PDP] Status {r.status_code}")
        return {}
    soup = BeautifulSoup(r.text, "html.parser")
    title = None
    h1 = soup.select_one("h1.ui-pdp-title")
    if h1:
        title = h1.get_text(strip=True)
    if not title:
        ogt = soup.select_one('meta[property="og:title"]')
        if ogt and ogt.get("content"):
            title = ogt.get("content").strip()
    price = None
    price_fraction = soup.select_one("span.andes-money-amount__fraction")
    price_cents = soup.select_one("span.andes-money-amount__cents")
    price_txt = ""
    if price_fraction:
        price_txt = price_fraction.get_text(strip=True)
        if price_cents:
            price_txt += price_cents.get_text(strip=True)
        price = parse_price_to_int(price_txt)
    if price is None:
        meta_price = soup.select_one('meta[itemprop="price"]')
        if meta_price and meta_price.get("content"):
            price = parse_price_to_int(meta_price.get("content"))
    if price is None:
        for script in soup.select('script[type="application/ld+json"]'):
            try:
                data = json.loads(script.string or "{}")
                offers = data.get("offers")
                if isinstance(offers, dict):
                    p = offers.get("price") or offers.get("priceSpecification", {}).get("price")
                    price = parse_price_to_int(str(p))
                    if price:
                        break
            except Exception:
                pass
    images: List[str] = []
    for img in soup.select("figure.ui-pdp-gallery__figure img"):
        src = img.get("data-zoom") or img.get("data-src") or img.get("src")
        if src:
            if src.startswith("http://"):
                src = "https://" + src[len("http://"):]
            images.append(src)
    if not images:
        og_img = soup.select_one('meta[property="og:image"]')
        if og_img and og_img.get("content"):
            images.append(og_img.get("content"))
    specs: List[str] = []
    # Bullets de características
    for li in soup.select("ul.ui-pdp-specs__list li, ul.ui-pdp-description__content li"):
        txt = li.get_text(strip=True)
        if txt:
            specs.append(txt)
    # Tabla ficha técnica (par th/td)
    if not specs:
        for tr in soup.select("table.ui-pdp-specs__table tr"):
            th = tr.find("th")
            td = tr.find("td")
            if th and td:
                k = th.get_text(" ", strip=True)
                v = td.get_text(" ", strip=True)
                if k and v:
                    specs.append(f"{k}: {v}")
            else:
                txt = tr.get_text(" ", strip=True)
                if txt:
                    specs.append(txt)
    # Fallback: JSON-LD additionalProperty
    if not specs:
        for script in soup.select('script[type="application/ld+json"]'):
            try:
                data = json.loads(script.string or "{}")
                props = data.get("additionalProperty") or data.get("additionalProperties")
                if isinstance(props, list):
                    for p in props:
                        k = p.get("name") or p.get("propertyID")
                        v = p.get("value") or p.get("valueReference") or p.get("minValue")
                        if k and v:
                            specs.append(f"{k}: {v}")
                    if specs:
                        break
            except Exception:
                pass
    specs = clean_specs_lines(specs)
    return {"title": title, "price": price, "images": images, "specs": specs}


def update_info_in_js(js_text: str, name: str, info: Dict) -> str:
    updated = js_text
    m = re.search(rf"name:\s*'{re.escape(name)}'", updated)
    if not m:
        return updated
    start = m.start()
    end_idx = updated.find("},", start)
    if end_idx == -1:
        end_idx = len(updated)
    block = updated[start:end_idx]
    if info.get("price"):
        block = re.sub(r"price:\s*[0-9]+", f"price: {info['price']}", block, count=1)
    # Actualizar specs si vienen nuevas
    if info.get("specs"):
        arr = ", ".join([f"'{s}'" for s in info["specs"]])
        block = re.sub(r"specs:\s*\[[^\]]*\]", f"specs: [{arr}]", block, count=1)
    else:
        # Aun sin nuevas specs, sanitizar las existentes (remover 'envío', 'cuotas', etc.)
        specs_match = re.search(r"specs:\s*\[([^\]]*)\]", block)
        if specs_match:
            raw = specs_match.group(1)
            # extraer items '...'
            items = re.findall(r"'([^']+)'", raw)
            if items:
                cleaned = [s for s in items if not is_unwanted_line(s)]
                arr = ", ".join([f"'{s}'" for s in cleaned])
                block = re.sub(r"specs:\s*\[[^\]]*\]", f"specs: [{arr}]", block, count=1)
    if info.get("images"):
        img = info["images"][0]
        block = re.sub(r"image:\s*(['\"]).*?(['\"])", f"image: '{img}'", block, count=1)
        block = re.sub(r"secondaryImage:\s*(['\"]).*?(['\"])", f"secondaryImage: '{img}'", block, count=1)
    updated = updated[:start] + block + updated[end_idx:]
    return updated


def main():
    # Modo rápido: solo sanitizar specs existentes sin hacer scraping
    if any(arg.lower() in ("--sanitize-only", "-s") for arg in sys.argv[1:]):
        js = read_products_js()
        def sanitize_existing_specs(js_text: str) -> str:
            def _repl(match):
                raw = match.group(1)
                items = re.findall(r"'([^']+)'", raw)
                cleaned = [s for s in items if not is_unwanted_line(s)]
                arr = ", ".join([f"'{s}'" for s in cleaned])
                return f"specs: [{arr}]"
            return re.sub(r"specs:\s*\[([^\]]*)\]", lambda m: _repl(m), js_text)
        sanitized = sanitize_existing_specs(js)
        if sanitized != js:
            PRODUCTS_JS.write_text(sanitized, encoding="utf-8")
            print("[WRITE] data/products.js sanitizado (modo rápido: sin scraping).")
        else:
            print("[WRITE] No hubo nada para sanitizar.")
        return
    js = read_products_js()
    all_names = list_product_names(js)
    # Overrides para especificaciones (segundo bloque)
    overrides_map: Dict[str, List[str]] = {}
    if SPECS_OVERRIDES.exists():
        try:
            overrides_map = json.loads(SPECS_OVERRIDES.read_text(encoding="utf-8"))
        except Exception:
            overrides_map = {}
    # Cargar overrides de especificaciones si existen
    overrides_map: Dict[str, List[str]] = {}
    if SPECS_OVERRIDES.exists():
        try:
            overrides_map = json.loads(SPECS_OVERRIDES.read_text(encoding="utf-8"))
        except Exception:
            overrides_map = {}
    overrides_map: Dict[str, List[str]] = {}
    if SPECS_OVERRIDES.exists():
        try:
            overrides_map = json.loads(SPECS_OVERRIDES.read_text(encoding="utf-8"))
        except Exception:
            overrides_map = {}
    overrides = {}
    if SPECS_OVERRIDES.exists():
        try:
            overrides = json.loads(SPECS_OVERRIDES.read_text(encoding="utf-8"))
        except Exception:
            overrides = {}
    if len(sys.argv) > 1:
        requested = sys.argv[1:]
        names: List[str] = []
        print("Mapeando nombres ingresados -> catálogo por fuzzy...")
        norm_targets = [normalize_query(n) for n in all_names]
        for raw in requested:
            best = process.extractOne(normalize_query(raw), norm_targets, scorer=fuzz.token_set_ratio)
            if best and best[1] >= FUZZ_THRESHOLD:
                idx = norm_targets.index(best[0])
                matched = all_names[idx]
                print(f"[Map] '{raw}' -> '{matched}' (score {best[1]})")
                names.append(matched)
            else:
                print(f"[Map] '{raw}' sin match ≥ {FUZZ_THRESHOLD}. Se intenta literal.")
                names.append(raw)
    else:
        names = all_names

    backup_path = PRODUCTS_JS.with_suffix(".js.bak")
    try:
        backup_path.write_text(js, encoding="utf-8")
        print(f"Backup: {backup_path}")
    except Exception as e:
        print(f"[WARN] No se pudo crear backup: {e}")

    updated = js
    log: Dict[str, Dict] = {}
    for name in names:
        print(f"\n== {name} ==")
        listing = fetch_listing_results_html(name)
        best = pick_best_result(listing, name)
        if not best:
            print("[SKIP] Sin resultados.")
            log[name] = {"status": "no_results"}
            continue
        pdp = fetch_product_page_details(best.get("url"))
        if not pdp:
            print("[SKIP] Sin detalles de PDP.")
            log[name] = {"status": "no_pdp"}
            continue
        updated = update_info_in_js(updated, name, pdp)
        log[name] = {
            "chosen_title": best.get("title"),
            "pdp_title": pdp.get("title"),
            "price": pdp.get("price"),
            "images": pdp.get("images", [])[:2],
            "specs": pdp.get("specs", [])
        }
        print(json.dumps(log[name], ensure_ascii=False, indent=2))
        time.sleep(0.8)

    if updated != js:
        PRODUCTS_JS.write_text(updated, encoding="utf-8")
        print("\n[WRITE] data/products.js actualizado.")
    else:
        print("\n[WRITE] Sin cambios aplicados.")

    (ROOT / "tools" / "meli_info_log.json").write_text(json.dumps(log, ensure_ascii=False, indent=2), encoding="utf-8")


# Desactivado para evitar doble ejecución del script (bloque v1)
# if __name__ == "__main__":
#     main()
"""
Actualiza información de productos (nombre normalizado, precio, imagen y specs básicas) en data/products.js
usando el listado público de Mercado Libre (scraping con BeautifulSoup) y fuzzy matching para mapear nombres.

Uso:
  - Sin argumentos: procesa todos los productos del catálogo actual en products.js
  - Con nombres: python update_info_from_meli.py "AirPods Max" "JBL GO 3" "Battery Pack iPhone"
"""
import re
import sys
import json
import time
import unicodedata
from pathlib import Path
from typing import Optional, List, Dict

import requests
from bs4 import BeautifulSoup
from thefuzz import fuzz, process

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_JS = ROOT / "data" / "products.js"
FUZZ_THRESHOLD = 60

HEADERS_HTML = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "es-AR,es;q=0.9,en;q=0.8",
}


def normalize_text(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def slugify(name: str) -> str:
    s = normalize_text(name).lower()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s)
    return s


def read_products_js() -> str:
    return PRODUCTS_JS.read_text(encoding="utf-8")


def list_product_names(js_text: str) -> List[str]:
    return [m.group(1) for m in re.finditer(r"name:\s*'([^']+)'", js_text)]


def guess_category(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ["fundas", "protector", "magsafe", "cable"]):
        return "Varios"
    if any(k in n for k in ["iphone", "apple watch"]):
        return "Electrónica"
    if any(k in n for k in ["jbl", "airpods", "auricular", "parlante", "audio"]):
        return "Electrónica"
    if any(k in n for k in ["ps5", "playstation", "joystick", "game stick"]):
        return "Electrónica"
    return "Electrónica"


def extract_first_listing(query: str) -> Optional[Dict]:
    slug = re.sub(r"\s+", "-", normalize_text(query))
    url = f"https://listado.mercadolibre.com.ar/{slug}"
    r = requests.get(url, headers=HEADERS_HTML, timeout=15)
    if not r.ok:
        sys.stderr.write(f"[HTML] Status {r.status_code} para {url}\n")
        return None
    soup = BeautifulSoup(r.text, "html.parser")
    # Buscar primer card del resultado
    container = soup.select_one("li.ui-search-layout__item") or soup.select_one("div.ui-search-result")
    if not container:
        return None
    # Título y link
    a = container.select_one("a.ui-search-link") or container.select_one("a")
    title = a.get("title") or a.text.strip() if a else None
    href = a.get("href") if a else None
    # Imagen (lazy o srcset)
    img = container.select_one("img")
    src = None
    if img:
        src = img.get("data-src") or img.get("src")
        if not src:
            srcset = img.get("data-srcset") or img.get("srcset")
            if srcset:
                src = srcset.split(",")[0].strip().split(" ")[0]
    # Precio
    price_text = None
    # buscar fracción de precio
    frac = container.select_one("span.andes-money-amount__fraction")
    curr = container.select_one("span.andes-money-amount__currency-symbol")
    if frac:
        price_text = frac.text
    if price_text:
        price_text = price_text.replace(".", "").replace(",", "")
        try:
            price = int(price_text)
        except ValueError:
            price = None
    else:
        price = None
    # Normalizar imagen
    if src and src.startswith("http://"):
        src = "https://" + src[len("http://") :]
    return {"title": title, "href": href, "image": src, "price": price}

def tokens(s: str) -> List[str]:
    s = normalize_text(s.lower())
    toks = re.split(r"[^a-z0-9]+", s)
    return [t for t in toks if len(t) >= 3]

def is_title_related(query: str, title: Optional[str]) -> bool:
    if not title:
        return False
    q_tokens = set(tokens(query))
    t_tokens = set(tokens(title))
    # Debe compartir al menos 2 tokens significativos
    return len(q_tokens & t_tokens) >= 2


def extract_product_specs(product_url: str) -> List[str]:
    if not product_url:
        return []
    try:
        r = requests.get(product_url, headers=HEADERS_HTML, timeout=15)
        if not r.ok:
            return []
        soup = BeautifulSoup(r.text, "html.parser")
        # Intentar lista de características (bullets)
        bullets = []
        for sel in [
            "ul.ui-pdp-description__content li",
            "ul.ui-pdp-specs__list li",
            "div.ui-pdp-highlighted-specs__items li",
        ]:
            for li in soup.select(sel):
                t = li.get_text(strip=True)
                if t and t not in bullets:
                    bullets.append(t)
            if bullets:
                break
        # Tabla de ficha técnica (pares th/td)
        if not bullets:
            for tr in soup.select("table.ui-pdp-specs__table tr"):
                th = tr.find("th")
                td = tr.find("td")
                if th and td:
                    k = th.get_text(" ", strip=True)
                    v = td.get_text(" ", strip=True)
                    if k and v:
                        bullets.append(f"{k}: {v}")
                else:
                    txt = tr.get_text(" ", strip=True)
                    if txt:
                        bullets.append(txt)
        # Fallback: JSON-LD additionalProperty
        if not bullets:
            for script in soup.select('script[type="application/ld+json"]'):
                try:
                    data = json.loads(script.string or "{}")
                    props = data.get("additionalProperty") or data.get("additionalProperties")
                    if isinstance(props, list):
                        for p in props:
                            k = p.get("name") or p.get("propertyID")
                            v = p.get("value") or p.get("valueReference") or p.get("minValue")
                            if k and v:
                                bullets.append(f"{k}: {v}")
                        if bullets:
                            break
                except Exception:
                    pass
        # Limpiar líneas genéricas/no técnicas
        bullets = clean_specs_lines(bullets)
        return bullets[:6]
    except Exception:
        return []


def update_or_insert(js_text: str, info: Dict) -> str:
    name = info["title"] or info.get("query")
    if not name:
        return js_text
    # localizar bloque por nombre exacto; si no, fuzzy
    m = re.search(rf"name:\s*'{re.escape(name)}'", js_text)
    target_name = name
    if not m:
        names = list_product_names(js_text)
        best = process.extractOne(normalize_text(name), [normalize_text(n) for n in names], scorer=fuzz.token_set_ratio)
        if best and best[1] >= FUZZ_THRESHOLD:
            idx = [normalize_text(n) for n in names].index(best[0])
            target_name = names[idx]
            m = re.search(rf"name:\s*'{re.escape(target_name)}'", js_text)
    if m:
        # actualizar dentro del bloque hasta '},'
        start = m.start()
        end_idx = js_text.find("},", start)
        if end_idx == -1:
            end_idx = len(js_text)
        block = js_text[start:end_idx]
        # precio
        if info.get("price"):
            block = re.sub(r"price:\s*\d+", f"price: {info['price']}", block, count=1)
        # imagen
        if info.get("image"):
            block = re.sub(r"image:\s*(['\"])([^'\"]+)(['\"])", lambda _: f"image: '{info['image']}'", block, count=1)
            block = re.sub(r"secondaryImage:\s*(['\"])([^'\"]+)(['\"])", lambda _: f"secondaryImage: '{info['image']}'", block, count=1)
        # specs
        specs = info.get("specs") or []
        if specs:
            specs_js = ", ".join([f"'{s}'" for s in specs])
            block = re.sub(r"specs:\s*\[[^\]]*\]", f"specs: [{specs_js}]", block, count=1)
        return js_text[:start] + block + js_text[end_idx:]
    else:
        # insertar nuevo producto al final del array antes de ']' (mantener coma y formato)
        cat = guess_category(name)
        slug = slugify(name)
        specs = info.get("specs") or []
        specs_js = ", ".join([f"'{s}'" for s in specs])
        image = info.get("image") or ""
        price = info.get("price") or 0
        new_obj = (
            "  {\n"
            f"    id: '{slug}',\n"
            f"    slug: '{slug}',\n"
            f"    name: '{name}',\n"
            f"    category: '{cat}',\n"
            f"    price: {price},\n"
            f"    specs: [{specs_js}],\n"
            f"    image: '{image}',\n"
            f"    secondaryImage: '{image}'\n"
            "  },\n"
        )
        # encontrar cierre del array principal ']' antes de export functions
        arr_end = js_text.find("]\n\nexport")
        if arr_end == -1:
            arr_end = js_text.rfind("]")
        insert_pos = arr_end
        before = js_text[:insert_pos]
        after = js_text[insert_pos:]
        updated = before.rstrip()
        if not updated.endswith(","):
            last_obj_end = updated.rfind("}\n")
            if last_obj_end != -1:
                updated = updated[: last_obj_end + 2] + ",\n" + updated[last_obj_end + 2 :]
        updated = updated + new_obj + after
        return updated


def main():
    js = read_products_js()
    all_names = list_product_names(js)
    # Overrides para especificaciones (segundo bloque)
    overrides_map: Dict[str, List[str]] = {}
    if SPECS_OVERRIDES.exists():
        try:
            overrides_map = json.loads(SPECS_OVERRIDES.read_text(encoding="utf-8"))
        except Exception:
            overrides_map = {}
    if len(sys.argv) > 1:
        requested = sys.argv[1:]
        targets = []
        for raw in requested:
            best = process.extractOne(normalize_text(raw), [normalize_text(n) for n in all_names], scorer=fuzz.token_set_ratio)
            if best and best[1] >= FUZZ_THRESHOLD:
                idx = [normalize_text(n) for n in all_names].index(best[0])
                matched = all_names[idx]
                targets.append(matched)
                print(f"[Map] '{raw}' -> '{matched}' (score {best[1]})")
            else:
                targets.append(raw)
                print(f"[Map] '{raw}' sin match ≥ {FUZZ_THRESHOLD}. Se usará literal.")
    else:
        targets = all_names
    name_to_info: Dict[str, Dict] = {}
    print(f"Procesando {len(targets)} productos...")
    for t in targets:
        # Si existe override, usarlo directamente
        override_name = None
        if overrides_map:
            best = process.extractOne(normalize_text(t), [normalize_text(k) for k in overrides_map.keys()], scorer=fuzz.token_set_ratio)
            if best and best[1] >= FUZZ_THRESHOLD:
                idx = [normalize_text(k) for k in overrides_map.keys()].index(best[0])
                override_name = list(overrides_map.keys())[idx]
        if override_name:
            name_to_info[t] = {
                "title": t,
                "price": None,
                "image": None,
                "specs": overrides_map.get(override_name, []),
                "query": t,
                "confidence": True,
            }
            print(f"[OVR] {t} -> se aplican specs personalizadas ({override_name})")
        else:
            listing = extract_first_listing(t)
            if not listing:
                print(f"[ML] {t} -> SIN RESULTADOS")
                continue
            # Validar que el título esté relacionado con la consulta
            related = is_title_related(t, listing.get("title"))
            if not related:
                print(f"[ML] {t} -> título no relacionado, se omite actualización")
                continue
            specs = extract_product_specs(listing.get("href"))
            name_to_info[t] = {
                "title": listing.get("title") or t,
                "price": listing.get("price"),
                "image": listing.get("image"),
                "specs": specs,
                "query": t,
                "confidence": related and bool(specs)
            }
            print(f"[ML] {t} -> precio={listing.get('price')} | img={bool(listing.get('image'))}")
    # backup
    backup_path = PRODUCTS_JS.with_suffix(".js.bak")
    try:
        backup_path.write_text(js, encoding="utf-8")
        print(f"Backup creado: {backup_path}")
    except Exception as e:
        print(f"No se pudo crear backup: {e}")
    # aplicar cambios
    updated = js
    summary = {}
    for _, info in name_to_info.items():
        before = updated
        # Solo actualizar si logramos specs limpias y relación confirmada
        if info.get("confidence"):
            updated = update_or_insert(updated, info)
        if before != updated:
            summary[info["title"]] = {
                "price": info.get("price"),
                "image": info.get("image"),
                "specs": info.get("specs"),
            }
    if summary:
        PRODUCTS_JS.write_text(updated, encoding="utf-8")
        print("\nActualizados:")
        print(json.dumps(summary, ensure_ascii=False, indent=2))
    else:
        print("No se realizaron cambios (vía ML). Se intentará sanitizar specs existentes.")

    # log
    logs_dir = ROOT / "tools"
    (logs_dir / "meli_info_log.json").write_text(json.dumps(name_to_info, ensure_ascii=False, indent=2), encoding="utf-8")

    # Paso adicional: sanitizar las specs existentes aunque no haya cambios vía ML
    def sanitize_existing_specs(js_text: str) -> str:
        def _repl(match):
            raw = match.group(1)
            items = re.findall(r"'([^']+)'", raw)
            cleaned = [s for s in items if not is_unwanted_line(s)]
            arr = ", ".join([f"'{s}'" for s in cleaned])
            return f"specs: [{arr}]"
        return re.sub(r"specs:\s*\[([^\]]*)\]", lambda m: _repl(m), js_text)

    sanitized = sanitize_existing_specs(updated)
    if sanitized != updated:
        PRODUCTS_JS.write_text(sanitized, encoding="utf-8")
        print("\n[WRITE] data/products.js sanitizado (removidas líneas genéricas como 'envíos', 'cuotas').")
    else:
        print("\n[WRITE] No se requirió sanitización adicional.")


if __name__ == "__main__":
    main()
