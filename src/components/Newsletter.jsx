import { useState } from 'react'

const Newsletter = ({ variant = 'default', className = '' }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset states
    setErrorMessage('')

    // Validation
    if (!email.trim()) {
      setErrorMessage('Please enter your email address')
      setStatus('error')
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      // Netlify Forms submission
      const formData = new FormData(e.target)

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle')
        }, 5000)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
      console.error('Newsletter submission error:', error)
    }
  }

  // Variant styles
  const variants = {
    default: {
      container: 'bg-gradient-to-br from-primary/10 via-purple-50 to-secondary/10',
      title: 'text-secondary',
      input: 'border-gray-300 focus:ring-primary focus:border-primary',
      button: 'bg-primary hover:bg-primary-dark text-white'
    },
    dark: {
      container: 'bg-gradient-to-br from-gray-900 to-slate-800',
      title: 'text-primary-light',
      input: 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:ring-primary focus:border-primary',
      button: 'bg-primary hover:bg-primary-dark text-white'
    },
    compact: {
      container: 'bg-white',
      title: 'text-gray-900',
      input: 'border-gray-300 focus:ring-primary focus:border-primary',
      button: 'bg-secondary hover:bg-secondary-light text-white'
    }
  }

  const currentVariant = variants[variant] || variants.default

  return (
    <div className={`rounded-2xl p-6 md:p-8 shadow-lg ${currentVariant.container} ${className}`}>
      {/* Newsletter Icon & Heading */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full mb-4">
          <svg
            className="w-7 h-7 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className={`text-2xl font-display font-bold mb-2 ${currentVariant.title}`}>
          Stay Updated
        </h3>
        <p className={`text-sm ${variant === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed max-w-md mx-auto`}>
          Get updates on Logan's story, advocacy efforts, and ways to support criminal justice reform.
        </p>
      </div>

      {/* Newsletter Form */}
      <form
        name="newsletter"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Netlify Form Fields */}
        <input type="hidden" name="form-name" value="newsletter" />

        {/* Honeypot field for spam protection */}
        <div className="hidden">
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <input
              id="newsletter-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting' || status === 'success'}
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${currentVariant.input} ${
                status === 'error' ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
              }`}
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? 'email-error' : undefined}
            />
            {status === 'success' && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Error Message */}
          {status === 'error' && errorMessage && (
            <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center" role="alert">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorMessage}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${currentVariant.button}`}
        >
          {status === 'submitting' && (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </span>
          )}
          {status === 'success' && (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Successfully Subscribed!
            </span>
          )}
          {status !== 'submitting' && status !== 'success' && 'Subscribe to Updates'}
        </button>

        {/* Success Message */}
        {status === 'success' && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 animate-fade-in">
            <p className="text-green-800 text-sm text-center font-medium">
              Thank you for subscribing! Check your email to confirm your subscription.
            </p>
          </div>
        )}

        {/* GDPR Compliance & Privacy Notice */}
        <div className={`text-xs ${variant === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-center leading-relaxed`}>
          <p>
            By subscribing, you agree to receive updates about Logan's story and advocacy efforts.
            We respect your privacy and will never share your email address with third parties.
            You can unsubscribe at any time.
          </p>
          <p className="mt-2">
            <a
              href="/privacy-policy"
              className={`underline hover:no-underline ${variant === 'dark' ? 'text-primary-light' : 'text-primary'}`}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </form>

      {/* Additional Trust Indicators */}
      <div className={`mt-6 pt-6 border-t ${variant === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className={variant === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Secure</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className={variant === 'dark' ? 'text-gray-400' : 'text-gray-600'}>No spam</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-purple-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className={variant === 'dark' ? 'text-gray-400' : 'text-gray-600'}>GDPR compliant</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
