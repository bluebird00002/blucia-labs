# 📊 How to View Users Table in Render Database

## 🎯 Quick Methods

### Method 1: Using DBeaver (Recommended - Free & Easy)

1. **Download DBeaver**: https://dbeaver.io/download/
2. **Install** DBeaver Community Edition (free)
3. **Open DBeaver**
4. **Create New Connection**:
   - Click the **plug icon** (New Database Connection)
   - Select **PostgreSQL**
   - Click **Next**
5. **Enter Connection Details**:
   - **Host**: Get from Render dashboard → Your Database → **Info** tab
     - Look for "Internal Database URL" or "Host"
     - Example: `dpg-d4kbaiodl3ps73dgt0j0-a.oregon-postgres.render.com`
   - **Port**: `5432` (default PostgreSQL port)
   - **Database**: `blucia_database` (or your database name)
   - **Username**: `blucia_database_user` (or your username)
   - **Password**: Your database password (from Render)
   - **Show all databases**: ✅ Check this
6. **Test Connection** → **Finish**
7. **Browse Tables**:
   - Expand: `Databases` → `blucia_database` → `Schemas` → `public` → `Tables`
   - Right-click `users` → **View Data** → **All Rows**
   - You'll see all registered users!

---

### Method 2: Using pgAdmin (Desktop App)

1. **Download pgAdmin**: https://www.pgadmin.org/download/
2. **Install** pgAdmin 4
3. **Open pgAdmin**
4. **Add Server**:
   - Right-click **Servers** → **Create** → **Server**
   - **General** tab: Name it "BluCia Database"
   - **Connection** tab:
     - **Host**: From Render dashboard (database hostname)
     - **Port**: `5432`
     - **Database**: `blucia_database`
     - **Username**: `blucia_database_user`
     - **Password**: Your database password
     - **Save password**: ✅ Check
   - Click **Save**
5. **View Tables**:
   - Expand: `Servers` → `BluCia Database` → `Databases` → `blucia_database` → `Schemas` → `public` → `Tables`
   - Right-click `users` → **View/Edit Data** → **All Rows**

---

### Method 3: Using VS Code Extension

1. **Install Extension**:
   - Open VS Code
   - Install **"SQLTools"** extension
   - Install **"SQLTools PostgreSQL/Cockroach Driver"** extension
2. **Connect**:
   - Open SQLTools panel
   - Click **Add Connection**
   - Select **PostgreSQL**
   - Enter your Render database credentials
3. **Query**:
   - Right-click connection → **New Query**
   - Run: `SELECT * FROM users;`

---

### Method 4: Using Command Line (psql)

1. **Install PostgreSQL Client** (if not installed):
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql-client`

2. **Connect**:
   ```bash
   psql "postgresql://blucia_database_user:YOUR_PASSWORD@dpg-d4kbaiodl3ps73dgt0j0-a.oregon-postgres.render.com:5432/blucia_database?sslmode=require"
   ```

3. **View Users**:
   ```sql
   -- List all tables
   \dt

   -- View all users
   SELECT * FROM users;

   -- View users with specific fields
   SELECT id, name, username, email, role, created_at FROM users;

   -- Count users
   SELECT COUNT(*) FROM users;

   -- Exit
   \q
   ```

---

## 🔍 Get Your Database Connection Details

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click your PostgreSQL Database** service
3. **Go to "Info" tab**
4. **Copy these details**:
   - **Internal Database URL** (full connection string)
   - Or individual parts:
     - **Host**: e.g., `dpg-d4kbaiodl3ps73dgt0j0-a.oregon-postgres.render.com`
     - **Database**: `blucia_database`
     - **User**: `blucia_database_user`
     - **Password**: (shown in dashboard)

---

## 📋 Quick SQL Queries

Once connected, try these:

```sql
-- View all users (without passwords)
SELECT id, name, username, email, role, created_at FROM users;

-- Count total users
SELECT COUNT(*) as total_users FROM users;

-- Count by role
SELECT role, COUNT(*) as count FROM users GROUP BY role;

-- View recent users
SELECT id, name, username, email, role, created_at 
FROM users 
ORDER BY created_at DESC 
LIMIT 10;

-- Find user by email
SELECT * FROM users WHERE email = 'user@example.com';

-- View service requests
SELECT * FROM service_requests ORDER BY created_at DESC LIMIT 10;
```

---

## 🎯 Recommended: Use DBeaver

**DBeaver is the easiest option** - it's free, works on all platforms, and has a nice visual interface.

1. Download: https://dbeaver.io/download/
2. Install
3. Connect using your Render database credentials
4. Browse tables visually
5. Run queries easily

---

## 🔒 Security Note

- **Never share your database credentials**
- **Only connect from trusted networks**
- **Use strong passwords**
- **Don't commit credentials to Git**

---

## ✅ After Viewing Users

You should see:
- All registered users
- Their emails, usernames, roles
- Creation dates
- This confirms users are being created successfully!

---

**Need help connecting?** Share which method you're trying and I can help troubleshoot!

