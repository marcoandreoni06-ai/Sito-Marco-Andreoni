import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'
import logoSrc from '../assets/logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/chi-sono', label: 'Chi Sono' },
  { to: '/contatti', label: 'Contatti' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black border-b border-brand-gray-700">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-0.5">
        <Link to="/" className="flex items-center">
          <img src={logoSrc} alt="Marco Andreoni" className="h-19 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition-colors hover:text-white pixel-underline ${
                  isActive ? 'text-white' : 'text-brand-gray-200'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contatti"
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-brand-black transition-all hover:bg-brand-gray-200"
          >
            Prenota consulenza
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <Icon name={open ? 'x' : 'menu'} className="w-5 h-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-brand-gray-700 bg-brand-black px-6 pb-6 pt-4">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pixel-underline ${
                    isActive ? 'text-white' : 'text-brand-gray-200'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contatti"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-5 py-2.5 text-center text-sm font-medium text-brand-black"
            >
              Prenota consulenza
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
