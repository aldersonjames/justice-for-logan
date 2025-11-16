import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Submission Card Component with Approve/Deny buttons
const SubmissionCard = ({ submission, type, onApprove, onDeny }) => {
  const [isApproving, setIsApproving] = useState(false)

  const handleApprove = async () => {
    setIsApproving(true)

    const data = {
      name: submission.data.name,
      relationship: submission.data.relationship,
      message: submission.data.message
    }

    // Add memory-specific type field
    if (type === 'memory') {
      data.type = submission.data.type || 'message'
    }

    await onApprove(type, data)
    setIsApproving(false)
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{submission.data.name}</h3>
          <p className="text-sm text-gray-600">{submission.data.relationship}</p>
          {type === 'memory' && submission.data.type && (
            <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
              {submission.data.type}
            </span>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Submitted: {new Date(submission.createdAt).toLocaleDateString()} at {new Date(submission.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-1">Message:</p>
        <p className="text-gray-700 leading-relaxed italic border-l-4 border-gray-200 pl-4 py-2">
          "{submission.data.message}"
        </p>
      </div>

      {submission.data.email && (
        <p className="text-xs text-gray-500 mb-4">
          Email: {submission.data.email}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          disabled={isApproving}
          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isApproving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Approving...
            </>
          ) : (
            <>
              ✓ Approve & Publish
            </>
          )}
        </button>
        <button
          onClick={onDeny}
          disabled={isApproving}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          ✕ Deny
        </button>
      </div>
    </div>
  )
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pendingSubmissions, setPendingSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Check if already authenticated (using session storage)
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadPendingSubmissions()
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple password check - in production, this should be more secure
    // The password is checked server-side when approving submissions
    // This is just a front-end gate
    if (password) {
      sessionStorage.setItem('admin_auth', 'true')
      sessionStorage.setItem('admin_password', password)
      setIsAuthenticated(true)
      setError('')
      loadPendingSubmissions()
    } else {
      setError('Please enter password')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    sessionStorage.removeItem('admin_password')
    setIsAuthenticated(false)
    setPassword('')
  }

  const loadPendingSubmissions = async () => {
    setLoading(true)
    try {
      const adminPassword = sessionStorage.getItem('admin_password')

      const response = await fetch('/.netlify/functions/get-submissions', {
        headers: {
          'X-Admin-Password': adminPassword
        }
      })

      if (response.ok) {
        const data = await response.json()
        setPendingSubmissions(data.submissions || {})
      } else {
        console.error('Failed to fetch submissions')
        setPendingSubmissions({})
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
      setPendingSubmissions({})
    } finally {
      setLoading(false)
    }
  }

  const approveSubmission = async (type, data) => {
    setLoading(true)
    try {
      const adminPassword = sessionStorage.getItem('admin_password')

      const response = await fetch('/.netlify/functions/approve-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': adminPassword
        },
        body: JSON.stringify({
          type,
          data,
          action: 'approve'
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert('Submission approved! It will be live after the next deployment (automatic within 1 minute).')
        loadPendingSubmissions()
      } else {
        alert('Error: ' + (result.error || 'Failed to approve submission'))
      }
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Admin Access
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
            >
              Login
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="mt-4 w-full text-gray-600 hover:text-gray-900 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading submissions...</p>
            </div>
          )}

          {!loading && (
            <>
              {/* Memory Wall Submissions */}
              {pendingSubmissions['memory-wall']?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Memory Wall Submissions ({pendingSubmissions['memory-wall'].length})
                  </h2>
                  <div className="space-y-4">
                    {pendingSubmissions['memory-wall'].map((submission) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        type="memory"
                        onApprove={approveSubmission}
                        onDeny={() => alert('Deny feature coming soon')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Guestbook Submissions */}
              {pendingSubmissions['guestbook']?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Guestbook Submissions ({pendingSubmissions['guestbook'].length})
                  </h2>
                  <div className="space-y-4">
                    {pendingSubmissions['guestbook'].map((submission) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        type="guestbook"
                        onApprove={approveSubmission}
                        onDeny={() => alert('Deny feature coming soon')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Media Booking Submissions */}
              {pendingSubmissions['media-booking']?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Media Booking Requests ({pendingSubmissions['media-booking'].length})
                  </h2>
                  <div className="space-y-4">
                    {pendingSubmissions['media-booking'].map((submission) => (
                      <div key={submission.id} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{submission.data.name}</h3>
                            <p className="text-sm text-gray-600">{submission.data.organization}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(submission.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Email:</span> {submission.data.email}</p>
                          <p><span className="font-semibold">Phone:</span> {submission.data.phone}</p>
                          <p><span className="font-semibold">Message:</span> {submission.data.message}</p>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-800">
                          ℹ️ Media bookings are for informational purposes. Respond via email: {submission.data.email}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signups */}
              {pendingSubmissions['newsletter']?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Newsletter Signups ({pendingSubmissions['newsletter'].length})
                  </h2>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <p className="text-gray-700 mb-4">Recent newsletter subscribers:</p>
                    <ul className="space-y-2">
                      {pendingSubmissions['newsletter'].map((submission) => (
                        <li key={submission.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium">{submission.data.email}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(submission.createdAt).toLocaleDateString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* No Submissions */}
              {Object.values(pendingSubmissions).every(arr => arr.length === 0) && (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
                  <p className="text-gray-600">No pending submissions to review</p>
                  <button
                    onClick={loadPendingSubmissions}
                    className="mt-4 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                  >
                    Refresh
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="https://app.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center"
          >
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-bold text-gray-900 mb-2">View Submissions</h3>
            <p className="text-sm text-gray-600">Netlify Forms Dashboard</p>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center"
          >
            <div className="text-4xl mb-3">💻</div>
            <h3 className="font-bold text-gray-900 mb-2">GitHub Repo</h3>
            <p className="text-sm text-gray-600">View recent updates</p>
          </a>

          <button
            onClick={() => navigate('/')}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center"
          >
            <div className="text-4xl mb-3">🏠</div>
            <h3 className="font-bold text-gray-900 mb-2">Back to Site</h3>
            <p className="text-sm text-gray-600">View live website</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
