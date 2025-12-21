import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = BASE_DIR / 'data' / 'products.js'
BACKUP_FILE = BASE_DIR / 'data' / 'products.js.silicone.bak'


def update_silicone_cases():
    if not DATA_FILE.exists():
        raise FileNotFoundError(f'No se encontró {DATA_FILE}')

    original = DATA_FILE.read_text(encoding='utf-8')
    BACKUP_FILE.write_text(original, encoding='utf-8')

    # Ubicamos el bloque del producto por id o slug
    pattern_block = re.compile(r"(\{\s*\n\s*id:\s*'fundas-silicona',[\s\S]*?\})", re.MULTILINE)
    match = pattern_block.search(original)
    if not match:
        raise RuntimeError('No se encontró el bloque de fundas de silicona en products.js')

    block = match.group(1)

    updated_block = block
    # Cambios solicitados: categoría iPhone, nombre y slug específicos
    updated_block = re.sub(r"slug:\s*'fundas-silicona'", "slug: 'fundas-silicona-iphone'", updated_block)
    updated_block = re.sub(r"name:\s*'Fundas de Silicona'", "name: 'Fundas de Silicona para iPhone'", updated_block)
    updated_block = re.sub(r"category:\s*'Varios'", "category: 'iPhone'", updated_block)

    # Reconstruimos el archivo
    updated = original[:match.start(1)] + updated_block + original[match.end(1):]

    if updated == original:
        raise RuntimeError('No se aplicaron cambios. Revisa los patrones de reemplazo.')

    DATA_FILE.write_text(updated, encoding='utf-8')
    print('Actualización completada: Fundas de Silicona ahora en categoría iPhone con slug específico.')


if __name__ == '__main__':
    update_silicone_cases()
