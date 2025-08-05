# Deployment Guide for Aangilam

## Overview
This application is configured for deployment on Vercel with serverless functions for the chatbot API.

## Production Issues Fixed

### 1. Chatbot API Errors
**Problem**: Fetch/response errors when hosted on Vercel
**Solution**: 
- Created proper Vercel serverless function at `/api/chat.js`
- Added CORS headers for cross-origin requests
- Improved error handling and user feedback

### 2. Authentication Errors
**Problem**: Firebase authentication "INVALID_LOGIN_CREDENTIALS" errors
**Solution**:
- Added retry logic with exponential backoff (3 attempts)
- Better error message handling for different error types
- Network connectivity checks

### 3. Environment Configuration
**Problem**: Missing Azure OpenAI credentials in production
**Solution**:
- Updated `vercel.json` with proper environment variable configuration
- Added `.env.example` template

## Deployment Steps

### 1. Vercel Setup
1. Connect your GitHub repository to Vercel
2. Set the following environment variables in Vercel dashboard:

```bash
# Required for chatbot functionality
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/openai/deployments/your-deployment/chat/completions?api-version=2024-02-15-preview

# Optional Firebase overrides for production
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 2. Build Configuration
The project uses:
- `npm run build:vercel` for Vercel deployment
- Serverless functions in `/api/` directory
- Static files served from `/dist/`

### 3. API Endpoints
- `POST /api/chat` - Main chatbot endpoint (Azure OpenAI)
- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint

## Troubleshooting

### Chatbot Not Responding
1. Check environment variables are set in Vercel dashboard
2. Verify Azure OpenAI endpoint URL format
3. Check function logs in Vercel dashboard

### Authentication Issues
1. Clear browser cache and local storage
2. Check Firebase project settings
3. Verify internet connectivity

### Build Errors
1. Run `npm run typecheck` locally
2. Check for missing dependencies
3. Verify all imports are correctly typed

## Local Development
```bash
npm run dev
```

## Production Build Test
```bash
npm run build
npm run start
```

## File Structure Changes for Deployment
- `/api/chat.js` - Vercel serverless function
- `vercel.json` - Deployment configuration
- `.env.example` - Environment template
- Updated Firebase config with environment variables
- Enhanced error handling in auth and chat components

## Monitoring
- Check Vercel function logs for API errors
- Monitor Firebase authentication in console
- Use browser dev tools for client-side debugging
