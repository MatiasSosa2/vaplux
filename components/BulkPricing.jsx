import React from 'react'

function formatUSD(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return 'USD -'
  const hasDecimals = !Number.isInteger(num)
  return 'USD ' + num.toLocaleString('es-AR', {
    minimumFractionDigits: hasDecimals ? 1 : 0,
    maximumFractionDigits: 2
  })
}

export default function BulkPricing({ tiers = [], accent = 'indigo' }) {
  const hasTiers = Array.isArray(tiers) && tiers.length > 0

  const theme = {
    indigo: {
      banner: 'from-indigo-600 via-violet-600 to-cyan-600',
      ring: 'ring-indigo-200',
      heading: 'text-indigo-700',
      card: 'border-indigo-200 bg-indigo-50/40'
    },
    emerald: {
      banner: 'from-emerald-600 via-teal-600 to-green-600',
      ring: 'ring-emerald-200',
      heading: 'text-emerald-700',
      card: 'border-emerald-200 bg-emerald-50/40'
    },
    blue: {
      banner: 'from-blue-600 via-sky-600 to-cyan-600',
      ring: 'ring-blue-200',
      heading: 'text-blue-700',
      card: 'border-blue-200 bg-blue-50/40'
    },
    slate: {
      banner: 'from-slate-600 to-slate-500',
      ring: 'ring-slate-200',
      heading: 'text-slate-800',
      card: 'border-slate-200 bg-slate-50/40'
    }
  }[accent] || {
    banner: 'from-slate-600 to-slate-500',
    ring: 'ring-slate-200',
    heading: 'text-slate-800',
    card: 'border-slate-200 bg-slate-50/40'
  }

  return (
    <div className={`rounded-xl ring-1 ${theme.ring} bg-white`}>
      <div className={`h-1 bg-gradient-to-r ${theme.banner} rounded-t-xl`} />
      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 ${theme.heading}`}>Precios mayoristas</h3>
        <p className="text-sm text-slate-600 mb-3">Precio por unidad según cantidad (referencia en USD).</p>

        {hasTiers ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {tiers.map((t, i) => {
              const qty = t.qty || t.quantity || 0
              const usd = t.priceUSD ?? t.usd
              const ars = t.priceARS ?? t.ars
              return (
                <div key={i} className={`rounded-lg p-3 border ${theme.card}`}>
                  <div className="text-sm text-slate-700">{qty} unidades</div>
                  {usd != null && (
                    <div className="text-base font-semibold text-slate-900">{formatUSD(usd)}</div>
                  )}
                  {usd == null && ars != null && (
                    <div className="text-base font-semibold text-slate-900">ARS ${Math.round(Number(ars || 0)).toLocaleString('es-AR')}</div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className={`rounded-lg p-4 border ${theme.card}`}>
            <p className="text-sm text-slate-700">Aún no cargamos los precios mayoristas para este producto.</p>
            <div className="mt-3">
              <a href="/contacto" className="inline-flex items-center px-3 py-2 rounded-md border bg-white hover:bg-slate-50">Solicitar cotización por cantidad</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
