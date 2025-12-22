import { useEffect, useRef, useState } from 'react'

export default function Spotlight({ color = 'rgba(27,152,224,0.28)', radius = 260 }){
  const [style, setStyle] = useState({ background: `radial-gradient(${radius}px ${radius}px at -9999px -9999px, ${color}, transparent 65%)` })
  const rafRef = useRef(null)
  const pendingRef = useRef({ x: -9999, y: -9999 })
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const schedule = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const { x, y } = pendingRef.current
        setStyle({ background: `radial-gradient(${radius}px ${radius}px at ${x}px ${y}px, ${color}, transparent 65%)` })
        rafRef.current = null
      })
    }

    const onMove = (e) => {
      if (reduceMotion.current) return
      pendingRef.current = { x: e.clientX, y: e.clientY }
      schedule()
    }
    const onTouch = (e) => {
      if (reduceMotion.current) return
      const t = e.touches?.[0]
      if (t) {
        pendingRef.current = { x: t.clientX, y: t.clientY }
        schedule()
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [color, radius])

  return (
    <div aria-hidden="true" className="fixed inset-0 z-30 pointer-events-none mix-blend-screen will-change-[background]" style={style} />
  )
}
