import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function ProductGallery({ images = [], alt = 'Producto', compact = false, showThumbnails = true }) {
  const safeImages = Array.isArray(images) && images.length > 0 ? images : [images].filter(Boolean)
  const [active, setActive] = useState(0)
  const router = useRouter()

  const resolveSrc = (src) => {
    if (!src) return src
    return src.startsWith('/') ? `${router.basePath || ''}${src}` : src
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') setActive((i) => Math.min(i + 1, safeImages.length - 1))
      if (e.key === 'ArrowLeft') setActive((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [safeImages.length])

  if (safeImages.length === 0) return null

  return (
    <div className="w-full">
      <div className={`image-safe-zone rounded-lg bg-white shadow ${compact ? 'flex items-center justify-center max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh] min-h-[24rem]' : ''}`}>
        <img
          src={resolveSrc(safeImages[active])}
          alt={alt}
          className={`product-image transition-transform duration-300 hover:scale-[1.02] ${compact ? 'max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh] w-auto max-w-full object-contain mx-auto' : 'w-full h-auto'}`}
        />
      </div>
      {showThumbnails && safeImages.length > 1 && (
        <div className="mt-3 grid grid-cols-5 sm:grid-cols-6 gap-2">
          {safeImages.map((src, i) => (
            <button
              key={i}
              aria-label={`Ver imagen ${i + 1}`}
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`border rounded-md overflow-hidden focus-accessible ${i === active ? 'ring-2 ring-slate-900' : 'hover:ring-1 hover:ring-slate-300'}`}
            >
              <img src={resolveSrc(src)} alt={`${alt} miniatura ${i + 1}`} className="w-full h-16 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
