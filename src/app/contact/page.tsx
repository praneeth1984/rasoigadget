'use client';

import { useState } from 'react';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';
import Button from '@/components/Button';

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
    <main className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="pt-24 pb-16">
        <Section>
          <div className="max-w-5xl mx-auto">
            <SectionTitle subtitle="Have questions? We're here to help you on your Satvik journey.">
              Contact Us
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-12 mt-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Get in Touch</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-satvik-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-satvik-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-text-primary font-bold mb-1">Email Us</h4>
                      <p className="text-text-secondary">support@rasoigadget.com</p>
                      <p className="text-text-muted text-sm mt-1">We typically reply within 24 hours.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-text-primary font-bold mb-1">Support Hours</h4>
                      <p className="text-text-secondary">Monday - Saturday</p>
                      <p className="text-text-secondary">10:00 AM - 7:00 PM IST</p>
                    </div>
                  </div>

                  <div className="p-6 bg-dark-elevated rounded-2xl border border-white/5">
                    <h4 className="text-text-primary font-bold mb-2">Frequently Asked Questions</h4>
                    <p className="text-text-secondary text-sm mb-4">
                      Check our FAQ section on the home page for quick answers about our ebooks, payments, and downloads.
                    </p>
                    <a href="/#faq" className="text-satvik-green font-bold text-sm hover:underline">View FAQs →</a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-dark-elevated p-8 rounded-3xl border border-white/5 shadow-xl">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-satvik-green rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">Message Received!</h3>
                    <p className="text-text-secondary mb-8">
                      Thank you for reaching out. Our team will get back to you shortly.
                    </p>
                    <Button onClick={() => setStatus('idle')} variant="secondary">Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Full Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 focus:border-satvik-green outline-none transition"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Email Address</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 focus:border-satvik-green outline-none transition"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 focus:border-satvik-green outline-none transition"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Subject</label>
                      <input
                        required
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 focus:border-satvik-green outline-none transition"
                        placeholder="Inquiry about..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Your Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 focus:border-satvik-green outline-none transition resize-none"
                        placeholder="Describe your query in detail..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-satvik-green hover:bg-satvik-green-dark text-white font-bold py-4 rounded-lg transition shadow-lg disabled:opacity-50 mt-4"
                    >
                      {status === 'loading' ? 'Sending Message...' : 'Send Message →'}
                    </button>
                    
                    {status === 'error' && (
                      <p className="text-urgent-red text-sm text-center mt-2">
                        Failed to send message. Please try again or email us directly.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
