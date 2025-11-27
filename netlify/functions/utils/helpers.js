// Helper function to parse request body
export const parseBody = (event) => {
  try {
    if (!event.body) return {}
    return typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  } catch (error) {
    console.error('Error parsing body:', error)
    return {}
  }
}

// Helper function to create response
export const createResponse = (statusCode, data, headers = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      ...headers
    },
    body: JSON.stringify(data)
  }
}

// Helper function to handle CORS preflight
export const handleCORS = (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {})
  }
  return null
}

// Validation helper
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    throw new Error(`${fieldName} is required`)
  }
}

