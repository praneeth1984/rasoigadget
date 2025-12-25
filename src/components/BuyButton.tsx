'use client';

import { useState, useEffect } from 'react';
import { useRazorpay } from '@/hooks/useRazorpay';
import { trackInitiateCheckout } from '@/lib/facebook-pixel';
import { getProductPrice } from '@/lib/pricing';
import Button from './Button';
import CheckoutModal from './CheckoutModal';

interface BuyButtonProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export default function BuyButton({
  size = 'large',
  variant = 'primary',
  children,
  className,
}: BuyButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productPrice, setProductPrice] = useState(499);
  const { initiatePayment, isLoading, isVerifying } = useRazorpay();

  useEffect(() => {
    // Fetch product price on mount
    getProductPrice().then(setProductPrice);
  }, []);

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmOrder = async (data: { 
    name: string; 
    email: string; 
    contact: string; 
    state: string;
    discountCode?: string;
  }) => {
    setIsModalOpen(false);
    
    // Calculate final amount if coupon is applied
    let finalAmount = productPrice;
    if (data.discountCode === 'SATVIK10') {
      finalAmount = Math.round(productPrice * 0.9);
    }
    
    // Track checkout initiation with the final price
    trackInitiateCheckout(finalAmount, 'INR');
    
    await initiatePayment(finalAmount, data);
  };

  return (
    <>
      <Button
        size={size}
        variant={variant}
        onClick={handleBuyClick}
        disabled={isLoading}
        className={className}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          children
        )}
      </Button>

      <CheckoutModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmOrder}
        amount={productPrice}
      />

      {isVerifying && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-dark/90 backdrop-blur-md">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-satvik-green/20 border-t-satvik-green rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-satvik-green animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="mt-6 text-2xl font-bold text-white">Verifying Payment...</h3>
          <p className="mt-2 text-text-secondary text-center px-6">
            Please do not refresh or close this window.<br />
            We&apos;re finalizing your order and preparing your downloads.
          </p>
          <div className="mt-8 flex gap-2">
            <span className="w-2 h-2 bg-satvik-green rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-satvik-green rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-satvik-green rounded-full animate-bounce"></span>
          </div>
        </div>
      )}
    </>
  );
}
