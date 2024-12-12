import { CardConfettiHandles } from '@/components/card/types';
import { Confetti } from '@/components/Confetti';
import { CardData } from '@/data/types';
import { forwardRef, useImperativeHandle, useState } from 'react';

type Props = Pick<CardData, 'size'> & {
  colors: string[];
};

export const CardConfetti = forwardRef<CardConfettiHandles, Props>(
  (props, ref) => {
    const { width, height } = props.size;

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
        areaWidth={width / 4}
        areaHeight={height / 4}
        anchorX={width / 2}
        anchorY={0}
        radius={7}
        fallingSpeed={1.4}
        colors={props.colors}
      />
    );
  }
);
CardConfetti.displayName = 'CardConfetti';
