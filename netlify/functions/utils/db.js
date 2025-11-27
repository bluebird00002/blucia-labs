import pg from 'pg'
const { Pool } = pg

// Create a connection pool for Neon PostgreSQL
let pool = null

const getPool = () => {
  if (!pool) {
    // Neon provides a connection string in the format:
    // postgresql://user:password@host/database?sslmode=require
    const connectionString = process.env.DATABASE_URL
    
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false // Required for Neon
      },
      max: 10, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })
  }
  return pool
}

// Query helper function
export const query = async (text, params) => {
  const pool = getPool()
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Executed query', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Database query error', { text, error: error.message })
    throw error
  }
}

// Get a client from the pool (for transactions)
export const getClient = async () => {
  const pool = getPool()
  return await pool.connect()
}

// Initialize database tables (run once)
export const initializeTables = async () => {
  try {
    // Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(100) UNIQUE,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        phone VARCHAR(50),
        google_id VARCHAR(255) UNIQUE,
        avatar_url VARCHAR(500),
        role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('client', 'admin')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create indexes
    await query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `)
    await query(`
      CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id)
    `)
    await query(`
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)
    `)

    // Service requests table
    await query(`
      CREATE TABLE IF NOT EXISTS service_requests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        client_type VARCHAR(20) DEFAULT 'individual' CHECK (client_type IN ('individual', 'company')),
        company_name VARCHAR(255),
        company_location VARCHAR(255),
        industry VARCHAR(100),
        project_reason VARCHAR(100),
        service_type VARCHAR(100) NOT NULL,
        project_description TEXT NOT NULL,
        budget VARCHAR(50),
        budget_amount DECIMAL(15, 2),
        budget_currency VARCHAR(10) DEFAULT 'USD',
        timeline VARCHAR(50),
        hear_about_us VARCHAR(100),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'cancelled')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create indexes for service_requests
    await query(`
      CREATE INDEX IF NOT EXISTS idx_service_requests_user_id ON service_requests(user_id)
    `)
    await query(`
      CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status)
    `)

    // Create updated_at trigger function
    await query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `)

    // Create triggers for updated_at
    await query(`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `)

    await query(`
      DROP TRIGGER IF EXISTS update_service_requests_updated_at ON service_requests;
      CREATE TRIGGER update_service_requests_updated_at
      BEFORE UPDATE ON service_requests
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `)

    console.log('✅ Database tables initialized successfully')
  } catch (error) {
    console.error('Database initialization error:', error)
    throw error
  }
}

export default { query, getClient, getPool, initializeTables }

