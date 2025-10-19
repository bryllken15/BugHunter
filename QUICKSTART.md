# 🚀 Bug Hunter - Quick Start Guide

Get Bug Hunter up and running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] A code editor (VS Code recommended)
- [ ] A Supabase account (free - sign up at supabase.com)
- [ ] A Google AI API key (free - get at ai.google.dev)

## Step-by-Step Setup

### Step 1: Install Dependencies (30 seconds)
```bash
npm install
```

### Step 2: Get Your API Keys (2 minutes)

**Supabase:**
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to finish setting up (~1 minute)
3. Go to Settings > API
4. Copy your `Project URL` and `anon/public key`

**Google Gemini:**
1. Go to [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key in Google AI Studio"
3. Click "Create API Key"
4. Copy your API key

### Step 3: Configure Environment (1 minute)

Create a file called `.env.local` in the root directory:

```bash
# Copy this and fill in your keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 4: Set Up Database (2 minutes)

1. Open your Supabase project
2. Go to the SQL Editor
3. Create a new query
4. Copy the entire contents of `supabase-schema.sql`
5. Paste and click "Run"
6. You should see "Success. No rows returned"

### Step 5: Seed Initial Data (30 seconds)

Still in the SQL Editor:
1. Create another new query
2. Copy the contents of `scripts/seed-achievements.sql`
3. Paste and click "Run"
4. You should see "Success. 10 rows"

**Optional:** Add sample challenges for testing:
1. Copy the contents of `scripts/seed-sample-challenges.sql`
2. Paste and click "Run"

### Step 6: Run the App! (10 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎉 You're Done!

You should now see the Bug Hunter landing page. Here's what to try:

1. Click "Start Learning Free" to register
2. Complete the onboarding flow
3. Try a sample challenge
4. Generate an AI challenge (if you added Gemini API key)

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Make sure there are no extra spaces or quotes
- Restart the dev server (`Ctrl+C` then `npm run dev`)

### "Table does not exist" error
- You need to run the `supabase-schema.sql` in Supabase SQL Editor
- Make sure you're in the correct project

### No challenges showing up
- Run the seed scripts in Supabase SQL Editor
- Or use the "Generate Random Challenge" button (requires Gemini API)

### Build errors
```bash
# Delete build cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## Next Steps

- Read [SETUP.md](./SETUP.md) for detailed configuration
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Review [TESTING.md](./TESTING.md) for testing guidelines

## Need Help?

- Check existing issues on GitHub
- Review the deployment checklist in `DEPLOYMENT_CHECKLIST.md`
- Ensure all environment variables are correctly set

Happy bug hunting! 🐛🎯

