# Vaplux Next.js

Stack: Next.js 14 (Pages Router) + React 18 + Tailwind CSS.

## Scripts

- `npm run dev` — desarrollo local
- `npm run build && npm run export` — build + export estático a `out/`
- `npm run export:ghpages` — mueve `out/` a `docs/` y crea `.nojekyll`

## Configuración GitHub Pages

Ajusta `NEXT_BASE_PATH` para el repo:

- User/Org Pages: `NEXT_BASE_PATH=` (vacío)
- Project Pages: `NEXT_BASE_PATH=/tu-repo`

Ejemplo:

```powershell
$env:NEXT_BASE_PATH = "/tu-repo"; npm run build; npm run export; npm run export:ghpages
```

Publica `docs/` en GitHub Pages.

## Rutas

- `/` — Home
- `/catalog/` — Catálogo
- `/product/[slug]` — Detalle pre-cargado
- `/cart` — Carrito con Context + localStorage

## Diseño y UX

- Apple-inspired tokens (navy, cyan, graylight) y micro-interacciones (`clickPop`, overlay de hero).
- `image-safe-zone` para consistencia de ratios con `object-contain`.
- Botones CTA con glow sutil.

## Utilidades

- `utils/formatCurrency.js` — ARS
- `utils/whatsapp.js` — Mensaje autogenerado + `wa.me`

## Datos y Helpers

- `data/products.js` — productos y helpers `getProductBySlug`, `getRelatedProducts`

## Próximos pasos

- Ajustar basePath según repo
- Añadir categorías (iPhone, Macs & iPads, Accesorios)
- Integrar assets reales y carrusel de exclusivos

## Variables de entorno

- Copia el archivo de ejemplo a tu entorno local:

```powershell
Copy-Item .env.example .env
```

- Ajusta los valores según tu despliegue. Las entradas `.env`, `.env.local`, `.env.production`, `.env.development` ya están ignoradas por Git en [vaplux-next/.gitignore](vaplux-next/.gitignore).

### Ejemplo (`.env.example`)

```
# Cliente (expuestas)
NEXT_PUBLIC_SITE_URL=https://vaplux.example.com
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_WHATSAPP_PHONE=+5491112345678
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Servidor (si aplica)
API_SECRET_KEY=changeme
```

Notas:
- No subas `.env` al repo; ya está ignorado.
- Prefija variables públicas con `NEXT_PUBLIC_` para usarlas en el cliente.
