import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const SLIDES = [
  {
    id: '01',
    title: 'Reparación de iPhones',
    desc: 'Precisión técnica, repuestos originales y garantía en cada intervención.',
    image: '/assets/iPhone16Pro/iPhone16pro.webp',
    status: 'TECH STATUS: OK',
  },
  {
    id: '02',
    title: 'Diagnóstico Certificado',
    desc: 'Evaluaciones profesionales con herramientas calibradas a estándar Apple.',
    image: 'https://www.serviciotecnicoinformaticavalencia.es/wp-content/themes/yootheme/cache/cambio-pantalla-portatiles-04c7a202.webp',
    status: 'TECH STATUS: CALIBRATED',
  },
  {
    id: '03',
    title: 'Equipo de confianza',
    desc: 'Especialistas con procesos verificados y enfoque en experiencia.',
    image: 'https://i.pinimg.com/1200x/e9/ee/d6/e9eed69d0b0c2742dbee82f359c27cb1.jpg',
    status: 'TECH STATUS: VERIFIED',
  },
]

export default function ServiceGallery(){
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slideDurationMs = 5000
  const autoRef = useRef(null)

  useEffect(() => {
    if (!paused) {
      autoRef.current = setInterval(() => {
        setIndex(i => (i + 1) % SLIDES.length)
      }, slideDurationMs)
    }
    return () => {
      clearInterval(autoRef.current)
    }
  }, [paused])

  return (
    <section className="relative bg-white" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="overflow-hidden rounded-2xl">
          <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
            {SLIDES.map(s => (
              <div key={s.id} className="min-w-full">
                <div className="relative">
                  {/* Background numbering */}
                  <div className="absolute left-6 bottom-6 pointer-events-none select-none z-0">
                    <span className="font-mono text-[14vw] md:text-[10vw] font-bold text-[#e5e7eb] leading-none">{s.id}</span>
                  </div>
                  {/* Split layout */}
                  <div className="relative z-10 grid md:grid-cols-2 min-h-[60vh]">
                    {/* Left: image fully visible (object-contain) */}
                    <div className="relative bg-white grid place-items-center">
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.03 }}
                        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
                        className="w-full"
                      >
                        <Image
                          src={s.image}
                          alt={s.title}
                          width={1200}
                          height={800}
                          className="object-contain"
                          style={{ width: '100%', height: 'auto', objectPosition: 'center' }}
                          unoptimized
                        />
                      </motion.div>
                      {/* Tech Status overlay */}
                      <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/85 backdrop-blur-sm border border-[#e5e7eb] rounded-md px-2 py-1">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#00AEEF] blink" />
                        <span className="font-mono text-xs text-[#001B3D]">{s.status}</span>
                      </div>
                    </div>
                    {/* Right: text */}
                    <div className="flex items-center p-8 md:p-12 bg-white/95">
                      <div>
                        <h3 className="heading text-[#001B3D] text-3xl md:text-4xl font-bold">{s.title}</h3>
                        <p className="mt-3 text-slate-700 max-w-prose">{s.desc}</p>
                        <div className="mt-4 flex items-center justify-start gap-2" aria-label="Indicadores">
                          {SLIDES.map((_, i) => (
                            <span
                              key={i}
                              className={`h-2 w-2 rounded-full ${i === index ? 'bg-royal' : 'bg-mistGray'}`}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Indicadores movidos debajo de la información */}
        {/* Progress bar removida */}
      </div>
    </section>
  )
}
