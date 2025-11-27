# Email Configuration Guide

## ✅ Email Features Enabled

Your website now automatically sends:
- **Welcome emails** when users register (email/password or Google)
- **Confirmation emails** when service requests are submitted
- **Professional HTML email templates** with your branding

## 🔧 Setting Up Email (Required)

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Step Verification**:
   - Go to your Google Account: https://myaccount.google.com/
   - Security → 2-Step Verification → Enable it

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "BluCia Labs" as the name
   - Click "Generate"
   - **Copy the 16-character password** (no spaces)

3. **Update `backend/.env`**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-character-app-password
   ```

### Option 2: Other Email Services

#### Outlook/Hotmail
```env
EMAIL_SERVICE=hotmail
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

#### Yahoo
```env
EMAIL_SERVICE=yahoo
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
```

#### Custom SMTP Server
```env
EMAIL_SERVICE=
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your-password
```

### Option 3: Email Service Providers (Production)

For production, consider using:
- **SendGrid** (Free tier: 100 emails/day)
- **Mailgun** (Free tier: 5,000 emails/month)
- **Amazon SES** (Very affordable)
- **Resend** (Modern, developer-friendly)

#### Using SendGrid Example:
```env
EMAIL_SERVICE=
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

## 🧪 Testing Email Configuration

1. **Restart your backend server** after updating `.env`

2. **Register a new account** on your website

3. **Check your email** - you should receive a welcome email

4. **Submit a service request** - you should receive a confirmation email

## ⚠️ Troubleshooting

### "Email not configured" Warning
- Make sure `EMAIL_USER` and `EMAIL_PASSWORD` are set in `.env`
- Restart the backend server after updating `.env`

### Gmail: "Less secure app access"
- Gmail no longer supports "less secure apps"
- **You MUST use App Passwords** (see Option 1 above)
- Regular Gmail password won't work

### "Authentication failed" Error
- Double-check your email and password
- For Gmail: Make sure you're using an **App Password**, not your regular password
- Verify 2-Step Verification is enabled

### Emails Going to Spam
- This is normal for development emails
- For production, set up SPF, DKIM, and DMARC records
- Use a professional email service (SendGrid, Mailgun, etc.)

### Emails Not Sending
- Check backend console for error messages
- Verify firewall isn't blocking port 587
- Test with a different email service
- Check spam/junk folder

## 📧 Email Templates

The system includes three email templates:

1. **Welcome Email** - Sent when users register
2. **Service Request Confirmation** - Sent when requests are submitted
3. **Account Confirmation** - (Available for future use)

All emails include:
- Professional HTML design
- Your brand colors (purple theme)
- Responsive layout
- Plain text fallback

## 🔒 Security Notes

- **Never commit `.env` file** to version control
- Use **App Passwords** for Gmail (not regular passwords)
- For production, use a dedicated email service
- Rotate passwords regularly

## 📝 Quick Setup Checklist

- [ ] Enable 2-Step Verification (Gmail)
- [ ] Generate App Password
- [ ] Update `backend/.env` with email credentials
- [ ] Restart backend server
- [ ] Test by registering a new account
- [ ] Check email inbox (and spam folder)

---

**Need help?** Check the error messages in your backend console for specific issues.

