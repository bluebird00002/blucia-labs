import { query } from '../../utils/db.js'
import { createResponse, parseBody, handleCORS, validateEmail, validateRequired } from '../../utils/helpers.js'
import { authenticateToken } from '../../utils/auth.js'

const handlerImpl = async (event) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(event)
  if (corsResponse) return corsResponse

  if (event.httpMethod === 'GET') {
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
      console.error('Get profile error:', error)
      return createResponse(500, { message: 'Failed to fetch profile' })
    }
  }

  if (event.httpMethod === 'PUT') {
    try {
      const body = parseBody(event)
      const { name, username, email, phone } = body

      const updates = {}
      const values = []
      let paramIndex = 1

      if (name !== undefined) {
        if (!name || name.trim() === '') {
          return createResponse(400, { message: 'Name cannot be empty' })
        }
        updates.name = name
        values.push(name)
        paramIndex++
      }

      if (username !== undefined) {
        if (!username || username.trim() === '') {
          return createResponse(400, { message: 'Username cannot be empty' })
        }
        // Check if username is already taken
        const usernameCheck = await query(
          'SELECT id FROM users WHERE username = $1 AND id != $2',
          [username, event.userId]
        )
        if (usernameCheck.rows.length > 0) {
          return createResponse(400, { message: 'Username already in use' })
        }
        updates.username = username
        values.push(username)
        paramIndex++
      }

      if (email !== undefined) {
        if (!validateEmail(email)) {
          return createResponse(400, { message: 'Valid email is required' })
        }
        // Check if email is already taken
        const emailCheck = await query(
          'SELECT id FROM users WHERE email = $1 AND id != $2',
          [email, event.userId]
        )
        if (emailCheck.rows.length > 0) {
          return createResponse(400, { message: 'Email already in use' })
        }
        updates.email = email
        values.push(email)
        paramIndex++
      }

      if (phone !== undefined) {
        updates.phone = phone
        values.push(phone)
        paramIndex++
      }

      if (Object.keys(updates).length === 0) {
        return createResponse(400, { message: 'No fields to update' })
      }

      // Build dynamic UPDATE query
      const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ')
      values.push(event.userId)

      await query(
        `UPDATE users SET ${setClause} WHERE id = $${values.length}`,
        values
      )

      // Get updated user
      const result = await query(
        'SELECT id, name, username, email, phone, google_id, avatar_url, role FROM users WHERE id = $1',
        [event.userId]
      )

      return createResponse(200, {
        message: 'Profile updated successfully',
        user: result.rows[0]
      })
    } catch (error) {
      console.error('Update profile error:', error)
      return createResponse(500, { message: 'Failed to update profile' })
    }
  }

  return createResponse(405, { message: 'Method not allowed' })
}

export const handler = authenticateToken(handlerImpl)

