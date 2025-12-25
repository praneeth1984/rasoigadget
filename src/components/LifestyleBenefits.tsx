export default function LifestyleBenefits() {
  const benefits = [
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
      title: "Learn Ancient Wisdom",
      description: "Master 5,000+ years of Ayurvedic knowledge made simple for modern life",
      color: "from-royal-purple to-royal-purple-light"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      title: "Cook with Love",
      description: "Transform meal prep into a mindful, joyful practice that nourishes body and soul",
      color: "from-urgent-red to-urgent-orange"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      title: "Share with Family",
      description: "Bring your loved ones together with meals that everyone will enjoy and benefit from",
      color: "from-gold to-gold-dark"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      title: "Boost Energy Naturally",
      description: "Say goodbye to afternoon crashes and hello to sustained energy all day long",
      color: "from-emerald to-emerald-dark"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
      ),
      title: "Heal from Within",
      description: "Address root causes of health issues naturally through food as medicine",
      color: "from-burgundy to-burgundy-light"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      title: "Feel Amazing",
      description: "Experience mental clarity, better mood, and overall wellbeing that radiates outward",
      color: "from-gold-light to-gold"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-dark-bg to-dark-surface py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-royal-purple/20 px-4 py-2 rounded-full mb-4">
            <p className="text-royal-purple-light font-bold text-sm">LIFESTYLE TRANSFORMATION</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            More Than Just Recipes - It's a Way of Life
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Satvik cooking transforms not just your meals, but your entire relationship with food and health
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-dark-elevated rounded-2xl p-6 md:p-8 border border-royal-purple/20 hover:border-gold/50 transition-all hover:transform hover:-translate-y-2"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {benefit.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="bg-gradient-to-r from-royal-purple/20 via-gold/20 to-emerald/20 rounded-2xl p-8 md:p-12 border-2 border-gold/30 text-center">
          <div className="max-w-3xl mx-auto">
            <svg className="w-12 h-12 text-gold mx-auto mb-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <blockquote className="text-2xl md:text-3xl font-bold text-text-primary mb-4 italic">
              "Let food be thy medicine and medicine be thy food"
            </blockquote>
            <p className="text-text-secondary text-lg">
              - Ancient Ayurvedic Wisdom
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-dark-elevated px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-text-secondary">5,000+ years proven</span>
              </div>
              <div className="flex items-center gap-2 bg-dark-elevated px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-text-secondary">Science-backed</span>
              </div>
              <div className="flex items-center gap-2 bg-dark-elevated px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-royal-purple" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-text-secondary">Easy to follow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
