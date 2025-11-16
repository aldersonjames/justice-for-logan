import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import mediaArticlesData from '../data/mediaArticles.json'

const MediaCoverage = () => {
  const [selectedFilter, setSelectedFilter] = useState('latest')
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  })

  // Filter types with icons and colors
  const filters = [
    { id: 'latest', label: 'Latest Coverage', icon: '🔥', color: 'bg-primary' },
    { id: 'all', label: 'All Media', icon: '📰', color: 'bg-gray-600' },
    { id: 'news', label: 'News', icon: '📰', color: 'bg-blue-600' },
    { id: 'video', label: 'Video', icon: '🎥', color: 'bg-red-600' },
    { id: 'social', label: 'Social Media', icon: '📱', color: 'bg-purple-600' },
    { id: 'interview', label: 'Interviews', icon: '🎤', color: 'bg-green-600' },
    { id: 'press', label: 'Press Release', icon: '📄', color: 'bg-indigo-600' },
  ]

  // Filter articles based on selected type
  const getFilteredArticles = () => {
    let articles = mediaArticlesData.filter(article => article.approved)
    
    if (selectedFilter === 'latest') {
      // Sort by date (newest first) and take top 6
      return articles.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)
    } else if (selectedFilter === 'all') {
      return articles
    } else {
      return articles.filter(article => article.type === selectedFilter)
    }
  }
  
  const filteredArticles = getFilteredArticles()

  // Auto-scroll functionality
  useEffect(() => {
    if (!emblaApi) return

    const intervalId = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, 5000) // Auto-scroll every 5 seconds

    return () => clearInterval(intervalId)
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Get type badge
  const getTypeBadge = (type) => {
    const filter = filters.find(f => f.id === type)
    return filter ? { icon: filter.icon, color: filter.color } : { icon: '📰', color: 'bg-gray-600' }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section id="media" className="section-container relative bg-gradient-to-b from-purple-100 via-pink-50 to-blue-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-l from-secondary/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
                        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-secondary mb-4">Media Coverage</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-pink-500 to-primary-dark mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Logan's story has touched hearts across the nation. Here's the latest coverage and interviews as the fight for justice continues.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${
                  selectedFilter === filter.id
                    ? `${filter.color} text-white shadow-xl border-transparent`
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-md border-gray-400 hover:border-gray-600'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => {
                  const badge = getTypeBadge(article.type)
                  return (
                    <div
                      key={article.id}
                      className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                    >
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 h-full"
                      >
                        {/* Type Badge & Outlet */}
                        <div className={`${badge.color} p-4 relative`}>
                          <div className="flex justify-between items-center">
                            <span className="text-white font-semibold">{article.outlet}</span>
                            <span className="text-2xl">{badge.icon}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <p className="text-xs text-gray-500 mb-2">{formatDate(article.date)}</p>
                          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-secondary transition-colors min-h-[3.5rem]">
                            {article.headline}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {article.description}
                          </p>
                          <div className="flex items-center text-primary font-medium text-sm">
                            Read More 
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                })
              ) : (
                <div className="flex-[0_0_100%] text-center py-12">
                  <p className="text-gray-500 text-lg">No {selectedFilter === 'all' ? '' : selectedFilter} articles found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          {filteredArticles.length > 3 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-primary rounded-full p-3 shadow-xl transition-all z-10 border-2 border-gray-200 hover:border-primary group"
                aria-label="Previous"
              >
                <svg className="w-6 h-6 text-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-primary rounded-full p-3 shadow-xl transition-all z-10 border-2 border-gray-200 hover:border-primary group"
                aria-label="Next"
              >
                <svg className="w-6 h-6 text-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Auto-scroll indicator */}
        <div className="flex justify-center mb-8">
          <div className="bg-secondary/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <span className="inline-flex items-center text-sm text-white font-medium">
              <span className="animate-pulse mr-2 text-primary-light text-lg">●</span>
              Auto-scrolling • Click arrows to control
            </span>
          </div>
        </div>

        {/* Submit New Link Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="text-xl mr-2">+</span>
            Submit New Coverage
          </button>
        </div>

        {/* Submit Form */}
        {showSubmitForm && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-eagles-green">Submit New Coverage</h3>
              <button
                onClick={() => setShowSubmitForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>ℹ️ Submissions are reviewed:</strong> All submitted links will be reviewed by the family before appearing on the site. Please provide accurate information.
              </p>
            </div>

            <form name="media-submission" method="POST" data-netlify="true" className="space-y-4">
              <input type="hidden" name="form-name" value="media-submission" />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  name="submitter-name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input 
                  type="email" 
                  name="submitter-email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Coverage</label>
                <select 
                  name="coverage-type"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select type...</option>
                  <option value="news">News Article</option>
                  <option value="video">Video/TV Segment</option>
                  <option value="social">Social Media Post</option>
                  <option value="interview">Interview</option>
                  <option value="press">Press Release</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Article/Video URL</label>
                <input 
                  type="url" 
                  name="coverage-url"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Headline/Title</label>
                <input 
                  type="text" 
                  name="coverage-headline"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Article or video headline"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outlet/Source</label>
                <input 
                  type="text" 
                  name="coverage-outlet"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., CNN, Local News, Facebook"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                <input 
                  type="date" 
                  name="coverage-date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description</label>
                <textarea 
                  name="coverage-description"
                  rows="3"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Brief summary of the coverage (2-3 sentences)"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-secondary text-white font-semibold py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg"
              >
                Submit for Review
              </button>

              <p className="text-xs text-gray-500 text-center">
                Thank you for helping us track coverage of Logan's story. We'll review your submission within 24-48 hours.
              </p>
            </form>
          </div>
        )}

        {/* Coverage Stats */}
        <div className="bg-gradient-to-r from-secondary to-secondary/90 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📊</div>
              <div>
                <h4 className="font-bold text-xl mb-1">Media Coverage Tracking</h4>
                <p className="text-sm opacity-90">
                  Logan's story is reaching millions and driving change
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{mediaArticlesData.length}</div>
                <div className="text-xs opacity-75">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{mediaArticlesData.filter(a => a.type === 'video').length}</div>
                <div className="text-xs opacity-75">Video Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{mediaArticlesData.filter(a => a.type === 'social').length}</div>
                <div className="text-xs opacity-75">Social Posts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaCoverage
