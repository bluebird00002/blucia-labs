# 📊 How to View Database Tables on Render

Your PostgreSQL database is hosted on Render. Here are several ways to view your database tables:

---

## 🎯 Method 1: Render Dashboard (Easiest)

### Step 1: Access Your Database
1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click on your **PostgreSQL Database** service (named something like `blucia-database`)
3. You'll see connection details and information

### Step 2: View Tables (Limited)
- Render's dashboard shows basic database info but **doesn't have a built-in table viewer**
- You'll need to use one of the methods below to actually see the data

---

## 🎯 Method 2: Using pgAdmin (Desktop App - Recommended)

### Step 1: Download pgAdmin
1. Download **pgAdmin 4**: https://www.pgadmin.org/download/
2. Install it on your computer

### Step 2: Connect to Render Database
1. Open **pgAdmin**
2. Right-click **Servers** → **Create** → **Server**
3. In the **General** tab:
   - **Name**: `BluCia Labs Database` (or any name)
4. In the **Connection** tab:
   - **Host**: Get from Render dashboard (e.g., `dpg-d4kbaiodl3ps73dgt0j0-a`)
   - **Port**: `5432` (default PostgreSQL port)
   - **Database**: `blucia_database` (or your database name)
   - **Username**: `blucia_database_user` (or your username)
   - **Password**: Your database password (from Render)
   - **Save password**: ✅ Check this
5. Click **Save**

### Step 3: View Tables
1. Expand your server → **Databases** → `blucia_database` → **Schemas** → **public** → **Tables**
2. You'll see:
   - `users` - User accounts
   - `service_requests` - Service requests
3. Right-click a table → **View/Edit Data** → **All Rows**

---

## 🎯 Method 3: Using DBeaver (Free, Cross-Platform)

### Step 1: Download DBeaver
1. Download **DBeaver Community**: https://dbeaver.io/download/
2. Install it

### Step 2: Connect to Render Database
1. Open **DBeaver**
2. Click **New Database Connection** (plug icon)
3. Select **PostgreSQL**
4. Enter connection details:
   - **Host**: From Render dashboard
   - **Port**: `5432`
   - **Database**: `blucia_database`
   - **Username**: `blucia_database_user`
   - **Password**: Your database password
5. Click **Test Connection** → **Finish**

### Step 3: View Tables
1. Expand your connection → **Databases** → `blucia_database` → **Schemas** → **public** → **Tables**
2. Double-click any table to view data

---

## 🎯 Method 4: Using VS Code Extension

### Step 1: Install Extension
1. Open VS Code
2. Install **PostgreSQL** extension by Chris Kolkman
3. Or install **SQLTools** with **SQLTools PostgreSQL/Cockroach Driver**

### Step 2: Connect
1. Open the extension
2. Click **Add Connection**
3. Enter your Render database credentials
4. Connect and browse tables

---

## 🎯 Method 5: Using Command Line (psql)

### Step 1: Install PostgreSQL Client
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql-client`

### Step 2: Connect
```bash
psql "postgresql://blucia_database_user:YOUR_PASSWORD@dpg-d4kbaiodl3ps73dgt0j0-a:5432/blucia_database?sslmode=require"
```

Replace:
- `YOUR_PASSWORD` with your actual password
- `dpg-d4kbaiodl3ps73dgt0j0-a` with your actual host

### Step 3: View Tables
```sql
-- List all tables
\dt

-- View users table
SELECT * FROM users;

-- View service_requests table
SELECT * FROM service_requests;

-- Exit
\q
```

---

## 🎯 Method 6: Using Online Tools (Quick Check)

### Option A: Adminer (Web-based)
1. Go to https://www.adminer.org/
2. Download the single PHP file
3. Upload to a web server or use Docker:
   ```bash
   docker run -p 8080:8080 adminer
   ```
4. Access at `http://localhost:8080`
5. Select **PostgreSQL** and enter your Render credentials

### Option B: TablePlus (Mac/Windows - Paid but has free trial)
1. Download: https://tableplus.com/
2. Create new PostgreSQL connection
3. Enter Render database credentials
4. Browse tables visually

---

## 📋 Your Database Tables

Based on your schema, you should have:

### 1. `users` Table
- `id` - Primary key
- `name` - User's full name
- `username` - Unique username
- `email` - Unique email
- `password` - Hashed password
- `phone` - Phone number
- `google_id` - Google OAuth ID (if used)
- `avatar_url` - Profile picture URL
- `role` - 'client' or 'admin'
- `created_at` - Timestamp
- `updated_at` - Timestamp

### 2. `service_requests` Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `name` - Client name
- `email` - Client email
- `phone` - Client phone
- `service_type` - Type of service
- `project_description` - Description
- `budget` - Budget range
- `status` - 'pending', 'in-progress', 'completed', 'cancelled'
- `created_at` - Timestamp
- `updated_at` - Timestamp

---

## 🔍 Quick SQL Queries

Once connected, try these:

```sql
-- Count all users
SELECT COUNT(*) FROM users;

-- View all users (without passwords)
SELECT id, name, username, email, role, created_at FROM users;

-- Count service requests
SELECT COUNT(*) FROM service_requests;

-- View recent service requests
SELECT * FROM service_requests ORDER BY created_at DESC LIMIT 10;

-- View requests by status
SELECT status, COUNT(*) FROM service_requests GROUP BY status;
```

---

## 🔒 Security Note

- **Never share your database credentials publicly**
- **Use environment variables** for all database connections
- **Only connect from trusted networks** if possible
- **Change default passwords** regularly

---

## ✅ Recommended Method

For beginners: **Use DBeaver** (Method 3) - it's free, easy to use, and works on all platforms.

For quick checks: **Use pgAdmin** (Method 2) or **VS Code extension** (Method 4).

For advanced users: **Use psql** (Method 5) for command-line access.

---

## 🆘 Troubleshooting

### Can't connect?
- ✅ Check your **DATABASE_URL** in Render environment variables
- ✅ Verify the **host, port, database name, username, password**
- ✅ Make sure **SSL is enabled** (`sslmode=require`)
- ✅ Check Render logs for connection errors

### Tables not showing?
- ✅ Make sure database initialization ran successfully
- ✅ Check Render backend logs for table creation messages
- ✅ Try running the initialization manually

### Connection timeout?
- ✅ Render free tier databases **spin down after 90 days of inactivity**
- ✅ Make a request to your backend to wake it up
- ✅ Or upgrade to a paid plan for always-on databases

---

## 📝 Next Steps

1. **Connect using one of the methods above**
2. **Verify your tables exist** (`users` and `service_requests`)
3. **Check if data is being saved** when you register/login
4. **Monitor your database** for any issues

Happy database exploring! 🚀

