# 🚀 Render.com Quick Start Guide

Follow these steps to deploy your backend to Render in **5 minutes**!

---

## ✅ Step 1: Create Render Account

1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (recommended - easier deployment)
4. Authorize Render to access your repositories

---

## ✅ Step 2: Create PostgreSQL Database

1. In Render dashboard, click **"New +"** button
2. Select **"PostgreSQL"**
3. Configure:
   - **Name**: `blucia-database` (or any name you like)
   - **Database**: `blucia_labs`
   - **User**: `blucia_user` (or auto-generated)
   - **Region**: Choose closest to you (e.g., `Oregon`, `Frankfurt`)
   - **PostgreSQL Version**: Latest (14 or 15)
   - **Plan**: **Free** (for testing)
4. Click **"Create Database"**
5. **Wait 2-3 minutes** for database to be created
6. **Copy the "Internal Database URL"** - you'll need this!

   It looks like: `postgresql://user:password@dpg-xxxxx-a.oregon-postgres.render.com/blucia_labs`

---

## ✅ Step 3: Deploy Backend Web Service

1. Click **"New +"** → **"Web Service"**
2. **Connect your GitHub repository**
   - Select your repository
   - Authorize if needed
3. Configure the service:

   **Basic Settings:**
   - **Name**: `blucia-backend` (or any name)
   - **Region**: Same as your database (e.g., `Oregon`)
   - **Branch**: `main` (or your main branch)
   - **Root Directory**: `backend` ⚠️ **IMPORTANT!**
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

4. Click **"Advanced"** to add environment variables:

   **Required Environment Variables:**

   ```env
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=postgresql://user:password@host/database (paste from step 2)
   
   JWT_SECRET=your-super-secure-random-string-here
   SESSION_SECRET=another-super-secure-random-string-here
   
   FRONTEND_URL=https://your-netlify-site.netlify.app
   ```

   **Optional (add if you need them):**

   ```env
   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=your-admin@email.com
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Admin Account
   ADMIN_NAME=Chief Executive Officer
   ADMIN_USERNAME=ceo
   ADMIN_EMAIL=ceo@blucialabs.com
   ADMIN_PASSWORD=your-secure-password
   ```

   **How to generate secure secrets:**
   - Use: `openssl rand -base64 32`
   - Or use an online generator: https://randomkeygen.com

5. Click **"Create Web Service"**
6. **Wait 3-5 minutes** for deployment

---

## ✅ Step 4: Get Your Render Backend URL

1. Once deployment is complete, you'll see your service is **"Live"**
2. Your URL will be: `https://blucia-backend.onrender.com` (or your service name)
3. **Copy this URL** - you'll need it for Netlify!

---

## ✅ Step 5: Test Your Backend

1. Visit: `https://your-backend.onrender.com/api/health`
2. You should see: `{"status":"ok","message":"BluCia Labs API is running"}`
3. **Note**: First request may take 30-60 seconds (cold start on free tier)

---

## ✅ Step 6: Connect Netlify to Render

1. Open your `netlify.toml` file
2. Find this line:
   ```toml
   to = "https://your-backend.onrender.com/api/:splat"
   ```
3. Replace `your-backend.onrender.com` with your actual Render URL
4. Save and commit to Git
5. Netlify will automatically redeploy

**Example:**
```toml
[[redirects]]
  from = "/api/*"
  to = "https://blucia-backend.onrender.com/api/:splat"
  status = 200
  force = true
```

---

## ✅ Step 7: Update Frontend URL in Render

1. Go back to Render dashboard
2. Click your web service → **Environment** tab
3. Update `FRONTEND_URL` with your actual Netlify URL:
   ```
   FRONTEND_URL=https://your-actual-site.netlify.app
   ```
4. Click **"Save Changes"**
5. Render will automatically redeploy

---

## ⚠️ Important: Free Tier Limitations

### Render Free Tier Spins Down

- **Services spin down after 15 minutes of inactivity**
- **First request after spin-down takes 30-60 seconds** (cold start)
- **This is normal!** Subsequent requests are fast

### Solution: Keep Service Awake

Use a **free uptime monitor** to ping your service every 10-14 minutes:

**Option 1: UptimeRobot** (Recommended)
1. Go to https://uptimerobot.com
2. Sign up (free)
3. Add monitor:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://your-backend.onrender.com/api/health`
   - **Interval**: 5 minutes
4. Save - it will ping your service automatically

**Option 2: cron-job.org**
1. Go to https://cron-job.org
2. Create account (free)
3. Create cron job:
   - **URL**: `https://your-backend.onrender.com/api/health`
   - **Schedule**: Every 10 minutes
4. Save

---

## 🎉 You're Done!

Your setup:
- ✅ **Frontend**: Netlify (free)
- ✅ **Backend**: Render (free tier)
- ✅ **Database**: Render PostgreSQL (free)
- ✅ **Total Cost**: $0/month

**Test it:**
1. Visit your Netlify site
2. Try registering a new user
3. Check if it works!

---

## 🔍 Troubleshooting

### Backend Not Starting

**Check Render Logs:**
1. Go to Render dashboard
2. Click your service
3. Click **"Logs"** tab
4. Look for errors

**Common Issues:**
- **Port Error**: Make sure `PORT=10000` is set
- **Database Error**: Check `DATABASE_URL` is correct
- **Missing Dependencies**: Check `package.json`

### API Calls Failing from Frontend

1. Check Render URL is correct in `netlify.toml`
2. Check Render service is running (should show "Live")
3. Check CORS - your backend allows all origins in production
4. Check browser console for errors

### Database Connection Errors

1. Verify `DATABASE_URL` is set correctly
2. Check database service is running in Render
3. Make sure database and web service are in same region

---

## 📚 Need More Help?

- **Render Docs**: https://render.com/docs
- **Render Status**: https://status.render.com
- **Render Discord**: https://render.com/discord

---

**🎊 Congratulations! Your backend is now live on Render!**

