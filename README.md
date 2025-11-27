# BluCia Labs - Software Development Company Website

A modern, dark-themed full-stack React website for BluCia Labs (Beyond Limits Ultimate Creativity and Intelligence Advancement).

## 🚀 Features

- **Modern Dark Theme**: Elegant dark purple color scheme (#3b0064, #5a0080, #7d00a3)
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Scroll animations using React Intersection Observer and Framer Motion
- **Authentication**: Email/password and Google OAuth authentication
- **User Dashboard**: Track service requests and manage profile
- **Admin Dashboard**: Global analytics, request management, and status orchestration
- **Enhanced Service Request System**: Comprehensive form with client type, company info, project reason, and more
- **Multi-Currency Support**: 10+ currencies with automatic conversion to USD and TZS
- **Email Clients Feature**: Admins can email clients directly from the dashboard
- **Email Notifications**: Automatic welcome emails and admin notifications for new requests
- **Dual Currency Display**: Admin sees budgets in both USD and TZS automatically
- **SEO-Friendly**: Optimized meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend

- React 18 with functional components
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- React Intersection Observer for scroll effects
- Axios for API calls

### Backend

- Node.js with Express
- MySQL database
- JWT authentication
- Passport.js for Google OAuth
- Express Validator for form validation

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**

   ```bash
   cd "D:\The Company"
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

3. **Configure Backend**

   - Copy `backend/.env.example` to `backend/.env`
   - Update database credentials in `backend/.env`
    - Configure Google OAuth credentials (optional but recommended)
    - (Optional) Update the seeded admin credentials (`ADMIN_USERNAME`, `ADMIN_PASSWORD`)

4. **Configure Frontend**

   - The frontend is already configured to proxy API requests to `http://localhost:5000`

5. **Start Development Servers**

   ```bash
   npm run dev
   ```

   This will start both frontend (port 3000) and backend (port 5000) servers.

   Or start them separately:

   ```bash
   # Frontend only
   npm run dev:frontend

   # Backend only
   npm run dev:backend
   ```

## 🔧 Configuration

### Database Setup

The application will automatically create the database and tables on first run. Make sure MySQL is running and credentials in `.env` are correct.

### Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Client Secret to `backend/.env`

See `GOOGLE_OAUTH_SETUP.md` for detailed instructions.

### Email Configuration (Required for Notifications)

1. **For Gmail Users** (Recommended):
   - Enable 2-Step Verification in your Google Account
   - Generate an App Password at https://myaccount.google.com/apppasswords
   - Add credentials to `backend/.env`:
     ```env
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-app-password
     ```

2. **Set Admin Email** for request notifications:
   ```env
   ADMIN_EMAIL=ellybarikiceo@gmail.com
   ```

When clients submit service requests, you'll automatically receive email notifications with their details.

📖 See `EMAIL_SETUP.md` and `ADMIN_EMAIL_SETUP.md` for detailed setup instructions.

## 📁 Project Structure

```
The Company/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/             # Database and passport config
│   ├── middleware/         # Express middleware
│   ├── routes/             # API routes
│   ├── server.js           # Express server
│   └── package.json
└── README.md
```

## 🎨 Color Scheme

- **Dark Purple**: `#3b0064` (blucia-dark)
- **Medium Purple**: `#5a0080` (blucia-medium)
- **Light Purple**: `#7d00a3` (blucia-light)
- **Accent Purple**: `#a855f7` (blucia-accent)

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Service Requests

- `GET /api/requests` - Get user's requests (protected)
- `POST /api/requests` - Create new request (protected)
- `GET /api/requests/:id` - Get single request (protected)

### User Profile

- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Admin

- `GET /api/admin/stats` - Dashboard metrics (admin only)
- `GET /api/admin/requests` - List all service requests (admin only)
- `PATCH /api/admin/requests/:id/status` - Update request status (admin only)
- `POST /api/admin/requests/:id/email` - Send email to client (admin only)

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- SQL injection prevention with parameterized queries

## 🚀 Deployment

### Frontend

Build the frontend:

```bash
cd frontend
npm run build
```

Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Backend

1. Set `NODE_ENV=production` in `.env`
2. Update `FRONTEND_URL` to your production frontend URL
3. Use a process manager like PM2:
   ```bash
   pm2 start backend/server.js --name blucia-backend
   ```

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 🤝 Contributing

This is a private project for BluCia Labs. For questions or support, contact the development team.

## 🔑 Admin Access

- Default credentials (change them in `backend/.env`):
  - **Username:** `ceo`
  - **Password:** `ceo0001`
- Admin dashboard lives at `http://localhost:3000/admin`
- Admins can:
  - View global stats and recent activity
  - Manage every service request
  - Update statuses in real time
  - **Email clients directly** from the dashboard with branded emails
  - **View budgets in multiple currencies** (USD and TZS by default)
  - Keep track of all BluCia Labs engagements
  - Receive email notifications when clients submit new requests

**Note:** Admins do NOT submit service requests - they only process requests submitted by clients. When a client submits a request through the Contact page, the admin receives an email notification at the configured `ADMIN_EMAIL` address.

**Multi-Currency:** Clients can submit requests in 10+ currencies (USD, TZS, EUR, GBP, KES, ZAR, NGN, GHS, UGX, RWF), and admins automatically see costs converted to both USD and TZS.

📖 See `ADMIN_FEATURES.md` for complete admin dashboard feature documentation.

---

Built with ❤️ by BluCia Labs - Beyond Limits Ultimate Creativity and Intelligence Advancement
