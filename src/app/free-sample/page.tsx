import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import BuyButton from '@/components/BuyButton';
import Header from '@/components/Header';
import Image from 'next/image';

export default function FreeSamplePage() {
  const sampleRecipes = [
    {
      title: "Moong Dal Cheela",
      book: "Volume 1: The Satvik Meal Book",
      description: "A protein-packed, savory pancake made from soaked split yellow moong dal. Perfect for a light yet energizing breakfast.",
      ingredients: [
        "1 cup split yellow moong dal (soaked for 2-3 hrs)",
        "1 tsp grated ginger",
        "2 tbsp finely chopped coriander",
        "1 tsp cumin seeds",
        "Rock salt (Sendha Namak) to taste",
        "Ghee for cooking"
      ],
      steps: [
        "Drain and blend moong dal with ginger and cumin into a smooth batter.",
        "Mix in chopped coriander and rock salt.",
        "Heat a tawa, pour a ladle of batter, and spread thinly.",
        "Cook with a little ghee until golden brown on both sides.",
        "Serve hot with green coriander chutney."
      ],
      tag: "Breakfast Hero"
    },
    {
      title: "Sattu Paratha",
      book: "Volume 2: The Satvik Protein Book",
      description: "An ancient high-protein flatbread filled with spiced roasted gram flour (Sattu). Sustainably keeps you full for hours.",
      ingredients: [
        "1 cup whole wheat flour (for dough)",
        "1/2 cup Sattu (Roasted Gram Flour)",
        "1/2 tsp Ajwain (Carom seeds)",
        "1 tsp Kalonji (Nigella seeds)",
        "Fresh lemon juice",
        "Chopped green chilies & coriander"
      ],
      steps: [
        "Knead a soft dough using wheat flour and water.",
        "Mix sattu with spices, lemon juice, chilies, and a drop of water to make a crumbly stuffing.",
        "Stuff a small ball of sattu mixture into the dough.",
        "Roll it out into a paratha and cook on a hot tawa with ghee.",
        "Pair with raw mango pickle or plain curd."
      ],
      tag: "Protein Power"
    },
    {
      title: "Date & Nut Bliss Balls",
      book: "Volume 3: Satvik Sweet Delights",
      description: "Zero refined sugar. Naturally sweetened with dates and packed with the crunch of almonds and cashews.",
      ingredients: [
        "1 cup soft pitted Dates",
        "1/2 cup Almonds",
        "1/2 cup Cashews",
        "1/4 cup grated Coconut",
        "1 tbsp Chia seeds"
      ],
      steps: [
        "Pulse almonds and cashews in a blender until coarsely chopped.",
        "Add dates and blend until a sticky dough forms.",
        "Fold in chia seeds and roll into small bite-sized balls.",
        "Coat the balls with grated coconut for a professional finish.",
        "Refrigerate for 15 minutes before serving."
      ],
      tag: "Guilt-Free Sweet"
    }
  ];

  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="pt-24 pb-16">
        <Section>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block bg-gold/20 px-4 py-2 rounded-full mb-4">
              <p className="text-gold font-bold text-sm tracking-widest uppercase">Your Free Gift</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              The Satvik <span className="text-satvik-green">Sampler</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Enjoy these 3 hand-picked recipes from our 250+ recipe collection. 
              Pure, healthy, and delicious.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {sampleRecipes.map((recipe, index) => (
              <div key={index} className="bg-dark-elevated rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-gradient-to-br from-satvik-green to-emerald p-8 flex flex-col justify-center text-white">
                  <span className="bg-white/20 backdrop-blur-sm self-start px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 tracking-wider">
                    {recipe.tag}
                  </span>
                  <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
                  <p className="text-white/80 text-sm font-medium italic mb-6">Found in {recipe.book}</p>
                  <div className="h-1 w-12 bg-white/40 rounded-full"></div>
                </div>
                
                <div className="md:w-2/3 p-8 md:p-12">
                  <p className="text-text-secondary mb-8 text-lg leading-relaxed italic">
                    "{recipe.description}"
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-satvik-green font-bold uppercase text-sm tracking-widest mb-4">Ingredients</h4>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i} className="text-text-primary flex items-start gap-2 text-sm">
                            <span className="text-gold">•</span> {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-satvik-green font-bold uppercase text-sm tracking-widest mb-4">Instructions</h4>
                      <ol className="space-y-3">
                        {recipe.steps.map((step, i) => (
                          <li key={i} className="text-text-secondary text-sm flex gap-3">
                            <span className="font-bold text-gold">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center bg-gradient-to-br from-royal-purple/20 to-gold/20 rounded-3xl p-8 md:p-16 border-2 border-gold/30">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Want the other 247+ Recipes?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Get the complete 3-Book Collection today for 83% OFF and start your 21-day health transformation.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <BuyButton size="large" className="px-12 py-6 text-xl shadow-2xl pulse-glow">
                Claim Full Collection Now →
              </BuyButton>
              <p className="text-text-muted text-sm italic">
                Don't forget to use your 10% discount code: <span className="text-gold font-bold">SATVIK10</span>
              </p>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
