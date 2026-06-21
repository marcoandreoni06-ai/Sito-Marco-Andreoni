import { useEffect, useState, useRef, Children } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring, animate, AnimatePresence } from 'framer-motion'
import { Routes, Route, Link, NavLink, useLocation, useParams, Navigate } from 'react-router-dom'
import Lenis from 'lenis'
import SphereGallery from './SphereGallery'
import { getGalleryItem, gradientFor } from './galleryData'

const EASE = [0.19, 1, 0.22, 1]
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Hero: video showreel "agenzia" scaricato da Mixkit (royalty-free, no attribution).
// Alternativa più blu: '/video/hero-alt-blue.mp4'
const HERO_VIDEO = '/video/hero-showreel.mp4'

// Showreel tiles: i 4 video generati da Marco (placeholder sostituibili)
const VIDEOS = [
  '/video/hf_20260518_170213_fdcf93e0-3c9c-4dbb-9bb5-cf6139efcfb6.mp4',
  '/video/hf_20260518_170503_386bf7d7-9c9f-44f1-8dec-9a47fb9b6e3d.mp4',
  '/video/hf_20260518_170736_536080c3-8e58-4040-9339-62a07abbaff3.mp4',
  '/video/hf_20260518_171003_c38efbda-edd0-44f0-8ba8-b546d555a96a.mp4',
]

/* ================================================================
   Reveal helpers
================================================================ */

function LineReveal({ children, delay = 0, className = '', mount = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const show = mount || inView
  return (
    <span ref={ref} className="line-mask">
      <motion.span style={{ display: 'block' }} initial={{ y: '110%' }} animate={{ y: show ? '0%' : '110%' }}
        transition={{ duration: 1.05, ease: EASE, delay }} className={className}>{children}</motion.span>
    </span>
  )
}

function Reveal({ children, delay = 0, y = 26, className = '', as = 'div', mount = false }) {
  const M = motion[as] || motion.div
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const show = mount || inView
  return (
    <M ref={ref} initial={{ opacity: 0, y }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : y }}
      transition={{ duration: 0.9, ease: EASE, delay }} className={className}>{children}</M>
  )
}

/* Reveal pixelato — griglia di celle che svaniscono in ordine sparso */
function PixelReveal({ cols = 12, rows = 7, color = 'var(--ink)' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const cells = cols * rows
  return (
    <div ref={ref} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'grid', pointerEvents: 'none',
        gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
      {Array.from({ length: cells }).map((_, i) => (
        <motion.span key={i} initial={{ opacity: 1 }} animate={{ opacity: inView ? 0 : 1 }}
          transition={{ duration: 0.14, ease: 'linear', delay: inView ? Math.random() * 0.55 : 0 }}
          style={{ background: color }} />
      ))}
    </div>
  )
}

/* ================================================================
   Loader premium — schermo nero con logo centrato, poi tendina su
================================================================ */

function Loader() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (reduceMotion()) { setDone(true); return }
    const t = setTimeout(() => setDone(true), 2050)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="loader" exit={{ opacity: 0, scale: 1.06 }} transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}>
          {/* wipe reveal: il logo si svela da sinistra a destra, come una firma */}
          <motion.img className="loader-logo" src="/logo-full.png" alt="Marco Andreoni" draggable="false"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ================================================================
   Magnetic + cursor + progress + count-up
================================================================ */

// Bottoni statici: NON inseguono il puntatore (richiesta di Marco). Hover CSS
// (riempimento + freccia) + shuffle Locomotive sull'etichetta testuale: avvolgo
// automaticamente le stringhe figlie in <ShuffleText>, lasciando intatte le icone.
function Magnetic({ children, className = '', href, to, onClick, strength, ...rest }) {
  const wrapped = Children.map(children, (c) =>
    typeof c === 'string' && c.trim() ? <ShuffleText>{c.trim()}</ShuffleText> : c
  )
  // Link interno (router) se passo `to`; <button> se è un'azione JS (onClick senza href);
  // altrimenti <a> classico (mailto/anchor)
  if (to) return <Link to={to} className={className} data-cursor {...rest}>{wrapped}</Link>
  if (onClick && !href) return <button type="button" onClick={onClick} className={className} data-cursor {...rest}>{wrapped}</button>
  return <a href={href} onClick={onClick} className={className} data-cursor {...rest}>{wrapped}</a>
}

// Hover "shuffle" — replica 1:1 dell'effetto di locomotive.ca (data-hover-shuffle):
// all'hover le lettere di ogni parola vengono rimescolate (Fisher-Yates) 4 volte
// in 250ms, poi il testo torna corretto. Stesse lettere → nessun salto di layout.
const fyShuffle = (word) => {
  const a = [...word]
  for (let i = a.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[r]] = [a[r], a[i]]
  }
  return a.join('')
}
const shuffleText = (t) => t.split(' ').map(fyShuffle).join(' ')

// `active` opzionale: se passato (boolean) lo shuffle è pilotato da fuori (es. hover
// di un contenitore) invece che dall'hover del singolo span.
function ShuffleText({ children, className = '', active }) {
  const text = String(children)
  const [display, setDisplay] = useState(text)
  const timers = useRef([])
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  const run = () => {
    if (reduceMotion()) return
    clear()
    const steps = 4, total = 250, step = total / steps   // come Locomotive: i=4, Ude=.25
    for (let s = 0; s < steps; s++) timers.current.push(setTimeout(() => setDisplay(shuffleText(text)), step * s))
    timers.current.push(setTimeout(() => setDisplay(text), total))
  }
  const reset = () => { clear(); setDisplay(text) }
  useEffect(() => () => clear(), [])
  useEffect(() => {
    if (active === undefined) return
    if (active) run(); else reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
  const handlers = active === undefined ? { onPointerEnter: run, onPointerLeave: reset } : {}
  return (
    <span className={`shuffle ${className}`} {...handlers} aria-label={text}>
      {display}
    </span>
  )
}

/* Reveal pixelato di un'immagine (stile Locomotive): griglia di celle, ognuna mostra
   la propria porzione dell'immagine (sprite via background-position); le celle compaiono
   in ordine sparso, a scatti (steps), riempiendo rapidamente fino all'immagine intera. */
function PixelImage({ src, active, n = 10 }) {
  const total = n * n
  // rango di rivelazione casuale (Fisher-Yates), stabile per tutta la vita del componente
  const rank = useRef(null)
  if (!rank.current) {
    const order = Array.from({ length: total }, (_, i) => i)
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]] }
    const r = new Array(total)
    order.forEach((cell, i) => { r[cell] = i })
    rank.current = r
  }
  // reveal pilotato in JS: il numero di celle visibili cresce a scatti (≈14 step)
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) { setCount(0); return }
    if (reduceMotion()) { setCount(total); return }
    setCount(0)
    let c = 0
    const chunk = Math.max(1, Math.round(total / 14))
    const id = setInterval(() => {
      c += chunk
      if (c >= total) { c = total; clearInterval(id) }
      setCount(c)
    }, 28)
    return () => clearInterval(id)
  }, [active, total])
  return (
    <span className="pixfill" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, gridTemplateRows: `repeat(${n}, 1fr)` }}>
      {Array.from({ length: total }).map((_, i) => {
        const c = i % n, r = Math.floor(i / n)
        return (
          <span key={i} style={{
            backgroundImage: `url(${src})`,
            backgroundSize: `${n * 100}% ${n * 100}%`,
            backgroundPosition: `${(c / (n - 1)) * 100}% ${(r / (n - 1)) * 100}%`,
            opacity: rank.current[i] < count ? 1 : 0,
          }} />
        )
      })}
    </span>
  )
}

/* Titolo della fase 3: hover → shuffle delle parole (come la navbar) + apertura di
   uno spazio tra "Operativo" e "assistito" dove l'immagine compare a pixel. */
function AiPhaseTitle({ pre, post, img }) {
  const [hover, setHover] = useState(false)
  return (
    <span className="ai-title" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <ShuffleText active={hover}>{pre}</ShuffleText>
      <span className={`ai-slot ${hover ? 'open' : ''}`}><PixelImage src={img} active={hover} /></span>
      <ShuffleText active={hover}>{post}</ShuffleText>
    </span>
  )
}

const Arrow = ({ s = 14 }) => (
  <svg className="arr" width={s} height={s} viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return <motion.div className="scroll-prog" style={{ scaleX: w }} />
}

function CountUp({ value, suffix = '', start = false }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!start) return
    if (reduceMotion()) { setN(value); return }
    const c = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [start, value])
  return <span>{n}{suffix}</span>
}

/* ================================================================
   Nav — route-aware: trasparente/bianca sopra gli hero scuri,
   solida e translucida appena si supera l'hero (o si scrolla su pagine chiare)
================================================================ */

function Nav() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [overDark, setOverDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // chiudi il menu mobile a ogni cambio rotta + blocca lo scroll quando è aperto
  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])
  useEffect(() => {
    // il colore dell'hero dipende dalla rotta (home/lab scuri, resto chiaro):
    // più affidabile che leggere il DOM durante la transizione di pagina
    const darkRoute = pathname === '/' || pathname.startsWith('/lab')
    const onScroll = () => {
      const hero = document.querySelector('[data-hero]')
      const pastHero = hero ? hero.getBoundingClientRect().bottom <= 90 : window.scrollY > 300
      const od = darkRoute && !pastHero
      setOverDark(od)
      setScrolled(pastHero || (!od && window.scrollY > 40))
    }
    onScroll()
    // ricalcola brevemente finché il nuovo hero non è montato
    let n = 0
    const id = setInterval(() => { onScroll(); if (++n > 12) clearInterval(id) }, 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearInterval(id); window.removeEventListener('scroll', onScroll) }
  }, [pathname])
  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''} ${overDark ? 'over-dark' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <Link to="/" className="nav-logo" aria-label="Marco Andreoni — Home">
        <img className="logo-img logo-word" src="/logo-word.png" alt="Marco Andreoni" draggable="false" />
        <img className="logo-img logo-star" src="/logo-star.png" alt="" aria-hidden="true" draggable="false" />
      </Link>
      <div className="nav-center">
        <NavLink className="nav-link" to="/" end><ShuffleText>Home</ShuffleText></NavLink>
        <span className="nav-sep">,</span>
        <NavLink className="nav-link" to="/lab"><ShuffleText>Lab</ShuffleText></NavLink>
        <span className="nav-sep">,</span>
        <NavLink className="nav-link" to="/contatti"><ShuffleText>Contatti</ShuffleText></NavLink>
      </div>
      <div className="nav-right">
        <Magnetic to="/contatti" className="nav-talk">Parliamone <Arrow s={18} /></Magnetic>
        <button type="button" className="nav-burger" aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>

      {/* Menu mobile a tutto schermo */}
      <div className={`nav-mobile ${menuOpen ? 'is-open' : ''}`}>
        <NavLink className="nav-mobile-link" to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink className="nav-mobile-link" to="/lab" onClick={() => setMenuOpen(false)}>Lab</NavLink>
        <NavLink className="nav-mobile-link" to="/contatti" onClick={() => setMenuOpen(false)}>Contatti</NavLink>
        <Link className="nav-mobile-talk" to="/contatti" onClick={() => setMenuOpen(false)}>Parliamone <Arrow s={20} /></Link>
      </div>
    </nav>
  )
}

/* ================================================================
   HERO Home — scuro con video
================================================================ */

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const op = useTransform(scrollYProgress, [0, 0.9], [1, 0])
  const rm = reduceMotion()

  return (
    <header id="top" ref={ref} data-hero="dark" className="hero hero-aurora">
      {/* texture puntinata di sfondo (dietro al testo) */}
      <div className="hero-dots" aria-hidden="true" />

      <motion.div className="hero-inner" style={{ y, opacity: op }}>
        <div className="hero-top">
          <Reveal mount delay={0.1}><span className="pixel bare">Marketing · AI · Sviluppo web</span></Reveal>
        </div>

        <h1 className="hero-h1 display">
          <LineReveal mount delay={0.05}>Trasformo la tua</LineReveal>
          <LineReveal mount delay={0.12}>comunicazione in un</LineReveal>
          <LineReveal mount delay={0.19}><span className="serif">vantaggio competitivo</span></LineReveal>
        </h1>

        <div className="hero-cta">
          <Magnetic to="/contatti" className="btn btn-blue">Prenota una consulenza gratuita <Arrow s={15} /></Magnetic>
          <Magnetic to="/lab" className="btn btn-light">Guarda i miei lavori</Magnetic>
        </div>
      </motion.div>

      {/* "Aurora": aloni blu SOPRA al contenuto in mix-blend difference →
         glow blu sul nero, e dove passano sulle scritte ne invertono il colore.
         Figli diretti di .hero per blendare col testo (niente wrapper isolante). */}
      <motion.div className="aurora-orb" aria-hidden="true"
        animate={rm ? undefined : { x: ['-26%', '30%', '-8%', '22%', '-26%'], y: ['-2%', '20%', '34%', '10%', '-2%'], scale: [1, 1.22, 0.9, 1.14, 1] }}
        transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity }} />
      <motion.div className="aurora-orb aurora-orb-2" aria-hidden="true"
        animate={rm ? undefined : { x: ['24%', '-24%', '14%', '-18%', '24%'], y: ['26%', '4%', '-14%', '30%', '26%'], scale: [1.08, 0.88, 1.24, 0.96, 1.08] }}
        transition={{ duration: 21, ease: 'easeInOut', repeat: Infinity }} />
    </header>
  )
}

/* ================================================================
   Strip — competenze (copy originale)
================================================================ */

function Strip() {
  const items = ['Sviluppo web', 'Automazioni AI', 'SEO & Performance', 'Identità visiva', 'Social media', 'Copywriting', 'Strategia digitale', 'Lead generation']
  const line = (
    <span className="strip-item">
      {items.map((t) => (
        <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '3.5rem' }}><span className="sep">✳</span> {t}</span>
      ))}
    </span>
  )
  return <div className="strip"><div className="strip-track">{line}{line}</div></div>
}

/* ================================================================
   Metodo LiftOff — 3 fasi + benefici (copy originale, pagina Home)
================================================================ */

const FASI = [
  { n: '01', sub: 'Fase 1 — Il Sito Web', fase: "L'Hub Digitale ad Alto Margine", body: "Una macchina da conversione su misura: trasforma il traffico in prenotazioni dirette, senza commissioni di piattaforme terze.", items: ['Landing Page dedicate', 'Pixel & Analytics avanzato'] },
  { n: '02', sub: "Fase 2 — L'Acceleratore", fase: 'Il Funnel di Traffico Social & Retargeting', body: "Intercettiamo i clienti dove passano il loro tempo — Instagram, Facebook, TikTok — con campagne sponsorizzate mirate.", items: ['Lead Magnet su misura', 'Retargeting intelligente'] },
  { n: '03', sub: "Fase 3 — L'Elemento Differenziante", fase: 'Il Sistema Operativo assistito da AI', pre: 'Il Sistema Operativo', post: 'assistito da AI', img: '/assets/ai-systems/neuroni.jpg', body: "Ti consegniamo un asset definitivo: un database centralizzato che raccoglie ogni prenotazione e contatto generato dalla tua attività.", items: ['Pannello AI già configurato', 'Storico clienti proprietario'], to: '/lab/ai-systems' },
]

function Method() {
  return (
    <section id="metodo" className="method wrap">
      <div className="sec-head">
        <span className="pixel">Metodo LiftOff</span>
        <span className="idx">(01 — 03)</span>
      </div>
      <Reveal><h2 className="sec-title display" style={{ marginBottom: '2.5rem' }}>Un ecosistema digitale completo <span className="serif">in 3 fasi</span>.</h2></Reveal>
      <div>
        {FASI.map((f, i) => {
          const inner = (
            <div className="srv" data-cursor>
              <span className="idx">{f.n}</span>
              <div>
                <div className="srv-head"><span className="srv-title display">{f.img ? <AiPhaseTitle pre={f.pre} post={f.post} img={f.img} /> : f.fase}</span><Arrow s={30} /></div>
                <div style={{ paddingTop: '.4rem' }}>
                  <p className="srv-sub">{f.sub}</p>
                  <p className="srv-body">{f.body}</p>
                  <div className="srv-tags">{f.items.map((it) => <span key={it} className="tag"><span className="tk" />{it}</span>)}</div>
                </div>
              </div>
            </div>
          )
          return (
            <Reveal key={f.n} delay={i * 0.05}>
              {f.to ? <Link to={f.to} className="srv-link">{inner}</Link> : inner}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ================================================================
   Stats blu (copy originale)
================================================================ */

const STATS = [
  { value: 3, suffix: '', label: 'Anni di progetti', desc: 'Sul campo, tra collaborazioni e formazione continua.' },
  { value: 24, suffix: 'h', label: 'Tempo di risposta', desc: 'Ogni richiesta, letta e risposta entro un giorno.' },
  { value: 100, suffix: '%', label: 'Su misura', desc: 'Zero template. Ogni progetto parte da te.' },
]

function Stats() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-15%' })
  return (
    <section className="stats">
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal className="pixel">In numeri</Reveal>
        <p className="stats-title"><LineReveal>Qualità che si misura,</LineReveal><LineReveal delay={0.08}>non si <span className="serif">racconta</span>.</LineReveal></p>
        <div className="stats-grid" ref={gridRef}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="stat">
              <div className="stat-num"><CountUp value={s.value} suffix={s.suffix} start={inView} /></div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-desc">{s.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   CTA riusabile (varia per pagina)
================================================================ */

function CtaBlock({ kicker = '(Parliamone)', titleA, titleB, body, cta, ctaScroll }) {
  // Se ctaScroll è valorizzato (es. sulla pagina Contatti, dove il link a /contatti
  // sarebbe un no-op) la CTA scrolla al target invece di navigare.
  const scrollToTarget = () => document.getElementById(ctaScroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <section className="cta wrap">
      <p className="mono" style={{ marginBottom: '2rem' }}>{kicker}</p>
      <h2 className="cta-h display"><LineReveal>{titleA}</LineReveal><LineReveal delay={0.08}>{titleB}</LineReveal></h2>
      <Reveal delay={0.15}><p className="cta-body">{body}</p></Reveal>
      <div className="cta-row">
        {ctaScroll
          ? <Magnetic onClick={scrollToTarget} className="btn btn-blue">{cta} <Arrow s={15} /></Magnetic>
          : <Magnetic to="/contatti" className="btn btn-blue">{cta} <Arrow s={15} /></Magnetic>}
        <Magnetic href="mailto:info.mawebstudio@gmail.com" className="btn btn-ghost">info.mawebstudio@gmail.com</Magnetic>
      </div>
    </section>
  )
}

/* ================================================================
   Showreel — i 4 video come tile (reveal pixelato) — pagina Lab
================================================================ */

const REEL = [
  { src: VIDEOS[0], label: 'Sviluppo web' },
  { src: VIDEOS[2], label: 'Automazioni AI' },
  { src: VIDEOS[3], label: 'Identità visiva' },
  { src: VIDEOS[1], label: 'Social media' },
]

function Tile({ item, n }) {
  const vref = useRef(null)
  const play = () => { if (!reduceMotion()) vref.current?.play().catch(() => {}) }
  const stop = () => { vref.current?.pause() }
  return (
    <div className="tile" data-cursor onMouseEnter={play} onMouseLeave={stop}>
      <div className="tile-media">
        <video ref={vref} muted loop playsInline preload="metadata"><source src={item.src} type="video/mp4" /></video>
        <span className="tile-num">{String(n).padStart(2, '0')}</span>
        <span className="tile-arr"><Arrow s={16} /></span>
        <PixelReveal cols={14} rows={9} />
      </div>
      <div className="tile-foot">
        <h3>{item.label}</h3>
        <span className="mono">2026</span>
      </div>
    </div>
  )
}

function Reel() {
  return (
    <section id="lavori" className="reel">
      <div className="wrap">
        <div className="sec-head">
          <span className="pixel" style={{ color: 'rgba(255,255,255,.66)' }}>Showreel</span>
          <span className="idx" style={{ color: 'rgba(255,255,255,.5)' }}>(01 — 04)</span>
        </div>
        <div className="reel-grid">
          {REEL.map((it, i) => <Reveal key={it.label + i} delay={(i % 2) * 0.08}><Tile item={it} n={i + 1} /></Reveal>)}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   Lab — hero scuro + case study (copy originale ProofOfWork)
================================================================ */

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'brand', label: 'Brand & Web Design' },
  { id: 'social', label: 'Social Media Ecosystems' },
  { id: 'ai', label: 'AI & Automations' },
]

const PROJECTS = [
  {
    id: 'test', title: 'Test', tags: ['brand', 'ai'], tagLabels: ['Client', 'Sphere Gallery'], to: '/lab/test',
    contesto: 'Esperimento di galleria immersiva in WebGL: i lavori tappezzano la superficie interna di una sfera navigabile.',
    intervento: 'Galleria sferica costruita in Three.js + GSAP, con drag inerziale stile Lenis e transizione di apertura card → pagina.',
    asset: 'Componente gallery riutilizzabile, performante e su misura, pronto per esporre qualsiasi portfolio.',
  },
  {
    id: 'sonora', title: 'Sonora', tags: ['brand', 'social'], tagLabels: ['Brand & Web Design', 'Social Media'], to: '/lab/sonora',
    contesto: "Target Gen-Z notturno in cerca di un'identità visiva underground e riconoscibile.",
    intervento: "Ecosistema grafico underground: palette scura, griglia social coesa e linguaggio visivo distintivo costruito dalla radice.",
    asset: "Griglia social e template pronti all'uso per il team creativo.",
  },
  {
    id: 'scatolificio-artigiano', title: 'Scatolificio Artigiano', tags: ['social', 'brand'], tagLabels: ['Social Media', 'Brand & Web Design'], to: '/lab/scatolificio',
    contesto: 'Azienda manifatturiera B2B con necessità di posizionamento digitale in un mercato industriale competitivo.',
    intervento: 'Content marketing tecnico: strategia editoriale focalizzata sul prodotto e sul processo artigianale per attrarre lead qualificati.',
    asset: 'Canali social ottimizzati, crescita organica e pipeline di lead qualificati.',
  },
  {
    id: 'sanitaria', title: 'Sanitaria', tags: ['brand', 'social'], tagLabels: ['Brand Identity', 'Social Media'], to: '/lab/sanitaria', image: '/assets/sanitaria/sanitaria-card.jpg',
    contesto: "Sanitaria locale con necessità di posizionamento digitale e un'identità visiva professionale che trasmettesse fiducia e cura.",
    intervento: 'Brand identity completa e gestione social: visual coerente, contenuti pensati per il cliente finale e presenza digitale strutturata.',
    asset: 'Logo, palette e linee guida, canali social ottimizzati e piano editoriale operativo.',
  },
  {
    id: 'sidereal', title: 'Sidereal', tags: ['brand', 'social'], tagLabels: ['Brand & Identità', 'Fotografia'], to: '/lab/sidereal', video: '/video/sidereal.mp4',
    contesto: 'Brand di abbigliamento con estetica minimalista e ricerca visiva: prodotti pensati per comunicare prima ancora di essere indossati.',
    intervento: 'Cura completa della comunicazione: brand identity, shooting fotografico prodotto, disegno capi e content per i social.',
    asset: 'Identità visiva coesa, catalogo fotografico prodotti e materiali pronti per la comunicazione.',
  },
]

const AI_PROJECT = {
  contesto: 'Inefficienza operativa e dati frammentati tra strumenti non integrati.',
  intervento: 'Sviluppo di infrastrutture custom: agenti AI, database centralizzati e workflow automatizzati su misura per il cliente.',
  asset: 'Database proprietari, agenti AI operativi e sistemi di automazione pronti alla scalabilità.',
}

function ProjectCard({ project }) {
  const card = (
    <article className="proj" data-cursor>
      <div className="proj-head">
        <h3 className="proj-title">{project.title}</h3>
        <div className="proj-pills">{project.tagLabels.map((t) => <span key={t} className="proj-pill">{t}</span>)}</div>
        {project.to && <span className="proj-open">Apri <Arrow s={13} /></span>}
      </div>
      {project.video && (
        <div style={{ margin: '1.4rem 0 0', overflow: 'hidden', borderRadius: '12px', aspectRatio: '16/9' }}>
          <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src={project.video} type="video/mp4" />
          </video>
        </div>
      )}
      {project.image && (
        <div style={{ margin: '1.4rem 0 0', overflow: 'hidden', borderRadius: '12px', aspectRatio: '1/1', maxHeight: '320px' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="eager" />
        </div>
      )}
      <dl className="proj-grid">
        <div><dt>Contesto</dt><dd>{project.contesto}</dd></div>
        <div><dt>Intervento</dt><dd>{project.intervento}</dd></div>
        <div><dt>Asset</dt><dd>{project.asset}</dd></div>
      </dl>
    </article>
  )
  return <Reveal>{project.to ? <Link to={project.to} className="proj-link">{card}</Link> : card}</Reveal>
}

function LabProjects() {
  const [active, setActive] = useState('all')
  const visible = active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active))
  const showAI = active === 'all' || active === 'ai'

  return (
    <section className="lab-work wrap">
      <div className="filters">
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setActive(f.id)} data-cursor
            className={`filter ${active === f.id ? 'is-active' : ''}`}>{f.label}</button>
        ))}
      </div>

      <div className="proj-list">
        {visible.map((p) => <ProjectCard key={p.id} project={p} />)}

        {showAI && (
          <Reveal delay={0.08}>
            <Link to="/lab/ai-systems" className="proj-link">
            <article className="proj proj-ai" data-cursor>
              <div className="proj-head">
                <h3 className="proj-title">Workflow & Sistemi AI</h3>
                <div className="proj-pills"><span className="proj-pill">AI &amp; Automations</span></div>
                <span className="proj-open proj-open-light">Apri <Arrow s={13} /></span>
              </div>
              <dl className="proj-grid">
                <div><dt>Contesto</dt><dd>{AI_PROJECT.contesto}</dd></div>
                <div><dt>Intervento</dt><dd>{AI_PROJECT.intervento}</dd></div>
                <div><dt>Asset</dt><dd>{AI_PROJECT.asset}</dd></div>
              </dl>
            </article>
            </Link>
          </Reveal>
        )}

        {visible.length === 0 && !showAI && (
          <Reveal>
            <div className="proj-empty">
              <p className="pixel bare">Nessun progetto</p>
              <p>Nessun progetto in questa categoria al momento.</p>
              <button onClick={() => setActive('all')} className="proj-empty-link">Mostra tutti</button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

/* ================================================================
   Contatti — hero chiaro, form, aspettative, dove, faq (copy originale)
================================================================ */

function ContattiHero() {
  return (
    <section data-hero="light" className="con-hero">
      <div className="wrap">
        <div className="sec-head">
          <Reveal mount><span className="pixel">Contatti</span></Reveal>
          <Reveal mount><span className="idx">(Parliamone)</span></Reveal>
        </div>
        <h1 className="con-h1 display">
          <LineReveal mount delay={0.05}>Hai un progetto in mente?</LineReveal>
          <LineReveal mount delay={0.12}><span className="serif">Parliamone</span>.</LineReveal>
        </h1>
        <Reveal mount delay={0.2}><p className="con-hero-body">Raccontami cosa fai e cosa ti blocca. Ti rispondo entro 24 ore con un'idea chiara di come lavorare insieme.</p></Reveal>
      </div>
    </section>
  )
}

const BUDGET = ['Non lo so ancora', 'Sotto i 1.000€', '1.000€ – 3.000€', '3.000€ – 5.000€', 'Oltre 5.000€']

function ContactForm() {
  const [form, setForm] = useState({ nome: '', attivita: '', email: '', telefono: '', messaggio: '', budget: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const validate = () => {
    const e = {}
    if (!form.nome.trim()) e.nome = 'Inserisci il tuo nome'
    if (!form.attivita.trim()) e.attivita = 'Inserisci la tua attività'
    if (!form.email.trim()) e.email = 'Inserisci la tua email'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Inserisci un indirizzo email valido'
    if (!form.messaggio.trim()) e.messaggio = 'Scrivi un messaggio prima di inviare'
    return e
  }

  const onChange = (ev) => {
    const { name, value } = ev.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setStatus('loading')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('fail')
      setStatus('success')
      setForm({ nome: '', attivita: '', email: '', telefono: '', messaggio: '', budget: '' })
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className="form-done">
        <span className="form-done-mark"><Arrow s={20} /></span>
        <h3>Ricevuto. Grazie!</h3>
        <p>Ti rispondo entro 24 ore. Se hai urgenza, scrivimi direttamente a <a href="mailto:info.mawebstudio@gmail.com">info.mawebstudio@gmail.com</a>.</p>
        <button onClick={() => setStatus('idle')} className="btn btn-ghost">Invia un altro messaggio</button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="form">
      <span className="form-strip" aria-hidden="true" />
      <div className="form-row">
        <Field label="Nome e cognome" required error={errors.nome}>
          <input name="nome" type="text" value={form.nome} onChange={onChange} placeholder="Mario Rossi" className={`field ${errors.nome ? 'is-err' : ''}`} />
        </Field>
        <Field label="Attività / Azienda" required error={errors.attivita}>
          <input name="attivita" type="text" value={form.attivita} onChange={onChange} placeholder="La tua attività" className={`field ${errors.attivita ? 'is-err' : ''}`} />
        </Field>
      </div>
      <div className="form-row">
        <Field label="Email" required error={errors.email}>
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="mario@esempio.it" className={`field ${errors.email ? 'is-err' : ''}`} />
        </Field>
        <Field label="Telefono">
          <input name="telefono" type="tel" value={form.telefono} onChange={onChange} placeholder="+39 333 1234567" className="field" />
        </Field>
      </div>
      <Field label="Come posso aiutarti?" required error={errors.messaggio}>
        <textarea name="messaggio" rows={5} value={form.messaggio} onChange={onChange}
          placeholder="Parlami del tuo progetto, dei tuoi obiettivi e di cosa ti serve. Più dettagli mi dai, più mirata sarà la mia risposta."
          className={`field ${errors.messaggio ? 'is-err' : ''}`} style={{ resize: 'vertical' }} />
      </Field>
      <Field label="Budget indicativo">
        <select name="budget" value={form.budget} onChange={onChange} className="field">
          <option value="">Seleziona un'opzione</option>
          {BUDGET.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>
      <p className="form-note">I tuoi dati saranno trattati nel rispetto del GDPR e usati solo per rispondere alla tua richiesta.</p>
      <button type="submit" disabled={status === 'loading'} className="btn btn-blue form-submit">
        {status === 'loading' ? 'Invio in corso…' : <>Invia messaggio <Arrow s={15} /></>}
      </button>
      {status === 'error' && (
        <p className="form-err">Qualcosa è andato storto. Riprova tra poco o scrivimi direttamente a <a href="mailto:info.mawebstudio@gmail.com">info.mawebstudio@gmail.com</a>.</p>
      )}
    </form>
  )
}

function Field({ label, required, error, children }) {
  return (
    <label className="field-label">
      <span className="field-cap">{label} {required && <span style={{ color: 'var(--blue)' }}>*</span>}</span>
      {children}
      {error && <span className="field-err">{error}</span>}
    </label>
  )
}

const CANALI = [
  { label: 'Email', value: 'info.mawebstudio@gmail.com', href: 'mailto:info.mawebstudio@gmail.com' },
  { label: 'Telefono', value: 'Dopo il primo contatto', href: null },
]

function ContactAside() {
  return (
    <aside className="con-aside">
      <div className="con-card">
        <p className="pixel bare">Contatto diretto</p>
        <p className="con-card-lead">Preferisci scrivermi direttamente? Mi trovi anche qui.</p>
        <div className="con-channels">
          {CANALI.map((c) => {
            const inner = (
              <>
                <span className="con-ch-cap">{c.label}</span>
                <span className="con-ch-val">{c.value}</span>
              </>
            )
            return c.href
              ? <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="con-ch" data-cursor>{inner}</a>
              : <div key={c.label} className="con-ch is-static">{inner}</div>
          })}
        </div>
      </div>
      <div className="con-card con-card-live">
        <span className="con-live-dot" />
        <p className="con-live-title">Risposta entro 24 ore</p>
        <p className="con-card-lead">Dal lunedì al venerdì. Se scrivi nel weekend, ti rispondo il lunedì successivo.</p>
      </div>
    </aside>
  )
}

const ASPETTATIVE = [
  { num: '01', title: 'Ricevo la tua richiesta', desc: 'Mi arriva subito una notifica via email, direttamente nella mia casella.' },
  { num: '02', title: 'La leggo con attenzione', desc: 'Dedico tempo a capire la tua situazione, le tue esigenze, il tuo settore.' },
  { num: '03', title: 'Ti rispondo entro 24 ore', desc: "Con un'idea chiara di cosa posso fare per te, come, e con quale investimento." },
]

function Aspettative() {
  return (
    <section className="aspett">
      <div className="wrap">
        <Reveal><span className="pixel">Dopo l'invio</span></Reveal>
        <Reveal><h2 className="aspett-title display">Cosa succede dopo che clicchi “Invia”?</h2></Reveal>
        <ol className="aspett-grid">
          {ASPETTATIVE.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.09} as="li" className="aspett-step">
              <span className="aspett-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.12}><p className="aspett-note">Nessun messaggio automatico. Nessun copia-incolla. Ogni risposta è scritta personalmente da me.</p></Reveal>
      </div>
    </section>
  )
}

function Dove() {
  return (
    <section className="dove wrap">
      <div className="dove-grid">
        <div>
          <Reveal><span className="pixel">Dove sono</span></Reveal>
          <Reveal><h2 className="dove-title display">Opero principalmente nelle Marche.</h2></Reveal>
          <Reveal delay={0.08}>
            <div className="dove-body">
              <p>La mia base è a <strong>Fano</strong>, in provincia di Pesaro e Urbino. Lavoro in presenza nelle Marche e da remoto in tutta Italia.</p>
              <p>Se sei della zona, ci vediamo per un caffè. Se sei lontano, una videochiamata funziona altrettanto bene.</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.06}>
          <div className="dove-map">
            <iframe
              title="Mappa — Via Vittorio De Sica 1, Fano"
              src="https://www.openstreetmap.org/export/embed.html?bbox=13.0088825%2C43.8193989%2C13.0168825%2C43.8243989&layer=mapnik&marker=43.8218989%2C13.0128825"
              loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div className="dove-pin">
              <span className="dove-pin-title">Fano · Marche</span>
              <span className="dove-pin-sub">Via Vittorio De Sica 1, 61032</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  { q: 'Quanto costa una consulenza?', a: 'La prima call di 15 minuti è gratuita e senza impegno. Solo dopo, se decidiamo di lavorare insieme, ti presento un preventivo dettagliato.' },
  { q: 'Offri assistenza anche dopo il progetto?', a: 'Sì, ogni progetto include assistenza post-lancio. Per gli aggiornamenti successivi possiamo concordare un piano di manutenzione.' },
  { q: 'Lavori anche con partite IVA?', a: 'Certo. Lavoro con partite IVA, ditte individuali e società, con fattura per ogni prestazione.' },
  { q: 'Accetti pagamenti rateali?', a: 'Per i progetti più consistenti valutiamo insieme un piano di pagamento personalizzato.' },
]

function Faq({ items, title }) {
  return (
    <section className="faq wrap">
      <Reveal><span className="pixel">FAQ</span></Reveal>
      <Reveal><h2 className="faq-title display">{title}</h2></Reveal>
      <div className="faq-list">
        {items.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.04}>
            <details className="faq-item" data-cursor>
              <summary><span>{item.q}</span><span className="faq-plus">+</span></summary>
              <p>{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ================================================================
   Footer (condiviso)
================================================================ */

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col" style={{ maxWidth: '24rem' }}>
            <Link to="/" className="nav-logo" aria-label="Marco Andreoni — Home"><img className="logo-img logo-full" src="/logo-full.png" alt="Marco Andreoni" draggable="false" /></Link>
            <p style={{ color: 'var(--muted)', marginTop: '1rem', fontWeight: 300 }}>Marketing strategico, automazione AI e identità digitale per piccole imprese e professionisti.</p>
          </div>
          <div className="foot-col"><h4>Menu</h4><Link to="/"><ShuffleText>Home</ShuffleText></Link><Link to="/lab"><ShuffleText>Lab</ShuffleText></Link><Link to="/contatti"><ShuffleText>Contatti</ShuffleText></Link></div>
          <div className="foot-col"><h4>Contatti</h4><a href="mailto:info.mawebstudio@gmail.com"><ShuffleText>info.mawebstudio@gmail.com</ShuffleText></a><span style={{ color: 'var(--muted)', fontWeight: 300 }}>Fano (PU), Italia</span></div>
        </div>
        <div className="foot-bottom"><span>© 2026 Marco Andreoni — Fano (PU), Italia</span><span>Preview redesign v2 · electric blue</span></div>
      </div>
    </footer>
  )
}

/* ================================================================
   Pagine
================================================================ */

function HomePage() {
  return (
    <>
      <Hero />
      <Strip />
      <Method />
      <Stats />
      <CtaBlock
        titleA="Il primo passo è"
        titleB={<>una <span className="serif">chiacchierata</span>.</>}
        body="Niente preventivi forzati. 15 minuti gratuiti: mi racconti cosa ti blocca e, se c'è feeling, costruiamo qualcosa insieme."
        cta="Prenota i tuoi 15 minuti gratuiti"
      />
    </>
  )
}

function SphereSection() {
  return (
    <section data-hero="dark" className="sphere-section">
      <SphereGallery />
      <div className="sphere-ui">
        <div className="sphere-ui-bottom wrap">
          <h1 className="sphere-title display">
            Progetti, Sistemi <span className="serif">e Infrastrutture</span> Digitali.
          </h1>
          <p className="sphere-hint">Trascina per esplorare · clicca una card per aprirla</p>
        </div>
      </div>
    </section>
  )
}

const SONORA_BRAND = [
  '/assets/sonora/sonora-brand-1.jpg',
  '/assets/sonora/sonora-brand-2.jpg',
  '/assets/sonora/sonora-brand-3.jpg',
  '/assets/sonora/sonora-brand-4.jpg',
  '/assets/sonora/sonora-brand-5.jpg',
]

function SonoraBody({ item }) {
  return (
    <>
      {/* Brand Identity */}
      <section className="detail-body wrap">
        <Reveal><p className="pixel bare">Brand Identity</p></Reveal>
        <Reveal delay={0.05}>
          <p className="detail-lead">
            Sonora aveva bisogno di una <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>brand identity</strong> completa:
            logo, palette cromatica, tipografia e sistema visivo pensato per un pubblico
            Gen-Z notturno. Estetica underground, scura e immersiva, costruita dalla radice.
          </p>
        </Reveal>

        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {SONORA_BRAND.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div style={{ overflow: 'hidden', borderRadius: '1rem', border: '1px solid var(--line)', gridColumn: i === 4 ? '1 / -1' : undefined }}>
                <img
                  src={src}
                  alt={`Sonora Brand Design ${i + 1}`}
                  style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform .7s cubic-bezier(.19,1,.22,1)' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Locandine / Social */}
      <section style={{ borderTop: '1px solid var(--line)', background: 'var(--cream)', padding: 'clamp(3.5rem, 8vw, 7rem) 0 clamp(4rem, 9vw, 8rem)' }}>
        <div className="wrap">
          <Reveal><p className="pixel">Intervento Social</p></Reveal>
          <Reveal delay={0.05}>
            <p className="detail-lead">
              Parallelamente all'identità visiva, abbiamo sviluppato un{' '}
              <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>sistema di locandine per i social</strong>:
              template coerenti con il brand, pronti per ogni evento, con riconoscibilità
              e impatto visivo garantiti su ogni formato.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '33%', overflow: 'hidden', borderRadius: '1rem', border: '1px solid var(--line)' }}>
              <img
                src="/assets/sonora/sonora-locandina.jpg"
                alt="Sonora — Locandina Social"
                style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform .7s cubic-bezier(.19,1,.22,1)' }}
                loading="lazy"
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              />
            </div>
          </Reveal>

          <div className="cta-row" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <Magnetic to="/lab" className="btn btn-fill">Torna ai progetti <Arrow s={15} /></Magnetic>
            <Magnetic to="/contatti" className="btn btn-ghost">Parliamone</Magnetic>
          </div>
        </div>
      </section>
    </>
  )
}

const SANITARIA_IMAGES = [
  '/assets/sanitaria/sanitaria-1.jpg',
  '/assets/sanitaria/sanitaria-2.jpg',
  '/assets/sanitaria/sanitaria-3.jpg',
]

function SanitariaBody() {
  return (
    <>
      <section className="detail-body wrap">
        <Reveal><p className="pixel bare">Brand Identity & Social</p></Reveal>
        <Reveal delay={0.05}>
          <p className="detail-lead">
            Per Sanitaria ho costruito una{' '}
            <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>brand identity professionale</strong>{' '}
            capace di trasmettere fiducia e cura, accompagnata da una gestione social pensata
            per il cliente finale: contenuti chiari, tono accessibile e presenza digitale coerente.
          </p>
        </Reveal>

        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {SANITARIA_IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 0.07}>
              <div style={{ overflow: 'hidden', borderRadius: '1rem', border: '1px solid var(--line)' }}>
                <img
                  src={src}
                  alt={`Sanitaria ${i + 1}`}
                  style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform .7s cubic-bezier(.19,1,.22,1)' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="cta-row" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Magnetic to="/lab" className="btn btn-fill">Torna ai progetti <Arrow s={15} /></Magnetic>
          <Magnetic to="/contatti" className="btn btn-ghost">Parliamone</Magnetic>
        </div>
      </section>
    </>
  )
}

const SANTORSO_IMAGES = [
  '/assets/santorso/santorso-1.jpg',
  '/assets/santorso/santorso-2.jpg',
  '/assets/santorso/santorso-3.jpg',
  '/assets/santorso/santorso-4.jpg',
  '/assets/santorso/santorso-5.jpg',
]

function SantorsoBody() {
  return (
    <>
      <section className="detail-body wrap">
        <Reveal><p className="pixel bare">Sport & Brand Identity</p></Reveal>
        <Reveal delay={0.05}>
          <p className="detail-lead">
            Per l'<strong style={{ fontWeight: 600, color: 'var(--ink)' }}>A.S.D. Giovane Sant'Orso</strong>{' '}
            ho curato la comunicazione della società calcistica giovanile: dallo storytelling del percorso
            dei giovani atleti — il libretto <em>“Storia Calcistica”</em> con i gadget-premio per ogni tappa —
            fino al volantino iscrizioni e alla valorizzazione degli sponsor. Un'identità riconoscibile,
            pensata per far crescere la community attorno al club.
          </p>
        </Reveal>

        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {SANTORSO_IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 0.07}>
              <div style={{ overflow: 'hidden', borderRadius: '1rem', border: '1px solid var(--line)' }}>
                <img
                  src={src}
                  alt={`Sant'Orso ${i + 1}`}
                  style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform .7s cubic-bezier(.19,1,.22,1)' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="cta-row" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Magnetic to="/lab" className="btn btn-fill">Torna ai progetti <Arrow s={15} /></Magnetic>
          <Magnetic to="/contatti" className="btn btn-ghost">Parliamone</Magnetic>
        </div>
      </section>
    </>
  )
}

function LuciaBody() {
  return (
    <>
      <section className="detail-body wrap">
        <Reveal><p className="pixel bare">Social & Campagne ADV</p></Reveal>
        <Reveal delay={0.05}>
          <p className="detail-lead">
            Per <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>Lucia Pierini</strong>, logopedista,
            ho gestito la presenza social e le campagne di advertising: contenuti pensati per i genitori,
            un tono caldo e rassicurante e inserzioni mirate per portare nuove richieste di visita.
          </p>
        </Reveal>

        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', display: 'flex', justifyContent: 'flex-start' }}>
          <Reveal>
            <div style={{ overflow: 'hidden', borderRadius: '1rem', border: '1px solid var(--line)', maxWidth: 560 }}>
              <img
                src="/assets/lucia/lucia-1.jpg"
                alt="Lucia Pierini — creatività social"
                style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform .7s cubic-bezier(.19,1,.22,1)' }}
                loading="eager"
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              />
            </div>
          </Reveal>
        </div>

        <div className="cta-row" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Magnetic to="/lab" className="btn btn-fill">Torna ai progetti <Arrow s={15} /></Magnetic>
          <Magnetic to="/contatti" className="btn btn-ghost">Parliamone</Magnetic>
        </div>
      </section>
    </>
  )
}

function MaEngBody() {
  return (
    <>
      <section className="detail-body wrap">
        <Reveal><p className="pixel bare">Sito Web</p></Reveal>
        <Reveal delay={0.05}>
          <p className="detail-lead">
            Per <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>MA Engineering</strong> — studio di
            progettazione di strutture in acciaio — ho realizzato il sito web: un'interfaccia scura e tecnica
            che racconta il percorso dal progetto iniziale ai disegni esecutivi, con sezione servizi e
            portfolio dei progetti residenziali.
          </p>
        </Reveal>

        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Reveal>
            <Magnetic href="https://maengineering.it/" target="_blank" rel="noopener noreferrer" className="nav-talk">maengineering.it <Arrow s={18} /></Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const TIGUIDO_MEDIA = [
  { type: 'img', src: '/assets/tiguido/tiguido-1.jpg' },
  { type: 'video', src: '/assets/tiguido/tiguido.mp4' },
  { type: 'img', src: '/assets/tiguido/tiguido-2.jpg' },
]

function TiGuidoBody() {
  return (
    <>
      <section className="detail-body wrap">
        <Reveal><p className="pixel bare">Brand Identity & Content</p></Reveal>
        <Reveal delay={0.05}>
          <p className="detail-lead">
            Per <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>Ti Guido nella Storia</strong>, il progetto
            di divulgazione storica di Guido Lividini, ho curato la brand identity e i contenuti social: dal logo —
            un timone che si dissolve in pixel, tra passato e digitale — fino ai format visivi che rendono la storia
            riconoscibile e condivisibile.
          </p>
        </Reveal>

        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {TIGUIDO_MEDIA.map((m, i) => (
            <Reveal key={m.src} delay={i * 0.07}>
              <div style={{ overflow: 'hidden', borderRadius: '1rem', border: '1px solid var(--line)' }}>
                {m.type === 'video' ? (
                  <video
                    src={m.src}
                    autoPlay muted loop playsInline preload="metadata"
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={m.src}
                    alt={`Ti Guido nella Storia ${i + 1}`}
                    style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform .7s cubic-bezier(.19,1,.22,1)' }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="cta-row" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Magnetic to="/lab" className="btn btn-fill">Torna ai progetti <Arrow s={15} /></Magnetic>
          <Magnetic to="/contatti" className="btn btn-ghost">Parliamone</Magnetic>
        </div>
      </section>
    </>
  )
}

const SIDEREAL_IMAGES = [
  '/assets/sidereal/sidereal-1.jpg',
  '/assets/sidereal/sidereal-2.jpg',
  '/assets/sidereal/sidereal-3.jpg',
]

function SiderealBody() {
  return (
    <>
      <section className="detail-body wrap">
        <Reveal><p className="pixel bare">Brand & Comunicazione</p></Reveal>
        <Reveal delay={0.05}>
          <p className="detail-lead">
            Per Sidereal ho curato l'intera identità del brand: dalla{' '}
            <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>direzione creativa</strong> alla
            fotografia prodotto, fino al disegno dei capi. Una comunicazione costruita attorno all'estetica
            del brand, minimalista e riconoscibile.
          </p>
        </Reveal>

        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {SIDEREAL_IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 0.07}>
              <div style={{ overflow: 'hidden', borderRadius: '1rem', border: '1px solid var(--line)' }}>
                <img
                  src={src}
                  alt={`Sidereal ${i + 1}`}
                  style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform .7s cubic-bezier(.19,1,.22,1)' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="cta-row" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Magnetic to="/lab" className="btn btn-fill">Torna ai progetti <Arrow s={15} /></Magnetic>
          <Magnetic to="/contatti" className="btn btn-ghost">Parliamone</Magnetic>
        </div>
      </section>
    </>
  )
}

const SCATOLIFICIO_IMAGES = [
  '/assets/scatolificio/scatolificio-1.jpg',
  '/assets/scatolificio/scatolificio-2.jpg',
  '/assets/scatolificio/scatolificio-3.jpg',
  '/assets/scatolificio/scatolificio-4.jpg',
]

function ScatolificioBody() {
  return (
    <>
      <section className="detail-body wrap">
        <Reveal><p className="pixel bare">Social Media & Content</p></Reveal>
        <Reveal delay={0.05}>
          <p className="detail-lead">
            Per lo <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>Scatolificio Artigiano</strong> ho costruito
            un sistema di content marketing tecnico: una strategia editoriale che racconta il prodotto e il processo
            artigianale per posizionare un'azienda manifatturiera B2B in un mercato industriale competitivo. Il concept{' '}
            <em>“La scatola non è un contenitore”</em> trasforma un oggetto comune nel racconto di un mestiere.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', display: 'flex', justifyContent: 'flex-start' }}>
            <div className="reel-vert">
              <video src="/video/scatolificio.mp4" autoPlay muted loop playsInline preload="metadata" />
            </div>
          </div>
        </Reveal>

        <div className="feed-grid">
          {SCATOLIFICIO_IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div className="feed-item">
                <img src={src} alt={`Scatolificio Artigiano — post ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="cta-row" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <Magnetic to="/lab" className="btn btn-fill">Torna ai progetti <Arrow s={15} /></Magnetic>
          <Magnetic to="/contatti" className="btn btn-ghost">Parliamone</Magnetic>
        </div>
      </section>
    </>
  )
}

/* Video pilotato dallo scroll: scorrendo giù il video avanza, scorrendo su torna
   indietro. currentTime mappato sul progresso di un "track" alto, con sticky. */
function ScrollVideo({ src }) {
  const trackRef = useRef(null)
  const vidRef = useRef(null)
  const rm = reduceMotion()

  useEffect(() => {
    if (rm) return
    const track = trackRef.current
    const v = vidRef.current
    if (!track || !v) return
    let raf = 0
    let duration = v.readyState >= 1 ? v.duration : 0
    const onMeta = () => { duration = v.duration || 0 }
    v.addEventListener('loadedmetadata', onMeta)
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!duration) return
      const rect = track.getBoundingClientRect()
      const total = Math.max(rect.height - window.innerHeight, 1)
      const passed = Math.min(Math.max(-rect.top, 0), total)
      const t = (passed / total) * duration
      if (Math.abs(t - v.currentTime) > 0.015) { try { v.currentTime = t } catch { /* seeking */ } }
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); v.removeEventListener('loadedmetadata', onMeta) }
  }, [rm])

  // Reduced motion: niente scrubbing, video in autoplay loop contenuto
  if (rm) {
    return (
      <section className="scrollvid scrollvid-static">
        <div className="scrollvid-stage">
          <video src={src} autoPlay muted loop playsInline preload="auto" />
        </div>
      </section>
    )
  }
  return (
    <section ref={trackRef} className="scrollvid">
      <div className="scrollvid-stage">
        <video ref={vidRef} src={src} muted playsInline preload="auto" />
        <span className="scrollvid-hint mono">Scorri per esplorare</span>
      </div>
    </section>
  )
}

function AiSystemsBody() {
  return (
    <>
      <section className="detail-body wrap" style={{ paddingBottom: 'clamp(2rem, 5vw, 4rem)' }}>
        <Reveal><p className="pixel bare">AI & Automazioni</p></Reveal>
        <Reveal delay={0.05}>
          <p className="detail-lead">
            Costruisco <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>sistemi operativi assistiti dall'AI</strong>:
            infrastrutture su misura — agenti, database centralizzati e workflow automatizzati — che raccolgono ogni
            prenotazione e contatto generato dalla tua attività in un asset definitivo e di tua proprietà.
          </p>
        </Reveal>
      </section>

      <ScrollVideo src="/video/ai-systems.mp4" />

      <section className="detail-body wrap" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="detail-grid">
          <div><span className="idx">01</span><h3>Contesto</h3><p>{AI_PROJECT.contesto}</p></div>
          <div><span className="idx">02</span><h3>Intervento</h3><p>{AI_PROJECT.intervento}</p></div>
          <div><span className="idx">03</span><h3>Asset</h3><p>{AI_PROJECT.asset}</p></div>
        </div>
        <div className="cta-row">
          <Magnetic to="/lab" className="btn btn-fill">Torna ai progetti <Arrow s={15} /></Magnetic>
          <Magnetic to="/contatti" className="btn btn-ghost">Parliamone</Magnetic>
        </div>
      </section>
    </>
  )
}

function DetailPage() {
  const { slug } = useParams()
  const item = getGalleryItem(slug)
  if (!item) return <Navigate to="/lab" replace />
  return (
    <article className="detail">
      <header data-hero="dark" className="detail-hero" style={{ background: slug === 'sonora' ? 'linear-gradient(135deg, #04091a 0%, #091428 100%)' : slug === 'sidereal' ? 'linear-gradient(135deg, #05080e 0%, #0c1120 100%)' : slug === 'sanitaria' ? 'linear-gradient(135deg, #061410 0%, #0d2a1e 100%)' : slug === 'santorso' ? 'linear-gradient(135deg, #0a1130 0%, #15246b 100%)' : slug === 'lucia' ? 'linear-gradient(135deg, #0c1830 0%, #20406b 100%)' : slug === 'maeng' ? 'linear-gradient(135deg, #05070c 0%, #0e1730 100%)' : slug === 'tiguido' ? 'linear-gradient(135deg, #1c1206 0%, #3a2410 100%)' : gradientFor(item) }}>
        <div className="hero-dots" aria-hidden="true" />
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal mount><Link to="/lab" className="detail-back" data-cursor><span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Arrow s={14} /></span> Torna alla gallery</Link></Reveal>
          <div className="detail-meta">
            <span className="mono" style={{ color: 'rgba(255,255,255,.7)' }}>({item.idx})</span>
            <span className="mono" style={{ color: 'rgba(255,255,255,.7)' }}>{item.tag}</span>
          </div>
          <h1 className="detail-h1 display">
            <LineReveal mount delay={0.05}>{item.title}</LineReveal>
          </h1>
        </div>
      </header>

      {slug === 'ai-systems' ? <AiSystemsBody /> : slug === 'sonora' ? <SonoraBody item={item} /> : slug === 'scatolificio' ? <ScatolificioBody /> : slug === 'sidereal' ? <SiderealBody /> : slug === 'sanitaria' ? <SanitariaBody /> : slug === 'santorso' ? <SantorsoBody /> : slug === 'lucia' ? <LuciaBody /> : slug === 'maeng' ? <MaEngBody /> : slug === 'tiguido' ? <TiGuidoBody /> : (
        <section className="detail-body wrap">
          <Reveal><p className="pixel">Template base</p></Reveal>
          <Reveal delay={0.05}><p className="detail-lead">Questa è una pagina-template essenziale: l'apertura della card dalla sfera atterra qui. Il focus del progetto è la galleria immersiva — questa scheda serve solo a dimostrare la transizione card → pagina.</p></Reveal>
          <div className="detail-grid">
            <div><span className="idx">01</span><h3>Contesto</h3><p>Card selezionata dalla galleria sferica WebGL.</p></div>
            <div><span className="idx">02</span><h3>Esperienza</h3><p>Drag inerziale, hover che solleva le card e zoom di apertura con velo cromatico.</p></div>
            <div><span className="idx">03</span><h3>Stack</h3><p>Three.js per la scena, GSAP per le transizioni, React Router per la pagina.</p></div>
          </div>
          <div className="cta-row">
            <Magnetic to="/lab" className="btn btn-fill">Torna alla gallery <Arrow s={15} /></Magnetic>
            <Magnetic to="/contatti" className="btn btn-ghost">Parliamone</Magnetic>
          </div>
        </section>
      )}
    </article>
  )
}

function LabPage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  return <SphereSection />
}

function ContattiPage() {
  return (
    <>
      <ContattiHero />
      <section id="con-form" className="con-main wrap">
        <Reveal><ContactForm /></Reveal>
        <Reveal delay={0.08}><ContactAside /></Reveal>
      </section>
      <Aspettative />
      <Dove />
      <Faq items={FAQ} title="Le domande che ricevo più spesso." />
      <CtaBlock
        kicker="(Parliamone)"
        titleA="Non aspettare il"
        titleB={<>momento <span className="serif">perfetto</span>.</>}
        body="Il momento perfetto non arriva mai: arriva quello in cui decidi di iniziare. Il tuo sito non deve essere perfetto al lancio, ma pensato per crescere."
        cta="Compila il modulo"
        ctaScroll="con-form"
      />
    </>
  )
}

/* ================================================================
   App — routing + smooth scroll
================================================================ */

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return null
}

/* Titolo/description per-rotta lato client (la SPA serve index.html statico ai
   browser, quindi il Worker non sempre inietta i meta: questo li garantisce). */
const PAGE_META = {
  '/': {
    title: 'Marco Andreoni — Sviluppo web, automazioni AI e comunicazione digitale',
    desc: 'Sviluppo web, automazioni AI e comunicazione digitale per piccole imprese e professionisti. Siti veloci e su misura, pensati per farti crescere.',
  },
  '/lab': {
    title: 'Lab — Progetti e casi reali · Marco Andreoni',
    desc: 'Lab: progetti, casi reali ed esempi del lavoro di Marco Andreoni tra sviluppo web, automazioni AI e comunicazione digitale.',
  },
  '/contatti': {
    title: 'Contatti — Marco Andreoni',
    desc: 'Contatta Marco Andreoni e prenota una consulenza gratuita di 15 minuti per sviluppo web, automazioni AI e comunicazione digitale.',
  },
}

function RouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    let meta = PAGE_META[pathname]
    if (!meta && pathname.startsWith('/lab/')) {
      const item = getGalleryItem(pathname.split('/')[2])
      meta = item
        ? { title: `${item.title} — Lab · Marco Andreoni`, desc: PAGE_META['/lab'].desc }
        : PAGE_META['/lab']
    }
    meta = meta || PAGE_META['/']
    document.title = meta.title
    const d = document.querySelector('meta[name="description"]')
    if (d) d.setAttribute('content', meta.desc)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    if (reduceMotion()) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  return (
    <>
      <Loader />
      <ScrollProgress />
      <ScrollToTop />
      <RouteMeta />
      <Nav />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/lab" element={<LabPage />} />
              <Route path="/lab/:slug" element={<DetailPage />} />
              <Route path="/contatti" element={<ContattiPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {location.pathname !== '/lab' && <Footer />}
    </>
  )
}
