import Newsletter from './Newsletter'

/**
 * NewsletterExample Component
 *
 * This component demonstrates different ways to use the Newsletter component
 * throughout the Justice for Logan website. You can copy any of these examples
 * and integrate them into your existing pages.
 */

const NewsletterExample = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Newsletter Component Examples
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the variant that best fits your page layout and design needs
          </p>
        </div>

        {/* Example 1: Default Variant (Standalone Section) */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <h2 className="text-2xl font-display font-bold text-secondary mb-3">
              1. Default Variant - Standalone Section
            </h2>
            <p className="text-gray-600 mb-4">
              Perfect for dedicated newsletter sections or full-width placements.
              Features a light gradient background with Logan's brand colors.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <code className="text-sm text-gray-800">
                {'<Newsletter variant="default" />'}
              </code>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Newsletter variant="default" />
          </div>
        </section>

        {/* Example 2: Dark Variant (Footer or Hero) */}
        <section className="mb-16 bg-gradient-to-br from-gray-900 to-slate-800 rounded-2xl p-8">
          <div className="bg-white/10 backdrop-blur rounded-xl shadow-md p-8 mb-6">
            <h2 className="text-2xl font-display font-bold text-white mb-3">
              2. Dark Variant - Footer or Hero Sections
            </h2>
            <p className="text-gray-200 mb-4">
              Designed for dark backgrounds like footers or hero sections.
              Creates beautiful contrast with light text on dark surfaces.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <code className="text-sm text-gray-200">
                {'<Newsletter variant="dark" />'}
              </code>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Newsletter variant="dark" />
          </div>
        </section>

        {/* Example 3: Compact Variant (Sidebar) */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <h2 className="text-2xl font-display font-bold text-secondary mb-3">
              3. Compact Variant - Sidebar or Inline
            </h2>
            <p className="text-gray-600 mb-4">
              Clean white background ideal for sidebars, inline placements, or
              areas where you want a more minimal appearance.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <code className="text-sm text-gray-800">
                {'<Newsletter variant="compact" />'}
              </code>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Main Content Area</h3>
              <p className="text-gray-600 mb-4">
                This represents your main content. The newsletter signup can be placed
                in the sidebar alongside your content.
              </p>
              <p className="text-gray-600">
                The compact variant works great for this use case as it doesn't overpower
                the main content but remains visually appealing and conversion-optimized.
              </p>
            </div>

            <div className="md:col-span-1">
              <Newsletter variant="compact" />
            </div>
          </div>
        </section>

        {/* Example 4: Custom Styling with className */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <h2 className="text-2xl font-display font-bold text-secondary mb-3">
              4. Custom Styling with className
            </h2>
            <p className="text-gray-600 mb-4">
              Add your own custom classes to further customize the appearance and spacing.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <code className="text-sm text-gray-800">
                {'<Newsletter variant="default" className="max-w-md shadow-2xl border-4 border-primary/20" />'}
              </code>
            </div>
          </div>

          <div className="flex justify-center">
            <Newsletter
              variant="default"
              className="max-w-md shadow-2xl border-4 border-primary/20"
            />
          </div>
        </section>

        {/* Example 5: In Footer */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <h2 className="text-2xl font-display font-bold text-secondary mb-3">
              5. Integrated in Footer (Recommended)
            </h2>
            <p className="text-gray-600 mb-4">
              Example of how to integrate the newsletter into your footer component.
            </p>
          </div>

          {/* Mock Footer */}
          <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white rounded-2xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Newsletter Section in Footer */}
              <div className="mb-12">
                <Newsletter variant="dark" />
              </div>

              {/* Rest of Footer */}
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-display font-bold mb-4 text-primary-light">
                    Justice for Logan
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Honoring the life of Logan Federico and fighting for criminal justice reform.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-primary-light">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Logan</a></li>
                    <li><a href="#advocacy" className="text-gray-300 hover:text-white transition-colors">Take Action</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-primary-light">Connect</h4>
                  <p className="text-gray-300 text-sm">Stay connected on social media</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-8">
                <p className="text-gray-400 text-sm text-center">
                  © 2025 Justice for Logan. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </section>

        {/* Example 6: Between Content Sections */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <h2 className="text-2xl font-display font-bold text-secondary mb-3">
              6. Between Content Sections
            </h2>
            <p className="text-gray-600 mb-4">
              Place the newsletter signup between major content sections as a natural
              engagement point.
            </p>
          </div>

          <div className="space-y-8">
            {/* Content Block 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Section 1</h3>
              <p className="text-gray-600">
                Your main content here...
              </p>
            </div>

            {/* Newsletter Between Sections */}
            <div className="max-w-2xl mx-auto">
              <Newsletter variant="default" />
            </div>

            {/* Content Block 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Section 2</h3>
              <p className="text-gray-600">
                More content here...
              </p>
            </div>
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-display font-bold text-secondary mb-6">
            Implementation Notes
          </h2>

          <div className="space-y-6 text-gray-700">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">🔒</span>
                Security Features
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm ml-6">
                <li>Honeypot field for spam protection</li>
                <li>Email validation with regex patterns</li>
                <li>Secure Netlify Forms integration</li>
                <li>GDPR-compliant privacy notice</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">✨</span>
                User Experience
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm ml-6">
                <li>Real-time email validation</li>
                <li>Loading states with animated spinner</li>
                <li>Success confirmation with visual feedback</li>
                <li>Clear error messages for failed submissions</li>
                <li>Auto-reset after successful submission</li>
                <li>Accessible with ARIA labels and screen reader support</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">🎨</span>
                Design System Integration
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm ml-6">
                <li>Uses Justice for Logan brand colors (Primary Pink, Secondary Teal)</li>
                <li>Consistent with existing Tailwind configuration</li>
                <li>Responsive design for all screen sizes</li>
                <li>Smooth transitions and micro-interactions</li>
                <li>Three variants for different contexts</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">⚙️</span>
                Netlify Forms Setup
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm ml-6">
                <li>Form is pre-configured with <code className="bg-gray-100 px-2 py-1 rounded">data-netlify="true"</code></li>
                <li>Netlify will automatically detect and enable the form on deployment</li>
                <li>Access submissions in Netlify Dashboard under "Forms"</li>
                <li>Configure email notifications in Netlify settings</li>
                <li>Set up integrations (Mailchimp, Zapier, etc.) if needed</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">📱</span>
                Conversion Optimization
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm ml-6">
                <li>Clear value proposition ("Stay Updated")</li>
                <li>Trust indicators (Secure, No spam, GDPR compliant)</li>
                <li>Minimal friction - just email required</li>
                <li>Visual feedback at every step</li>
                <li>Privacy policy link for transparency</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default NewsletterExample
