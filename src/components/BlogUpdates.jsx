import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import blogPosts from '../data/blog-posts.json'

const BlogUpdates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedPost, setExpandedPost] = useState(null)

  const categories = [
    { id: 'all', label: 'All Updates', color: 'gray' },
    { id: 'advocacy', label: 'Advocacy', color: 'primary' },
    { id: 'news', label: 'News', color: 'secondary' },
    { id: 'family updates', label: 'Family Updates', color: 'pink' },
    { id: 'legislation', label: 'Legislation', color: 'blue' }
  ]

  // Filter posts by category
  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  )

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  // Get category badge color
  const getCategoryColor = (category) => {
    const categoryMap = {
      'advocacy': 'bg-primary text-white',
      'news': 'bg-secondary text-white',
      'family updates': 'bg-pink-500 text-white',
      'legislation': 'bg-blue-600 text-white'
    }
    return categoryMap[category] || 'bg-gray-500 text-white'
  }

  // Toggle expanded post
  const togglePost = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId)
  }

  return (
    <section id="blog" className="section-container relative bg-gradient-to-b from-white via-purple-50 to-blue-50 overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-secondary mb-4">Updates & News</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-pink-500 to-secondary mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Follow our journey as we fight for justice and honor Logan's memory. Stay informed about legislative progress, community events, and family updates.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
                  selectedCategory === category.id
                    ? category.id === 'all'
                      ? 'bg-gray-800 text-white shadow-lg'
                      : category.id === 'advocacy'
                      ? 'bg-primary text-white shadow-lg'
                      : category.id === 'news'
                      ? 'bg-secondary text-white shadow-lg'
                      : category.id === 'family updates'
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Showing {sortedPosts.length} {sortedPosts.length === 1 ? 'update' : 'updates'}
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <p className="text-gray-600 text-lg">No updates found in this category.</p>
            </div>
          ) : (
            sortedPosts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Post Header */}
                <div className="p-6 md:p-8">
                  {/* Category Badge and Date */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(post.date)}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {post.author}
                    </span>
                  </div>

                  {/* Featured Image Placeholder */}
                  {post.featuredImage ? (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-purple-50 to-secondary/10 h-64 flex items-center justify-center border-2 border-dashed border-gray-200">
                      <div className="text-center">
                        <div className="text-6xl mb-2">
                          {post.category === 'advocacy' && '📣'}
                          {post.category === 'news' && '📰'}
                          {post.category === 'family updates' && '💜'}
                          {post.category === 'legislation' && '⚖️'}
                        </div>
                        <p className="text-gray-500 text-sm font-medium">Featured Image</p>
                      </div>
                    </div>
                  )}

                  {/* Post Title */}
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4 leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <button
                    onClick={() => togglePost(post.id)}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
                      expandedPost === post.id
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-gradient-to-r from-primary to-pink-500 text-white hover:from-primary-dark hover:to-pink-600'
                    }`}
                  >
                    {expandedPost === post.id ? (
                      <>
                        Show Less
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Read More
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedPost === post.id && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6 md:p-8 animate-fade-in">
                    <div className="prose prose-lg max-w-none prose-headings:text-secondary prose-headings:font-display prose-a:text-primary hover:prose-a:text-primary-dark prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700">
                      <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    {/* Share Buttons */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-gray-700 font-semibold">Share this update:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const url = `${window.location.origin}#blog-${post.slug}`
                              navigator.clipboard.writeText(url)
                              alert('Link copied to clipboard!')
                            }}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Copy Link
                          </button>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.origin)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                            X
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-br from-secondary via-teal-700 to-secondary-dark rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Stay Updated</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates on our advocacy efforts, legislative progress, and upcoming events.
          </p>
          <a
            href="#newsletter"
            className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-secondary font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Subscribe Now
          </a>
        </div>
      </div>
    </section>
  )
}

export default BlogUpdates
