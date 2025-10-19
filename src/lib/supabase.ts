import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create client if we have real credentials
export const supabase = supabaseUrl.includes('placeholder') 
  ? null 
  : createClient(supabaseUrl, supabaseAnonKey)

export const createSupabaseClient = () => {
  // Check if we're in a browser environment and have credentials
  if (typeof window === 'undefined') {
    return null
  }
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key || url.includes('placeholder')) {
    return null
  }
  
  return createClientComponentClient()
}
