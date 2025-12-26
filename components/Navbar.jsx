import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { useCart } from '@/context/CartContext'

export default function Navbar(){
  const { totalItems, toggleCart } = useCart()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const mobilePanelRef = useRef(null)
  // Desktop dropdown states + close timers
  const [exploreOpen, setExploreOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const exploreCloseTimer = useRef(null)
  const servicesCloseTimer = useRef(null)
  const CLOSE_DELAY = 1000 // ms: 300ms menos, cierre más ágil

  

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false); setMobileExploreOpen(false); setMobileServicesOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open && mobilePanelRef.current) {
      const focusable = mobilePanelRef.current.querySelector('a, button')
      focusable && focusable.focus()
    }
  }, [open])

  useEffect(() => {
    return () => {
      if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current)
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    }
  }, [])

  const isCatalog = router.pathname.startsWith('/catalog')
  const isServices = router.pathname.startsWith('/services')
  const isContact = router.pathname.startsWith('/contacto')

  return (
    <nav role="navigation" aria-label="Navegación principal" className={`sticky top-0 w-full z-[2000] nav-glass border-b border-[#E3E8EF] header-underlight`}>
      <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-[0.8125rem] grid grid-cols-2 md:grid-cols-3 items-center`}>
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2">
            <img src={`${router.basePath || ''}/assets/logo.PNG`} alt="Vaplux" className={`h-8 w-8 rounded-md shadow`} />
            <span className={`font-semibold text-[#0f172a] text-[0.95rem] md:text-[1.3rem]`}>Vaplux</span>
          </Link>
        </div>
        <ul className="hidden md:flex items-center justify-center gap-6" role="menubar">
            {/* Dropdown Explorar (desktop, con delay de cierre) */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current)
                // Abrir Explorar y cerrar Servicios inmediatamente
                setExploreOpen(true)
                if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                if (servicesOpen) setServicesOpen(false)
              }}
              onMouseLeave={() => {
                if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current)
                exploreCloseTimer.current = setTimeout(() => setExploreOpen(false), CLOSE_DELAY)
              }}
            >
              <Link
                className={`text-[#0f172a] text-xs md:text-sm inline-flex items-center gap-1 link-underline nav-item px-3 py-1`}
                href="/catalog/"
                aria-current={isCatalog ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  // Abrir Explorar y cerrar Servicios inmediatamente
                  setExploreOpen(true);
                  if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current)
                  if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                  if (servicesOpen) setServicesOpen(false)
                }}
                aria-expanded={exploreOpen}
              >
                Productos <span className="text-[#1B98E0]/80">▾</span>
              </Link>
              <div
                className={`absolute top-full left-0 mt-2 min-w-[220px] rounded-lg border border-[#E3E8EF] dropdown-glass p-2 shadow-xl z-[3000] transition-opacity duration-200 ${exploreOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
                onMouseEnter={() => {
                  if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current)
                  // Mientras está abierto Explorar, asegurar que Servicios esté cerrado
                  if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                  if (servicesOpen) setServicesOpen(false)
                }}
                onMouseLeave={() => {
                  if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current)
                  exploreCloseTimer.current = setTimeout(() => setExploreOpen(false), CLOSE_DELAY)
                }}
              >
                <Link className="block px-3 py-2 rounded hover:bg-black/5 text-[#0f172a]" href="/catalog/">Ver todo</Link>
                <Link className="block px-3 py-2 rounded hover:bg-black/5 text-[#0f172a]" href="/catalog/iphone">iPhones</Link>
                <Link className="block px-3 py-2 rounded hover:bg-black/5 text-[#0f172a]" href="/catalog/electronica">Tecnología</Link>
                {/* Vapes eliminado del catálogo */}
                <Link className="block px-3 py-2 rounded hover:bg-black/5 text-[#0f172a]" href="/catalog/varios">Accesorios</Link>
              </div>
            </div>

            {/* Dropdown Servicio Técnico */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                // Abrir Servicios y cerrar Explorar inmediatamente
                setServicesOpen(true)
                if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current)
                if (exploreOpen) setExploreOpen(false)
              }}
              onMouseLeave={() => {
                if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), CLOSE_DELAY)
              }}
            >
                <Link
                  className={`text-[#0f172a] text-xs md:text-sm inline-flex items-center gap-1 link-underline nav-item px-3 py-1`}
                  href="/services"
                  aria-current={isServices ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    // Abrir Servicios y cerrar Explorar inmediatamente
                    setServicesOpen(true);
                    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                    if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current)
                    if (exploreOpen) setExploreOpen(false)
                  }}
                  aria-expanded={servicesOpen}
                >
                  Servicios <span className="text-[#1B98E0]/80">▾</span>
              </Link>
              <div
                className={`absolute top-full left-0 mt-2 min-w-[260px] rounded-lg border border-[#E3E8EF] dropdown-glass p-2 shadow-xl z-[3000] transition-opacity duration-200 ${servicesOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
                onMouseEnter={() => {
                  if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                  // Mientras está abierto Servicios, asegurar que Explorar esté cerrado
                  if (exploreCloseTimer.current) clearTimeout(exploreCloseTimer.current)
                  if (exploreOpen) setExploreOpen(false)
                }}
                onMouseLeave={() => {
                  if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                  servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), CLOSE_DELAY)
                }}
              >
                <Link className="block px-3 py-2 rounded hover:bg-black/5 text-[#0f172a]" href="/services/reparacion-iphones">Reparación de iPhones</Link>
                <Link className="block px-3 py-2 rounded hover:bg-black/5 text-[#0f172a]" href="/services/trabaja-con-nosotros">Trabajá con Nosotros</Link>
                <Link className="block px-3 py-2 rounded hover:bg-black/5 text-[#0f172a]" href="/services">Ver todos los servicios</Link>
              </div>
            </div>

            {/* Link Contacto */}
            <li>
              <Link className={`text-[#0f172a] text-xs md:text-sm inline-flex items-center gap-1 link-underline nav-item px-3 py-1`} href="/contacto" aria-current={isContact ? 'page' : undefined}>
                Contacto
              </Link>
            </li>
        </ul>
        <div className="flex items-center justify-end gap-1 md:gap-3">
          {/* Search siempre visible */}
          <div className="hidden md:flex items-center gap-2">
            <span className={`text-[#0f172a]`}>🔎</span>
            <input aria-label="Buscar productos" placeholder="Buscar en el catálogo" className={`nav-search-light`} />
          </div>
          {/* Carrito móvil a la izquierda del menú */}
          <button className={`md:hidden inline-flex text-[#0f172a]`} onClick={toggleCart} aria-label="Abrir carrito">
            <div className="relative inline-flex items-center gap-2">
              <span className={`text-[#0f172a]`}>🛒</span>
              <span className={`rounded-full border px-2 py-0.5 text-xs ${totalItems ? 'bg-[#1B98E0]/10 border-[#1B98E0] text-[#1B98E0]' : 'bg-black/5 border-[#E3E8EF] text-[#0f172a]/80'}`}>{totalItems || 0}</span>
            </div>
          </button>
          <button className={`md:hidden text-[#0f172a] text-xl`} onClick={() => setOpen(v => !v)} aria-label="Abrir menú">☰</button>
          {/* Carrito desktop */}
          <button className={`hidden md:inline-flex hover:underline text-[#0f172a]`} onClick={toggleCart} aria-label="Abrir carrito">
            <div className="relative inline-flex items-center gap-2">
              <span className={`text-[#0f172a]`}>🛒</span>
              <span className={`rounded-full border px-2 py-0.5 text-xs ${totalItems ? 'bg-[#1B98E0]/10 border-[#1B98E0] text-[#1B98E0]' : 'bg-black/5 border-[#E3E8EF] text-[#0f172a]/80'}`}>{totalItems || 0}</span>
            </div>
          </button>
        </div>
      </div>
      {/* linea inferior removida para mantener limpieza visual */}
      {/* menú mobile */}
      {open && (
        <div className="md:hidden border-t border-[#E3E8EF] bg-white/95 backdrop-blur" aria-modal="true" role="dialog">
          <div ref={mobilePanelRef} className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2 text-[#0f172a]">
            {/* Búsqueda mobile fija (arriba del menú) */}
            <div className="flex items-center gap-2 mb-2">
              <span>🔎</span>
              <input aria-label="Buscar productos" placeholder="Buscar en el catálogo" className="w-full rounded-md px-3 py-2 bg-black/5 border border-[#E3E8EF] text-[#0f172a] placeholder:text-[#0f172a]/60" />
            </div>
            {/* Explorar - mobile */}
            <button
              className="flex items-center justify-between w-full py-2"
              onClick={() => {
                // Exclusividad en mobile: abrir Explorar cierra Servicios
                setMobileExploreOpen(v => {
                  const next = !v
                  if (next) setMobileServicesOpen(false)
                  return next
                })
              }}
              aria-expanded={mobileExploreOpen}
            >Explorar <span>{mobileExploreOpen ? '▴' : '▾'}</span></button>
            {mobileExploreOpen && (
              <div className="pl-3 flex flex-col gap-2 pb-2">
                <Link href="/catalog/" onClick={() => setOpen(false)} className="hover:underline">Ver todo</Link>
                <Link href="/catalog/iphone" onClick={() => setOpen(false)} className="hover:underline">iPhone</Link>
                <Link href="/catalog/electronica" onClick={() => setOpen(false)} className="hover:underline">Tecnología</Link>
                {/* Vapes eliminado del catálogo */}
                <Link href="/catalog/varios" onClick={() => setOpen(false)} className="hover:underline">Accesorios</Link>
              </div>
            )}

            {/* Servicio Técnico - mobile */}
            <button
              className="flex items-center justify-between w-full py-2"
              onClick={() => {
                // Exclusividad en mobile: abrir Servicios cierra Explorar
                setMobileServicesOpen(v => {
                  const next = !v
                  if (next) setMobileExploreOpen(false)
                  return next
                })
              }}
              aria-expanded={mobileServicesOpen}
            >Servicio Técnico <span>{mobileServicesOpen ? '▴' : '▾'}</span></button>
            {mobileServicesOpen && (
              <div className="pl-3 flex flex-col gap-2 pb-2">
                <Link href="/services" onClick={() => setOpen(false)} className="hover:underline">Ver servicios</Link>
                <Link href="/services/reparacion-iphones" onClick={() => setOpen(false)} className="hover:underline">Reparación de iPhones</Link>
                <Link href="/services/trabaja-con-nosotros" onClick={() => setOpen(false)} className="hover:underline">Trabajá con Nosotros</Link>
              </div>
            )}

            <Link href="/contacto" onClick={() => setOpen(false)} className="hover:underline inline-flex items-center gap-2 mt-1">✉️ <span>Contacto</span></Link>
          </div>
        </div>
      )}
    </nav>
  )
}
