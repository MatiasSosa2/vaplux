import Navbar from '@/components/Navbar'
import Services from '@/components/Services'
import Footer from '@/components/Footer'

export default function ServicesPage(){
  return (
    <div>
      <Navbar />
      <header className="relative overflow-hidden bg-tech-navy">
        <div className="aurora-layer" />
        <div className="relative max-w-5xl mx-auto px-4 py-14">
          <span className="glass-badge">Equipo Técnico</span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-white mt-3">Servicios Profesionales</h1>
          <p className="text-white/80 mt-2">Reparaciones, soporte y alianzas para tu negocio.</p>
        </div>
      </header>
      <Services />
    </div>
  )
}
