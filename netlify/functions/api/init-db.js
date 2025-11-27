import { initializeTables } from '../utils/db.js'
import { createResponse, handleCORS } from '../utils/helpers.js'

/**
 * One-time database initialization function
 * Call this once to create all necessary tables
 * DELETE this file after initialization for security
 * 
 * Usage: GET https://your-app.netlify.app/api/init-db
 */
export const handler = async (event) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(event)
  if (corsResponse) return corsResponse

  if (event.httpMethod !== 'GET') {
    return createResponse(405, { message: 'Method not allowed' })
  }

  try {
    await initializeTables()
    
    return createResponse(200, {
      message: 'Database initialized successfully',
      tables: ['users', 'service_requests'],
      note: 'Please delete this function file after initialization for security'
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return createResponse(500, {
      message: 'Database initialization failed',
      error: error.message
    })
  }
}

