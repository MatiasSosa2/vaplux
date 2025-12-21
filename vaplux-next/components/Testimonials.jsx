export default function Testimonials(){
  const items = [
    { q: 'Llegó rapidísimo y en perfecto estado. Excelente atención.', a: 'Lucía R.' },
    { q: 'El iPhone vino impecable, me guiaron en todo.', a: 'Matías P.' },
    { q: 'Muy buena experiencia. Recomendables 100%.', a: 'Juan S.' },
  ]
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-aurora">Lo que dicen nuestros clientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <figure key={i} className="card-structure rounded-xl p-5 glow-ring">
            <blockquote className="text-sm text-slateInk/90">“{t.q}”</blockquote>
            <figcaption className="mt-3 text-xs text-slateInk/70">— {t.a}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
