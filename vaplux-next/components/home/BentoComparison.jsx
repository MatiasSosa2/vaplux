import { useMemo, useState } from 'react'
import Link from 'next/link'
import HoverGlow from '@/components/effects/HoverGlow'

const MODELS = {
  iphone17: {
    key: 'iphone17',
    name: 'iPhone 17',
    accent: '#C8C2B8',
    glow: 'rgba(200,194,184,0.35)',
    label: 'Titanium',
    specs: {
      camera: '48MP · Telephoto 5x · Sensor mejorado',
      chip: 'A19 · Neural Engine',
      battery: 'Hasta 20h de video',
      sizes: '6.1″ · 6.7″',
      material: 'Titanio grado 5',
    },
  },
  iphone17pro: {
    key: 'iphone17pro',
    name: 'iPhone 17 Pro',
    accent: '#D1D5DB',
    glow: 'rgba(209,213,219,0.35)',
    label: 'Silver',
    specs: {
      camera: '48MP · Telephoto 5x · ProRAW',
      chip: 'A19 Pro · GPU avanzada',
      battery: 'Hasta 23h de video',
      sizes: '6.1″ · 6.7″',
      material: 'Titanio + Cerámica',
    },
  },
  iphone17promax: {
    key: 'iphone17promax',
    name: 'iPhone 17 Pro Max',
    accent: '#1F2937',
    glow: 'rgba(31,41,55,0.45)',
    label: 'Black',
    specs: {
      camera: '48MP · Telephoto 5x · Macro mejorado',
      chip: 'A19 Pro · ProMotion 120Hz',
      battery: 'Hasta 26h de video',
      sizes: '6.7″',
      material: 'Titanio negro',
    },
  },
}

export default function BentoComparison(){
  const [selected, setSelected] = useState('iphone17pro')
  const model = MODELS[selected]
  const accentVars = useMemo(() => ({
    '--accent': model.accent,
    '--glow': model.glow,
  }), [model])

  const Card = ({ children, className = '' }) => (
    <HoverGlow className={className} accent={model.glow} radius={180}>
      <div className="p-6 hover:scale-[1.01] transition-transform duration-300">
        {children}
      </div>
    </HoverGlow>
  )

  return (
    <section className="relative w-full py-16 bg-tech-navy">
      <div className="max-w-6xl mx-auto px-4">
        {/* Selector de modelos */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {Object.values(MODELS).map(m => (
            <button
              key={m.key}
              onClick={() => setSelected(m.key)}
              className={`px-4 py-2 rounded-full text-sm transition border ${selected === m.key ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10'} hover:bg-white/10`}
              style={selected === m.key ? { boxShadow: `0 0 0 1px ${m.accent}` } : undefined}
            >
              {m.name} · {m.label}
            </button>
          ))}
        </div>

        {/* Grid Bento */}
        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[1fr] gap-4 text-white/90">
          {/* Tarjeta vertical comparativa de tamaños (col-span-2, row-span-2) */}
          <Card className="md:col-span-2 md:row-span-2">
            <h3 className="text-lg font-semibold">Tamaños de Pantalla</h3>
            <p className="text-white/70 mt-1">Comparativa de 6.1″ y 6.7″</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-28 w-16 rounded-lg bg-white/10" />
                <div>
                  <div className="text-sm">6.1″ · compacto</div>
                  <div className="text-xs text-white/60">Ideal para uso con una mano</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-36 w-20 rounded-lg bg-white/10" />
                <div>
                  <div className="text-sm">6.7″ · amplio</div>
                  <div className="text-xs text-white/60">Mejor experiencia multimedia</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tarjeta grande cámara (col-span-4, row-span-2) */}
          <Card className="md:col-span-4 md:row-span-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Cámara Telephoto</h3>
                <p className="text-white/70 mt-1">{model.specs.camera}</p>
              </div>
              <span className="glass-badge">Macro</span>
            </div>
            <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
              <div
                className="h-64 w-full bg-white/5"
                style={{
                  backgroundImage: `radial-gradient(120px circle at var(--mx) var(--my), var(--glow) 0%, transparent 60%), url('/assets/IMG_8850.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            <div className="mt-4 flex gap-3 text-sm">
              <span className="hover:scale-[1.03] transition">ProRAW</span>
              <span className="hover:scale-[1.03] transition">Zoom óptico 5x</span>
              <span className="hover:scale-[1.03] transition">Estabilización avanzada</span>
            </div>
          </Card>

          {/* Tarjeta media Chip A19 Pro (col-span-2) */}
          <Card className="md:col-span-2">
            <h3 className="text-lg font-semibold">Chip {model.specs.chip}</h3>
            <p className="text-white/70 mt-1">Rendimiento de próxima generación</p>
            <div className="mt-4 h-24 rounded-lg bg-white/5 flex items-center justify-center">
              <div
                className="h-10 w-10 rounded-full"
                style={{
                  background: `radial-gradient(closest-side, var(--glow), transparent 70%)`,
                  animation: 'pulseGlow 2.4s ease-in-out infinite',
                }}
              />
            </div>
          </Card>

          {/* Tarjeta media Batería (col-span-2) */}
          <Card className="md:col-span-2">
            <h3 className="text-lg font-semibold">Batería</h3>
            <p className="text-white/70 mt-1">{model.specs.battery}</p>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full" style={{ width: selected === 'iphone17promax' ? '95%' : selected === 'iphone17pro' ? '85%' : '75%', background: model.accent }} />
              </div>
              <span className="text-xs text-white/60">Capacidad</span>
            </div>
            <div className="mt-3 text-sm">
              <span className="hover:scale-[1.03] transition">Carga rápida</span>
            </div>
          </Card>

          {/* CTA dinámico */}
          <div className="md:col-span-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Modelo seleccionado: <span className="text-white">{model.name} · {model.label}</span></div>
              <Link
                href={`/catalog/iphone`}
                className="btn-cta btn-cta-primary"
                style={{
                  background: `linear-gradient(90deg, ${model.accent} 0%, ${model.accent} 100%)`,
                  color: '#050505',
                  boxShadow: `0 0 24px ${model.glow}`,
                }}
              >
                Comprar ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
