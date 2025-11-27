# ✅ Corrected Environment Variables for Render

## ⚠️ Issues Found & Fixed

### 1. DATABASE_URL Format
Your DATABASE_URL might need the port number. Render internal database URLs should include the port.

### 2. JWT_SECRET & SESSION_SECRET
**CRITICAL**: You're using placeholder values! These MUST be changed to secure random strings.

### 3. FRONTEND_URL
Remove the trailing slash - it's not needed.

---

## ✅ Corrected Environment Variables

Copy and paste these into Render (with your actual secrets):

```env
NODE_ENV=production

PORT=10000

DATABASE_URL=postgresql://blucia_database_user:tWKQPtp0imLCab9BbgfAh6GyHdaSHk63@dpg-d4kbaiodl3ps73dgt0j0-a.oregon-postgres.render.com:5432/blucia_database?sslmode=require

JWT_SECRET=CHANGE_THIS_TO_SECURE_STRING_SEE_BELOW

SESSION_SECRET=CHANGE_THIS_TO_SECURE_STRING_SEE_BELOW

FRONTEND_URL=https://blucialabs.netlify.app
```

---

## 🔐 Generate Secure Secrets

You MUST replace `JWT_SECRET` and `SESSION_SECRET` with actual secure random strings.

### Option 1: Using OpenSSL (Recommended)
Run these commands in your terminal:

```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate SESSION_SECRET (different one!)
openssl rand -base64 32
```

### Option 2: Online Generator
1. Go to https://randomkeygen.com
2. Use "CodeIgniter Encryption Keys" section
3. Copy two different keys (one for JWT_SECRET, one for SESSION_SECRET)

### Option 3: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Run twice to get two different values.

---

## 📝 Final Environment Variables (Copy This)

After generating your secrets, use this format:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://blucia_database_user:tWKQPtp0imLCab9BbgfAh6GyHdaSHk63@dpg-d4kbaiodl3ps73dgt0j0-a.oregon-postgres.render.com:5432/blucia_database?sslmode=require
JWT_SECRET=YOUR_GENERATED_SECRET_HERE_32_CHARS_OR_MORE
SESSION_SECRET=YOUR_DIFFERENT_GENERATED_SECRET_HERE_32_CHARS_OR_MORE
FRONTEND_URL=https://blucialabs.netlify.app
```

**Important Notes:**
- Replace `YOUR_GENERATED_SECRET_HERE...` with actual generated values
- Use DIFFERENT values for JWT_SECRET and SESSION_SECRET
- The DATABASE_URL might need the full hostname - check Render dashboard for the exact format
- Remove trailing slash from FRONTEND_URL

---

## 🔍 How to Check Your DATABASE_URL

1. Go to Render dashboard
2. Click your PostgreSQL database service
3. Go to "Info" tab
4. Look for "Internal Database URL" or "Connection String"
5. Copy the exact format shown there

The format should be:
```
postgresql://user:password@host:port/database?sslmode=require
```

If Render shows a different format, use that exact format.

---

## ✅ Quick Checklist

- [ ] Generated secure JWT_SECRET (32+ characters)
- [ ] Generated secure SESSION_SECRET (different from JWT_SECRET)
- [ ] Verified DATABASE_URL format from Render dashboard
- [ ] Removed trailing slash from FRONTEND_URL
- [ ] All variables pasted into Render Environment tab
- [ ] Saved changes in Render

---

## 🚨 Security Warning

**NEVER** use placeholder values like "generate-secure-string" in production!
- Your app will be vulnerable to attacks
- User sessions can be hijacked
- Tokens can be forged

Always use cryptographically secure random strings!

