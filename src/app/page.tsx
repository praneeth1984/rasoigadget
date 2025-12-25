import BuyButton from "@/components/BuyButton";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import Header from "@/components/Header";
import CountdownTimer from "@/components/CountdownTimer";
import FloatingCTA from "@/components/FloatingCTA";
import EmailCapture from "@/components/EmailCapture";
import TrustBadges from "@/components/TrustBadges";
import SatvikBenefits from "@/components/SatvikBenefits";
import FoodGallery from "@/components/FoodGallery";
import TransformationGallery from "@/components/TransformationGallery";
import LifestyleBenefits from "@/components/LifestyleBenefits";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const settings = await prisma.setting.findMany();
  const settingsStore = settings.reduce((acc: Record<string, string>, curr: { key: string; value: string }) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  const productImage = settingsStore.productImage || "https://rasoigadget.com/cdn/shop/files/satvik.jpg?v=1760810999&width=1200";

  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />
      <FloatingCTA />

      {/* Hero Section - OPTIMIZED */}
      <section className="bg-gradient-to-b from-dark-bg via-dark-surface to-dark-bg py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-royal-purple rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Urgency Banner */}
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-urgent-red to-urgent-orange border border-urgent-red/50 rounded-full px-6 py-2 animate-pulse">
              <p className="text-white font-bold text-sm md:text-base">
                🔥 FLASH SALE: 83% OFF - Ends in Hours!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Column */}
            <div className="order-2 md:order-1">
              {/* HEADLINE */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 md:mb-6 leading-tight text-center md:text-left">
                Lose Weight, Boost Energy & Heal Your Gut in 21 Days{" "}
                <span className="bg-gradient-to-r from-royal-purple-light to-gold bg-clip-text text-transparent">
                  with 250+ Ancient Satvik Recipes
                </span>
              </h1>
              
              {/* SUBHEADLINE */}
              <p className="text-lg md:text-2xl text-text-secondary mb-6 leading-relaxed text-center md:text-left">
                No Onion. No Garlic. No Refined Sugar. Just 100% pure, delicious meals that actually work.
              </p>

              {/* Trust Badges - Hidden on mobile for brevity */}
              <div className="mb-6 hidden md:block">
                <TrustBadges />
              </div>
              
              {/* Key Benefits */}
              <ul className="space-y-3 mb-8">
                {[
                  "100 Main Meals (Breakfast, Lunch & Dinner)",
                  "100 High-Protein Satvik Recipes (Sattu, Sprouts, Grains)",
                  "50 Guilt-Free Desserts (Zero Refined Sugar)",
                  "Bonus: 30-Day Meal Planner + Kids Guide"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-text-secondary text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* IMPROVED PRICE POSITIONING */}
              <div className="bg-gradient-to-br from-dark-elevated to-dark-card border-2 border-gold/50 rounded-xl p-4 md:p-6 mb-6 shadow-xl relative overflow-hidden">
                {/* Mobile Savings Tag */}
                <div className="md:hidden absolute top-0 right-0 bg-urgent-red text-white px-3 py-1 text-[10px] font-bold rounded-bl-lg">
                  83% OFF
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-text-muted text-xs md:text-sm mb-1 uppercase tracking-wider">Complete 3-Book Collection</p>
                  <div className="flex items-center justify-center gap-3 mb-1 md:mb-2">
                    <span className="text-xl md:text-2xl line-through text-text-muted opacity-60">₹2,997</span>
                    <span className="hidden md:inline-block bg-urgent-red text-white px-3 py-1 rounded-full text-sm font-bold">83% OFF</span>
                  </div>
                  <p className="text-4xl md:text-6xl font-bold text-gold mb-1 md:mb-2">₹499</p>
                  <p className="text-emerald font-semibold text-lg md:text-xl">
                    Save ₹2,498 Today!
                  </p>
                </div>

                {/* IMPROVED CTA */}
                <BuyButton size="large" className="w-full mb-3 text-base md:text-lg">
                  Yes! Send Me The Collection →
                </BuyButton>
                <p className="text-center text-text-muted text-[10px] md:text-sm">
                  ✓ Instant Download • ✓ 30-Day Guarantee
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="order-1 md:order-2 space-y-4 md:space-y-6">
              {/* Countdown Timer - Scaled for mobile */}
              <div className="transform scale-90 md:scale-100">
                <CountdownTimer />
              </div>

              {/* Book Preview */}
              <div className="relative">
                <div className="bg-gradient-to-br from-dark-elevated to-dark-surface rounded-2xl shadow-2xl p-4 md:p-8 backdrop-blur border-2 border-royal-purple/30">
                  <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-xl bg-dark-surface/50 max-w-[280px] md:max-w-none mx-auto">
                    <Image
                      src={productImage}
                      alt="The Satvik 3-Book Collection"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Social Proof */}
                  <div className="text-center space-y-1 md:space-y-2">
                    <div className="flex items-center justify-center gap-0.5 md:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-text-primary font-semibold text-sm md:text-base">
                      ⭐ 4.9/5 from 2,847 verified buyers
                    </p>
                  </div>
                </div>
                
                {/* Floating badge - Fixed for mobile overflow */}
                <div className="absolute -top-4 -right-2 md:-right-4 bg-gradient-to-br from-urgent-red to-urgent-orange text-white rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-lg transform rotate-12 pulse-glow z-20">
                  <div className="text-center">
                    <p className="text-[10px] md:text-xs font-semibold">SAVE</p>
                    <p className="text-2xl md:text-3xl font-bold">83%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <Section background="dark">
        <div className="max-w-4xl mx-auto">
          <EmailCapture />
        </div>
      </Section>

      {/* Satvik Benefits - VISUAL INFOGRAPHIC */}
      <Section background="darker">
        <SatvikBenefits />
      </Section>

      {/* Food Gallery - VISUAL APPEAL */}
      <Section background="dark">
        <FoodGallery />
      </Section>

      {/* Lifestyle Benefits */}
      <LifestyleBenefits />

      {/* What's Inside - CONDENSED */}
      <Section background="darker" id="features">
        <SectionTitle subtitle="Everything you need to transform your health through food">
          What's Inside The Collection
        </SectionTitle>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              number: "01",
              title: "Satvik Foundations",
              pages: "186 pages • 50+ recipes",
              highlight: "Perfect for Beginners",
              features: [
                "Understanding Satvik principles",
                "Essential ingredients & setup",
                "Daily breakfast, lunch & dinner",
                "Step-by-step guides"
              ]
            },
            {
              number: "02",
              title: "Celebration & Festivities",
              pages: "214 pages • 60+ recipes",
              highlight: "Special Occasions",
              features: [
                "Traditional festival recipes",
                "Satvik desserts & treats",
                "Entertaining guests",
                "Seasonal celebrations"
              ]
            },
            {
              number: "03",
              title: "Daily Wellness",
              pages: "192 pages • 40+ recipes",
              highlight: "Optimize Health",
              features: [
                "Healing recipes for ailments",
                "Energy-boosting meals",
                "Detox protocols",
                "Meal prep strategies"
              ]
            }
          ].map((book, index) => (
            <div key={index} className="bg-dark-elevated rounded-2xl p-6 shadow-lg border border-royal-purple/20 hover:border-gold/50 transition-all">
              <div className="text-4xl font-bold text-gold/30 mb-2">{book.number}</div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">{book.title}</h3>
              <div className="bg-gold/20 px-3 py-1 rounded-full inline-block text-gold text-sm font-semibold mb-3">
                {book.highlight}
              </div>
              <p className="text-text-muted text-sm mb-4">{book.pages}</p>
              <ul className="space-y-2">
                {book.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-text-secondary text-sm">
                    <svg className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center">
          <BuyButton size="large">Get All 3 Books for ₹499 →</BuyButton>
          <p className="text-gold font-semibold mt-4 text-lg">⚡ Price increases when timer hits zero!</p>
        </div>
      </Section>

      {/* Testimonials - IMPROVED WITH SPECIFICS */}
      <Section background="dark" id="testimonials">
        <SectionTitle subtitle="Real transformations from real people">
          Success Stories
        </SectionTitle>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              name: "Priya Sharma",
              role: "Yoga Instructor, Mumbai",
              image: "PS",
              rating: 5,
              result: "Lost 12 kg in 8 weeks",
              text: "I lost 12 kg in just 8 weeks and my energy levels are incredible! My cholesterol dropped from 240 to 180. The recipes are so easy to follow, even my husband started cooking!"
            },
            {
              name: "Rajesh Patel",
              role: "Software Engineer, Bangalore",
              image: "RP",
              rating: 5,
              result: "Bloating gone in 3 weeks",
              text: "Within 3 weeks, my chronic bloating completely disappeared and I sleep like a baby. The step-by-step guides made it easy even for a beginner like me. Best investment ever!"
            },
            {
              name: "Anita Desai",
              role: "Nutritionist, Delhi",
              image: "AD",
              rating: 5,
              result: "Recommends to all clients",
              text: "I recommend this to ALL my clients. It's the perfect blend of ancient wisdom and practical application. My clients see results in 2-3 weeks consistently. Worth every rupee!"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-dark-elevated rounded-xl p-6 border-2 border-emerald/30 hover:border-emerald/50 transition">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="bg-gold/20 px-3 py-1 rounded-full inline-block text-gold text-sm font-bold mb-3">
                ✓ {testimonial.result}
              </div>
              <p className="text-text-secondary mb-4 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-royal-purple to-royal-purple-light text-white flex items-center justify-center font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{testimonial.name}</p>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-text-secondary mb-4 text-lg">Join 2,847+ people who transformed their health this month</p>
          <BuyButton size="large">Start Your Transformation Today →</BuyButton>
        </div>
      </Section>

      {/* Transformation Gallery - BEFORE/AFTER RESULTS */}
      <Section background="darker">
        <TransformationGallery />
      </Section>

      {/* Bonuses - WITH URGENCY */}
      <Section background="darker">
        <div className="bg-gradient-to-r from-urgent-red/20 to-urgent-orange/20 border-2 border-urgent-red/50 rounded-2xl p-6 md:p-8 mb-8">
          <div className="text-center mb-6">
            <p className="text-urgent-red font-bold text-xl md:text-2xl mb-2">
              ⏰ ORDER IN THE NEXT 4 HOURS TO GET THESE BONUSES:
            </p>
            <p className="text-text-muted">These bonuses disappear when the timer hits zero!</p>
          </div>
        </div>

        <SectionTitle subtitle="Get ₹500 worth of bonuses absolutely FREE">
          Exclusive Bonuses Included
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {[
            {
              title: "Monthly Satvik Meal Planner",
              value: "₹250",
              description: "The complete blueprint for your daily Satvik journey. Just open and follow!"
            },
            {
              title: "Kids Special Satvik Guide",
              value: "₹250",
              description: "Ancient nutrition for the modern generation. Kid-approved healthy recipes!"
            }
          ].map((bonus, index) => (
            <div key={index} className="bg-dark-elevated rounded-xl p-6 border-2 border-gold/30 relative overflow-hidden hover:border-gold/50 transition">
              <div className="absolute top-4 right-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-bold">
                {bonus.value}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2 pr-24">{bonus.title}</h3>
              <p className="text-text-secondary">{bonus.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center bg-dark-elevated rounded-xl p-8 max-w-2xl mx-auto border-2 border-royal-purple/30 mb-8">
          <p className="text-4xl font-bold text-text-primary mb-2">
            Total Value: <span className="text-gold">₹3,497</span>
          </p>
          <p className="text-2xl text-text-primary mb-4">
            Your Price Today: Only <span className="text-gold font-bold">₹499</span>
          </p>
          <p className="text-emerald font-semibold text-xl mb-6">
            You Save ₹2,998 (86% OFF)!
          </p>
          <BuyButton size="large" className="pulse-glow">
            Claim Your Bonuses Now →
          </BuyButton>
        </div>
      </Section>

      {/* Guarantee */}
      <Section background="dark">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-dark-elevated rounded-2xl p-8 md:p-12 shadow-xl border-2 border-emerald/30">
            <div className="w-20 h-20 mx-auto mb-6 bg-emerald rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              100% Risk-Free <span className="text-emerald">30-Day Guarantee</span>
            </h2>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              Try the Satvik 3-Book Collection for 30 days. If you don't feel more energized, see improved digestion, or absolutely love the recipes, simply email us for a full refund - no questions asked.
            </p>
            <p className="text-text-primary font-semibold mb-8 text-xl">
              You have nothing to lose and a lifetime of healthy eating to gain!
            </p>
            <BuyButton size="large">Get Started Risk-Free →</BuyButton>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="purple" className="text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 2,847+ people who started their journey this month
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">You Get Everything:</h3>
                <ul className="space-y-2 text-white/90">
                  {[
                    "Satvik 4-in-1 Meal Book (Main Guide)",
                    "Satvik Protein Book (Health & Muscle)",
                    "Satvik Dessert Book (Daily Treats)",
                    "2 Exclusive Planners (Bonus)",
                    "30-day money-back guarantee"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <p className="text-white/80 mb-2">One-Time Payment</p>
                <p className="text-6xl font-bold text-white mb-2">₹499</p>
                <p className="text-white/70 line-through mb-4 text-lg">₹3,497</p>
                <div className="bg-gold/20 border border-gold/50 rounded-lg p-3 mb-4">
                  <p className="text-white text-sm font-semibold">⚡ 83% OFF Ends Soon!</p>
                </div>
              </div>
            </div>
          </div>
          
          <BuyButton size="large" variant="primary" className="pulse-glow text-xl px-12 py-6">
            Yes! Send Me The Complete Collection →
          </BuyButton>
          <p className="text-white/70 mt-6">
            ✓ Instant Download • ✓ Secure Checkout • ✓ 30-Day Guarantee
          </p>
        </div>
      </Section>

      {/* Footer - Simplified */}
      <footer className="bg-dark-surface border-t border-royal-purple/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="relative h-16 w-64 mb-6">
                <Image
                  src="https://rasoigadget.com/cdn/shop/files/Updated_Logo-removebg-preview.png?height=82&v=1758460383"
                  alt="Rasoi Gadget"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-text-muted mb-4">
                Transforming lives through ancient Satvik wisdom.
              </p>
            </div>
            <div>
              <h4 className="text-text-primary font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#" className="hover:text-text-primary transition">Contact</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-text-primary font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#" className="hover:text-text-primary transition">Refund Policy</a></li>
                <li><a href="#" className="hover:text-text-primary transition">Technical Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-royal-purple/20 pt-8 text-center">
            <p className="text-text-muted text-sm">
              © 2025 Rasoi Gadget. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
