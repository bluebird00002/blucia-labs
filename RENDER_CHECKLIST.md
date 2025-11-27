# ✅ Render Deployment Checklist

Use this checklist to ensure everything is set up correctly!

## 📋 Pre-Deployment

- [ ] Code is pushed to GitHub
- [ ] Backend folder has `package.json` with all dependencies
- [ ] Backend uses PostgreSQL (`pg` package installed)
- [ ] `server.js` uses `process.env.PORT` (Render sets this automatically)

## 🗄️ Database Setup

- [ ] Created PostgreSQL database in Render
- [ ] Copied the **Internal Database URL** (connection string)
- [ ] Database is in same region as web service

## 🚀 Web Service Setup

- [ ] Created Web Service in Render
- [ ] Connected GitHub repository
- [ ] Set **Root Directory** to `backend` ⚠️
- [ ] Set **Build Command** to `npm install`
- [ ] Set **Start Command** to `npm start`
- [ ] Selected **Free** plan

## 🔐 Environment Variables

Add these in Render dashboard → Your Service → Environment:

- [ ] `NODE_ENV=production`
- [ ] `PORT=10000` (for free tier)
- [ ] `DATABASE_URL=postgresql://...` (from database service)
- [ ] `JWT_SECRET=...` (generate secure random string)
- [ ] `SESSION_SECRET=...` (generate secure random string)
- [ ] `FRONTEND_URL=https://your-netlify-site.netlify.app`

**Optional (if needed):**
- [ ] `EMAIL_SERVICE=gmail`
- [ ] `EMAIL_HOST=smtp.gmail.com`
- [ ] `EMAIL_PORT=587`
- [ ] `EMAIL_USER=your-email@gmail.com`
- [ ] `EMAIL_PASSWORD=your-app-password`
- [ ] `ADMIN_EMAIL=your-admin@email.com`
- [ ] `GOOGLE_CLIENT_ID=...`
- [ ] `GOOGLE_CLIENT_SECRET=...`
- [ ] `ADMIN_NAME=Chief Executive Officer`
- [ ] `ADMIN_USERNAME=ceo`
- [ ] `ADMIN_EMAIL=ceo@blucialabs.com`
- [ ] `ADMIN_PASSWORD=secure-password`

## 🔗 Netlify Configuration

- [ ] Updated `netlify.toml` with Render backend URL
- [ ] Replaced `your-backend.onrender.com` with actual URL
- [ ] Committed and pushed changes
- [ ] Netlify redeployed automatically

## ✅ Testing

- [ ] Backend health check works: `https://your-backend.onrender.com/api/health`
- [ ] Database connection successful (check Render logs)
- [ ] Can register new user from frontend
- [ ] Can login from frontend
- [ ] API calls from frontend work correctly

## 🔄 Keep Service Awake (Free Tier)

- [ ] Set up UptimeRobot or cron-job.org
- [ ] Configured to ping `/api/health` every 10-14 minutes
- [ ] Monitor is active and working

## 📝 Final Steps

- [ ] Updated `FRONTEND_URL` in Render with actual Netlify URL
- [ ] Tested all features on production
- [ ] Checked Render logs for any errors
- [ ] Verified database tables were created
- [ ] Admin account is accessible

---

## 🎉 Deployment Complete!

If all items are checked, your backend is successfully deployed to Render!

**Your URLs:**
- Frontend: `https://your-site.netlify.app`
- Backend: `https://your-backend.onrender.com`
- Database: Managed by Render (internal)

---

## 🆘 Need Help?

- Check Render logs for errors
- Verify all environment variables are set
- Ensure database and web service are in same region
- Make sure Root Directory is set to `backend`

