import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'blucia-labs-jwt-secret-change-in-production'

export const authenticateToken = (handler) => {
  return async (event, context) => {
    try {
      const authHeader = event.headers.authorization || event.headers.Authorization
      const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

      if (!token) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: 'Authentication required' })
        }
      }

      const decoded = jwt.verify(token, JWT_SECRET)
      
      // Add user info to event for use in handler
      event.userId = decoded.userId
      event.userRole = decoded.role

      return await handler(event, context)
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return {
          statusCode: 403,
          body: JSON.stringify({ message: 'Invalid or expired token' })
        }
      }
      throw error
    }
  }
}

export const isAdmin = (handler) => {
  return authenticateToken(async (event, context) => {
    if (event.userRole !== 'admin') {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Admin access required' })
      }
    }
    return await handler(event, context)
  })
}

export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

