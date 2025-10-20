'use client'

import { getSupabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'

export default function DebugPage() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionInfo, setSessionInfo] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only run on client side
    if (!mounted) return
    
    // Check current session and localStorage
    const checkSession = async () => {
      const supabase = getSupabase()
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession()
        const storageKey = 'sb-kagxizmnfjgcljbvsyzy-auth-token'
        const stored = localStorage.getItem(storageKey)
        
        // Check all localStorage keys that might contain session data
        const allKeys = Object.keys(localStorage)
        const supabaseKeys = allKeys.filter(key => key.includes('supabase') || key.includes('sb-'))
        
        // Parse the stored session data
        let parsedSession = null
        if (stored) {
          try {
            parsedSession = JSON.parse(stored)
          } catch (e) {
            console.error('Error parsing stored session:', e)
          }
        }
        
        setSessionInfo(`
Current Session: ${session ? 'EXISTS' : 'NONE'}
User: ${session?.user?.email || 'N/A'}
Storage Key: ${storageKey}
Stored Data: ${stored ? 'EXISTS' : 'NONE'}
Stored User: ${parsedSession?.user?.email || 'N/A'}
All Supabase Keys: ${supabaseKeys.join(', ')}
All localStorage keys: ${allKeys.slice(0, 10).join(', ')}
        `)
      }
    }
    checkSession()
  }, [mounted])

  const testLogin = async () => {
    if (!mounted) return
    
    setLoading(true)
    setResult('Testing...')
    
    try {
      const supabase = getSupabase()
      console.log('Supabase client:', supabase)
      
      if (!supabase) {
        setResult('ERROR: Supabase client is null')
        return
      }
      
      setResult('Supabase client created successfully')
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'bryllekennethmendez@gmail.com',
        password: 'BKMmkb15',
      })
      
      if (error) {
        setResult(`ERROR: ${error.message}`)
      } else {
        setResult(`SUCCESS: User logged in - ${data.user?.email}`)
        // Refresh session info after login
        setTimeout(() => {
          const { data: { session } } = supabase.auth.getSession()
          const storageKey = 'sb-kagxizmnfjgcljbvsyzy-auth-token'
          const stored = localStorage.getItem(storageKey)
          setSessionInfo(`
Current Session: ${session ? 'EXISTS' : 'NONE'}
User: ${session?.user?.email || 'N/A'}
Storage Key: ${storageKey}
Stored Data: ${stored ? 'EXISTS' : 'NONE'}
          `)
        }, 1000)
      }
    } catch (err) {
      setResult(`EXCEPTION: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      <div className="mb-4">
        <p>Environment Variables:</p>
        <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'}</p>
        <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'}</p>
      </div>
      <div className="mb-4 p-4 bg-yellow-50 rounded">
        <h3 className="font-bold mb-2">Session Information:</h3>
        <pre className="text-sm">{sessionInfo}</pre>
      </div>
      <button 
        onClick={testLogin}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Login'}
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Test Results:</h3>
        <pre>{result}</pre>
      </div>
    </div>
  )
}
