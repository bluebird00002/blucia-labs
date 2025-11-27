# Netlify Functions for BluCia Labs

This directory contains all Netlify serverless functions that connect to your Neon PostgreSQL database.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables in Netlify Dashboard:**
   - `DATABASE_URL` - Your Neon PostgreSQL connection string (required)
   - `JWT_SECRET` - Secret for JWT token signing (required)
   - `GOOGLE_CLIENT_ID` - For Google OAuth (optional)
   - `GOOGLE_CLIENT_SECRET` - For Google OAuth (optional)
   - `FRONTEND_URL` - Your Netlify app URL (optional)

3. **Initialize database (one-time):**
   - Visit: `https://your-app.netlify.app/api/init-db`
   - Delete `api/init-db.js` after initialization

## API Endpoints

All endpoints are automatically available at `/api/*` based on file structure.

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/me` - Get current user (auth required)
- `GET /api/auth/google-enabled` - Check Google OAuth status

### Service Requests
- `GET /api/requests` - Get user's requests (auth required)
- `POST /api/requests/create` - Create new request (auth required)

### User Profile
- `GET /api/users/profile` - Get profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)

### Admin
- `GET /api/admin/stats` - Dashboard stats (admin required)
- `GET /api/admin/requests` - All requests (admin required)
- `PATCH /api/admin/requests-status` - Update request status (admin required)

## File Structure

```
netlify/functions/
├── api/
│   ├── auth/
│   │   ├── register.js
│   │   ├── login.js
│   │   ├── me.js
│   │   └── google-enabled.js
│   ├── requests/
│   │   ├── index.js
│   │   └── create.js
│   ├── users/
│   │   └── profile.js
│   ├── admin/
│   │   ├── stats.js
│   │   ├── requests.js
│   │   └── requests-status.js
│   └── init-db.js (delete after use)
├── utils/
│   ├── db.js (PostgreSQL connection)
│   ├── auth.js (JWT helpers)
│   └── helpers.js (Utilities)
└── package.json
```

## Testing Locally

Use Netlify CLI to test functions locally:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Start local dev server
netlify dev
```

Create a `.env` file in the project root with your environment variables for local testing.

## Notes

- Functions use ES modules (`import/export`)
- All functions include CORS headers automatically
- Database connection uses connection pooling for efficiency
- JWT tokens expire after 7 days

