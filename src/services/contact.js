import { supabase } from '../lib/supabaseClient'

export async function submitContactForm({ nome, attivita, email, telefono, messaggio, budget }) {
  const { data, error } = await supabase
    .from('contatti')
    .insert([{ nome, attivita, email, telefono, messaggio, budget }])

  if (error) {
    throw new Error(error.message)
  }

  try {
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, attivita, email, telefono, messaggio, budget }),
    })
  } catch {
    // L'endpoint serverless sarà disponibile dopo il deploy su Cloudflare
  }

  return { success: true, data }
}
