import { query } from '../../utils/db.js'
import { createResponse, parseBody, handleCORS } from '../../utils/helpers.js'
import { isAdmin } from '../../utils/auth.js'

const handlerImpl = async (event) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(event)
  if (corsResponse) return corsResponse

  if (event.httpMethod !== 'PATCH') {
    return createResponse(405, { message: 'Method not allowed' })
  }

  try {
    const body = parseBody(event)
    const { status, id } = body
    
    // Extract request ID from path or body
    // Path format: /api/admin/requests/:id/status
    // Netlify Functions path will be like: /api/admin/requests-status or /api/admin/requests/123/status
    let requestId = id
    
    if (!requestId) {
      // Try to extract from path - handle both /api/admin/requests/123/status and /api/admin/requests-status?id=123
      const pathParts = event.path.split('/').filter(Boolean)
      
      // Check if path contains requests followed by a number
      const requestsIndex = pathParts.indexOf('requests')
      if (requestsIndex !== -1 && pathParts[requestsIndex + 1] && !isNaN(pathParts[requestsIndex + 1])) {
        requestId = pathParts[requestsIndex + 1]
      }
      
      // Also check query string
      if (!requestId && event.queryStringParameters && event.queryStringParameters.id) {
        requestId = event.queryStringParameters.id
      }
    }
    
    if (!requestId) {
      return createResponse(400, { message: 'Request ID is required. Include it in the request body as "id" or in the query string as "?id=123"' })
    }

    if (!status || !['pending', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return createResponse(400, { message: 'Valid status is required' })
    }

    await query(
      'UPDATE service_requests SET status = $1 WHERE id = $2',
      [status, requestId]
    )

    const result = await query('SELECT * FROM service_requests WHERE id = $1', [requestId])

    if (result.rows.length === 0) {
      return createResponse(404, { message: 'Request not found' })
    }

    return createResponse(200, {
      message: 'Status updated successfully',
      request: result.rows[0]
    })
  } catch (error) {
    console.error('Admin update status error:', error)
    return createResponse(500, { message: 'Failed to update status' })
  }
}

export const handler = isAdmin(handlerImpl)

