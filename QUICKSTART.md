# Quick Start Guide - BluCia Labs Website

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm run install:all
```

### Step 2: Setup Database

1. Make sure MySQL is running on your system
2. Copy `backend/env.example` to `backend/.env`
3. Update database credentials in `backend/.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=blucia_labs
   ```

### Step 3: Start Development Servers

```bash
npm run dev
```

This will start:

- Frontend on http://localhost:3000
- Backend on http://localhost:5000

### Step 4: Access the Website

Open your browser and navigate to: **http://localhost:3000**

## 🎯 First Steps

1. **Explore the Website**: Navigate through Home, About, Services, and Contact pages
2. **Create an Account**: Click "Get Started" or go to `/register`
3. **Submit a Service Request**: Fill out the contact form
4. **View Dashboard**: After logging in, check your dashboard at `/dashboard`
5. **Admin View**: Visit `/admin` and log in with the seeded admin account to explore the staff dashboard

## 🔐 Authentication

### Email/Password Registration

- Go to `/register`
- Fill in name, email, and password
- Click "Create Account"

### Google OAuth (Optional)

To enable Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add credentials to `backend/.env`:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

See `GOOGLE_OAUTH_SETUP.md` for detailed instructions.

### Email Notifications (Recommended)

To enable email notifications for new registrations and service requests:

1. **For Gmail Users:**

   - Enable 2-Step Verification: https://myaccount.google.com/security
   - Generate App Password: https://myaccount.google.com/apppasswords
   - Add to `backend/.env`:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-16-char-app-password
     ADMIN_EMAIL=ellybarikiceo@gmail.com
     ```

2. **What You Get:**
   - Welcome emails sent to new users automatically
   - Admin notifications when clients submit service requests
   - Confirmation emails for service request submissions

📖 See `EMAIL_SETUP.md` and `ADMIN_EMAIL_SETUP.md` for detailed instructions.

## 📝 Default Test Account

You can create a test account with any email/password combination. The system will:

- Hash passwords securely
- Create user records in the database
- Generate JWT tokens for authentication

## 🛠️ Troubleshooting

### Database Connection Issues

- Ensure MySQL is running: `mysql -u root -p`
- Check credentials in `backend/.env`
- The app will auto-create the database on first run

### Port Already in Use

- Change `PORT` in `backend/.env` (backend)
- Change `port` in `frontend/vite.config.js` (frontend)

### CORS Errors

- Ensure `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Check that both servers are running

## 📚 Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Customize colors in `frontend/tailwind.config.js`
- Add your own images and content
- Configure production environment variables

## 🎨 Customization

### Colors

Edit `frontend/tailwind.config.js` to change the color scheme:

```javascript
colors: {
  'blucia-dark': '#3b0064',
  'blucia-medium': '#5a0080',
  'blucia-light': '#7d00a3',
  // ... customize as needed
}
```

### Content

- Update company info in `frontend/src/components/Footer.jsx`
- Modify service descriptions in `frontend/src/pages/Services.jsx`
- Edit mission/vision in `frontend/src/pages/About.jsx`

---

**Happy Coding! 🚀**

For support, check the main README.md or contact the development team.

## 🧑‍💼 Admin Dashboard

- Default credentials (change in `.env`):
  - Username: `ceo`
  - Password: `ceo0001`
- Admin console: `http://localhost:3000/admin`
- Features:
  - Realtime stats and analytics
  - Full request visibility from all clients
  - Status controls (pending → in-progress → completed)
  - **Email clients directly** with branded BluCia Labs emails
  - **Multi-currency support** - see budgets in USD and TZS
  - Email notifications when clients submit new requests

**Note:** Admins process requests, they don't submit them. When a client submits a request, you'll receive an email notification at the configured `ADMIN_EMAIL`.

**New Features:**

- Click the email icon (📧) next to any request to send branded emails to clients
- All budgets automatically convert to USD and TZS for easy comparison
- Clients can submit budgets in 10+ currencies

📖 See `ADMIN_FEATURES.md` for detailed admin feature documentation.
