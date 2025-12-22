import Navbar from '@/components/Navbar'

export default function ReparacionIphones(){
  const features = [
    { icon: '📱', title: 'Pantalla Completa', price: 'Desde $25.000', items: ['Pantalla original o AAA+', 'Incluye instalación', 'Garantía 6 meses', 'Tiempo: 30 minutos'] },
    { icon: '🔋', title: 'Cambio de Batería', price: 'Desde $12.000', items: ['Batería original', 'Calibración incluida', 'Garantía 12 meses', 'Tiempo: 20 minutos'] },
    { icon: '🔌', title: 'Puerto de Carga', price: 'Desde $8.000', items: ['Limpieza profunda', 'Reemplazo si es necesario', 'Garantía 3 meses', 'Tiempo: 15 minutos'] },
    { icon: '📸', title: 'Cámara', price: 'Desde $15.000', items: ['Cámara original', 'Calibración enfoque', 'Garantía 6 meses', 'Tiempo: 45 minutos'] },
    { icon: '🔊', title: 'Audio y Altavoces', price: 'Desde $10.000', items: ['Altavoz original', 'Micrófono incluido', 'Garantía 6 meses', 'Tiempo: 30 minutos'] },
    { icon: '💧', title: 'Daño por Líquidos', price: 'Desde $20.000', items: ['Diagnóstico gratuito', 'Limpieza ultrasónica', 'Garantía según daño', 'Tiempo: 24-48hs'] },
  ]

  const steps = [
    { n:1, t:'Diagnóstico', d:'Evaluación completa y gratuita de tu iPhone' },
    { n:2, t:'Presupuesto', d:'Cotización transparente y aprobación previa' },
    { n:3, t:'Reparación', d:'Técnicos certificados y repuestos originales' },
    { n:4, t:'Pruebas', d:'Verificación total antes de entregar' },
    { n:5, t:'Entrega', d:'Garantía extendida y soporte post-reparación' },
  ]

  const guarantees = [
    { icon:'🛡️', t:'Garantía Extendida', d:'Hasta 12 meses según servicio' },
    { icon:'⚡', t:'Reparación Express', d:'La mayoría en el día' },
    { icon:'✅', t:'Repuestos Originales', d:'Originales o AAA+ de alta calidad' },
    { icon:'💰', t:'Mejor Precio', d:'Relación precio/calidad optimizada' },
  ]

  return (
    <div>
      <Navbar />
      <header className="relative overflow-hidden bg-tech-navy noise-overlay">
        <div className="aurora-layer" />
        <div className="relative max-w-5xl mx-auto px-4 py-14">
          <span className="glass-badge">Servicio Técnico Certificado</span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-white mt-3">Reparación de iPhones</h1>
          <p className="text-white/80 mt-2">Técnicos especializados, repuestos originales y garantía extendida.</p>
          <div className="mt-5 flex gap-3 flex-wrap">
            <a className="btn-cta btn-cta-primary" href="https://wa.me/5492216703630?text=Hola,%20necesito%20reparar%20mi%20iPhone" target="_blank" rel="noreferrer">Cotizar ahora</a>
            <a className="btn-cta btn-cta-secondary" href="#servicios">Ver servicios</a>
          </div>
        </div>
      </header>

      <main>
        <section id="servicios" className="relative py-14 bg-tech-white bg-grid">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-8">
              <span className="glass-badge">Servicios</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary mt-3">Qué reparamos</h2>
              <p className="text-slateInk/80 mt-1">Reparaciones especializadas con garantía y repuestos premium.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((s, i) => (
                <div key={i} className="card-structure rounded-xl p-6 hover:shadow-xl transition relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-30" style={{background:'radial-gradient(circle, rgba(27,152,224,0.6), transparent 60%)'}} />
                  <div className="text-3xl">{s.icon}</div>
                  <h3 className="text-lg font-semibold text-royal mt-2">{s.title}</h3>
                  <div className="text-sm text-slateInk/70 mb-2">{s.price}</div>
                  <ul className="list-disc list-inside text-slateInk/80 space-y-1">
                    {s.items.map((li, j) => <li key={j}>{li}</li>)}
                  </ul>
                  <div className="mt-4">
                    <a className="btn-cta btn-cta-primary" href={`https://wa.me/5492216703630?text=Quiero%20cotizar%20${encodeURIComponent(s.title)}`} target="_blank" rel="noreferrer">Cotizar</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-tech-gray">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-8">
              <span className="glass-badge">Proceso</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary mt-3">Cómo trabajamos</h2>
              <p className="text-slateInk/80 mt-1">Simplicidad y transparencia en cada paso.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {steps.map(s => (
                <div key={s.n} className="card-structure rounded-xl p-4 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full text-white grid place-items-center" style={{background:'linear-gradient(135deg, #0A3D62, #1B98E0)'}}>{s.n}</div>
                  <h3 className="font-semibold text-royal mt-2">{s.t}</h3>
                  <p className="text-xs text-slateInk/80 mt-1">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-tech-navy noise-overlay">
          <div className="max-w-5xl mx-auto px-4 text-white">
            <div className="mb-8">
              <span className="glass-badge">Garantía</span>
              <h2 className="text-2xl sm:text-3xl font-semibold mt-3">Tu tranquilidad primero</h2>
              <p className="text-white/80 mt-1">Compromiso total con la calidad y tu satisfacción.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guarantees.map((g, i) => (
                <div key={i} className="rounded-xl p-6 border border-white/20 bg-white/10 backdrop-blur">
                  <div className="text-2xl mb-2">{g.icon}</div>
                  <h3 className="font-semibold">{g.t}</h3>
                  <p className="text-sm text-white/80 mt-1">{g.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
