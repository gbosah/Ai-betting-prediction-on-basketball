
import React from 'react';
import { GameSummary } from '../types.ts';
import { MessageSquare, Activity, Hash } from 'lucide-react';

interface LiveFeedProps {
  games: GameSummary[];
  trends: string[];
}

const LiveFeed: React.FC<LiveFeedProps> = ({ games, trends }) => {
  return (
    <div className="space-y-6 h-full">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 overflow-hidden flex flex-col h-full max-h-[600px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="text-[#ff6b00] w-5 h-5" />
            <h2 className="text-xl font-bold uppercase tracking-wider">Live Sentiment</h2>
          </div>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono text-gray-500">LIVE</span>
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
          {games.map((game, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center shrink-0 border border-gray-700 group-hover:border-[#ff6b00] transition-colors">
                  <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-[#ff6b00]" />
                </div>
                <div className="space-y-1 pb-4 border-b border-gray-800 w-full">
                  <p className="text-xs font-bold text-gray-400 font-mono">{game.matchup}</p>
                  <p className="text-sm text-gray-200 leading-snug">
                    {game.sentiment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="text-[#00e5ff] w-5 h-5" />
          <h2 className="text-lg font-bold uppercase tracking-wider">Sharp Signals</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trends.map((trend, idx) => (
            <span key={idx} className="bg-[#242424] text-[#00e5ff] text-xs px-3 py-1.5 rounded-full border border-gray-800 font-mono hover:bg-[#00e5ff] hover:text-[#1a1a1a] transition-colors cursor-default">
              #{trend.replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
