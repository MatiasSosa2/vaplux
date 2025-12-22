import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import formatCurrency from '@/utils/formatCurrency'
import { openWhatsApp } from '@/utils/whatsapp'

export default function CartSidebar(){
  const { items, setQty, remove, totalItems, totalPrice, sidebarOpen, closeCart } = useCart()

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeCart])

  if (!sidebarOpen) return null

  return (
    <div className="fixed inset-0 z-[4000]">
      <button
        aria-label="Cerrar carrito"
        className="absolute inset-0 bg-black/30"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 h-full w-[360px] md:w-[420px] bg-white border-l border-[#E3E8EF] shadow-2xl flex flex-col">
        <header className="px-4 py-3 border-b border-[#E3E8EF] flex items-center justify-between">
          <h2 className="font-semibold text-[#0f172a]">Carrito</h2>
          <button className="btn-modern btn-modern-secondary" onClick={closeCart}>Cerrar</button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          {!items.length ? (
            <p className="text-[#334155]">Tu carrito está vacío.</p>
          ) : (
            <div className="space-y-4">
              {items.map(p => (
                <div key={p.id} className="flex items-center justify-between border rounded-lg p-3 bg-white">
                  <div>
                    <div className="font-medium text-[#0f172a]">{p.name}</div>
                    <div className="text-[#0f172a]">{formatCurrency(p.price)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input className="border rounded px-2 py-1 w-16" type="number" min="1" value={p.qty} onChange={e => setQty(p.id, Number(e.target.value))} />
                    <button className="text-red-600" onClick={() => remove(p.id)}>Quitar</button>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between mt-6">
                <div className="text-[#0f172a]">Items: {totalItems}</div>
                <div className="font-semibold text-[#0f172a]">{formatCurrency(totalPrice)}</div>
              </div>
            </div>
          )}
        </div>
        <footer className="p-4 border-t border-[#E3E8EF]">
          <button
            className="btn-modern btn-modern-primary w-full"
            onClick={() => openWhatsApp(items, totalPrice)}
          >Finalizar por WhatsApp</button>
        </footer>
      </aside>
    </div>
  )
}
