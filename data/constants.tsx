import { CardAnimationState } from '@/components/card/types';
import { Label } from '@/components/Label';
import { ReactNode } from 'react';
import Close from '@/assets/icons/close.svg';
import Open from '@/assets/icons/open.svg';

export const DEFAULT_CARD_TEXT_COLOR = '#000000';
export const DEFAULT_CARD_COLOR = '#ffffff';

export const CARD_RATIO = 1.414;
export const CARD_TEXT_SIZE_TITLE = 18;
export const CARD_TEXT_SIZE_HEADING = 16;
export const CARD_TEXT_SIZE = 12;

export const CARD_WIDTH = 3;
export const CARD_HEIGHT = CARD_WIDTH * CARD_RATIO;
export const CARD_WIDTH_PX = 600;
export const CARD_HEIGHT_PX = CARD_WIDTH_PX * CARD_RATIO;

export const CURSOR_ELEMENT: Record<CardAnimationState, ReactNode> = {
  [CardAnimationState.Closing]: <Label icon={Open} label="Open" />,
  [CardAnimationState.Opening]: <Label icon={Close} label="Close" />,
};

// Fully open = 0
// Open = 1
// Closed = π - 0.1
// Fully closed = π
export const CARD_TARGET_ANGLE: Record<CardAnimationState, number> = {
  [CardAnimationState.Closing]: Math.PI - 0.1,
  [CardAnimationState.Opening]: 1,
};
