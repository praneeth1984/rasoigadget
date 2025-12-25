export default function SatvikBenefits() {
  const benefits = [
    {
      icon: "⚡",
      title: "More Energy",
      description: "Feel energized throughout the day",
      timeframe: "Within 1 week",
      color: "from-gold to-gold-dark"
    },
    {
      icon: "🎯",
      title: "Better Digestion",
      description: "Reduce bloating & improve gut health",
      timeframe: "2-4 weeks",
      color: "from-emerald to-emerald-dark"
    },
    {
      icon: "💪",
      title: "Weight Loss",
      description: "Lose weight naturally & sustainably",
      timeframe: "3-8 weeks",
      color: "from-royal-purple to-royal-purple-dark"
    },
    {
      icon: "😴",
      title: "Better Sleep",
      description: "Fall asleep faster, wake refreshed",
      timeframe: "1-2 weeks",
      color: "from-burgundy to-burgundy-dark"
    },
    {
      icon: "✨",
      title: "Clearer Skin",
      description: "Natural glow from within",
      timeframe: "2-3 weeks",
      color: "from-gold to-gold-light"
    },
    {
      icon: "🧘",
      title: "Mental Clarity",
      description: "Improved focus & reduced stress",
      timeframe: "1-2 weeks",
      color: "from-emerald to-emerald-light"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-dark-elevated to-dark-card rounded-2xl p-4 md:p-12 border-2 border-gold/30">
      <div className="text-center mb-12">
        <div className="inline-block bg-gold/20 px-4 py-2 rounded-full mb-4">
          <p className="text-gold font-bold text-sm">PROVEN BENEFITS</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          What Happens When You Start Eating Satvik
        </h2>
        <p className="text-text-secondary text-lg">
          Real, measurable results backed by 5,000+ years of Ayurvedic wisdom
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="bg-dark-surface rounded-xl p-6 border border-royal-purple/20 hover:border-gold/50 transition-all hover:transform hover:scale-105"
          >
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {benefit.title}
            </h3>
            <p className="text-text-secondary mb-3">
              {benefit.description}
            </p>
            <div className="bg-emerald/20 border border-emerald/30 rounded-lg px-3 py-2 inline-block">
              <p className="text-emerald text-sm font-semibold">
                ⏱️ {benefit.timeframe}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-royal-purple/20 to-gold/20 rounded-xl p-6 border border-gold/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-text-primary font-bold text-xl mb-2">
              Start experiencing these benefits today
            </p>
            <p className="text-text-secondary">
              Join 2,847+ people who transformed their health this month
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Science-backed</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Proven results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
