/**
 * Seamless infinite marquee. Renders its items twice and slides -50%.
 * `items` = array of strings; separated by a gradient dot.
 */
export default function Marquee({ items, duration = 34, className = '' }) {
  const group = (
    <div className="marquee" style={{ '--mq-dur': `${duration}s` }}>
      {[0, 1].map((g) => (
        <ul key={g} className="flex items-center" aria-hidden={g === 1 ? 'true' : undefined}>
          {items.map((item, i) => (
            <li key={`${g}-${i}`} className="flex items-center">
              <span className="px-7 font-display text-xl md:text-2xl font-medium tracking-tight text-ink-soft">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full grad" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  )

  return (
    <div className={`marquee-track relative overflow-hidden ${className}`}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: 'linear-gradient(90deg, var(--color-paper), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: 'linear-gradient(270deg, var(--color-paper), transparent)' }}
      />
      {group}
    </div>
  )
}
