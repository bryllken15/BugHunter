# Bug Hunter 🦸

A gamified coding education platform inspired by Duolingo for learning HTML, CSS, and JavaScript through interactive bug-hunting challenges.

## 🎯 Features

- **Interactive Challenges**: Hunt bugs in real code examples
- **AI-Powered Learning**: Personalized challenges that adapt to your skill level
- **Gamification**: Earn XP, unlock badges, and maintain streaks
- **Progress Tracking**: Detailed analytics and skill tracking
- **Mobile Optimized**: Learn on any device
- **Free Forever**: No credit card required

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **AI**: Google Gemini API
- **Hosting**: Netlify
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Gemini API key
- Netlify account (for deployment)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd bug-hunter
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Configuration
GEMINI_API_KEY=your-gemini-api-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script to create all tables and policies

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Pages & Features

### Landing Page
- Hero section with call-to-action
- Feature highlights
- Course previews
- Mobile-responsive design

### Authentication
- User registration with skill assessment
- Login/logout functionality
- Password reset
- Social authentication (optional)

### Dashboard
- User progress overview
- Course progress bars
- Quick action buttons
- Recent achievements

### Challenge System
- Interactive code editor with syntax highlighting
- AI-generated personalized challenges
- 3-level progressive hint system
- Real-time feedback and validation

### Gamification
- XP points system (5 levels)
- 10 achievement badges
- Daily streak tracking
- Progress visualization

### Onboarding Flow
1. Welcome & Assessment
2. Skill Level Detection
3. First Challenge Tutorial
4. Game Mechanics Tutorial
5. Learning Path Selection
6. Daily Goal Setting
7. Onboarding Complete

## 🎮 Challenge Types

### HTML Challenges
- Missing closing tags
- Incorrect attributes
- Broken links
- Form validation issues

### CSS Challenges
- Missing semicolons
- Layout problems
- Responsive design issues
- Animation bugs

### JavaScript Challenges
- Syntax errors
- Logic bugs
- DOM manipulation issues
- Event handling problems

## 🏆 Achievement System

1. **First Bug Fixed** - Complete first challenge
2. **HTML Master** - Complete all HTML challenges
3. **CSS Wizard** - Complete all CSS challenges
4. **JavaScript Jedi** - Complete all JavaScript challenges
5. **Speed Coder** - Complete 5 challenges under 2 minutes
6. **Perfect Score** - Get 100% accuracy on 5 challenges
7. **Streak Master** - Maintain 7-day streak
8. **Code Detective** - Use hints efficiently
9. **Learning Legend** - Reach level 5
10. **Bug Slayer** - Complete 30 total challenges

## 🚀 Deployment

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
GEMINI_API_KEY=your-production-gemini-key
NEXT_PUBLIC_APP_URL=https://your-app.netlify.app
```

## 📊 Database Schema

### Tables
- `user_progress` - Track user progress per course
- `challenges` - Store challenge content and metadata
- `challenge_attempts` - Record user attempts and performance
- `achievements` - Define available achievements
- `user_achievements` - Track earned achievements

### Key Features
- Row Level Security (RLS) enabled
- Automatic achievement checking
- XP and level calculation
- Streak tracking
- Progress analytics

## 🎨 Design System

### Colors
- Primary: Blue (#2563EB)
- Secondary: Orange (#F59E0B)
- Success: Green (#10B981)
- Danger: Red (#EF4444)

### Components
- Reusable UI components
- Consistent spacing and typography
- Mobile-first responsive design
- Accessibility compliant

## 🤖 AI Integration

### Challenge Generation
- Personalized difficulty based on user level
- Skill-specific content generation
- Real-world scenario creation
- Adaptive learning paths

### Smart Hints
- Context-aware suggestions
- Progressive difficulty
- Learning reinforcement
- Performance analysis

## 📱 Mobile Features

- Touch-friendly interface
- Swipe gestures for navigation
- Optimized code editor
- Offline functionality (PWA)
- App-like experience

## 🔧 Development

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Project Structure
```
src/
├── app/                 # Next.js 14 App Router
│   ├── (auth)/         # Authentication pages
│   ├── dashboard/       # User dashboard
│   ├── challenges/     # Challenge pages
│   └── api/            # API routes
├── components/         # React components
│   ├── ui/             # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── game/           # Game-specific components
│   └── layout/         # Layout components
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## 🎯 Roadmap

### Phase 1: MVP ✅
- [x] Authentication system
- [x] Basic challenge interface
- [x] Landing page
- [x] User dashboard
- [x] Database schema

### Phase 2: AI & Gamification
- [ ] AI challenge generation
- [ ] Advanced gamification
- [ ] Achievement system
- [ ] Progress analytics

### Phase 3: Polish & Scale
- [ ] Complete onboarding flow
- [ ] Mobile optimization
- [ ] PWA features
- [ ] Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Duolingo's gamification approach
- Built with modern web technologies
- Designed for accessibility and mobile-first experience

---

**Happy Bug Hunting! 🐛✨**
