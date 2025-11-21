import { BoardState, Player } from '../types';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export function checkWinner(board: BoardState): { winner: Player | 'Draw' | null, line: number[] | null } {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }

  if (!board.includes(null)) {
    return { winner: 'Draw', line: null };
  }

  return { winner: null, line: null };
}

// AI Logic adapted from original script.js
// Original used 0=empty, 1=player(X), 3=computer(O) usually.
// We will use 'X' and 'O'. Assumes Computer is 'O' for now in PvC, or we pass the computer's symbol.

export function getBestMove(board: BoardState, computerPlayer: Player, difficulty: 'Easy' | 'Hard'): number {
  const humanPlayer = computerPlayer === 'X' ? 'O' : 'X';
  const freeCells = board.map((cell, index) => cell === null ? index : -1).filter(i => i !== -1);

  if (freeCells.length === 0) return -1;

  // Helper to check if a move leads to a win for a specific player
  const findWinningMove = (player: Player): number => {
    for (const index of freeCells) {
      const tempBoard = [...board];
      tempBoard[index] = player;
      if (checkWinner(tempBoard).winner === player) {
        return index;
      }
    }
    return -1;
  };

  if (difficulty === 'Hard') {
    // 1. Win if possible
    const winningMove = findWinningMove(computerPlayer);
    if (winningMove !== -1) return winningMove;

    // 2. Block human win
    const blockingMove = findWinningMove(humanPlayer);
    if (blockingMove !== -1) return blockingMove;

    // 3. Take center if available
    if (board[4] === null) return 4;

    // 4. Take corners
    const corners = [0, 2, 6, 8].filter(i => board[i] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }
  }

  // Easy mode or fallback: Random move
  return freeCells[Math.floor(Math.random() * freeCells.length)];
}
