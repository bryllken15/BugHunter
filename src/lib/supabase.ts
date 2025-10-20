import { createClient } from '@supabase/supabase-js'

// Lazy initialization to avoid build-time errors
let _supabase: any = null

export const getSupabase = () => {
  if (typeof window === 'undefined') {
    return null
  }
  
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!url || !key || url.includes('placeholder')) {
      console.warn('Supabase credentials not configured')
      return null
    }
    
    try {
      _supabase = createClient(url, key, {
        auth: {
          storageKey: 'sb-kagxizmnfjgcljbvsyzy-auth-token',
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
      console.log('Supabase client created successfully')
    } catch (error) {
      console.warn('Failed to create Supabase client:', error)
      return null
    }
  }
  
  return _supabase
}

// For backward compatibility, but this will be null during build
export const supabase = null

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
  
  try {
    // Use direct createClient with the same storage key to avoid multiple auth clients
    return createClient(url, key, {
      auth: {
        storageKey: 'sb-kagxizmnfjgcljbvsyzy-auth-token',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  } catch (error) {
    console.warn('Failed to create Supabase client component:', error)
    return null
  }
}
