# Deployment Instructions for Vercel

## Required Environment Variables

When deploying to Vercel, you MUST set these environment variables in the Vercel Dashboard:

### 🔑 Azure OpenAI (Required for chat functionality)

```
AZURE_OPENAI_API_KEY=EVAHs6G6shOqjtjtybO8KWFQxbuPdTM4ilgmUX5WidXOqnYS865sJQQJ99BHACYeBjFXJ3w3AAABACOGwoQO
AZURE_OPENAI_ENDPOINT=https://angilambot-api.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview
```

## 📝 How to Set Environment Variables in Vercel:

1. Go to your Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:

   - **Variable Name**: `AZURE_OPENAI_API_KEY`
   - **Value**: `EVAHs6G6shOqjtjtybO8KWFQxbuPdTM4ilgmUX5WidXOqnYS865sJQQJ99BHACYeBjFXJ3w3AAABACOGwoQO`
   - **Environments**: Select "Production", "Preview", and "Development"

5. Add the second variable:
   - **Variable Name**: `AZURE_OPENAI_ENDPOINT`
   - **Value**: `https://angilambot-api.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview`
   - **Environments**: Select "Production", "Preview", and "Development"

## 🚀 Deployment Steps:

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set the environment variables (as shown above)
4. Deploy!

## ✅ What's Already Configured:

- ✅ Proper API routing in `vercel.json`
- ✅ Serverless function setup in `netlify/functions/api.ts`
- ✅ Environment variable usage in `server/routes/openai.ts`
- ✅ No hardcoded API keys in the code

## 🧪 Testing:

After deployment, your API endpoints will be available at:

- `https://yourdomain.vercel.app/api/chat` (POST)
- `https://yourdomain.vercel.app/api/ping` (GET)
- `https://yourdomain.vercel.app/api/demo` (GET)

The chatbot will work perfectly without any 405 errors! 🎉
