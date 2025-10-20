'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ChallengeInterface } from '@/components/game/ChallengeInterface'
import { Button } from '@/components/ui/Button'
import { createSupabaseClient } from '@/lib/supabase'
import { updateUserProgress, checkAndAwardAchievements } from '@/lib/gamification'
import { User } from '@/types'
import { AchievementUnlock } from '@/components/game/AchievementUnlock'
import { 
  Code, 
  Palette, 
  Cpu, 
  ArrowLeft,
  Trophy,
  Star
} from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  code_template: string
  bugs: Array<{
    id: string
    line: number
    description: string
    type: 'syntax' | 'logic' | 'semantic'
    severity: 'low' | 'medium' | 'high'
  }>
  hints: string[]
  solution: string
  xp_reward: number
  course_type: 'html' | 'css' | 'javascript'
  difficulty: 'easy' | 'medium' | 'hard'
}

export default function ChallengePage() {
  const params = useParams()
  const router = useRouter()
  const courseType = params.courseType as string
  const challengeId = params.challengeId as string
  
  const [user, setUser] = useState<User | null>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [newAchievement, setNewAchievement] = useState<any>(null)
  const [showAchievement, setShowAchievement] = useState(false)

  const courseInfo = {
    html: { name: 'HTML', icon: Code, color: 'orange' },
    css: { name: 'CSS', icon: Palette, color: 'blue' },
    javascript: { name: 'JavaScript', icon: Cpu, color: 'yellow' }
  }

  const currentCourse = courseInfo[courseType as keyof typeof courseInfo]

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
      
      // Fetch challenge details
      if (!supabase) {
        console.warn('Supabase not configured')
        setLoading(false)
        return
      }
      
      const { data: challengeData, error: challengeError } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', challengeId)
        .single()
      
      if (challengeError) {
        console.error('Error fetching challenge:', challengeError)
        router.push(`/challenges/${courseType}`)
        return
      }
      
      setChallenge(challengeData)
      setLoading(false)
    }
    
    loadData()
  }, [challengeId, courseType, router])

  const handleChallengeComplete = async (xpEarned: number, timeTaken: number, hintsUsed: number) => {
    if (!user || !challenge) return
    
    const supabase = createSupabaseClient()
    if (!supabase) return
    
    setCompleting(true)
    
    try {
      // Record challenge attempt
      const { error: attemptError } = await supabase
        .from('challenge_attempts')
        .insert({
          user_id: user.id,
          challenge_id: challenge.id,
          completed: true,
          time_taken: timeTaken,
          hints_used: hintsUsed,
          xp_earned: xpEarned,
          completed_at: new Date().toISOString()
        })
      
      if (attemptError) {
        console.error('Error recording attempt:', attemptError)
      }
      
      // Update user progress
      await updateUserProgress(user.id, challenge.course_type, xpEarned, true)
      
      // Check for new achievements
      const newAchievements = await checkAndAwardAchievements(user.id)
      
      // Show completion message with achievements
      if (newAchievements.length > 0) {
        setNewAchievement(newAchievements[0].achievement)
        setShowAchievement(true)
      }
      
    } catch (error) {
      console.error('Error completing challenge:', error)
    } finally {
      setCompleting(false)
    }
  }

  const handleNext = () => {
    router.push(`/challenges/${courseType}`)
  }

  const handlePrevious = () => {
    router.push(`/challenges/${courseType}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">BH</span>
          </div>
          <p className="text-gray-600">Loading challenge...</p>
        </div>
      </div>
    )
  }

  if (!user || !challenge || !currentCourse) {
    return null
  }

  const Icon = currentCourse.icon

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      
      {/* Challenge Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/challenges/${courseType}`)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {currentCourse.name}
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-${currentCourse.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 text-${currentCourse.color}-600`} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{challenge.title}</h1>
                  <p className="text-sm text-gray-600">{currentCourse.name} Challenge</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-secondary-600" />
                <span className="text-sm font-medium">{challenge.xp_reward} XP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium capitalize">{challenge.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Challenge Interface */}
      <ChallengeInterface
        challenge={challenge}
        onComplete={handleChallengeComplete}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={false}
        hasPrevious={false}
      />
      
      <Footer />
      
      {/* Achievement Unlock Modal */}
      {newAchievement && (
        <AchievementUnlock
          achievement={newAchievement}
          isOpen={showAchievement}
          onClose={() => {
            setShowAchievement(false)
            setNewAchievement(null)
          }}
        />
      )}
    </div>
  )
}
