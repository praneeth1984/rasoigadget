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
  const { initiatePayment, isLoading } = useRazorpay();

  useEffect(() => {
    // Fetch product price on mount
    getProductPrice().then(setProductPrice);
  }, []);

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmOrder = async (data: { name: string; email: string; contact: string; state: string }) => {
    setIsModalOpen(false);
    
    // Track checkout initiation
    trackInitiateCheckout(productPrice, 'INR');
    
    await initiatePayment(productPrice, data);
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
    </>
  );
}
