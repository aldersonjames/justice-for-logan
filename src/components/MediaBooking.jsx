const MediaBooking = () => {
  return (
    <section id="booking" className="section-container relative bg-gradient-to-b from-white via-slate-50 to-gray-100 overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-secondary mb-4">Media Inquiries</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-teal-500 to-primary mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Stephen Federico, Logan's father, is available for interviews to share Logan's story and advocate for criminal justice reform.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6 p-4 bg-primary-light/30 rounded-lg">
            <div className="text-3xl">ℹ️</div>
            <div>
              <p className="text-gray-800 leading-relaxed">
                <strong>Important:</strong> To help Stephen manage the overwhelming response, please use the booking system below to request an interview. He will review requests and schedule time based on his availability.
              </p>
            </div>
          </div>

          {/* Calendly Embed Placeholder */}
          <div className="border-4 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Calendly Integration</h3>
            <p className="text-gray-600 mb-6">
              Insert your Calendly embed code here to enable automatic scheduling
            </p>
            <div className="bg-white rounded-lg p-6 text-left">
              <p className="text-sm text-gray-700 mb-3">
                <strong>To add Calendly:</strong>
              </p>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Create a Calendly account at <a href="https://calendly.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">calendly.com</a></li>
                <li>Set up Stephen's availability and event types</li>
                <li>Get the embed code from Calendly</li>
                <li>Replace this placeholder section with the embed code</li>
              </ol>
            </div>
          </div>

          {/* Alternative: Simple Contact Form (if Calendly not ready) */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-4">Or Send a Direct Request:</h4>
            <form name="media-booking" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="space-y-4">
              <input type="hidden" name="form-name" value="media-booking" />
              <p className="hidden">
                <label>Don't fill this out: <input name="bot-field" /></label>
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Outlet/Organization</label>
                  <input
                    type="text"
                    name="outlet"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Media outlet name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                <select name="interview-type" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>TV Interview</option>
                  <option>Radio Interview</option>
                  <option>Podcast</option>
                  <option>Print/Online Article</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Details About Your Request</label>
                <textarea
                  name="details"
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Please describe the nature of the interview, topics you'd like to cover, deadline, and any other relevant details..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date/Time</label>
                <input
                  type="text"
                  name="preferred-datetime"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Flexible / Specific date and time range"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-secondary text-white font-semibold py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
              >
                Submit Interview Request
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Stephen will review your request and respond as soon as possible. Please allow 24-48 hours for a response.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaBooking

