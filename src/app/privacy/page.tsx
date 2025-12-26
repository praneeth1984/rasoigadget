import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';

export default function PrivacyPage() {
  const lastUpdated = "December 26, 2025";

  return (
    <main className="min-h-screen bg-[#0A192F] text-white selection:bg-[#D4AF37] selection:text-[#0A192F] font-sans antialiased">
      <Header />
      
      <div className="pt-32 pb-24">
        <Section>
          <div className="max-w-4xl mx-auto">
            <SectionTitle 
              subtitle={`Protocol Version 1.4 | Last Updated: ${lastUpdated}`}
              dark
            >
              Privacy Policy
            </SectionTitle>
            
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-md shadow-2xl">
              <div className="prose prose-invert prose-slate max-w-none text-slate-400 font-medium leading-relaxed space-y-12">
                <p className="text-lg text-slate-300">
                  At Rasoi Gadget, accessible from rasoigadget.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Rasoi Gadget and how we use it.
                </p>

                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-white flex items-center gap-4">
                     <span className="w-8 h-px bg-[#D4AF37]" /> 
                     1. Information We Collect
                  </h2>
                  <p>
                    We collect several different types of information for various purposes to provide and improve our service to you:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 marker:text-[#D4AF37]">
                    <li>Personal identification information (Name, email address, phone number, etc.)</li>
                    <li>Payment details (processed securely through Razorpay)</li>
                    <li>Usage data and website cookies</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-white flex items-center gap-4">
                     <span className="w-8 h-px bg-[#D4AF37]" /> 
                     2. Data Utilization
                  </h2>
                  <p>
                    We use the information we collect in various ways, including to:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 marker:text-[#D4AF37]">
                    <li>Provide, operate, and maintain our digital ecosystem</li>
                    <li>Personalize and expand our product offerings</li>
                    <li>Process your transactions and secure your digital assets</li>
                    <li>Communicate with you regarding updates and support</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-white flex items-center gap-4">
                     <span className="w-8 h-px bg-[#D4AF37]" /> 
                     3. Payment Security
                  </h2>
                  <p className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl p-6 text-slate-300">
                    We use Razorpay for processing all payments. <strong>We do not store or collect your payment card details.</strong> That information is provided directly to our third-party payment processors who comply with PCI-DSS standards.
                  </p>
                </div>

                <div className="space-y-6 pt-12 border-t border-white/5">
                  <h2 className="text-2xl font-black text-white">Contact Our Data Officer</h2>
                  <p>
                    If you have questions or require more information about our Data Privacy Policy, do not hesitate to contact us at:
                  </p>
                  <div className="inline-block px-8 py-4 bg-white/5 rounded-2xl border border-white/10 font-bold text-[#D4AF37]">
                    support@rasoigadget.com
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

