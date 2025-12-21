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
