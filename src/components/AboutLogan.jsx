import { useState, useEffect } from 'react'

const galleryImages = [
  '177237_Original.jpg', '191795_Original.jpg', '20210516_015119.jpg',
  '20210724_174717_Original.jpg', '20210724_181717.jpg', '67202260809__ED64CECD-2C5F-4CDA-BACD-58842B6589C9.jpg',
  '67202369305__3C3B4C06-903C-4C7A-BBCE-66B3F2B4F27E.jpg', '9B6EA637-8BB7-476D-92F3-FE8BD634D3E7_Original.jpg',
  'FB_IMG_1615079967537_Original.jpg', 'FB_IMG_1640635180557.jpg', 'IMG_1023.JPG',
  'IMG_1422.JPEG', 'IMG_1423.JPG', 'IMG_1430.JPG', 'IMG_4116_Original.jpg',
  'IMG_4117_Original.jpg', 'IMG_5174.JPG', 'IMG_5307.JPG', 'IMG_5332.JPG',
  'IMG_6291_Original.jpg', 'IMG_6369.JPG', 'IMG_7874.JPG', 'IMG_7876.JPG',
  'IMG_8581.jpeg', 'IMG_8692.JPEG', 'IMG_9075.JPG', 'IMG_9076.JPG',
  'IMG_9077.JPG', 'IMG_9079.JPG', 'IMG_9346.jpg', 'IMG_9578.jpg', 'IMG_9640.jpg', 'image0.JPEG'
]

const AboutLogan = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(Math.floor(Math.random() * galleryImages.length))
  const [thumbnailStart, setThumbnailStart] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentImageIndex])

  const nextImage = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
      setIsTransitioning(false)
    }, 300)
  }

  const previousImage = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
      setIsTransitioning(false)
    }, 300)
  }

  const goToImage = (index) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex(index)
      setIsTransitioning(false)
    }, 300)
  }

  const visibleThumbnails = galleryImages.slice(thumbnailStart, thumbnailStart + 3)
  const hasMoreBefore = thumbnailStart > 0
  const hasMoreAfter = thumbnailStart + 3 < galleryImages.length

  return (
    <section id="about" className="section-container relative bg-gradient-to-b from-white via-blue-50 to-purple-50 overflow-hidden">
      {/* Decorative gradient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 text-secondary mb-4">About Logan</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-pink-500 to-primary-dark mx-auto"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo Gallery with Slideshow */}
          <div className="space-y-4">
            {/* Main Photo Display */}
            <div className="relative rounded-2xl shadow-2xl overflow-hidden aspect-square bg-gray-100">
              <img
                src={`/images/gallery/${galleryImages[currentImageIndex]}`}
                alt={`Logan Federico - Photo ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                onError={(e) => {
                  e.target.src = '/images/logan-memorial.jpg'
                }}
              />

              {/* Navigation Arrows */}
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                aria-label="Next photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Photo Counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setThumbnailStart(Math.max(0, thumbnailStart - 3))}
                disabled={!hasMoreBefore}
                className={`p-2 rounded-lg transition-all ${
                  hasMoreBefore
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Previous thumbnails"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="grid grid-cols-3 gap-4 flex-1">
                {visibleThumbnails.map((img, idx) => {
                  const actualIndex = thumbnailStart + idx
                  return (
                    <button
                      key={actualIndex}
                      onClick={() => goToImage(actualIndex)}
                      className={`relative rounded-lg shadow-lg aspect-square overflow-hidden transform hover:scale-105 transition-all ${
                        actualIndex === currentImageIndex ? 'ring-4 ring-primary' : ''
                      }`}
                    >
                      <img
                        src={`/images/gallery/${img}`}
                        alt={`Thumbnail ${actualIndex + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/logan-memorial.jpg'
                        }}
                      />
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setThumbnailStart(Math.min(galleryImages.length - 3, thumbnailStart + 3))}
                disabled={!hasMoreAfter}
                className={`p-2 rounded-lg transition-all ${
                  hasMoreAfter
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Next thumbnails"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Biography Content */}
          <div className="space-y-6">
            <div>
              <h3 className="heading-3 text-secondary mb-4">Remembering Logan Hailey Federico</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Logan Hailey Federico, 22, was a bright light taken far too soon. Born and raised in Waxhaw, North Carolina, Logan was pursuing her education degree at South Piedmont Community College with dreams of becoming a teacher.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                On May 3, 2025, while visiting friends in Columbia, South Carolina, Logan's life was tragically cut short. She is survived by her parents Stephen and Melissa Federico, and her younger brother Jacob.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm text-gray-700 italic">
                  To honor Logan's memory with personal stories, photos, and memories from those who knew her, please visit the Guestbook section or contact the family directly.
                </p>
              </div>
            </div>

            {/* Her Passions - Verified from family/media */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center">
                <div className="bg-secondary text-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-2">
                  🦅
                </div>
                <h4 className="font-semibold text-sm text-secondary">Eagles Fan</h4>
                <p className="text-xs text-gray-600">Philadelphia Eagles supporter</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-2">
                  ✨
                </div>
                <h4 className="font-semibold text-sm text-primary-dark">Swiftie</h4>
                <p className="text-xs text-gray-600">Taylor Swift fan</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-600 text-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-2">
                  ❤️
                </div>
                <h4 className="font-semibold text-sm text-secondary">Family First</h4>
                <p className="text-xs text-gray-600">Devoted to family</p>
              </div>
            </div>

            {/* Memorial Information */}
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary">
              <p className="text-gray-700 leading-relaxed mb-3">
                Over 200 people attended Logan's celebration of life on May 22, 2025, at Cedar Creek Ranch in Waxhaw, NC. The family asked attendees to wear pink—"a pink out celebration of Logan."
              </p>
              <p className="text-sm text-gray-600">
                A GoFundMe was established to assist with funeral expenses and to begin a legacy in Logan's name.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutLogan
