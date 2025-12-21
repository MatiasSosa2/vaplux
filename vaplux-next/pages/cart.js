import Navbar from '@/components/Navbar'
import { useCart } from '@/context/CartContext'
import formatCurrency from '@/utils/formatCurrency'
import { openWhatsApp } from '@/utils/whatsapp'

export default function Cart(){
  const { items, setQty, remove, totalItems, totalPrice } = useCart()
  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Carrito</h1>
        {!items.length ? (
          <p className="text-gray-600">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-4">
            {items.map(p => (
              <div key={p.id} className="flex items-center justify-between border rounded-lg p-3 bg-white">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-gray-600">{formatCurrency(p.price)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input className="border rounded px-2 py-1 w-16" type="number" min="1" value={p.qty} onChange={e => setQty(p.id, Number(e.target.value))} />
                  <button className="text-red-600" onClick={() => remove(p.id)}>Quitar</button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between mt-6">
              <div>Total items: {totalItems}</div>
              <div className="font-semibold">{formatCurrency(totalPrice)}</div>
            </div>
            <div className="mt-4">
              <button className="btn-cta btn-cta-primary" onClick={() => openWhatsApp(items, totalPrice)}>Finalizar por WhatsApp</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
