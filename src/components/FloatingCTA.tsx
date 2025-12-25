'use client';

import { useState, useEffect } from 'react';
import BuyButton from './BuyButton';

export default function FloatingCTA() {
  const [isEnabled, setIsEnabled] = useState(false); // Whether CTA should be shown (based on scroll/time)
  const [isVisible, setIsVisible] = useState(false); // Whether CTA is currently visible (not hidden by modal)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Enable after scrolling 150px
      if (window.scrollY > 150) {
        setIsEnabled(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Exit intent - enable when mouse leaves top of page
      if (e.clientY < 10) {
        setIsEnabled(true);
      }
    };

    // Check for modals and update visibility accordingly
    const checkForModals = () => {
      const hasCheckoutModal = document.querySelector('[data-checkout-modal="true"]');
      const hasRazorpay = document.querySelector('.razorpay-container');
      const hasDialog = document.querySelector('[role="dialog"]');
      
      const hasAnyModal = hasCheckoutModal || hasRazorpay || hasDialog;
      
      // Only show if enabled AND no modal is open
      setIsVisible(isEnabled && !hasAnyModal);
    };

    // Enable after 5 seconds regardless of scroll
    timeoutId = setTimeout(() => {
      setIsEnabled(true);
    }, 5000);

    // Check for modals periodically (faster interval for better UX)
    const modalCheckInterval = setInterval(checkForModals, 200);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(modalCheckInterval);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isEnabled]); // Re-run when isEnabled changes

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-royal-purple via-royal-purple-light to-royal-purple p-3 md:p-4 shadow-2xl border-t-2 border-gold animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <p className="text-white font-bold text-base md:text-xl">
            🎁 Complete 3-Book Collection: <span className="text-gold">₹499</span> <span className="line-through text-white/60 text-sm">₹2,997</span>
          </p>
          <p className="text-white/90 text-xs md:text-sm">
            ⏰ 83% OFF Ends Soon • Instant Download
          </p>
        </div>
        <BuyButton size="large" className="pulse-glow whitespace-nowrap shrink-0">
          Yes! Send Me The Collection →
        </BuyButton>
      </div>
    </div>
  );
}
