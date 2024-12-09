import { CardAnimationState } from '@/components/card/types';
import { CURSOR_ELEMENT } from '@/data/constants';
import { ReactNode } from 'react';
import { create } from 'zustand';

interface CardState {
  showCursor: boolean;
  cursorX: number;
  cursorY: number;
  cursorElement: ReactNode;
  setShowCursor: (show: boolean) => void;
  setCursorPosition: (x: number, y: number) => void;
  setCursorElement: (element: ReactNode) => void;
}

export const useCardStore = create<CardState>()((set) => ({
  showCursor: false,
  cursorX: 0,
  cursorY: 0,
  cursorElement: CURSOR_ELEMENT[CardAnimationState.Closing],
  setShowCursor: (show) => {
    set({ showCursor: show });
  },
  setCursorPosition: (x, y) => {
    set({ cursorX: x, cursorY: y });
  },
  setCursorElement: (element) => set({ cursorElement: element }),
}));
