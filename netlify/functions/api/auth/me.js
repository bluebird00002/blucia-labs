import { query } from '../../utils/db.js'
import { createResponse, handleCORS } from '../../utils/helpers.js'
import { authenticateToken } from '../../utils/auth.js'

const handlerImpl = async (event) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(event)
  if (corsResponse) return corsResponse

  if (event.httpMethod !== 'GET') {
    return createResponse(405, { message: 'Method not allowed' })
  }

  try {
    const result = await query(
      'SELECT id, name, username, email, phone, google_id, avatar_url, role FROM users WHERE id = $1',
      [event.userId]
    )

    if (result.rows.length === 0) {
      return createResponse(404, { message: 'User not found' })
    }

    return createResponse(200, { user: result.rows[0] })
  } catch (error) {
    console.error('Get user error:', error)
    return createResponse(500, { message: 'Failed to get user' })
  }
}

export const handler = authenticateToken(handlerImpl)

