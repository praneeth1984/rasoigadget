'use client';

import Header from '@/components/Header';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import BuyButton from '@/components/BuyButton';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const habits = [
  {
    title: "The Art of Early Rising",
    description: "Master the first two hours of your day. Learn how to create a morning ritual that fuels your energy and focus.",
    icon: "🌅",
    detail: "Day 1-4: Biological rhythm alignment."
  },
  {
    title: "Mindful Digital Detox",
    description: "Break the cycle of endless scrolling. Reclaim 2-3 hours of your day and reduce anxiety instantly.",
    icon: "📱",
    detail: "Day 5-9: Digital dopamine reset."
  },
  {
    title: "Movement for Mental Clarity",
    description: "Simple, powerful physical practices that clear brain fog and boost creative thinking.",
    icon: "🧘",
    detail: "Day 10-14: Neuro-functional movement."
  },
  {
    title: "Deep Work Mastery",
    description: "Learn to block time for what truly matters and eliminate distractions that steal your progress.",
    icon: "⚡",
    detail: "Day 15-19: Focus-state optimization."
  },
  {
    title: "Grateful Reflection",
    description: "A 5-minute evening habit that rewired your brain for positivity and better sleep quality.",
    icon: "🕯️",
    detail: "Day 20-23: Evening wind-down protocol."
  },
  {
    title: "Conscious Consumption",
    description: "What you feed your mind is as important as what you feed your body. Curate your environment.",
    icon: "🧠",
    detail: "Day 24-27: Information diet management."
  },
  {
    title: "Restorative Solitude",
    description: "Discover the power of being alone with your thoughts. The secret of all high performers.",
    icon: "🌑",
    detail: "Day 28-30: Introspection & future-mapping."
  }
];

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Tech Entrepreneur, Founder of NEXA",
    content: "I reclaimed 12 hours of my week just by following the Digital Detox and Deep Work modules. This isn't just a book; it's a complete operating system for your life.",
    rating: 5,
    avatar: "AM"
  },
  {
    name: "Dr. Sneha Kapoor",
    role: "Clinical Psychologist",
    content: "The 30-day structure is psychologically sound. I've started recommending the morning ritual to my patients dealing with high-stress corporate environments.",
    rating: 5,
    avatar: "SK"
  },
  {
    name: "Vikram Singh",
    role: "Professional Athlete",
    content: "Most habit books are fluff. This is pure action. My focus levels and mental recovery have peaked in just 3 weeks. Essential reading.",
    rating: 5,
    avatar: "VS"
  }
];

const faqs = [
  {
    q: "Is this book suitable for beginners?",
    a: "Absolutely. The 30-day roadmap starts with small, 5-minute changes and builds progressively. You won't feel overwhelmed."
  },
  {
    q: "What format is the book in?",
    a: "It's a high-quality, mobile-optimized PDF. You can read it on any smartphone, tablet, or laptop immediately after purchase."
  },
  {
    q: "Can I reset my life even if I have a busy 9-5 job?",
    a: "Yes. In fact, this guide was designed specifically for busy professionals. We focus on reclaiming time you didn't even know you were losing."
  }
];

export default function SevenHabitsLanding() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [purchaseCount, setPurchaseCount] = useState(12450);
  const [price, setPrice] = useState(299);

  useEffect(() => {
    // Fetch price from settings
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (data.success && data.settings.sevenHabitsPrice) {
          setPrice(parseInt(data.settings.sevenHabitsPrice));
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };

    const interval = setInterval(() => {
      setPurchaseCount(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0A192F] text-white selection:bg-[#00A3FF] selection:text-white font-sans antialiased overflow-x-hidden">
      <Header />
      
      {/* Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-[100] p-4 bg-[#0A192F]/90 backdrop-blur-xl border-t border-white/10 transition-transform duration-300 transform md:hidden ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center justify-between gap-4">
           <div className="text-left">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Limited Offer</p>
              <p className="text-lg font-black text-[#00A3FF]">₹{price}</p>
           </div>
           <BuyButton 
             productName="7 Habits + Bonus Tracker"
             productDescription="30-Day Guide + Habit Tracker PDF"
             price={price}
             className="flex-1 !bg-[#00A3FF] !text-white font-black py-4 rounded-xl shadow-lg shadow-[#00A3FF]/20"
           >
             Get Access Now →
           </BuyButton>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Deep Field Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-[#00A3FF]/20 to-transparent blur-[160px] rounded-full opacity-60" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
               <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full mb-10 backdrop-blur-md">
                 <span className="flex h-2.5 w-2.5 rounded-full bg-[#00A3FF] shadow-[0_0_10px_#00A3FF]" />
                 <span className="text-slate-300 font-bold tracking-[0.2em] text-[10px] uppercase">
                   Trusted by {purchaseCount.toLocaleString()}+ Performers • <span className="text-[#00A3FF]">BONUS INCLUDED</span>
                 </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 tracking-tighter">
                Rewrite Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-[#44AAFF] to-[#00A3FF] animate-gradient-x">
                  Mental Default.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Distraction is a trap. Stress is a prison. Burnout is a choice. <br className="hidden md:block" />
                Reset your life with our systematic 30-day mobile guide.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                <BuyButton 
                  productName="7 Habits + Bonus Tracker"
                  productDescription="30-Day Guide + Habit Tracker PDF"
                  price={price}
                  className="w-full sm:w-auto !bg-[#00A3FF] hover:!bg-[#0088DD] !text-white text-2xl font-black px-14 py-6 shadow-[0_25px_60px_-15px_rgba(0,163,255,0.4)] rounded-[20px] transition-all hover:scale-105 active:scale-95"
                >
                  Start The Reset →
                </BuyButton>
                
                <div className="flex flex-col items-center lg:items-start gap-1">
                  <div className="flex -space-x-2 mb-2">
                     {[1, 2, 3, 4, 5].map((s) => (
                       <div key={s} className="w-8 h-8 rounded-full border-2 border-[#0A192F] bg-[#0D2442] flex items-center justify-center overflow-hidden">
                         <span className="text-[8px] font-bold text-slate-300">{['AM', 'SK', 'VS', 'RJ', 'ML'][s-1]}</span>
                       </div>
                     ))}
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Highly Rated by Professionals</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative group">
               <div className="absolute -inset-10 bg-[#00A3FF]/10 blur-[80px] rounded-full animate-pulse pointer-events-none" />
               <div className="relative rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-500 transform group-hover:scale-[1.02]">
                  <Image
                    src="/7-habits-cover-real.jpg"
                    alt="7 Habits to Reset Your Life eBook Cover"
                    width={600}
                    height={800}
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent text-center">
                     <p className="text-[#00A3FF] font-black text-xs uppercase tracking-[0.3em] mb-2">Final Edition</p>
                     <p className="text-white/60 text-[10px] font-bold font-mono">ENCRYPTED DATA • MOBILE OPTIMIZED</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Multiplier: Media Logos */}
      <section className="bg-white/5 py-10 border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
           <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em] mb-8">As Mentioned In Global Publications</p>
           <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 invert hover:opacity-100 grayscale transition-all duration-500">
             <span className="font-black text-xl tracking-tighter">THE STRAITS</span>
             <span className="font-black text-xl tracking-tighter">QUARTZ</span>
             <span className="font-black text-xl tracking-tighter">FAST COMPANY</span>
             <span className="font-black text-xl tracking-tighter">HARVARD REV.</span>
             <span className="font-black text-xl tracking-tighter">WIRED</span>
          </div>
        </div>
      </section>

      {/* The Results (Transformation) Section */}
      <Section background="dark" className="relative overflow-hidden">
        <div className="absolute left-0 top-0 w-64 h-64 bg-[#00A3FF]/10 blur-3xl rounded-full" />
        <SectionTitle 
          colorMode="dark"
          subtitle="Don't just change your routine. Change your neural pathways."
        >
          The 30-Day Evolution
        </SectionTitle>
        
        <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-4 md:p-12">
            <div className="relative aspect-square md:aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-inner">
               <Image 
                src="/7-habits-results-blue.png" 
                alt="Before and After Mental Reset" 
                fill
                className="object-cover"
               />
            </div>
            <div className="space-y-8 pl-4 pr-4 lg:pl-8">
              <h3 className="text-3xl font-black text-white">Mental Clarity is an <span className="text-[#00A3FF]">Architected Choice</span></h3>
              <p className="text-slate-300 leading-relaxed text-lg font-medium">
                Most people fail to reset because they lack a sequence. We don't just tell you what to do; we guide you through a step-by-step neural rewiring process.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                 {[
                  { label: "Focus Score", val: "+140%" },
                  { label: "Anxiety Levels", val: "-65%" },
                  { label: "Free Time", val: "+2.5h/day" },
                  { label: "Sleep Quality", val: "+80%" }
                 ].map((stat, i) => (
                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-sm hover:border-[#00A3FF]/50 transition-colors">
                       <p className="text-3xl font-black text-[#00A3FF] mb-1">{stat.val}</p>
                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
                    </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Tangibility Section: What you get */}
      <Section background="darker" className="relative">
         <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
               <SectionTitle colorMode="dark" centered={false} subtitle="This is more than a PDF. It is a handheld mentor that goes wherever you go.">
                  A Masterpiece <br /> Of Portability.
               </SectionTitle>
               <div className="space-y-10 mt-12">
                  {[
                    { t: "Native Mobile Design", d: "Designed from the ground up for phone screens. No zooming or horizontal scrolling required." },
                    { t: "Actionable Workbook", d: "Includes a built-in 30-day journaling protocol that you can execute daily." },
                    { t: "Offline Lifetime Access", d: "Your property forever. Access it on any device, even without an internet connection." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                       <div className="w-12 h-12 bg-[#00A3FF]/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#00A3FF]/20 group-hover:bg-[#00A3FF] group-hover:text-white transition-all">
                          <svg className="w-5 h-5 text-[#00A3FF] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-white mb-2">{item.t}</h4>
                          <p className="text-slate-400 leading-relaxed font-medium">{item.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative">
               <div className="absolute -inset-10 bg-[#00A3FF]/20 blur-[100px] rounded-full" />
               <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/mobile-mockup-blue.png" alt="Inside the eBook Mockup" width={800} height={600} className="object-cover" />
               </div>
            </div>
         </div>
      </Section>

      {/* Bonus Section: Exponential Reward */}
      <Section background="dark" className="relative overflow-hidden border-y border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/5 rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl">
               <div className="grid lg:grid-cols-12 gap-16 items-center p-8 md:p-16">
                  <div className="lg:col-span-12 xl:col-span-7">
                     <div className="inline-block bg-[#00A3FF] text-white px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-lg shadow-[#00A3FF]/20">
                        EXCLUSIVE FREE BONUS
                     </div>
                     <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter">
                        The 30-Day <br /> <span className="text-[#00A3FF]">Habit Architecture</span> Tracker.
                     </h2>
                     <p className="text-xl text-slate-300 leading-relaxed font-medium mb-12">
                        Execution is where the battle is won. That's why we're including our professional, printable habit tracker—designed to turn abstract goals into concrete neuro-biological changes.
                     </p>
                     
                     <div className="space-y-6">
                        {[
                           "Visual verification of your 30-day streak.",
                           "Scientific 'Check-and-Reflect' grid.",
                           "High-resolution printable A4 format."
                        ].map((point, i) => (
                           <div key={i} className="flex items-center gap-4 text-slate-200 font-bold">
                              <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                 <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                              </div>
                              {point}
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="lg:col-span-12 xl:col-span-5 relative group mt-12 xl:mt-0">
                     <div className="absolute -inset-10 bg-[#00A3FF]/10 blur-[80px] rounded-full animate-pulse" />
                     <div className="relative transform group-hover:rotate-2 transition-transform duration-500 mx-auto max-w-sm xl:max-w-none">
                        <Image 
                           src="/habit-tracker-mockup.png" 
                           alt="30 Day Habit Tracker Preview" 
                           width={600} 
                           height={800} 
                           className="rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-white/10"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Section>

      {/* Authority Section: About the Author */}
      <Section background="darker" className="border-y border-white/5">
         <div className="max-w-4xl mx-auto">
            <div className="text-center md:text-left">
               <div className="inline-block bg-[#00A3FF]/10 px-4 py-2 rounded-lg mb-6 border border-[#00A3FF]/20">
                  <span className="text-[#00A3FF] font-black text-xs uppercase tracking-widest">ABOUT THE ARCHITECT</span>
               </div>
                <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">Praneeth Kumar P</h2>
                <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-medium">
                   <p>
                      Praneeth Kumar P is an IT veteran turned legal professional, entrepreneur, and personal growth enthusiast who believes that true transformation is built one small habit at a time.
                   </p>
                   <p>
                      With nearly two decades of experience designing and architecting large-scale software systems, Praneeth achieved financial freedom in 2019—designing a life on his own terms and following his passion for law and personal development.
                   </p>
                   <p className="text-[#00A3FF] font-serif italic text-2xl pt-4 border-l-4 border-[#00A3FF] pl-8">
                      "Lasting change doesn’t come from giant leaps, but from small, intentional habits practiced every day."
                   </p>
                </div>
            </div>
         </div>
      </Section>

      {/* Curriculum Breakdown */}
      <Section background="dark" className="relative overflow-hidden">
        <SectionTitle 
          colorMode="dark"
          subtitle="Everything you need to architect a world-class mental environment. No fluff, just systems."
        >
          Your 30-Day Evolution
        </SectionTitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {habits.map((habit, index) => ( index === 7 ? null : (
            <div 
              key={index} 
              className="group p-10 rounded-[40px] bg-white/5 border border-white/10 hover:border-[#00A3FF]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00A3FF]/5 flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition-all">
                {habit.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#00A3FF]">{habit.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-8 font-medium">
                {habit.description}
              </p>
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                 <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase">{habit.detail}</span>
                 <svg className="w-4 h-4 text-[#00A3FF] opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </div>
            </div>
          )))}
        </div>
      </Section>

      {/* Social Proof Gallery */}
      <Section background="darker" className="border-t border-white/5">
        <SectionTitle colorMode="dark" subtitle="Real outcomes from deep work practitioners around the globe.">
          Voices of Transformation.
        </SectionTitle>
        
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 relative group hover:border-[#00A3FF]/20 transition-all shadow-sm">
              <div className="flex gap-1 text-[#00A3FF] mb-8 scale-110 origin-left">
                {[...Array(t.rating)].map((_, idx) => (
                  <svg key={idx} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 0 00-.364 1.118l1.07 3.292c.3-.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-slate-200 text-xl font-medium leading-relaxed italic mb-10 group-hover:text-[#00A3FF] transition-colors">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-black text-xs text-[#00A3FF] border border-white/10">
                    {t.avatar}
                 </div>
                 <div>
                   <p className="font-black text-lg text-white">{t.name}</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{t.role}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="dark" className="relative">
         <div className="max-w-4xl mx-auto">
            <SectionTitle colorMode="dark" subtitle="Common objections handled with transparency.">
               Frequently Asked.
            </SectionTitle>
            <div className="space-y-6 mt-16">
               {faqs.map((faq, i) => (
                 <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#00A3FF]/20 transition-all">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                       <span className="text-[#00A3FF]">Q.</span> {faq.q}
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-medium">
                       <span className="text-slate-300/30 font-black mr-2">A.</span> {faq.a}
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </Section>

      {/* Call To Action - Secure and High Tension */}
      <section className="text-center relative pt-32 pb-48 bg-[#0A192F] overflow-hidden">
        {/* Decorative Sky Aura */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-t from-[#00A3FF]/20 to-transparent blur-[120px] rounded-full opacity-50" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="p-12 md:p-24 bg-white/5 rounded-[4rem] border border-white/10 shadow-2xl relative backdrop-blur-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00A3FF] text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-xl">
               Final Availability Check
            </div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter text-white">Your Reset <br /> <span className="text-[#00A3FF]">Starts Now.</span></h2>
              <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                 This is the one-time opportunity to claim your focus and energy. Secure your digital license for the price of a coffee.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-12">
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="text-center md:text-right">
                    <p className="text-slate-500 line-through text-2xl font-bold leading-none mb-3">₹999</p>
                    <p className="text-[#00A3FF] text-7xl md:text-8xl font-black leading-none drop-shadow-[0_10px_30px_rgba(0,163,255,0.4)]">₹{price}</p>
                  </div>
                  <div className="hidden md:block h-32 w-px bg-white/10" />
                  <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 text-left max-w-[320px] shadow-sm">
                     <p className="text-[10px] font-black text-[#00A3FF] uppercase tracking-[0.3em] mb-4">Secure Checkout Powered By</p>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-8 bg-white/5 rounded flex items-center justify-center font-black text-[10px] tracking-tighter text-slate-400 uppercase">Razorpay</div>
                        <div className="h-8 bg-white/5 rounded flex items-center justify-center font-black text-[10px] tracking-tighter text-slate-400 uppercase">PCI-DSS</div>
                        <div className="h-8 bg-white/5 rounded flex items-center justify-center font-black text-[10px] tracking-tighter text-slate-400 uppercase">Visa/MC</div>
                        <div className="h-8 bg-white/5 rounded flex items-center justify-center font-black text-[10px] tracking-tighter text-slate-400 uppercase">SSL Secure</div>
                     </div>
                  </div>
                </div>

                <BuyButton 
                  productName="7 Habits + Bonus Tracker"
                  productDescription="30-Day Guide + Habit Tracker PDF"
                  price={price}
                  className="w-full sm:w-auto !bg-[#00A3FF] hover:!bg-[#0088DD] !text-white text-3xl font-black py-8 px-20 rounded-[28px] shadow-[0_30px_80px_-10px_rgba(0,163,255,0.4)] transition-all hover:scale-105"
                >
                  Instant Access Now →
                </BuyButton>

                <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                  <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> No Hidden Fees</span>
                  <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> One-Time Purchase</span>
                  <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Official License</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 border-t border-white/5 bg-[#0A192F]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid md:grid-cols-4 gap-16 mb-20 text-center md:text-left">
              <div className="md:col-span-2">
                 <div className="mb-8 font-black text-3xl tracking-tighter text-[#00A3FF]">RASOI GADGET</div>
                 <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-sm">
                    Empowering over 100,000+ individuals globally with the tools to live a more conscious, high-performance life.
                 </p>
              </div>
              <div>
                 <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-8">Navigation</h5>
                 <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <li><a href="/" className="hover:text-[#00A3FF] transition-colors">Satvik Books</a></li>
                    <li><a href="/reset-life" className="hover:text-[#00A3FF] transition-colors">7 Habits Reset</a></li>
                    <li><a href="/contact" className="hover:text-[#00A3FF] transition-colors">Contact Support</a></li>
                 </ul>
              </div>
              <div>
                 <h5 className="text-white font-black text-[10px] uppercase tracking-widest mb-8">Legal</h5>
                 <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <li><a href="/privacy" className="hover:text-[#00A3FF] transition-colors">Privacy Policy</a></li>
                    <li><a href="/terms" className="hover:text-[#00A3FF] transition-colors">Terms of Service</a></li>
                    <li><a href="/contact" className="hover:text-[#00A3FF] transition-colors">Contact Us</a></li>
                 </ul>
              </div>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">© 2026 Rasoi Gadget India. All Rights Reserved.</p>
              <p className="italic text-slate-700 text-[10px] uppercase tracking-[0.3em] font-black">Building Focus, Engineering Peace.</p>
           </div>
        </div>
      </footer>
    </main>
  );
}

