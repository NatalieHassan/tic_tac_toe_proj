import React from 'react';

interface ScoreBoardProps {
  scores: { player: number; computer: number; draws: number };
  xIsNext: boolean;
  gameMode: 'PvP' | 'PvC';
  playerSymbol: 'X' | 'O';
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, xIsNext, gameMode, playerSymbol }) => {
  const isPlayerTurn = (playerSymbol === 'X' && xIsNext) || (playerSymbol === 'O' && !xIsNext);

  return (
    <div className="flex justify-between items-center w-full max-w-md mb-8 glass-panel p-4">
      <div className={`text-center transition-opacity ${isPlayerTurn ? 'opacity-100' : 'opacity-50'}`}>
        <div className="text-sm uppercase tracking-wider mb-1">
          {gameMode === 'PvC' ? 'You' : 'Player 1 (X)'}
        </div>
        <div className="text-3xl font-bold text-[var(--accent-x)]" style={{ textShadow: 'var(--neon-glow-x)' }}>
          {scores.player}
        </div>
      </div>

      <div className="text-center px-4 border-x border-[var(--glass-border)]">
        <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Draws</div>
        <div className="text-2xl font-bold text-white">{scores.draws}</div>
      </div>

      <div className={`text-center transition-opacity ${!isPlayerTurn ? 'opacity-100' : 'opacity-50'}`}>
        <div className="text-sm uppercase tracking-wider mb-1">
          {gameMode === 'PvC' ? 'Computer' : 'Player 2 (O)'}
        </div>
        <div className="text-3xl font-bold text-[var(--accent-o)]" style={{ textShadow: 'var(--neon-glow-o)' }}>
          {scores.computer}
        </div>
      </div>
    </div>
  );
};
