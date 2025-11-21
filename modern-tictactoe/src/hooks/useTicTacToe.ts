import { useState, useEffect, useCallback } from 'react';
import { BoardState, Player } from '../types';
import { checkWinner, getBestMove } from '../utils/gameLogic';

const INITIAL_BOARD: BoardState = Array(9).fill(null);

export function useTicTacToe() {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [xIsNext, setXIsNext] = useState<boolean>(true); // X always goes first in this logic
  const [gameMode, setGameMode] = useState<'PvP' | 'PvC'>('PvC');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Hard'>('Hard');
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('tictactoe-scores');
    return saved ? JSON.parse(saved) : { player: 0, computer: 0, draws: 0 };
  });

  useEffect(() => {
    localStorage.setItem('tictactoe-scores', JSON.stringify(scores));
  }, [scores]);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<Player>('X'); // Player's chosen symbol

  const currentPlayer = xIsNext ? 'X' : 'O';
  const isGameOver = winner !== null;

  const resetGame = useCallback((resetScores = false) => {
    setBoard(INITIAL_BOARD);
    setXIsNext(true); // X always starts
    setWinner(null);
    setWinningLine(null);
    if (resetScores) {
      setScores({ player: 0, computer: 0, draws: 0 });
    }
  }, []);

  const handleClick = useCallback((index: number) => {
    if (board[index] || isGameOver) return;

    // If PvC and it's computer's turn, ignore click (though UI should prevent this)
    if (gameMode === 'PvC' && currentPlayer !== playerSymbol) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
      updateScore(result.winner);
    } else {
      setXIsNext(!xIsNext);
    }
  }, [board, isGameOver, gameMode, currentPlayer, playerSymbol, xIsNext]);

  const updateScore = (result: Player | 'Draw') => {
    setScores((prev: { player: number; computer: number; draws: number }) => {
      if (result === 'Draw') return { ...prev, draws: prev.draws + 1 };
      // In PvC: if winner is playerSymbol -> player wins, else computer wins
      // In PvP: X is player 1 (mapped to 'player' score for now), O is player 2 ('computer' score reused or need rename)
      // For simplicity in PvC:
      if (gameMode === 'PvC') {
        return result === playerSymbol
          ? { ...prev, player: prev.player + 1 }
          : { ...prev, computer: prev.computer + 1 };
      }
      // PvP logic (Player 1 = X, Player 2 = O)
      return result === 'X'
        ? { ...prev, player: prev.player + 1 }
        : { ...prev, computer: prev.computer + 1 };
    });
  };

  // Computer Move Effect
  useEffect(() => {
    if (gameMode === 'PvC' && !isGameOver && currentPlayer !== playerSymbol) {
      // Small delay for realism
      const timer = setTimeout(() => {
        const moveIndex = getBestMove(board, currentPlayer, difficulty);
        if (moveIndex !== -1) {
          const newBoard = [...board];
          newBoard[moveIndex] = currentPlayer;
          setBoard(newBoard);

          const result = checkWinner(newBoard);
          if (result.winner) {
            setWinner(result.winner);
            setWinningLine(result.line);
            updateScore(result.winner);
          } else {
            setXIsNext(!xIsNext);
          }
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [board, gameMode, isGameOver, currentPlayer, playerSymbol, difficulty, xIsNext]);

  return {
    board,
    currentPlayer,
    winner,
    winningLine,
    scores,
    gameMode,
    setGameMode,
    difficulty,
    setDifficulty,
    playerSymbol,
    setPlayerSymbol,
    resetGame,
    handleClick,
    xIsNext
  };
}
