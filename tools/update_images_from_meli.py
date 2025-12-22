"""
Actualiza las imágenes de productos en data/products.js usando la API de Mercado Libre.
- Busca por nombre en https://api.mercadolibre.com/sites/MLA/search?q=<query>
- Toma el primer resultado y consulta sus imágenes en /items/{id}
- Reemplaza los campos 'image' y 'secondaryImage' del producto correspondiente en products.js

Uso:
  - Sin argumentos: procesa todos los productos del archivo
  - Con nombres: python update_images_from_meli.py "iPhone 13" "AirPods Pro (2ª Gen)"
"""
import re
import sys
import json
import time
import requests
import unicodedata
from thefuzz import fuzz, process
from bs4 import BeautifulSoup
def normalize_query(q: str) -> str:
    # quitar contenido entre paréntesis y diacríticos
    q = re.sub(r"\([^\)]*\)", "", q)
    q = unicodedata.normalize("NFKD", q).encode("ascii", "ignore").decode("ascii")
    # colapsar espacios y recortar
    q = re.sub(r"\s+", " ", q).strip()
    return q
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_JS = ROOT / "data" / "products.js"

SEARCH_URL = "https://api.mercadolibre.com/sites/MLA/search"
ITEM_URL = "https://api.mercadolibre.com/items/{}"
FUZZ_THRESHOLD = 60


def fetch_first_image_url(query: str) -> str | None:
    """Devuelve la URL de la primera imagen del mejor resultado para "query".
    Usa fuzzy matching por título para elegir el listing correcto.
    """
    try:
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0 Safari/537.36"
            ),
            "Accept": "application/json, text/plain, */*"
        }
        nq = normalize_query(query)
        r = requests.get(SEARCH_URL, params={"q": nq}, timeout=20, headers=headers)
        print(f"[ML] Buscar: '{query}' → '{nq}' | status {r.status_code}")
        if not r.ok:
            # Fallback: scraping HTML público
            print("[ML] API 4xx/5xx. Probando fallback HTML...")
            fallback = fetch_image_via_html(nq)
            return fallback
        # si está ok, continuar
        data = r.json()
        results = data.get("results") or []
        print(f"[ML] Resultados: {len(results)}")
        if not results:
            return None
        # Elegir mejor resultado por título
        choices = [item.get("title") or "" for item in results]
        best = process.extractOne(nq, choices, scorer=fuzz.token_set_ratio)
        if best and best[1] >= FUZZ_THRESHOLD:
            idx = choices.index(best[0])
            chosen = results[idx]
            print(f"[ML] Mejor match: '{best[0]}' (score {best[1]})")
        else:
            chosen = results[0]
            if best:
                print(f"[ML] Match bajo ({best[1]}), usando primer resultado.")
        item_id = chosen.get("id")
        thumb = chosen.get("thumbnail") or chosen.get("thumbnail_id")
        # Normalizar http → https
        if isinstance(thumb, str) and thumb.startswith("http://"):
            thumb = "https://" + thumb[len("http://"):]
        print(f"[ML] Item elegido: {item_id} | thumb: {thumb}")
        if not item_id:
            return thumb
        r2 = requests.get(ITEM_URL.format(item_id), timeout=20, headers=headers)
        print(f"[ML] Item {item_id} → status {r2.status_code}")
        if r2.ok:
            item = r2.json()
            pics = item.get("pictures") or []
            print(f"[ML] Fotos: {len(pics)}")
            if pics:
                url = pics[0].get("secure_url") or pics[0].get("url") or thumb
                if isinstance(url, str) and url.startswith("http://"):
                    url = "https://" + url[len("http://"):]
                return url
        return thumb
    except Exception as e:
        print(f"[ML] Error buscando '{query}': {e}")
        # Fallback ante excepción: intentar HTML
        try:
            fallback = fetch_image_via_html(normalize_query(query))
            return fallback
        except Exception as e2:
            print(f"[ML] Fallback HTML también falló: {e2}")
            return None


def fetch_image_via_html(nq: str) -> str | None:
    """Scrapea el listado público y devuelve el primer `src`/`data-src`/`srcset` de una imagen de resultado."""
    slug = re.sub(r"\s+", "-", nq)
    url = f"https://listado.mercadolibre.com.ar/{slug}"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-AR,es;q=0.9,en;q=0.8",
    }
    print(f"[ML-HTML] GET {url}")
    r = requests.get(url, timeout=20, headers=headers)
    if not r.ok:
        print(f"[ML-HTML] Status {r.status_code}")
        return None
    soup = BeautifulSoup(r.text, "html.parser")
    candidates = [
        "li.ui-search-layout__item img",
        "div.ui-search-result img",
        "img.ui-search-result__image",
        "section > ol > li img",
    ]
    img_tag = None
    for sel in candidates:
        img_tag = soup.select_one(sel)
        if img_tag:
            break
    if not img_tag:
        print("[ML-HTML] No se encontró imagen con selectores conocidos.")
        return None
    src = img_tag.get("data-src") or img_tag.get("src")
    if not src:
        srcset = img_tag.get("data-srcset") or img_tag.get("srcset")
        if srcset:
            src = srcset.split(",")[0].strip().split(" ")[0]
    if not src:
        print("[ML-HTML] Imagen sin src/srcset.")
        return None
    if src.startswith("http://"):
        src = "https://" + src[len("http://"):]
    print(f"[ML-HTML] Thumbnail: {src}")
    return src


def read_products_js() -> str:
    return PRODUCTS_JS.read_text(encoding="utf-8")


def list_product_names(js_text: str) -> list[str]:
    """Extrae los nombres (name: '...') del archivo JS."""
    return [m.group(1) for m in re.finditer(r"name:\s*'([^']+)'", js_text)]


def update_images_in_js(js_text: str, name_to_url: dict[str, str]) -> tuple[str, dict]:
    """Reemplaza 'image' y 'secondaryImage' del bloque que contiene name: '...'.
    Busca desde la posición del name hasta el cierre del objeto (primer '},' posterior).
    """
    updated = js_text
    summary: dict[str, str] = {}
    for name, url in name_to_url.items():
        if not url:
            continue
        # Posición del nombre
        m = re.search(rf"name:\s*'{re.escape(name)}'", updated)
        if not m:
            continue
        start = m.start()
        end_idx = updated.find("},", start)
        if end_idx == -1:
            end_idx = len(updated)
        block = updated[start:end_idx]
        # Reemplazos dentro del bloque (admite comillas simples o dobles)
        new_block = re.sub(r"image:\s*(['\"])([^'\"]+)(['\"])", lambda _: f"image: '{url}'", block, count=1)
        new_block = re.sub(r"secondaryImage:\s*(['\"])([^'\"]+)(['\"])", lambda _: f"secondaryImage: '{url}'", new_block, count=1)
        # Aplicar en el texto completo
        updated = updated[:start] + new_block + updated[end_idx:]
        summary[name] = url
    return updated, summary


def main():
    js = read_products_js()
    all_js_names = list_product_names(js)
    if len(sys.argv) > 1:
        requested = sys.argv[1:]
        names = []
        print("Usando fuzzy matching para mapear nombres ingresados → catálogo...")
        for raw in requested:
            best = process.extractOne(normalize_query(raw), [normalize_query(n) for n in all_js_names], scorer=fuzz.token_set_ratio)
            if best and best[1] >= FUZZ_THRESHOLD:
                # recuperar el nombre original idéntico al match
                # buscamos por normalizado
                norm_targets = [normalize_query(n) for n in all_js_names]
                idx = norm_targets.index(best[0])
                matched = all_js_names[idx]
                print(f"[Map] '{raw}' → '{matched}' (score {best[1]})")
                names.append(matched)
            else:
                print(f"[Map] '{raw}' sin match ≥ {FUZZ_THRESHOLD}. Se usa literal si existe.")
                # usar literal si está en catálogo, si no, igualmente intentamos escribir
                if raw in all_js_names:
                    names.append(raw)
                else:
                    # permitir búsqueda, pero probablemente no se actualice el JS
                    names.append(raw)
    else:
        names = all_js_names

    name_to_url: dict[str, str] = {}
    log: dict[str, dict] = {}
    print(f"Procesando {len(names)} productos...")
    for name in names:
        url = fetch_first_image_url(name)
        name_to_url[name] = url or ""
        print(f"[ML] {name} -> {url or 'SIN RESULTADOS'}")
        log[name] = {"image_url": url or "", "timestamp": int(time.time())}

    # Backup antes de escribir
    backup_path = PRODUCTS_JS.with_suffix(".js.bak")
    try:
        backup_path.write_text(js, encoding="utf-8")
        print(f"Backup creado: {backup_path}")
    except Exception as e:
        print(f"No se pudo crear backup: {e}")

    new_js, summary = update_images_in_js(js, name_to_url)
    if summary:
        PRODUCTS_JS.write_text(new_js, encoding="utf-8")
        print("\nActualizados:")
        print(json.dumps(summary, ensure_ascii=False, indent=2))
    else:
        print("No se realizaron cambios.")

    # Escribir log
    logs_dir = ROOT / "tools"
    (logs_dir / "meli_log.json").write_text(json.dumps(log, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
