import { useState, useEffect } from 'react';

const ImpactMetrics = () => {
  // Real verified milestones only - no fabricated numbers
  const metrics = [
    {
      icon: '🎤',
      label: 'Congressional Testimony',
      format: 'Sep 29, 2025',
      color: 'from-purple-500 to-pink-500',
      description: 'Stephen Federico testified before House Judiciary Subcommittee in Charlotte, NC'
    },
    {
      icon: '📰',
      label: 'Major News Outlets',
      format: '15+',
      color: 'from-primary to-pink-600',
      description: 'Coverage from ABC News, Fox News, WBTV, and more'
    },
    {
      icon: '⚖️',
      label: 'Death Penalty Sought',
      format: 'Oct 2, 2025',
      color: 'from-secondary to-teal-600',
      description: 'SC Attorney General Alan Wilson calls for death penalty in Logan\'s case'
    },
    {
      icon: '🕯️',
      label: 'Memorial Attendance',
      format: '200+',
      color: 'from-amber-500 to-orange-600',
      description: 'Community members attended Logan\'s celebration of life in pink'
    }
  ];

  return (
    <section id="impact" className="section-container relative bg-gradient-to-b from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-secondary mb-4">Our Impact</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-pink-500 to-secondary mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Together, we're creating real change. Here's what we've accomplished in Logan's memory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${metric.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                <div className="relative text-center">
                  <span className="text-5xl block mb-3">{metric.icon}</span>
                  <div className="text-2xl md:text-3xl font-bold font-display drop-shadow-lg">
                    {metric.format}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-gray-900 mb-2 text-center">
                  {metric.label}
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  {metric.description}
                </p>
              </div>

              <div className="h-1 bg-gray-200">
                <div className={`h-full bg-gradient-to-r ${metric.color}`} style={{ width: '100%' }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-secondary via-teal-700 to-secondary-dark rounded-2xl shadow-2xl p-8 md:p-12 text-white">
          <h3 className="heading-3 mb-8 text-center drop-shadow">The Fight Continues</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl">⚖️</div>
              <div className="text-2xl font-bold mb-2">Justice for Logan</div>
              <p className="text-sm opacity-90">Alexander Dickey faces 12 charges including murder, indicted June 25, 2025</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl">📢</div>
              <div className="text-2xl font-bold mb-2">Advocacy for Reform</div>
              <p className="text-sm opacity-90">Fighting for stricter bail requirements and accountability for repeat offenders</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl">💝</div>
              <div className="text-2xl font-bold mb-2">Logan's Legacy</div>
              <p className="text-sm opacity-90">Ensuring no other family suffers this preventable tragedy</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 text-lg mb-6">Logan's story has reached millions. Help us turn awareness into action.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#advocacy" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Join the Movement
            </a>
            <a href="#media" className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              View Media Coverage
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
