# Currency & Email Features - Quick Setup Guide

## 🎯 What's New

Your BluCia Labs website now has these powerful features:

### 1. 💰 Multi-Currency Support
- Clients can select from **10+ currencies** when submitting requests
- Admin automatically sees costs in **both USD and TZS**
- Real-time currency conversion

### 2. 📧 Direct Client Email
- Email clients directly from Admin Dashboard
- Professional BluCia Labs branded emails
- One-click email compose with context

### 3. 🏢 Branded Communications
- All emails use BluCia Labs styling
- Optional branded reply-to address
- Professional sender identity

---

## 🚀 Quick Start

### Step 1: Restart Your Servers

The database schema has been updated with new currency fields. Restart your servers:

```bash
# In the project root
npm run dev
```

Or separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 2: Configure Branded Email (Optional)

Add this to your `backend/.env` file:

```env
# Optional: BluCia Labs branded email for replies
BLUCIA_EMAIL=contact@blucialabs.com
```

If not set, replies will go to your `EMAIL_USER` address.

### Step 3: Test the Features

1. **Test Currency Selection:**
   - Go to Contact page
   - Select a currency (e.g., TZS)
   - Enter an amount (e.g., 5000000)
   - Submit request

2. **Test Admin View:**
   - Login as admin (`/admin`)
   - View the request
   - See it displayed in USD and TZS automatically

3. **Test Email Feature:**
   - Click the 📧 icon next to any request
   - Compose a message
   - Send to client

---

## 💱 Supported Currencies

| Currency | Code | Symbol | Example |
|----------|------|--------|---------|
| US Dollar | USD | $ | $10,000 |
| Tanzanian Shilling | TZS | TSh | TSh25,000,000 |
| Euro | EUR | € | €9,200 |
| British Pound | GBP | £ | £7,900 |
| Kenyan Shilling | KES | KSh | KSh1,290,000 |
| South African Rand | ZAR | R | R185,000 |
| Nigerian Naira | NGN | ₦ | ₦15,500,000 |
| Ghanaian Cedi | GHS | ₵ | ₵155,000 |
| Ugandan Shilling | UGX | USh | USh37,500,000 |
| Rwandan Franc | RWF | RF | RF13,000,000 |

---

## 📊 How Currency Conversion Works

### Example 1: Client submits 5,000,000 TZS

**Admin Dashboard Shows:**
```
$2,000.00        ← USD (green highlight)
TSh5,000,000     ← TZS conversion
(TSh5,000,000)   ← Original currency
```

### Example 2: Client submits €5,000

**Admin Dashboard Shows:**
```
$5,434.78        ← USD (green highlight)
TSh13,586,956    ← TZS conversion
(€5,000)         ← Original currency
```

### Example 3: Client submits $10,000

**Admin Dashboard Shows:**
```
$10,000.00       ← USD (green highlight)
TSh25,000,000    ← TZS conversion
```

---

## 📧 Email Features

### Sending Email to Client

1. **Navigate to Admin Dashboard** → Intelligence Queue
2. **Find the request** you want to respond to
3. **Click the email icon (📧)** in the Actions column
4. **Compose your message:**
   - Subject is pre-filled (editable)
   - Write your custom message
   - Client info is shown at the top
5. **Click "Send Email"**

### Email Template Features

All emails automatically include:

✅ **BluCia Labs branding** - Professional purple gradient header
✅ **Client context** - Request ID, service type, status
✅ **Your message** - Custom content you write
✅ **Professional footer** - Copyright and contact info
✅ **Responsive design** - Looks great on all devices

### Example Email Preview

```
┌─────────────────────────────────────┐
│        BluCia Labs                  │ ← Purple gradient header
│  Beyond Limits Ultimate...         │
└─────────────────────────────────────┘

Hello John Doe,

[Your custom message here]

Regarding your request:
Request ID: #123
Service: Software Development
Status: in-progress

Best regards,
The BluCia Labs Team

© 2025 BluCia Labs. All rights reserved.
```

---

## 🛠️ Configuration

### Required in `backend/.env`:

```env
# Email sending (Required)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Admin notifications (Required)
ADMIN_EMAIL=ellybarikiceo@gmail.com

# Branded email (Optional)
BLUCIA_EMAIL=contact@blucialabs.com
```

### What Each Does:

- **EMAIL_USER** - Gmail account used to send emails
- **EMAIL_PASSWORD** - Gmail App Password (not regular password)
- **ADMIN_EMAIL** - Where new request notifications are sent
- **BLUCIA_EMAIL** - Reply-to address for professional branding

---

## 🎨 Admin Dashboard Updates

### Intelligence Queue Table

**New Columns:**

| Column | What You See |
|--------|--------------|
| Client | Name + Email |
| Service | Type + Description |
| **Budget (USD / TZS)** | **Dual currency display** |
| Status | Color-coded badge |
| **Actions** | **📧 Email + Status dropdown** |

### Budget Display Features:

- **Green USD amount** - Primary display
- **TZS conversion** - Below in smaller text
- **Original currency** - If different from USD/TZS
- **Fallback** - Shows old budget range if no amount

### Realtime Signals Panel

Also updated with dual currency display:
- Recent requests
- Budget shown in USD + TZS
- Quick view of all recent activity

---

## 🧪 Testing Checklist

### For Clients (Contact Form):

- [ ] Currency selector appears
- [ ] Can select TZS, USD, EUR, etc.
- [ ] Can enter amount in selected currency
- [ ] Form submits successfully
- [ ] Confirmation email received

### For Admin (Dashboard):

- [ ] Can see dual currency (USD/TZS) in table
- [ ] Email icon appears next to each request
- [ ] Can click email icon and modal opens
- [ ] Can compose and send email successfully
- [ ] Client receives branded email

---

## 🚨 Troubleshooting

### Currency Not Showing?

**Issue:** Old requests may not have currency data

**Solution:** These will show old budget ranges. New requests will have full currency info.

### Email Button Not Working?

1. Check browser console for errors
2. Ensure you're logged in as admin
3. Clear cache and refresh
4. Check backend console

### Currency Values Seem Wrong?

**Note:** Exchange rates are approximate. For production, consider:
- Live exchange rate API integration
- Manual rate updates in `backend/utils/currency.js`

### Email Not Sending?

1. Verify EMAIL_USER and EMAIL_PASSWORD in `.env`
2. Check using Gmail App Password (not regular)
3. Restart backend after .env changes
4. Check backend console for specific errors

---

## 📈 Database Changes

### New Fields in `service_requests` Table:

| Field | Type | Description |
|-------|------|-------------|
| `budget_amount` | DECIMAL(15,2) | Numeric budget value |
| `budget_currency` | VARCHAR(10) | Currency code (USD, TZS, etc.) |
| `budget` | VARCHAR(50) | Legacy budget range |

**Backward Compatible:** Old requests with budget ranges still work!

---

## 🔮 Future Enhancements

Consider these upgrades:

1. **Live Exchange Rates**
   - Integrate API like exchangerate-api.com
   - Real-time conversion

2. **Email Templates**
   - Pre-built response templates
   - Quick replies for common questions

3. **Email History**
   - Track all emails sent
   - View conversation history

4. **More Currencies**
   - Add more regional currencies
   - Custom currency rates

5. **Bulk Actions**
   - Email multiple clients at once
   - Mass status updates

---

## 📚 Related Documentation

- **`ADMIN_FEATURES.md`** - Complete admin dashboard guide
- **`EMAIL_SETUP.md`** - Email configuration details
- **`ADMIN_EMAIL_SETUP.md`** - Admin notification setup
- **`QUICKSTART.md`** - General project setup
- **`README.md`** - Full project documentation

---

## ✅ Summary

### What You Can Do Now:

1. ✅ **Clients submit budgets in their currency**
   - 10+ currencies supported
   - Easy dropdown selection

2. ✅ **Admin sees everything in USD and TZS**
   - Automatic conversion
   - Consistent comparison

3. ✅ **Email clients directly**
   - One-click from dashboard
   - Professional branding

4. ✅ **Track all requests easily**
   - Dual currency display
   - Quick status updates

### Next Steps:

1. Restart your servers to apply database changes
2. Test the currency selector on Contact page
3. Submit a test request with currency
4. View it in Admin Dashboard
5. Try sending an email to the client

**Everything is ready to go! 🚀**

