import Marquee from './fx/Marquee'

const capabilities = [
  'Sviluppo web',
  'Automazioni AI',
  'SEO & Performance',
  'Identità visiva',
  'Social media',
  'Copywriting',
  'Strategia digitale',
  'Lead generation',
]

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-paper py-8">
      <div className="mx-auto mb-6 max-w-6xl px-6">
        <p className="text-center font-pixel text-[0.6rem] uppercase tracking-wider text-faint">
          Cosa so fare
        </p>
      </div>
      <Marquee items={capabilities} duration={30} />
    </section>
  )
}
