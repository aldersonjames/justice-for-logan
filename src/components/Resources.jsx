import { useState, useMemo } from 'react'
import resourcesData from '../data/resources.json'

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const { resources, categories } = resourcesData

  // Icon mapping
  const getIcon = (iconType) => {
    const icons = {
      government: '🏛️',
      scales: '⚖️',
      chart: '📊',
      research: '🔬',
      shield: '🛡️',
      heart: '❤️',
      support: '🤝',
      group: '👥',
      gavel: '⚖️',
      book: '📚',
      legal: '⚖️',
      phone: '📞',
      compassion: '💙',
      brain: '🧠',
      voice: '📣',
      justice: '⚖️',
      news: '📰',
      nonprofit: '🎗️'
    }
    return icons[iconType] || '📌'
  }

  // Filter resources based on search and category
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [resources, searchQuery, selectedCategory])

  // Get category color class
  const getCategoryColor = (categoryKey) => {
    const color = categories[categoryKey]?.color || 'gray'
    const colorMap = {
      'primary': 'border-primary bg-primary/5 text-primary',
      'primary-dark': 'border-primary-dark bg-primary-dark/5 text-primary-dark',
      'secondary': 'border-secondary bg-secondary/5 text-secondary',
      'secondary-light': 'border-secondary-light bg-secondary-light/5 text-secondary-light',
      'secondary-dark': 'border-secondary-dark bg-secondary-dark/5 text-secondary-dark',
      'accent': 'border-accent bg-accent/5 text-accent'
    }
    return colorMap[color] || 'border-gray-300 bg-gray-50 text-gray-700'
  }

  // Get category badge color
  const getCategoryBadgeColor = (categoryKey) => {
    const color = categories[categoryKey]?.color || 'gray'
    const colorMap = {
      'primary': 'bg-primary text-white',
      'primary-dark': 'bg-primary-dark text-white',
      'secondary': 'bg-secondary text-white',
      'secondary-light': 'bg-secondary-light text-white',
      'secondary-dark': 'bg-secondary-dark text-white',
      'accent': 'bg-accent text-white'
    }
    return colorMap[color] || 'bg-gray-500 text-white'
  }

  return (
    <section id="resources" className="section-container relative bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-secondary mb-4">Resources & Action</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-primary to-secondary-dark mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Find organizations, legislators, and resources to support criminal justice reform and victim advocacy.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10 border border-gray-100">
          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
              Search Resources
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Resources ({resources.length})
              </button>
              {Object.entries(categories).map(([key, category]) => {
                const count = resources.filter(r => r.category === key).length
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === key
                        ? `${getCategoryBadgeColor(key)} shadow-md transform scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-bold text-secondary">{filteredResources.length}</span> of {resources.length} resources
            {searchQuery && <span> for "<span className="font-semibold">{searchQuery}</span>"</span>}
          </p>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className={`relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
                  getCategoryColor(resource.category)
                } transform hover:-translate-y-1`}
              >
                {/* Category Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  getCategoryBadgeColor(resource.category)
                }`}>
                  {categories[resource.category]?.name}
                </div>

                <div className="p-6">
                  {/* Icon */}
                  <div className="text-5xl mb-4">
                    {getIcon(resource.icon)}
                  </div>

                  {/* Resource Name */}
                  <h3 className="text-xl font-bold text-secondary mb-3 pr-20">
                    {resource.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Phone Number (if applicable) */}
                  {resource.phone && (
                    <div className="mb-3">
                      <a
                        href={`tel:${resource.phone}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm"
                      >
                        <span className="text-lg">📞</span>
                        {resource.phone}
                      </a>
                    </div>
                  )}

                  {/* Link Button */}
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-secondary hover:text-primary font-semibold text-sm transition-colors group"
                  >
                    Visit Resource
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Resources Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="px-6 py-3 bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary via-pink-500 to-primary-dark rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="heading-3 mb-4 drop-shadow-sm">Make Your Voice Heard</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-95">
              Contact your South Carolina legislators today. Your advocacy can help prevent future tragedies and bring meaningful change to our criminal justice system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.scstatehouse.gov/senate.php"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105"
              >
                Contact State Senate
              </a>
              <a
                href="https://www.scstatehouse.gov/house.php"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105"
              >
                Contact House of Representatives
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resources
