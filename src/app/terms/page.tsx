import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';

export default function TermsPage() {
  const lastUpdated = "December 26, 2025";

  return (
    <main className="min-h-screen bg-[#0A192F] text-white selection:bg-[#D4AF37] selection:text-[#0A192F] font-sans antialiased">
      <Header />
      
      <div className="pt-32 pb-24">
        <Section>
          <div className="max-w-4xl mx-auto">
            <SectionTitle 
              subtitle={`Contractual Agreement | Last Updated: ${lastUpdated}`}
              dark
            >
              Terms of Service
            </SectionTitle>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-md shadow-2xl relative overflow-hidden">
               {/* Decorative Element */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl rounded-full" />
               
               <div className="prose prose-invert prose-slate max-w-none text-slate-400 font-medium leading-relaxed space-y-12 relative z-10">
                  <section className="space-y-6">
                    <h2 className="text-2xl font-black text-white flex items-center gap-4">
                       <span className="w-8 h-px bg-[#D4AF37]" /> 
                       1. Acceptance of Terms
                    </h2>
                    <p>
                      By accessing and using the Rasoi Gadget ecosystem and purchasing our digital assets, you accept and agree to be bound by the terms and provisions of this agreement.
                    </p>
                  </section>

                  <section className="space-y-6">
                    <h2 className="text-2xl font-black text-white flex items-center gap-4">
                       <span className="w-8 h-px bg-[#D4AF37]" /> 
                       2. Digital Asset Fulfillment
                    </h2>
                    <p>
                      Rasoi Gadget offers digital guidebooks in PDF format. Upon successful payment verification, you will receive immediate access to download your assets. These are delivered electronically and are available instantly.
                    </p>
                  </section>

                  <section className="space-y-6">
                    <div className="p-10 bg-red-500/5 border-2 border-red-500/20 rounded-[2rem]">
                        <h2 className="text-2xl font-black text-red-400 mb-6">3. Strict No-Refund Policy</h2>
                        <p className="text-slate-300 font-bold mb-6">
                          All sales of digital products are final.
                        </p>
                        <p className="text-sm leading-relaxed">
                          Due to the high-value nature of digital assets and the immediate fulfillment provided upon purchase, we do not offer refunds, returns, or exchanges. By completing your order, you explicitly waive any right to a refund.
                        </p>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h2 className="text-2xl font-black text-white flex items-center gap-4">
                       <span className="w-8 h-px bg-[#D4AF37]" /> 
                       4. Intellectual Property
                    </h2>
                    <p>
                      All content, including recipes, photographic assets, and systems, remain the exclusive property of Rasoi Gadget. Licensing is for individual, non-commercial use only. Redistribution or extraction of data is strictly prohibited and subject to legal action.
                    </p>
                  </section>

                  <section className="space-y-6">
                    <h2 className="text-2xl font-black text-white flex items-center gap-4">
                       <span className="w-8 h-px bg-[#D4AF37]" /> 
                       5. Liability Disclaimer
                    </h2>
                    <p>
                      Information provided is for educational purposes only. Always consult a professional before making dietary changes. Rasoi Gadget is not liable for outcomes resulting from the implementation of digital guide content.
                    </p>
                  </section>

                  <div className="pt-12 border-t border-white/5 text-center">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Direct Legal Inquiries To</p>
                    <div className="inline-block px-10 py-5 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/30 font-black text-[#D4AF37] tracking-widest uppercase text-sm">
                       LEGAL@RASOIGADGET.COM
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}

