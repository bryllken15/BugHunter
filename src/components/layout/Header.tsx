'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Trophy, Home, Target, BarChart3, Settings, User } from 'lucide-react'
import { MobileNavigation } from './MobileNavigation'

interface HeaderProps {
  user?: {
    id: string
    email: string
    display_name?: string
    total_xp?: number
    current_level?: number
  }
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Challenges', href: '/challenges', icon: Target },
    { name: 'Achievements', href: '/achievements', icon: Trophy },
    { name: 'Progress', href: '/progress', icon: BarChart3 },
  ]
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BH</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Bug Hunter</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav id="navigation" className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          
          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* XP and Level */}
                <div className="hidden sm:flex items-center space-x-2">
                  <Badge variant="primary" size="sm">
                    Level {user.current_level || 1}
                  </Badge>
                  <Badge variant="secondary" size="sm">
                    {user.total_xp || 0} XP
                  </Badge>
                </div>
                
                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.display_name || 'User'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="primary" size="sm" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile Navigation */}
            <MobileNavigation user={user} />
          </div>
        </div>
      </div>
    </header>
  )
}
