import { useEffect, useState } from 'react'

export default function ScrollTopArrow() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Torna in cima"
      // position:fixed inline so it beats `.grad-ring { position: relative }`
      // (unlayered custom class would otherwise override the Tailwind `fixed` utility)
      style={{ position: 'fixed' }}
      className={`grad-ring glass bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-ink transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      {/* pixel-art up arrow — a nod to the brand's arcade identity */}
      <svg viewBox="0 0 16 16" className="h-5 w-5 fill-current" aria-hidden="true">
        <rect x="6" y="0" width="4" height="3" />
        <rect x="4" y="3" width="8" height="3" />
        <rect x="2" y="6" width="12" height="3" />
        <rect x="6" y="9" width="4" height="7" />
      </svg>
    </button>
  )
}
