import { useEffect, useRef } from 'react'

/**
 * Premium custom cursor: a difference-blended ring + dot that grows over
 * interactive elements. Disabled on touch / coarse pointers.
 */
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    document.documentElement.classList.add('cursor-on')
    const r = ring.current
    const d = dot.current
    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let dx = rx
    let dy = ry
    let tx = rx
    let ty = ry
    let raf

    function loop() {
      // dot tracks instantly, ring eases behind for a trailing feel
      dx += (tx - dx) * 0.85
      dy += (ty - dy) * 0.85
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      if (d) d.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`
      if (r) r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    function onMove(e) {
      tx = e.clientX
      ty = e.clientY
      r?.classList.remove('is-hidden')
      d?.classList.remove('is-hidden')
    }
    function onLeave() {
      r?.classList.add('is-hidden')
      d?.classList.add('is-hidden')
    }
    function onOver(e) {
      if (e.target.closest('a, button, input, textarea, select, [data-cursor]')) {
        r?.classList.add('is-active')
      }
    }
    function onOut(e) {
      if (e.target.closest('a, button, input, textarea, select, [data-cursor]')) {
        r?.classList.remove('is-active')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('cursor-on')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring is-hidden" aria-hidden="true" />
      <div ref={dot} className="cursor-dot is-hidden" aria-hidden="true" />
    </>
  )
}
