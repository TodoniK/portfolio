import React from 'react';

interface TechBadgeProps {
  name: string;
  url: string;
  className?: string;
}

export default function TechBadge({ name, url, className = '' }: TechBadgeProps) {
  return (
    <span title={`Technologie: ${name}`} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={url} 
        alt={`Badge ${name}`}
        style={{ height: '20px', width: 'auto', margin: '0 2px' }}
        loading="lazy"
      />
    </span>
  );
}
