import Link from 'next/link'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function Contacto(){
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [motivo, setMotivo] = useState('Consulta de producto')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const validar = () => {
    if (!nombre.trim()) return 'Ingresá tu nombre.'
    if (!email.trim()) return 'Ingresá tu email.'
    const re = /[^\s@]+@[^\s@]+\.[^\s@]+/
    if (!re.test(email)) return 'Ingresá un email válido.'
    if (!mensaje.trim()) return 'Contanos en qué podemos ayudarte.'
    return ''
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const err = validar()
    if (err) { setError(err); return }
    setError('')
    const subject = encodeURIComponent(`Vaplux - ${motivo}`)
    const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\nMotivo: ${motivo}\n\nMensaje:\n${mensaje}`)
    window.location.href = `mailto:contacto@example.com?subject=${subject}&body=${body}`
  }

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-tech-sky bg-grid noise-overlay">
      <section className="relative overflow-hidden">
        <div className="accent-orb" style={{top:'-80px', left:'-120px'}} />
        <div className="accent-orb" style={{bottom:'-120px', right:'-80px'}} />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-aurora">Hablemos</h1>
            <p className="mt-2 text-slateInk/80">Tecnología premium, soporte real. Elegí el canal que prefieras o completá el formulario.</p>
          </header>

          <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start">
            {/* Canales rápidos */}
            <div className="space-y-6">
              <div className="card-structure rounded-xl p-6 glow-ring">
                <h2 className="text-lg font-semibold">WhatsApp</h2>
                <p className="text-sm text-slateInk/80 mt-1">Respuesta ágil para consultas y seguimiento de pedidos.</p>
                <a
                  className="btn-cta btn-cta-primary mt-4 inline-flex"
                  href="https://wa.me/?text=Hola%20Vaplux%2C%20necesito%20asesoramiento"
                  target="_blank" rel="noopener noreferrer"
                >Escribir por WhatsApp</a>
              </div>

              <div className="card-structure rounded-xl p-6">
                <h2 className="text-lg font-semibold">Instagram</h2>
                <p className="text-sm text-slateInk/80 mt-1">Seguinos para novedades y escribinos por DM.</p>
                <a className="btn-cta btn-cta-secondary mt-4 inline-flex items-center gap-2" href="https://instagram.com/vaplux.arg" target="_blank" rel="noreferrer">
                  <span>📷</span>
                  <span>vaplux.arg</span>
                </a>
              </div>

              <div className="card-structure rounded-xl p-6">
                <h3 className="font-semibold">Horarios y respuesta</h3>
                <ul className="text-sm text-slateInk/80 mt-2 space-y-1">
                  <li>• Lunes a Sábado: 10:00 – 19:00</li>
                  <li>• Tiempo de respuesta hábil: 1–6 horas</li>
                  <li>• Entrega coordinada a todo el país</li>
                </ul>
              </div>
            </div>

            {/* Formulario */}
            <div className="card-structure rounded-xl p-6 glow-ring bg-white/80">
              <h2 className="text-lg font-semibold">Envíanos un mensaje</h2>
              <p className="text-sm text-slateInk/80 mt-1">Te respondemos a la brevedad.</p>
              <form className="mt-4 space-y-4" onSubmit={onSubmit} noValidate>
                <div>
                  <label className="text-sm text-slateInk/80" htmlFor="nombre">Nombre</label>
                  <input id="nombre" className="mt-1 w-full rounded-md border border-mistGray px-3 py-2 focus-accessible" value={nombre} onChange={e=>setNombre(e.target.value)} required />
                </div>
                <div>
                  <label className="text-sm text-slateInk/80" htmlFor="email">Email</label>
                  <input id="email" type="email" className="mt-1 w-full rounded-md border border-mistGray px-3 py-2 focus-accessible" value={email} onChange={e=>setEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="text-sm text-slateInk/80" htmlFor="motivo">Motivo</label>
                  <select id="motivo" className="mt-1 w-full rounded-md border border-mistGray px-3 py-2 focus-accessible" value={motivo} onChange={e=>setMotivo(e.target.value)}>
                    <option>Consulta de producto</option>
                    <option>Soporte postventa</option>
                    <option>Cotización/Mayorista</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slateInk/80" htmlFor="mensaje">Mensaje</label>
                  <textarea id="mensaje" rows={5} className="mt-1 w-full rounded-md border border-mistGray px-3 py-2 focus-accessible" value={mensaje} onChange={e=>setMensaje(e.target.value)} required />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex items-center gap-3">
                  <button type="submit" className="btn-cta btn-cta-primary">Enviar por email</button>
                  <Link className="btn-cta btn-cta-secondary" href="/catalog/">Ver catálogo</Link>
                </div>
                <p className="text-xs text-slateInk/70 mt-2">Protegemos tus datos. No compartimos tu información con terceros.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}