import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Cursor from './components/fx/Cursor'
import Grain from './components/fx/Grain'
import ScrollTopArrow from './components/ScrollTopArrow'

const Home = lazy(() => import('./pages/Home'))
const ChiSono = lazy(() => import('./pages/ChiSono'))
const Contatti = lazy(() => import('./pages/Contatti'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Grain />
      <Cursor />
      <ScrollToTop />
      <ScrollTopArrow />
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[70vh] items-center justify-center">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-line-strong border-t-ink" />
            </div>
          }
        >
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
