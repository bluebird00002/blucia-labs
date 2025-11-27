# 🚀 Netlify Deployment Guide for BluCia Labs

## Overview

This guide will help you deploy your BluCia Labs website to Netlify (frontend) and Railway (backend) with Google OAuth.

---

## 🌐 Deployment Strategy

### Frontend: **Netlify** (Free)

- ✅ Free hosting for static sites
- ✅ Automatic deployments from Git
- ✅ Custom domains supported
- ✅ Global CDN
- ✅ HTTPS by default
- ✅ 100GB bandwidth/month

### Backend: **Railway** (Free Tier)

- ✅ Free $5/month credit
- ✅ PostgreSQL database included
- ✅ Environment variables
- ✅ Automatic deployments

---

## 🔧 Step 1: Deploy Backend to Railway

### 1.1 Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Connect your GitHub account

### 1.2 Deploy Backend

1. **Push your code to GitHub first**
2. Create new Railway project
3. Connect GitHub repository
4. Select `backend` folder as root
5. Add PostgreSQL database
6. Configure environment variables

### 1.3 Environment Variables for Railway

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://... (auto-provided by Railway)
JWT_SECRET=your-super-secure-jwt-secret-change-this
SESSION_SECRET=your-super-secure-session-secret-change-this
FRONTEND_URL=https://your-netlify-site.netlify.app

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=blucialabs@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=ellybarikiceo@gmail.com
BLUCIA_EMAIL=blucialabs@gmail.com

# Google OAuth (will add after frontend is deployed)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-railway-app.railway.app/api/auth/google/callback

# Admin Account
ADMIN_NAME=Chief Executive Officer
ADMIN_USERNAME=ceo
ADMIN_SEED_EMAIL=ceo@blucialabs.com
ADMIN_PASSWORD=change-this-secure-password
```

**Important:** Copy your Railway app URL (e.g., `https://your-app.railway.app`)

---

## 🌟 Step 2: Deploy Frontend to Netlify

### 2.1 Method 1: Netlify Dashboard (Recommended)

1. **Go to https://netlify.com**
2. **Sign up with GitHub**
3. **Click "New site from Git"**
4. **Connect to GitHub and select your repository**
5. **Configure build settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm ci && npm run build`
   - **Publish directory:** `dist`
6. **Click "Deploy site"**

### 2.2 Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project root
netlify deploy --prod --dir=frontend/dist
```

### 2.3 Configuration is Ready

The `netlify.toml` file is already configured correctly:

```toml
[build]
  base = "frontend"
  command = "npm ci && npm run build"
  publish = "dist"
```

After you deploy your backend to Railway, update the API proxy URL in `netlify.toml`.

---

## 🔐 Step 3: Set Up Google OAuth

### 3.1 Google Cloud Console Setup

1. **Go to https://console.cloud.google.com**
2. **Create new project:** "BluCia Labs Website"
3. **Enable APIs:**
   - Google+ API
   - Google Identity API
4. **Configure OAuth consent screen:**
   - App name: BluCia Labs
   - User support email: blucialabs@gmail.com
   - App domain: https://your-netlify-site.netlify.app

### 3.2 Create OAuth 2.0 Credentials

1. **Go to Credentials → Create Credentials → OAuth 2.0 Client IDs**
2. **Application type:** Web application
3. **Name:** BluCia Labs Production

**Authorized JavaScript origins:**

```
https://your-netlify-site.netlify.app
```

**Authorized redirect URIs:**

```
https://your-railway-app.railway.app/api/auth/google/callback
```

4. **Copy Client ID and Client Secret**

### 3.3 Update Railway Environment Variables

Add to your Railway project:

```env
GOOGLE_CLIENT_ID=your-actual-client-id
GOOGLE_CLIENT_SECRET=your-actual-client-secret
```

---

## 🧪 Step 4: Testing Your Deployment

### 4.1 Test Checklist

Visit your Netlify URL and test:

- [ ] **Website loads correctly**
- [ ] **Navigation works**
- [ ] **Contact form submits** (check Railway logs)
- [ ] **User registration works**
- [ ] **Google OAuth login works**
- [ ] **Admin dashboard accessible** (`/admin`)
- [ ] **Email notifications send**
- [ ] **Mobile responsive**

### 4.2 Check Railway Logs

1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Deployments" tab
4. Click "View Logs" to see if backend is working

---

## 🔧 Step 5: Fix Common Issues

### Issue 1: API Calls Not Working

**Problem:** Frontend can't reach backend
**Solution:** Update `netlify.toml` with correct Railway URL

### Issue 2: Google OAuth Redirect Error

**Problem:** `redirect_uri_mismatch`
**Solution:**

1. Check Google Console redirect URIs match exactly
2. Ensure Railway URL is correct

### Issue 3: CORS Errors

**Problem:** Cross-origin requests blocked
**Solution:** Your backend is already configured for this

### Issue 4: Build Fails

**Problem:** `npm run build` fails
**Solution:**

```bash
# Test build locally first
cd frontend
npm install
npm run build
```

---

## 📊 Step 6: Environment Variables Summary

### Railway (Backend) - Complete List:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://... (auto-provided)
JWT_SECRET=your-super-secure-jwt-secret
SESSION_SECRET=your-super-secure-session-secret
FRONTEND_URL=https://your-netlify-site.netlify.app
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=blucialabs@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=ellybarikiceo@gmail.com
BLUCIA_EMAIL=blucialabs@gmail.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-railway-app.railway.app/api/auth/google/callback
ADMIN_NAME=Chief Executive Officer
ADMIN_USERNAME=ceo
ADMIN_SEED_EMAIL=ceo@blucialabs.com
ADMIN_PASSWORD=secure-password-change-this
```

### Netlify (Frontend) - No environment variables needed!

The frontend uses relative API calls that are proxied through `netlify.toml`

---

## 🎯 Step 7: Final Steps

### 7.1 Update URLs in Your Files

1. **Update `netlify.toml`** with your Railway URL
2. **Redeploy to Netlify** (automatic if connected to Git)
3. **Test all functionality**

### 7.2 Custom Domain (Optional)

1. **In Netlify dashboard:** Domain settings → Add custom domain
2. **Update DNS records** as instructed
3. **Update Google OAuth origins** with new domain

---

## 🚀 Quick Commands Summary

```bash
# Build the frontend locally (test first)
npm run build

# Deploy to Netlify via CLI (optional)
netlify deploy --prod --dir=frontend/dist

# Check if build works
cd frontend
npm run build
ls dist  # Should show built files
```

---

## 💰 Cost Breakdown

**Netlify Free Tier:**

- 100GB bandwidth/month
- 300 build minutes/month
- Custom domains included

**Railway Free Tier:**

- $5 credit/month
- Usually covers small apps completely

**Total: $0/month** for most use cases

---

## ✅ Success Checklist

Your site is ready when:

- [ ] Netlify shows "Published" status
- [ ] Railway shows "Active" deployment
- [ ] Website loads at Netlify URL
- [ ] API calls work (check Network tab)
- [ ] Google OAuth works
- [ ] Admin can login at `/admin`
- [ ] Contact form sends emails
- [ ] All pages responsive on mobile

---

## 🆘 Need Help?

**Common Commands:**

```bash
# Check build locally
npm run build

# Check Railway logs
# Go to Railway dashboard → Your service → Deployments → View Logs

# Test API endpoint
curl https://your-railway-app.railway.app/api/health
```

**Support Resources:**

- Netlify Docs: https://docs.netlify.com
- Railway Docs: https://docs.railway.app

---

## 🎉 You're Live!

Once deployed, share your website:

**🌐 Website:** https://your-netlify-site.netlify.app
**🔧 Admin:** https://your-netlify-site.netlify.app/admin
**📧 Contact:** blucialabs@gmail.com

Your BluCia Labs website is now accessible worldwide! 🚀
