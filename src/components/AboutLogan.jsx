const AboutLogan = () => {
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
          {/* Photo Gallery Placeholder */}
          <div className="space-y-4">
            <div className="relative bg-gradient-to-br from-primary via-pink-400 to-primary-dark rounded-2xl shadow-2xl overflow-hidden aspect-square flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
              <div className="relative text-center text-white p-8">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-lg font-medium">Main Photo Coming Soon</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative bg-gradient-to-br from-secondary via-teal-600 to-secondary-light rounded-lg shadow-lg aspect-square flex items-center justify-center transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                  <span className="relative text-white text-2xl">📷</span>
                </div>
              ))}
            </div>
          </div>

          {/* Biography Content */}
          <div className="space-y-6">
            <div>
              <h3 className="heading-3 text-secondary mb-4">A Life of Love, Loyalty, and Light</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Logan Federico was more than a name in a news story—she was a vibrant young woman whose spirit touched everyone she met. Born and raised in Waxhaw, North Carolina, Logan approached life with infectious enthusiasm and unwavering loyalty to those she loved.
              </p>
              <p className="text-gray-700 leading-relaxed">
                [Add more biographical details here - education, aspirations, personality traits, what made her special]
              </p>
            </div>

            {/* Her Passions */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center">
                <div className="bg-secondary text-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-2">
                  🦅
                </div>
                <h4 className="font-semibold text-sm text-secondary">Eagles Fan</h4>
                <p className="text-xs text-gray-600">Die-hard Philadelphia Eagles supporter</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-2">
                  ✨
                </div>
                <h4 className="font-semibold text-sm text-primary-dark">Swiftie Forever</h4>
                <p className="text-xs text-gray-600">Devoted Taylor Swift fan</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-600 text-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-2">
                  ❤️
                </div>
                <h4 className="font-semibold text-sm text-secondary">Family First</h4>
                <p className="text-xs text-gray-600">Unshakeable family loyalty</p>
              </div>
            </div>

            {/* Key Attributes */}
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary">
              <p className="text-gray-700 italic leading-relaxed">
                "Logan's love for her family was legendary. She was fiercely protective, endlessly supportive, and the first to celebrate every victory—no matter how small."
              </p>
              <p className="text-right text-sm text-gray-600 mt-2">— Family & Friends</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutLogan

