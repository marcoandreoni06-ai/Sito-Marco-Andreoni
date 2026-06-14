/**
 * Pixel-font section label. By default renders as a refined "chip" (pill with a
 * subtle border + gradient tick) so every section echoes the hero's designed
 * eyebrow. Pass `bare` for long, sentence-style labels that shouldn't be pilled.
 */
export default function Eyebrow({ children, className = '', bare = false }) {
  if (bare) {
    return <span className={`eyebrow text-muted ${className}`}>{children}</span>
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-panel/60 px-3.5 py-1.5 text-muted shadow-[0_1px_2px_rgba(12,11,10,0.04)] backdrop-blur-sm ${className}`}
    >
      <span className="eyebrow">{children}</span>
    </span>
  )
}
