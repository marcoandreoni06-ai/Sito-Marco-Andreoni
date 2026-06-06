import { useMemo } from 'react'

const GLYPHS = ['</>', '{ }', '[ ]', '01', '10', 'AI', '<', '>', '/', '=', ';', '*', '+', '▮', '◇', '▲', '·', '#', 'fn']
const COLORS = ['var(--color-violet)', 'var(--color-purple)', 'var(--color-mauve)', 'var(--color-coral)', 'var(--color-salmon)', 'var(--color-orange)']

/**
 * Signature animation — an arcade/code rain of pixel glyphs falling through
 * the hero. Tech/AI re-skin of the falling-particle motif, in brand colours.
 */
export default function PixelRain({ count = 22, className = '' }) {
  const glyphs = useMemo(() => {
    const seed = (i, m) => ((Math.sin(i * 12.9898 + m * 78.233) * 43758.5453) % 1 + 1) % 1
    return Array.from({ length: count }, (_, i) => {
      const left = seed(i, 1) * 100
      const dur = 7 + seed(i, 2) * 11
      const delay = -seed(i, 3) * 18
      const size = 9 + Math.round(seed(i, 4) * 9)
      const op = 0.3 + seed(i, 5) * 0.35
      const glyph = GLYPHS[Math.floor(seed(i, 6) * GLYPHS.length)]
      const color = COLORS[Math.floor(seed(i, 7) * COLORS.length)]
      return { left, dur, delay, size, op, glyph, color, key: i }
    })
  }, [count])

  return (
    <div className={`pixel-rain ${className}`} aria-hidden="true">
      {glyphs.map((g) => (
        <span
          key={g.key}
          className="pixel-glyph"
          style={{
            left: `${g.left}%`,
            fontSize: `${g.size}px`,
            color: g.color,
            animationDuration: `${g.dur}s`,
            animationDelay: `${g.delay}s`,
            '--g-op': g.op,
          }}
        >
          {g.glyph}
        </span>
      ))}
    </div>
  )
}
