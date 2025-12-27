
import React from 'react';
import { PlayerProp } from '../types.ts';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface PropCornerProps {
  props: PlayerProp[];
}

const PropCorner: React.FC<PropCornerProps> = ({ props }) => {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 orange-glow">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-[#ff6b00] w-5 h-5" />
        <h2 className="text-xl font-bold uppercase tracking-wider">Prop Corner</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {props.map((p, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-[#242424] rounded-lg border border-gray-700">
            <div>
              <p className="text-sm font-bold text-white">{p.player}</p>
              <p className="text-xs text-gray-400 font-mono uppercase">{p.prop}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold ${
                p.sentiment === 'Over' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
              }`}>
                {p.sentiment === 'Over' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {p.sentiment}
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-mono">CONFIDENCE</p>
                <p className="text-xs font-bold text-[#ff6b00]">{p.confidence}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropCorner;
