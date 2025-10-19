'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  Menu, 
  X, 
  Home, 
  Target, 
  Trophy, 
  BarChart3, 
  User,
  Code,
  Palette,
  Cpu
} from 'lucide-react'

interface MobileNavigationProps {
  user?: {
    id: string
    email: string
    display_name?: string
  } | null
  userProgress?: Array<{
    course_type: string
    challenges_completed: number
    total_xp: number
    current_level: number
  }>
}

export function MobileNavigation({ user, userProgress = [] }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const totalXP = userProgress.reduce((sum, progress) => sum + progress.total_xp, 0)
  const totalChallenges = userProgress.reduce((sum, progress) => sum + progress.challenges_completed, 0)
  const currentLevel = Math.max(...userProgress.map(p => p.current_level), 1)

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: pathname === '/dashboard'
    },
    {
      name: 'Challenges',
      href: '/challenges',
      icon: Target,
      current: pathname.startsWith('/challenges')
    },
    {
      name: 'Achievements',
      href: '/achievements',
      icon: Trophy,
      current: pathname === '/achievements'
    },
    {
      name: 'Progress',
      href: '/progress',
      icon: BarChart3,
      current: pathname === '/progress'
    }
  ]

  const courseItems = [
    {
      name: 'HTML',
      href: '/challenges/html',
      icon: Code,
      color: 'orange',
      progress: userProgress.find(p => p.course_type === 'html')?.challenges_completed || 0,
      total: 10
    },
    {
      name: 'CSS',
      href: '/challenges/css',
      icon: Palette,
      color: 'blue',
      progress: userProgress.find(p => p.course_type === 'css')?.challenges_completed || 0,
      total: 10
    },
    {
      name: 'JavaScript',
      href: '/challenges/javascript',
      icon: Cpu,
      color: 'yellow',
      progress: userProgress.find(p => p.course_type === 'javascript')?.challenges_completed || 0,
      total: 10
    }
  ]

  const handleLogout = async () => {
    // Implement logout logic
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsOpen(false)} />
          
          <div className="fixed inset-y-0 left-0 w-80 max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">BH</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Bug Hunter</h2>
                    {user && (
                      <p className="text-sm text-gray-600">{user.display_name || 'Coder'}</p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* User Stats */}
              {user && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-gray-900">{totalXP}</p>
                      <p className="text-xs text-gray-600">XP</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{totalChallenges}</p>
                      <p className="text-xs text-gray-600">Challenges</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">Level {currentLevel}</p>
                      <p className="text-xs text-gray-600">Level</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Navigation
                  </h3>
                  <nav className="space-y-1">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            item.current
                              ? 'bg-primary-100 text-primary-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                {/* Courses */}
                <div className="p-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Courses
                  </h3>
                  <div className="space-y-2">
                    {courseItems.map((course) => {
                      const Icon = course.icon
                      const progress = (course.progress / course.total) * 100
                      
                      return (
                        <Link
                          key={course.name}
                          href={course.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <div className={`w-8 h-8 bg-${course.color}-100 rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 text-${course.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span>{course.name}</span>
                              <span className="text-xs text-gray-500">{course.progress}/{course.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className={`bg-${course.color}-600 h-1.5 rounded-full transition-all`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
