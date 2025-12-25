import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'dark' | 'darker' | 'elevated' | 'purple';
  id?: string;
}

export default function Section({
  children,
  className = '',
  background = 'dark',
  id
}: SectionProps) {
  const backgrounds = {
    dark: 'bg-dark-bg',
    darker: 'bg-dark-surface',
    elevated: 'bg-dark-elevated',
    purple: 'bg-gradient-to-br from-royal-purple-dark to-royal-purple',
  };

  return (
    <section id={id} className={`py-16 md:py-24 px-4 ${backgrounds[background]} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
