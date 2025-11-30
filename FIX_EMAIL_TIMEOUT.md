# 🔧 Fix Email Connection Timeout Error

## 🐛 Problem
```
❌ Email sending failed: Error: Connection timeout
code: 'ETIMEDOUT'
```

This means the SMTP server (Gmail) is not responding or the connection is being blocked.

---

## ✅ Solutions

### Solution 1: Check Environment Variables in Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click your Web Service**
3. **Go to "Environment" tab**
4. **Verify these are set**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

**Important**: 
- `EMAIL_PASSWORD` must be a **Gmail App Password**, NOT your regular password
- Remove spaces from the app password

---

### Solution 2: Generate Gmail App Password

If you haven't set up a Gmail App Password:

1. **Enable 2-Step Verification**:
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "BluCia Labs"
   - Click "Generate"
   - **Copy the 16-character password** (remove spaces)

3. **Add to Render**:
   - Render Dashboard → Your Web Service → Environment
   - Set `EMAIL_PASSWORD` to the app password (no spaces)

---

### Solution 3: Use Alternative Email Service (Recommended for Production)

Render's network might block Gmail SMTP. Use a dedicated email service:

#### Option A: Resend (Recommended - Free Tier)

1. **Sign up**: https://resend.com
2. **Get API Key** from dashboard
3. **Update Render Environment Variables**:
   ```env
   EMAIL_SERVICE=
   EMAIL_HOST=smtp.resend.com
   EMAIL_PORT=587
   EMAIL_USER=resend
   EMAIL_PASSWORD=re_YOUR_API_KEY_HERE
   ```

#### Option B: SendGrid (Free: 100 emails/day)

1. **Sign up**: https://sendgrid.com
2. **Create API Key** in dashboard
3. **Update Render Environment Variables**:
   ```env
   EMAIL_SERVICE=
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASSWORD=SG.YOUR_SENDGRID_API_KEY
   ```

#### Option C: Mailgun (Free: 5,000 emails/month)

1. **Sign up**: https://www.mailgun.com
2. **Get SMTP credentials** from dashboard
3. **Update Render Environment Variables**:
   ```env
   EMAIL_SERVICE=
   EMAIL_HOST=smtp.mailgun.org
   EMAIL_PORT=587
   EMAIL_USER=postmaster@your-domain.mailgun.org
   EMAIL_PASSWORD=your-mailgun-password
   ```

---

### Solution 4: Disable Email Temporarily

If you don't need emails right now, you can disable them:

1. **Remove or comment out** email sending in the code
2. **Or** don't set `EMAIL_USER` and `EMAIL_PASSWORD` in Render
3. The app will work, just without email notifications

---

## 🔍 Troubleshooting Steps

### Step 1: Verify Environment Variables

Check Render Dashboard → Your Web Service → Environment:
- ✅ `EMAIL_USER` is set
- ✅ `EMAIL_PASSWORD` is set (Gmail App Password)
- ✅ `EMAIL_HOST` is `smtp.gmail.com`
- ✅ `EMAIL_PORT` is `587`

### Step 2: Test Gmail App Password

1. Make sure 2-Step Verification is enabled
2. Generate a NEW app password
3. Copy it exactly (no spaces)
4. Paste in Render environment variables

### Step 3: Check Render Logs

Look for:
- `⚠️ Email not configured` - means env vars are missing
- `Connection timeout` - means SMTP server not reachable
- `Authentication failed` - means wrong password

### Step 4: Try Different Port

If port 587 doesn't work, try 465 (SSL):

```env
EMAIL_PORT=465
EMAIL_SECURE=true
```

But you'll need to update the code to use `secure: true` for port 465.

---

## 🎯 Recommended: Use Resend (Easiest)

**Resend** is the easiest and most reliable option:

1. **Sign up**: https://resend.com (free tier available)
2. **Get API Key**
3. **Update Render Environment Variables**:
   ```env
   EMAIL_SERVICE=
   EMAIL_HOST=smtp.resend.com
   EMAIL_PORT=587
   EMAIL_USER=resend
   EMAIL_PASSWORD=re_YOUR_API_KEY
   ```
4. **Redeploy** - emails should work!

---

## 📝 Quick Fix Checklist

- [ ] Check `EMAIL_USER` is set in Render
- [ ] Check `EMAIL_PASSWORD` is set (Gmail App Password, no spaces)
- [ ] Verify Gmail App Password is correct
- [ ] Try alternative email service (Resend/SendGrid)
- [ ] Check Render logs for specific error
- [ ] Test email sending after fixing

---

## 🆘 If Still Not Working

The issue might be that **Render blocks SMTP connections**. In that case:

1. **Use Resend or SendGrid** (they work better with cloud platforms)
2. **Or** disable email notifications temporarily
3. **Or** use a different email service that's not blocked

---

**The code has been updated with better timeout handling. After setting up email credentials in Render, it should work better!**

