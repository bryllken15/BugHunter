'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react'

interface ValidationResult {
  isValid: boolean
  feedback: string
  errors?: Array<{
    line: number
    message: string
    severity: 'error' | 'warning' | 'info'
  }>
}

interface CodeValidatorProps {
  userCode: string
  solution: string
  courseType: 'html' | 'css' | 'javascript'
  onValidationComplete: (result: ValidationResult) => void
  disabled?: boolean
}

export function CodeValidator({
  userCode,
  solution,
  courseType,
  onValidationComplete,
  disabled = false
}: CodeValidatorProps) {
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)

  const validateCode = async () => {
    setIsValidating(true)
    setValidationResult(null)

    try {
      const response = await fetch('/api/validate-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userCode,
          solution,
          courseType
        }),
      })

      const result = await response.json()
      setValidationResult(result)
      onValidationComplete(result)
    } catch (error) {
      console.error('Error validating code:', error)
      const errorResult: ValidationResult = {
        isValid: false,
        feedback: 'Error validating code. Please try again.',
        errors: [{
          line: 1,
          message: 'Network error occurred during validation',
          severity: 'error'
        }]
      }
      setValidationResult(errorResult)
      onValidationComplete(errorResult)
    } finally {
      setIsValidating(false)
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XCircle className="w-4 h-4 text-danger-600" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-secondary-600" />
      case 'info':
        return <CheckCircle className="w-4 h-4 text-primary-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'danger'
      case 'warning':
        return 'secondary'
      case 'info':
        return 'primary'
      default:
        return 'secondary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <CheckCircle className="w-5 h-5 mr-2 text-primary-600" />
          Code Validator
        </CardTitle>
        <CardDescription>
          Check your code against the expected solution
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={validateCode}
          disabled={isValidating || disabled}
          className="w-full"
        >
          {isValidating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Validating...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Validate Code
            </>
          )}
        </Button>

        {validationResult && (
          <div className={`p-4 rounded-lg border ${
            validationResult.isValid 
              ? 'border-success-200 bg-success-50' 
              : 'border-danger-200 bg-danger-50'
          }`}>
            <div className="flex items-start space-x-2">
              {validationResult.isValid ? (
                <CheckCircle className="w-5 h-5 text-success-600 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-danger-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${
                  validationResult.isValid ? 'text-success-700' : 'text-danger-700'
                }`}>
                  {validationResult.feedback}
                </p>
                
                {validationResult.errors && validationResult.errors.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Issues found:</p>
                    {validationResult.errors.map((error, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        {getSeverityIcon(error.severity)}
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">
                            Line {error.line}: {error.message}
                          </p>
                        </div>
                        <Badge variant={getSeverityColor(error.severity)} size="sm">
                          {error.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• The validator checks for functional equivalence</p>
          <p>• Minor formatting differences are ignored</p>
          <p>• Different but correct approaches are accepted</p>
        </div>
      </CardContent>
    </Card>
  )
}
