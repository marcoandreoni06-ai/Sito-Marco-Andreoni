import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import MagneticButton from './ui/MagneticButton'

function HamburgerIcon({ open }) {
  const t = 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="7.5" x2="19" y2="7.5"
        style={{
          transformOrigin: '11px 7.5px',
          transform: open ? 'translateY(3.5px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
          transition: t,
        }}
      />
      <line x1="3" y1="14.5" x2="19" y2="14.5"
        style={{
          transformOrigin: '11px 14.5px',
          transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
          transition: t,
        }}
      />
    </svg>
  )
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/chi-sono', label: 'Chi sono' },
  { to: '/contatti', label: 'Contatti' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // The glass pill only materialises once you scroll (or open the mobile menu).
  // At the very top the bar is fully transparent — no background, no border.
  const showPill = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <div
        className={`relative z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 pl-4 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ${
          showPill
            ? 'glass'
            : 'border border-transparent bg-transparent shadow-none'
        }`}
      >
        <Link to="/" aria-label="Marco Andreoni — home" onClick={() => setOpen(false)} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `link-u rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton to="/contatti" className="px-5 py-2.5 text-sm" strength={0.25}>
            Prenota una call
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open}
        >
          <HamburgerIcon open={open} />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`glass-overlay fixed inset-0 -z-10 transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-display text-4xl font-semibold tracking-tight transition-colors ${
                  isActive ? 'grad-text' : 'text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contatti"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-8 w-full px-6 py-4 text-base"
          >
            Prenota una call gratuita
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
