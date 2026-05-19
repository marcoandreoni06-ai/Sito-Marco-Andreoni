import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function Footer() {
  return (
    <footer className="border-t border-brand-gray-100 bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-pixel text-brand-gray-300 uppercase tracking-wider mb-4">
              Marco Andreoni
            </h3>
            <p className="text-sm text-brand-gray-400 leading-relaxed">
              Marketing strategico, automazione AI e identità digitale per piccole imprese e professionisti nelle Marche.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-pixel text-brand-gray-300 uppercase tracking-wider mb-4">
              Link
            </h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-brand-gray-400 hover:text-brand-black transition-colors">
                Home
              </Link>
              <Link to="/chi-sono" className="text-sm text-brand-gray-400 hover:text-brand-black transition-colors">
                Chi Sono
              </Link>
              <Link to="/contatti" className="text-sm text-brand-gray-400 hover:text-brand-black transition-colors">
                Contatti
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-pixel text-brand-gray-300 uppercase tracking-wider mb-4">
              Contatti
            </h3>
            <div className="flex flex-col gap-2 text-sm text-brand-gray-400">
              <a href="mailto:marco@marcandreoni.it" className="hover:text-brand-black transition-colors flex items-center gap-2">
                <Icon name="mail" className="w-4 h-4" />
                marco@marcandreoni.it
              </a>
              <div className="flex gap-3 mt-2">
                <a
                  href="https://linkedin.com/in/marcoandreoni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gray-300 hover:text-brand-black transition-colors"
                  aria-label="LinkedIn"
                >
                  <Icon name="linkedin" className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/marcoandreoni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gray-300 hover:text-brand-black transition-colors"
                  aria-label="Instagram"
                >
                  <Icon name="instagram" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-gray-200 text-center text-xs text-brand-gray-300">
          &copy; {new Date().getFullYear()} Marco Andreoni. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  )
}
