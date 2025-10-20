import { createClient } from '@supabase/supabase-js'

// Global singleton instance to prevent multiple GoTrueClient instances
let _supabase: any = null

export const getSupabase = () => {
  if (typeof window === 'undefined') {
    return null
  }
  
  // Return existing instance if available
  if (_supabase) {
    return _supabase
  }
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key || url.includes('placeholder')) {
    console.warn('Supabase credentials not configured')
    return null
  }
  
  try {
    // Create single instance with consistent configuration
    _supabase = createClient(url, key, {
      auth: {
        storageKey: 'sb-kagxizmnfjgcljbvsyzy-auth-token',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
    console.log('Supabase client created successfully (singleton)')
    return _supabase
  } catch (error) {
    console.warn('Failed to create Supabase client:', error)
    return null
  }
}

// For backward compatibility, but this will be null during build
export const supabase = null

export const createSupabaseClient = () => {
  // Always use the single instance
  return getSupabase()
}
