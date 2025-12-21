import Navbar from '@/components/Navbar'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import FilterBar from '@/components/FilterBar'
import { useState, useMemo } from 'react'

export default function CatalogVarios(){
  const [filters, setFilters] = useState({ query: '', priceMax: 9999999, sort: 'relevance' })
  const items = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    // Filtrar solo productos de la categoría 'Varios'
    let list = products.filter(p => p.category === 'Varios')
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
  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        
        <div className="mb-6 rounded-xl ring-1 ring-emerald-200 bg-white/80 backdrop-blur-sm p-3"><FilterBar onChange={setFilters} initial={filters} accent="emerald" /></div>
        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-700 via-teal-600 to-green-500 mb-4" />
        <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Accesorios & Varios</h2>
        <div className="rounded-xl ring-1 ring-emerald-200 p-3 bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(p => <ProductCard key={p.id} product={p} showSpecs />)}
          </div>
        </div>
      </main>
    </div>
  )
}