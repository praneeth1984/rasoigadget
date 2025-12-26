import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  colorMode?: 'dark' | 'light' | 'brand';
  dark?: boolean; // Kept for backward compatibility
}

export default function SectionTitle({
  children,
  subtitle,
  centered = true,
  colorMode = 'dark',
  dark = true
}: SectionTitleProps) {
  // Determine actual mode
  const mode = colorMode || (dark ? 'dark' : 'brand');
  
  const textColor = mode === 'dark' ? 'text-white' : mode === 'light' ? 'text-slate-900' : 'text-text-primary';
  const subtitleColor = mode === 'dark' ? 'text-white/90' : mode === 'light' ? 'text-slate-400' : 'text-text-secondary';
  const alignment = centered ? 'text-center' : 'text-left';

  return (
    <div className={`mb-12 md:mb-16 ${alignment}`}>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-4`}>
        {children}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl ${subtitleColor} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
