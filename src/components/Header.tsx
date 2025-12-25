'use client';

import Image from "next/image";
import BuyButton from "./BuyButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center transition hover:opacity-80">
            <div className="relative h-10 w-32 xs:h-12 xs:w-40 md:h-16 md:w-64 lg:h-20 lg:w-80">
              <Image
                src="https://rasoigadget.com/cdn/shop/files/Updated_Logo-removebg-preview.png?height=82&v=1758460383"
                alt="Rasoi Gadget"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          {/* Navigation - Hidden on mobile/tablet */}
          <nav className="hidden xl:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-satvik-green transition-colors font-semibold">
              Features
            </a>
            <a href="#testimonials" className="text-slate-600 hover:text-satvik-green transition-colors font-semibold">
              Reviews
            </a>
            <a href="#faq" className="text-slate-600 hover:text-satvik-green transition-colors font-semibold">
              FAQ
            </a>
            <a href="/orders" className="text-satvik-green hover:text-satvik-green-dark transition-colors font-bold text-lg">
              My Orders
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <BuyButton 
              size="small" 
              variant="primary" 
              className="md:hidden text-xs px-3 py-1.5"
            >
              Get Started
            </BuyButton>
            <BuyButton 
              size="large" 
              variant="primary" 
              className="hidden md:flex"
            >
              Get Started
            </BuyButton>
          </div>
        </div>
      </div>
    </header>
  );
}
