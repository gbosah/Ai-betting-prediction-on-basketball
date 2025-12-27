
import React from 'react';
import { PastGame } from '../types.ts';

interface StreakTrackerProps {
  pastGames: PastGame[];
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ pastGames }) => {
  const sharpWins = pastGames.filter(g => g.winner === 'Sharp').length;
  const publicWins = pastGames.filter(g => g.winner === 'Public').length;

  const sharpIsLeading = sharpWins > publicWins;
  const publicIsLeading = publicWins > sharpWins;
  const isTied = sharpWins === publicWins;

  return (
    <div className="bg-black/40 border border-gray-800 rounded-lg p-2 px-4 flex items-center gap-6 shadow-inner">
      <div className="flex flex-col items-center">
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter leading-none mb-1">Sharps</span>
        <span className={`text-2xl font-black font-mono leading-none ${
          sharpIsLeading ? 'text-[#22c55e] [text-shadow:0_0_10px_#22c55e]' : (isTied ? 'text-white' : 'text-[#ef4444]')
        }`}>
          {sharpWins.toString().padStart(2, '0')}
        </span>
      </div>
      
      <div className="h-8 w-px bg-gray-800 self-center"></div>

      <div className="flex flex-col items-center">
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter leading-none mb-1">Public</span>
        <span className={`text-2xl font-black font-mono leading-none ${
          publicIsLeading ? 'text-[#22c55e] [text-shadow:0_0_10px_#22c55e]' : (isTied ? 'text-white' : 'text-[#ef4444]')
        }`}>
          {publicWins.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default StreakTracker;
