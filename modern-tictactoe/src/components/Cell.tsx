import React from 'react';
import { motion } from 'framer-motion';
import { CellValue } from '../types';

interface CellProps {
  index: number;
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, isWinning, disabled }) => {
  return (
    <motion.button
      whileHover={!value && !disabled ? { scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" } : {}}
      whileTap={!value && !disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`
        h-24 w-24 sm:h-32 sm:w-32 
        glass-panel 
        flex items-center justify-center 
        text-5xl sm:text-6xl font-bold 
        focus:outline-none
        ${isWinning ? 'bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : ''}
      `}
      style={{
        color: value === 'X' ? 'var(--accent-x)' : 'var(--accent-o)',
        textShadow: value === 'X' ? 'var(--neon-glow-x)' : value === 'O' ? 'var(--neon-glow-o)' : 'none'
      }}
    >
      {value && (
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};
