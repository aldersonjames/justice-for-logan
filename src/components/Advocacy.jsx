import { config } from '../utils/config'

const Advocacy = () => {
  return (
    <section id="advocacy" className="section-container relative bg-gradient-to-b from-blue-100 via-indigo-50 to-white overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 text-secondary mb-4">The Fight for Justice</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-blue-600 to-secondary-dark mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Logan's death was preventable. We're fighting for criminal justice reform in South Carolina to ensure no other family suffers this devastating loss.
          </p>
        </div>

        {/* The Problem */}
        <div className="relative bg-gradient-to-r from-secondary via-teal-700 to-secondary/90 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <h3 className="heading-3 mb-6">Logan's Case: A System Failure</h3>
          <p className="text-lg leading-relaxed mb-6">
            Logan Federico was killed by a man who should have been behind bars. Her alleged killer had 39 prior arrests and 25 felony charges on his record. South Carolina's bail system allowed him to walk free—with devastating consequences.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">39</div>
              <p className="text-sm mb-3">Prior arrests for Alexander Dickey before he killed Logan</p>
              <p className="text-xs opacity-75 italic">Verified from court records and testimony</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">25</div>
              <p className="text-sm mb-3">Felony charges on record—yet he remained free</p>
              <p className="text-xs opacity-75 italic">Verified from court records and testimony</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">140+</div>
              <p className="text-sm mb-3">Years he should have served for his crimes, according to Stephen Federico</p>
              <p className="text-xs opacity-75 italic">Based on Congressional testimony</p>
            </div>
          </div>
        </div>

        {/* What We're Fighting For */}
        <div className="mb-12">
          <h3 className="heading-3 text-secondary mb-8 text-center">What We're Fighting For</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary">
              <h4 className="font-bold text-lg text-secondary mb-3">🔒 Stricter Bail Requirements</h4>
              <p className="text-gray-700">
                Implement mandatory risk assessments and stricter criteria for releasing violent offenders before trial.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary">
              <h4 className="font-bold text-lg text-secondary mb-3">⚖️ Judicial Accountability</h4>
              <p className="text-gray-700">
                Hold judges accountable for bail decisions that result in reoffending and violence.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary">
              <h4 className="font-bold text-lg text-secondary mb-3">🛡️ Victim Protection</h4>
              <p className="text-gray-700">
                Prioritize victim and community safety over convenience in pre-trial release decisions.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary">
              <h4 className="font-bold text-lg text-secondary mb-3">📊 Transparency</h4>
              <p className="text-gray-700">
                Require public reporting of bail decisions and reoffending rates to inform policy changes.
              </p>
            </div>
          </div>
        </div>

        {/* How You Can Help */}
        <div className="relative bg-gradient-to-br from-primary via-pink-500 to-primary-dark rounded-2xl p-8 md:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="heading-3 text-white mb-8 text-center drop-shadow-sm">Take Action Today</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-4 shadow-xl transform hover:scale-110 transition-transform">
                  ✍️
                </div>
                <h4 className="font-bold mb-2 text-white drop-shadow">Sign the Petition</h4>
                <a href="#" className="text-white hover:text-gray-100 underline text-sm font-medium">Coming Soon</a>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-4 shadow-xl transform hover:scale-110 transition-transform">
                  📧
                </div>
                <h4 className="font-bold mb-2 text-white drop-shadow">Contact Legislators</h4>
                <a href="#" className="text-white hover:text-gray-100 underline text-sm font-medium">Get Template</a>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-4 shadow-xl transform hover:scale-110 transition-transform">
                  📢
                </div>
                <h4 className="font-bold mb-2 text-white drop-shadow">Share Logan's Story</h4>
                <a href="#" className="text-white hover:text-gray-100 underline text-sm font-medium">Share Now</a>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto flex items-center justify-center text-3xl mb-4 shadow-xl transform hover:scale-110 transition-transform">
                  💜
                </div>
                <h4 className="font-bold mb-2 text-white drop-shadow">Support the Family</h4>
                <a href={config.goFundMeUrl} className="text-white hover:text-gray-100 underline text-sm font-medium" target="_blank" rel="noopener noreferrer">GoFundMe</a>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-12 text-center">
          <h3 className="heading-3 text-secondary mb-6">Upcoming Events</h3>
          <p className="text-gray-600 mb-4">Stay tuned for vigils, community meetings, and legislative hearings</p>
          <div className="inline-block bg-gray-100 rounded-lg px-6 py-4 text-gray-700">
            <p className="font-semibold">Events calendar coming soon</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advocacy

