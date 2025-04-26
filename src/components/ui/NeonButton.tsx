import React from 'react';
import Link from 'next/link';

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  color?: 'pink' | 'purple' | 'blue';
  onClick?: () => void;
  className?: string;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  href, 
  color = 'blue', 
  onClick,
  className = ''
}) => {
  const colorClasses = {
    pink: 'border-neon-pink text-neon-pink hover:bg-neon-pink/10 hover:shadow-neon-pink',
    purple: 'border-neon-purple text-neon-purple hover:bg-neon-purple/10 hover:shadow-neon-purple',
    blue: 'border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:shadow-neon-blue',
  };
  
  const baseClasses = `
    px-6 py-2 rounded-md border-2 font-title
    transition-all duration-300 ease-in-out
    hover:shadow-lg hover:shadow-glow
    ${colorClasses[color]}
    ${className}
  `;
  
  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={baseClasses}
    >
      {children}
    </button>
  );
};

export default NeonButton;
