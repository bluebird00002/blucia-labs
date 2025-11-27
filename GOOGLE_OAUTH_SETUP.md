# Google OAuth Setup Guide

## ✅ Current Status

**Google OAuth is currently disabled** because credentials haven't been configured yet. The website will work perfectly fine with email/password authentication.

The Google sign-in button will **automatically hide** until you configure Google OAuth credentials.

## 🔧 How to Enable Google OAuth (Optional)

If you want to enable Google sign-in, follow these steps:

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure the OAuth consent screen first:
     - Choose "External" (unless you have a Google Workspace)
     - Fill in app name: "BluCia Labs"
     - Add your email as support email
     - Add authorized domains (if deploying)
     - Save and continue through the scopes
   - Application type: **Web application**
   - Name: "BluCia Labs Web Client"
   - Authorized redirect URIs:
     ```
     http://localhost:5000/api/auth/google/callback
     ```
     (For production, also add your production URL)

5. Copy your credentials:
   - **Client ID** (looks like: `123456789-abcdefg.apps.googleusercontent.com`)
   - **Client Secret** (looks like: `GOCSPX-abcdefghijklmnop`)

### Step 2: Update Backend Configuration

1. Open `backend/.env` file
2. Update these lines with your credentials:

```env
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

3. **Important**: Replace the placeholder values with your actual credentials

### Step 3: Restart the Backend Server

After updating the `.env` file:
1. Stop the backend server (Ctrl+C)
2. Restart it: `npm run dev` or `npm run dev:backend`

### Step 4: Verify It Works

1. Refresh your browser
2. Go to the Login or Register page
3. You should now see the "Or continue with Google" section
4. Click the Google button to test

## 🎯 For Production Deployment

When deploying to production:

1. **Update Authorized Redirect URIs** in Google Cloud Console:
   ```
   https://yourdomain.com/api/auth/google/callback
   ```

2. **Update `backend/.env`**:
   ```env
   GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback
   FRONTEND_URL=https://yourdomain.com
   ```

## ❌ Troubleshooting

### "Error 401: invalid_client"
- Make sure you copied the **entire** Client ID and Client Secret
- Check for extra spaces in `.env` file
- Restart the backend server after making changes

### "Redirect URI mismatch"
- Make sure the redirect URI in Google Console **exactly matches** `GOOGLE_CALLBACK_URL` in `.env`
- Include the full URL: `http://localhost:5000/api/auth/google/callback`

### Google button not showing
- Check backend console for: `⚠️ Google OAuth not configured`
- Verify credentials are set in `.env`
- Make sure you restarted the server after updating `.env`

## 📝 Notes

- **Google OAuth is optional** - Email/password authentication works perfectly without it
- The website will automatically detect if Google OAuth is configured
- Users can still register and login with email/password even if Google OAuth is disabled
- You can enable/disable Google OAuth anytime by updating the `.env` file

---

**Need help?** Check the main README.md or verify your `.env` file matches the format in `backend/env.example`

