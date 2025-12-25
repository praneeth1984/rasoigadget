'use client';

import { useEffect } from 'react';
import Tracker from '@openreplay/tracker';

export default function OpenReplayTracker() {
  useEffect(() => {
    // Only initialize in production or if you want it in dev too
    if (typeof window === 'undefined') return;

    const tracker = new Tracker({
      projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY || "IFI2kimWvLpr7KkSq6Bm",
    });
    
    tracker.start();
  }, []);

  return null;
}
