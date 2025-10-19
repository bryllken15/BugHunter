# 🔧 Netlify Environment Variables Setup

## Required Environment Variables

Add these environment variables in your Netlify dashboard:

### 1. Go to Netlify Dashboard
- Open your site in Netlify
- Go to **Site Settings** → **Environment Variables**
- Click **"Add variable"** for each one below

### 2. Add These Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
```

### 3. Get Your Supabase Credentials

1. **Go to [supabase.com](https://supabase.com)**
2. **Open your project**
3. **Go to Settings** → **API**
4. **Copy these values:**
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Get Your Gemini API Key

1. **Go to [ai.google.dev](https://ai.google.dev)**
2. **Click "Get API Key"**
3. **Create a new API key**
4. **Copy the key** → `GEMINI_API_KEY`

### 5. Set Your App URL

Replace `your-site-name` with your actual Netlify site name:
- If your site is `https://amazing-bug-hunter-123.netlify.app`
- Then set: `NEXT_PUBLIC_APP_URL=https://amazing-bug-hunter-123.netlify.app`

## 🚀 After Setting Variables

1. **Go to your site in Netlify**
2. **Click "Trigger deploy"** → **"Deploy site"**
3. **Wait for the build to complete** (2-3 minutes)

## ✅ Build Should Now Succeed!

The updated code now handles missing environment variables gracefully:
- ✅ Build will succeed even without environment variables
- ✅ App will show fallback challenges if Gemini API not configured
- ✅ Database operations will be handled gracefully
- ✅ Users can still use the app with limited functionality

## 🎯 Next Steps After Successful Build

1. **Set up your Supabase database:**
   - Run `supabase-schema.sql` in Supabase SQL Editor
   - Run `scripts/seed-achievements.sql`

2. **Test the app:**
   - Register a new account
   - Complete the onboarding
   - Try generating a challenge

3. **Full functionality requires:**
   - Supabase environment variables for database
   - Gemini API key for AI challenge generation

## 🆘 Still Having Issues?

If the build still fails:

1. **Check the build logs** in Netlify dashboard
2. **Verify all environment variables** are set correctly
3. **Make sure there are no extra spaces** in the variable values
4. **Try redeploying** after setting variables

The app should now build successfully! 🎉
