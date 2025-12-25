'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/facebook-pixel';

export default function LandingPageTracker() {
  useEffect(() => {
    // Track landing page view
    trackViewContent('Satvik 3-Book Collection Landing Page', 499);
  }, []);

  return null;
}
