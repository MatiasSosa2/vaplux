import Image from 'next/image'
import { motion } from 'framer-motion'

const points = [
  { id: 'screen', label: 'Pantalla', x: '70%', y: '18%' },
  { id: 'battery', label: 'Batería', x: '50%', y: '60%' },
  { id: 'port', label: 'Puerto de Carga', x: '52%', y: '85%' },
]

export default function ServicePrecision(){
  return (
    <motion.section className="blueprint-grid py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="heading text-white text-3xl font-bold mb-3">Servicio Técnico de Precisión</h3>
          <p className="font-sans text-[#a7c7ff]">Diagnóstico experto y repuestos originales. Cada reparación con garantía.</p>
        </div>
        <div className="relative rounded-xl overflow-hidden ring-1 ring-[#00AEEF]/30 bg-[#001B3D]">
          <div className="relative w-full">
            <Image
              src="https://i.pinimg.com/1200x/29/62/22/296222848ac42cf0e8d909ef64e38e7e.jpg"
              alt="Blueprint iPhone"
              width={1200}
              height={1600}
              className="object-contain"
              style={{ width: '100%', height: 'auto', objectPosition: 'center' }}
              unoptimized
            />
          </div>
          {/* puntos interactivos */}
          {points.map(p => (
            <div key={p.id} className="absolute" style={{ left: p.x, top: p.y }}>
              <div className="group">
                <div className="h-3 w-3 rounded-full bg-[#00AEEF] shadow-[0_0_12px_#00AEEF]" />
                <div className="opacity-0 group-hover:opacity-100 transition mt-2 text-[#00AEEF] text-xs">{p.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
