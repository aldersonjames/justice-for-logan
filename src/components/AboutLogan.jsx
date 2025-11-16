import { useState, useEffect } from 'react'

// All 71 gallery images (includes 17 converted from HEIC format)
const galleryImages = [
  '177237_Original.jpg', '191795_Original.jpg', '20210516_015119.jpg',
  '20210724_174717_Original.jpg', '20210724_181717.jpg', '276953_resized_Original.jpg',
  '318333.png', '67202260809__ED64CECD-2C5F-4CDA-BACD-58842B6589C9.jpg',
  '67202369305__3C3B4C06-903C-4C7A-BBCE-66B3F2B4F27E.jpg',
  '75705140756__17E5622A-092C-4C23-AF00-88D40F65FC93.jpg',
  '9B6EA637-8BB7-476D-92F3-FE8BD634D3E7_Original.jpg',
  'FB_IMG_1615079967537_Original.jpg', 'FB_IMG_1640635180557.jpg',
  'IMG_0013.jpg', 'IMG_1023.JPG', 'IMG_1422.JPEG', 'IMG_1423.JPG', 'IMG_1430.JPG',
  'IMG_1478.PNG', 'IMG_1479.PNG', 'IMG_1480.PNG', 'IMG_1482.png', 'IMG_1483.png',
  'IMG_1484.png', 'IMG_1486.png', 'IMG_1487.png',
  'IMG_1493.jpg', 'IMG_1495.jpg', 'IMG_1497.jpg', 'IMG_1498.jpg', 'IMG_1499.jpg',
  'IMG_1500.jpg', 'IMG_1501.jpg', 'IMG_1502.jpg',
  'IMG_4116_Original.jpg', 'IMG_4117_Original.jpg',
  'IMG_4362.jpg', 'IMG_4391.png', 'IMG_4438.png',
  'IMG_5056.png', 'IMG_5135.jpg', 'IMG_5174.JPG', 'IMG_5302.png', 'IMG_5303.PNG', 'IMG_5307.JPG',
  'IMG_5332.JPG', 'IMG_6291_Original.jpg', 'IMG_6349.jpg', 'IMG_6369.JPG', 'IMG_6768.jpg',
  'IMG_7065_Original.PNG', 'IMG_7675.jpg', 'IMG_7676.jpg', 'IMG_7874.JPG', 'IMG_7876.JPG',
  'IMG_8581.jpeg', 'IMG_8692.JPEG', 'IMG_9053.PNG', 'IMG_9075.JPG', 'IMG_9076.JPG', 'IMG_9077.JPG',
  'IMG_9079.JPG', 'IMG_9346.jpg', 'IMG_9578.jpg', 'IMG_9640.jpg',
  'Screenshot_20210819-180649_Facebook.jpg', 'Screenshot_20220711-023924_Photos.jpg',
  'Screenshot_20220714-053506_Photos.jpg', 'Screenshot_20220714-053615_Photos.jpg',
  'Tezza-6023.jpg', 'image0.JPEG'
]

// Images that need rotation
const rotatedImages = {
  'IMG_1023.JPG': 90,      // index 12 - sideways
  'IMG_1422.JPEG': 180,    // index 13 - upside down
  'IMG_9075.JPG': 90,      // index 42 - sideways
  'IMG_9076.JPG': 90,      // index 43 - sideways
  'IMG_9346.jpg': 90       // index 45 - sideways
}

const AboutLogan = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(Math.floor(Math.random() * galleryImages.length))
  const [thumbnailStart, setThumbnailStart] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [imageRotations, setImageRotations] = useState(() => {
    // Load rotations from localStorage on mount
    const saved = localStorage.getItem('imageRotations')
    return saved ? JSON.parse(saved) : { ...rotatedImages }
  })

  // Save rotations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('imageRotations', JSON.stringify(imageRotations))
  }, [imageRotations])

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

  const rotateCurrentImage = (direction) => {
    const currentImage = galleryImages[currentImageIndex]
    const currentRotation = imageRotations[currentImage] || 0
    const newRotation = direction === 'cw'
      ? (currentRotation + 90) % 360
      : (currentRotation - 90 + 360) % 360

    setImageRotations(prev => ({
      ...prev,
      [currentImage]: newRotation === 0 ? undefined : newRotation
    }))
  }

  const getCurrentRotation = () => {
    return imageRotations[galleryImages[currentImageIndex]] || 0
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

          {/* Edit Mode Toggle */}
          <button
            onClick={() => setEditMode(!editMode)}
            className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-md"
          >
            {editMode ? '✓ Exit Edit Mode' : '⚙️ Edit Photo Orientations'}
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo Gallery with Slideshow */}
          <div className="space-y-4">
            {/* Main Photo Display */}
            <div
              className="relative rounded-2xl shadow-2xl overflow-hidden aspect-square bg-gray-100 cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={`/images/gallery/${galleryImages[currentImageIndex]}`}
                alt={`Logan Federico - Photo ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  transform: getCurrentRotation()
                    ? `rotate(${getCurrentRotation()}deg)`
                    : 'none'
                }}
                onError={(e) => {
                  e.target.src = '/images/logan-memorial.jpg'
                }}
              />

              {/* Rotation Controls - Only visible in edit mode */}
              {editMode && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/70 p-2 rounded-lg z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      rotateCurrentImage('ccw')
                    }}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-semibold flex items-center gap-1"
                    title="Rotate 90° counter-clockwise"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    ↺ CCW
                  </button>
                  <div className="px-3 py-2 bg-gray-800 text-white rounded text-sm font-mono">
                    {getCurrentRotation()}°
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      rotateCurrentImage('cw')
                    }}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-semibold flex items-center gap-1"
                    title="Rotate 90° clockwise"
                  >
                    CW ↻
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </button>
                </div>
              )}
              {/* Click to expand overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 text-gray-800">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  previousImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
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

      {/* Lightbox Modal for Full Resolution Photos */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all z-10"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              previousImage()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all hover:scale-110 z-10"
            aria-label="Previous photo"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-all hover:scale-110 z-10"
            aria-label="Next photo"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Full Resolution Image */}
          <div className="max-w-7xl max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/images/gallery/${galleryImages[currentImageIndex]}`}
              alt={`Logan Federico - Photo ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
              style={{
                transform: getCurrentRotation()
                  ? `rotate(${getCurrentRotation()}deg)`
                  : 'none'
              }}
            />
          </div>

          {/* Photo Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  )
}

export default AboutLogan
