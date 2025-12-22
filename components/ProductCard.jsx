import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from '@/context/CartContext'
import formatCurrency from '@/utils/formatCurrency'
import formatUSD from '@/utils/formatUSD'
import { getDisplayUsdPrice } from '@/utils/pricing'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProductCard({ product, showSpecs = false }){
  const { add } = useCart()
  const router = useRouter()

  const resolveSrc = (src) => {
    if (!src) return src
    // Prefijar basePath sólo para rutas locales absolutas
    if (src.startsWith('/')) return `${router.basePath || ''}${src}`
    return src
  }

  const onMove = (e) => {
    const card = e.currentTarget
    const img = card.querySelector('.product-image')
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) - 0.5
    const py = (y / rect.height) - 0.5
    // No mover márgenes/borde del card; sólo parallax sutil de la imagen
    if (img) img.style.transform = `translate(${px * 10}px, ${py * 10}px) scale(1.02)`
  }

  const onLeave = (e) => {
    const card = e.currentTarget
    const img = card.querySelector('.product-image')
    if (img) img.style.transform = ''
  }

  return (
    <motion.div
      className="product-card card-structure rounded-xl p-4 shadow-structure hover:shadow-glow transition group glow-ring border border-[#0A67C1] border-[3px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="relative image-safe-zone rounded-lg overflow-hidden border border-mistGray/60" style={{background:'#FFFFFF'}}>
        {/* Badge flotante opcional */}
        {product.badge && (
          <span className="glass-badge absolute left-3 top-3 z-10">{product.badge}</span>
        )}
        {/* Imagen primaria */}
        <div className="relative w-full h-[180px] md:h-[200px]">
          <Image
            src={resolveSrc(product.image)}
            alt={product.name}
            fill
            priority={false}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="product-image object-contain transition-opacity duration-300 ease-out group-hover:opacity-0"
            unoptimized
          />
          {/* Segunda imagen para hover */}
          <Image
            src={resolveSrc(product.secondaryImage || product.image)}
            alt={`${product.name} detalle`}
            fill
            priority={false}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-contain opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:scale-[1.03]"
            unoptimized
          />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold tracking-wide line-clamp-2" style={{color:'#0F172A'}}>{product.name}</h3>
        <p className="font-semibold" style={{color:'#0F172A'}}>
          {product.category === 'iPhone'
            ? formatCurrency(product.price)
            : formatUSD(getDisplayUsdPrice(product))}
        </p>
        {showSpecs && Array.isArray(product.specs) && product.specs.length > 0 && (
          <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
            {product.specs.slice(0, 2).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}
        <div className="flex gap-2 mt-3">
          <button className="btn-modern btn-modern-primary" onClick={() => add(product, 1)}>Agregar</button>
          <Link className="btn-modern btn-modern-secondary" href={`/product/${product.slug}`}>Ver más</Link>
        </div>
      </div>
    </motion.div>
  )
}
