const card3i = [
  {
    letter: 'I',
    title: 'Informare',
    desc: "I tuoi clienti non comprano ciò che non capiscono. Ogni pagina del tuo sito, ogni post sui social, ogni email che inviamo ha un obiettivo preciso: educare il tuo pubblico. Spiegare perché il tuo prodotto vale, perché la tua esperienza conta, perché dovrebbero scegliere te. Non si tratta di riempire di testo. Si tratta di trasformare la tua competenza in contenuti di valore che accompagnano il cliente verso una decisione consapevole.",
    esempi: [
      'Un artigiano del legno che racconta il processo di realizzazione di un tavolo su misura',
      'Un professionista che pubblica guide e approfondimenti su LinkedIn',
      'Un sito che risponde alle domande più frequenti dei clienti prima ancora che vengano poste',
    ],
  },
  {
    letter: 'I',
    title: 'Ispirare',
    desc: "Le persone comprano emozioni, poi giustificano con la logica. Un design pulito, una storia ben raccontata, un flusso che sembra naturale perché è stato progettato minuziosamente — tutto questo crea fiducia. E la fiducia è ciò che trasforma un visitatore in cliente. Lavoro sull'identità visiva, sul tono di voce, sulla struttura delle pagine per fare in modo che chiunque atterri sul tuo sito provi qualcosa. Non solo capisca.",
    esempi: [
      'Homepage che racconta chi sei in 5 secondi',
      'Immagini coerenti che parlano la stessa lingua del tuo brand',
      'Una timeline visiva della tua storia o del tuo processo produttivo',
    ],
  },
  {
    letter: 'I',
    title: 'Intrattenere',
    desc: "Nessuno ha mai comprato da un noioso. Intrattenere non significa fare video virali o battute forzate. Significa rendere interessante ciò che fai. Significa trovare l'angolo giusto per raccontare la tua storia, il dettaglio che incuriosisce, il formato che tiene incollato. I migliori brand del mondo — grandi o piccoli che siano — hanno una cosa in comune: sanno tenerti attento. E non serve un budget da multinazionale. Serve capire cosa rende unica la tua storia e come raccontarla.",
    esempi: [
      'Un reel che mostra il "dietro le quinte" della lavorazione',
      'Un post che rompe uno stereotipo del tuo settore',
      'Una newsletter che non è una pubblicità ma un appuntamento fisso',
    ],
  },
]

import Reveal from './Reveal'

export default function Metodo3ISection() {
  return (
    <section className="py-24 px-6 bg-brand-black text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-16">
          <Reveal variant="pixel-step">
            <p className="text-xs font-pixel text-accent-coral tracking-wider mb-4">
              IL METODO 3I
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Il metodo 3I: Informare, Ispirare, Intrattenere.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-brand-gray-200 leading-relaxed">
              Tre parole guidano ogni progetto, grande o piccolo che sia. Tre pilastri su cui costruisco strategie, contenuti e tecnologie. Tre promesse che faccio a chi lavora con me.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {card3i.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <span className="text-2xl font-bold text-accent-orange">{c.letter}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
              <p className="text-sm text-brand-gray-200 leading-relaxed mb-6 flex-1">
                {c.desc}
              </p>
              <ul className="space-y-2">
                {c.esempi.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-xs text-brand-gray-300">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent-orange/50 flex-shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
