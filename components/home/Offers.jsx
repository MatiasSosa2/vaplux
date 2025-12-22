import Link from 'next/link'
import { getFeaturedProducts } from '@/data/products'

export default function Offers(){
  const offers = getFeaturedProducts().slice(0,6)
  return (
    <section className="relative overflow-hidden bg-tech-white bg-grid noise-overlay">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold">Ofertas</h2>
        <p className="text-slateInk/80 mt-1">Descuentos seleccionados por tiempo limitado.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {offers.map((p, i) => (
            <div key={i} className="product-card card-structure rounded-xl transition p-4 shadow-lg hover:shadow-xl">
              <div className="relative image-safe-zone rounded-lg overflow-hidden border border-mistGray/60" style={{background:'radial-gradient(120% 120% at 10% 10%, rgba(255,255,255,0.9) 0%, rgba(228,235,244,0.9) 100%)'}}>
                <span className="absolute top-2 left-2 glass-badge">Oferta</span>
                <img src={p.image} alt={p.name} className="product-image" />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-royal tracking-wide">{p.name}</h3>
                <p className="text-slateInk/90">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(p.price)}</p>
                <div className="flex gap-2 mt-3">
                  <Link className="btn-cta btn-cta-primary" href={`/product/${p.slug}`}>Ver detalle</Link>
                  <Link className="btn-cta btn-cta-secondary" href={`/catalog/`}>Más en catálogo</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
