# Deployment Guide

## Vercel Deployment

This project is now configured for Vercel deployment with serverless API routes.

### What's Changed for Vercel

1. **API Routes**: Created serverless functions in `/api` directory:

   - `/api/chat.ts` - Main AI chat endpoint
   - `/api/ping.ts` - Health check endpoint
   - `/api/demo.ts` - Demo endpoint

2. **Vercel Configuration**: Updated `vercel.json` with:

   - Function configurations with timeout limits
   - Proper routing for API endpoints
   - CORS headers for API routes
   - Environment variables for Azure OpenAI

3. **Build Script**: Added `vercel-build` command for Vercel's build process

### Deployment Steps

1. **Connect to Vercel**:

   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Environment Variables** (if not using the hardcoded ones):

   - Set `AZURE_OPENAI_API_KEY` in Vercel dashboard
   - Set `AZURE_OPENAI_ENDPOINT` in Vercel dashboard

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Local Testing with Vercel

To test the Vercel setup locally:

```bash
npm install -g vercel
vercel dev
```

## Netlify Deployment

The project also supports Netlify deployment through the existing `netlify/functions/api.ts` file.

### Netlify Steps

1. **Build Settings**:

   - Build command: `npm run build:client`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

2. **Environment Variables**:
   - Add `AZURE_OPENAI_API_KEY` to Netlify environment variables
   - Add `AZURE_OPENAI_ENDPOINT` to Netlify environment variables

## Environment Variables

For production deployment, you can set these environment variables instead of using hardcoded values:

- `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key
- `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI endpoint URL

## API Endpoints

After deployment, your API endpoints will be available at:

- `https://yourdomain.com/api/chat` - AI Chat
- `https://yourdomain.com/api/ping` - Health check
- `https://yourdomain.com/api/demo` - Demo endpoint

## Troubleshooting

1. **CORS Issues**: The API routes include CORS headers, but if you encounter issues, check the browser developer tools Network tab.

2. **Function Timeouts**: Chat responses may take up to 30 seconds (configured in vercel.json).

3. **Cold Starts**: First requests to serverless functions may be slower due to cold starts.

4. **Environment Variables**: Ensure all required environment variables are set in your deployment platform.
