import { useState, useEffect } from 'react';

const ImpactMetrics = () => {
  const [animatedValues, setAnimatedValues] = useState({
    mediaReach: 0,
    petitionSignatures: 0,
    donations: 0,
    volunteers: 0,
    events: 0,
    legislators: 0
  });

  const targets = {
    mediaReach: 5200000,
    petitionSignatures: 47350,
    donations: 125000,
    volunteers: 892,
    events: 34,
    legislators: 18
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues({
        mediaReach: Math.floor(targets.mediaReach * progress),
        petitionSignatures: Math.floor(targets.petitionSignatures * progress),
        donations: Math.floor(targets.donations * progress),
        volunteers: Math.floor(targets.volunteers * progress),
        events: Math.floor(targets.events * progress),
        legislators: Math.floor(targets.legislators * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const metrics = [
    {
      icon: '📺',
      label: 'Media Reach',
      value: animatedValues.mediaReach,
      format: formatNumber(animatedValues.mediaReach),
      color: 'from-purple-500 to-pink-500',
      description: 'People reached through media coverage'
    },
    {
      icon: '✍️',
      label: 'Petition Signatures',
      value: animatedValues.petitionSignatures,
      format: formatNumber(animatedValues.petitionSignatures),
      color: 'from-primary to-pink-600',
      description: 'Support for criminal justice reform'
    },
    {
      icon: '💰',
      label: 'Funds Raised',
      value: animatedValues.donations,
      format: '$' + formatNumber(animatedValues.donations),
      color: 'from-green-500 to-emerald-600',
      description: 'Supporting advocacy and family'
    },
    {
      icon: '🤝',
      label: 'Volunteers',
      value: animatedValues.volunteers,
      format: animatedValues.volunteers.toLocaleString(),
      color: 'from-secondary to-teal-600',
      description: 'Active advocates for change'
    },
    {
      icon: '📅',
      label: 'Events Held',
      value: animatedValues.events,
      format: animatedValues.events.toString(),
      color: 'from-blue-500 to-indigo-600',
      description: 'Vigils, meetings, and advocacy events'
    },
    {
      icon: '🏛️',
      label: 'Legislators Contacted',
      value: animatedValues.legislators,
      format: animatedValues.legislators.toString(),
      color: 'from-amber-500 to-orange-600',
      description: 'South Carolina lawmakers engaged'
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${metric.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                <div className="relative flex items-center justify-between">
                  <span className="text-5xl">{metric.icon}</span>
                  <div className="text-right">
                    <div className="text-4xl md:text-5xl font-bold font-display mb-1 drop-shadow-lg">
                      {metric.format}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                  {metric.label}
                </h3>
                <p className="text-gray-600 text-sm">
                  {metric.description}
                </p>
              </div>

              <div className="h-1 bg-gray-200">
                <div className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-2000`} style={{ width: '100%' }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-secondary via-teal-700 to-secondary-dark rounded-2xl shadow-2xl p-8 md:p-12 text-white">
          <h3 className="heading-3 mb-8 text-center drop-shadow">Key Milestones</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl">🎤</div>
              <div className="text-2xl font-bold mb-2">Congressional Testimony</div>
              <p className="text-sm opacity-90">Stephen shared Logan's story before the House Judiciary Subcommittee</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl">📰</div>
              <div className="text-2xl font-bold mb-2">National Media Coverage</div>
              <p className="text-sm opacity-90">Featured on major news outlets across the country</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl">📜</div>
              <div className="text-2xl font-bold mb-2">Legislative Review</div>
              <p className="text-sm opacity-90">SC lawmakers reviewing bail reform legislation</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-3xl">🌟</div>
              <div className="text-2xl font-bold mb-2">National Coalition</div>
              <p className="text-sm opacity-90">Building a movement for systemic change</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 text-lg mb-6">These numbers represent real change, but our work isn't done.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#advocacy" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Join the Movement
            </a>
            <a href={import.meta.env.VITE_PETITION_URL || '#advocacy'} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Sign the Petition
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
