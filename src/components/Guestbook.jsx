import { useState } from 'react'

const Guestbook = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // This will use Netlify Forms
      const formElement = e.target
      const formDataObj = new FormData(formElement)
      
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj).toString()
      })

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="guestbook" className="section-container relative bg-gradient-to-b from-white via-rose-100 to-purple-100 overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/25 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-secondary/25 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-secondary mb-4">Guestbook</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-pink-500 to-secondary mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Share your thoughts, memories, or words of support for Logan's family and their fight for justice.
          </p>
        </div>

        {/* Guestbook Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form 
            name="guestbook"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="guestbook" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div className="space-y-6">
              {/* Name */}
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

              {/* Email */}
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

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none text-gray-900"
                  placeholder="Share your thoughts, memories, or words of support..."
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
                      Sending...
                    </span>
                  ) : (
                    'Submit Message'
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">✓</span>
                    <p className="text-green-800 font-medium">
                      Thank you for your message. It has been sent to the family.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⚠️</span>
                    <p className="text-red-800 font-medium">
                      There was an error sending your message. Please try again.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <div className="flex items-start">
              <span className="text-2xl mr-3">ℹ️</span>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Your message will be delivered directly to Stephen Federico's email.</p>
                <p>All submissions are reviewed for appropriateness. Thank you for your support during this difficult time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guestbook

