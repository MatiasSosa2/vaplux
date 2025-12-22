import Navbar from '@/components/Navbar'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import FilterBar from '@/components/FilterBar'
import { useState, useMemo } from 'react'

export default function CatalogIphone(){
  const [filters, setFilters] = useState({ query: '', priceMax: 9999999, sort: 'relevance' })
  const items = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    let list = products.filter(p => p.category === 'iPhone')
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
    // Orden por serie y modelo (mini/base/plus/pro/pro max, Air como 17)
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
    list = [...list].sort((a,b) => {
      const sa = seriesNum(a.slug)
      const sb = seriesNum(b.slug)
      if (sa !== sb) return sa - sb
      const ta = typeWeight(a.slug)
      const tb = typeWeight(b.slug)
      return ta - tb
    })
    return list
  }, [filters])
  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-6 rounded-xl ring-1 ring-blue-200 bg-white/80 backdrop-blur-sm p-3"><FilterBar onChange={setFilters} initial={filters} accent="blue" /></div>
        <div className="h-2 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 mb-4" />
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">iPhones</h2>
        <div className="rounded-xl ring-1 ring-blue-200 p-3 bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(p => <ProductCard key={p.id} product={p} showSpecs />)}
          </div>
        </div>
      </main>
    </div>
  )
}