<!-- 00b0fdae-66b0-4888-bbd8-4e51fd251416 85edf3e6-fc7f-475d-835c-460d19540ceb -->
# Bug Hunter - Complete Development Plan

## Overview

Build a gamified coding education platform inspired by Duolingo for learning HTML, CSS, and JavaScript through AI-generated bug-hunting challenges. Development will proceed in 3 deployable phases.

## Phase 1: MVP Foundation (Week 1-2)

### 1.1 Project Setup

- Initialize Next.js 14 project with TypeScript, Tailwind CSS, and App Router
- Install dependencies: @supabase/supabase-js, @supabase/auth-helpers-nextjs, @monaco-editor/react, lucide-react, framer-motion
- Configure Tailwind with custom colors: Blue (#2563EB), Orange (#F59E0B), Green (#10B981), Red (#EF4444)
- Set up environment variables for Supabase and Google Gemini API
- Create project structure: `src/app/`, `src/components/`, `src/lib/`, `src/types/`

### 1.2 Supabase Database Setup

Create SQL schema with tables:

- `user_progress`: user_id, course_type, challenges_completed, total_xp, current_level, streak_days, last_activity
- `challenges`: id, course_type, difficulty, title, description, code_template, bugs (JSONB), solution, xp_reward
- `challenge_attempts`: user_id, challenge_id, completed, time_taken, hints_used, xp_earned, attempted_at
- `achievements`: id, name, description, icon, xp_reward, requirements (JSONB)
- `user_achievements`: user_id, achievement_id, earned_at
- Enable Row Level Security policies for all tables

### 1.3 Authentication System

- Create `src/lib/supabase.ts` with Supabase client configuration
- Build `src/components/auth/LoginForm.tsx` with email/password login
- Build `src/components/auth/RegisterForm.tsx` with user registration
- Create `src/app/(auth)/login/page.tsx` and `src/app/(auth)/register/page.tsx`
- Implement protected routes with middleware in `src/middleware.ts`
- Add session management and user context

### 1.4 Core UI Components

- Create `src/components/ui/Button.tsx` with variants (primary, secondary, success, danger)
- Create `src/components/ui/Card.tsx` for content containers
- Create `src/components/ui/ProgressBar.tsx` for visual progress tracking
- Create `src/components/ui/Badge.tsx` for achievements and labels
- Create `src/components/layout/Header.tsx` with navigation
- Create `src/components/layout/Footer.tsx`

### 1.5 Landing Page

- Create `src/app/page.tsx` with hero section using existing images
- Add feature highlights section
- Add CTA buttons linking to registration
- Make fully responsive with mobile-first approach
- Use existing MainLogo.png, Main Hero Image.png, Mobile Hero Image.png

### 1.6 Basic Dashboard

- Create `src/app/dashboard/page.tsx` with user overview
- Display user profile with XP and level
- Show course progress bars (HTML, CSS, JavaScript)
- Add quick action buttons for starting challenges
- Implement responsive layout

**Deliverable**: Working authentication, landing page, and basic dashboard deployed to Netlify

## Phase 2: AI Challenge System & Gamification (Week 3-4)

### 2.1 AI Integration

- Create `src/lib/ai.ts` with Google Gemini API integration
- Implement challenge generation function with parameters: skill_level, course_type, user_weaknesses
- Create `src/app/api/generate-challenge/route.ts` API endpoint
- Add error handling and rate limiting for AI calls
- Cache generated challenges in Supabase

### 2.2 Challenge Interface

- Create `src/components/game/ChallengeInterface.tsx` with Monaco Editor integration
- Add syntax highlighting for HTML, CSS, JavaScript
- Implement `src/components/game/HintSystem.tsx` with 3-level progressive hints
- Create `src/components/game/CodeValidator.tsx` for checking solutions
- Add real-time feedback with success/error states
- Implement timer and attempt tracking

### 2.3 Challenge Pages

- Create `src/app/challenges/page.tsx` for course selection (HTML, CSS, JS)
- Create `src/app/challenges/[courseType]/page.tsx` for challenge list
- Create `src/app/challenges/[courseType]/[challengeId]/page.tsx` for individual challenges
- Add AI-generated random challenge option
- Implement challenge navigation and progress tracking

### 2.4 Gamification System

- Create `src/lib/gamification.ts` with XP calculation logic
- Implement achievement checking and unlocking system
- Create `src/components/game/AchievementUnlock.tsx` with celebration animation
- Build `src/app/achievements/page.tsx` for badge gallery
- Add streak tracking with daily reset logic
- Create level progression system (5 levels: 0-100, 100-250, 250-500, 500-750, 750+ XP)

### 2.5 Achievement Badges

Implement 10 achievement badges:

1. "First Bug Fixed" - Complete first challenge
2. "HTML Master" - Complete 10 HTML challenges
3. "CSS Wizard" - Complete 10 CSS challenges
4. "JavaScript Jedi" - Complete 10 JavaScript challenges
5. "Speed Coder" - Complete 5 challenges under 2 minutes
6. "Perfect Score" - Get 100% accuracy on 5 challenges
7. "Streak Master" - Maintain 7-day streak
8. "Code Detective" - Use hints wisely (complete 10 challenges with ≤1 hint)
9. "Learning Legend" - Reach level 5
10. "Bug Slayer" - Complete 30 total challenges

### 2.6 Progress Tracking

- Create `src/app/progress/page.tsx` with detailed analytics
- Add skill radar chart showing HTML/CSS/JS proficiency
- Display learning statistics (time spent, completion rates, accuracy)
- Show weekly progress and goal tracking
- Implement data visualization with charts

**Deliverable**: Full challenge system with AI generation, gamification, and progress tracking deployed to Netlify

## Phase 3: Onboarding & Polish (Week 5-6)

### 3.1 Comprehensive Onboarding Flow

Create multi-step onboarding in `src/app/onboarding/`:

**Step 1: Welcome Screen** (`page.tsx`)

- Hero with mascot and tagline
- Overview of what users will learn
- Start button to begin assessment

**Step 2: Skill Assessment** (`assessment/page.tsx`)

- Experience level selection (Beginner/Some Experience/Advanced)
- Interest alignment (Web Dev/Mobile/AI/Backend)
- Learning style preference (Interactive/Step-by-step/Random/Collaborative)
- Time commitment (5-10min/15-30min/30-60min/Flexible)
- Goal setting (Learn basics/Improve skills/Have fun/Complete all/Job prep)
- Store assessment results in user profile

**Step 3: First Challenge Tutorial** (`tutorial/page.tsx`)

- Interactive tutorial with guided first challenge
- Simple HTML bug (missing closing tag)
- Progressive hints that guide user
- Celebration animation on completion
- Award "First Bug Fixed" badge

**Step 4: Game Mechanics Tutorial** (`mechanics/page.tsx`)

- Explain challenge types (Bug Hunt, Speed Code, Code Puzzle)
- Demonstrate hint system (3 levels)
- Show XP and level system
- Explain achievement badges
- Display progress tracking features

**Step 5: First Real Challenge** (`first-challenge/page.tsx`)

- Slightly harder challenge based on assessment
- Apply learned mechanics
- Track completion and award XP
- Show progress update

**Step 6: Learning Path Selection** (`path-selection/page.tsx`)

- Present HTML, CSS, JavaScript courses
- Show difficulty and time estimates
- Recommend path based on assessment
- Allow user to choose starting course

**Step 7: Daily Goal Setting** (`goals/page.tsx`)

- Set daily challenge goal (1/2/3 challenges)
- Configure reminder preferences
- Set preferred learning time
- Enable/disable notifications

**Step 8: Onboarding Complete** (`complete/page.tsx`)

- Summary of setup (assessment, goals, path)
- Display starting stats (Level 2, 50 XP, 1 badge)
- CTA to dashboard or first course challenge
- Celebration with confetti animation

### 3.2 Mobile Optimization

- Optimize Monaco Editor for mobile with touch-friendly controls
- Create mobile-specific navigation with hamburger menu
- Implement swipe gestures for challenge navigation
- Add touch-friendly button sizes (min 44x44px)
- Test on various screen sizes (320px to 1920px)
- Optimize images for mobile bandwidth

### 3.3 PWA Features

- Create `public/manifest.json` with app metadata
- Add service worker for offline functionality
- Implement app icons (192x192, 512x512) using Iconlogo.png
- Add install prompt for mobile users
- Cache static assets for offline access

### 3.4 Performance Optimization

- Implement code splitting with Next.js dynamic imports
- Optimize images with Next.js Image component
- Add loading states for all async operations
- Implement skeleton screens for better perceived performance
- Lazy load Monaco Editor to reduce initial bundle size
- Add error boundaries for graceful error handling

### 3.5 Accessibility

- Add ARIA labels to all interactive elements
- Implement keyboard navigation for all features
- Ensure color contrast meets WCAG AA standards
- Add focus indicators for keyboard users
- Test with screen readers
- Add alt text to all images

### 3.6 Netlify Deployment Configuration

- Create `netlify.toml` with build settings
- Configure environment variables in Netlify dashboard
- Set up automatic deployments from GitHub
- Configure redirects for SPA routing
- Add custom domain (optional)
- Enable Netlify Functions for API routes

**Deliverable**: Complete production-ready application with full onboarding, mobile optimization, and PWA features deployed to Netlify

## Technical Implementation Details

### File Structure

```
BugXHunter/
├── Images/                    (existing design assets)
├── public/
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          (landing)
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   ├── challenges/
│   │   │   └── [courseType]/
│   │   │       └── [challengeId]/
│   │   ├── achievements/
│   │   ├── progress/
│   │   ├── onboarding/
│   │   │   ├── page.tsx
│   │   │   ├── assessment/
│   │   │   ├── tutorial/
│   │   │   ├── mechanics/
│   │   │   ├── first-challenge/
│   │   │   ├── path-selection/
│   │   │   ├── goals/
│   │   │   └── complete/
│   │   └── api/
│   │       └── generate-challenge/
│   ├── components/
│   │   ├── ui/
│   │   ├── auth/
│   │   ├── game/
│   │   └── layout/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── ai.ts
│   │   ├── gamification.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env.local
├── middleware.ts
├── next.config.js
├── tailwind.config.js
├── netlify.toml
└── package.json
```

### Key Dependencies

- next@14
- typescript
- tailwindcss
- @supabase/supabase-js
- @supabase/auth-helpers-nextjs
- @monaco-editor/react
- lucide-react
- framer-motion
- recharts (for progress visualization)

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
```

## Success Metrics

- All authentication flows working
- AI challenge generation functional
- 10 achievements unlockable
- Full onboarding flow (8 steps) complete
- Mobile responsive (320px+)
- Lighthouse score >90
- Deployed to Netlify with automatic deployments

### To-dos

- [ ] Phase 1: Setup Next.js project, install dependencies, configure Tailwind and environment variables
- [ ] Phase 1: Create Supabase database schema with all tables and Row Level Security policies
- [ ] Phase 1: Build authentication system with login/register forms and protected routes
- [ ] Phase 1: Create core UI components (Button, Card, ProgressBar, Badge, Header, Footer)
- [ ] Phase 1: Build landing page with hero section using existing images
- [ ] Phase 1: Create basic dashboard with user overview and course progress
- [ ] Phase 1: Deploy MVP to Netlify and verify all features work
- [ ] Phase 2: Integrate Google Gemini API for AI challenge generation
- [ ] Phase 2: Build challenge interface with Monaco Editor, hint system, and code validator
- [ ] Phase 2: Create challenge pages (course selection, challenge list, individual challenge)
- [ ] Phase 2: Implement gamification system (XP, levels, streaks, achievement logic)
- [ ] Phase 2: Create 10 achievement badges with unlock animations
- [ ] Phase 2: Build progress tracking page with analytics and skill radar chart
- [ ] Phase 2: Deploy full challenge system to Netlify and verify AI integration
- [ ] Phase 3: Create comprehensive 8-step onboarding flow with skill assessment
- [ ] Phase 3: Optimize for mobile with touch controls, responsive design, and swipe gestures
- [ ] Phase 3: Add PWA features (manifest, service worker, offline support, app icons)
- [ ] Phase 3: Optimize performance (code splitting, lazy loading, caching, error boundaries)
- [ ] Phase 3: Ensure accessibility (ARIA labels, keyboard navigation, screen reader support)
- [ ] Phase 3: Final deployment to Netlify with all features, testing, and documentation