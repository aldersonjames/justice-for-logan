import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MemoriesPage from './pages/MemoriesPage'
import MediaPage from './pages/MediaPage'
import AdvocacyPage from './pages/AdvocacyPage'
import EventsPage from './pages/EventsPage'
import ContactPage from './pages/ContactPage'
import { initializeAnalytics, trackPageView } from './utils/analytics'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    trackPageView(pathname)
  }, [pathname])

  return null
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initializeAnalytics()
  }, [])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <ScrollToTop />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/memories" element={<MemoriesPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/advocacy" element={<AdvocacyPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
