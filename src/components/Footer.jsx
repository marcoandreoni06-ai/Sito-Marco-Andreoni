import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import Logo from './Logo'
import { LinkedinIcon, InstagramIcon } from './ui/SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-cream">
      {/* Cucitura gradiente: separa il footer dalla sezione precedente */}
      <div aria-hidden="true" className="h-[2px] w-full grad opacity-70" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Comunicazione digitale, automazione AI e sviluppo web su misura per piccole imprese
              delle Marche.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-violet" />
              Fano · Marche · Italia
            </p>
          </div>

          <div>
            <p className="mb-4 font-pixel text-[0.6rem] uppercase tracking-wider text-faint">Naviga</p>
            <nav className="flex flex-col gap-3 text-sm">
              <Link to="/" className="w-fit text-muted transition-colors hover:text-ink link-u">Home</Link>
              <Link to="/chi-sono" className="w-fit text-muted transition-colors hover:text-ink link-u">Chi sono</Link>
              <Link to="/lab" className="w-fit text-muted transition-colors hover:text-ink link-u">Lab</Link>
              <Link to="/contatti" className="w-fit text-muted transition-colors hover:text-ink link-u">Contatti</Link>
            </nav>
          </div>

          <div>
            <p className="mb-4 font-pixel text-[0.6rem] uppercase tracking-wider text-faint">Contatti</p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:info.mawebstudio@gmail.com" className="inline-flex w-fit items-center gap-2 text-muted transition-colors hover:text-ink link-u">
                <Mail className="h-4 w-4" /> info.mawebstudio@gmail.com
              </a>
              <div className="mt-1 flex gap-3">
                <a
                  href="https://linkedin.com/in/marcoandreoni"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grad-ring flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform hover:-translate-y-0.5"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/marcoandreoni"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grad-ring flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform hover:-translate-y-0.5"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-7 text-xs text-faint sm:flex-row">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full grad" />
            </span>
            Disponibile per nuovi progetti
          </span>
          <span>© {year} Marco Andreoni · P.IVA in attivazione · Tutti i diritti riservati</span>
        </div>
      </div>
    </footer>
  )
}
