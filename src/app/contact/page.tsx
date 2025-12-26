'use client';

import { useState } from 'react';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#0A192F] text-white selection:bg-[#D4AF37] selection:text-[#0A192F] font-sans antialiased">
      <Header />
      
      <div className="pt-32 pb-24">
        <Section>
          <div className="max-w-6xl mx-auto">
            <SectionTitle 
              subtitle="Have questions about our eBooks? We're here to help you on your journey."
              dark
            >
              Contact Support
            </SectionTitle>

            <div className="grid md:grid-cols-5 gap-16 mt-16">
              {/* Contact Information */}
              <div className="md:col-span-2 space-y-10">
                <div>
                  <h2 className="text-3xl font-black mb-6 text-[#D4AF37]">Get in Touch</h2>
                  <p className="text-slate-400 font-medium leading-relaxed mb-10">
                    Whether you have technical issues with a download or questions about our recipes, our team is ready to assist you.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:border-[#D4AF37]/50 transition-all">
                      <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xs uppercase tracking-widest mb-2">Email Address</h4>
                      <p className="text-[#D4AF37] font-bold text-lg">support@rasoigadget.com</p>
                      <p className="text-slate-500 text-xs font-bold mt-1">24/7 Response Time</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:border-[#D4AF37]/50 transition-all">
                      <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xs uppercase tracking-widest mb-2">Support Hours</h4>
                      <p className="text-slate-300 font-bold">Mon - Sat: 10AM - 7PM IST</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                   <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-widest mb-4">Quick Links</h4>
                   <ul className="space-y-4">
                      <li><a href="/reset-life#faq" className="text-slate-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#D4AF37] rounded-full" /> eBook FAQs
                      </a></li>
                      <li><a href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#D4AF37] rounded-full" /> Refund Policy
                      </a></li>
                   </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-3">
                <div className="bg-white/5 p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-md">
                  {status === 'success' ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#D4AF37]/30">
                        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-4">Message Received</h3>
                      <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">
                        Thank you for reaching out. A support specialist will contact you shortly.
                      </p>
                      <button 
                        onClick={() => setStatus('idle')} 
                        className="px-10 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors font-bold text-sm uppercase tracking-widest"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 focus:border-[#D4AF37] outline-none transition text-white font-medium"
                            placeholder="e.g. John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 focus:border-[#D4AF37] outline-none transition text-white font-medium"
                            placeholder="e.g. john@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                        <input
                          required
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 focus:border-[#D4AF37] outline-none transition text-white font-medium"
                          placeholder="How can we help?"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                        <textarea
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 focus:border-[#D4AF37] outline-none transition text-white font-medium resize-none"
                          placeholder="Describe your query in detail..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-[#D4AF37] hover:bg-[#B8962D] text-[#0A192F] font-black py-5 rounded-2xl transition shadow-xl shadow-[#D4AF37]/10 disabled:opacity-50 mt-6 tracking-widest uppercase text-sm"
                      >
                        {status === 'loading' ? 'Transmitting...' : 'Transmit Message →'}
                      </button>
                      
                      {status === 'error' && (
                        <p className="text-red-400 text-xs font-bold text-center mt-4">
                          Transmission failed. Please check your connection or contact via direct email.
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}

