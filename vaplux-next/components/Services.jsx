import Link from 'next/link'

export default function Services(){
  const items = [
    {
      icon: '🔧',
      title: 'Reparación de iPhones',
      desc: 'Diagnóstico profesional, repuestos de calidad y garantía escrita. Cambios de pantalla, batería, cámaras, puertos y más.',
      cta: { label: 'Ver detalles', href: '/services/reparacion-iphones' }
    },
    {
      icon: '💼',
      title: 'Trabajá con Nosotros',
      desc: 'Sumate a nuestra red de partners y distribuidores. Capacitación, soporte y beneficios exclusivos.',
      cta: { label: 'Ver oportunidades', href: '/services/trabaja-con-nosotros' }
    },
    {
      icon: '🛡️',
      title: 'Garantía & Soporte',
      desc: 'Políticas claras de garantía y asistencia postventa para que compres con tranquilidad. Atención de Lunes a Sábado.',
      cta: { label: 'Información', href: '/services' }
    },
  ]

  return (
    <section className="relative py-14 bg-tech-white bg-grid">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <span className="glass-badge">Servicios</span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary mt-3">Soluciones Técnicas y Soporte</h2>
          <p className="text-slateInk/80 mt-1">Todo lo que necesitás para postventa y crecimiento.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <div key={i} className="card-structure rounded-xl p-6 hover:shadow-xl transition relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-30" style={{background:'radial-gradient(circle, rgba(27,152,224,0.6), transparent 60%)'}} />
              <div className="text-3xl">{s.icon}</div>
              <h3 className="text-lg font-semibold text-royal mt-2">{s.title}</h3>
              <p className="text-slateInk/80 mt-1">{s.desc}</p>
              <div className="mt-4">
                <Link
                  className="btn-cta btn-cta-primary"
                  href={s.cta.href}
                  target={s.cta.href?.startsWith('http') ? '_blank' : undefined}
                  rel={s.cta.href?.startsWith('http') ? 'noreferrer' : undefined}
                >{s.cta.label}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
