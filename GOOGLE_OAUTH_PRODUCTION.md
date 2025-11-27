# 🔐 Google OAuth Setup for Production

## Overview

This guide will help you set up Google OAuth authentication for your live BluCia Labs website.

---

## 🚀 Step 1: Get Your Production URLs

After deploying to Vercel and Railway, you'll have:

**Frontend URL:** `https://your-app.vercel.app`
**Backend URL:** `https://your-app.railway.app`

---

## 🔧 Step 2: Google Cloud Console Setup

### 2.1 Create/Update Google Cloud Project

1. Go to https://console.cloud.google.com
2. Select your existing project or create new: "BluCia Labs Production"
3. Enable required APIs:
   - Google+ API
   - Google Identity API

### 2.2 Configure OAuth Consent Screen

1. Go to **OAuth consent screen**
2. Choose **External** user type
3. Fill in application details:
   - **App name:** BluCia Labs
   - **User support email:** blucialabs@gmail.com
   - **Developer contact:** blucialabs@gmail.com
   - **App domain:** https://your-app.vercel.app
   - **Privacy policy:** https://your-app.vercel.app/privacy (create if needed)
   - **Terms of service:** https://your-app.vercel.app/terms (create if needed)

### 2.3 Create OAuth 2.0 Credentials

1. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
2. Application type: **Web application**
3. Name: **BluCia Labs Production**

**Authorized JavaScript origins:**
```
https://your-app.vercel.app
```

**Authorized redirect URIs:**
```
https://your-app.railway.app/api/auth/google/callback
```

4. **Save** and copy your:
   - Client ID
   - Client Secret

---

## 🌐 Step 3: Update Environment Variables

### 3.1 Railway (Backend) Environment Variables

Add these to your Railway project:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://... (auto-provided)
JWT_SECRET=your-super-secure-jwt-secret-for-production
SESSION_SECRET=your-super-secure-session-secret-for-production
FRONTEND_URL=https://your-app.vercel.app

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=blucialabs@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=ellybarikiceo@gmail.com
BLUCIA_EMAIL=blucialabs@gmail.com

# Google OAuth (Production)
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
GOOGLE_CALLBACK_URL=https://your-app.railway.app/api/auth/google/callback

# Admin Account
ADMIN_NAME=Chief Executive Officer
ADMIN_USERNAME=ceo
ADMIN_SEED_EMAIL=ceo@blucialabs.com
ADMIN_PASSWORD=change-this-secure-password
```

### 3.2 Vercel (Frontend) Environment Variables

Add these to your Vercel project:

```env
VITE_API_URL=https://your-app.railway.app
```

---

## 🔄 Step 4: Update CORS Settings

Your backend CORS is already configured to accept your production domain. The current settings in `server.js` will automatically allow your Vercel domain.

---

## 🧪 Step 5: Testing Google OAuth

### 5.1 Test Flow

1. **Visit your live site:** https://your-app.vercel.app
2. **Click "Login"**
3. **Click "Continue with Google"**
4. **Authorize BluCia Labs app**
5. **Should redirect back and log you in**

### 5.2 Troubleshooting

**Error: `redirect_uri_mismatch`**
- Check that redirect URI in Google Console exactly matches your Railway URL
- Ensure no trailing slashes

**Error: `invalid_client`**
- Verify Client ID and Secret are correct in Railway environment variables
- Check that credentials are for the correct Google project

**Error: `unauthorized_client`**
- Ensure OAuth consent screen is configured
- Check that your domain is added to authorized origins

---

## 📧 Step 6: Email Configuration

### 6.1 Gmail App Password Setup

1. **Enable 2-Step Verification** on blucialabs@gmail.com
2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "BluCia Labs Production"
   - Copy the 16-character password

3. **Add to Railway environment variables:**
   ```env
   EMAIL_USER=blucialabs@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

### 6.2 Test Email Functionality

1. **Register a new account** on your live site
2. **Check for welcome email**
3. **Submit a contact form**
4. **Check admin receives notification**

---

## 🔒 Step 7: Security Best Practices

### 7.1 Environment Variables Security

- ✅ Never commit secrets to Git
- ✅ Use strong, unique passwords
- ✅ Rotate secrets regularly
- ✅ Use different secrets for dev/production

### 7.2 OAuth Security

- ✅ Restrict authorized domains
- ✅ Monitor OAuth usage in Google Console
- ✅ Set up alerts for suspicious activity
- ✅ Regular security reviews

---

## 📊 Step 8: Monitoring & Analytics

### 8.1 Google Cloud Monitoring

1. **Enable Google Cloud Monitoring**
2. **Set up OAuth usage alerts**
3. **Monitor API quotas**

### 8.2 Application Monitoring

1. **Railway Metrics:** Monitor backend performance
2. **Vercel Analytics:** Track frontend usage
3. **Error Logging:** Set up error tracking

---

## 🚨 Common Issues & Solutions

### Issue: Google OAuth Button Not Showing

**Cause:** Backend not configured or not responding
**Solution:** 
1. Check Railway deployment logs
2. Verify environment variables
3. Test `/api/auth/google-enabled` endpoint

### Issue: OAuth Redirect Loop

**Cause:** Mismatched URLs or CORS issues
**Solution:**
1. Verify all URLs match exactly
2. Check CORS configuration
3. Clear browser cache/cookies

### Issue: Email Not Sending

**Cause:** Gmail authentication or configuration
**Solution:**
1. Verify App Password is correct
2. Check 2-Step Verification is enabled
3. Test with a simple email first

---

## ✅ Production Checklist

Before going live:

- [ ] Google Cloud project configured
- [ ] OAuth consent screen approved
- [ ] Production credentials created
- [ ] Railway environment variables set
- [ ] Vercel environment variables set
- [ ] CORS settings updated
- [ ] Email configuration tested
- [ ] Google OAuth flow tested
- [ ] Admin account accessible
- [ ] All features working on production

---

## 🎉 Success!

Your BluCia Labs website now has:

✅ **Live production deployment**
✅ **Google OAuth authentication**
✅ **Email notifications**
✅ **Admin dashboard**
✅ **Multi-currency support**
✅ **Professional contact system**

**Share your live website:**
- **Website:** https://your-app.vercel.app
- **Admin:** https://your-app.vercel.app/admin

---

## 📞 Support

If you encounter issues:

1. **Check deployment logs** in Railway/Vercel dashboards
2. **Verify environment variables** are set correctly
3. **Test API endpoints** directly
4. **Review Google Cloud Console** for OAuth errors

---

**🚀 Your BluCia Labs website is now live and ready for the world!**
