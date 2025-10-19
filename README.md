# Bug Hunter - Learn to Code by Hunting Bugs

A gamified coding education platform inspired by Duolingo for learning HTML, CSS, and JavaScript through AI-generated bug-hunting challenges.

## 🚀 Features

### Core Learning System
- **Interactive Challenges**: Hunt bugs in real code examples
- **AI-Powered Generation**: Personalized challenges using Google Gemini API
- **Multiple Courses**: HTML, CSS, and JavaScript with progressive difficulty
- **Real-time Validation**: Instant feedback on code solutions

### Gamification
- **XP System**: Earn experience points for completing challenges
- **Level Progression**: 5 levels with increasing difficulty
- **Achievement Badges**: 10 unique achievements to unlock
- **Streak Tracking**: Daily learning streaks with bonuses
- **Progress Analytics**: Detailed skill tracking and analytics

### User Experience
- **Comprehensive Onboarding**: 8-step guided setup with skill assessment
- **Mobile Optimized**: Touch-friendly interface with responsive design
- **PWA Support**: Install as a native app with offline capabilities
- **Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatibility

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database + Authentication)
- **AI**: Google Gemini API for challenge generation
- **Editor**: Monaco Editor with syntax highlighting
- **Charts**: Recharts for progress visualization
- **Animations**: Framer Motion for smooth interactions
- **Deployment**: Netlify with automatic deployments

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bug-hunter.git
   cd bug-hunter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL script to create all tables and policies

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Deployment

### Netlify Deployment

1. **Connect your repository to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Set environment variables**
   - Go to Site settings > Environment variables
   - Add all the environment variables from your `.env.local` file
   - Update `NEXT_PUBLIC_APP_URL` to your Netlify URL

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 📱 PWA Features

The application is a Progressive Web App with:
- **Offline Support**: Service worker caches essential resources
- **Install Prompt**: Native app-like installation experience
- **Mobile Optimized**: Touch-friendly interface and responsive design
- **Push Notifications**: Daily learning reminders (coming soon)

## 🎯 Usage

### For Learners
1. **Sign Up**: Create an account with your skill level
2. **Complete Onboarding**: 8-step guided setup
3. **Choose Your Path**: Select HTML, CSS, or JavaScript
4. **Start Learning**: Complete challenges and earn XP
5. **Track Progress**: View analytics and unlock achievements

### For Developers
1. **Fork the Repository**: Create your own version
2. **Customize Challenges**: Modify the AI prompt templates
3. **Add New Courses**: Extend the course system
4. **Enhance Gamification**: Add new achievement types

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   ├── challenges/        # Challenge pages
│   ├── dashboard/         # User dashboard
│   ├── achievements/      # Achievement gallery
│   ├── progress/          # Progress tracking
│   └── onboarding/        # Onboarding flow
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── game/             # Game-specific components
│   └── layout/           # Layout components
├── lib/                   # Utility libraries
│   ├── supabase.ts       # Database client
│   ├── ai.ts             # AI integration
│   ├── gamification.ts   # Game mechanics
│   └── accessibility.ts  # Accessibility utilities
└── types/                 # TypeScript type definitions
```

## 🧪 Testing

```bash
# Run the test suite
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📊 Performance

The application is optimized for performance with:
- **Code Splitting**: Lazy-loaded components and routes
- **Image Optimization**: Next.js Image component with WebP support
- **Caching**: Service worker and CDN caching
- **Bundle Analysis**: Optimized bundle sizes

## 🔒 Security

- **Authentication**: Supabase Auth with Row Level Security
- **API Security**: Rate limiting and input validation
- **HTTPS**: Secure connections for all requests
- **Environment Variables**: Secure configuration management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Duolingo** for the gamification inspiration
- **Monaco Editor** for the code editing experience
- **Supabase** for the backend infrastructure
- **Google Gemini** for AI-powered challenge generation
- **Next.js** for the amazing React framework

## 📞 Support

For support, email support@bughunter.app or join our Discord community.

## 🗺️ Roadmap

- [ ] **Community Features**: User profiles and social learning
- [ ] **Advanced Analytics**: Detailed learning insights
- [ ] **Mobile App**: Native iOS and Android apps
- [ ] **Team Challenges**: Collaborative learning experiences
- [ ] **Custom Challenges**: User-generated content system
- [ ] **API Integration**: Third-party learning platform integration

---

**Happy Bug Hunting! 🐛✨**