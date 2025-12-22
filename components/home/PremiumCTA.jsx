import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PremiumCTA(){
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="heading text-[#001B3D] text-3xl font-bold text-center mb-10">Servicios</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Reparación de iPhones */}
          <motion.div className="inner-glow-hover rounded-2xl p-6 bg-white card-structure" whileHover={{ scale: 1.01 }}>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#001B3D]" />
              <div>
                <h3 className="heading text-[#001B3D] text-xl font-semibold">Reparación de iPhones</h3>
                <p className="mt-1 text-slate-700">Diagnóstico experto, repuestos originales y garantía en cada reparación.</p>
                <Link href="/services/reparacion-iphones" className="btn-cta btn-cta-primary mt-4">Ver Servicio</Link>
              </div>
            </div>
          </motion.div>

          {/* Trabajá con Nosotros */}
          <motion.div className="inner-glow-hover rounded-2xl p-6 bg-white card-structure" whileHover={{ scale: 1.01 }}>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#001B3D] to-[#00AEEF]" />
              <div>
                <h3 className="heading text-[#001B3D] text-xl font-semibold">Trabajá con Nosotros</h3>
                <p className="mt-1 text-slate-700">Sumate a un equipo técnico de excelencia con enfoque premium.</p>
                <Link href="/services/trabaja-con-nosotros" className="btn-cta btn-cta-secondary mt-4">Postular</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
