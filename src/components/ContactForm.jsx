import { useState } from 'react'
import { submitContactForm } from '../services/contact'
import Reveal from './Reveal'

const budgetOptions = [
  'Non lo so ancora',
  'Sotto i 1.000\u20ac',
  '1.000\u20ac - 3.000\u20ac',
  '3.000\u20ac - 5.000\u20ac',
  'Oltre 5.000\u20ac',
]

export default function ContactForm() {
  const [form, setForm] = useState({
    nome: '',
    attivita: '',
    email: '',
    telefono: '',
    messaggio: '',
    budget: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function validate() {
    const errs = {}
    if (!form.nome.trim()) errs.nome = 'Inserisci il tuo nome'
    if (!form.attivita.trim()) errs.attivita = 'Inserisci la tua attività'
    if (!form.email.trim()) errs.email = 'Inserisci un indirizzo email valido'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Inserisci un indirizzo email valido'
    if (!form.messaggio.trim()) errs.messaggio = 'Scrivi un messaggio prima di inviare'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return

    setStatus('loading')
    try {
      await submitContactForm({
        nome: form.nome.trim(),
        attivita: form.attivita.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        messaggio: form.messaggio.trim(),
        budget: form.budget,
      })
      setStatus('success')
      setForm({ nome: '', attivita: '', email: '', telefono: '', messaggio: '', budget: '' })
    } catch {
      setStatus('error')
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-800 mb-2">
          Grazie, ho ricevuto il tuo messaggio!
        </p>
        <p className="text-sm text-green-700">
          Ti risponderò entro 24 ore. Se hai urgenza, puoi contattarmi direttamente su{' '}
          <a href="https://linkedin.com/in/marcoandreoni" target="_blank" rel="noopener noreferrer" className="underline">
            LinkedIn
          </a>{' '}
          o via email a{' '}
          <a href="mailto:marco@marcandreoni.it" className="underline">
            marco@marcandreoni.it
          </a>.
        </p>
      </div>
    )
  }

  return (
    <Reveal>
      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-brand-black mb-1.5">
            Nome e Cognome <span className="text-accent-salmon">*</span>
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            className={`w-full rounded-xl border ${errors.nome ? 'border-red-400' : 'border-brand-gray-200'} bg-white px-4 py-3 text-sm text-brand-black placeholder-brand-gray-300 outline-none transition-all focus:border-brand-black`}
            placeholder="Mario Rossi"
          />
          {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome}</p>}
        </div>

        <div>
          <label htmlFor="attivita" className="block text-sm font-medium text-brand-black mb-1.5">
            Attività / Azienda <span className="text-accent-salmon">*</span>
          </label>
          <input
            id="attivita"
            name="attivita"
            type="text"
            value={form.attivita}
            onChange={handleChange}
            className={`w-full rounded-xl border ${errors.attivita ? 'border-red-400' : 'border-brand-gray-200'} bg-white px-4 py-3 text-sm text-brand-black placeholder-brand-gray-300 outline-none transition-all focus:border-brand-black`}
            placeholder="La tua attività"
          />
          {errors.attivita && <p className="mt-1 text-xs text-red-500">{errors.attivita}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-1.5">
            Email <span className="text-accent-salmon">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full rounded-xl border ${errors.email ? 'border-red-400' : 'border-brand-gray-200'} bg-white px-4 py-3 text-sm text-brand-black placeholder-brand-gray-300 outline-none transition-all focus:border-brand-black`}
            placeholder="mario@esempio.it"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-brand-black mb-1.5">
            Telefono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
            className="w-full rounded-xl border border-brand-gray-200 bg-white px-4 py-3 text-sm text-brand-black placeholder-brand-gray-300 outline-none transition-all focus:border-brand-black"
            placeholder="+39 333 1234567"
          />
        </div>
      </div>

      <div>
        <label htmlFor="messaggio" className="block text-sm font-medium text-brand-black mb-1.5">
          Come posso aiutarti? <span className="text-accent-salmon">*</span>
        </label>
        <textarea
          id="messaggio"
          name="messaggio"
          rows={5}
          value={form.messaggio}
          onChange={handleChange}
          className={`w-full rounded-xl border ${errors.messaggio ? 'border-red-400' : 'border-brand-gray-200'} bg-white px-4 py-3 text-sm text-brand-black placeholder-brand-gray-300 outline-none transition-all focus:border-brand-black resize-y`}
          placeholder="Parlami del tuo progetto, dei tuoi obiettivi e di cosa ti serve. Più dettagli mi dai, più mirata sarà la mia risposta."
        />
        {errors.messaggio && <p className="mt-1 text-xs text-red-500">{errors.messaggio}</p>}
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-brand-black mb-1.5">
          Budget indicativo
        </label>
        <select
          id="budget"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          className="w-full rounded-xl border border-brand-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-all focus:border-brand-black"
        >
          <option value="">Seleziona un'opzione</option>
          {budgetOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <p className="text-xs text-brand-gray-300">
        I tuoi dati saranno trattati nel rispetto del GDPR e utilizzati esclusivamente per rispondere alla tua richiesta.
      </p>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-brand-black px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-gray-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Invio in corso...
          </>
        ) : (
          'Invia messaggio \u2192'
        )}
      </button>

      {status === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Qualcosa è andato storto. Riprova tra qualche minuto o scrivimi direttamente a{' '}
          <a href="mailto:marco@marcandreoni.it" className="underline">marco@marcandreoni.it</a>.
        </div>
      )}
    </form>
    </Reveal>
  )
}
