// Netlify Function: Approve and Publish Submissions
// Allows admin to approve submissions and automatically update JSON files via GitHub API

import fetch from 'node-fetch'

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
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

    const { type, data, action } = JSON.parse(event.body)

    if (action !== 'approve') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid action' })
      }
    }

    // GitHub configuration
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const GITHUB_OWNER = process.env.GITHUB_OWNER || 'yourusername'
    const GITHUB_REPO = process.env.GITHUB_REPO || 'justice-for-logan'

    if (!GITHUB_TOKEN) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'GitHub token not configured' })
      }
    }

    // Determine which file to update
    let filePath
    switch(type) {
      case 'memory':
        filePath = 'src/data/memories.json'
        break
      case 'guestbook':
        filePath = 'src/data/guestbook.json'
        break
      default:
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Invalid submission type' })
        }
    }

    // Get current file from GitHub
    const getFileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`
    const getResponse = await fetch(getFileUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json'
      }
    })

    if (!getResponse.ok) {
      throw new Error(`GitHub API error: ${getResponse.statusText}`)
    }

    const fileData = await getResponse.json()
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
    const currentData = JSON.parse(currentContent)

    // Add new approved entry
    const newEntry = {
      ...data,
      approved: true,
      id: currentData.length + 1,
      date: new Date().toISOString().split('T')[0],
      featured: false
    }

    currentData.push(newEntry)

    // Update file on GitHub
    const updateResponse = await fetch(getFileUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add approved ${type}: ${data.name}`,
        content: Buffer.from(JSON.stringify(currentData, null, 2)).toString('base64'),
        sha: fileData.sha,
        branch: 'main'
      })
    })

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      throw new Error(`Failed to update file: ${errorData.message}`)
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: `${type} approved and published. Site will redeploy automatically.`
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


