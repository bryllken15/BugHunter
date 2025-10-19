# Bug Hunter - Testing Guide

This document outlines the testing strategy and procedures for the Bug Hunter application.

## 🧪 Testing Strategy

### 1. Unit Tests
- **Components**: Test individual React components
- **Utilities**: Test helper functions and utilities
- **API Routes**: Test server-side logic

### 2. Integration Tests
- **Authentication Flow**: Login, register, logout
- **Challenge System**: AI generation, validation, completion
- **Gamification**: XP, levels, achievements, streaks

### 3. End-to-End Tests
- **User Journey**: Complete onboarding to challenge completion
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome

## 🚀 Running Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Set up test environment
cp .env.example .env.test
```

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=Button.test.tsx

# Run tests in CI mode
npm run test:ci
```

## 📋 Test Coverage

### Core Components (100% coverage target)
- [ ] `Button` - All variants and states
- [ ] `Card` - All content types
- [ ] `ProgressBar` - Animation and accessibility
- [ ] `Badge` - All achievement types
- [ ] `Header` - Navigation and mobile menu
- [ ] `Footer` - Links and social media

### Authentication (100% coverage target)
- [ ] `LoginForm` - Validation and submission
- [ ] `RegisterForm` - Validation and submission
- [ ] `AuthProvider` - State management
- [ ] `ProtectedRoute` - Access control

### Game Components (90% coverage target)
- [ ] `ChallengeInterface` - Code editing and validation
- [ ] `HintSystem` - Progressive hints
- [ ] `CodeValidator` - Solution validation
- [ ] `AchievementUnlock` - Animation and display

### Utilities (100% coverage target)
- [ ] `supabase.ts` - Database operations
- [ ] `ai.ts` - AI integration
- [ ] `gamification.ts` - Game mechanics
- [ ] `accessibility.ts` - Accessibility helpers

## 🔍 Test Categories

### 1. Component Tests
```typescript
// Example: Button component test
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })
})
```

### 2. Integration Tests
```typescript
// Example: Authentication flow test
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '@/components/auth/LoginForm'

describe('Authentication Flow', () => {
  it('logs in user successfully', async () => {
    render(<LoginForm />)
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }))
    
    await waitFor(() => {
      expect(screen.getByText('Welcome back!')).toBeInTheDocument()
    })
  })
})
```

### 3. API Route Tests
```typescript
// Example: Challenge generation API test
import { POST } from '@/app/api/generate-challenge/route'
import { NextRequest } from 'next/server'

describe('/api/generate-challenge', () => {
  it('generates challenge successfully', async () => {
    const request = new NextRequest('http://localhost:3000/api/generate-challenge', {
      method: 'POST',
      body: JSON.stringify({
        courseType: 'html',
        difficulty: 'beginner',
        topic: 'forms'
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.challenge).toBeDefined()
    expect(data.challenge.title).toBeDefined()
  })
})
```

## 🎯 Test Scenarios

### 1. User Onboarding
- [ ] **Step 1**: Welcome screen displays correctly
- [ ] **Step 2**: Skill assessment questions work
- [ ] **Step 3**: Course selection saves preferences
- [ ] **Step 4**: Goal setting updates user profile
- [ ] **Step 5**: Notification preferences work
- [ ] **Step 6**: Profile completion saves data
- [ ] **Step 7**: Tutorial completion marks as done
- [ ] **Step 8**: Dashboard redirect works

### 2. Challenge System
- [ ] **Challenge Loading**: AI generates appropriate challenges
- [ ] **Code Editing**: Monaco Editor works correctly
- [ ] **Hint System**: Progressive hints display properly
- [ ] **Validation**: Code validation works accurately
- [ ] **Completion**: XP and achievements awarded correctly
- [ ] **Progress**: User progress updates properly

### 3. Gamification
- [ ] **XP System**: Points awarded correctly
- [ ] **Level Progression**: Levels unlock at correct thresholds
- [ ] **Achievements**: Badges unlock when conditions met
- [ ] **Streaks**: Daily streaks track correctly
- [ ] **Leaderboards**: Rankings update properly

### 4. Mobile Experience
- [ ] **Touch Navigation**: All buttons respond to touch
- [ ] **Swipe Gestures**: Navigation works with swipes
- [ ] **Responsive Design**: Layout adapts to screen sizes
- [ ] **Performance**: Smooth animations on mobile devices

### 5. Accessibility
- [ ] **Screen Reader**: All content is accessible
- [ ] **Keyboard Navigation**: All features work with keyboard
- [ ] **ARIA Labels**: Proper labels for all interactive elements
- [ ] **Focus Management**: Focus moves logically through interface
- [ ] **Color Contrast**: Meets WCAG AA standards

## 🐛 Bug Testing

### Common Issues to Test
- [ ] **Authentication**: Login/logout edge cases
- [ ] **Data Persistence**: User progress saves correctly
- [ ] **Error Handling**: Graceful error recovery
- [ ] **Performance**: No memory leaks or slow rendering
- [ ] **Cross-browser**: Consistent behavior across browsers

### Error Scenarios
- [ ] **Network Issues**: Offline/online state handling
- [ ] **API Failures**: AI service unavailable
- [ ] **Invalid Input**: Malformed user data
- [ ] **Session Expiry**: Authentication timeout
- [ ] **Database Errors**: Connection issues

## 📊 Performance Testing

### Metrics to Monitor
- [ ] **Page Load Time**: < 2 seconds for initial load
- [ ] **Time to Interactive**: < 3 seconds
- [ ] **Bundle Size**: < 500KB for main bundle
- [ ] **Memory Usage**: < 100MB for typical session
- [ ] **CPU Usage**: < 50% during normal operation

### Tools for Performance Testing
- [ ] **Lighthouse**: Automated performance audits
- [ ] **WebPageTest**: Detailed performance analysis
- [ ] **Chrome DevTools**: Real-time performance monitoring
- [ ] **Bundle Analyzer**: Bundle size optimization

## 🔒 Security Testing

### Authentication Security
- [ ] **Password Requirements**: Strong password enforcement
- [ ] **Session Management**: Secure session handling
- [ ] **CSRF Protection**: Cross-site request forgery prevention
- [ ] **XSS Prevention**: Cross-site scripting protection

### Data Security
- [ ] **Input Validation**: All user input sanitized
- [ ] **SQL Injection**: Database query protection
- [ ] **API Security**: Rate limiting and authentication
- [ ] **Environment Variables**: Secure configuration

## 📱 Mobile Testing

### Device Testing
- [ ] **iPhone**: iOS Safari (latest 2 versions)
- [ ] **Android**: Chrome (latest 2 versions)
- [ ] **Tablet**: iPad and Android tablets
- [ ] **Responsive**: All screen sizes (320px - 1920px)

### Touch Testing
- [ ] **Touch Targets**: Minimum 44px touch targets
- [ ] **Gesture Support**: Swipe, pinch, zoom
- [ ] **Orientation**: Portrait and landscape modes
- [ ] **Performance**: Smooth 60fps animations

## 🚀 Deployment Testing

### Pre-deployment Checklist
- [ ] **Environment Variables**: All required variables set
- [ ] **Database**: Schema and data migrations complete
- [ ] **Build Process**: No build errors or warnings
- [ ] **Dependencies**: All packages up to date
- [ ] **Security**: No security vulnerabilities

### Post-deployment Verification
- [ ] **Health Check**: Application responds correctly
- [ ] **Database**: All tables and data accessible
- [ ] **Authentication**: Login/logout works
- [ ] **AI Integration**: Challenge generation works
- [ ] **PWA Features**: Service worker and manifest work

## 📈 Continuous Testing

### Automated Testing Pipeline
1. **Pre-commit**: Lint and format code
2. **Pull Request**: Run full test suite
3. **Merge**: Deploy to staging environment
4. **Production**: Deploy to production with monitoring

### Monitoring and Alerting
- [ ] **Error Tracking**: Sentry or similar service
- [ ] **Performance Monitoring**: Real-time performance metrics
- [ ] **User Analytics**: Usage patterns and behavior
- [ ] **Uptime Monitoring**: Service availability tracking

## 🎯 Success Criteria

### Test Coverage Goals
- **Unit Tests**: 90%+ coverage for all components
- **Integration Tests**: 80%+ coverage for user flows
- **E2E Tests**: 100% coverage for critical paths
- **Performance**: All Lighthouse scores > 90
- **Accessibility**: WCAG AA compliance

### Quality Gates
- [ ] **No Critical Bugs**: Zero critical issues in production
- [ ] **Performance**: All pages load < 3 seconds
- [ ] **Accessibility**: Full screen reader compatibility
- [ ] **Security**: No security vulnerabilities
- [ ] **Mobile**: Perfect mobile experience

---

**Remember**: Testing is not just about finding bugs, but ensuring a great user experience for all learners! 🧪✨
