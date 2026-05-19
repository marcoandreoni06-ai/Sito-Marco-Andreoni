import { useState, useEffect } from 'react'

export default function ScrollTopArrow() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollTop}
      aria-label="Torna in cima"
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center text-accent-orange transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg viewBox="0 0 16 16" className="w-7 h-7 fill-current">
        <rect x="6" y="0" width="4" height="3" />
        <rect x="4" y="3" width="8" height="3" />
        <rect x="2" y="6" width="12" height="3" />
        <rect x="6" y="9" width="4" height="7" />
      </svg>
    </button>
  )
}
