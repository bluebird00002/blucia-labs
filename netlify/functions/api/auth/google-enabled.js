import { createResponse, handleCORS } from '../../utils/helpers.js'

export const handler = async (event) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(event)
  if (corsResponse) return corsResponse

  if (event.httpMethod !== 'GET') {
    return createResponse(405, { message: 'Method not allowed' })
  }

  const googleClientID = process.env.GOOGLE_CLIENT_ID
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
  const isEnabled = !!(googleClientID && googleClientSecret && googleClientID !== 'your-google-client-id')

  return createResponse(200, { enabled: isEnabled })
}

