# Environment Setup Guide

## Quick Setup

1. **Create `.env` file:**
   ```bash
   # Copy the example
   cp .env.example .env
   
   # Or create manually
   echo "WEBHOOK_URL=https://your-webhook-url-here" > .env
   ```

2. **Edit `.env` and add your webhook URL:**
   ```env
   WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_KEY/
   ```

3. **Build the config:**
   ```bash
   npm run build
   ```

## Vercel Deployment

### Option 1: Using Vercel Dashboard

1. Push your code to GitHub
2. Import project in Vercel
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key**: `WEBHOOK_URL`
   - **Value**: Your webhook URL
   - **Environment**: Production, Preview, Development (check all)
5. Redeploy your project

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Set environment variable
vercel env add WEBHOOK_URL

# Deploy
vercel --prod
```

The build script (`build-config.js`) will automatically read the environment variable and generate `config.js` during deployment.

## Local Development

```bash
# 1. Create .env file (see above)
# 2. Build config
npm run build

# 3. Run development server
npm run dev
# Or use any static server: python -m http.server 8000
```

## How It Works

- **Local**: Reads from `.env` file
- **Vercel**: Reads from environment variables set in Vercel dashboard
- **Build Script**: Generates `config.js` from the environment variable
- **App**: Uses `CONFIG.WEBHOOK_URL` from `config.js`

The `.env` file and `config.js` are gitignored to keep your webhook URL private.

