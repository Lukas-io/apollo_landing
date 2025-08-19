import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface WaitlistEntry {
  id?: string
  email: string
  status?: string
  created_at?: string
}

export async function submitEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([{ 
        email, 
        status: 'pending' 
      }])

    if (error) {
      console.error('Error submitting email:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
