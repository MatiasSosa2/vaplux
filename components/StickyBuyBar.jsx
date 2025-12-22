import formatCurrency from '@/utils/formatCurrency'

export default function StickyBuyBar({ product, onAdd }) {
  if (!product) return null
  return (
    <div className="fixed bottom-0 inset-x-0 lg:hidden bg-white/95 backdrop-blur border-t p-3 flex items-center justify-between z-50">
      <div>
        <p className="text-sm font-medium">{product.name}</p>
        <p className="text-base font-semibold">{formatCurrency(product.price || 0)}</p>
      </div>
      <button onClick={() => onAdd?.(product, 1)} className="btn-cta btn-cta-primary">Agregar</button>
    </div>
  )
}
