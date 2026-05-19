import { Link } from 'react-router-dom'
import heroVideo from '../assets/hf_20260518_170213_fdcf93e0-3c9c-4dbb-9bb5-cf6139efcfb6.mp4'
import Reveal from './Reveal'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 px-6 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white" />

      <div className="mx-auto max-w-3xl w-full relative z-10 text-center">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-orange mb-6 tracking-wider">
            MARKETING &middot; AI &middot; DIGITALE
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-black leading-tight">
            Trasformo la tua comunicazione in un vantaggio competitivo.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-base md:text-lg text-brand-gray-400 leading-relaxed max-w-2xl mx-auto">
            Marketing strategico, automazione AI e identità digitale per piccole imprese e professionisti che vogliono crescere senza sprecare tempo. Ogni progetto è costruito su misura, partendo da chi sei e dove vuoi arrivare.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contatti"
              className="rounded-full bg-brand-black px-7 py-3 text-sm font-medium text-white transition-all hover:bg-brand-gray-500"
            >
              Prenota una consulenza gratuita
            </Link>
            <Link
              to="/chi-sono"
              className="rounded-full border-2 border-brand-black px-7 py-3 text-sm font-medium text-brand-black transition-all hover:bg-brand-black hover:text-white"
            >
              Scopri come lavoro
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
