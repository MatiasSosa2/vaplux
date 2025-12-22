import Head from 'next/head'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { products, getProductBySlug, getRelatedProducts } from '@/data/products'
import { useCart } from '@/context/CartContext'
import ProductCarousel from '@/components/home/ProductCarousel'
import ProductGallery from '@/components/ProductGallery'
import PurchasePanel from '@/components/PurchasePanel'
import HighlightsGrid from '@/components/HighlightsGrid'
import SpecsSection from '@/components/SpecsSection'
import ComparisonTable from '@/components/ComparisonTable'
import ReviewsSection from '@/components/ReviewsSection'
import StickyBuyBar from '@/components/StickyBuyBar'
import BulkPricing from '@/components/BulkPricing'
import { bulkPricingMap } from '@/data/bulkPricing'
import { getDisplayUsdPrice } from '@/utils/pricing'
export default function ProductPage({ product, related }) {
  const { add } = useCart()
  const images = [product?.image, product?.secondaryImage].filter(Boolean)

  const themeMap = {
    'iPhone': {
      banner: 'from-blue-700 via-blue-600 to-sky-500',
      ring: 'ring-blue-300',
      heading: 'text-blue-700',
      card: 'border-blue-200 bg-blue-50/40'
    },
    'Vapes': {
      banner: 'from-fuchsia-700 via-pink-600 to-rose-500',
      ring: 'ring-pink-300',
      heading: 'text-pink-700',
      card: 'border-pink-200 bg-pink-50/40'
    },
    'Electrónica': {
      banner: 'from-indigo-700 via-violet-600 to-cyan-500',
      ring: 'ring-indigo-300',
      heading: 'text-indigo-700',
      card: 'border-indigo-200 bg-indigo-50/40'
    },
    'Varios': {
      banner: 'from-emerald-700 via-teal-600 to-green-500',
      ring: 'ring-emerald-300',
      heading: 'text-emerald-700',
      card: 'border-emerald-200 bg-emerald-50/40'
    }
  }
  const catTheme = themeMap[product?.category] || { banner: 'from-slate-700 to-slate-500', ring: 'ring-slate-300', heading: 'text-slate-800', card: 'border-slate-200 bg-slate-50/40' }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: '/' },
      { '@type': 'ListItem', position: 2, name: product.category, item: '/catalog' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `/product/${product.slug}` }
    ]
  }

  const usdPrice = getDisplayUsdPrice(product)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    category: product.category,
    image: images,
    offers: {
      '@type': 'Offer',
      price: product.category === 'iPhone' ? product.price : (usdPrice || 0),
      priceCurrency: product.category === 'iPhone' ? 'ARS' : 'USD',
      availability: 'https://schema.org/InStock'
    }
  }

  return (
    <div>
      <Head>
        <title>{`${product.name} · ${product.category} · Vaplux`}</title>
        <meta name="description" content={Array.isArray(product.specs) && product.specs[0] ? product.specs[0] : `Comprar ${product.name}`} />
        <link rel="canonical" href={`/product/${product.slug}`} />
        <meta property="og:title" content={`${product.name} · Vaplux`} />
        <meta property="og:description" content={Array.isArray(product.specs) && product.specs[0] ? product.specs[0] : `Comprar ${product.name}`} />
        <meta property="og:image" content={product.image} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      </Head>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero + Breadcrumb */}
        <nav className="text-sm text-slate-600 mb-4" role="navigation" aria-label="breadcrumb">
          <ol className="flex flex-wrap gap-1">
            <li><Link href="/" className="hover:underline">Inicio</Link></li>
            <span>/</span>
            <li><Link href="/catalog" className="hover:underline">{product.category}</Link></li>
            <span>/</span>
            <li aria-current="page" className="font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Barra gradiente por categoría */}
        <div className={`h-2 rounded-full bg-gradient-to-r ${catTheme.banner} mb-6`} />

        {/* Galería + Panel de compra */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className={`rounded-xl ring-1 ${catTheme.ring} p-1 bg-white`}>
            <ProductGallery images={images} alt={product.name} compact={product.category === 'Vapes'} showThumbnails={false} />
          </div>
          <div className="space-y-6">
            <div className={`rounded-xl ring-1 ${catTheme.ring} bg-white`}>
              <div className={`h-1 bg-gradient-to-r ${catTheme.banner} rounded-t-xl`} />
              <div className="p-4">
                <PurchasePanel product={product} onAdd={add} onBuy={(p, q) => add(p, q)} />
                {/* Especificaciones a la derecha, debajo de compartir/copiar link */}
                <SpecsSection specs={product.specs} theme={{ headingClass: catTheme.heading, cardClass: catTheme.card }} />
                {/* Cuadro de precios mayoristas (si hay tiers) - No mostrar en iPhone */}
                {product.category !== 'iPhone' && (
                  <div className="mt-4">
                    <BulkPricing
                      tiers={(product.bulkPricing && product.bulkPricing.length > 0) ? product.bulkPricing : (bulkPricingMap[product.slug] || [])}
                      accent={product.category === 'Electrónica' ? 'indigo' : product.category === 'Varios' ? 'emerald' : 'slate'}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Destacados */}
        <HighlightsGrid items={[
          { icon: '⚡', title: 'Rendimiento', desc: 'Chip de última generación' },
          { icon: '🔋', title: 'Autonomía', desc: 'Batería de larga duración' },
          { icon: '🛡️', title: 'Garantía', desc: 'Soporte y cobertura' },
          { icon: '📶', title: 'Conectividad', desc: '5G / Wi‑Fi 6' }
        ]} />

        {/* Especificaciones movidas al panel derecho */}

        {/* Comparación */}
        <ComparisonTable products={related} />

        {/* Reseñas y Q&A */}
        <ReviewsSection reviews={[]} />

        {/* Relacionados */}
        <section className="mt-12">
          <ProductCarousel />
        </section>

        {/* Confianza */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-4"><p className="font-medium">Garantía oficial</p><p className="text-sm text-slate-600">Comprá con tranquilidad</p></div>
          <div className="card p-4"><p className="font-medium">Soporte experto</p><p className="text-sm text-slate-600">Te ayudamos a elegir</p></div>
          <div className="card p-4"><p className="font-medium">Calidad comprobada</p><p className="text-sm text-slate-600">Inspección y verificación</p></div>
        </section>
      </main>

      {/* Barra sticky móvil */}
      <StickyBuyBar product={product} onAdd={add} />
    </div>
  )
}

export async function getStaticPaths() {
  const paths = products.map((p) => ({ params: { slug: p.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug)
  if (!product) {
    return { notFound: true }
  }
  const related = getRelatedProducts(product.category, product.id)
  return {
    props: { product, related }
  }
}
