import React from 'react';
import { GitBranch, Code, Type } from 'lucide-react';
import { CardType } from '@/types/generator';

interface CardTypeSwitcherProps {
  cardType: CardType;
  setCardType: (type: CardType) => void;
}

export const CardTypeSwitcher = ({ cardType, setCardType }: CardTypeSwitcherProps) => {
  return (
    <div className="bg-[#0a0a0a] border border-amber-900 rounded-sm p-1.5 shadow-2xl flex gap-1">
      <button
        onClick={() => setCardType('github')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-sm text-sm font-semibold transition-all ${cardType === 'github' ? 'bg-amber-500 text-black shadow-lg' : 'text-amber-500/60 hover:text-amber-500 hover:bg-[#111]'}`}
      >
        <GitBranch className="w-4 h-4" />
        GitHub Stats
      </button>
      <button
        onClick={() => setCardType('leetcode')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-sm text-sm font-semibold transition-all ${cardType === 'leetcode' ? 'bg-amber-500 text-black shadow-lg' : 'text-amber-500/60 hover:text-amber-500 hover:bg-[#111]'}`}
      >
        <Code className="w-4 h-4" />
        <span className="hidden sm:inline">LeetCode Stats</span>
        <span className="sm:hidden">LeetCode</span>
      </button>
      <button
        onClick={() => setCardType('typing')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-sm text-sm font-semibold transition-all ${cardType === 'typing' ? 'bg-amber-500 text-black shadow-lg' : 'text-amber-500/60 hover:text-amber-500 hover:bg-[#111]'}`}
      >
        <Type className="w-4 h-4" />
        <span className="hidden sm:inline">Typing Intro</span>
        <span className="sm:hidden">Typing</span>
      </button>
    </div>
  );
};
