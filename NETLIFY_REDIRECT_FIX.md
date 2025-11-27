# 🔧 Fix for 404 Error on API Routes

## 🐛 Problem
Getting `404` errors when calling `/api/auth/register` and other API endpoints from Netlify.

## ✅ Solution

### Issue 1: Redirect Order
Netlify processes redirects **in order**. The SPA redirect (`/*`) was catching API routes before the API proxy could handle them.

**Fixed**: Moved the API redirect **before** the SPA redirect in `netlify.toml`.

### Issue 2: Backend Not Accessible
The backend might not be running or accessible. Test it directly:

1. **Test Backend Health**:
   - Visit: `https://blucia-backend.onrender.com/api/health`
   - Should return: `{"status":"ok","message":"BluCia Labs API is running"}`

2. **Test Backend Register**:
   - Visit: `https://blucia-backend.onrender.com/api/auth/register`
   - Should return an error (method not allowed for GET), but **not** a 404

---

## 🔍 Troubleshooting Steps

### Step 1: Verify Backend is Running
1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click your **Web Service**
3. Check status - should be **"Live"**
4. Check **Logs** tab for any errors

### Step 2: Test Backend Directly
Open these URLs in your browser:

- ✅ `https://blucia-backend.onrender.com/api/health`
  - Should show: `{"status":"ok","message":"BluCia Labs API is running"}`
  
- ✅ `https://blucia-backend.onrender.com/`
  - Should show API information JSON

If these don't work, your backend isn't running correctly.

### Step 3: Check Netlify Redirects
1. Go to **Netlify Dashboard**: https://app.netlify.com
2. Click your site
3. Go to **Site configuration** → **Redirects**
4. Verify the redirects are in this order:
   - `/api/*` → `https://blucia-backend.onrender.com/api/:splat` (force: true)
   - `/*` → `/index.html` (force: false)

### Step 4: Test Through Netlify
After committing the `netlify.toml` changes:

1. **Test Health Endpoint**:
   - Visit: `https://blucialabs.netlify.app/api/health`
   - Should return the same JSON as the backend

2. **Test Registration** (in browser console):
   ```javascript
   fetch('https://blucialabs.netlify.app/api/auth/register', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: 'Test User',
       username: 'testuser',
       email: 'test@example.com',
       password: 'test123'
     })
   })
   .then(r => r.json())
   .then(console.log)
   .catch(console.error)
   ```

---

## 🔧 Common Issues

### Issue: Backend Returns 404
**Cause**: Backend routes not set up correctly
**Fix**: Check `blucia-backend/server.js` - routes should be mounted at `/api/*`

### Issue: CORS Errors
**Cause**: Backend not allowing Netlify origin
**Fix**: Check `FRONTEND_URL` in Render environment variables

### Issue: Backend Not Responding
**Cause**: Backend service stopped or crashed
**Fix**: 
1. Check Render logs
2. Restart the service
3. Check environment variables

### Issue: Redirect Not Working
**Cause**: Netlify hasn't redeployed with new config
**Fix**: 
1. Commit and push `netlify.toml`
2. Wait for Netlify to redeploy (2-3 minutes)
3. Clear browser cache

---

## ✅ What Was Fixed

1. ✅ **Redirect Order**: API redirect now comes before SPA redirect
2. ✅ **Force Flag**: API redirect uses `force = true` to override SPA redirect

---

## 🚀 Next Steps

1. **Commit the fix**:
   ```bash
   git add netlify.toml
   git commit -m "Fix API redirect order in netlify.toml"
   git push
   ```

2. **Wait for Netlify to redeploy** (2-3 minutes)

3. **Test again**:
   - Try registering a new user
   - Check browser console for errors
   - Check Network tab to see if requests are going to Render

---

## 📝 Expected Behavior

After the fix:
- ✅ `/api/health` → Proxies to Render backend
- ✅ `/api/auth/register` → Proxies to Render backend
- ✅ `/api/auth/login` → Proxies to Render backend
- ✅ All other routes → Serve React app

---

## 🆘 Still Not Working?

1. **Check Render Logs**: Look for database connection errors
2. **Check Netlify Logs**: Look for redirect errors
3. **Test Backend Directly**: Make sure backend works independently
4. **Check Browser Console**: Look for CORS or network errors
5. **Verify Environment Variables**: Make sure all are set correctly

---

## 📞 Quick Test Commands

### Test Backend (PowerShell):
```powershell
Invoke-WebRequest -Uri "https://blucia-backend.onrender.com/api/health" -Method GET
```

### Test Backend (Browser):
Just visit: `https://blucia-backend.onrender.com/api/health`

### Test Through Netlify (Browser):
Visit: `https://blucialabs.netlify.app/api/health`

Both should return the same JSON response.

