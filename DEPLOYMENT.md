# Bug Hunter - Deployment Guide

## 🚀 Quick Deployment to Netlify

### Prerequisites
- GitHub repository with your code
- Supabase project set up
- Google Gemini API key
- Netlify account

### Step 1: Database Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Run Database Schema**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL script

### Step 2: Environment Variables

Create these environment variables in your Netlify dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=https://your-app.netlify.app
```

### Step 3: Deploy to Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Add Environment Variables**
   - Go to Site settings > Environment variables
   - Add all the environment variables listed above

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your app will be available at `https://your-app.netlify.app`

### Step 4: Verify Deployment

1. **Test Authentication**
   - Try registering a new account
   - Test login/logout functionality

2. **Test Database Connection**
   - Check if user data is being saved
   - Verify progress tracking works

3. **Test AI Integration**
   - Try generating a challenge
   - Verify AI responses are working

## 🔧 Local Development

### Setup
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your environment variables to .env.local
# Start development server
npm run dev
```

### Environment Variables for Local Development

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails on Netlify**
   - Check Node.js version (should be 18)
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **Database Connection Issues**
   - Verify Supabase URL and keys are correct
   - Check if RLS policies are set up correctly
   - Ensure database schema is created

3. **AI API Not Working**
   - Verify Gemini API key is correct
   - Check API quotas and limits
   - Test API calls in browser console

4. **Authentication Issues**
   - Check Supabase auth settings
   - Verify redirect URLs are configured
   - Test with different browsers

### Debug Steps

1. **Check Browser Console**
   - Look for JavaScript errors
   - Check network requests
   - Verify API responses

2. **Check Netlify Logs**
   - Go to Functions tab in Netlify dashboard
   - Check function logs for errors
   - Verify environment variables

3. **Test Database Connection**
   - Use Supabase dashboard to verify data
   - Check if tables exist
   - Test RLS policies

## 📊 Monitoring

### Netlify Analytics
- Enable Netlify Analytics in dashboard
- Monitor page views and user behavior
- Check performance metrics

### Supabase Monitoring
- Use Supabase dashboard for database monitoring
- Check API usage and limits
- Monitor authentication events

## 🔄 Updates and Maintenance

### Updating the App
1. Push changes to GitHub
2. Netlify will automatically redeploy
3. Test the new version
4. Monitor for any issues

### Database Migrations
1. Update SQL schema if needed
2. Run migrations in Supabase SQL Editor
3. Test with existing data
4. Update application code if needed

## 🎯 Performance Optimization

### Build Optimization
- Enable Netlify's build caching
- Use Next.js Image optimization
- Minimize bundle size
- Enable compression

### Database Optimization
- Add indexes for frequently queried columns
- Use connection pooling
- Monitor query performance
- Optimize RLS policies

## 🔒 Security

### Environment Variables
- Never commit `.env` files
- Use Netlify's environment variable encryption
- Rotate API keys regularly
- Use least privilege principle

### Database Security
- Enable RLS on all tables
- Use service role key only for server-side operations
- Monitor for suspicious activity
- Regular security audits

## 📱 Mobile Deployment

### PWA Features
- App manifest is included
- Service worker for offline functionality
- Installable on mobile devices
- Optimized for mobile performance

### Mobile Testing
- Test on various devices
- Check touch interactions
- Verify responsive design
- Test offline functionality

---

**Your Bug Hunter app should now be live and ready for users! 🎉**
