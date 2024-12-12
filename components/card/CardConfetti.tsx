import { CardConfettiHandles } from '@/components/card/types';
import { Confetti } from '@/components/Confetti';
import { CARD_HEIGHT, CARD_WIDTH } from '@/data/constants';
import { forwardRef, useImperativeHandle, useState } from 'react';

type Props = {
  colors: string[];
};

export const CardConfetti = forwardRef<CardConfettiHandles, Props>(
  (props, ref) => {
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        setExploding: setShow,
      };
    }, []);

    return (
      <Confetti
        isExploding={show}
        amount={150}
        rate={20}
        areaWidth={CARD_WIDTH / 4}
        areaHeight={CARD_HEIGHT / 4}
        anchorX={CARD_WIDTH / 2}
        anchorY={0}
        radius={7}
        fallingSpeed={1.4}
        colors={props.colors}
      />
    );
  }
);
CardConfetti.displayName = 'CardConfetti';
