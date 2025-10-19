'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { createSupabaseClient } from '@/lib/supabase'
import { User, UserProgress } from '@/types'
import { PageLoading, CardSkeleton } from '@/components/LoadingSpinner'
import { 
  Target, 
  Trophy, 
  BarChart3, 
  Zap, 
  Code, 
  Palette, 
  Cpu,
  ArrowRight,
  Flame,
  Star
} from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      if (!supabase) {
        console.warn('Supabase not configured')
        setLoading(false)
        return
      }
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      
      setUser({
        id: user.id,
        email: user.email || '',
        display_name: user.user_metadata?.display_name,
        skill_level: user.user_metadata?.skill_level,
        created_at: user.created_at,
        updated_at: user.updated_at || user.created_at
      })
      
      // Fetch user progress
      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
      
      if (progress) {
        setUserProgress(progress)
      }
      
      setLoading(false)
    }
    
    getUser()
  }, [router, supabase])

  if (loading) {
    return <PageLoading message="Loading your dashboard..." />
  }

  if (!user) {
    return null
  }

  const totalXP = userProgress.reduce((sum, progress) => sum + progress.total_xp, 0)
  const currentLevel = Math.max(...userProgress.map(p => p.current_level), 1)
  const totalChallenges = userProgress.reduce((sum, progress) => sum + progress.challenges_completed, 0)
  const currentStreak = Math.max(...userProgress.map(p => p.streak_days), 0)

  const courses = [
    {
      id: 'html',
      name: 'HTML',
      icon: Code,
      color: 'orange',
      progress: userProgress.find(p => p.course_type === 'html')?.challenges_completed || 0,
      total: 10,
      description: 'Learn web structure and markup'
    },
    {
      id: 'css',
      name: 'CSS',
      icon: Palette,
      color: 'blue',
      progress: userProgress.find(p => p.course_type === 'css')?.challenges_completed || 0,
      total: 10,
      description: 'Master styling and layout'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: Cpu,
      color: 'yellow',
      progress: userProgress.find(p => p.course_type === 'javascript')?.challenges_completed || 0,
      total: 10,
      description: 'Add interactivity to your sites'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.display_name || 'Coder'}! 👋
          </h1>
          <p className="text-gray-600">
            Ready to hunt some bugs? Let's continue your coding journey.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{totalXP}</p>
                  <p className="text-sm text-gray-600">Total XP</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{totalChallenges}</p>
                  <p className="text-sm text-gray-600">Challenges</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-success-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">Level {currentLevel}</p>
                  <p className="text-sm text-gray-600">Current Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
                  <Flame className="w-6 h-6 text-danger-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{currentStreak}</p>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary-600" />
                  Continue Learning
                </CardTitle>
                <CardDescription>
                  Pick up where you left off or start a new challenge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => {
                    const Icon = course.icon
                    const progress = (course.progress / course.total) * 100
                    
                    return (
                      <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-${course.color}-100 rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${course.color}-600`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{course.name}</h3>
                            <p className="text-sm text-gray-600">{course.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {course.progress}/{course.total}
                            </p>
                            <p className="text-xs text-gray-500">challenges</p>
                          </div>
                          <div className="w-20">
                            <ProgressBar value={progress} size="sm" />
                          </div>
                          <Button size="sm" asChild>
                            <a href={`/challenges/${course.id}`}>
                              Continue
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-secondary-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="/challenges">
                    <Target className="w-4 h-4 mr-2" />
                    Random Challenge
                  </a>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="/achievements">
                    <Trophy className="w-4 h-4 mr-2" />
                    View Achievements
                  </a>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <a href="/progress">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Progress Report
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-success-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">First Bug Fixed</p>
                      <p className="text-xs text-gray-500">Completed your first challenge</p>
                    </div>
                  </div>
                  {currentStreak > 0 && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-danger-100 rounded-full flex items-center justify-center">
                        <Flame className="w-4 h-4 text-danger-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Streak Master</p>
                        <p className="text-xs text-gray-500">{currentStreak} day streak</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
