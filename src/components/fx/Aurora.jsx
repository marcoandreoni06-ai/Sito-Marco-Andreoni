/**
 * Slow-drifting violet→orange aurora blooms — the brand's signature gradient
 * brought to life behind a section. Absolutely positioned; give the parent
 * `relative` and `overflow-hidden`.
 */
export default function Aurora({ className = '', intensity = 1 }) {
  return (
    <div className={`aurora ${className}`} style={{ opacity: intensity }} aria-hidden="true">
      <span className="aurora-blob aurora-v" />
      <span className="aurora-blob aurora-o" />
      <span className="aurora-blob aurora-t" />
      <span className="aurora-blob aurora-p" />
    </div>
  )
}
