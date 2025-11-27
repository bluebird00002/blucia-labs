# 🔗 Connect Netlify Frontend to Render Backend

Your backend is live! Now let's connect your Netlify frontend to it.

---

## ✅ Step 1: Get Your Render Backend URL

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click on your **Web Service**
3. You'll see your service URL at the top, like:
   ```
   https://blucia-backend.onrender.com
   ```
4. **Copy this URL** - you'll need it!

---

## ✅ Step 2: Update netlify.toml

1. Open `netlify.toml` in your project
2. Find this line:
   ```toml
   to = "https://your-backend.onrender.com/api/:splat"
   ```
3. Replace `your-backend.onrender.com` with your **actual Render URL**
4. **Remove** the `/api` part from the Render URL (Netlify adds it automatically)

**Example:**
If your Render URL is: `https://blucia-backend.onrender.com`

Then the line should be:
```toml
to = "https://blucia-backend.onrender.com/api/:splat"
```

---

## ✅ Step 3: Commit and Push

1. Save `netlify.toml`
2. Commit the changes:
   ```bash
   git add netlify.toml
   git commit -m "Connect Netlify to Render backend"
   git push
   ```
3. Netlify will **automatically redeploy** with the new configuration

---

## ✅ Step 4: Test the Connection

1. Wait for Netlify to finish deploying (2-3 minutes)
2. Visit your Netlify site: `https://blucialabs.netlify.app`
3. Try these:
   - **Health check**: Visit `https://blucialabs.netlify.app/api/health`
     - Should return: `{"status":"ok","message":"BluCia Labs API is running"}`
   - **Test registration**: Try registering a new user
   - **Test login**: Try logging in

---

## 🔍 Troubleshooting

### API calls not working?

1. **Check Render URL** in `netlify.toml` is correct
2. **Check Render service** is running (should show "Live" in dashboard)
3. **Check browser console** for CORS errors
4. **Check Render logs** for any errors

### CORS errors?

Your backend should already allow Netlify URLs. If you see CORS errors:
1. Check `FRONTEND_URL` in Render environment variables
2. Make sure it's set to: `https://blucialabs.netlify.app` (no trailing slash)

### 404 errors?

1. Make sure Render URL in `netlify.toml` doesn't include `/api`
2. The format should be: `https://your-backend.onrender.com/api/:splat`

---

## ✅ Final Checklist

- [ ] Got Render backend URL
- [ ] Updated `netlify.toml` with correct Render URL
- [ ] Committed and pushed changes
- [ ] Netlify redeployed
- [ ] Tested `/api/health` endpoint
- [ ] Tested user registration
- [ ] Tested user login

---

## 🎉 You're Done!

Your full-stack app is now live:
- ✅ **Frontend**: Netlify (https://blucialabs.netlify.app)
- ✅ **Backend**: Render (https://your-backend.onrender.com)
- ✅ **Database**: Render PostgreSQL

Everything should be connected and working! 🚀

