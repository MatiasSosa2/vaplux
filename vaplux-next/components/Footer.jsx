import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Footer(){
  const router = useRouter()
  return (
    <footer className="mt-16 border-t border-black/20 bg-[#1F2937]">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={`${router.basePath || ''}/assets/logo.PNG`} alt="Vaplux" className="h-8 w-8 rounded-md shadow" />
            <h3 className="font-semibold text-white">Vaplux</h3>
          </div>
          <p className="text-sm text-gray-300">Tecnología premium y soporte real por WhatsApp.</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Explorar</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:underline text-gray-200 hover:text-white" href="/catalog/iphone/">iPhones</Link></li>
            <li><Link className="hover:underline text-gray-200 hover:text-white" href="/catalog/electronica/">Tecnología</Link></li>
            {/* Vapes eliminado del catálogo */}
            <li><Link className="hover:underline text-gray-200 hover:text-white" href="/catalog/varios/">Accesorios</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Servicio Técnico</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="inline-flex items-center gap-2 hover:underline text-gray-200 hover:text-white" href="/services/reparacion-iphones">🔧 Reparación de iPhones</Link></li>
            <li><Link className="inline-flex items-center gap-2 hover:underline text-gray-200 hover:text-white" href="/services/trabaja-con-nosotros">💼 Trabajá con Nosotros</Link></li>
            <li><Link className="inline-flex items-center gap-2 hover:underline text-gray-200 hover:text-white" href="/services">Ver todos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Empresa</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:underline text-gray-200 hover:text-white" href="/">Inicio</Link></li>
            <li><Link className="hover:underline text-gray-200 hover:text-white" href="/cart/">Carrito</Link></li>
            <li><Link className="hover:underline text-gray-200 hover:text-white" href="/contacto">Contacto</Link></li>
            <li><span className="text-gray-400">Lun a Sáb 10-19h</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/30">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Vaplux</span>
          <div className="flex items-center gap-3">
            <Link className="hover:underline hover:text-white" href="/catalog/">Explorar</Link>
            <Link className="hover:underline hover:text-white" href="/services">Servicio Técnico</Link>
            <Link className="hover:underline hover:text-white" href="/cart/">Carrito</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
