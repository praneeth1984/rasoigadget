export default function TransformationGallery() {
  const transformations = [
    {
      name: "Priya S.",
      location: "Mumbai",
      timeframe: "8 weeks",
      results: {
        weight: { before: "85 kg", after: "73 kg", change: "-12 kg" },
        energy: { before: "Low", after: "High", change: "+80%" },
        cholesterol: { before: "240", after: "180", change: "-60 pts" }
      },
      quote: "I feel like a completely different person!",
      image: "PS"
    },
    {
      name: "Rajesh P.",
      location: "Bangalore",
      timeframe: "3 weeks",
      results: {
        bloating: { before: "Daily", after: "None", change: "100%" },
        sleep: { before: "5 hrs", after: "8 hrs", change: "+3 hrs" },
        energy: { before: "Low", after: "High", change: "+70%" }
      },
      quote: "My gut health transformed completely",
      image: "RP"
    },
    {
      name: "Anita D.",
      location: "Delhi",
      timeframe: "6 weeks",
      results: {
        weight: { before: "78 kg", after: "69 kg", change: "-9 kg" },
        skin: { before: "Dull", after: "Glowing", change: "Clear" },
        mood: { before: "Stressed", after: "Calm", change: "+90%" }
      },
      quote: "My clients notice the difference in me!",
      image: "AD"
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <div className="inline-block bg-emerald/20 px-4 py-2 rounded-full mb-4">
          <p className="text-emerald font-bold text-sm">REAL TRANSFORMATIONS</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          See The Results For Yourself
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Real people, real results, real transformations in just weeks
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {transformations.map((person, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-dark-elevated to-dark-card rounded-2xl p-6 border-2 border-emerald/30 hover:border-emerald/50 transition-all"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald to-emerald-dark text-white flex items-center justify-center font-bold text-xl">
                {person.image}
              </div>
              <div>
                <p className="font-bold text-text-primary text-lg">{person.name}</p>
                <p className="text-text-muted text-sm">{person.location}</p>
                <div className="bg-gold/20 px-2 py-1 rounded-full inline-block mt-1">
                  <p className="text-gold text-xs font-semibold">
                    ⏱️ {person.timeframe}
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4 mb-6">
              {Object.entries(person.results).map(([key, value], idx) => (
                <div key={idx} className="bg-dark-surface rounded-lg p-4">
                  <p className="text-text-muted text-xs uppercase tracking-wide mb-2 capitalize">
                    {key}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <p className="text-text-secondary text-sm mb-1">Before</p>
                      <p className="text-urgent-red font-bold">{value.before}</p>
                    </div>
                    <div className="px-3">
                      <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-text-secondary text-sm mb-1">After</p>
                      <p className="text-emerald font-bold">{value.after}</p>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="bg-emerald/20 text-emerald px-3 py-1 rounded-full text-xs font-bold">
                      {value.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-r from-royal-purple/20 to-gold/20 rounded-lg p-4 border border-gold/30">
              <p className="text-text-primary italic text-sm">
                "{person.quote}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-emerald/20 to-gold/20 rounded-xl p-8 border-2 border-emerald/30">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-4xl font-bold text-emerald mb-2">2,847+</p>
            <p className="text-text-secondary">Success Stories</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gold mb-2">-12kg</p>
            <p className="text-text-secondary">Average Weight Loss</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-royal-purple mb-2">21 Days</p>
            <p className="text-text-secondary">Average to See Results</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-emerald mb-2">4.9/5</p>
            <p className="text-text-secondary">Customer Rating</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <p className="text-text-primary font-bold text-xl mb-2">
          Your transformation starts today
        </p>
        <p className="text-text-secondary">
          Join thousands who've already changed their lives with Satvik cooking
        </p>
      </div>
    </div>
  );
}
