import { useEffect, useRef } from 'react'

/**
 * A framed, lazily-played video showpiece. The brand's AI-generated clips are
 * treated as cinematic art (object-cover, gradient ring, soft vignette) rather
 * than washed-out backgrounds.
 */
export default function VideoFrame({
  src,
  poster,
  className = '',
  ring = true,
  priority = false,
  overlay = true,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Play through exactly once, then freeze on the last frame (no looping).
    if (priority) {
      el.play?.().catch(() => {})
      return
    }
    let played = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true
          el.play?.().catch(() => {})
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [priority])

  return (
    <div
      className={`relative overflow-hidden bg-cream ${ring ? 'grad-ring' : ''} ${className}`}
    >
      <video
        ref={ref}
        muted
        playsInline
        autoPlay={priority}
        preload="metadata"
        poster={poster}
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(12,11,10,0.10) 100%)',
          }}
        />
      )}
    </div>
  )
}
