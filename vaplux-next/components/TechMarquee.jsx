export default function TechMarquee(){
  const brands = [
    'Apple', 'Sony', 'JBL', 'Vozol', 'GeekBar', 'Ignite', 'Lost Mary', 'MagSafe'
  ]
  return (
    <div className="relative py-6 bg-white/60 border-y border-mistGray/60">
      <div className="overflow-hidden">
        <div className="marquee select-none opacity-70">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 pr-12">
              {brands.map((b, i) => (
                <span key={idx+'-'+i} className="text-sm tracking-wider text-slateInk/70">{b}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
