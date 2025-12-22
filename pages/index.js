import Navbar from '@/components/Navbar'
import HeroVisual from '@/components/home/HeroVisual'
import TechTicker from '@/components/home/TechTicker'
import ServicePrecision from '@/components/home/ServicePrecision'
import ProductCarousel from '@/components/home/ProductCarousel'
import ServiceGallery from '@/components/home/ServiceGallery'

export default function Home(){
  return (
    <div className="home-celeste">
      <Navbar />
      <HeroVisual />
      <TechTicker />
      <ProductCarousel />
      <ServicePrecision />
      <ServiceGallery />
    </div>
  )
}
