import Navbar from '@/components/Navbar'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import FilterBar from '@/components/FilterBar'
import { useState, useMemo } from 'react'

export default function Catalog(){
  const [filters, setFilters] = useState({ query: '', priceMax: 9999999, sort: 'relevance' })
  const groups = ['iPhone', 'Electrónica', 'Varios']
  const titles = {
    'iPhone': 'iPhones',
    'Electrónica': 'Electrónica',
    'Varios': 'Varios'
  }
  const ids = {
    'iPhone': 'iphone',
    'Electrónica': 'electronica',
    'Varios': 'varios'
  }

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    let list = products.filter(p => (
      (q === '' || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.specs||[]).join(' ').toLowerCase().includes(q))
    ) && p.price <= (filters.priceMax || 9999999))
    switch (filters.sort) {
      case 'price-asc':
        list = [...list].sort((a,b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a,b) => b.price - a.price)
        break
      case 'name-asc':
        list = [...list].sort((a,b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
    return list
  }, [filters])

  const themeMap = {
    'iPhone': {
      banner: 'from-blue-700 via-blue-600 to-sky-500',
      ring: 'ring-blue-200',
      heading: 'text-blue-700',
      card: 'border-blue-200 bg-blue-50/40'
    },
    'Electrónica': {
      banner: 'from-indigo-700 via-violet-600 to-cyan-500',
      ring: 'ring-indigo-200',
      heading: 'text-indigo-700',
      card: 'border-indigo-200 bg-indigo-50/40'
    },
    'Varios': {
      banner: 'from-emerald-700 via-teal-600 to-green-500',
      ring: 'ring-emerald-200',
      heading: 'text-emerald-700',
      card: 'border-emerald-200 bg-emerald-50/40'
    }
  }

  return (
    <div>
      <a id="top" />
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <nav aria-label="Índice del catálogo" className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-sky-600">Índice</h2>
          <ul className="flex flex-wrap gap-3 text-royal">
            {groups.map(cat => (
              <li key={cat}>
                <a className="hover:underline" href={`#${ids[cat]}`}>{titles[cat]}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mb-8 rounded-xl ring-1 ring-slate-300 bg-white/80 backdrop-blur-sm p-3">
          <FilterBar onChange={setFilters} initial={filters} accent="blue" />
        </div>
        {groups.map(cat => {
          let items = filtered.filter(p => p.category === cat)
          if (cat === 'iPhone') {
            const typeWeight = (slug) => {
              const t = slug.toLowerCase()
              if (t.includes('mini')) return 1
              if (t.includes('plus')) return 2
              if (t.includes('air')) return 2
              if (t.includes('pro') && t.includes('max')) return 4
              if (t.includes('pro')) return 3
              return 2
            }
            const seriesNum = (slug) => {
              const m = slug.match(/iphone-(\d+)/)
              if (m) return Number(m[1])
              if (slug.includes('iphone-air')) return 17
              return 0
            }
            items = [...items].sort((a,b) => {
              const sa = seriesNum(a.slug)
              const sb = seriesNum(b.slug)
              if (sa !== sb) return sa - sb
              const ta = typeWeight(a.slug)
              const tb = typeWeight(b.slug)
              return ta - tb
            })
          }
          if (items.length === 0) return null
          const catTheme = themeMap[cat] || { banner: 'from-slate-700 to-slate-500', ring: 'ring-slate-200', heading: 'text-slate-800', card: 'border-slate-200 bg-slate-50/40' }
          return (
            <section key={cat} id={ids[cat]} className="mb-10">
              <div className={`h-2 rounded-full bg-gradient-to-r ${catTheme.banner} mb-4`} />
              <h2 className={`text-2xl font-semibold mb-4 ${catTheme.heading}`}>{titles[cat] || cat}</h2>
              <div className={`rounded-xl ring-1 ${catTheme.ring} p-3 bg-white/80 backdrop-blur-sm`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map(p => (
                    <ProductCard key={p.id} product={p} showSpecs={false} />
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <a href="#top" className="text-sm text-royal hover:underline">Volver arriba</a>
              </div>
            </section>
          )
        })}
      </main>
      {/* Botón flotante móvil: Volver arriba */}
      <a
        href="#top"
        aria-label="Volver arriba"
        className="sm:hidden fixed bottom-4 right-4 z-50 rounded-full px-4 py-3 shadow-lg text-white"
        style={{ background: 'var(--color-accent)' }}
      >
        ↑
      </a>
    </div>
  )
}
