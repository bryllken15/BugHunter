import { getSupabase } from './supabase'

export interface UserProgress {
  user_id: string
  course_type: 'html' | 'css' | 'javascript'
  challenges_completed: number
  total_xp: number
  current_level: number
  streak_days: number
  last_activity: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xp_reward: number
  requirements: Record<string, any>
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
  achievement: Achievement
}

// Level thresholds
export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0 },
  { level: 2, xp: 100 },
  { level: 3, xp: 250 },
  { level: 4, xp: 500 },
  { level: 5, xp: 750 }
]

export function calculateLevel(totalXP: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i].xp) {
      return LEVEL_THRESHOLDS[i].level
    }
  }
  return 1
}

export function getXPToNextLevel(currentLevel: number, totalXP: number): number {
  const nextLevel = currentLevel + 1
  const nextLevelThreshold = LEVEL_THRESHOLDS.find(l => l.level === nextLevel)
  
  if (!nextLevelThreshold) {
    return 0 // Max level reached
  }
  
  return nextLevelThreshold.xp - totalXP
}

export function calculateXP(
  baseXP: number,
  timeBonus: boolean = false,
  hintPenalty: number = 0,
  streakMultiplier: number = 1
): number {
  let xp = baseXP
  
  // Time bonus (complete under 2 minutes)
  if (timeBonus) {
    xp = Math.floor(xp * 1.2)
  }
  
  // Hint penalty (reduce XP for using hints)
  if (hintPenalty > 0) {
    xp = Math.floor(xp * (1 - hintPenalty * 0.1))
  }
  
  // Streak multiplier
  if (streakMultiplier > 1) {
    xp = Math.floor(xp * streakMultiplier)
  }
  
  return Math.max(xp, 5) // Minimum 5 XP
}

export async function updateUserProgress(
  userId: string,
  courseType: 'html' | 'css' | 'javascript',
  xpEarned: number,
  challengeCompleted: boolean = true
): Promise<UserProgress> {
  try {
    // Check if Supabase is configured
    const supabase = getSupabase()
    if (!supabase) {
      throw new Error('Database not configured. Please set up environment variables.')
    }

    // Get current progress
    const { data: currentProgress, error: fetchError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_type', courseType)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    let streakDays = 0
    let lastActivity = now.toISOString()

    if (currentProgress) {
      // Check if user has activity today
      const lastActivityDate = new Date(currentProgress.last_activity)
      const lastActivityDay = new Date(
        lastActivityDate.getFullYear(),
        lastActivityDate.getMonth(),
        lastActivityDate.getDate()
      )
      
      const daysDiff = Math.floor((today.getTime() - lastActivityDay.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === 1) {
        // Consecutive day
        streakDays = currentProgress.streak_days + 1
      } else if (daysDiff === 0) {
        // Same day
        streakDays = currentProgress.streak_days
      } else {
        // Streak broken
        streakDays = 1
      }
      
      // Update progress
      const newTotalXP = currentProgress.total_xp + xpEarned
      const newChallengesCompleted = currentProgress.challenges_completed + (challengeCompleted ? 1 : 0)
      const newLevel = calculateLevel(newTotalXP)

      const { data, error } = await supabase
        .from('user_progress')
        .update({
          challenges_completed: newChallengesCompleted,
          total_xp: newTotalXP,
          current_level: newLevel,
          streak_days: streakDays,
          last_activity: lastActivity,
          updated_at: now.toISOString()
        })
        .eq('user_id', userId)
        .eq('course_type', courseType)
        .select()
        .single()

      if (error) throw error
      return data
    } else {
      // Create new progress record
      const newLevel = calculateLevel(xpEarned)
      streakDays = 1

      const { data, error } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          course_type: courseType,
          challenges_completed: challengeCompleted ? 1 : 0,
          total_xp: xpEarned,
          current_level: newLevel,
          streak_days: streakDays,
          last_activity: lastActivity
        })
        .select()
        .single()

      if (error) throw error
      return data
    }
  } catch (error) {
    console.error('Error updating user progress:', error)
    throw error
  }
}

export async function checkAndAwardAchievements(userId: string): Promise<UserAchievement[]> {
  try {
    // Check if Supabase is configured
    const supabase = getSupabase()
    if (!supabase) {
      throw new Error('Database not configured. Please set up environment variables.')
    }

    // Get user's total stats
    const { data: userProgress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)

    if (progressError) throw progressError

    const totalXP = userProgress?.reduce((sum: number, p: UserProgress) => sum + p.total_xp, 0) || 0
    const totalChallenges = userProgress?.reduce((sum: number, p: UserProgress) => sum + p.challenges_completed, 0) || 0
    const maxStreak = Math.max(...(userProgress?.map((p: UserProgress) => p.streak_days) || [0]))
    const currentLevel = calculateLevel(totalXP)

    // Get all achievements
    const { data: achievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('*')

    if (achievementsError) throw achievementsError

    // Get user's existing achievements
    const { data: userAchievements, error: userAchievementsError } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', userId)

    if (userAchievementsError) throw userAchievementsError

    const earnedAchievementIds = new Set(userAchievements?.map((ua: any) => ua.achievement_id) || [])
    const newAchievements: UserAchievement[] = []

    // Check each achievement
    for (const achievement of achievements || []) {
      if (earnedAchievementIds.has(achievement.id)) continue

      let shouldAward = false

      switch (achievement.name) {
        case 'First Bug Fixed':
          shouldAward = totalChallenges >= 1
          break
        case 'HTML Master':
          shouldAward = userProgress?.find((p: UserProgress) => p.course_type === 'html')?.challenges_completed >= 10
          break
        case 'CSS Wizard':
          shouldAward = userProgress?.find((p: UserProgress) => p.course_type === 'css')?.challenges_completed >= 10
          break
        case 'JavaScript Jedi':
          shouldAward = userProgress?.find((p: UserProgress) => p.course_type === 'javascript')?.challenges_completed >= 10
          break
        case 'Learning Legend':
          shouldAward = currentLevel >= 5
          break
        case 'Bug Slayer':
          shouldAward = totalChallenges >= 30
          break
        case 'Streak Master':
          shouldAward = maxStreak >= 7
          break
        case 'Speed Coder':
          // This would need to be tracked separately in challenge_attempts
          // For now, we'll skip this one
          break
        case 'Perfect Score':
          // This would need to be tracked separately in challenge_attempts
          // For now, we'll skip this one
          break
        case 'Code Detective':
          // This would need to be tracked separately in challenge_attempts
          // For now, we'll skip this one
          break
      }

      if (shouldAward) {
        // Award the achievement
        const { data: newAchievement, error: awardError } = await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_id: achievement.id
          })
          .select(`
            *,
            achievement:achievements(*)
          `)
          .single()

        if (awardError) {
          console.error('Error awarding achievement:', awardError)
        } else {
          newAchievements.push(newAchievement)
        }
      }
    }

    return newAchievements
  } catch (error) {
    console.error('Error checking achievements:', error)
    return []
  }
}

export async function getUserStats(userId: string) {
  try {
    // Check if Supabase is configured
    const supabase = getSupabase()
    if (!supabase) {
      throw new Error('Database not configured. Please set up environment variables.')
    }

    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)

    if (progressError) throw progressError

    const { data: achievements, error: achievementsError } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievement:achievements(*)
      `)
      .eq('user_id', userId)

    if (achievementsError) throw achievementsError

    const totalXP = progress?.reduce((sum: number, p: UserProgress) => sum + p.total_xp, 0) || 0
    const totalChallenges = progress?.reduce((sum: number, p: UserProgress) => sum + p.challenges_completed, 0) || 0
    const currentLevel = calculateLevel(totalXP)
    const maxStreak = Math.max(...(progress?.map((p: UserProgress) => p.streak_days) || [0]))

    return {
      totalXP,
      totalChallenges,
      currentLevel,
      maxStreak,
      progress: progress || [],
      achievements: achievements || []
    }
  } catch (error) {
    console.error('Error getting user stats:', error)
    throw error
  }
}
