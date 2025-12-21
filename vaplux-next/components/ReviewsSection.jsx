export default function ReviewsSection({ reviews = [] }) {
  const avg = reviews.length > 0 ? (reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length).toFixed(1) : '—'
  return (
    <section className="mt-10">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">Reseñas</h2>
        <span className="text-sm text-slate-600">Promedio: {avg}</span>
      </div>
      {reviews.length === 0 ? (
        <p className="text-sm text-slate-600 mt-2">Aún no hay reseñas.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {reviews.map((r, i) => (
            <li key={i} className="p-3 border rounded-md">
              <p className="text-sm font-medium">{r.author || 'Usuario'}</p>
              <p className="text-xs text-slate-600">{r.rating} ★</p>
              <p className="text-sm mt-1">{r.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
