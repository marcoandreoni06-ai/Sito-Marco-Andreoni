/**
 * Brand wordmark — Marco's own signature logo (white-on-transparent PNG,
 * cropped to its bounding box), inverted to ink so it reads on the light
 * canvas. Used in the navbar and footer.
 */
export default function Logo({ className = 'h-7 md:h-8' }) {
  return (
    <img
      src="/logo-mark.png"
      alt="Marco Andreoni"
      className={`w-auto select-none ${className}`}
      style={{ filter: 'invert(1)' }}
      draggable="false"
    />
  )
}
