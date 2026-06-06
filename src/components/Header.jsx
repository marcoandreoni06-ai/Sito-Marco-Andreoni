import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import MagneticButton from './ui/MagneticButton'

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? 'border-line bg-paper/70 shadow-[0_8px_30px_-22px_rgba(12,11,10,0.45)] backdrop-blur-xl'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6 sm:py-3.5">
        <Link to="/" aria-label="Marco Andreoni — home" onClick={() => setOpen(false)} className="shrink-0">
          <Logo />
        </Link>

        <div className="flex items-center gap-1.5">
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `link-u rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <MagneticButton
            to="/contatti"
            className="ml-1 hidden px-5 py-2.5 text-sm md:inline-flex"
            strength={0.22}
          >
            Prenota una call
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 -z-10 bg-paper/97 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
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
