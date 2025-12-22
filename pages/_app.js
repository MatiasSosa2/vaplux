import '@/styles/globals.css'
import { CartProvider } from '@/context/CartContext'
import FloatingActions from '@/components/FloatingActions'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <div className={`relative min-h-full ${inter.variable} ${spaceGrotesk.variable}`}>
        <Component {...pageProps} />
        <Footer />
        <FloatingActions />
        <CartSidebar />
      </div>
    </CartProvider>
  )
}
