import { useState, useEffect } from 'react'

export default function FilterBar({ onChange, initial = {}, accent = 'blue' }){
  const [query, setQuery] = useState(initial.query || '')
  const [priceMin, setPriceMin] = useState(initial.priceMin ?? 0)
  const [priceMax, setPriceMax] = useState(initial.priceMax ?? 9999999)
  const [sort, setSort] = useState(initial.sort || 'relevance')
  const [tag, setTag] = useState(initial.tag || '')

  useEffect(() => {
    onChange?.({ query, priceMin: Number(priceMin), priceMax: Number(priceMax), sort, tag })
  }, [query, priceMin, priceMax, sort, tag])

  const styles = {
    blue: {
      container: 'bg-gradient-to-r from-blue-50 via-white to-cyan-50 ring-2 ring-blue-200',
      inputFocus: 'focus:ring-blue-400',
      selectFocus: 'focus:ring-blue-400',
      inputBg: 'bg-white text-blue-900 placeholder-blue-500/80',
      selectBg: 'bg-white text-blue-900',
      activeBtn: 'bg-white border-2 border-blue-600 text-blue-800 shadow-sm',
      inactiveBtn: 'bg-white border-blue-300 text-blue-800 hover:bg-white hover:border-blue-500'
    },
    indigo: {
      container: 'bg-gradient-to-r from-indigo-50 via-white to-cyan-50 ring-2 ring-indigo-200',
      inputFocus: 'focus:ring-indigo-400',
      selectFocus: 'focus:ring-indigo-400',
      inputBg: 'bg-white text-indigo-900 placeholder-violet-500/80',
      selectBg: 'bg-white text-indigo-900',
      activeBtn: 'bg-white border-2 border-indigo-600 text-indigo-800 shadow-sm',
      inactiveBtn: 'bg-white border-indigo-300 text-indigo-800 hover:bg-white hover:border-indigo-500'
    },
    pink: {
      container: 'bg-gradient-to-r from-pink-50 via-white to-rose-50 ring-2 ring-pink-200',
      inputFocus: 'focus:ring-pink-400',
      selectFocus: 'focus:ring-pink-400',
      inputBg: 'bg-white text-pink-900 placeholder-rose-500/80',
      selectBg: 'bg-white text-pink-900',
      activeBtn: 'bg-white border-2 border-pink-600 text-pink-800 shadow-sm',
      inactiveBtn: 'bg-white border-pink-300 text-pink-800 hover:bg-white hover:border-pink-500'
    },
    emerald: {
      container: 'bg-gradient-to-r from-emerald-50 via-white to-green-50 ring-2 ring-emerald-200',
      inputFocus: 'focus:ring-emerald-400',
      selectFocus: 'focus:ring-emerald-400',
      inputBg: 'bg-white text-emerald-900 placeholder-teal-500/80',
      selectBg: 'bg-white text-emerald-900',
      activeBtn: 'bg-white border-2 border-emerald-600 text-emerald-800 shadow-sm',
      inactiveBtn: 'bg-white border-emerald-300 text-emerald-800 hover:bg-white hover:border-emerald-500'
    }
  }[accent] || {
    container: 'bg-gradient-to-r from-slate-50 to-slate-100 ring-2 ring-slate-300',
    inputFocus: 'focus:ring-cyan-400',
    selectFocus: 'focus:ring-cyan-400',
    inputBg: 'bg-slate-50/70 text-slate-900 placeholder-slate-500/80',
    selectBg: 'bg-slate-50/70 text-slate-900',
    activeBtn: 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white border-cyan-600',
    inactiveBtn: 'bg-white/70 border-slate-300 text-navy hover:bg-slate-50 hover:border-cyan-500'
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-xl p-4 shadow-sm ${styles.container}`}>
      <input
        type="text"
        placeholder="Buscar productos..."
        className={`flex-1 min-w-[200px] px-3 py-2 rounded-md border border-gray-300 focus:ring-2 ${styles.inputFocus} focus:ring-offset-2 focus:ring-offset-white ${styles.inputBg}`}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          placeholder="Precio mín"
          className={`w-28 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 ${styles.inputFocus} focus:ring-offset-2 focus:ring-offset-white ${styles.inputBg}`}
          value={priceMin}
          onChange={e => setPriceMin(Number(e.target.value))}
        />
        <span className="text-navy/60">–</span>
        <input
          type="number"
          min="0"
          placeholder="Precio máx"
          className={`w-28 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 ${styles.inputFocus} focus:ring-offset-2 focus:ring-offset-white ${styles.inputBg}`}
          value={priceMax}
          onChange={e => setPriceMax(Number(e.target.value))}
        />
      </div>

      <select
        className={`px-3 py-2 rounded-lg border border-[#E3E8EF] dropdown-glass focus:ring-2 ${styles.selectFocus} focus:ring-offset-2 focus:ring-offset-white ${styles.selectBg} text-[#0f172a]`}
        value={sort}
        onChange={e => setSort(e.target.value)}
      >
        <option value="relevance">Relevancia</option>
        <option value="price-asc">Precio: bajo a alto</option>
        <option value="price-desc">Precio: alto a bajo</option>
        <option value="name-asc">Nombre: A-Z</option>
        <option value="name-desc">Nombre: Z-A</option>
        <option value="new">Novedades</option>
      </select>

      <div className="flex flex-wrap gap-2">
        {['PRO','PLUS','MAX','AIR','NUEVO'].map(label => {
          const active = tag === label
          const base = "px-3 py-2 rounded-full text-sm border transition"
          const activeCls = styles.activeBtn
          const inactiveCls = `${styles.inactiveBtn} ring-1 ring-transparent`
          return (
            <button
              key={label}
              type="button"
              className={`${base} ${active ? activeCls : inactiveCls}`}
              onClick={() => setTag(active ? '' : label)}
            >{label}</button>
          )
        })}
      </div>
    </div>
  )
}
