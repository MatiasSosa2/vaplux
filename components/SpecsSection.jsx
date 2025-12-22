export default function SpecsSection({ groups, specs, theme = {} }) {
  const hasGroups = groups && Object.keys(groups).length > 0
  const list = Array.isArray(specs) ? specs : []
  const headingClass = theme.headingClass || 'text-slate-900'
  const cardBase = 'p-3 border rounded-md'
  const cardClass = theme.cardClass ? `${cardBase} ${theme.cardClass}` : cardBase

  return (
    <section className="mt-8">
      <h2 className={`text-lg font-semibold mb-3 ${headingClass}`}>Especificaciones</h2>
      {hasGroups ? (
        <div className="space-y-3">
          {Object.entries(groups).map(([name, items], idx) => (
            <div key={idx} className={cardClass}>
              <p className="font-medium">{name}</p>
              <ul className="mt-2 list-disc list-inside text-sm text-slate-700">
                {items.map((it, i) => (<li key={i}>{it}</li>))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className={cardClass}>
          {list.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-slate-700">
              {list.map((s, i) => (<li key={i}>{s}</li>))}
            </ul>
          ) : (
            <p className="text-sm text-slate-600">Sin especificaciones disponibles.</p>
          )}
        </div>
      )}
    </section>
  )
}
