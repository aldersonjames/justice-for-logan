import { useState } from 'react'

const PressKit = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  // Press kit items with metadata
  const pressKitItems = [
    // High-Resolution Photos
    {
      id: 1,
      category: 'photos',
      title: 'Logan Federico - Official Portrait',
      description: 'High-resolution portrait photo of Logan',
      format: 'JPG',
      size: '4.2 MB',
      dimensions: '3000x4000px',
      path: '/documents/press-kit/logan-portrait.jpg',
      thumbnail: '/documents/press-kit/thumbnails/logan-portrait-thumb.jpg',
      icon: '📷'
    },
    {
      id: 2,
      category: 'photos',
      title: 'Logan with Family',
      description: 'Family photo showing Logan with loved ones',
      format: 'JPG',
      size: '5.8 MB',
      dimensions: '4000x3000px',
      path: '/documents/press-kit/logan-family.jpg',
      thumbnail: '/documents/press-kit/thumbnails/logan-family-thumb.jpg',
      icon: '📷'
    },
    {
      id: 3,
      category: 'photos',
      title: 'Stephen Federico - Press Photo',
      description: 'Official photo of Stephen Federico for media use',
      format: 'JPG',
      size: '3.9 MB',
      dimensions: '3000x3000px',
      path: '/documents/press-kit/stephen-federico.jpg',
      thumbnail: '/documents/press-kit/thumbnails/stephen-federico-thumb.jpg',
      icon: '📷'
    },

    // Fact Sheets
    {
      id: 4,
      category: 'fact-sheets',
      title: 'Case Overview Fact Sheet',
      description: 'Comprehensive overview of Logan\'s case and timeline',
      format: 'PDF',
      size: '2.1 MB',
      pages: '4 pages',
      path: '/documents/press-kit/case-overview.pdf',
      thumbnail: '/documents/press-kit/thumbnails/fact-sheet-thumb.jpg',
      icon: '📋'
    },
    {
      id: 5,
      category: 'fact-sheets',
      title: 'Bail Reform Statistics',
      description: 'Data and statistics on bail system failures in South Carolina',
      format: 'PDF',
      size: '1.8 MB',
      pages: '3 pages',
      path: '/documents/press-kit/bail-reform-stats.pdf',
      thumbnail: '/documents/press-kit/thumbnails/stats-thumb.jpg',
      icon: '📊'
    },

    // Press Releases
    {
      id: 6,
      category: 'press-releases',
      title: 'Initial Press Release',
      description: 'Original press release announcing the Justice for Logan campaign',
      format: 'PDF',
      size: '856 KB',
      date: 'Nov 1, 2024',
      path: '/documents/press-kit/press-release-initial.pdf',
      thumbnail: '/documents/press-kit/thumbnails/press-release-thumb.jpg',
      icon: '📰'
    },
    {
      id: 7,
      category: 'press-releases',
      title: 'Legislative Reform Announcement',
      description: 'Press release on proposed legislative reforms',
      format: 'PDF',
      size: '924 KB',
      date: 'Nov 5, 2024',
      path: '/documents/press-kit/press-release-reform.pdf',
      thumbnail: '/documents/press-kit/thumbnails/press-release-thumb.jpg',
      icon: '📰'
    },

    // Media Quotes
    {
      id: 8,
      category: 'quotes',
      title: 'Stephen\'s Statement Collection',
      description: 'Approved quotes from Stephen Federico for media use',
      format: 'PDF',
      size: '654 KB',
      path: '/documents/press-kit/stephen-quotes.pdf',
      thumbnail: '/documents/press-kit/thumbnails/quotes-thumb.jpg',
      icon: '💬'
    },

    // Logos and Branding
    {
      id: 9,
      category: 'branding',
      title: 'Justice for Logan Logo - Full Color',
      description: 'Primary logo in full color (PNG with transparency)',
      format: 'PNG',
      size: '1.2 MB',
      dimensions: '2000x2000px',
      path: '/documents/press-kit/logo-color.png',
      thumbnail: '/documents/press-kit/thumbnails/logo-color-thumb.png',
      icon: '🎨'
    },
    {
      id: 10,
      category: 'branding',
      title: 'Justice for Logan Logo - White',
      description: 'Logo in white for dark backgrounds',
      format: 'PNG',
      size: '987 KB',
      dimensions: '2000x2000px',
      path: '/documents/press-kit/logo-white.png',
      thumbnail: '/documents/press-kit/thumbnails/logo-white-thumb.png',
      icon: '🎨'
    },
    {
      id: 11,
      category: 'branding',
      title: 'Brand Guidelines',
      description: 'Complete brand guidelines including colors, fonts, and usage',
      format: 'PDF',
      size: '3.4 MB',
      pages: '8 pages',
      path: '/documents/press-kit/brand-guidelines.pdf',
      thumbnail: '/documents/press-kit/thumbnails/brand-thumb.jpg',
      icon: '📘'
    },

    // Complete Press Kit
    {
      id: 12,
      category: 'complete',
      title: 'Complete Press Kit (ZIP)',
      description: 'All materials bundled together in one archive',
      format: 'ZIP',
      size: '28.5 MB',
      path: '/documents/press-kit/justice-for-logan-complete-press-kit.zip',
      thumbnail: '/documents/press-kit/thumbnails/complete-thumb.jpg',
      icon: '📦'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Materials', icon: '📁' },
    { id: 'photos', label: 'Photos', icon: '📷' },
    { id: 'fact-sheets', label: 'Fact Sheets', icon: '📋' },
    { id: 'press-releases', label: 'Press Releases', icon: '📰' },
    { id: 'quotes', label: 'Media Quotes', icon: '💬' },
    { id: 'branding', label: 'Logos & Branding', icon: '🎨' },
    { id: 'complete', label: 'Complete Kit', icon: '📦' }
  ]

  const filteredItems = activeCategory === 'all'
    ? pressKitItems
    : pressKitItems.filter(item => item.category === activeCategory)

  const handleDownload = (item) => {
    // In production, this would trigger actual download
    console.log(`Downloading: ${item.title}`)
    alert(`Download functionality for "${item.title}" will be implemented once assets are added to:\n${item.path}`)
  }

  return (
    <section id="press-kit" className="section-container relative bg-gradient-to-b from-gray-50 via-white to-slate-50 overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-secondary mb-4">Press Kit</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-teal-500 to-primary mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Download high-resolution photos, fact sheets, press releases, and branding materials for media coverage of Logan's story and our advocacy work.
          </p>

          {/* Media Contact Box */}
          <div className="bg-gradient-to-r from-secondary to-teal-700 text-white rounded-xl p-6 max-w-2xl mx-auto shadow-lg">
            <h3 className="font-bold text-xl mb-3">Media Contact</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Contact:</strong> Stephen Federico</p>
              <p><strong>Email:</strong> media@justiceforlogan.org</p>
              <p><strong>Phone:</strong> Available upon request via booking system</p>
              <a
                href="#booking"
                className="inline-block mt-3 bg-white text-secondary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Interview
              </a>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm ${
                  activeCategory === category.id
                    ? 'bg-secondary text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Press Kit Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {item.format}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="font-bold text-lg text-secondary mb-2 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {item.size}
                  </span>
                  {item.dimensions && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {item.dimensions}
                    </span>
                  )}
                  {item.pages && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {item.pages}
                    </span>
                  )}
                  {item.date && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {item.date}
                    </span>
                  )}
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(item)}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center group"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Guidelines */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
          <h3 className="font-bold text-2xl text-secondary mb-6 text-center">Media Usage Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">✓</span>
                You May:
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Use materials for news coverage and editorial content
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Share photos and quotes in print, broadcast, and online media
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Crop and resize images as needed for layout
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Use logos in connection with stories about the campaign
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center">
                <span className="text-2xl mr-2">✗</span>
                Please Don't:
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  Alter photos beyond basic cropping and color correction
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  Use materials for commercial purposes or advertising
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  Modify or recreate logos or branding
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  Misrepresent or take quotes out of context
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white rounded-lg text-center">
            <p className="text-sm text-gray-600">
              <strong>Attribution:</strong> Please credit photos as "Courtesy of the Federico Family" and provide a link to JusticeForLogan.org when possible.
            </p>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 text-center">
          <h3 className="font-bold text-xl text-secondary mb-4">Need Something Else?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you need additional materials, specific photo angles, or have questions about using these resources, please contact us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:media@justiceforlogan.org"
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Email Media Team
            </a>
            <a
              href="#booking"
              className="bg-white hover:bg-gray-50 text-secondary border-2 border-secondary font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Schedule Interview
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PressKit
