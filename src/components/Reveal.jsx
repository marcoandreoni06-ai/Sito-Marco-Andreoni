import { useEffect, useRef, useState } from 'react'

const variants = {
  'fade-up': 'reveal-fade-up',
  'pixel-step': 'reveal-pixel-step',
  'scale-in': 'reveal-scale-in',
}

export default function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  threshold = 0.15,
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
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      className={`reveal ${variants[variant]}${visible ? ' visible' : ''}${className ? ' ' + className : ''}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
