// Accessibility utilities for Bug Hunter

export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

export function getAriaLabel(text: string, context?: string): string {
  return context ? `${text}, ${context}` : text
}

export function getAriaDescribedBy(...ids: string[]): string {
  return ids.filter(Boolean).join(' ')
}

export function getRoleDescription(role: string, description: string): string {
  return `${role}, ${description}`
}

// Focus management utilities
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)
  firstElement?.focus()

  return () => element.removeEventListener('keydown', handleTabKey)
}

// Screen reader announcements
export function announceToScreenReader(message: string) {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Keyboard navigation helpers
export function handleKeyNavigation(
  event: KeyboardEvent,
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void
) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      onEnter?.()
      break
    case 'Escape':
      onEscape?.()
      break
    case 'ArrowUp':
      onArrowUp?.()
      break
    case 'ArrowDown':
      onArrowDown?.()
      break
  }
}
