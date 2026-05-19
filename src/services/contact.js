import { supabase } from '../lib/supabaseClient'

export async function submitContactForm({ nome, attivita, email, telefono, messaggio, budget }) {
  const { data, error } = await supabase
    .from('contatti')
    .insert([{ nome, attivita, email, telefono, messaggio, budget }])

  if (error) {
    throw new Error(error.message)
  }

  return { success: true, data }
}
