import React from 'react';

const PrettyMailLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeConfig = {
    sm: { width: 32, height: 24 },
    md: { width: 48, height: 36 },
    lg: { width: 64, height: 48 }
  };

  const config = sizeConfig[size];

  return (
    <svg 
      width={config.width} 
      height={config.height} 
      viewBox="0 0 100 75" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Decorative flourishes on top */}
      <path 
        d="M15 15 C25 5, 35 5, 40 12 C45 5, 55 5, 65 12 C70 5, 80 5, 85 15"
        stroke="currentColor" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Main envelope rectangle */}
      <rect 
        x="10" 
        y="25" 
        width="80" 
        height="45" 
        rx="4" 
        stroke="currentColor" 
        strokeWidth="3" 
        fill="none"
      />
      
      {/* Envelope flap lines */}
      <path 
        d="M10 30 L50 55 L90 30"
        stroke="currentColor" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Left diagonal line */}
      <path 
        d="M10 70 L35 50"
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      
      {/* Right diagonal line */}
      <path 
        d="M90 70 L65 50"
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PrettyMailLogo;
