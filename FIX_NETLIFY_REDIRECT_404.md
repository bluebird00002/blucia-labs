# 🔧 Fix: Netlify Redirect Not Working (404 on API Routes)

## 🐛 Problem
- `/api/health` returns HTML (React app) instead of JSON
- `/api/auth/register` returns 404
- Redirect to Render backend is not working

## ✅ Solution

The redirect configuration is correct, but Netlify might need to be redeployed or there's a caching issue.

### Step 1: Verify Redirect Configuration

Your `netlify.toml` should have the API redirect **BEFORE** the SPA redirect:

```toml
# API redirect (MUST be first)
[[redirects]]
  from = "/api/*"
  to = "https://blucia-backend.onrender.com/api/:splat"
  status = 200
  force = true

# SPA redirect (must be after API redirect)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
```

### Step 2: Commit and Force Redeploy

1. **Commit the changes**:
   ```bash
   git add netlify.toml
   git commit -m "Fix Netlify API redirect configuration"
   git push
   ```

2. **Force Redeploy in Netlify**:
   - Go to Netlify Dashboard: https://app.netlify.com
   - Click your site
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**
   - Wait for deployment to complete (2-3 minutes)

### Step 3: Clear Browser Cache

1. **Hard refresh**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Or clear cache**: `Ctrl + Shift + Delete` → Clear cached images and files

### Step 4: Test Again

1. **Test health endpoint**:
   - Visit: `https://blucialabs.netlify.app/api/health`
   - Should return: `{"status":"ok","message":"BluCia Labs API is running"}`
   - **NOT** HTML!

2. **Test registration**:
   - Try registering a new user
   - Should work without 404 errors

---

## 🔍 Alternative: Use Netlify Edge Functions

If redirects still don't work, we can use Netlify Edge Functions as a proxy. But try the steps above first!

---

## 🆘 If Still Not Working

### Check Netlify Redirects in Dashboard

1. Go to Netlify Dashboard → Your Site
2. **Site configuration** → **Redirects**
3. Verify the redirects are in this **exact order**:
   - `/api/*` → `https://blucia-backend.onrender.com/api/:splat` (Status: 200, Force: true)
   - `/*` → `/index.html` (Status: 200, Force: false)

### Check Netlify Build Logs

1. Go to Netlify Dashboard → Your Site → **Deploys**
2. Click the latest deploy
3. Check **Build log** for any errors
4. Check **Deploy log** for redirect processing

### Test Backend Directly

Make sure your backend is accessible:
- Visit: `https://blucia-backend.onrender.com/api/health`
- Should return JSON, not 404

### Check Browser Network Tab

1. Open DevTools → **Network** tab
2. Try registering a user
3. Look at the request to `/api/auth/register`
4. Check:
   - **Request URL**: Should be `https://blucialabs.netlify.app/api/auth/register`
   - **Response**: Should be JSON from backend, not HTML
   - **Status**: Should be 200 or 400/500 (not 404)

---

## 📝 Expected Behavior After Fix

✅ `/api/health` → Returns JSON from Render backend
✅ `/api/auth/register` → Proxies POST request to Render backend
✅ `/api/auth/login` → Proxies POST request to Render backend
✅ All other routes → Serve React app

---

## 🎯 Quick Checklist

- [ ] Committed `netlify.toml` changes
- [ ] Pushed to Git
- [ ] Triggered "Clear cache and deploy" in Netlify
- [ ] Waited for deployment to complete
- [ ] Cleared browser cache
- [ ] Tested `/api/health` - returns JSON (not HTML)
- [ ] Tested registration - works without 404

---

**The key is to force a fresh deploy with cache cleared!** This ensures Netlify processes the redirects correctly.

