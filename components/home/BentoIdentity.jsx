import Image from 'next/image'
import { motion } from 'framer-motion'

const BLUR_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyNmZmYnLz48L3N2Zz4='

export default function BentoIdentity(){
  return (
    <motion.section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* iPhone block row-span-2 */}
        <div className="md:row-span-2 inner-glow-hover rounded-2xl p-6 bg-white">
          <h3 className="heading text-[#001B3D] text-2xl font-bold mb-3">iPhone</h3>
          <div className="relative w-full h-[280px]">
            <Image src="/assets/iPhone16Pro/iPhone16pro.webp" alt="iPhone" fill placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-contain" unoptimized />
          </div>
        </div>
        {/* Vapes */}
        <div className="inner-glow-hover rounded-2xl p-6 bg-white">
          <h3 className="heading text-[#001B3D] text-2xl font-bold mb-3">Vapes</h3>
          <div className="relative w-full h-[180px]">
            <Image src="/assets/delta11.jpg" alt="Vapes" fill placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover" unoptimized />
          </div>
        </div>
        {/* Electrónica */}
        <div className="inner-glow-hover rounded-2xl p-6 bg-white">
          <h3 className="heading text-[#001B3D] text-2xl font-bold mb-3">Electrónica</h3>
          <div className="relative w-full h-[180px]">
            <Image src="/assets/PS5.jpg" alt="Electrónica" fill placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover" unoptimized />
          </div>
        </div>
        {/* Accesorios */}
        <div className="inner-glow-hover rounded-2xl p-6 bg-white">
          <h3 className="heading text-[#001B3D] text-2xl font-bold mb-3">Accesorios</h3>
          <div className="relative w-full h-[180px]">
            <Image src="/assets/Fundas%20Mag%20Safe.jpg" alt="Accesorios" fill placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover" unoptimized />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
