import bcrypt from 'bcryptjs'
import { query } from '../../utils/db.js'
import { createResponse, parseBody, handleCORS, validateEmail, validateRequired } from '../../utils/helpers.js'
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
    const { name, username, email, password } = body

    // Validation
    try {
      validateRequired(name, 'Name')
      validateRequired(username, 'Username')
      validateRequired(email, 'Email')
      validateRequired(password, 'Password')
      
      if (!validateEmail(email)) {
        return createResponse(400, { message: 'Valid email is required' })
      }
      
      if (password.length < 6) {
        return createResponse(400, { message: 'Password must be at least 6 characters' })
      }
    } catch (error) {
      return createResponse(400, { message: error.message })
    }

    // Check if user exists
    const emailCheck = await query('SELECT id FROM users WHERE email = $1', [email])
    if (emailCheck.rows.length > 0) {
      return createResponse(400, { message: 'User already exists with this email' })
    }

    const usernameCheck = await query('SELECT id FROM users WHERE username = $1', [username])
    if (usernameCheck.rows.length > 0) {
      return createResponse(400, { message: 'Username already taken' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await query(
      'INSERT INTO users (name, username, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, username, email, phone, google_id, avatar_url, role',
      [name, username, email, hashedPassword, 'client']
    )

    const user = result.rows[0]

    // Generate token
    const token = generateToken(user.id, user.role)

    return createResponse(201, {
      message: 'User created successfully',
      token,
      user
    })
  } catch (error) {
    console.error('Registration error:', error)
    return createResponse(500, { message: 'Registration failed' })
  }
}

