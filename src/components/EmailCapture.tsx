'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        // Store in localStorage for persistence and pre-filling
        localStorage.setItem('emailCaptured', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('discountCode', data.discountCode);
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-emerald/20 to-emerald/10 border-2 border-emerald/50 rounded-xl p-6 md:p-8 text-center">
        <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-2">Check Your Email! 📧</h3>
        <p className="text-text-secondary mb-4">
          We've sent you a sample recipe and your exclusive discount code: <span className="text-gold font-bold">SATVIK10</span>
        </p>
        <a 
          href="/free-sample" 
          className="inline-block px-6 py-2 bg-satvik-green text-white font-bold rounded-full hover:bg-satvik-green-dark transition-colors mb-4"
        >
          View Free Sampler Now →
        </a>
        <p className="text-xs text-text-muted">
          (Use <b>SATVIK10</b> at checkout for an extra 10% off)
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-royal-purple/20 to-gold/10 border-2 border-gold/50 rounded-xl p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="inline-block bg-gold/20 px-4 py-2 rounded-full mb-4">
          <p className="text-gold font-bold text-sm">🎁 FREE BONUS</p>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Get a FREE Recipe Sample + Exclusive Discount
        </h3>
        <p className="text-text-secondary">
          Enter your email to receive a sample recipe from Book 1 and an exclusive discount code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 px-4 py-3 rounded-lg bg-dark-elevated border-2 border-royal-purple/30 focus:border-gold focus:outline-none text-text-primary placeholder-text-muted"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {isLoading ? 'Sending...' : 'Get My Free Sample →'}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>100% Privacy Protected</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>No Spam, Unsubscribe Anytime</span>
        </div>
      </div>
    </div>
  );
}
