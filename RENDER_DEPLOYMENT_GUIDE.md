# 🚀 Deploy Backend to Render.com (Free Alternative)

This guide will help you deploy your Express backend to Render.com as an alternative to Railway.

## ✅ Why Render?

- **Free Tier**: 750 hours/month (enough for 24/7 operation)
- **PostgreSQL Database**: Free tier available
- **Environment Variables**: Free and unlimited
- **Automatic Deployments**: From GitHub
- **No Credit Card Required**: For free tier
- **Automatic SSL**: HTTPS by default

---

## 📋 Prerequisites

1. GitHub account with your code pushed
2. Render account (sign up at https://render.com)

---

## 🔧 Step 1: Prepare Your Backend

Your backend is already set up! Just make sure:

1. **Backend folder has `package.json`** ✅
2. **Backend uses PostgreSQL** ✅ (you have `pg` installed)

---

## 🚀 Step 2: Deploy to Render

### 2.1 Create Render Account

1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (recommended)
4. Authorize Render to access your repositories

### 2.2 Create PostgreSQL Database

1. In Render dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Configure:
   - **Name**: `blucia-database` (or any name)
   - **Database**: `blucia_labs` (or any name)
   - **User**: Auto-generated
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: Latest
   - **Plan**: **Free** (for testing)
4. Click **"Create Database"**
5. **Copy the connection string** - you'll need this!

### 2.3 Deploy Web Service (Backend)

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `blucia-backend` (or any name)
   - **Region**: Same as database
   - **Branch**: `main` (or your main branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free** (for testing)

4. Click **"Advanced"** → Add Environment Variables:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@host/database (from step 2.2)

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
- **Port**: Render free tier uses port `10000` (or check your service settings)
- **DATABASE_URL**: Paste the connection string from step 2.2
- Generate secure secrets: `openssl rand -base64 32`
- Replace `your-netlify-site.netlify.app` with your actual Netlify URL

5. Click **"Create Web Service"**

### 2.4 Get Your Render URL

1. Wait for deployment to complete (2-5 minutes)
2. Your service will have a URL like: `https://blucia-backend.onrender.com`
3. Copy this URL

---

## 🔗 Step 3: Connect Netlify Frontend to Render Backend

### 3.1 Update netlify.toml

Update your `netlify.toml`:

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

# Proxy API calls to Render backend
[[redirects]]
  from = "/api/*"
  to = "https://your-backend.onrender.com/api/:splat"
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

**Replace `https://your-backend.onrender.com` with your actual Render URL!**

---

## ⚠️ Important: Render Free Tier Limitations

### Free Tier Spins Down

- **Free services spin down after 15 minutes of inactivity**
- **First request after spin-down takes 30-60 seconds** (cold start)
- **This is normal** - subsequent requests are fast

### Solutions:

1. **Use a free uptime monitor** (keeps service awake):
   - https://uptimerobot.com (free, 50 monitors)
   - https://cron-job.org (free cron jobs)
   - Set to ping your Render URL every 10-14 minutes

2. **Upgrade to paid** ($7/month) for always-on service

3. **Accept the cold start** - fine for low-traffic sites

---

## ✅ Step 4: Verify Deployment

1. **Check Render Dashboard**:
   - Service should show "Live" status
   - Check "Logs" tab for any errors

2. **Test Backend API**:
   - Visit: `https://your-backend.onrender.com/api/auth/google-enabled`
   - Should return JSON (may take 30-60s on first request if spun down)

3. **Test from Frontend**:
   - Visit your Netlify site
   - Try logging in
   - Check browser console

---

## 🔍 Troubleshooting

### Service Keeps Spinning Down

**Solution**: Set up uptime monitor (see above) or upgrade to paid plan.

### Database Connection Errors

**Check:**
1. `DATABASE_URL` is correctly set in Render environment variables
2. Database service is running (check Render dashboard)
3. Connection string format is correct

### Port Errors

**Check:**
1. Render uses port from `PORT` environment variable
2. Your backend should use `process.env.PORT || 5000`
3. Render free tier typically uses port `10000`

---

## 💰 Render Free Tier

- **750 hours/month** (enough for 24/7)
- **512MB RAM**
- **PostgreSQL database** (free tier)
- **Automatic SSL/HTTPS**
- **Spins down after 15 min inactivity** (use uptime monitor)

---

## 🎉 You're Done!

Your setup:
- ✅ **Frontend**: Netlify (free)
- ✅ **Backend**: Render (free tier)
- ✅ **Database**: Render PostgreSQL (free)
- ✅ **Total Cost**: $0/month

**Your URLs:**
- Frontend: `https://your-site.netlify.app`
- Backend API: `https://your-backend.onrender.com`

---

## 📚 Additional Resources

- **Render Docs**: https://render.com/docs
- **Render Status**: https://status.render.com
- **Netlify Docs**: https://docs.netlify.com

---

**Need help?** Check Render logs or contact support!

