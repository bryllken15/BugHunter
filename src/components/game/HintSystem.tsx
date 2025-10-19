'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Lightbulb, Eye, EyeOff } from 'lucide-react'

interface HintSystemProps {
  hints: string[]
  onHintUsed: () => void
  hintsUsed: number
  disabled?: boolean
}

export function HintSystem({ hints, onHintUsed, hintsUsed, disabled = false }: HintSystemProps) {
  const [showHints, setShowHints] = useState(false)

  const handleUseHint = () => {
    if (hintsUsed < hints.length) {
      onHintUsed()
    }
  }

  const getHintLevel = () => {
    if (hintsUsed === 0) return 'Beginner'
    if (hintsUsed === 1) return 'Intermediate'
    if (hintsUsed === 2) return 'Advanced'
    return 'Expert'
  }

  const getHintColor = (index: number) => {
    if (index < hintsUsed) return 'success'
    if (index === hintsUsed) return 'primary'
    return 'secondary'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Lightbulb className="w-5 h-5 mr-2 text-secondary-600" />
          Hint System
        </CardTitle>
        <CardDescription>
          Use hints to get help, but remember: fewer hints = more XP!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Hints Used:</span>
            <Badge variant="primary" size="sm">
              {hintsUsed}/{hints.length}
            </Badge>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHints(!showHints)}
            disabled={disabled}
          >
            {showHints ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Hide
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Show
              </>
            )}
          </Button>
        </div>

        {showHints && (
          <div className="space-y-3">
            {hints.map((hint, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  index < hintsUsed
                    ? 'border-success-200 bg-success-50'
                    : index === hintsUsed
                    ? 'border-primary-200 bg-primary-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <Badge
                    variant={getHintColor(index)}
                    size="sm"
                    className="mt-0.5"
                  >
                    {index + 1}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{hint}</p>
                    {index === hintsUsed && (
                      <p className="text-xs text-primary-600 mt-1 font-medium">
                        Current hint level: {getHintLevel()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-gray-200">
          <Button
            onClick={handleUseHint}
            disabled={hintsUsed >= hints.length || disabled}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {hintsUsed >= hints.length ? 'All Hints Used' : 'Use Next Hint'}
          </Button>
          
          {hintsUsed > 0 && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Using hints reduces your XP reward
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
