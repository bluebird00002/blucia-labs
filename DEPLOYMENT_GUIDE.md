# 🚀 BluCia Labs - Deployment Guide

## Overview

This guide will help you deploy your BluCia Labs website online using free hosting platforms and enable Google OAuth authentication.

---

## 🌐 Hosting Strategy

### Frontend: **Vercel** (Free)

- ✅ Free hosting for React apps
- ✅ Automatic deployments from Git
- ✅ Custom domains supported
- ✅ Global CDN
- ✅ HTTPS by default

### Backend: **Railway** (Free Tier)

- ✅ Free $5/month credit
- ✅ PostgreSQL database included
- ✅ Environment variables
- ✅ Automatic deployments
- ✅ Custom domains

---

## 📋 Prerequisites

Before deploying, you'll need:

1. **GitHub Account** - To store your code
2. **Vercel Account** - For frontend hosting
3. **Railway Account** - For backend hosting
4. **Google Cloud Console** - For OAuth setup

---

## 🔧 Step 1: Prepare for Deployment

### Update Backend for Production

1. **Switch to PostgreSQL** (Railway's free database):

```bash
cd backend
npm install pg
npm uninstall mysql2
```

2. **Update database configuration** in `backend/config/database.js`

3. **Add production scripts** to `backend/package.json`

### Update Frontend Build

1. **Add build optimization** to `frontend/vite.config.js`
2. **Update API URLs** for production

---

## 🚀 Step 2: Deploy Backend to Railway

### 2.1 Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Connect your GitHub account

### 2.2 Deploy Backend

1. Push your code to GitHub
2. Create new Railway project
3. Connect GitHub repository
4. Select `backend` folder
5. Add PostgreSQL database
6. Configure environment variables

### 2.3 Environment Variables for Railway

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://... (auto-provided by Railway)
JWT_SECRET=your-production-jwt-secret
SESSION_SECRET=your-production-session-secret
FRONTEND_URL=https://your-vercel-app.vercel.app
EMAIL_USER=blucialabs@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=ellybarikiceo@gmail.com
BLUCIA_EMAIL=blucialabs@gmail.com
```

---

## 🌟 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository

### 3.2 Configure Vercel

1. Set root directory to `frontend`
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variables:

```env
VITE_API_URL=https://your-railway-app.railway.app
```

### 3.3 Custom Domain (Optional)

- Add your custom domain in Vercel dashboard
- Update DNS records as instructed

---

## 🔐 Step 4: Set Up Google OAuth

### 4.1 Google Cloud Console Setup

1. Go to https://console.cloud.google.com
2. Create new project: "BluCia Labs Website"
3. Enable Google+ API
4. Create OAuth 2.0 credentials

### 4.2 OAuth Configuration

**Authorized JavaScript origins:**

```
https://your-vercel-app.vercel.app
https://your-custom-domain.com (if using custom domain)
```

**Authorized redirect URIs:**

```
https://your-railway-app.railway.app/api/auth/google/callback
```

### 4.3 Update Environment Variables

**Railway (Backend):**

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-railway-app.railway.app/api/auth/google/callback
```

---

## 📊 Step 5: Database Migration

### 5.1 PostgreSQL Schema

Railway will provide a PostgreSQL database. Update your schema:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  phone VARCHAR(50),
  google_id VARCHAR(255) UNIQUE,
  avatar_url VARCHAR(500),
  role VARCHAR(20) DEFAULT 'client',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service requests table
CREATE TABLE service_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  client_type VARCHAR(20) DEFAULT 'individual',
  company_name VARCHAR(255),
  company_location VARCHAR(255),
  industry VARCHAR(100),
  project_reason VARCHAR(100),
  service_type VARCHAR(100) NOT NULL,
  project_description TEXT NOT NULL,
  budget VARCHAR(50),
  budget_amount DECIMAL(15, 2),
  budget_currency VARCHAR(10) DEFAULT 'USD',
  timeline VARCHAR(50),
  hear_about_us VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Step 6: Testing

### 6.1 Test Checklist

- [ ] Website loads on production URL
- [ ] User registration works
- [ ] Google OAuth login works
- [ ] Email notifications send
- [ ] Contact form submissions work
- [ ] Admin dashboard accessible
- [ ] Currency conversion works
- [ ] Mobile responsive

### 6.2 Common Issues

**CORS Errors:**

- Update CORS settings in backend
- Add production URLs to allowed origins

**Google OAuth Errors:**

- Verify redirect URIs match exactly
- Check client ID/secret in environment variables

**Database Connection:**

- Ensure DATABASE_URL is correct
- Check PostgreSQL connection

---

## 📈 Step 7: Post-Deployment

### 7.1 Monitoring

- Set up Railway metrics monitoring
- Configure Vercel analytics
- Monitor error logs

### 7.2 Performance

- Enable Vercel Edge Functions if needed
- Optimize images and assets
- Set up caching headers

### 7.3 Security

- Enable HTTPS (automatic on both platforms)
- Set secure environment variables
- Regular security updates

---

## 💰 Cost Breakdown

### Free Tier Limits

**Vercel Free:**

- 100GB bandwidth/month
- 1000 serverless function invocations/day
- Custom domains included

**Railway Free:**

- $5 credit/month
- 500 hours runtime
- 1GB RAM
- 1GB storage

**Total Monthly Cost: $0** (within free limits)

---

## 🔄 Continuous Deployment

Both platforms support automatic deployments:

1. **Push to GitHub main branch**
2. **Vercel automatically rebuilds frontend**
3. **Railway automatically redeploys backend**
4. **Changes go live in ~2 minutes**

---

## 🆘 Troubleshooting

### Common Deployment Issues

1. **Build Failures:**

   - Check Node.js version compatibility
   - Verify all dependencies installed
   - Review build logs

2. **Environment Variables:**

   - Ensure all required vars are set
   - No spaces around = signs
   - Restart services after changes

3. **Database Issues:**
   - Check connection string format
   - Verify PostgreSQL syntax
   - Run migrations manually if needed

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Google OAuth:** https://developers.google.com/identity/protocols/oauth2

---

## ✅ Final Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Google OAuth working
- [ ] Email notifications working
- [ ] Database populated with admin user
- [ ] Custom domain configured (optional)
- [ ] SSL certificates active
- [ ] All features tested on production

---

**🎉 Congratulations! Your BluCia Labs website is now live and accessible worldwide!**

Share your production URL:

- **Frontend:** https://your-app.vercel.app
- **Backend API:** https://your-app.railway.app

---

_Need help with deployment? Check the troubleshooting section or contact support._
