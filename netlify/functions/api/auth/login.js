import bcrypt from 'bcryptjs'
import { query } from '../../utils/db.js'
import { createResponse, parseBody, handleCORS, validateRequired } from '../../utils/helpers.js'
import { generateToken } from '../../utils/auth.js'

export const handler = async (event) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(event)
  if (corsResponse) return corsResponse

  if (event.httpMethod !== 'POST') {
    return createResponse(405, { message: 'Method not allowed' })
  }

  try {
    const body = parseBody(event)
    const { identifier, password } = body

    // Validation
    try {
      validateRequired(identifier, 'Email or username')
      validateRequired(password, 'Password')
    } catch (error) {
      return createResponse(400, { message: error.message })
    }

    const field = identifier.includes('@') ? 'email' : 'username'

    // Find user
    const result = await query(`SELECT * FROM users WHERE ${field} = $1`, [identifier])
    
    if (result.rows.length === 0) {
      return createResponse(401, { message: 'Invalid credentials' })
    }

    const user = result.rows[0]

    // Check password
    if (!user.password) {
      return createResponse(401, { message: 'Please sign in with Google' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return createResponse(401, { message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user.id, user.role)

    return createResponse(200, {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        google_id: user.google_id,
        avatar_url: user.avatar_url,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return createResponse(500, { message: 'Login failed' })
  }
}

