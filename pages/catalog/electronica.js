import Navbar from '@/components/Navbar'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import FilterBar from '@/components/FilterBar'
import { useState, useMemo } from 'react'

export default function CatalogElectronica(){
  const [filters, setFilters] = useState({ query: '', priceMax: 9999999, sort: 'relevance' })
  const items = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    let list = products.filter(p => p.category === 'Electrónica')
      .filter(p => (q === '' || p.name.toLowerCase().includes(q) || (p.specs||[]).join(' ').toLowerCase().includes(q))
        && p.price <= (filters.priceMax || 9999999))
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
  
  const sectionFor = (p) => {
    const n = (p.name || '').toLowerCase()
    if (/(airpods|jbl|auriculares|parlante)/i.test(p.name)) return 'Audio'
    if (/(playstation|ps5|joystick|game stick)/i.test(p.name)) return 'Gaming y Consolas'
    if (/(tv stick|tv box|proyector|magis)/i.test(p.name)) return 'Streaming y TV'
    if (/(poco|redmi|watch|smartwatch)/i.test(p.name)) return 'Smartphones y Relojes'
    return 'Otros'
  }
  const order = ['Audio','Gaming y Consolas','Streaming y TV','Smartphones y Relojes','Otros']
  const grouped = order.map(sec => ({
    title: sec,
    items: items.filter(p => sectionFor(p) === sec)
  })).filter(g => g.items.length > 0)
  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-6 rounded-xl ring-1 ring-indigo-200 bg-white/80 backdrop-blur-sm p-3"><FilterBar onChange={setFilters} initial={filters} accent="indigo" /></div>
        <div className="h-2 rounded-full bg-gradient-to-r from-indigo-700 via-violet-600 to-cyan-500 mb-4" />
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Electrónica</h2>
        {grouped.map(group => (
          <section key={group.title} className="mb-8">
            <div className="h-1 rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 mb-3" />
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">{group.title}</h3>
            <div className="rounded-xl ring-1 ring-indigo-200 p-3 bg-white/80 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map(p => <ProductCard key={p.id} product={p} showSpecs />)}
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}