import { useRef, useState } from 'react'

export default function HoverGlow({
  children,
  className = '',
  radius = 180,
  accent = 'rgba(56,189,248,0.35)', // sky-400 glow por defecto
  border = true,
  padding = 1,
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPos({ x, y })
  }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      className={`relative rounded-2xl transition-transform duration-300 will-change-transform ${className}`}
      style={{
        padding: padding,
        background: hovered
          ? `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${accent} 0%, transparent 65%)`
          : 'transparent',
      }}
    >
      <div
        className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white/5 backdrop-blur"
        style={{
          border: border ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  )
}
