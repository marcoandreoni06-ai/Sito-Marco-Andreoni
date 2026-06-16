import { useState } from 'react'
import { Check, ArrowUpRight, AlertCircle } from 'lucide-react'
import { submitContactForm } from '../services/contact'

const budgetOptions = ['Non lo so ancora', 'Sotto i 1.000€', '1.000€ – 3.000€', '3.000€ – 5.000€', 'Oltre 5.000€']

const inputBase =
  'field w-full rounded-xl border bg-panel px-4 py-3 text-sm text-ink placeholder-faint outline-none transition-all duration-200 focus:border-violet'

export default function ContactForm() {
  const [form, setForm] = useState({ nome: '', attivita: '', email: '', telefono: '', messaggio: '', budget: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function validate() {
    const e = {}
    if (!form.nome.trim()) e.nome = 'Inserisci il tuo nome'
    if (!form.attivita.trim()) e.attivita = 'Inserisci la tua attività'
    if (!form.email.trim()) e.email = 'Inserisci la tua email'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Inserisci un indirizzo email valido'
    if (!form.messaggio.trim()) e.messaggio = 'Scrivi un messaggio prima di inviare'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return

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

  function handleChange(ev) {
    const { name, value } = ev.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-line bg-panel p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full grad">
          <Check className="h-7 w-7 text-white" strokeWidth={3} />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
          Ricevuto. Grazie!
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Ti rispondo entro 24 ore. Se hai urgenza, scrivimi su{' '}
          <a href="https://linkedin.com/in/marcoandreoni" target="_blank" rel="noopener noreferrer" className="link-u font-medium text-ink">LinkedIn</a>{' '}
          o a{' '}
          <a href="mailto:info.mawebstudio@gmail.com" className="link-u font-medium text-ink">info.mawebstudio@gmail.com</a>.
        </p>
        <button onClick={() => setStatus('idle')} className="btn btn-ghost mt-7 px-6 py-3 text-sm">
          Invia un altro messaggio
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative overflow-hidden rounded-3xl border border-line bg-cream p-6 sm:p-8">
      {/* Strip gradiente: segnale premium sul punto di conversione */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 grad" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome e cognome" required error={errors.nome}>
          <input name="nome" type="text" value={form.nome} onChange={handleChange} placeholder="Mario Rossi"
            className={`${inputBase} ${errors.nome ? 'border-coral' : 'border-line'}`} />
        </Field>
        <Field label="Attività / Azienda" required error={errors.attivita}>
          <input name="attivita" type="text" value={form.attivita} onChange={handleChange} placeholder="La tua attività"
            className={`${inputBase} ${errors.attivita ? 'border-coral' : 'border-line'}`} />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Email" required error={errors.email}>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="mario@esempio.it"
            className={`${inputBase} ${errors.email ? 'border-coral' : 'border-line'}`} />
        </Field>
        <Field label="Telefono">
          <input name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="+39 333 1234567"
            className={`${inputBase} border-line`} />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Come posso aiutarti?" required error={errors.messaggio}>
          <textarea name="messaggio" rows={5} value={form.messaggio} onChange={handleChange}
            placeholder="Parlami del tuo progetto, dei tuoi obiettivi e di cosa ti serve. Più dettagli mi dai, più mirata sarà la mia risposta."
            className={`${inputBase} resize-y ${errors.messaggio ? 'border-coral' : 'border-line'}`} />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Budget indicativo">
          <select name="budget" value={form.budget} onChange={handleChange} className={`${inputBase} border-line`}>
            <option value="">Seleziona un'opzione</option>
            {budgetOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
          </select>
        </Field>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-faint">
        I tuoi dati saranno trattati nel rispetto del GDPR e usati solo per rispondere alla tua richiesta.
      </p>

      <button type="submit" disabled={status === 'loading'} className="btn btn-primary mt-5 w-full px-7 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'loading' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />
            Invio in corso…
          </>
        ) : (
          <>
            Invia messaggio
            <ArrowUpRight className="h-4 w-4" />
          </>
        )}
      </button>

      {status === 'error' && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-coral/40 bg-coral/10 p-4 text-sm text-ink-soft">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
          <p>
            Qualcosa è andato storto. Riprova tra poco o scrivimi direttamente a{' '}
            <a href="mailto:info.mawebstudio@gmail.com" className="link-u font-medium text-ink">info.mawebstudio@gmail.com</a>.
          </p>
        </div>
      )}
    </form>
  )
}

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="grad-text">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-coral">{error}</span>}
    </label>
  )
}
