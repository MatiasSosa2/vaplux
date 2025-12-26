import { useEffect, useMemo, useRef, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

// Helper para chunk de productos por slide
function chunk(arr, size){
  const res = []
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size))
  return res
}

export default function ProductCarousel(){
  const [perSlide, setPerSlide] = useState(4)
  useEffect(() => {
    const mq = typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)') : null
    const handler = () => setPerSlide(mq && mq.matches ? 2 : 4)
    handler()
    if (mq) {
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [])
  // Mezcla simple: ordenar por categoría y alternar
  const mixed = useMemo(() => {
    const cats = {}
    products.forEach(p => { (cats[p.category] ||= []).push(p) })
    const maxLen = Math.max(...Object.values(cats).map(a => a.length))
    const res = []
    for (let i = 0; i < maxLen; i++){
      for (const cat of Object.keys(cats)){
        const item = cats[cat][i]
        if (item) res.push(item)
      }
    }
    return res
  }, [])

  const slides = useMemo(() => chunk(mixed, perSlide), [mixed, perSlide])
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (paused || slides.length <= 1) return
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(intervalRef.current)
  }, [paused, slides.length])

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section
      className="relative max-w-7xl mx-auto px-4 py-8 md:py-16"
      role="region"
      aria-roledescription="carousel"
      aria-label="Productos Destacados"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-sans text-[#001B3D] text-3xl md:text-4xl font-semibold tracking-tight">Destacados</h2>
      </div>

      <div className="overflow-hidden rounded-xl">
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((group, gi) => (
            <div key={gi} className="min-w-full py-6 md:py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {group.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón anterior (izquierda) */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="focus-accessible absolute top-1/2 -translate-y-1/2 left-2 md:left-4 h-10 w-10 rounded-full bg-white border border-[#001B3D] text-[#001B3D] shadow-md hover:bg-[#001B3D] hover:text-white z-10 grid place-items-center"
      >
        {/* ‹ */}
        <span aria-hidden>‹</span>
      </button>

      {/* Botón siguiente (derecha) */}
      <button
        aria-label="Siguiente"
        onClick={next}
        className="focus-accessible absolute top-1/2 -translate-y-1/2 right-2 md:right-4 h-10 w-10 rounded-full bg-white border border-[#001B3D] text-[#001B3D] shadow-md hover:bg-[#001B3D] hover:text-white z-10 grid place-items-center"
      >
        {/* › */}
        <span aria-hidden>›</span>
      </button>

      <div className="mt-10 flex items-center justify-center gap-2" aria-label="Indicadores">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-[#001B3D]' : 'bg-mistGray'}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
