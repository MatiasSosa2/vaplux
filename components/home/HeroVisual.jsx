import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function HeroVisual(){
  const vapRef = useRef(null)
  const [vapWidth, setVapWidth] = useState(null)

  useEffect(() => {
    const updateWidth = () => {
      if (vapRef.current) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640
        setVapWidth(isMobile ? vapRef.current.offsetWidth : null)
      }
    }
    updateWidth()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWidth)
      return () => window.removeEventListener('resize', updateWidth)
    }
  }, [])
  return (
    <section className="relative w-full min-h-[100vh]">
      <div className="absolute inset-0">
        {/* Fondo blanco sólido para igualar al de la foto */}
        <div className="absolute inset-0 bg-white" />
        {/* Imagen principal respetando aspecto (más alta que ancha) */}
        <Image
          src="https://http2.mlstatic.com/D_NQ_NP_2X_870071-MLA99964558223_112025-F.webp"
          alt="Hero principal"
          fill
          className="object-contain object-[100%_center] md:object-[80%_center] scale-90 md:scale-100 origin-right"
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay limpio con slogan y CTAs, reubicado abajo a la izquierda */}
      <div className="relative z-10 flex items-end justify-start min-h-[100vh] py-10">
        <div className="max-w-xl px-6 md:px-10 pb-12 text-left translate-x-[-5%] md:translate-x-0">
          <h1 className="heading text-4xl md:text-6xl font-semibold tracking-tight text-[#0f172a]">
            Elegí mejor. 
          </h1>
          <h1 className="heading text-4xl md:text-6xl font-semibold tracking-tight text-[#0f172a] inline-block whitespace-nowrap" ref={vapRef}>
            Elegí Vaplux.
          </h1>
          <p className="mt-3 text-lg md:text-xl text-[#0f172a]/80 block" style={{ width: vapWidth ? `${vapWidth}px` : undefined }}>
            Productos premium y servicio confiable.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="/catalog" className="btn-cta btn-cta-primary">Ver catálogo</a>
            <a href="/contacto" className="px-5 py-3 rounded-md bg-white/90 text-primary border border-mistGray hover:bg-white transition">Contacto</a>
          </div>
        </div>
      </div>
    </section>
  )
}
