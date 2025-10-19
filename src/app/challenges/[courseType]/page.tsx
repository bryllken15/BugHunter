'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
  Play,
  CheckCircle,
  Lock
} from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  xp_reward: number
  course_type: string
  created_at: string
}

export default function CourseChallengesPage() {
  const params = useParams()
  const router = useRouter()
  const courseType = params.courseType as string
  
  const [user, setUser] = useState<User | null>(null)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  
  const supabase = createSupabaseClient()

  const courseInfo = {
    html: {
      name: 'HTML',
      icon: Code,
      color: 'orange',
      description: 'Learn the structure of web pages with interactive HTML challenges'
    },
    css: {
      name: 'CSS',
      icon: Palette,
      color: 'blue',
      description: 'Master styling and layout with CSS bug-hunting challenges'
    },
    javascript: {
      name: 'JavaScript',
      icon: Cpu,
      color: 'yellow',
      description: 'Add interactivity to your websites with JavaScript challenges'
    }
  }

  const currentCourse = courseInfo[courseType as keyof typeof courseInfo]

  useEffect(() => {
    const loadData = async () => {
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
      
      // Fetch challenges for this course
      const { data: challengesData, error: challengesError } = await supabase
        .from('challenges')
        .select('*')
        .eq('course_type', courseType)
        .order('created_at', { ascending: true })
      
      if (challengesError) {
        console.error('Error fetching challenges:', challengesError)
      } else {
        setChallenges(challengesData || [])
      }
      
      // Fetch user progress for this course
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_type', courseType)
        .single()
      
      if (progressData) {
        setUserProgress(progressData)
      }
      
      setLoading(false)
    }
    
    loadData()
  }, [courseType, router, supabase])

  const generateRandomChallenge = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/generate-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skill_level: user?.skill_level || 'beginner',
          course_type: courseType,
          user_weaknesses: [], // Could be enhanced to track user weaknesses
          previous_challenges: challenges.map(c => c.title)
        }),
      })

      const result = await response.json()
      if (result.success) {
        // Refresh challenges
        const { data: challengesData } = await supabase
          .from('challenges')
          .select('*')
          .eq('course_type', courseType)
          .order('created_at', { ascending: true })
        
        setChallenges(challengesData || [])
      }
    } catch (error) {
      console.error('Error generating challenge:', error)
    } finally {
      setGenerating(false)
    }
  }

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

  if (!user || !currentCourse) {
    return null
  }

  const Icon = currentCourse.icon
  const completedChallenges = userProgress?.challenges_completed || 0
  const totalChallenges = challenges.length
  const progress = totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success'
      case 'medium': return 'secondary'
      case 'hard': return 'danger'
      default: return 'secondary'
    }
  }

  const isChallengeUnlocked = (index: number) => {
    // First challenge is always unlocked
    if (index === 0) return true
    // Subsequent challenges are unlocked when previous ones are completed
    return completedChallenges > index
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 bg-${currentCourse.color}-100 rounded-lg flex items-center justify-center`}>
              <Icon className={`w-6 h-6 text-${currentCourse.color}-600`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentCourse.name} Challenges</h1>
              <p className="text-gray-600">{currentCourse.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{completedChallenges}/{totalChallenges}</span>
                </div>
                <ProgressBar value={progress} />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-bold text-gray-900">{userProgress?.total_xp || 0}</p>
                    <p className="text-sm text-gray-600">XP Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-success-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-bold text-gray-900">Level {userProgress?.current_level || 1}</p>
                    <p className="text-sm text-gray-600">Current Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Challenges List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Challenges</h2>
            <Button
              onClick={generateRandomChallenge}
              disabled={generating}
              variant="outline"
            >
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Random Challenge
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => {
              const isUnlocked = isChallengeUnlocked(index)
              const isCompleted = completedChallenges > index
              
              return (
                <Card 
                  key={challenge.id}
                  className={`transition-all duration-200 ${
                    isCompleted 
                      ? 'border-success-200 bg-success-50' 
                      : isUnlocked 
                        ? 'hover:shadow-lg hover:border-primary-300' 
                        : 'opacity-60'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        {isCompleted && <CheckCircle className="w-4 h-4 text-success-600" />}
                        {!isUnlocked && <Lock className="w-4 h-4 text-gray-400" />}
                      </div>
                      <Badge variant={getDifficultyColor(challenge.difficulty)} size="sm">
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">XP Reward</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-secondary-600" />
                        <span className="font-medium">{challenge.xp_reward}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      asChild
                      disabled={!isUnlocked}
                    >
                      <a href={`/challenges/${courseType}/${challenge.id}`}>
                        {isCompleted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : isUnlocked ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Challenge
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Locked
                          </>
                        )}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Button className="w-full" asChild>
                <a href="/challenges">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Back to All Courses
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-secondary-600" />
                Achievements
              </CardTitle>
              <CardDescription>
                View your progress and unlock new badges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="/achievements">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Achievements
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
