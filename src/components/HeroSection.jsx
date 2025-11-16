const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-50 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12">
        {/* Hero Image Placeholder */}
        <div className="mb-8 md:mb-12">
          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full bg-gradient-to-br from-primary via-pink-400 to-primary-dark shadow-2xl flex items-center justify-center border-4 border-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
            <div className="relative text-white text-center">
              <div className="text-6xl mb-2">✨</div>
              <div className="text-sm font-medium">Photo Coming Soon</div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="heading-1 text-gray-900 mb-6">
          Justice for Logan Federico
        </h1>

        {/* Quote/Tagline */}
        <p className="text-xl md:text-2xl text-gray-700 font-serif italic mb-8 max-w-3xl mx-auto leading-relaxed">
          "Logan didn't just exist. She lived boldly, embracing life's adventures with open and enthusiastic arms."
        </p>

        {/* Dates */}
        <p className="text-lg text-gray-600 mb-12 font-medium">
          Forever in our hearts • May 3, 2025
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#about"
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Learn Her Story
          </a>
          <a 
            href="#advocacy"
            className="px-8 py-4 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Take Action
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 animate-bounce">
          <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

