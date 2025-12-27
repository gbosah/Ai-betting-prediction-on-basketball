
export interface BettingAnalysis {
  timestamp: string;
  gameSummaries: GameSummary[];
  props: PlayerProp[];
  trendingTopics: string[];
  pastGames: PastGame[];
  expertPicks: ExpertPick[];
  sources: Source[];
}

export interface GameSummary {
  matchup: string;
  line: string;
  total: string;
  publicLean: number; // Percentage of bets on Over
  moneyPercentageUnder?: number; // Percentage of dollars on Under
  paceFactor: 'High' | 'Medium' | 'Low';
  vibeRecommendation: string;
  sentiment: string;
  isDangerousOver: boolean; // Flag for public over vs star defender returning
  isSharpFading: boolean; // Flag for public high over vs sharp high under money
}

export interface ExpertPick {
  expert: string;
  pick: string;
  game: string;
  confidence: string;
  timestamp: string;
}

export interface PastGame {
  matchup: string;
  finalScore: string;
  overUnderLine: string;
  publicLean: number; // % on Over
  sharpMoneyUnder: number; // % on Under
  winner: 'Public' | 'Sharp' | 'Push';
  wasSharpCorrect: boolean;
}

export interface PlayerProp {
  player: string;
  prop: string;
  sentiment: 'Over' | 'Under';
  confidence: number;
}

export interface Source {
  title: string;
  uri: string;
}

export interface AppState {
  isAnalyzing: boolean;
  analysis: BettingAnalysis | null;
  error: string | null;
}
