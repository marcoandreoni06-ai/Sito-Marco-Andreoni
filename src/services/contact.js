import { supabase } from '../lib/supabaseClient'

export async function submitContactForm({ nome, email, messaggio }) {
  const { data, error } = await supabase
    .from('contatti')
    .insert([{ nome, email, messaggio }])

  if (error) {
    throw new Error(error.message)
  }

  return { success: true, data }
}
