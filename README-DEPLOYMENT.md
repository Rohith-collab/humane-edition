# Deployment Instructions for Vercel

## Required Environment Variables

When deploying to Vercel, you MUST set these environment variables in the Vercel Dashboard:

### 🔑 Azure OpenAI (Required for chat functionality)

```
AZURE_OPENAI_API_KEY=A8JgTwbZlu9NaV4GHr33zkdjYf9GDtrLQwnHtHdlYtoOG4HCYlTSJQQJ99BGACHYHv6XJ3w3AAAAACOGRv2n
AZURE_OPENAI_ENDPOINT=https://yogar-mcyatzzl-eastus2.services.ai.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2023-07-01-preview
```

## 📝 How to Set Environment Variables in Vercel:

1. Go to your Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:

   - **Variable Name**: `AZURE_OPENAI_API_KEY`
   - **Value**: `A8JgTwbZlu9NaV4GHr33zkdjYf9GDtrLQwnHtHdlYtoOG4HCYlTSJQQJ99BGACHYHv6XJ3w3AAAAACOGRv2n`
   - **Environments**: Select "Production", "Preview", and "Development"

5. Add the second variable:
   - **Variable Name**: `AZURE_OPENAI_ENDPOINT`
   - **Value**: `https://yogar-mcyatzzl-eastus2.services.ai.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2023-07-01-preview`
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
