import React from 'react';
import { Settings, RotateCcw, User, Cpu } from 'lucide-react';

interface ControlsProps {
  resetGame: () => void;
  difficulty: 'Easy' | 'Hard';
  setDifficulty: (d: 'Easy' | 'Hard') => void;
  gameMode: 'PvP' | 'PvC';
  setGameMode: (m: 'PvP' | 'PvC') => void;
}

export const Controls: React.FC<ControlsProps> = ({
  resetGame, difficulty, setDifficulty, gameMode, setGameMode
}) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mt-8">
      <div className="flex justify-center gap-4">
        <button
          onClick={resetGame}
          className="btn-glass flex items-center gap-2 text-lg font-semibold hover:bg-white/10"
        >
          <RotateCcw size={20} /> Restart Game
        </button>
      </div>

      <div className="glass-panel p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium flex items-center gap-2">
            <Settings size={16} /> Game Mode
          </span>
          <div className="flex bg-black/20 rounded-lg p-1">
            <button
              onClick={() => setGameMode('PvC')}
              className={`px-3 py-1 rounded-md text-sm transition-all ${gameMode === 'PvC' ? 'bg-white/20 shadow-sm' : 'opacity-50 hover:opacity-100'}`}
            >
              <div className="flex items-center gap-1"><Cpu size={14} /> PvC</div>
            </button>
            <button
              onClick={() => setGameMode('PvP')}
              className={`px-3 py-1 rounded-md text-sm transition-all ${gameMode === 'PvP' ? 'bg-white/20 shadow-sm' : 'opacity-50 hover:opacity-100'}`}
            >
              <div className="flex items-center gap-1"><User size={14} /> PvP</div>
            </button>
          </div>
        </div>

        {gameMode === 'PvC' && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Difficulty</span>
            <div className="flex bg-black/20 rounded-lg p-1">
              <button
                onClick={() => setDifficulty('Easy')}
                className={`px-3 py-1 rounded-md text-sm transition-all ${difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' : 'opacity-50 hover:opacity-100'}`}
              >
                Easy
              </button>
              <button
                onClick={() => setDifficulty('Hard')}
                className={`px-3 py-1 rounded-md text-sm transition-all ${difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' : 'opacity-50 hover:opacity-100'}`}
              >
                Hard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
