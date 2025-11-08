# 🚀 How Frontend and Backend are Deployed Together on Vercel

This document explains how both the **Next.js frontend** and **FastAPI backend** are deployed from the same repository on Vercel using a monorepo setup.

## 📁 Project Structure

```
The-AI-Engineer-Challenge/
├── frontend/          # Next.js frontend application
│   ├── package.json
│   ├── app/
│   └── components/
├── api/               # FastAPI backend application
│   ├── app.py
│   └── vercel.json
├── vercel.json        # Root Vercel configuration (main config)
└── ...
```

## 🔧 How It Works: The `vercel.json` Configuration

The root `vercel.json` file is the key to deploying both applications together. Here's how it works:

### 1. **Builds Section** - Define What to Build

```json
{
  "version": 2,
  "builds": [
    { "src": "frontend/package.json", "use": "@vercel/next" },
    { "src": "api/app.py", "use": "@vercel/python" }
  ]
}
```

**What this does:**
- **First build**: Vercel detects `frontend/package.json` and uses `@vercel/next` builder
  - Builds the Next.js application
  - Outputs: Static files and serverless functions
  
- **Second build**: Vercel detects `api/app.py` and uses `@vercel/python` builder
  - Builds the FastAPI application as serverless functions
  - Outputs: Python serverless functions

### 2. **Routes Section** - Define URL Routing

```json
{
  "routes": [
    { "src": "/api/(.*)", "dest": "api/app.py" },
    { "src": "/(.*)", "dest": "frontend/$1" }
  ]
}
```

**What this does:**
- **First route** (`/api/(.*)`): 
  - Matches all URLs starting with `/api/`
  - Routes to: `api/app.py` (FastAPI backend)
  - Examples: `/api/chat`, `/api/health` → handled by FastAPI
  
- **Second route** (`/(.*)`):
  - Matches all other URLs (catch-all)
  - Routes to: `frontend/$1` (Next.js frontend)
  - Examples: `/`, `/about`, `/contact` → handled by Next.js

## 🔄 Request Flow

Here's what happens when a user visits your deployed app:

### Example 1: User visits the homepage
```
User → https://your-app.vercel.app/
  ↓
Vercel checks routes:
  - /api/(.*) ❌ (doesn't match)
  - /(.*) ✅ (matches!)
  ↓
Routes to: frontend/$1
  ↓
Next.js serves the homepage
```

### Example 2: Frontend makes API call
```
Frontend → fetch('/api/chat')
  ↓
Vercel checks routes:
  - /api/(.*) ✅ (matches!)
  ↓
Routes to: api/app.py
  ↓
FastAPI handles the request
  ↓
Returns response to frontend
```

## 🏗️ Build Process

When you deploy to Vercel, here's what happens:

### Step 1: Detection
Vercel reads `vercel.json` and sees:
- Two builds needed
- Two different builders

### Step 2: Frontend Build
```bash
cd frontend
npm install
npm run build
```
- Installs Next.js dependencies
- Builds React components
- Generates static pages
- Creates serverless functions for API routes

### Step 3: Backend Build
```bash
cd api
# Vercel Python builder automatically:
# - Detects Python dependencies
# - Installs them
# - Wraps app.py as serverless function
```
- Vercel's `@vercel/python` builder handles FastAPI
- Creates serverless function from `app.py`
- Makes it accessible at `/api/*` routes

### Step 4: Deployment
- Both builds are deployed together
- Routes are configured
- Single domain serves both apps

## 🌐 How They Communicate

### In Production (Vercel)
```
Frontend (Next.js) → /api/chat → Backend (FastAPI)
```

The frontend makes requests to `/api/chat`, which:
1. Matches the `/api/(.*)` route
2. Gets routed to `api/app.py`
3. FastAPI handles the request
4. Response goes back to frontend

**No CORS issues** because:
- Both are on the same domain
- Same origin = no CORS needed
- Vercel handles routing internally

### In Development (Local)
```
Frontend (localhost:3000) → http://localhost:8000/api/chat → Backend
```

The `next.config.js` has a rewrite rule:
```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8000/api/:path*',
    },
  ];
}
```

This proxies `/api/*` requests to your local FastAPI server.

## 📦 Key Components

### 1. Root `vercel.json`
- **Location**: `/vercel.json`
- **Purpose**: Main configuration for monorepo deployment
- **Defines**: Both builds and routing

### 2. Frontend (`frontend/`)
- **Framework**: Next.js 14
- **Builder**: `@vercel/next` (automatic)
- **Output**: Static files + serverless functions

### 3. Backend (`api/`)
- **Framework**: FastAPI
- **Builder**: `@vercel/python` (automatic)
- **Output**: Python serverless functions

### 4. `api/vercel.json` (Optional)
- This file exists but is **not used** in the root deployment
- The root `vercel.json` takes precedence
- Could be used if deploying API separately

## 🎯 Benefits of This Setup

✅ **Single Repository**: Everything in one place
✅ **Single Deployment**: One command deploys both
✅ **Single Domain**: No CORS issues
✅ **Unified Routing**: Seamless URL structure
✅ **Easy Updates**: Update both together
✅ **Cost Effective**: One Vercel project

## 🔍 Troubleshooting

### Routes not working?
- Check `vercel.json` routes order (more specific first)
- Ensure both builds completed successfully
- Check Vercel deployment logs

### Backend not accessible?
- Verify `api/app.py` exists
- Check Python dependencies in `pyproject.toml`
- Ensure `OPENAI_API_KEY` is set in Vercel

### Frontend can't reach backend?
- In production: Use relative URLs (`/api/chat`)
- In development: Check `next.config.js` rewrites
- Verify routes in `vercel.json`

## 📝 Summary

**The Magic Formula:**
```
vercel.json (builds + routes) 
  = Frontend (Next.js) + Backend (FastAPI) 
  = Single Deployment 
  = One Domain 
  = Seamless Integration
```

Both applications are built and deployed together, but they're still separate applications that communicate through Vercel's routing system. The frontend serves the UI, and the backend handles API requests - all from the same repository and domain!

---

**Want to learn more?**
- [Vercel Monorepo Documentation](https://vercel.com/docs/monorepos)
- [Vercel Python Documentation](https://vercel.com/docs/functions/serverless-functions/runtimes/python)
- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)

