import { useState } from 'react'
import formatCurrency from '@/utils/formatCurrency'
import formatUSD from '@/utils/formatUSD'
import { getDisplayUsdPrice } from '@/utils/pricing'

export default function PurchasePanel({ product, onAdd, onBuy }) {
  const [qty, setQty] = useState(1)

  const inc = () => setQty((q) => Math.min(q + 1, 99))
  const dec = () => setQty((q) => Math.max(q - 1, 1))

  return (
    <aside className="details-panel p-4 rounded-lg bg-white shadow">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <span className="text-xl font-semibold text-slate-900">
          {product?.category === 'iPhone'
            ? formatCurrency(product?.price || 0)
            : formatUSD(getDisplayUsdPrice(product))}
        </span>
      </div>
      <p className="text-sm text-slate-600 mt-1">SKU: {product?.sku || 'N/A'} · {product?.availability || 'Consultar disponibilidad'}</p>

      {/* Variantes simples (placeholder) */}
      {Array.isArray(product?.variants) && product.variants.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-2">Variantes</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v, i) => (
              <button key={i} className={`px-3 py-1 rounded-md border ${v.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50'}`} disabled={v.disabled}>{v.label}</button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center border rounded-md">
          <button onClick={dec} className="px-3 py-2">-</button>
          <input aria-label="Cantidad" value={qty} onChange={(e) => setQty(Number(e.target.value) || 1)} className="w-12 text-center" />
          <button onClick={inc} className="px-3 py-2">+</button>
        </div>
        <button onClick={() => onAdd?.(product, qty)} className="btn-cta btn-cta-primary">Agregar al carrito</button>
        <button onClick={() => onBuy?.(product, qty)} className="btn-cta">Comprar ahora</button>
      </div>

      {/* Sección de envío y cuotas removida por requerimiento */}

      <div className="mt-4 flex gap-3">
        <button className="px-3 py-2 rounded-md border">Compartir</button>
        <button className="px-3 py-2 rounded-md border">Copiar link</button>
      </div>
    </aside>
  )
}
