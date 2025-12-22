import { motion } from 'framer-motion'

export default function TechTicker(){
  const content = 'IPHONES • REPARACIÓN PROFESIONAL • VAPES • ACCESORIOS PREMIUM • '

  return (
    <motion.section className="ticker-strip py-3">
      <div className="overflow-hidden">
        <div className="marquee">
          <span className="font-semibold tracking-wide">
            {content.repeat(4)}
          </span>
        </div>
      </div>
    </motion.section>
  )
}
