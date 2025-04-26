import React from 'react';

interface WaveBackgroundProps {
  className?: string;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 z-[-1] overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 opacity-30">
        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 h-64 wave-animation" style={{ animationDelay: '0s' }}>
          <svg viewBox="0 0 1440 320" className="w-full h-full">
            <path 
              fill="rgba(138, 43, 226, 0.3)" 
              fillOpacity="1" 
              d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,117.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
        
        {/* Middle wave */}
        <div className="absolute top-1/4 left-0 right-0 h-64 wave-animation" style={{ animationDelay: '0.5s' }}>
          <svg viewBox="0 0 1440 320" className="w-full h-full">
            <path 
              fill="rgba(0, 191, 255, 0.3)" 
              fillOpacity="1" 
              d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,144C672,149,768,171,864,165.3C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-64 wave-animation" style={{ animationDelay: '1s' }}>
          <svg viewBox="0 0 1440 320" className="w-full h-full">
            <path 
              fill="rgba(255, 0, 255, 0.3)" 
              fillOpacity="1" 
              d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WaveBackground;
