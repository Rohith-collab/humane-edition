# 🚀 Vercel Deployment Guide

## ⚠️ CRITICAL: Environment Variables Setup

**WARNING**: Your API endpoints will return 500 errors if environment variables are not properly configured in Vercel Dashboard.

### Required Environment Variables

Before deploying, you MUST set these environment variables in your Vercel Dashboard:

1. **Go to**: [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Settings → Environment Variables

2. **Add these variables for BOTH Production and Preview environments**:

```bash
# OpenAI Configuration (Primary)
OPENAI_API_KEY=your_openai_api_key_here

# Azure OpenAI Configuration (Fallback)
AZURE_OPENAI_API_KEY=your_azure_api_key_here
AZURE_OPENAI_ENDPOINT=https://your-azure-endpoint.openai.azure.com/

# Firebase Configuration (if using Firebase)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEFGHIJ

# Optional: Force specific AI service
FORCE_OPENAI=true  # Set to true to force OpenAI over Azure
```

### Environment Variables Setup Steps:

1. **Login to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**
3. **Go to Settings tab**
4. **Click Environment Variables** in the sidebar
5. **Add each variable above** for both:
   - ✅ **Production** environment
   - ✅ **Preview** environment
6. **Redeploy your project** after adding variables

## 🔧 Deployment Configuration

This project is configured as a **serverless Next.js-style project** for Vercel:

### Files Configured for Serverless Deployment:

- ✅ `vercel.json` - Forces serverless deployment with API routes
- ✅ `api/chat.ts` - Vercel serverless function for chat API
- ✅ Proper build configuration in `package.json`

### Serverless API Routes:

- `POST /api/chat` - Chat completion endpoint with OpenAI/Azure fallback

## 🚀 Deployment Process

1. **Set Environment Variables** (see above - CRITICAL!)
2. **Push your code** to your connected Git repository
3. **Vercel will automatically deploy** using the serverless configuration
4. **Test your API endpoints** at: `https://your-app.vercel.app/api/chat`

## 🐛 Troubleshooting

### Common Issues:

#### 1. 500 Internal Server Error on API routes
**Cause**: Missing environment variables
**Solution**: Add all required environment variables in Vercel Dashboard

#### 2. API routes not found (404)
**Cause**: Static deployment instead of serverless
**Solution**: Ensure `vercel.json` is properly configured (already done)

#### 3. CORS errors
**Cause**: Missing CORS headers
**Solution**: CORS is configured in `api/chat.ts` and `vercel.json`

### Checking Deployment Status:

1. **Vercel Dashboard**: Check build logs for errors
2. **Function Logs**: View real-time function logs in Vercel
3. **Test API**: Make a test request to `/api/chat`

## 📋 Pre-Deployment Checklist

- [ ] ✅ Environment variables added to Vercel Dashboard
- [ ] ✅ Variables set for both Production AND Preview
- [ ] ✅ `vercel.json` properly configured for serverless
- [ ] ✅ API endpoints tested locally
- [ ] ✅ Firebase configuration (if using)
- [ ] ✅ Build command works: `npm run build`

## 🔗 Useful Links

- [Vercel Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [OpenAI API Keys](https://platform.openai.com/api-keys)

---

**Remember**: The app works in Builder preview because environment variables might be set locally, but Vercel needs them configured separately in the dashboard!
