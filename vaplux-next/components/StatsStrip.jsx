export default function StatsStrip(){
  const stats = [
    { k: '+500', v: 'Ventas entregadas' },
    { k: '24h', v: 'Despacho rápido' },
    { k: '100%', v: 'Compras seguras' },
    { k: '★ 4.9', v: 'Satisfacción' },
  ]
  return (
    <section className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map(s => (
        <div key={s.v} className="rounded-xl border border-mistGray/70 bg-white/70 p-4 text-center glow-ring">
          <div className="text-royal text-xl font-semibold">{s.k}</div>
          <div className="text-slateInk/70 text-sm">{s.v}</div>
        </div>
      ))}
    </section>
  )
}
