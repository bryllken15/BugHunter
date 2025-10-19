'use client'

import React, { Suspense, lazy } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

// Lazy load Monaco Editor
const MonacoEditor = lazy(() => import('@monaco-editor/react'))

interface LazyMonacoEditorProps {
  height?: string
  language?: string
  value?: string
  onChange?: (value: string | undefined) => void
  theme?: string
  options?: any
  className?: string
}

export function LazyMonacoEditor({
  height = '500px',
  language = 'html',
  value,
  onChange,
  theme = 'vs-light',
  options = {},
  className
}: LazyMonacoEditorProps) {
  const defaultOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    wordWrap: 'on',
    ...options
  }

  return (
    <div className={className}>
      <Suspense fallback={
        <div className="flex items-center justify-center w-full">
          <LoadingSpinner size="lg" text="Loading editor..." />
        </div>
      }>
        <MonacoEditor
          height={height}
          language={language}
          value={value}
          onChange={onChange}
          theme={theme}
          options={defaultOptions}
        />
      </Suspense>
    </div>
  )
}
