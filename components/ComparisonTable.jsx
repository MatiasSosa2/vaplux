import formatCurrency from '@/utils/formatCurrency'

export default function ComparisonTable({ products = [] }) {
  if (!Array.isArray(products) || products.length === 0) return null
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-3">Comparación</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2">Modelo</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Principal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.price ? formatCurrency(p.price) : '—'}</td>
                <td className="p-2">{Array.isArray(p.specs) ? p.specs[0] : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
