import { query } from '../../utils/db.js'
import { createResponse, parseBody, handleCORS, validateEmail, validateRequired } from '../../utils/helpers.js'
import { authenticateToken } from '../../utils/auth.js'

const handlerImpl = async (event) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(event)
  if (corsResponse) return corsResponse

  // GET - Fetch all requests for user
  if (event.httpMethod === 'GET') {
    try {
      const result = await query(
        `SELECT * FROM service_requests 
         WHERE user_id = $1 
         ORDER BY created_at DESC`,
        [event.userId]
      )

      return createResponse(200, { requests: result.rows })
    } catch (error) {
      console.error('Get requests error:', error)
      return createResponse(500, { message: 'Failed to fetch requests' })
    }
  }

  // POST - Create new service request
  if (event.httpMethod === 'POST') {
    try {
      const body = parseBody(event)
      const {
        name,
        email,
        phone,
        clientType,
        companyName,
        companyLocation,
        industry,
        projectReason,
        serviceType,
        projectDescription,
        budget,
        budgetAmount,
        budgetCurrency,
        timeline,
        hearAboutUs
      } = body

      // Validation
      try {
        validateRequired(name, 'Name')
        validateRequired(email, 'Email')
        validateRequired(phone, 'Phone')
        validateRequired(serviceType, 'Service type')
        validateRequired(projectDescription, 'Project description')
        
        if (!validateEmail(email)) {
          return createResponse(400, { message: 'Valid email is required' })
        }
      } catch (error) {
        return createResponse(400, { message: error.message })
      }

      // Insert service request
      const result = await query(
        `INSERT INTO service_requests 
         (user_id, name, email, phone, client_type, company_name, company_location, industry, project_reason, 
          service_type, project_description, budget, budget_amount, budget_currency, timeline, hear_about_us) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
         RETURNING *`,
        [
          event.userId,
          name,
          email,
          phone,
          clientType || 'individual',
          companyName || null,
          companyLocation || null,
          industry || null,
          projectReason || null,
          serviceType,
          projectDescription,
          budget || null,
          budgetAmount || null,
          budgetCurrency || 'USD',
          timeline || null,
          hearAboutUs || null
        ]
      )

      const request = result.rows[0]

      return createResponse(201, {
        message: 'Service request created successfully',
        request
      })
    } catch (error) {
      console.error('Create request error:', error)
      return createResponse(500, { message: 'Failed to create service request' })
    }
  }

  return createResponse(405, { message: 'Method not allowed' })
}

export const handler = authenticateToken(handlerImpl)

