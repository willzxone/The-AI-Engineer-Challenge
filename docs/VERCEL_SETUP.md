# 🚀 Setting Up OpenAI API Key in Vercel

This guide will walk you through setting up your OpenAI API key as an environment variable in Vercel so your deployed application can access it.

## Method 1: Using Vercel Dashboard (Recommended)

### Step 1: Go to Your Project Settings
1. Log in to [Vercel](https://vercel.com/)
2. Navigate to your project dashboard
3. Click on your project name
4. Click on the **Settings** tab in the top navigation

### Step 2: Add Environment Variable
1. In the Settings page, click on **Environment Variables** in the left sidebar
2. You'll see a form to add new environment variables
3. Fill in the following:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-`)
   - **Environment**: Select all three:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
4. Click **Save**

### Step 3: Redeploy Your Application
1. After adding the environment variable, you need to redeploy for it to take effect
2. Go to the **Deployments** tab
3. Click the **⋯** (three dots) menu on your latest deployment
4. Click **Redeploy**
5. Or push a new commit to trigger a new deployment

## Method 2: Using Vercel CLI

### Step 1: Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Link Your Project (if not already linked)
```bash
vercel link
```

### Step 4: Add Environment Variable
```bash
vercel env add OPENAI_API_KEY
```

When prompted:
- **Value**: Enter your OpenAI API key
- **Environment**: Select `Production`, `Preview`, and `Development` (or just `Production` if you prefer)

### Step 5: Redeploy
```bash
vercel --prod
```

## Method 3: Using Vercel Dashboard - Quick Add

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-your-actual-api-key-here`
5. Select environments (Production, Preview, Development)
6. Click **Save**
7. **Important**: Redeploy your application for changes to take effect

## Verifying Your Setup

### Check Environment Variables
1. Go to **Settings** → **Environment Variables**
2. You should see `OPENAI_API_KEY` listed
3. The value will be hidden (shown as `••••••••`)

### Test Your Deployment
1. Visit your deployed application URL
2. Try sending a message in the chat
3. If it works, your API key is configured correctly!

## Troubleshooting

### API Key Not Working After Deployment
- **Make sure you redeployed** after adding the environment variable
- Check that the environment variable name is exactly `OPENAI_API_KEY` (case-sensitive)
- Verify your API key is valid by testing it in the [OpenAI Playground](https://platform.openai.com/playground)

### Getting "OPENAI_API_KEY environment variable is not set" Error
- Ensure the environment variable is set for the correct environment (Production/Preview/Development)
- Redeploy your application after adding the variable
- Check the deployment logs in Vercel to see if there are any errors

### API Key Visible in Browser/Network Tab
- Don't worry! The API key is only used on the server-side (backend)
- The frontend never sees or sends the API key
- All API calls go through your FastAPI backend which uses the environment variable

## Security Best Practices

✅ **DO:**
- Keep your API key secret
- Use environment variables (never hardcode)
- Set different API keys for different environments if needed
- Monitor your API usage in OpenAI dashboard

❌ **DON'T:**
- Commit API keys to Git
- Share your API key publicly
- Use the same API key for multiple projects without monitoring
- Expose API keys in client-side code

## Getting Your OpenAI API Key

If you don't have an OpenAI API key yet:

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click **Create new secret key**
5. Give it a name (e.g., "Vercel Deployment")
6. Copy the key immediately (you won't be able to see it again!)
7. Paste it into Vercel's environment variables

## Next Steps

Once your API key is set up:
1. Your application should work on Vercel
2. Test it by visiting your deployment URL
3. Share your deployed app with others!

---

**Need Help?** Check the [Vercel Documentation](https://vercel.com/docs/environment-variables) or [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)

