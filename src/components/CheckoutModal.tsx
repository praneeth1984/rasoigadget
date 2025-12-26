'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getCurrentUser } from '@/lib/auth';
import Button from './Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { 
    name: string; 
    email: string; 
    contact: string; 
    state: string;
    discountCode?: string;
  }) => void;
  amount: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  amount,
}: CheckoutModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    state: '',
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [couponError, setCouponError] = useState('');

  const currentAmount = appliedCoupon 
    ? Math.round(amount * (1 - appliedCoupon.discount / 100))
    : amount;

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  useEffect(() => {
    setMounted(true);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage for future use
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userPhone', formData.contact);
    localStorage.setItem('userState', formData.state);
    
    onConfirm({
      ...formData,
      discountCode: appliedCoupon?.code
    });
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    
    if (code === 'SATVIK10') {
      setAppliedCoupon({ code: 'SATVIK10', discount: 10 });
      setCouponCode('');
    } else if (code === '') {
      setCouponError('Please enter a code');
    } else {
      setCouponError('Invalid discount code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300 p-2 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#0A192F] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Stays at top */}
        <div className="relative bg-white/5 p-6 sm:p-8 border-b border-white/10 flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50 border border-white/10"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-2xl sm:text-3xl font-black text-white pr-12">Complete Order</h3>
          <p className="text-slate-400 text-sm mt-1">Delivery details & secure access</p>
        </div>

        {/* Form Body - Scrollable */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <label htmlFor="checkout-name" className="block text-xs font-black text-[#00A3FF] uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                id="checkout-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Arjun Mehta"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00A3FF] transition-all placeholder:text-white/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="checkout-email" className="block text-xs font-black text-[#00A3FF] uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@email.com"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00A3FF] transition-all placeholder:text-white/20"
                />
              </div>

              <div>
                <label htmlFor="checkout-contact" className="block text-xs font-black text-[#00A3FF] uppercase tracking-widest mb-2">
                  Phone
                </label>
                <input
                  id="checkout-contact"
                  type="tel"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="+91"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00A3FF] transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="checkout-state" className="block text-xs font-black text-[#00A3FF] uppercase tracking-widest mb-2">
                State (GST)
              </label>
              <select
                id="checkout-state"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00A3FF] transition-all appearance-none"
              >
                <option value="" className="bg-[#0A192F]">Select State</option>
                {indianStates.map(state => (
                  <option key={state} value={state} className="bg-[#0A192F]">{state}</option>
                ))}
              </select>
            </div>

            {/* Price Preview */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Standard Price:</span>
                  <span className="text-white font-bold opacity-50 line-through">₹{amount}</span>
               </div>
               <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="text-white font-black uppercase text-xs tracking-widest">Total to Pay:</span>
                  <span className="text-[#00A3FF] font-black text-3xl">₹{currentAmount}</span>
               </div>
            </div>

            <Button type="submit" size="large" className="w-full !bg-[#00A3FF] hover:!bg-[#0088DD] !text-white py-6 rounded-2xl font-black text-xl shadow-xl shadow-[#00A3FF]/20">
              Complete Payment →
            </Button>

            <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">
               Encrypted & Secured by Razorpay
            </p>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
