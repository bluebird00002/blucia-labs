# Netlify Functions + Neon PostgreSQL Setup Guide

This guide explains how to set up and configure Netlify serverless functions with Neon PostgreSQL for your BluCia Labs project.

## 📁 Project Structure

```
netlify/
└── functions/
    ├── api/
    │   ├── auth/
    │   │   ├── register.js
    │   │   ├── login.js
    │   │   ├── me.js
    │   │   └── google-enabled.js
    │   ├── requests/
    │   │   ├── index.js (GET all requests)
    │   │   └── create.js (POST new request)
    │   ├── users/
    │   │   └── profile.js (GET/PUT user profile)
    │   └── admin/
    │       ├── stats.js
    │       ├── requests.js
    │       └── requests-status.js
    ├── utils/
    │   ├── db.js (PostgreSQL connection)
    │   ├── auth.js (JWT authentication)
    │   └── helpers.js (Utility functions)
    ├── package.json
    └── env.example
```

## 🔧 Setup Steps

### 1. Install Dependencies

The Netlify Functions dependencies are managed separately. Install them:

```bash
cd netlify/functions
npm install
```

### 2. Configure Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

#### Required Variables:

- **`DATABASE_URL`**: Your Neon PostgreSQL connection string
  - Format: `postgresql://user:password@host/database?sslmode=require`
  - Get this from your Neon dashboard: https://console.neon.tech
  - Go to your project → Connection Details → Copy the connection string

- **`JWT_SECRET`**: A strong random string for JWT token signing
  - Generate one: `openssl rand -base64 32`
  - Or use an online generator

#### Optional Variables:

- **`GOOGLE_CLIENT_ID`**: For Google OAuth (if using)
- **`GOOGLE_CLIENT_SECRET`**: For Google OAuth (if using)
- **`FRONTEND_URL`**: Your Netlify app URL (e.g., `https://your-app.netlify.app`)
- **`ADMIN_EMAIL`**: Admin email for notifications

### 3. Initialize Database Tables

The database tables will be created automatically on first connection, but you can also initialize them manually by creating a one-time function or running a migration script.

To manually initialize, you can use the `initializeTables` function from `netlify/functions/utils/db.js`:

```javascript
import { initializeTables } from './utils/db.js'

// Run this once to create tables
await initializeTables()
```

Or create a temporary function:

```javascript
// netlify/functions/api/init-db.js
import { initializeTables } from '../utils/db.js'

export const handler = async () => {
  try {
    await initializeTables()
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Database initialized successfully' })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
```

Then call it once: `https://your-app.netlify.app/api/init-db` (and delete it after).

### 4. API Endpoints

All functions are automatically available at `/api/*` based on their file structure:

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/auth/google-enabled` - Check if Google OAuth is enabled

#### Service Requests
- `GET /api/requests` - Get all requests for current user (requires auth)
- `POST /api/requests/create` - Create a new service request (requires auth)

#### User Profile
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)

#### Admin (requires admin role)
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/requests` - Get all service requests
- `PATCH /api/admin/requests/:id/status` - Update request status

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens are obtained from:
- `/api/auth/register` - Returns token on successful registration
- `/api/auth/login` - Returns token on successful login

## 📝 Database Schema

The functions expect the following PostgreSQL tables:

### `users` table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255))
- `username` (VARCHAR(100) UNIQUE)
- `email` (VARCHAR(255) UNIQUE)
- `password` (VARCHAR(255))
- `phone` (VARCHAR(50))
- `google_id` (VARCHAR(255) UNIQUE)
- `avatar_url` (VARCHAR(500))
- `role` (VARCHAR(20) - 'client' or 'admin')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `service_requests` table
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER, FOREIGN KEY to users.id)
- `name` (VARCHAR(255))
- `email` (VARCHAR(255))
- `phone` (VARCHAR(50))
- `client_type` (VARCHAR(20) - 'individual' or 'company')
- `company_name` (VARCHAR(255))
- `company_location` (VARCHAR(255))
- `industry` (VARCHAR(100))
- `project_reason` (VARCHAR(100))
- `service_type` (VARCHAR(100))
- `project_description` (TEXT)
- `budget` (VARCHAR(50))
- `budget_amount` (DECIMAL(15, 2))
- `budget_currency` (VARCHAR(10))
- `timeline` (VARCHAR(50))
- `hear_about_us` (VARCHAR(100))
- `status` (VARCHAR(20) - 'pending', 'in-progress', 'completed', 'cancelled')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🚀 Deployment

1. **Push to Git**: Netlify will automatically detect changes
2. **Build**: Netlify will build your frontend and deploy functions
3. **Environment Variables**: Make sure all required env vars are set in Netlify dashboard

## 🧪 Testing Locally

To test functions locally, use Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local dev server
netlify dev
```

This will:
- Serve your frontend
- Run functions locally
- Use environment variables from `.env` file (create one in project root)

## 🔍 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly in Netlify
- Check that your Neon database is accessible (not paused)
- Ensure SSL mode is enabled in connection string

### Function Errors
- Check Netlify function logs in dashboard
- Verify all environment variables are set
- Ensure `package.json` in `netlify/functions` has all dependencies

### CORS Issues
- Functions include CORS headers automatically
- If issues persist, check `Access-Control-Allow-Origin` in response headers

## 📚 Additional Resources

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Neon PostgreSQL Docs](https://neon.tech/docs)
- [PostgreSQL Node.js Driver](https://node-postgres.com/)

