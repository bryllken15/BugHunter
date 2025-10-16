import React from 'react'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'
import { Header } from '@/components/layout/Header'
import { ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to home
            </Link>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
