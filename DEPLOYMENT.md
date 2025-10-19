# Bug Hunter - Deployment Guide

## Prerequisites

Before deploying Bug Hunter, make sure you have:

1. **Supabase Account**: Create a new project at [supabase.com](https://supabase.com)
2. **Google Gemini API Key**: Get your API key from [Google AI Studio](https://aistudio.google.com)
3. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
4. **GitHub Repository**: Push your code to GitHub

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

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

## Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script to create all tables and policies

## Deployment Steps

### 1. Netlify Deployment

1. **Connect Repository**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Environment Variables**:
   - Go to Site settings > Environment variables
   - Add all the environment variables from your `.env.local` file
   - Update `NEXT_PUBLIC_APP_URL` to your Netlify URL

4. **Deploy**:
   - Click "Deploy site"
   - Wait for the build to complete

### 2. Domain Configuration (Optional)

1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS settings as instructed by Netlify

### 3. SSL Certificate

Netlify automatically provides SSL certificates for all sites. Your site will be available at `https://your-site-name.netlify.app`

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] Authentication works (login/register)
- [ ] Database connection is working
- [ ] AI challenge generation is functional
- [ ] PWA features work (install prompt, offline support)
- [ ] Mobile responsive design
- [ ] All pages are accessible

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all environment variables are set
   - Ensure Node.js version is 18
   - Check build logs for specific errors

2. **Database Connection Issues**:
   - Verify Supabase URL and keys are correct
   - Check that RLS policies are properly configured
   - Ensure database schema is created

3. **AI Integration Issues**:
   - Verify Gemini API key is valid
   - Check API rate limits
   - Ensure API key has proper permissions

4. **PWA Issues**:
   - Check that manifest.json is accessible
   - Verify service worker is registered
   - Test offline functionality

### Performance Optimization

1. **Image Optimization**:
   - Use Next.js Image component
   - Optimize images before upload
   - Use appropriate image formats (WebP, AVIF)

2. **Code Splitting**:
   - Implement dynamic imports for heavy components
   - Lazy load Monaco Editor
   - Use React.lazy for route-based splitting

3. **Caching**:
   - Configure proper cache headers
   - Use CDN for static assets
   - Implement service worker caching

## Monitoring

1. **Analytics**:
   - Set up Google Analytics
   - Monitor user engagement
   - Track conversion rates

2. **Error Tracking**:
   - Use Sentry for error monitoring
   - Set up alerts for critical errors
   - Monitor performance metrics

3. **Uptime Monitoring**:
   - Use services like UptimeRobot
   - Set up alerts for downtime
   - Monitor response times

## Security

1. **Environment Variables**:
   - Never commit `.env.local` to version control
   - Use Netlify's environment variable system
   - Rotate API keys regularly

2. **Database Security**:
   - Enable RLS policies
   - Use service role key only on server
   - Monitor database access logs

3. **API Security**:
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS for all requests

## Scaling

1. **Database Scaling**:
   - Monitor database performance
   - Consider read replicas for heavy traffic
   - Implement connection pooling

2. **CDN**:
   - Use Netlify's CDN for static assets
   - Consider Cloudflare for additional performance
   - Implement edge caching

3. **Serverless Functions**:
   - Monitor function execution times
   - Optimize cold start times
   - Consider function warming strategies

## Backup Strategy

1. **Database Backups**:
   - Enable automatic backups in Supabase
   - Test restore procedures
   - Store backups in multiple locations

2. **Code Backups**:
   - Use Git for version control
   - Create regular releases
   - Document deployment procedures

## Support

For deployment issues:

1. Check Netlify build logs
2. Review Supabase logs
3. Test locally with production environment variables
4. Check browser console for client-side errors
5. Verify all API endpoints are working

## Updates and Maintenance

1. **Regular Updates**:
   - Keep dependencies updated
   - Monitor security advisories
   - Test updates in staging environment

2. **Performance Monitoring**:
   - Use Lighthouse for performance audits
   - Monitor Core Web Vitals
   - Optimize based on real user metrics

3. **Feature Rollouts**:
   - Use feature flags for gradual rollouts
   - Monitor user feedback
   - A/B test new features