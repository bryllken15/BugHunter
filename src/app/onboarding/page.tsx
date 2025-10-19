'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { 
  Target, 
  Trophy, 
  Star, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Code,
  Palette,
  Cpu,
  Users,
  Clock,
  BookOpen
} from 'lucide-react'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Bug Hunter!',
      description: 'Let\'s get you started on your coding journey',
      icon: Target,
      color: 'primary'
    },
    {
      id: 'assessment',
      title: 'Skill Assessment',
      description: 'Tell us about your coding experience',
      icon: BookOpen,
      color: 'secondary'
    },
    {
      id: 'tutorial',
      title: 'First Challenge Tutorial',
      description: 'Learn how to hunt bugs with a guided example',
      icon: Code,
      color: 'success'
    },
    {
      id: 'mechanics',
      title: 'Game Mechanics',
      description: 'Understand XP, levels, and achievements',
      icon: Trophy,
      color: 'danger'
    },
    {
      id: 'first-challenge',
      title: 'Your First Challenge',
      description: 'Put your skills to the test',
      icon: Target,
      color: 'primary'
    },
    {
      id: 'path-selection',
      title: 'Choose Your Path',
      description: 'Select your learning journey',
      icon: Star,
      color: 'secondary'
    },
    {
      id: 'goals',
      title: 'Set Your Goals',
      description: 'Define your daily learning targets',
      icon: Clock,
      color: 'success'
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Start your coding adventure',
      icon: CheckCircle,
      color: 'primary'
    }
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/dashboard')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BH</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Bug Hunter</h1>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <ProgressBar value={progress} />
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className={`w-16 h-16 bg-${currentStepData.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-8 h-8 text-${currentStepData.color}-600`} />
            </div>
            <CardTitle className="text-3xl">{currentStepData.title}</CardTitle>
            <CardDescription className="text-lg">{currentStepData.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="max-w-2xl mx-auto">
            {currentStep === 0 && (
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Welcome to your coding adventure! 🦸</h3>
                  <p className="text-gray-600">
                    Bug Hunter is a gamified platform that teaches you HTML, CSS, and JavaScript 
                    through interactive bug-hunting challenges. Think Duolingo, but for coding!
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <Code className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-primary-700">Interactive Learning</h4>
                    <p className="text-sm text-primary-600">Learn by fixing real code bugs</p>
                  </div>
                  
                  <div className="text-center p-4 bg-secondary-50 rounded-lg">
                    <Trophy className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-secondary-700">Gamified Progress</h4>
                    <p className="text-sm text-secondary-600">Earn XP, unlock badges, and level up</p>
                  </div>
                  
                  <div className="text-center p-4 bg-success-50 rounded-lg">
                    <Zap className="w-8 h-8 text-success-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-success-700">AI-Powered</h4>
                    <p className="text-sm text-success-600">Personalized challenges that adapt to you</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Let's assess your coding experience</h3>
                  <p className="text-gray-600">This helps us personalize your learning experience</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="cursor-pointer hover:border-primary-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Beginner</h4>
                      <p className="text-sm text-gray-600">New to coding or web development</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <Code className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Some Experience</h4>
                      <p className="text-sm text-gray-600">Familiar with basic HTML/CSS/JS</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <Trophy className="w-8 h-8 text-success-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Advanced</h4>
                      <p className="text-sm text-gray-600">Experienced developer looking to practice</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <Users className="w-8 h-8 text-danger-600 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Expert</h4>
                      <p className="text-sm text-gray-600">Professional developer seeking challenges</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Let's try your first challenge!</h3>
                  <p className="text-gray-600">We'll guide you through a simple HTML bug-hunting example</p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div className="mb-2">// Your first challenge: Find the missing tag!</div>
                  <div>&lt;html&gt;</div>
                  <div>&lt;head&gt;</div>
                  <div>&nbsp;&nbsp;&lt;title&gt;My Page&lt;/title&gt;</div>
                  <div>&lt;/head&gt;</div>
                  <div>&lt;body&gt;</div>
                  <div>&nbsp;&nbsp;&lt;h1&gt;Welcome&lt;/h1&gt;</div>
                  <div>&nbsp;&nbsp;&lt;p&gt;This is a paragraph</div>
                  <div>&lt;/body&gt;</div>
                  <div>&lt;/html&gt;</div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-yellow-600 text-xs">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Can you spot the bug?</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Look carefully at the paragraph tag. What's missing?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding the Game</h3>
                  <p className="text-gray-600">Here's how the gamification system works</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">XP Points</h4>
                        <p className="text-sm text-gray-600">Earn XP for completing challenges</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Levels</h4>
                        <p className="text-sm text-gray-600">Level up as you gain XP (5 levels total)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-success-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Achievements</h4>
                        <p className="text-sm text-gray-600">Unlock badges for milestones</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-danger-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-danger-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Streaks</h4>
                        <p className="text-sm text-gray-600">Maintain daily learning streaks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Speed Bonus</h4>
                        <p className="text-sm text-gray-600">Complete challenges quickly for bonus XP</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Hints</h4>
                        <p className="text-sm text-gray-600">Use hints wisely - they reduce XP rewards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready for your first real challenge?</h3>
                  <p className="text-gray-600">Let's put what you've learned into practice</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Challenge: Fix the Broken Link</h4>
                      <p className="text-sm text-blue-800 mb-3">
                        This HTML link is not working properly. Can you find and fix the issue?
                      </p>
                      <div className="bg-gray-900 rounded p-3 text-green-400 font-mono text-sm">
                        &lt;a href="https://example.com"&gt;Visit Example
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button size="lg" asChild>
                    <a href="/challenges/html">
                      <Target className="w-5 h-5 mr-2" />
                      Start Challenge
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Learning Path</h3>
                  <p className="text-gray-600">Select which course you'd like to focus on first</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="cursor-pointer hover:border-orange-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Code className="w-6 h-6 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">HTML</h4>
                      <p className="text-sm text-gray-600 mb-3">Learn web structure and markup</p>
                      <Badge variant="success" size="sm">Beginner Friendly</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-blue-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Palette className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">CSS</h4>
                      <p className="text-sm text-gray-600 mb-3">Master styling and layout</p>
                      <Badge variant="secondary" size="sm">Intermediate</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-yellow-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Cpu className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">JavaScript</h4>
                      <p className="text-sm text-gray-600 mb-3">Add interactivity to your sites</p>
                      <Badge variant="danger" size="sm">Advanced</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Set Your Daily Goals</h3>
                  <p className="text-gray-600">Choose how many challenges you'd like to complete each day</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="cursor-pointer hover:border-primary-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary-600 font-bold text-lg">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Light Learning</h4>
                      <p className="text-sm text-gray-600">1 challenge per day</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary-600 font-bold text-lg">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Moderate Learning</h4>
                      <p className="text-sm text-gray-600">2 challenges per day</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:border-primary-300 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary-600 font-bold text-lg">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Intensive Learning</h4>
                      <p className="text-sm text-gray-600">3+ challenges per day</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Notification Preferences</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="text-sm text-gray-700">Daily reminder to practice</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">Weekly progress summary</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                      <span className="text-sm text-gray-700">Achievement notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-success-600" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Congratulations! 🎉</h3>
                  <p className="text-lg text-gray-600">
                    You're all set to start your coding journey with Bug Hunter!
                  </p>
                </div>
                
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                  <h4 className="font-semibold text-primary-900 mb-3">Your Starting Stats:</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary-600">Level 1</p>
                      <p className="text-sm text-primary-700">Current Level</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary-600">0 XP</p>
                      <p className="text-sm text-primary-700">Total XP</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary-600">0</p>
                      <p className="text-sm text-primary-700">Badges</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-600">Ready to start hunting bugs?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" asChild>
                      <a href="/challenges">
                        <Target className="w-5 h-5 mr-2" />
                        Start Learning
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="/dashboard">
                        <Trophy className="w-5 h-5 mr-2" />
                        View Dashboard
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleSkip}
            >
              Skip Onboarding
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
