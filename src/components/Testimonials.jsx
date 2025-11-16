import { useState, useEffect } from 'react'
import testimonialsData from '../data/testimonials.json'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      )
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    )
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    )
    setIsAutoPlaying(false)
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">
            Voices of <span className="text-primary">Love</span> & <span className="text-secondary">Justice</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from those who knew Logan and those standing with our family in the fight for justice and change.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-2/5 bg-gradient-to-br from-primary/20 via-purple-100 to-secondary/20 p-8 md:p-12 flex items-center justify-center">
                <div className="relative">
                  {/* Avatar Placeholder */}
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary via-pink-300 to-primary-dark shadow-xl flex items-center justify-center border-4 border-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
                    <div className="relative text-white text-center">
                      <div className="text-6xl mb-2">💙</div>
                      <div className="text-sm font-medium">
                        {testimonialsData[currentIndex].name.split(' ')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Decorative quote mark */}
                  <div className="absolute -top-4 -left-4 text-primary/30 text-8xl font-serif leading-none">
                    "
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                {/* Quote */}
                <blockquote className="mb-8">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-serif italic mb-6">
                    "{testimonialsData[currentIndex].quote}"
                  </p>
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">
                        {testimonialsData[currentIndex].name}
                      </h4>
                      <p className="text-secondary font-medium">
                        {testimonialsData[currentIndex].relationship}
                      </p>
                    </div>

                    {/* Heart icon */}
                    <div className="ml-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-700 hover:text-primary hover:scale-110 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-700 hover:text-primary hover:scale-110 group"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-primary'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid View - All Testimonials (Optional) */}
        <div className="mt-20 md:mt-24">
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-center text-gray-900 mb-12">
            All Testimonials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col hover:-translate-y-1 border border-transparent hover:border-primary/20"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Mini Avatar */}
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center text-white text-xl font-bold shadow-md">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-secondary font-medium">
                      {testimonial.relationship}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="flex-1">
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-6 font-serif italic">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Read more button for grid items */}
                <button
                  onClick={() => goToSlide(index)}
                  className="mt-4 text-primary hover:text-primary-dark font-medium text-sm flex items-center group"
                >
                  Read full testimonial
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-secondary/10 rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
              Share Your Story
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Did Logan touch your life? Do you support our mission? We'd love to hear from you.
            </p>
            <a
              href="#guestbook"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Leave a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
