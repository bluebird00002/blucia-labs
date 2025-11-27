# 🚀 Deploy Backend to Railway (Free Alternative)

This guide will help you deploy your existing Express backend to Railway and connect it to your Netlify frontend.

## ✅ Why Railway?

- **Free Tier**: $5/month credit (usually enough for small apps)
- **PostgreSQL Database**: Included for free
- **Environment Variables**: Free and unlimited
- **Automatic Deployments**: From GitHub
- **No Credit Card Required**: For free tier

## 📋 Prerequisites

1. GitHub account with your code pushed
2. Railway account (sign up at https://railway.app)

---

## 🔧 Step 1: Prepare Your Backend

Your backend is already set up! Just make sure:

1. **Backend folder has `package.json`** ✅ (you have this)
2. **Backend has `railway.json`** ✅ (you have this)
3. **Backend uses PostgreSQL** - You have `pg` installed ✅

---

## 🚀 Step 2: Deploy to Railway

### 2.1 Create Railway Account

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (recommended)
4. Authorize Railway to access your repositories

### 2.2 Deploy Your Backend

1. **Create New Project**:
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your repository

2. **Configure Service**:
   - Railway will detect your backend
   - If not, click **"Add Service"** → **"GitHub Repo"**
   - Select your repo
   - Set **Root Directory** to: `backend`

3. **Add PostgreSQL Database**:
   - Click **"New"** → **"Database"** → **"Add PostgreSQL"**
   - Railway will automatically create a database
   - The `DATABASE_URL` will be automatically set as an environment variable

### 2.3 Configure Environment Variables

Click on your backend service → **Variables** tab → Add these:

```env
NODE_ENV=production
PORT=3000
# DATABASE_URL is auto-provided by Railway PostgreSQL

JWT_SECRET=your-super-secure-random-string-here
SESSION_SECRET=another-super-secure-random-string-here

FRONTEND_URL=https://your-netlify-site.netlify.app

# Email Configuration (if using)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=your-admin@email.com

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Admin Account
ADMIN_NAME=Chief Executive Officer
ADMIN_USERNAME=ceo
ADMIN_EMAIL=ceo@blucialabs.com
ADMIN_PASSWORD=your-secure-password
```

**Important Notes:**
- `DATABASE_URL` is **automatically provided** by Railway when you add PostgreSQL
- Generate secure secrets: `openssl rand -base64 32`
- Replace `your-netlify-site.netlify.app` with your actual Netlify URL

### 2.4 Get Your Railway URL

1. Click on your backend service
2. Go to **Settings** tab
3. Under **"Networking"**, you'll see your public URL
4. Copy it (e.g., `https://your-app.railway.app`)

---

## 🔗 Step 3: Connect Netlify Frontend to Railway Backend

### 3.1 Update netlify.toml

Your `netlify.toml` should proxy API calls to Railway. Update it:

```toml
[build]
  base = "frontend"
  command = "npm ci && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

# Redirect all routes to index.html for SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false

# Proxy API calls to Railway backend
[[redirects]]
  from = "/api/*"
  to = "https://your-app.railway.app/api/:splat"
  status = 200
  force = true

# Headers for security
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Cache static assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Replace `https://your-app.railway.app` with your actual Railway URL!**

### 3.2 Update Frontend API Configuration (if needed)

Your frontend already uses `/api` as base URL, which will work with the proxy above. No changes needed!

---

## ✅ Step 4: Verify Deployment

1. **Check Railway Deployment**:
   - Go to Railway dashboard
   - Check **"Deployments"** tab
   - Should show "Active" status
   - Click **"View Logs"** to see if server started

2. **Test Backend API**:
   - Visit: `https://your-app.railway.app/api/auth/google-enabled`
   - Should return JSON response

3. **Test from Frontend**:
   - Visit your Netlify site
   - Try logging in or registering
   - Check browser console for errors

---

## 🔍 Troubleshooting

### Backend Not Starting

**Check Railway Logs:**
1. Go to Railway dashboard
2. Click your service
3. Click **"View Logs"**
4. Look for errors

**Common Issues:**
- **Port Error**: Railway sets `PORT` automatically, your code should use `process.env.PORT`
- **Database Error**: Check `DATABASE_URL` is set (should be auto-provided)
- **Missing Dependencies**: Check `package.json` has all dependencies

### API Calls Failing

**Check:**
1. Railway URL is correct in `netlify.toml`
2. Railway service is running (check logs)
3. CORS is configured in backend (should allow your Netlify domain)
4. Environment variables are set correctly

### Database Issues

**Initialize Database:**
- Your backend should auto-create tables on first run
- Check Railway logs for database connection errors
- Verify `DATABASE_URL` is set in Railway variables

---

## 💰 Railway Free Tier Limits

- **$5 credit/month** (usually enough for small apps)
- **500 hours runtime/month**
- **1GB RAM**
- **1GB storage**
- **PostgreSQL database included**

**Note**: If you exceed free tier, Railway will notify you. For most small apps, free tier is sufficient.

---

## 🎉 You're Done!

Your setup:
- ✅ **Frontend**: Netlify (free)
- ✅ **Backend**: Railway (free tier)
- ✅ **Database**: Railway PostgreSQL (free)
- ✅ **Total Cost**: $0/month

**Your URLs:**
- Frontend: `https://your-site.netlify.app`
- Backend API: `https://your-app.railway.app`

---

## 📚 Additional Resources

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Netlify Docs**: https://docs.netlify.com

---

## 🔄 Alternative: Render.com (Also Free)

If Railway doesn't work for you, Render.com is another great free option:

1. Go to https://render.com
2. Sign up with GitHub
3. Create **Web Service** → Connect your repo
4. Set **Root Directory** to `backend`
5. Add **PostgreSQL Database** (free tier available)
6. Configure environment variables
7. Update `netlify.toml` to point to Render URL

Render Free Tier:
- 750 hours/month
- 512MB RAM
- PostgreSQL database (free)
- Automatic SSL

---

**Need help?** Check Railway logs or contact support!

