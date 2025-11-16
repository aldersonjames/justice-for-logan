// Netlify Function: Approve Media Submissions
// Simple admin interface for approving user-submitted articles

import fetch from 'node-fetch'

export const handler = async (event, context) => {
  // Basic authentication check
  const authToken = event.headers['authorization']
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'change-this-password'
  
  if (authToken !== `Bearer ${ADMIN_TOKEN}`) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    }
  }

  const { action, submissionId } = JSON.parse(event.body || '{}')

  if (action === 'approve') {
    // In production, this would:
    // 1. Update the submission in database to approved: true
    // 2. Add to mediaArticles.json via GitHub API
    // 3. Trigger a site rebuild
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: `Submission ${submissionId} approved`
      })
    }
  }

  if (action === 'reject') {
    // Delete or mark as rejected
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: `Submission ${submissionId} rejected`
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Invalid action' })
  }
}


