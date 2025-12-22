import Navbar from '@/components/Navbar'

export default function TrabajaConNosotros(){
  const opportunities = [
    { icon:'🧑‍💼', t:'Ventas y Atención', d:'Perfil orientado a clientes, manejo de WhatsApp y seguimiento comercial.' },
    { icon:'🧑‍🔧', t:'Técnico de iPhone', d:'Experiencia en hardware y microsoldadura (deseable). Atención a detalle y calidad.' },
    { icon:'📦', t:'Logística', d:'Gestión de entregas, control de stock y coordinación con proveedores.' },
  ]

  const benefits = [
    'Capacitación continua y certificaciones internas',
    'Bonos por desempeño y objetivos',
    'Ambiente colaborativo y crecimiento real',
    'Acceso anticipado a nuevos productos',
  ]

  return (
    <div>
      <Navbar />
      <header className="relative overflow-hidden bg-tech-navy noise-overlay">
        <div className="aurora-layer" />
        <div className="relative max-w-5xl mx-auto px-4 py-14">
          <span className="glass-badge">Equipo Vaplux</span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-white mt-3">Trabajá con Nosotros</h1>
          <p className="text-white/80 mt-2">Sumate a nuestra red: crecimiento, capacitación y oportunidades reales.</p>
          <div className="mt-5 flex gap-3 flex-wrap">
            <a className="btn-cta btn-cta-primary" href="https://wa.me/5492216703630?text=Hola!%20Quiero%20postularme%20a%20Vaplux" target="_blank" rel="noreferrer">Postularme</a>
            <a className="btn-cta btn-cta-secondary" href="#oportunidades">Ver oportunidades</a>
          </div>
        </div>
      </header>

      <main>
        <section id="oportunidades" className="py-14 bg-tech-white bg-grid">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-8">
              <span className="glass-badge">Vacantes</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary mt-3">Oportunidades abiertas</h2>
              <p className="text-slateInk/80 mt-1">Buscamos personas con energía, criterio y ganas de hacer.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((o, i) => (
                <div key={i} className="card-structure rounded-xl p-6 hover:shadow-xl transition relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-30" style={{background:'radial-gradient(circle, rgba(27,152,224,0.6), transparent 60%)'}} />
                  <div className="text-3xl">{o.icon}</div>
                  <h3 className="text-lg font-semibold text-royal mt-2">{o.t}</h3>
                  <p className="text-slateInk/80 mt-1">{o.d}</p>
                  <div className="mt-4">
                    <a className="btn-cta btn-cta-primary" href={`https://wa.me/5492216703630?text=Hola!%20Quiero%20postularme:%20${encodeURIComponent(o.t)}`} target="_blank" rel="noreferrer">Quiero postularme</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-tech-gray">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-6">
              <span className="glass-badge">Beneficios</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary mt-3">¿Por qué Vaplux?</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slateInk/90">
              {benefits.map((b,i) => (
                <li key={i} className="card-structure rounded-lg p-4">✅ {b}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 bg-tech-navy noise-overlay">
          <div className="max-w-5xl mx-auto px-4 text-white">
            <div className="mb-6">
              <span className="glass-badge">Contacto</span>
              <h2 className="text-2xl sm:text-3xl font-semibold mt-3">¿Listo para aplicar?</h2>
              <p className="text-white/80 mt-1">Enviá tu CV o propuesta por WhatsApp y agendamos una charla.</p>
            </div>
            <a className="btn-cta btn-cta-primary" href="https://wa.me/5492216703630?text=Hola!%20Quiero%20sumarme%20al%20equipo%20Vaplux" target="_blank" rel="noreferrer">Hablar por WhatsApp</a>
          </div>
        </section>
      </main>
    </div>
  )
}
