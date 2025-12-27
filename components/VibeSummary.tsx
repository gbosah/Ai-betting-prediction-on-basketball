
import React from 'react';
import { GameSummary, Source } from '../types.ts';
import { SentimentGauge } from './SentimentGauge.tsx';
import { Zap, AlertTriangle, ShieldAlert, Link as LinkIcon } from 'lucide-react';

interface VibeSummaryProps {
  games: GameSummary[];
  sources: Source[];
}

const VibeSummary: React.FC<VibeSummaryProps> = ({ games, sources }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 cyan-glow">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="text-[#00e5ff] w-5 h-5" />
          <h2 className="text-xl font-bold uppercase tracking-wider">The Total Vibe</h2>
        </div>
        
        <div className="space-y-4">
          {games.map((game, idx) => (
            <div key={idx} className={`bg-[#242424] p-4 rounded-lg border-l-4 ${game.isDangerousOver || game.isSharpFading ? 'border-red-500' : 'border-[#ff6b00]'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    {game.matchup}
                    {game.isDangerousOver && <AlertTriangle className="w-4 h-4 text-red-500" title="Dangerous Over Flag" />}
                    {game.isSharpFading && <ShieldAlert className="w-4 h-4 text-cyan-400" title="Sharp Money Fading Public" />}
                  </h3>
                  <p className="text-sm text-gray-400 font-mono">Total: {game.total} | Line: {game.line}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="bg-[#333] px-2 py-1 rounded text-[10px] font-bold text-[#00e5ff]">
                    PACE: {game.paceFactor}
                  </div>
                  {game.isSharpFading && (
                    <span className="text-[10px] font-bold text-cyan-400 font-mono animate-pulse">SHARP DIVERGENCE</span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6 mt-4">
                <div className="shrink-0">
                  <SentimentGauge percentage={game.publicLean} label="OVER" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className={`p-3 rounded-lg border ${game.isDangerousOver || game.isSharpFading ? 'bg-red-900/10 border-red-500/30' : 'bg-[#1a1a1a] border-gray-700'}`}>
                    <p className={`text-sm leading-relaxed italic ${game.isDangerousOver || game.isSharpFading ? 'text-red-200' : 'text-[#f8fafc]'}`}>
                      &ldquo;{game.vibeRecommendation}&rdquo;
                    </p>
                  </div>
                  {game.moneyPercentageUnder && (
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden flex">
                        <div className="bg-cyan-500 h-full" style={{ width: `${game.moneyPercentageUnder}%` }}></div>
                        <div className="bg-gray-700 h-full flex-1"></div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 shrink-0">{game.moneyPercentageUnder}% Sharp Money Under</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <LinkIcon className="text-gray-400 w-4 h-4" />
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Grounding Intelligence</h3>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {sources.map((source, idx) => (
            <a 
              key={idx} 
              href={source.uri} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#00e5ff] hover:underline flex items-center gap-2 truncate"
            >
              <span className="w-1 h-1 bg-[#00e5ff] rounded-full"></span>
              {source.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VibeSummary;
