import { query } from '../../utils/db.js'
import { createResponse, handleCORS } from '../../utils/helpers.js'
import { isAdmin } from '../../utils/auth.js'

const handlerImpl = async (event) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(event)
  if (corsResponse) return corsResponse

  if (event.httpMethod !== 'GET') {
    return createResponse(405, { message: 'Method not allowed' })
  }

  try {
    const result = await query(`
      SELECT 
        sr.*,
        u.name as user_name,
        u.email as user_email
      FROM service_requests sr
      JOIN users u ON sr.user_id = u.id
      ORDER BY sr.created_at DESC
    `)

    return createResponse(200, { requests: result.rows })
  } catch (error) {
    console.error('Admin get requests error:', error)
    return createResponse(500, { message: 'Failed to fetch requests' })
  }
}

export const handler = isAdmin(handlerImpl)

