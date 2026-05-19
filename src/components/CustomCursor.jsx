import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    function onMove(e) {
      el.style.translate = `${e.clientX}px ${e.clientY}px`
    }

    function onOver() { el.classList.add('scale-[1.8]') }
    function onOut()  { el.classList.remove('scale-[1.8]') }

    window.addEventListener('mousemove', onMove)
    const interactives = document.querySelectorAll('a, button, input, textarea, select')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onOver)
      el.addEventListener('mouseleave', onOut)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onOver)
        el.removeEventListener('mouseleave', onOut)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out"
    >
      <div className="absolute -inset-1.5 rounded-full backdrop-invert" />
      <div className="relative w-7 h-7 bg-[url(/cursor.png)] bg-center bg-contain bg-no-repeat" />
    </div>
  )
}
