import Reveal from './Reveal'

export default function TrustBar() {
  const partners = ['Azienda X', 'Progetto Y', 'Collaborazione Z', 'Brand W']

  return (
    <section className="border-y border-brand-gray-100 bg-brand-cream py-10 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-brand-gray-300 uppercase tracking-wider mb-6">
            Hanno collaborato con me
          </p>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {partners.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-brand-gray-300 tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
