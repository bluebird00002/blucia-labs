# Admin Dashboard Features Guide

## 🎯 Overview

The Admin Dashboard now includes powerful features for managing client service requests, including:

- **Email clients directly** from the dashboard
- **Multi-currency support** with automatic conversion to USD and TZS
- **Dual currency display** showing costs in both USD and TZS
- **BluCia Labs branded emails** for professional communication

---

## 📧 Email Clients Directly

### How to Send Emails to Clients

1. **Go to Admin Dashboard** (`/admin`)
2. **Find the request** in the Intelligence Queue table
3. **Click the email icon (✉)** next to the request
4. **Compose your message:**
   - Subject is pre-filled but editable
   - Write your message in the text area
   - The email will be branded with BluCia Labs styling
5. **Click "Send Email"**

### Email Features

- **Branded Templates:** All emails use BluCia Labs professional styling
- **Auto Context:** Emails include request ID and service type
- **Professional Sender:** Emails are sent from BluCia Labs (not personal email)
- **Reply-to Address:** Can be configured to use a branded email address

### Email Template Includes:

- BluCia Labs header with gradient
- Client name greeting
- Your custom message
- Request details (ID, service type, status)
- Professional footer with copyright
- Responsive design

---

## 💰 Multi-Currency Support

### For Clients (Contact Form)

Clients can now select their preferred currency and enter budget amounts:

**Supported Currencies:**

- **USD** - US Dollar ($)
- **TZS** - Tanzanian Shilling (TSh)
- **EUR** - Euro (€)
- **GBP** - British Pound (£)
- **KES** - Kenyan Shilling (KSh)
- **ZAR** - South African Rand (R)
- **NGN** - Nigerian Naira (₦)
- **GHS** - Ghanaian Cedi (₵)
- **UGX** - Ugandan Shilling (USh)
- **RWF** - Rwandan Franc (RF)

### How Clients Enter Budget:

1. **Select Currency** from dropdown (e.g., TZS, USD, EUR)
2. **Enter Amount** in their chosen currency
3. **Submit** - System automatically stores currency and converts for admin view

---

## 💵 Admin Dashboard Currency Display

### Dual Currency View

All budgets in the Admin Dashboard are displayed in **both USD and TZS** by default:

```
Budget Column:
  $5,000         ← Primary display (USD)
  TSh12,500,000  ← Converted to TZS
  (€4,600)       ← Original if different
```

### Features:

- **Primary Display:** Green highlighted USD amount
- **Secondary Display:** Converted TZS amount below
- **Original Currency:** Shown if different from USD/TZS
- **Real-time Conversion:** Automatic conversion using exchange rates
- **Fallback Display:** Shows old budget range if amount not specified

### Exchange Rates Used:

| Currency | Rate to USD |
| -------- | ----------- |
| USD      | 1           |
| TZS      | 2500        |
| EUR      | 0.92        |
| GBP      | 0.79        |
| KES      | 129         |
| ZAR      | 18.5        |
| NGN      | 1550        |
| GHS      | 15.5        |
| UGX      | 3750        |
| RWF      | 1300        |

> **Note:** These are approximate rates. For production, consider integrating a live exchange rate API.

---

## 🏢 BluCia Labs Branded Email

### Configuration

To use a custom BluCia Labs email address (e.g., `contact@blucialabs.com`) as the reply-to address:

1. **Open** `backend/.env`
2. **Add:**
   ```env
   BLUCIA_EMAIL=contact@blucialabs.com
   ```
3. **Restart** the backend server

### Email Behavior:

- **From:** "BluCia Labs" <your-gmail@gmail.com>
- **Reply-To:** contact@blucialabs.com (if configured)
- **If not configured:** Reply-to uses your EMAIL_USER

### Why This Matters:

- Clients see "BluCia Labs" as sender
- Replies go to your branded email address
- Professional appearance
- No personal email exposed

---

## 🔍 Using the Admin Dashboard

### Intelligence Queue Table

The main table shows all client requests with these columns:

1. **Client**

   - Name
   - Email address

2. **Service**

   - Service type
   - Brief description

3. **Budget (USD / TZS)**

   - Amount in USD (green)
   - Converted to TZS
   - Original currency if applicable

4. **Status**

   - Color-coded badge
   - Yellow: Pending
   - Blue: In-progress
   - Green: Completed
   - Red: Cancelled

5. **Actions**
   - 📧 Email icon: Send email to client
   - Dropdown: Change request status

### Realtime Signals Panel

Shows recent requests with:

- Client name and date
- Status badge
- Project description
- Service type
- Budget in both USD and TZS

---

## 🎨 Admin Workflow

### Typical Admin Process:

1. **Receive Email Notification**

   - Client submits request
   - You get email at ADMIN_EMAIL

2. **View in Dashboard**

   - See request details
   - Review budget (in USD/TZS)
   - Check service type

3. **Update Status**

   - Change from "pending" to "in-progress"
   - Select from dropdown

4. **Communicate with Client**

   - Click email icon
   - Send updates, questions, or quotes
   - Professional BluCia Labs branding

5. **Complete Project**
   - Change status to "completed"
   - Send final email to client

---

## 🛠️ Configuration Summary

### Required Environment Variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Admin Notifications
ADMIN_EMAIL=ellybarikiceo@gmail.com

# Optional: Branded Reply-To
BLUCIA_EMAIL=contact@blucialabs.com
```

### Setup Checklist:

- ✅ Gmail App Password configured
- ✅ Admin email set (ellybarikiceo@gmail.com)
- ✅ Backend server running
- ✅ Database updated with currency fields
- ✅ (Optional) BluCia Labs branded email configured

---

## 📊 Currency Conversion Examples

### Client enters 5,000,000 TZS:

**Admin sees:**

- **USD:** $2,000
- **TZS:** TSh5,000,000
- Original: (TSh5,000,000)

### Client enters $10,000 USD:

**Admin sees:**

- **USD:** $10,000
- **TZS:** TSh25,000,000

### Client enters €5,000 EUR:

**Admin sees:**

- **USD:** $5,435
- **TZS:** TSh13,586,957
- Original: (€5,000)

---

## 🚨 Troubleshooting

### Email Not Sending?

1. Check EMAIL_USER and EMAIL_PASSWORD in `.env`
2. Ensure using Gmail App Password (not regular password)
3. Restart backend server after .env changes
4. Check backend console for error messages

### Currency Not Converting?

1. Ensure client entered both currency and amount
2. Check backend console for errors
3. Old requests may only have budget range (not amount)
4. Database should have `budget_amount` and `budget_currency` columns

### Email Modal Not Appearing?

1. Clear browser cache
2. Check browser console for JavaScript errors
3. Ensure you're logged in as admin
4. Refresh the page

---

## 📈 Future Enhancements

Consider these upgrades:

- **Live Exchange Rates:** Integrate API for real-time rates
- **Email Templates:** Pre-built templates for common responses
- **Bulk Actions:** Email multiple clients at once
- **Email History:** Track all emails sent to clients
- **Custom Currency Rates:** Allow admin to set custom rates
- **More Currencies:** Add additional regional currencies

---

## 📚 Related Documentation

- `EMAIL_SETUP.md` - How to configure email sending
- `ADMIN_EMAIL_SETUP.md` - Admin notification setup
- `QUICKSTART.md` - Project setup guide
- `README.md` - Complete project documentation

---

## ✅ Summary

✨ **Admin Dashboard Now Offers:**

1. 📧 **Direct email communication** with branded BluCia Labs styling
2. 💰 **Multi-currency support** with 10+ currencies
3. 💵 **Dual display** showing budgets in USD and TZS
4. 🏢 **Professional branding** with custom reply-to addresses
5. 🎯 **Streamlined workflow** for processing client requests

**Everything you need to manage client requests professionally and efficiently!**
