// Netlify Function: Fetch Pending Form Submissions
// Retrieves all pending form submissions from Netlify Forms API

export const handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Simple password authentication
    const adminPassword = event.headers['x-admin-password']
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    if (!ADMIN_PASSWORD || adminPassword !== ADMIN_PASSWORD) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Unauthorized' })
      }
    }

    // Get Netlify API access token from environment
    const NETLIFY_TOKEN = process.env.NETLIFY_API_TOKEN || context.clientContext?.identity?.token

    if (!NETLIFY_TOKEN) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Netlify API token not configured',
          note: 'Set NETLIFY_API_TOKEN in environment variables'
        })
      }
    }

    const siteId = process.env.SITE_ID || context.env.SITE_ID

    if (!siteId) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Site ID not found',
          note: 'This is automatically provided by Netlify'
        })
      }
    }

    // Fetch submissions from Netlify Forms API
    const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/submissions`, {
      headers: {
        'Authorization': `Bearer ${NETLIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Netlify API error: ${response.statusText}`)
    }

    const submissions = await response.json()

    // Group submissions by form name
    const groupedSubmissions = {
      'memory-wall': [],
      'guestbook': [],
      'media-booking': [],
      'media-submission': [],
      'newsletter': []
    }

    submissions.forEach(submission => {
      const formName = submission.form_name
      if (groupedSubmissions[formName]) {
        groupedSubmissions[formName].push({
          id: submission.id,
          number: submission.number,
          formName: submission.form_name,
          data: submission.data,
          createdAt: submission.created_at,
          email: submission.email
        })
      }
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        submissions: groupedSubmissions,
        total: submissions.length
      })
    }

  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Internal server error',
        details: error.message
      })
    }
  }
}
