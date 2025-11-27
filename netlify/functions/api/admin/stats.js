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
    // Get request statistics
    const statsResult = await query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as "inProgress",
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
      FROM service_requests
    `)

    // Get user statistics
    const userStatsResult = await query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN role = 'client' THEN 1 ELSE 0 END) as clients,
        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admins
      FROM users
    `)

    // Get recent requests
    const recentRequestsResult = await query(`
      SELECT 
        sr.*,
        u.name as user_name,
        u.email as user_email
      FROM service_requests sr
      JOIN users u ON sr.user_id = u.id
      ORDER BY sr.created_at DESC
      LIMIT 5
    `)

    return createResponse(200, {
      stats: {
        requests: statsResult.rows[0],
        clients: userStatsResult.rows[0].clients,
        admins: userStatsResult.rows[0].admins
      },
      recentRequests: recentRequestsResult.rows
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return createResponse(500, { message: 'Failed to fetch statistics' })
  }
}

export const handler = isAdmin(handlerImpl)

