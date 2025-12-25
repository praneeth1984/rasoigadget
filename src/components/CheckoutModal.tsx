'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';
import Button from './Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { name: string; email: string; contact: string; state: string }) => void;
  amount: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  amount,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    state: '',
  });

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  useEffect(() => {
    if (isOpen) {
      const user = getCurrentUser();
      setFormData({
        name: localStorage.getItem('userName') || user?.name || '',
        email: localStorage.getItem('userEmail') || user?.email || '',
        contact: localStorage.getItem('userPhone') || '',
        state: localStorage.getItem('userState') || '',
      });
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage for future use
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userPhone', formData.contact);
    localStorage.setItem('userState', formData.state);
    
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" data-checkout-modal="true">
      <div 
        className="relative w-full max-w-md bg-dark-elevated border border-gold/30 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-royal-purple/30 to-gold/20 p-6 border-b border-gold/20">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-dark-surface/50 hover:bg-dark-surface text-text-muted hover:text-white transition-all hover:scale-110"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-2xl font-bold text-text-primary">Complete Your Order</h3>
          <p className="text-text-secondary text-sm">Please provide your details for delivery and access</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="checkout-name" className="block text-sm font-semibold text-text-primary mb-1">
              Full Name
            </label>
            <input
              id="checkout-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              className="w-full px-4 py-3 bg-dark-surface border border-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="checkout-email" className="block text-sm font-semibold text-text-primary mb-1">
                Email Address
              </label>
              <input
                id="checkout-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-dark-surface border border-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label htmlFor="checkout-contact" className="block text-sm font-semibold text-text-primary mb-1">
                Phone Number
              </label>
              <input
                id="checkout-contact"
                type="tel"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Mobile number"
                className="w-full px-4 py-3 bg-dark-surface border border-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="checkout-state" className="block text-sm font-semibold text-text-primary mb-1">
              State (for GST calculation)
            </label>
            <select
              id="checkout-state"
              required
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-4 py-3 bg-dark-surface border border-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-gold transition-colors appearance-none"
            >
              <option value="">Select your state</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <div className="flex justify-between items-center mb-4 p-3 bg-gold/10 rounded-lg border border-gold/20">
              <span className="text-text-primary font-semibold">Total Amount:</span>
              <span className="text-gold font-bold text-xl">₹{amount}</span>
            </div>
            <Button type="submit" size="large" className="w-full shadow-lg shadow-gold/20">
              Proceed to Payment →
            </Button>
          </div>

          <p className="text-[10px] text-center text-text-muted">
            🔒 Secure checkout via Razorpay. Your data is protected.
          </p>
        </form>
      </div>
    </div>
  );
}
