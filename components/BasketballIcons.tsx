
import React from 'react';

export const BasketballLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M4 8C7 10 17 10 20 8" stroke="currentColor" strokeWidth="2" />
    <path d="M4 16C7 14 17 14 20 16" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2V22" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-12">
    <div className="animate-bounce mb-4 text-[#ff6b00]">
      <BasketballLogo className="w-16 h-16" />
    </div>
    <p className="text-[#00e5ff] font-mono animate-pulse">CALIBRATING QUANTS...</p>
  </div>
);
