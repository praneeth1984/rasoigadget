'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  className?: string;
}

export default function CountdownTimer({ className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [copiesLeft, setCopiesLeft] = useState(23);

  useEffect(() => {
    // Use session-based deadline for credibility
    const getSessionDeadline = () => {
      const stored = sessionStorage.getItem('saleDeadline');
      if (stored) {
        return parseInt(stored);
      }
      // Set deadline to 24 hours from first visit
      const deadline = new Date().getTime() + (24 * 60 * 60 * 1000);
      sessionStorage.setItem('saleDeadline', deadline.toString());
      return deadline;
    };

    const targetTime = getSessionDeadline();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    // Simulate decreasing inventory (updates every 3-8 minutes)
    const inventoryTimer = setInterval(() => {
      setCopiesLeft(prev => Math.max(15, prev - 1));
    }, Math.random() * 300000 + 180000); // 3-8 minutes

    return () => {
      clearInterval(timer);
      clearInterval(inventoryTimer);
    };
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-urgent-red to-urgent-orange text-white rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] shadow-lg">
        <div className="text-2xl md:text-4xl font-bold tabular-nums">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="text-xs md:text-sm text-text-muted mt-2 uppercase tracking-wide font-semibold">
        {label}
      </div>
    </div>
  );

  return (
    <div className={`${className}`}>
      <div className="bg-dark-elevated border-2 border-urgent-red/50 rounded-xl p-4 md:p-6">
        <div className="text-center mb-4">
          <p className="text-urgent-red font-bold text-sm md:text-base uppercase tracking-wide mb-1">
            ⚡ YOUR EXCLUSIVE DISCOUNT EXPIRES IN:
          </p>
          <p className="text-text-muted text-xs md:text-sm">
            Lock in your 83% discount before the timer hits zero
          </p>
        </div>
        
        <div className="flex justify-center gap-3 md:gap-4">
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <div className="flex items-center text-2xl md:text-4xl text-urgent-red font-bold pb-6">:</div>
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <div className="flex items-center text-2xl md:text-4xl text-urgent-red font-bold pb-6">:</div>
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
        
        <div className="mt-4 text-center space-y-2">
          <p className="text-xs md:text-sm text-gold font-semibold">
            🔥 Only {copiesLeft} copies left at this price!
          </p>
          <p className="text-xs text-text-muted">
            (Updates every 15 minutes)
          </p>
        </div>
      </div>
    </div>
  );
}
