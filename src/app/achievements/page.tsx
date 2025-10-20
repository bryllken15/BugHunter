'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { getSupabase } from '@/lib/supabase'
import { User, UserProgress } from '@/types'
import { 
  Trophy, 
  Star, 
  Target, 
  Flame, 
  Code, 
  Palette, 
  Cpu,
  CheckCircle,
  Lock,
  ArrowRight,
  Zap
} from 'lucide-react'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xp_reward: number
  requirements: Record<string, any>
}

interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
  achievement: Achievement
}

export default function AchievementsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      const supabase = await getSupabase()
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
      
      // Fetch all achievements
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .order('xp_reward', { ascending: true })
      
      if (achievementsError) {
        console.error('Error fetching achievements:', achievementsError)
      } else {
        setAchievements(achievementsData || [])
      }
      
      // Fetch user achievements
      const { data: userAchievementsData, error: userAchievementsError } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements(*)
        `)
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false })
      
      if (userAchievementsError) {
        console.error('Error fetching user achievements:', userAchievementsError)
      } else {
        setUserAchievements(userAchievementsData || [])
      }
      
      // Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
      
      if (progressData) {
        setUserProgress(progressData)
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
          <p className="text-gray-600">Loading achievements...</p>
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
  const earnedAchievementIds = new Set(userAchievements.map(ua => ua.achievement_id))

  const getAchievementProgress = (achievement: Achievement) => {
    switch (achievement.name) {
      case 'First Bug Fixed':
        return {
          current: totalChallenges,
          target: 1,
          progress: Math.min((totalChallenges / 1) * 100, 100)
        }
      case 'HTML Master':
        const htmlProgress = userProgress.find(p => p.course_type === 'html')
        return {
          current: htmlProgress?.challenges_completed || 0,
          target: 10,
          progress: Math.min(((htmlProgress?.challenges_completed || 0) / 10) * 100, 100)
        }
      case 'CSS Wizard':
        const cssProgress = userProgress.find(p => p.course_type === 'css')
        return {
          current: cssProgress?.challenges_completed || 0,
          target: 10,
          progress: Math.min(((cssProgress?.challenges_completed || 0) / 10) * 100, 100)
        }
      case 'JavaScript Jedi':
        const jsProgress = userProgress.find(p => p.course_type === 'javascript')
        return {
          current: jsProgress?.challenges_completed || 0,
          target: 10,
          progress: Math.min(((jsProgress?.challenges_completed || 0) / 10) * 100, 100)
        }
      case 'Learning Legend':
        const currentLevel = Math.max(...userProgress.map(p => p.current_level), 1)
        return {
          current: currentLevel,
          target: 5,
          progress: Math.min((currentLevel / 5) * 100, 100)
        }
      case 'Bug Slayer':
        return {
          current: totalChallenges,
          target: 30,
          progress: Math.min((totalChallenges / 30) * 100, 100)
        }
      case 'Streak Master':
        return {
          current: maxStreak,
          target: 7,
          progress: Math.min((maxStreak / 7) * 100, 100)
        }
      default:
        return {
          current: 0,
          target: 1,
          progress: 0
        }
    }
  }

  const getAchievementIcon = (achievement: Achievement) => {
    switch (achievement.name) {
      case 'First Bug Fixed': return '🐛'
      case 'HTML Master': return '🌐'
      case 'CSS Wizard': return '🎨'
      case 'JavaScript Jedi': return '⚡'
      case 'Speed Coder': return '🏃'
      case 'Perfect Score': return '🎯'
      case 'Streak Master': return '🔥'
      case 'Code Detective': return '🔍'
      case 'Learning Legend': return '👑'
      case 'Bug Slayer': return '⚔️'
      default: return '🏆'
    }
  }

  const earnedAchievements = achievements.filter(a => earnedAchievementIds.has(a.id))
  const lockedAchievements = achievements.filter(a => !earnedAchievementIds.has(a.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Achievements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your progress and unlock badges as you master coding challenges. 
            Each achievement brings you closer to becoming a coding legend!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{earnedAchievements.length}</p>
                  <p className="text-sm text-gray-600">Achievements</p>
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
                  <Target className="w-6 h-6 text-success-600" />
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

        {/* Earned Achievements */}
        {earnedAchievements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-success-600 mr-2" />
              Earned Achievements ({earnedAchievements.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earnedAchievements.map((achievement) => {
                const userAchievement = userAchievements.find(ua => ua.achievement_id === achievement.id)
                return (
                  <Card key={achievement.id} className="border-success-200 bg-success-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl">{getAchievementIcon(achievement)}</div>
                        <Badge variant="success" size="sm">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{achievement.name}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">XP Reward</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-secondary-600" />
                          <span className="font-medium">{achievement.xp_reward}</span>
                        </div>
                      </div>
                      {userAchievement && (
                        <p className="text-xs text-gray-500 mt-2">
                          Earned on {new Date(userAchievement.earned_at).toLocaleDateString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lock className="w-6 h-6 text-gray-400 mr-2" />
            Locked Achievements ({lockedAchievements.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedAchievements.map((achievement) => {
              const progress = getAchievementProgress(achievement)
              return (
                <Card key={achievement.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl grayscale">{getAchievementIcon(achievement)}</div>
                      <Badge variant="secondary" size="sm">
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{achievement.name}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{progress.current}/{progress.target}</span>
                      </div>
                      <ProgressBar value={progress.progress} />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">XP Reward</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-secondary-600" />
                        <span className="font-medium">{achievement.xp_reward}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary-600" />
                Continue Learning
              </CardTitle>
              <CardDescription>
                Keep earning achievements by completing more challenges
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
                <Zap className="w-5 h-5 mr-2 text-secondary-600" />
                Random Challenge
              </CardTitle>
              <CardDescription>
                Get a surprise challenge to earn XP and unlock achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="/challenges/random">
                  <Zap className="w-4 h-4 mr-2" />
                  Surprise Me!
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
