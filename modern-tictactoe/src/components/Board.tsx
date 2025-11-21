import React from 'react';
import { Cell } from './Cell';
import { BoardState } from '../types';

interface BoardProps {
  board: BoardState;
  onClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

export const Board: React.FC<BoardProps> = ({ board, onClick, winningLine, disabled }) => {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 glass-panel bg-black/20">
      {board.map((cell, index) => (
        <Cell
          key={index}
          index={index}
          value={cell}
          onClick={() => onClick(index)}
          isWinning={winningLine?.includes(index) ?? false}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
