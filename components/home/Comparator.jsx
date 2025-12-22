import Link from 'next/link'

export default function Comparator({ models }){
  const data = models || [
    { name: 'iPhone 17', screen: '6.1"', chip: 'A20', storage: '128/256/512GB', camera: 'Dual', promo: '60Hz', usb: 'USB‑C', price: 'Desde $', slug: '/catalog/iphone' },
    { name: 'iPhone 17 Pro', screen: '6.1"', chip: 'A20 Pro', storage: '256/512GB/1TB', camera: 'Triple (Pro)', promo: '120Hz ProMotion', usb: 'USB‑C', price: 'Desde $', slug: '/catalog/iphone' },
    { name: 'iPhone 17 Pro Max', screen: '6.7"', chip: 'A20 Pro', storage: '256/512GB/1TB', camera: 'Triple (Pro)', promo: '120Hz ProMotion', usb: 'USB‑C', price: 'Desde $', slug: '/catalog/iphone' },
  ]

  const rows = [
    { label: 'Pantalla', key: 'screen' },
    { label: 'Chip', key: 'chip' },
    { label: 'Almacenamiento', key: 'storage' },
    { label: 'Cámara', key: 'camera' },
    { label: 'ProMotion/Hz', key: 'promo' },
    { label: 'Puerto', key: 'usb' },
    { label: 'Precio', key: 'price' },
  ]

  return (
    <section className="relative overflow-hidden bg-tech-white bg-grid noise-overlay">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold">Comparador Rápido</h2>
        <p className="text-slateInk/80 mt-1">Las diferencias clave entre iPhone 17, 17 Pro y 17 Pro Max.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border border-mistGray rounded-xl overflow-hidden">
            <thead className="bg-white/60">
              <tr>
                <th className="text-left px-4 py-3 text-slateInk/80">Característica</th>
                {data.map((m, i) => (
                  <th key={i} className="text-left px-4 py-3 text-royal">{m.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className="odd:bg-white/40">
                  <td className="px-4 py-3 font-medium text-slateInk/90">{r.label}</td>
                  {data.map((m, i) => (
                    <td key={i} className="px-4 py-3 text-slateInk/80">{m[r.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex gap-3">
          <Link className="btn-cta btn-cta-primary" href="/catalog/iphone">Ver recomendación</Link>
          <Link className="btn-cta btn-cta-secondary" href="/catalog/">Más en catálogo</Link>
        </div>
      </div>
    </section>
  )
}
