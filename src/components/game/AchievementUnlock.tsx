'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Trophy, Star, X } from 'lucide-react'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  xp_reward: number
}

interface AchievementUnlockProps {
  achievement: Achievement
  isOpen: boolean
  onClose: () => void
}

export function AchievementUnlock({ achievement, isOpen, onClose }: AchievementUnlockProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const getAchievementIcon = (name: string) => {
    switch (name) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Achievement Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md relative overflow-hidden">
              {/* Confetti Animation */}
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      initial={{ 
                        x: '50%', 
                        y: '50%', 
                        scale: 0,
                        rotate: 0 
                      }}
                      animate={{ 
                        x: `${Math.random() * 100}%`, 
                        y: `${Math.random() * 100}%`, 
                        scale: [0, 1, 0],
                        rotate: 360
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              )}

              <CardHeader className="text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <span className="text-4xl">{getAchievementIcon(achievement.name)}</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CardTitle className="text-2xl text-gray-900 mb-2">
                    Achievement Unlocked!
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {achievement.name}
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="text-center space-y-4 relative z-10">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-600"
                >
                  {achievement.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-center space-x-2"
                >
                  <Star className="w-5 h-5 text-secondary-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    +{achievement.xp_reward} XP
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="pt-4"
                >
                  <button
                    onClick={onClose}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Awesome!
                  </button>
                </motion.div>
              </CardContent>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close achievement notification"
                title="Close achievement notification"
              >
                <X className="w-5 h-5" />
              </button>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hook for managing achievement unlocks
export function useAchievementUnlock() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([])
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false)

  const unlockAchievement = (achievement: Achievement) => {
    setUnlockedAchievements(prev => [...prev, achievement])
    setCurrentAchievement(achievement)
    setIsUnlockModalOpen(true)
  }

  const closeUnlockModal = () => {
    setIsUnlockModalOpen(false)
    setCurrentAchievement(null)
  }

  return {
    unlockedAchievements,
    currentAchievement,
    isUnlockModalOpen,
    unlockAchievement,
    closeUnlockModal
  }
}
