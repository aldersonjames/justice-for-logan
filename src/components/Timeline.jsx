import { useState, useEffect, useRef } from 'react'

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const itemRefs = useRef([])

  // Timeline events data - easily updatable
  const events = [
    {
      id: 1,
      date: 'May 3, 2025',
      title: "Logan's Tragic Death",
      description: "Logan Federico's life was cut short in a preventable tragedy. A bright light was taken from this world far too soon.",
      type: 'tragedy',
      icon: '🕊️'
    },
    {
      id: 2,
      date: 'May 6, 2025',
      title: 'Stephen Speaks Out',
      description: "Stephen Federico courageously shared Logan's story with the world, vowing to turn grief into action and prevent similar tragedies.",
      type: 'advocacy',
      icon: '📢'
    },
    {
      id: 3,
      date: 'May 23, 2025',
      title: 'Community Vigil',
      description: "Hundreds gathered to honor Logan's memory, showing the profound impact she had on everyone who knew her.",
      type: 'community',
      icon: '🕯️'
    },
    {
      id: 4,
      date: 'September 29, 2025',
      title: 'Congressional Testimony',
      description: "Stephen testified before Congress, advocating for policy changes to protect others and ensure Logan's legacy saves lives.",
      type: 'milestone',
      icon: '🏛️'
    },
    {
      id: 5,
      date: 'Ongoing',
      title: 'Building Awareness',
      description: "Through media appearances and advocacy work, Logan's story continues to inspire change and action across the nation.",
      type: 'advocacy',
      icon: '📺'
    },
    {
      id: 6,
      date: 'Future',
      title: 'Legislative Victory',
      description: "Working toward concrete policy changes that will honor Logan's memory and protect countless others.",
      type: 'future',
      icon: '⚖️'
    },
    {
      id: 7,
      date: 'Future',
      title: "Logan's Legacy Lives On",
      description: "Every life saved, every policy changed, every heart touched - Logan's impact continues to grow.",
      type: 'future',
      icon: '💝'
    }
  ]

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]))
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px'
        }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer, index) => {
        if (observer && itemRefs.current[index]) {
          observer.unobserve(itemRefs.current[index])
        }
      })
    }
  }, [])

  // Get color scheme based on event type
  const getTypeStyles = (type) => {
    switch (type) {
      case 'tragedy':
        return {
          dot: 'bg-gray-600 border-gray-300',
          card: 'border-l-gray-600',
          badge: 'bg-gray-100 text-gray-700'
        }
      case 'advocacy':
        return {
          dot: 'bg-primary border-primary-light',
          card: 'border-l-primary',
          badge: 'bg-pink-100 text-primary-dark'
        }
      case 'community':
        return {
          dot: 'bg-secondary border-secondary-light',
          card: 'border-l-secondary',
          badge: 'bg-teal-100 text-secondary-dark'
        }
      case 'milestone':
        return {
          dot: 'bg-gradient-to-br from-primary to-secondary border-primary',
          card: 'border-l-secondary',
          badge: 'bg-gradient-to-r from-pink-100 to-teal-100 text-secondary-dark'
        }
      case 'future':
        return {
          dot: 'bg-purple-500 border-purple-300',
          card: 'border-l-purple-500',
          badge: 'bg-purple-100 text-purple-700'
        }
      default:
        return {
          dot: 'bg-gray-400 border-gray-200',
          card: 'border-l-gray-400',
          badge: 'bg-gray-100 text-gray-600'
        }
    }
  }

  return (
    <section id="timeline" className="py-16 md:py-24 bg-gradient-to-b from-white via-pink-50/30 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            The Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From tragedy to action - how one family's loss is creating lasting change
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-primary/50 to-purple-300 transform md:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {events.map((event, index) => {
              const styles = getTypeStyles(event.type)
              const isVisible = visibleItems.has(index)
              const isLeft = index % 2 === 0

              return (
                <div
                  key={event.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Mobile & Desktop Layout */}
                  <div className={`flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}>
                    {/* Content Card */}
                    <div className={`flex-1 ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    } pl-16 md:pl-0 text-left`}>
                      <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border-l-4 ${styles.card} transform hover:scale-105 cursor-default`}>
                        {/* Date Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${styles.badge}`}>
                          <span className="text-xl">{event.icon}</span>
                          <span>{event.date}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                      <div className={`w-6 h-6 rounded-full border-4 ${styles.dot} shadow-lg z-10 transition-transform duration-300 ${
                        isVisible ? 'scale-100' : 'scale-0'
                      }`}>
                        {/* Pulse animation for current/future events */}
                        {(event.type === 'advocacy' || event.type === 'future') && isVisible && (
                          <div className={`absolute inset-0 rounded-full ${styles.dot} animate-ping opacity-75`}></div>
                        )}
                      </div>
                    </div>

                    {/* Spacer for desktop */}
                    <div className="hidden md:block flex-1"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-secondary/10 rounded-2xl p-8 md:p-12 shadow-inner">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
              Be Part of This Journey
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Every story shared, every voice raised, every action taken brings us closer to meaningful change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#advocacy"
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Take Action Today
              </a>
              <a
                href="#guestbook"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-secondary border-2 border-secondary font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Share Your Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
