import { useState, useEffect } from 'react'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary'
import HeroSection from './components/HeroSection'
import AboutLogan from './components/AboutLogan'
import MemoryWall from './components/MemoryWall'
import Timeline from './components/Timeline'
import Testimonials from './components/Testimonials'
import MediaCoverage from './components/MediaCoverage'
import ImpactMetrics from './components/ImpactMetrics'
import BlogUpdates from './components/BlogUpdates'
import Advocacy from './components/Advocacy'
import Resources from './components/Resources'
import AdvocacyToolkit from './components/AdvocacyToolkit'
import EventsCalendar from './components/EventsCalendar'
import InteractiveMap from './components/InteractiveMap'
import PressKit from './components/PressKit'
import MediaBooking from './components/MediaBooking'
import Guestbook from './components/Guestbook'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import { initializeAnalytics, trackPageView } from './utils/analytics'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Initialize Google Analytics
    initializeAnalytics()
    trackPageView(window.location.pathname)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      // Close mobile menu on scroll
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#memory-wall', label: 'Memories' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#media', label: 'Media' },
    { href: '#impact', label: 'Impact' },
    { href: '#blog', label: 'Updates' },
    { href: '#advocacy', label: 'Take Action' },
    { href: '#resources', label: 'Resources' },
    { href: '#events', label: 'Events' },
    { href: '#booking', label: 'Media Inquiries' }
  ]

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        {/* Fixed Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm shadow-sm'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              <a href="#home" className="text-xl md:text-2xl font-display font-bold text-secondary">
                Justice for Logan
              </a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex space-x-6">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="nav-link">
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutLogan />
          <MemoryWall />
          <Timeline />
          <Testimonials />
          <MediaCoverage />
          <ImpactMetrics />
          <BlogUpdates />
          <Advocacy />
          <Resources />
          <AdvocacyToolkit />
          <EventsCalendar />
          <InteractiveMap />
          <PressKit />
          <MediaBooking />
          <Guestbook />
          <Newsletter variant="dark" />
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
