import { useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * A button/link with a subtle magnetic pull toward the cursor.
 * Renders <Link> when `to` is set, <a> when `href`, otherwise <button>.
 */
export default function MagneticButton({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  strength = 0.35,
  ...rest
}) {
  const ref = useRef(null)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  function onLeave() {
    const el = ref.current
    if (el) el.style.transform = 'translate(0, 0)'
  }

  const cls = `btn btn-${variant} ${className}`
  const handlers = { ref, onMouseMove: onMove, onMouseLeave: onLeave }

  if (to) return <Link to={to} className={cls} {...handlers} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...handlers} {...rest}>{children}</a>
  return <button className={cls} {...handlers} {...rest}>{children}</button>
}
