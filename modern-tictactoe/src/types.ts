export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];

export interface GameState {
  board: BoardState;
  xIsNext: boolean;
  winner: Player | 'Draw' | null;
  winningLine: number[] | null;
  scores: {
    player: number;
    computer: number;
    draws: number;
  };
  difficulty: 'Easy' | 'Hard';
  gameMode: 'PvP' | 'PvC'; // Player vs Player or Player vs Computer
}
