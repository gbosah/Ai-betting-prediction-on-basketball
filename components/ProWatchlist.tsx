
import React from 'react';
import { ExpertPick } from '../types.ts';
import { Eye, ShieldCheck, UserCheck } from 'lucide-react';

interface ProWatchlistProps {
  picks: ExpertPick[];
}

const ProWatchlist: React.FC<ProWatchlistProps> = ({ picks }) => {
  const experts = ["MJC Locks", "Paul Bovi", "Cam Is Money"];

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 cyan-glow h-full">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="text-[#00e5ff] w-5 h-5" />
        <h2 className="text-xl font-bold uppercase tracking-wider">Pro Watchlist</h2>
      </div>

      <div className="space-y-4">
        {experts.map((expertName) => {
          const expertPick = picks.find(p => p.expert === expertName);
          return (
            <div key={expertName} className="bg-[#242424] p-4 rounded-lg border border-gray-700 hover:border-[#00e5ff] transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center border border-gray-600 group-hover:border-[#00e5ff]">
                    <UserCheck className="w-4 h-4 text-gray-400 group-hover:text-[#00e5ff]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-none">{expertName}</h3>
                    <p className="text-[10px] text-gray-500 font-mono mt-1">ACTION NETWORK</p>
                  </div>
                </div>
                {expertPick ? (
                  <span className="text-[10px] font-bold text-green-500 bg-green-900/20 px-2 py-0.5 rounded border border-green-500/30">ACTIVE</span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-800 px-2 py-0.5 rounded">NO PICK</span>
                )}
              </div>

              {expertPick ? (
                <div className="space-y-2">
                  <p className="text-xs font-mono text-[#00e5ff]">{expertPick.game}</p>
                  <div className="flex items-center justify-between bg-black/40 p-2 rounded">
                    <span className="text-sm font-black text-white italic">{expertPick.pick}</span>
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" />
                      <span className="text-[10px] font-bold text-cyan-400">{expertPick.confidence}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No verified action identified for today's slate yet.</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full"></div>
        <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Tracking Verified Experts</span>
      </div>
    </div>
  );
};

export default ProWatchlist;
