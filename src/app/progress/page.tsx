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
  BarChart3, 
  Target, 
  Trophy, 
  Star, 
  Flame, 
  Clock,
  Code,
  Palette,
  Cpu,
  TrendingUp,
  Calendar,
  Award,
  ArrowRight
} from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function ProgressPage() {
  const [user, setUser] = useState<User | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [challengeAttempts, setChallengeAttempts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      const supabase = createSupabaseClient()
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
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
      
      if (progressData) {
        setUserProgress(progressData)
      }
      
      // Fetch challenge attempts for analytics
      const { data: attemptsData } = await supabase
        .from('challenge_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('attempted_at', { ascending: false })
        .limit(50)
      
      if (attemptsData) {
        setChallengeAttempts(attemptsData)
      }
      
      setLoading(false)
    }
    
    loadData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">BH</span>
          </div>
          <p className="text-gray-600">Loading progress...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const totalXP = userProgress.reduce((sum, progress) => sum + progress.total_xp, 0)
  const totalChallenges = userProgress.reduce((sum, progress) => sum + progress.challenges_completed, 0)
  const maxStreak = Math.max(...userProgress.map(p => p.streak_days), 0)
  const currentLevel = Math.max(...userProgress.map(p => p.current_level), 1)

  // Calculate skill radar data
  const skillData = [
    {
      subject: 'HTML',
      A: userProgress.find(p => p.course_type === 'html')?.challenges_completed || 0,
      fullMark: 10
    },
    {
      subject: 'CSS',
      A: userProgress.find(p => p.course_type === 'css')?.challenges_completed || 0,
      fullMark: 10
    },
    {
      subject: 'JavaScript',
      A: userProgress.find(p => p.course_type === 'javascript')?.challenges_completed || 0,
      fullMark: 10
    }
  ]

  // Calculate weekly progress data
  const weeklyData = challengeAttempts.reduce((acc, attempt) => {
    const date = new Date(attempt.attempted_at).toISOString().split('T')[0]
    if (!acc[date]) {
      acc[date] = { date, challenges: 0, xp: 0 }
    }
    acc[date].challenges += 1
    acc[date].xp += attempt.xp_earned || 0
    return acc
  }, {} as Record<string, { date: string; challenges: number; xp: number }>)

  const weeklyChartData = Object.values(weeklyData).slice(-7)

  // Calculate accuracy
  const completedAttempts = challengeAttempts.filter(a => a.completed)
  const accuracy = challengeAttempts.length > 0 ? (completedAttempts.length / challengeAttempts.length) * 100 : 0

  // Calculate average time
  const completedWithTime = challengeAttempts.filter(a => a.completed && a.time_taken)
  const avgTime = completedWithTime.length > 0 
    ? completedWithTime.reduce((sum, a) => sum + a.time_taken, 0) / completedWithTime.length 
    : 0

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const courses = [
    {
      id: 'html',
      name: 'HTML',
      icon: Code,
      color: 'orange',
      progress: userProgress.find(p => p.course_type === 'html')?.challenges_completed || 0,
      total: 10,
      xp: userProgress.find(p => p.course_type === 'html')?.total_xp || 0
    },
    {
      id: 'css',
      name: 'CSS',
      icon: Palette,
      color: 'blue',
      progress: userProgress.find(p => p.course_type === 'css')?.challenges_completed || 0,
      total: 10,
      xp: userProgress.find(p => p.course_type === 'css')?.total_xp || 0
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: Cpu,
      color: 'yellow',
      progress: userProgress.find(p => p.course_type === 'javascript')?.challenges_completed || 0,
      total: 10,
      xp: userProgress.find(p => p.course_type === 'javascript')?.total_xp || 0
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Progress Report
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your learning journey with detailed analytics and insights. 
            See how you're improving across different coding skills!
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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
                  <p className="text-2xl font-bold text-gray-900">{maxStreak}</p>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => {
              const Icon = course.icon
              const progress = (course.progress / course.total) * 100
              
              return (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${course.color}-100 rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${course.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>{course.progress}/{course.total} challenges</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                      </div>
                      <ProgressBar value={progress} />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">XP Earned</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-secondary-600" />
                        <span className="font-medium">{course.xp}</span>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full" asChild>
                      <a href={`/challenges/${course.id}`}>
                        Continue {course.name}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Skill Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
                Skill Overview
              </CardTitle>
              <CardDescription>
                Your proficiency across different coding skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 10]} />
                    <Radar
                      name="Challenges"
                      dataKey="A"
                      stroke="#2563EB"
                      fill="#2563EB"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-secondary-600" />
                Weekly Activity
              </CardTitle>
              <CardDescription>
                Your learning activity over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="challenges" stroke="#2563EB" name="Challenges" />
                    <Line type="monotone" dataKey="xp" stroke="#F59E0B" name="XP Earned" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-success-600" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-success-600">{Math.round(accuracy)}%</p>
                <p className="text-sm text-gray-600">Challenge Success Rate</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary-600" />
                Average Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">{formatTime(avgTime)}</p>
                <p className="text-sm text-gray-600">Per Challenge</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-secondary-600" />
                Learning Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-secondary-600">{maxStreak}</p>
                <p className="text-sm text-gray-600">Days in a Row</p>
              </div>
            </CardContent>
          </Card>
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
                Keep building your skills with more challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <a href="/challenges">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Start New Challenge
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-secondary-600" />
                View Achievements
              </CardTitle>
              <CardDescription>
                See all your unlocked badges and progress
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
