'use client'

import React, { useState, useEffect } from 'react'
import { LazyMonacoEditor } from '@/components/LazyMonacoEditor'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { HintSystem } from './HintSystem'
import { CodeValidator } from './CodeValidator'
import { 
  Play, 
  RotateCcw, 
  Lightbulb, 
  CheckCircle, 
  XCircle, 
  Clock,
  Target,
  Trophy
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
}

interface ChallengeInterfaceProps {
  challenge: Challenge
  onComplete: (xpEarned: number, timeTaken: number, hintsUsed: number) => void
  onNext: () => void
  onPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export function ChallengeInterface({
  challenge,
  onComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}: ChallengeInterfaceProps) {
  const [userCode, setUserCode] = useState(challenge.code_template)
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    feedback: string
  } | null>(null)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Timer effect
  useEffect(() => {
    if (!isCompleted) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [startTime, isCompleted])

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setUserCode(value)
      setValidationResult(null)
    }
  }

  const handleValidate = async () => {
    setIsValidating(true)
    try {
      const response = await fetch('/api/validate-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userCode,
          solution: challenge.solution,
          courseType: challenge.course_type
        }),
      })

      const result = await response.json()
      setValidationResult(result)

      if (result.isValid) {
        setIsCompleted(true)
        const timeTaken = Math.floor((Date.now() - startTime) / 1000)
        onComplete(challenge.xp_reward, timeTaken, hintsUsed)
      }
    } catch (error) {
      console.error('Error validating solution:', error)
      setValidationResult({
        isValid: false,
        feedback: 'Error validating solution. Please try again.'
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleReset = () => {
    setUserCode(challenge.code_template)
    setValidationResult(null)
    setHintsUsed(0)
    setStartTime(Date.now())
    setTimeElapsed(0)
    setIsCompleted(false)
  }

  const handleHintUsed = () => {
    setHintsUsed(prev => prev + 1)
  }

  const getLanguage = () => {
    switch (challenge.course_type) {
      case 'html': return 'html'
      case 'css': return 'css'
      case 'javascript': return 'javascript'
      default: return 'html'
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'danger'
      case 'medium': return 'secondary'
      case 'low': return 'success'
      default: return 'secondary'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Challenge Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{challenge.title}</CardTitle>
                <Badge variant="primary" size="sm">
                  {challenge.course_type.toUpperCase()}
                </Badge>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">XP Reward</span>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-secondary-600" />
                  <span className="font-medium">{challenge.xp_reward}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Time</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-primary-600" />
                  <span className="font-medium">{formatTime(timeElapsed)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Hints Used</span>
                <span className="font-medium">{hintsUsed}/3</span>
              </div>

              {challenge.bugs.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Bugs to Find:</p>
                  <div className="space-y-2">
                    {challenge.bugs.map((bug, index) => (
                      <div key={bug.id} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                        <span className="text-sm text-gray-600">
                          {bug.description}
                        </span>
                        <Badge 
                          variant={getSeverityColor(bug.severity)} 
                          size="sm"
                        >
                          {bug.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <HintSystem
            hints={challenge.hints}
            onHintUsed={handleHintUsed}
            hintsUsed={hintsUsed}
            disabled={isCompleted}
          />

          <div className="flex space-x-2">
            <Button
              onClick={handleValidate}
              disabled={isValidating || isCompleted}
              className="flex-1"
            >
              {isValidating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Validating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Check Solution
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isValidating}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {validationResult && (
            <Card className={validationResult.isValid ? 'border-success-200 bg-success-50' : 'border-danger-200 bg-danger-50'}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  {validationResult.isValid ? (
                    <CheckCircle className="w-5 h-5 text-success-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-danger-600" />
                  )}
                  <p className={`text-sm font-medium ${
                    validationResult.isValid ? 'text-success-700' : 'text-danger-700'
                  }`}>
                    {validationResult.feedback}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {isCompleted && (
            <Card className="border-success-200 bg-success-50">
              <CardContent className="p-4">
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-success-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-success-700 mb-1">Challenge Complete!</h3>
                  <p className="text-sm text-success-600">
                    You earned {challenge.xp_reward} XP in {formatTime(timeElapsed)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Code Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary-600" />
                Code Editor
              </CardTitle>
              <CardDescription>
                Fix the bugs in the code below. Use the hints if you need help!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <LazyMonacoEditor
                  height="500px"
                  language={getLanguage()}
                  value={userCode}
                  onChange={handleCodeChange}
                  theme="vs-light"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          Previous
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isValidating}
          >
            Reset
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!hasNext}
          >
            Next Challenge
          </Button>
        </div>
      </div>
    </div>
  )
}
