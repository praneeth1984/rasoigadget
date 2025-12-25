'use client';

import { useState, useEffect } from 'react';
import BuyButton from './BuyButton';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setIsVisible(true);
      }
    };

    // Show after 5 seconds
    timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-royal-purple via-royal-purple-light to-royal-purple p-3 md:p-4 shadow-2xl border-t-2 border-gold animate-slide-up">
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
