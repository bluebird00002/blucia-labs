# 🚀 Quick Fix: Setup Resend Email (5 Minutes)

## ✅ Why Resend?

- ✅ **Works with Render** (no connection timeouts)
- ✅ **Free tier** available
- ✅ **Easy setup** (just API key)
- ✅ **Reliable** for production

---

## 📋 Step-by-Step Setup

### Step 1: Sign Up for Resend (2 minutes)

1. Go to: **https://resend.com**
2. Click **"Get Started"** (free)
3. Sign up with your email
4. Verify your email address

### Step 2: Get API Key (1 minute)

1. After logging in, you'll see the dashboard
2. Click **"API Keys"** in the sidebar
3. Click **"Create API Key"**
4. Name it: `BluCia Labs Production`
5. **Copy the API key** (starts with `re_`)
   - Example: `re_AbCdEfGhIjKlMnOpQrStUvWxYz`

### Step 3: Add to Render (2 minutes)

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click your **Web Service** (the backend service)
3. Click **"Environment"** tab
4. **Add or update these variables**:

```env
EMAIL_SERVICE=
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USER=resend
EMAIL_PASSWORD=re_YOUR_API_KEY_HERE
EMAIL_FROM=onboarding@resend.dev
```

**Important:**
- Replace `re_YOUR_API_KEY_HERE` with your actual Resend API key
- `EMAIL_FROM` can be `onboarding@resend.dev` (Resend's default) or your verified domain

5. Click **"Save Changes"**
6. Render will automatically redeploy (wait 1-2 minutes)

---

## ✅ Verify It Works

1. **Wait for Render to finish redeploying**
2. **Register a new user** on your site
3. **Check Render logs** - you should see:
   ```
   ✅ Email sent successfully: ...
   ```
4. **Check the user's email inbox** - they should receive a welcome email!

---

## 🎯 That's It!

After adding the Resend API key to Render, emails will work immediately. No more connection timeouts!

---

## 📝 Environment Variables Summary

**In Render Dashboard → Your Web Service → Environment:**

```env
EMAIL_SERVICE=
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USER=resend
EMAIL_PASSWORD=re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=onboarding@resend.dev
```

**That's all you need!** 🎉

---

## 🔍 If You Want to Use Your Own Domain

1. In Resend dashboard, go to **"Domains"**
2. Add your domain (e.g., `blucialabs.com`)
3. Verify it (follow Resend's instructions)
4. Update `EMAIL_FROM` in Render:
   ```env
   EMAIL_FROM=noreply@blucialabs.com
   ```

But `onboarding@resend.dev` works fine for testing!

---

## 🆘 Troubleshooting

### Still getting timeout?
- ✅ Make sure you copied the API key correctly
- ✅ Check `EMAIL_HOST` is `smtp.resend.com`
- ✅ Check `EMAIL_USER` is `resend`
- ✅ Check `EMAIL_PASSWORD` is your Resend API key (starts with `re_`)

### Not receiving emails?
- Check spam folder
- Verify Resend API key is correct
- Check Render logs for errors
- Make sure domain is verified (if using custom domain)

---

**Resend is the easiest solution - it just works with Render!** 🚀

