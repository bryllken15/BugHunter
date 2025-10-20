import { createClient } from '@supabase/supabase-js'

// Single instance pattern to prevent multiple GoTrueClient instances
let _supabase: any = null
let _isInitializing = false

export const getSupabase = () => {
  if (typeof window === 'undefined') {
    return null
  }
  
  if (_supabase) {
    return _supabase
  }
  
  if (_isInitializing) {
    // Wait for initialization to complete
    return new Promise((resolve) => {
      const checkInit = () => {
        if (_supabase) {
          resolve(_supabase)
        } else if (!_isInitializing) {
          resolve(null)
        } else {
          setTimeout(checkInit, 100)
        }
      }
      checkInit()
    })
  }
  
  _isInitializing = true
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key || url.includes('placeholder')) {
    console.warn('Supabase credentials not configured')
    _isInitializing = false
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
    _isInitializing = false
    return _supabase
  } catch (error) {
    console.warn('Failed to create Supabase client:', error)
    _isInitializing = false
    return null
  }
}

// For backward compatibility, but this will be null during build
export const supabase = null

export const createSupabaseClient = () => {
  // Always use the single instance
  return getSupabase()
}
