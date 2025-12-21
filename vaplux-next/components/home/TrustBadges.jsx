export default function TrustBadges(){
  return (
    <section className="relative overflow-hidden bg-tech-white bg-grid noise-overlay">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold">Confianza y Servicio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="card-structure rounded-xl p-4 text-center">
            <div className="text-2xl">🚚</div>
            <p className="mt-2 text-sm text-slateInk/80">Entrega coordinada 48–72h</p>
          </div>
          <div className="card-structure rounded-xl p-4 text-center">
            <div className="text-2xl">🛡️</div>
            <p className="mt-2 text-sm text-slateInk/80">Garantía 12 meses</p>
          </div>
          <div className="card-structure rounded-xl p-4 text-center">
            <div className="text-2xl">💬</div>
            <p className="mt-2 text-sm text-slateInk/80">Asesoramiento por WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  )
}
