'use client';

import { useEffect } from 'react';
import OpenReplay from '@openreplay/tracker';

const tracker = new OpenReplay({
  projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY || "IFI2kimWvLpr7KkSq6Bm",
  ingestPoint: "https://api.openreplay.com/ingest",
});

export default function OpenReplayTracker() {
  useEffect(() => {
    tracker.start()
      .then((session) => {
        console.log('OpenReplay session started:', session);
      })
      .catch((err) => {
        console.error('OpenReplay start error:', err);
      });
  }, []);

  return null;
}
