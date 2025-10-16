import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`
  }
  return xp.toString()
}

export function getLevelFromXP(xp: number): number {
  if (xp < 100) return 1
  if (xp < 250) return 2
  if (xp < 500) return 3
  if (xp < 750) return 4
  return 5
}

export function getXPForLevel(level: number): { min: number; max: number } {
  const levels = [
    { min: 0, max: 100 },
    { min: 100, max: 250 },
    { min: 250, max: 500 },
    { min: 500, max: 750 },
    { min: 750, max: Infinity }
  ]
  return levels[level - 1] || { min: 0, max: Infinity }
}

export function calculateProgress(current: number, target: number): number {
  return Math.min((current / target) * 100, 100)
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function getDifficultyColor(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy':
      return 'text-success-600 bg-success-50'
    case 'medium':
      return 'text-secondary-600 bg-secondary-50'
    case 'hard':
      return 'text-danger-600 bg-danger-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

export function getCourseColor(course: 'html' | 'css' | 'javascript'): string {
  switch (course) {
    case 'html':
      return 'text-orange-600 bg-orange-50'
    case 'css':
      return 'text-blue-600 bg-blue-50'
    case 'javascript':
      return 'text-yellow-600 bg-yellow-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}
