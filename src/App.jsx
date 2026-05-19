import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollTopArrow from './components/ScrollTopArrow'

const Home = lazy(() => import('./pages/Home'))
const ChiSono = lazy(() => import('./pages/ChiSono'))
const Contatti = lazy(() => import('./pages/Contatti'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <ScrollToTop />
      <CustomCursor />
      <ScrollTopArrow />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-4 border-brand-black/20 border-t-brand-black rounded-full animate-spin" /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chi-sono" element={<ChiSono />} />
            <Route path="/contatti" element={<Contatti />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
