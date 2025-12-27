
import React from 'react';
import { PastGame } from '../types.ts';
import { Crown, History, TrendingUp, TrendingDown } from 'lucide-react';

interface PastReviewProps {
  pastGames: PastGame[];
}

const PastReview: React.FC<PastReviewProps> = ({ pastGames }) => {
  if (!pastGames || pastGames.length === 0) return null;

  const sharpWinCount = pastGames.filter(g => g.winner === 'Sharp').length;
  const publicWinCount = pastGames.filter(g => g.winner === 'Public').length;

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 cyan-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <History className="text-[#00e5ff] w-5 h-5" />
          <h2 className="text-xl font-bold uppercase tracking-wider">Yesterday's Review</h2>
        </div>
        <div className="flex items-center gap-4 bg-[#242424] px-4 py-1.5 rounded-full border border-gray-700">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-500 font-mono">SHARPS</span>
            <span className={`text-xs font-bold ${sharpWinCount > publicWinCount ? 'text-[#00e5ff]' : 'text-gray-400'}`}>
              {sharpWinCount}W
            </span>
          </div>
          <div className="w-px h-3 bg-gray-700"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-500 font-mono">PUBLIC</span>
            <span className={`text-xs font-bold ${publicWinCount > sharpWinCount ? 'text-[#ff6b00]' : 'text-gray-400'}`}>
              {publicWinCount}W
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pastGames.map((game, idx) => (
          <div key={idx} className="bg-[#242424] p-4 rounded-lg border border-gray-700 hover:border-[#00e5ff] transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-sm text-white">{game.matchup}</h3>
                <p className="text-[10px] font-mono text-gray-400">Score: {game.finalScore} (O/U {game.overUnderLine})</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {/* Public Column */}
              <div className="relative p-2 rounded bg-[#1a1a1a] border border-gray-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-mono text-gray-500">PUBLIC</span>
                  {game.winner === 'Public' && <Crown className="w-3 h-3 text-[#ff6b00]" />}
                </div>
                <div className="text-sm font-bold text-[#ff6b00]">{game.publicLean}% Over</div>
              </div>

              {/* Sharp Column */}
              <div className="relative p-2 rounded bg-[#1a1a1a] border border-gray-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-mono text-gray-500">SHARPS</span>
                  {game.winner === 'Sharp' && <Crown className="w-3 h-3 text-yellow-500" />}
                </div>
                <div className="text-sm font-bold text-yellow-500">{game.sharpMoneyUnder}% Under</div>
              </div>
            </div>

            <div className="mt-3 flex justify-center">
              {game.winner === 'Push' ? (
                <span className="text-[10px] font-mono text-gray-500">LINE PUSH</span>
              ) : (
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                  game.winner === 'Sharp' ? 'bg-yellow-900/20 text-yellow-500 border border-yellow-500/30' : 'bg-orange-900/20 text-[#ff6b00] border border-orange-500/30'
                }`}>
                  <Crown size={12} />
                  {game.winner.toUpperCase()} SIDE COLLECTED
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastReview;
