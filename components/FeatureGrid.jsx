export default function FeatureGrid(){
  const items = [
    { t: 'Garantía y soporte', d: 'Asistencia real por WhatsApp y repuestos.', i: '🛡️' },
    { t: 'Pagos claros', d: 'Transferencia y links de pago.', i: '💳' },
    { t: 'Entrega coordinada', d: 'Retiro y entrega acordada.', i: '📦' },
    { t: 'Calidad certificada', d: 'Productos seleccionados y verificados.', i: '✅' },
  ]
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-aurora">Listos para exigentes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map(f => (
          <div key={f.t} className="card-structure rounded-xl p-5 hover:translate-y-[-4px] transition shadow-sm">
            <div className="text-2xl">{f.i}</div>
            <h3 className="font-semibold text-royal mt-2">{f.t}</h3>
            <p className="text-slateInk/80 text-sm mt-1">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
