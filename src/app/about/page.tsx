import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="pt-24 pb-16">
        <Section>
          <div className="max-w-4xl mx-auto">
            <SectionTitle subtitle="Our Journey & Philosophy">
              About Rasoi Gadget
            </SectionTitle>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-text-secondary mb-6">
                Welcome to Rasoi Gadget, where ancient wisdom meets modern health. Our mission is to simplify the Satvik lifestyle and make it accessible to everyone, regardless of how busy their modern lives might be.
              </p>

              <h2 className="text-2xl font-bold text-satvik-green mt-12 mb-4">Our Mission</h2>
              <p className="text-text-secondary mb-6">
                We believe that food is not just fuel, but the foundation of our physical energy and mental clarity. Our goal is to empower thousands of people to reclaim their health, heal their gut, and feel more alive through the power of Satvik nutrition – all without sacrificing taste or spending hours in the kitchen.
              </p>

              <h2 className="text-2xl font-bold text-satvik-green mt-12 mb-4">Why Satvik?</h2>
              <p className="text-text-secondary mb-6">
                Satvik food is fresh, light, and full of Prana (life force). It is traditionally prepared without onion, garlic, or refined ingredients. By following a Satvik diet, many experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-8">
                <li>Higher sustained energy levels throughout the day</li>
                <li>Improved digestion and zero bloating</li>
                <li>Greater mental clarity and reduced brain fog</li>
                <li>Natural weight management</li>
              </ul>

              <h2 className="text-2xl font-bold text-satvik-green mt-12 mb-4">The Rasoi Gadget Difference</h2>
              <p className="text-text-secondary mb-6">
                We don't just provide recipes; we provide a system. Our ebooks are the result of months of research, combining traditional Ayurvedic principles with modern nutritional needs. Whether you're looking for high-protein options, kid-friendly meals, or guilt-free desserts, we've got you covered.
              </p>

              <div className="bg-gradient-to-br from-royal-purple/20 to-gold/10 p-8 rounded-2xl border border-gold/20 mt-12">
                <p className="text-xl font-medium text-text-primary italic text-center">
                  "Your kitchen is your first pharmacy, and your food is your first medicine."
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
