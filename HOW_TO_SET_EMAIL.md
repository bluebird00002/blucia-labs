# How to Set Email Password and User Email

## 📍 Location

Edit the file: **`backend/.env`**

## 🔧 Step-by-Step Instructions

### Step 1: Open the .env File

Navigate to: `D:\The Company\backend\.env`

You can open it with:
- Notepad
- VS Code
- Any text editor

### Step 2: Find the Email Section

Look for these lines in the file:

```env
# Email Configuration (Required for email notifications)
# For Gmail: Use App Password (not regular password)
# Go to: Google Account > Security > 2-Step Verification > App Passwords
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Admin Notifications
# Email address to receive notifications about new client service requests
ADMIN_EMAIL=ellybarikiceo@gmail.com
```

### Step 3: Update the Values

Replace the placeholder values:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=your-actual-app-password
ADMIN_EMAIL=ellybarikiceo@gmail.com
```

**Example:**
```env
EMAIL_USER=john.doe@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=ellybarikiceo@gmail.com
```

> **Note:** The `ADMIN_EMAIL` is where notifications about new client requests will be sent.

## 🔑 For Gmail Users (Most Common)

### Important: You MUST use an App Password, NOT your regular password!

1. **Enable 2-Step Verification**:
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification" → Enable it

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "BluCia Labs" as the name
   - Click "Generate"
   - **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)

3. **Paste in .env file**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   ```
   (Remove spaces from the app password)

## 📝 Complete Example

Here's what your email section should look like:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=mycompany@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop

# Admin Notifications
ADMIN_EMAIL=ellybarikiceo@gmail.com
```

## ⚠️ Important Notes

1. **No quotes needed** - Just the value directly
2. **No spaces** around the `=` sign
3. **For Gmail**: Use App Password, NOT your regular password
4. **Save the file** after editing
5. **Restart backend server** after making changes

## 🧪 Testing

After setting up:

1. Save the `.env` file
2. Restart your backend server (stop with Ctrl+C, then run `npm run dev`)
3. Register a new account on your website
4. Check your email inbox (and spam folder)

## 🔍 Quick Check

To verify your settings are correct, look for these in your `.env` file:

- ✅ `EMAIL_USER=` has your actual email
- ✅ `EMAIL_PASSWORD=` has your app password (16 characters for Gmail)
- ✅ No quotes around the values
- ✅ No extra spaces

## ❓ Still Having Issues?

- Check `EMAIL_SETUP.md` for detailed instructions
- Make sure 2-Step Verification is enabled (for Gmail)
- Verify you're using an App Password, not regular password
- Check backend console for error messages

---

**File Location:** `D:\The Company\backend\.env`

