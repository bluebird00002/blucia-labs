# 🔧 Fix Render Root Directory Error

## ❌ The Problem

Render is looking for `package.json` in the wrong location:
```
/opt/render/project/src/package.json  ❌ (doesn't exist)
```

But your `package.json` is actually in:
```
/opt/render/project/backend/package.json  ✅ (exists)
```

## ✅ The Solution

You need to set the **Root Directory** to `backend` in Render settings.

---

## 📋 Step-by-Step Fix

### Step 1: Go to Render Dashboard

1. Go to https://dashboard.render.com
2. Click on your **Web Service** (the one that's failing)

### Step 2: Open Settings

1. Click the **"Settings"** tab (at the top)
2. Scroll down to **"Build & Deploy"** section

### Step 3: Set Root Directory

1. Find **"Root Directory"** field
2. **Clear any existing value** (if there is one)
3. Type: `backend`
4. Click **"Save Changes"**

### Step 4: Redeploy

1. Render will automatically start a new deployment
2. Or click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for deployment to complete

---

## ✅ What Should Happen

After setting Root Directory to `backend`, Render will:
- Look for `package.json` in `/opt/render/project/backend/package.json` ✅
- Run `npm install` from the `backend` folder ✅
- Run `npm start` from the `backend` folder ✅

---

## 🎯 Visual Guide

**In Render Dashboard:**

```
Settings Tab
  └── Build & Deploy Section
      └── Root Directory: [backend]  ← Type "backend" here
```

---

## 🔍 Verify It's Fixed

After deployment, check the logs. You should see:

```
==> Running build command 'npm install'...
✓ npm install completed successfully
==> Running start command 'npm start'...
✓ Server started on port 10000
```

Instead of the error you're seeing now.

---

## ⚠️ If Root Directory Field is Missing

If you don't see a "Root Directory" field:

1. Make sure you're in the **Settings** tab (not Environment or Logs)
2. Scroll down to the **"Build & Deploy"** section
3. If still not visible, try:
   - Click **"Edit"** or **"Configure"** button
   - Or recreate the service with Root Directory set during creation

---

## 🆘 Alternative: Recreate Service with Correct Settings

If the above doesn't work, you can recreate the service:

1. **Delete** the current web service (or just create a new one)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. **IMPORTANT**: Set **Root Directory** to `backend` during creation
5. Set other settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
6. Add environment variables
7. Deploy

---

## ✅ Quick Checklist

- [ ] Opened Render dashboard
- [ ] Clicked on your Web Service
- [ ] Went to Settings tab
- [ ] Found "Root Directory" field
- [ ] Set it to: `backend`
- [ ] Saved changes
- [ ] Deployment started automatically
- [ ] Checked logs - no more package.json error

---

**After fixing this, your deployment should succeed!** 🎉

