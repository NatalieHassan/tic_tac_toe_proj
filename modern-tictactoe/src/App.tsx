import { motion, AnimatePresence } from 'framer-motion';
import { useTicTacToe } from './hooks/useTicTacToe';
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { Controls } from './components/Controls';

function App() {
  const {
    board,
    winner,
    winningLine,
    scores,
    gameMode,
    setGameMode,
    difficulty,
    setDifficulty,
    playerSymbol,
    resetGame,
    handleClick,
    xIsNext
  } = useTicTacToe();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-x)] to-[var(--accent-o)] drop-shadow-lg"
      >
        Tic Tac Toe
      </motion.h1>

      <ScoreBoard
        scores={scores}
        xIsNext={xIsNext}
        gameMode={gameMode}
        playerSymbol={playerSymbol}
      />

      <Board
        board={board}
        onClick={handleClick}
        winningLine={winningLine}
        disabled={!!winner}
      />

      <Controls
        resetGame={() => resetGame(false)}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        gameMode={gameMode}
        setGameMode={setGameMode}
      />

      {/* Winner Overlay */}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => resetGame(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="glass-panel p-8 text-center max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-4xl font-bold mb-4">
                {winner === 'Draw' ? 'It\'s a Draw!' : (
                  <>
                    <span style={{ color: winner === 'X' ? 'var(--accent-x)' : 'var(--accent-o)' }}>
                      {winner}
                    </span> Wins!
                  </>
                )}
              </h2>
              <p className="mb-6 text-gray-300">
                {winner === 'Draw' ? 'Well played both sides.' : 'Congratulations!'}
              </p>
              <button
                onClick={() => resetGame(false)}
                className="btn-glass bg-white/10 text-lg px-8 py-2 w-full"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
