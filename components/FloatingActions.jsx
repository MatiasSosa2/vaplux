export default function FloatingActions(){
  const wa = 'https://wa.me/5492216703630?text=Hola!%20Quiero%20consultar%20por%20un%20producto%20de%20Vaplux.'
  return (
    <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
      <a
        href="#top"
        aria-label="Volver arriba"
        className="hidden sm:grid place-items-center h-10 w-10 rounded-full bg-white border border-[#001B3D] text-[#001B3D] shadow-md hover:bg-[#001B3D] hover:text-white"
      >↑</a>
      <a
        href={wa}
        aria-label="WhatsApp"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg text-white"
        style={{ background: '#25D366' }}
      >
        W
      </a>
    </div>
  )
}
