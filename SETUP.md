# Bug Hunter - Setup Guide

## Quick Start

Follow these steps to get Bug Hunter running locally:

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Google Gemini API key (free tier works)

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials

### 4. Create Database Schema

Run the SQL schema in Supabase:

1. Open your Supabase project
2. Go to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to create all tables

### 5. Seed Initial Data

After creating the schema, run this SQL to add initial achievements:

```sql
-- Insert initial achievements
INSERT INTO achievements (name, description, icon, xp_reward, requirements) VALUES
('First Bug Fixed', 'Complete your first challenge', '🐛', 25, '{"challenges_completed": 1}'),
('HTML Master', 'Complete 10 HTML challenges', '🌐', 100, '{"html_challenges": 10}'),
('CSS Wizard', 'Master 10 CSS challenges', '🎨', 100, '{"css_challenges": 10}'),
('JavaScript Jedi', 'Complete 10 JavaScript challenges', '⚡', 100, '{"js_challenges": 10}'),
('Speed Coder', 'Complete 5 challenges under 2 minutes', '🏃', 75, '{"fast_completions": 5}'),
('Perfect Score', 'Get 100% accuracy on 5 challenges', '🎯', 75, '{"perfect_scores": 5}'),
('Streak Master', 'Maintain a 7-day learning streak', '🔥', 150, '{"streak_days": 7}'),
('Code Detective', 'Complete 10 challenges using ≤1 hint', '🔍', 125, '{"hint_efficient": 10}'),
('Learning Legend', 'Reach level 5', '👑', 200, '{"level": 5}'),
('Bug Slayer', 'Complete 30 total challenges', '⚔️', 250, '{"total_challenges": 30}');
```

### 6. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it to your `.env.local` file

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## Deployment to Netlify

### 1. Connect Your Repository

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect to GitHub and select your repository

### 2. Configure Build Settings

Netlify should auto-detect Next.js. Verify these settings:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Functions directory:** Leave empty (Next.js handles this)

### 3. Set Environment Variables

In Netlify dashboard, go to Site Settings > Environment Variables and add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_APP_URL` (your Netlify domain)

### 4. Deploy

Click "Deploy site" and wait for the build to complete!

## Features Implemented

### Phase 1 - MVP Foundation ✅
- ✅ Next.js 14 with TypeScript and Tailwind CSS
- ✅ Supabase authentication system
- ✅ Core UI components
- ✅ Landing page with hero section
- ✅ Basic dashboard

### Phase 2 - AI Challenge System & Gamification ✅
- ✅ Google Gemini AI integration
- ✅ Challenge interface with Monaco Editor
- ✅ Challenge pages (course selection, list, individual)
- ✅ Gamification system (XP, levels, streaks)
- ✅ 10 achievement badges
- ✅ Progress tracking with analytics

### Phase 3 - Onboarding & Polish ✅
- ✅ 8-step onboarding flow
- ✅ Mobile optimization
- ✅ PWA features (manifest, service worker)
- ✅ Performance optimization (code splitting, lazy loading)
- ✅ Accessibility (ARIA labels, keyboard navigation)
- ✅ Netlify deployment configuration

## Troubleshooting

### Database Connection Issues

If you see "Invalid API key" or connection errors:
1. Double-check your Supabase URL and keys in `.env.local`
2. Make sure you've run the database schema
3. Verify Row Level Security is enabled on all tables

### AI Generation Not Working

If challenges aren't generating:
1. Verify your Gemini API key is correct
2. Check the API quota at Google AI Studio
3. Look at the browser console for specific errors

### Build Errors

If you get build errors:
1. Delete `.next` folder and `node_modules`
2. Run `npm install` again
3. Run `npm run build`

## Support

For issues or questions, please check:
- The deployment checklist in `DEPLOYMENT_CHECKLIST.md`
- The detailed deployment guide in `DEPLOYMENT.md`
- The testing guide in `TESTING.md`

Happy bug hunting! 🐛🎯

