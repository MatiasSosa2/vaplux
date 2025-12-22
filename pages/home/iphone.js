import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { getFeaturedProducts } from '@/data/products'
import formatCurrency from '@/utils/formatCurrency'

export default function HomeIphone(){
  const products = getFeaturedProducts().slice(0,8)
  return (
    <div>
      <Navbar />
      <header className="relative overflow-hidden bg-tech-navy noise-overlay">
        <div className="aurora-layer" />
        <div className="relative max-w-5xl mx-auto px-4 py-16">
          <span className="glass-badge">iPhone</span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-white mt-3">Rendimiento Pro, diseño Apple</h1>
          <p className="text-white/80 mt-2">De 14 a 17: elegí tamaño, cámara y ProMotion.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/catalog/iphone" className="btn-cta btn-cta-primary">Ver iPhone</Link>
            <Link href="/catalog/" className="btn-cta btn-cta-secondary">Catálogo</Link>
          </div>
        </div>
      </header>
      <section className="relative overflow-hidden bg-tech-white bg-grid noise-overlay">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold">Destacados iPhone</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {products.map((p, i) => (
              <div key={i} className="product-card card-structure rounded-xl transition p-4 shadow-lg hover:shadow-xl">
                <div className="image-safe-zone rounded-lg overflow-hidden border border-mistGray/60">
                  <img src={p.image} alt={p.name} className="product-image" />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-royal tracking-wide">{p.name}</h3>
                  <p className="text-slateInk/90">{formatCurrency(p.price)}</p>
                  <div className="flex gap-2 mt-3">
                    <Link className="btn-cta btn-cta-secondary" href={`/product/${p.slug}`}>Más ›</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-tech-sky bg-grid noise-overlay">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold">Novedades iPhone</h2>
          <div className="mt-6 flex gap-6 overflow-x-auto pb-2">
            {products.map((p, i) => (
              <div key={i} className="min-w-[260px] card-structure rounded-xl p-4 shadow-lg hover:shadow-xl">
                <div className="rounded-lg overflow-hidden border border-mistGray/60">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="mt-3">
                  <h3 className="text-base font-semibold text-royal">{p.name}</h3>
                  <Link className="btn-cta btn-cta-secondary mt-2" href={`/product/${p.slug}`}>Más ›</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
