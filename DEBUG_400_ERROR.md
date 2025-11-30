# 🔍 Debugging 400 Bad Request Error

## ✅ Good News!
The redirect is **working**! The error changed from **404** to **400**, which means:
- ✅ Request is reaching the backend
- ✅ Netlify proxy is working
- ❌ But there's a validation or data issue

## 🔍 Common Causes of 400 Error

### 1. Validation Errors
The backend validates:
- `name` - must not be empty
- `username` - must not be empty  
- `email` - must be valid email format
- `password` - must be at least 6 characters

### 2. Database Query Issues
The database adapter might have issues with PostgreSQL queries.

### 3. Request Body Not Parsed
Netlify redirects might not preserve request body correctly.

---

## 🔧 How to Debug

### Step 1: Check Browser Console
1. Open **DevTools** → **Console** tab
2. Look for the error message
3. The error should show: `error.response?.data?.message`

### Step 2: Check Network Tab
1. Open **DevTools** → **Network** tab
2. Find the `/api/auth/register` request
3. Click on it
4. Check:
   - **Request Payload**: Should show the form data
   - **Response**: Should show the error message from backend

### Step 3: Check Render Logs
1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click your **Web Service**
3. Click **"Logs"** tab
4. Look for:
   - `Registration request body:` - Shows what data was received
   - `Validation errors:` - Shows validation failures
   - `Missing required fields:` - Shows if fields are missing
   - Any database errors

---

## 🐛 Common Issues & Fixes

### Issue 1: "Name is required" or "Username is required"
**Cause**: Fields are empty or whitespace only
**Fix**: Make sure form fields are filled out

### Issue 2: "Valid email is required"
**Cause**: Email format is invalid
**Fix**: Check email format (must have @ and domain)

### Issue 3: "Password must be at least 6 characters"
**Cause**: Password is too short
**Fix**: Use password with 6+ characters

### Issue 4: "User already exists with this email"
**Cause**: Email is already registered
**Fix**: Use a different email or login instead

### Issue 5: "Username already taken"
**Cause**: Username is already in use
**Fix**: Choose a different username

### Issue 6: Database Query Error
**Cause**: Database adapter issue or tables not created
**Fix**: 
1. Check Render logs for database errors
2. Verify database tables exist
3. Check `DATABASE_URL` environment variable

---

## 🔍 Quick Test

Try registering with this test data:
- **Name**: Test User
- **Username**: testuser123
- **Email**: test123@example.com
- **Password**: test123456

If this works, the issue is with your specific data (maybe email/username already exists).

---

## 📝 Next Steps

1. **Check Render Logs** - This will show the exact error
2. **Check Browser Network Tab** - See the request/response
3. **Try different data** - Test with a new email/username
4. **Check Database** - Verify tables exist and are accessible

---

## 🆘 If Still Not Working

Share the error message from:
1. Browser console (the exact message)
2. Render logs (any error messages)
3. Network tab (response body)

This will help identify the exact issue!

