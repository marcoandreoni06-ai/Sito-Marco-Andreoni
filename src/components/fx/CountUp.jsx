import { useEffect, useRef, useState } from 'react'

/** Counts from 0 → `value` once it scrolls into view (RAF + IntersectionObserver). */
export default function CountUp({ value, decimals = 0, duration = 1700, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) {
          setDisplay(value)
          observer.disconnect()
          return
        }
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(value * eased)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString('it-IT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
