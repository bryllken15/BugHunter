'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { createSupabaseClient } from '@/lib/supabase'
import { User, UserProgress } from '@/types'
import { 
  Code, 
  Palette, 
  Cpu, 
  Target, 
  Zap, 
  Trophy,
  ArrowRight,
  Star,
  Clock,
  Users
} from 'lucide-react'

export default function ChallengesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">BH</span>
          </div>
          <p className="text-gray-600">Loading challenges...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const courses = [
    {
      id: 'html',
      name: 'HTML',
      icon: Code,
      color: 'orange',
      description: 'Learn the structure of web pages with interactive HTML challenges',
      progress: userProgress.find(p => p.course_type === 'html')?.challenges_completed || 0,
      total: 10,
      difficulty: 'Beginner',
      timeEstimate: '1-2 hours',
      features: ['Missing tags', 'Broken links', 'Form validation', 'Semantic structure']
    },
    {
      id: 'css',
      name: 'CSS',
      icon: Palette,
      color: 'blue',
      description: 'Master styling and layout with CSS bug-hunting challenges',
      progress: userProgress.find(p => p.course_type === 'css')?.challenges_completed || 0,
      total: 10,
      difficulty: 'Intermediate',
      timeEstimate: '1-2 hours',
      features: ['Layout issues', 'Responsive design', 'Animations', 'Cross-browser compatibility']
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: Cpu,
      color: 'yellow',
      description: 'Add interactivity to your websites with JavaScript challenges',
      progress: userProgress.find(p => p.course_type === 'javascript')?.challenges_completed || 0,
      total: 10,
      difficulty: 'Advanced',
      timeEstimate: '2-3 hours',
      features: ['DOM manipulation', 'Event handling', 'Async operations', 'Error handling']
    }
  ]

  const totalChallenges = userProgress.reduce((sum, progress) => sum + progress.challenges_completed, 0)
  const totalXP = userProgress.reduce((sum, progress) => sum + progress.total_xp, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Challenge
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select a course to start hunting bugs and level up your coding skills. 
            Each course is designed to build your expertise progressively.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{totalChallenges}</p>
                  <p className="text-sm text-gray-600">Challenges Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-secondary-600" />
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
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-success-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.max(...userProgress.map(p => p.current_level), 1)}
                  </p>
                  <p className="text-sm text-gray-600">Current Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {courses.map((course) => {
            const Icon = course.icon
            const progress = (course.progress / course.total) * 100
            const isCompleted = course.progress >= course.total
            
            return (
              <Card 
                key={course.id} 
                className={`hover:shadow-lg transition-all duration-200 ${
                  isCompleted ? 'border-success-200 bg-success-50' : 'hover:border-primary-300'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${course.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${course.color}-600`} />
                    </div>
                    {isCompleted && (
                      <Badge variant="success" size="sm">
                        <Trophy className="w-3 h-3 mr-1" />
                        Complete
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-xl">{course.name}</CardTitle>
                  <CardDescription className="text-base">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{course.progress}/{course.total}</span>
                    </div>
                    <ProgressBar value={progress} />
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Difficulty</span>
                      <Badge 
                        variant={course.difficulty === 'Beginner' ? 'success' : course.difficulty === 'Intermediate' ? 'secondary' : 'danger'}
                        size="sm"
                      >
                        {course.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="font-medium">{course.timeEstimate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">What you'll learn:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.features.map((feature, index) => (
                        <Badge key={index} variant="default" size="sm">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    asChild
                    disabled={isCompleted}
                  >
                    <a href={`/challenges/${course.id}`}>
                      {isCompleted ? (
                        <>
                          <Trophy className="w-4 h-4 mr-2" />
                          Course Complete
                        </>
                      ) : (
                        <>
                          Start {course.name} Challenges
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-secondary-600" />
                Random Challenge
              </CardTitle>
              <CardDescription>
                Get a surprise challenge from any course. Perfect for quick practice!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="/challenges/random">
                  <Target className="w-4 h-4 mr-2" />
                  Surprise Me!
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-600" />
                Community
              </CardTitle>
              <CardDescription>
                Join other learners and share your progress. Coming soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                <Users className="w-4 h-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
