import { useState, useEffect } from 'react'
import memoriesData from '../data/memories.json'

const MemoryWall = () => {
  const [memories, setMemories] = useState([])
  const [filteredMemories, setFilteredMemories] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    relationship: '',
    type: 'message',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Load memories on component mount
  useEffect(() => {
    // Only show approved memories
    const approvedMemories = memoriesData.filter(memory => memory.approved)
    setMemories(approvedMemories)
    setFilteredMemories(approvedMemories)
  }, [])

  // Filter memories by type
  const handleFilter = (type) => {
    setActiveFilter(type)
    if (type === 'all') {
      setFilteredMemories(memories)
    } else {
      setFilteredMemories(memories.filter(memory => memory.type === type))
    }
  }

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const formElement = e.target
      const formDataObj = new FormData(formElement)

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj).toString()
      })

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        relationship: '',
        type: 'message',
        message: ''
      })
      setTimeout(() => setShowForm(false), 3000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get icon for memory type
  const getTypeIcon = (type) => {
    switch(type) {
      case 'story': return '📖'
      case 'photo': return '📸'
      case 'tribute': return '🕯️'
      case 'message': return '💌'
      default: return '💝'
    }
  }

  // Get color scheme for memory type
  const getTypeColor = (type) => {
    switch(type) {
      case 'story': return 'from-purple-500 to-purple-600'
      case 'photo': return 'from-pink-500 to-rose-600'
      case 'tribute': return 'from-secondary to-secondary-light'
      case 'message': return 'from-primary to-primary-dark'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <section id="memory-wall" className="section-container relative bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-secondary mb-4">Memory Wall</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-pink-500 to-secondary mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            A space to celebrate Logan's life, share memories, and honor her legacy. Every story, photo, and message helps keep her spirit alive.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => handleFilter('all')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              All Memories ({memories.length})
            </button>
            <button
              onClick={() => handleFilter('story')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === 'story'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              📖 Stories
            </button>
            <button
              onClick={() => handleFilter('photo')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === 'photo'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              📸 Photos
            </button>
            <button
              onClick={() => handleFilter('tribute')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === 'tribute'
                  ? 'bg-gradient-to-r from-secondary to-secondary-light text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              🕯️ Tributes
            </button>
            <button
              onClick={() => handleFilter('message')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === 'message'
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              💌 Messages
            </button>
          </div>

          {/* Add Memory Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {showForm ? '✕ Close Form' : '+ Share Your Memory'}
          </button>
        </div>

        {/* Submission Form */}
        {showForm && (
          <div className="max-w-3xl mx-auto mb-12 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-4 border-primary">
              <h3 className="heading-3 text-secondary mb-6 text-center">Share Your Memory of Logan</h3>

              <form
                name="memory-wall"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* Hidden fields for Netlify */}
                <input type="hidden" name="form-name" value="memory-wall" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Relationship and Type Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="relationship" className="block text-sm font-semibold text-gray-700 mb-2">
                        Relationship to Logan <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="relationship"
                        name="relationship"
                        required
                        value={formData.relationship}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900"
                        placeholder="Friend, Family, Colleague, etc."
                      />
                    </div>

                    <div>
                      <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                        Memory Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 bg-white"
                      >
                        <option value="message">💌 Message of Support</option>
                        <option value="story">📖 Share a Story</option>
                        <option value="tribute">🕯️ Tribute</option>
                        <option value="photo">📸 Photo Memory</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Memory <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none text-gray-900"
                      placeholder="Share your favorite memory, story, or message of support..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Memory'
                      )}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">✓</span>
                        <div>
                          <p className="text-green-800 font-medium">
                            Thank you for sharing your memory of Logan.
                          </p>
                          <p className="text-green-700 text-sm mt-1">
                            Your submission will be reviewed and added to the Memory Wall shortly.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        <p className="text-red-800 font-medium">
                          There was an error submitting your memory. Please try again.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </form>

              {/* Moderation Notice */}
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">ℹ️</span>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">All submissions are reviewed before being posted.</p>
                    <p>Thank you for honoring Logan's memory with respect and love.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Memory Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                memory.featured ? 'ring-2 ring-primary' : ''
              }`}
            >
              {/* Memory Card Header */}
              <div className={`bg-gradient-to-r ${getTypeColor(memory.type)} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                      {getTypeIcon(memory.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{memory.name}</h3>
                      <p className="text-sm text-white/90">{memory.relationship}</p>
                    </div>
                  </div>
                  {memory.featured && (
                    <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                      ⭐ Featured
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Placeholder for Photo Type */}
              {memory.type === 'photo' && (
                <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                  <div className="relative text-center text-gray-600">
                    <div className="text-5xl mb-2">📷</div>
                    <p className="text-sm font-medium">Photo Coming Soon</p>
                  </div>
                </div>
              )}

              {/* Memory Content */}
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4 italic">
                  "{memory.message}"
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium capitalize">{memory.type}</span>
                  <span>{new Date(memory.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredMemories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤍</div>
            <p className="text-gray-600 text-lg">
              No {activeFilter !== 'all' ? activeFilter + 's' : 'memories'} yet. Be the first to share!
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 via-pink-50 to-secondary/10 rounded-2xl p-8 md:p-12">
          <h3 className="heading-3 text-secondary mb-4">Help Us Keep Logan's Memory Alive</h3>
          <p className="text-gray-700 text-lg mb-6 max-w-3xl mx-auto">
            Every memory shared, every story told, and every tribute given helps ensure that Logan's light continues to shine.
            Share your memories and be part of honoring her beautiful life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Share Your Memory
            </button>
            <a
              href="#advocacy"
              className="px-8 py-4 bg-white text-secondary font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-secondary hover:bg-secondary hover:text-white"
            >
              Support the Fight for Justice
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MemoryWall
