import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}

export default function SectionTitle({
  children,
  subtitle,
  centered = true,
  dark = false
}: SectionTitleProps) {
  const textColor = dark ? 'text-white' : 'text-text-primary';
  const subtitleColor = dark ? 'text-white/90' : 'text-text-secondary';
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
