'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initFacebookPixel, trackPageView } from '@/lib/facebook-pixel';

export default function FacebookPixel() {
  return (
    <Suspense fallback={null}>
      <PixelEvents />
    </Suspense>
  );
}

function PixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Facebook Pixel on mount
    initFacebookPixel();
  }, []);

  useEffect(() => {
    // Track page views on route change
    trackPageView();
  }, [pathname, searchParams]);

  return null;
}
