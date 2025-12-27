
import React from 'react';

interface SentimentGaugeProps {
  percentage: number; // 0 to 100
  label: string;
}

export const SentimentGauge: React.FC<SentimentGaugeProps> = ({ percentage, label }) => {
  const rotation = (percentage / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-16 overflow-hidden">
        {/* Semi-circle track */}
        <div className="absolute top-0 left-0 w-32 h-32 border-[12px] border-gray-800 rounded-full"></div>
        {/* Active track */}
        <div 
          className="absolute top-0 left-0 w-32 h-32 border-[12px] border-[#ff6b00] rounded-full"
          style={{ 
            clipPath: `polygon(50% 50%, 0% 100%, 0% 50%, ${percentage > 50 ? '100% 50%, 100% 100%' : '50% 0%'})`,
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 1s ease-out'
          }}
        ></div>
        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 h-12 bg-white origin-bottom -translate-x-1/2"
          style={{ 
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            transition: 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        ></div>
      </div>
      <div className="flex justify-between w-full text-[10px] px-2 font-mono text-gray-500 mt-1">
        <span>UNDER</span>
        <span>OVER</span>
      </div>
      <span className="text-xs font-bold text-[#ff6b00] mt-1">{percentage}% Lean {label}</span>
    </div>
  );
};
