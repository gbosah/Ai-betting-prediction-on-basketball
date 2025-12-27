
import React, { useState, useEffect, useCallback } from 'react';
import { BettingAnalysis, AppState } from './types.ts';
import { fetchHoopLogicAnalysis } from './services/geminiService.ts';
import { BasketballLogo, Loader } from './components/BasketballIcons.tsx';
import LiveFeed from './components/LiveFeed.tsx';
import VibeSummary from './components/VibeSummary.tsx';
import PropCorner from './components/PropCorner.tsx';
import PastReview from './components/PastReview.tsx';
import StreakTracker from './components/StreakTracker.tsx';
import ProWatchlist from './components/ProWatchlist.tsx';
import { RefreshCw, LayoutGrid, Info, ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isAnalyzing: true,
    analysis: null,
    error: null,
  });

  const runAnalysis = useCallback(async () => {
    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));
    try {
      const result = await fetchHoopLogicAnalysis();
      setState({
        isAnalyzing: false,
        analysis: result as BettingAnalysis,
        error: null
      });
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isAnalyzing: false, 
        error: err.message || 'Failed to sync with betting markets.' 
      }));
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchHoopLogicAnalysis();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []); // The [] means "Only run once when the page opens"

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-800 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#ff6b00] p-2 rounded-lg orange-glow shadow-[0_0_20px_rgba(255,107,0,0.3)]">
              <BasketballLogo className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">HOOP<span className="text-[#ff6b00]">LOGIC</span></h1>
              <p className="text-[10px] font-mono tracking-widest text-[#00e5ff] uppercase">Senior Quant & Sentiment Intelligence</p>
            </div>
          </div>

          {state.analysis && (
            <div className="hidden lg:block">
              <StreakTracker pastGames={state.analysis.pastGames} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-mono text-gray-500 uppercase">System Status</p>
            <p className="text-xs font-bold text-green-500 uppercase">Operational</p>
          </div>
          <button 
            onClick={runAnalysis}
            disabled={state.isAnalyzing}
            className="flex items-center gap-2 bg-[#ff6b00] hover:bg-[#ff8533] disabled:opacity-50 text-white font-bold py-2.5 px-6 rounded-lg transition-all active:scale-95 shadow-lg"
          >
            <RefreshCw className={`w-4 h-4 ${state.isAnalyzing ? 'animate-spin' : ''}`} />
            REFRESH MARKETS
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {state.isAnalyzing ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <Loader />
          </div>
        ) : state.error ? (
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-12 text-center max-w-2xl mx-auto">
            <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2 text-white">Analysis Interrupted</h2>
            <p className="text-gray-400 mb-6 font-mono text-sm">{state.error}</p>
            <button 
              onClick={runAnalysis}
              className="bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-200"
            >
              RETRY CONNECTION
            </button>
          </div>
        ) : state.analysis ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Feed */}
            <div className="lg:col-span-3 h-full">
              <LiveFeed 
                games={state.analysis.gameSummaries} 
                trends={state.analysis.trendingTopics} 
              />
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 space-y-6">
              <VibeSummary 
                games={state.analysis.gameSummaries} 
                sources={state.analysis.sources} 
              />
              <PastReview pastGames={state.analysis.pastGames} />
              <PropCorner props={state.analysis.props} />
              
              <footer className="pt-8 border-t border-gray-800 text-[10px] font-mono text-gray-600 flex justify-between items-center">
                <span>LAST UPDATE: {new Date(state.analysis.timestamp).toLocaleTimeString()}</span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse"></div>
                  DATA GROUNDED VIA GEMINI SEARCH
                </span>
              </footer>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3">
              <ProWatchlist picks={state.analysis.expertPicks || []} />
            </div>
          </div>
        ) : null}
      </main>

      {/* Info Bar */}
      {!state.isAnalyzing && !state.error && (
        <div className="fixed bottom-4 right-4 max-w-xs bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl shadow-2xl z-50 cyan-glow hidden xl:block">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-400 leading-relaxed uppercase">
              <span className="text-[#00e5ff] font-bold">Disclaimer:</span> Analysis is for entertainment/informational purposes only. 
              Always cross-reference with actual live sportsbook lines before placing bets.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
