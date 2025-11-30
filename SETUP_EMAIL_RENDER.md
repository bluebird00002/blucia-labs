# 📧 Setup Email in Render - Step by Step

## 🐛 Current Issue
Email connection timeout - SMTP server not reachable from Render.

---

## ✅ Solution: Use Resend (Recommended)

**Resend** works best with cloud platforms like Render and has a free tier.

### Step 1: Sign Up for Resend

1. Go to: https://resend.com
2. Click **"Get Started"** (free)
3. Sign up with your email
4. Verify your email

### Step 2: Get API Key

1. After logging in, go to **"API Keys"** in the sidebar
2. Click **"Create API Key"**
3. Name it: `BluCia Labs Production`
4. **Copy the API key** (starts with `re_`)

### Step 3: Add to Render Environment Variables

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click your **Web Service**
3. Go to **"Environment"** tab
4. **Add or update these variables**:

```env
EMAIL_SERVICE=
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USER=resend
EMAIL_PASSWORD=re_YOUR_API_KEY_HERE
```

**Replace `re_YOUR_API_KEY_HERE` with your actual Resend API key!**

5. Click **"Save Changes"**
6. Render will automatically redeploy

---

## ✅ Alternative: Fix Gmail Setup

If you want to use Gmail instead:

### Step 1: Generate Gmail App Password

1. **Enable 2-Step Verification**:
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name: "BluCia Labs"
   - Click "Generate"
   - **Copy the 16-character password** (remove spaces!)

### Step 2: Add to Render

1. Render Dashboard → Your Web Service → Environment
2. **Add/Update**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   ```
   (Remove spaces from app password)

3. **Save** and wait for redeploy

**Note**: Gmail might still timeout from Render. If it does, use Resend instead.

---

## 🧪 Test Email After Setup

1. **Wait for Render to redeploy** (1-2 minutes)
2. **Register a new user** on your site
3. **Check Render logs** for:
   - `✅ SMTP server connection verified`
   - `✅ Email sent: ...`
4. **Check the user's email inbox** for welcome email

---

## 🔍 Verify Environment Variables

In Render Dashboard → Your Web Service → Environment, make sure you have:

**For Resend:**
```env
EMAIL_SERVICE=
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USER=resend
EMAIL_PASSWORD=re_xxxxxxxxxxxxx
```

**For Gmail:**
```env
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

---

## 🆘 If Still Not Working

### Check Render Logs

1. Render Dashboard → Your Web Service → **Logs**
2. Look for:
   - `⚠️ Email not configured` → Environment variables missing
   - `Connection timeout` → SMTP blocked or wrong host
   - `Authentication failed` → Wrong password

### Try Different Email Service

If Gmail doesn't work, try:
- **Resend** (recommended) - https://resend.com
- **SendGrid** - https://sendgrid.com (free: 100/day)
- **Mailgun** - https://mailgun.com (free: 5,000/month)

---

## 📝 Quick Checklist

- [ ] Signed up for Resend (or have Gmail App Password)
- [ ] Got API key / App Password
- [ ] Added email env vars to Render
- [ ] Saved changes in Render
- [ ] Waited for redeploy
- [ ] Tested registration
- [ ] Checked logs for email success
- [ ] Checked inbox for welcome email

---

## 🎯 Recommended: Resend

**Why Resend?**
- ✅ Works reliably with Render
- ✅ Free tier available
- ✅ Easy setup
- ✅ Modern API
- ✅ Good documentation

**Setup takes 5 minutes!**

1. Sign up: https://resend.com
2. Get API key
3. Add to Render environment variables
4. Done! ✅

---

**After setting up email credentials in Render, emails should work!** 🎉

