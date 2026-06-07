import { useEffect, useRef, useState } from 'react'

const variants = {
  'fade-up': 'reveal-fade-up',
  fade: 'reveal-fade',
  'scale-in': 'reveal-scale-in',
  clip: 'reveal-clip',
  'pixel-step': 'reveal-pixel-step',
}

/**
 * Scroll-triggered reveal. Adds `.is-visible` when the element enters the
 * viewport, kicking off a CSS keyframe defined in index.css.
 */
export default function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  threshold = 0.06,
  once = true,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin: '0px 0px -3% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <Tag
      ref={ref}
      className={`reveal ${variants[variant] || variants['fade-up']}${visible ? ' is-visible' : ''}${className ? ' ' + className : ''}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
