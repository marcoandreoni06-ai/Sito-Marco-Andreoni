import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ReactLenis, useLenis } from 'lenis/react'
import Header from './components/Header'
import Footer from './components/Footer'
import Cursor from './components/fx/Cursor'
import Grain from './components/fx/Grain'
import ScrollTopArrow from './components/ScrollTopArrow'

const Home = lazy(() => import('./pages/Home'))
const ChiSono = lazy(() => import('./pages/ChiSono'))
const Contatti = lazy(() => import('./pages/Contatti'))

const prefersReduced = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <ReactLenis root options={{ lerp: prefersReduced ? 1 : 0.08, smoothWheel: !prefersReduced }}>
      <div className="relative flex min-h-screen flex-col app-fade-in">
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
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/chi-sono" element={<ChiSono />} />
                <Route path="/contatti" element={<Contatti />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ReactLenis>
  )
}
