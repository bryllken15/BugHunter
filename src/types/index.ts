export interface User {
  id: string
  email: string
  display_name?: string
  skill_level?: 'beginner' | 'intermediate' | 'advanced'
  created_at: string
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  course_type: 'html' | 'css' | 'javascript'
  challenges_completed: number
  total_xp: number
  current_level: number
  streak_days: number
  last_activity: string
  created_at: string
  updated_at: string
}

export interface Challenge {
  id: string
  course_type: 'html' | 'css' | 'javascript'
  difficulty: 'easy' | 'medium' | 'hard'
  title: string
  description: string
  code_template: string
  bugs: Bug[]
  hints: string[]
  solution: string
  xp_reward: number
  created_at: string
}

export interface Bug {
  id: string
  line: number
  description: string
  type: 'syntax' | 'logic' | 'performance' | 'security'
  severity: 'low' | 'medium' | 'high'
}

export interface ChallengeAttempt {
  id: string
  user_id: string
  challenge_id: string
  completed: boolean
  time_taken: number
  hints_used: number
  xp_earned: number
  attempted_at: string
  completed_at?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xp_reward: number
  requirements: Record<string, any>
  created_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
}

export interface OnboardingData {
  experience_level: 'beginner' | 'some_experience' | 'advanced'
  interests: string[]
  learning_style: 'interactive' | 'step_by_step' | 'random' | 'collaborative'
  time_commitment: '5_10_min' | '15_30_min' | '30_60_min' | 'flexible'
  goals: string[]
}

export interface DailyGoal {
  challenges_per_day: number
  reminder_enabled: boolean
  preferred_time?: string
  notifications_enabled: boolean
}
