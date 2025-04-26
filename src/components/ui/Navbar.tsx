import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  return (
    <header className={`bg-bg-dark-secondary border-b border-gray-800 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-title bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                BRNESTRM
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/metacognition" className="text-neutral-light hover:text-neon-pink transition-colors">
              메타인지
            </Link>
            <Link href="/prd" className="text-neutral-light hover:text-neon-purple transition-colors">
              PRD 생성
            </Link>
            <Link href="/canvas" className="text-neutral-light hover:text-neon-blue transition-colors">
              Canvas
            </Link>
            <Link href="/api-storage" className="text-neutral-light hover:text-neon-pink transition-colors">
              API 보관함
            </Link>
            <Link href="/curriculum" className="text-neutral-light hover:text-neon-purple transition-colors">
              커리큘럼
            </Link>
          </nav>
          
          <div className="flex items-center">
            <Link href="/login" className="text-neutral-light hover:text-neon-blue transition-colors">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
