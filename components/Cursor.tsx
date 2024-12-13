import { useCardStore } from '@/store/cardStore';
import { useShallow } from 'zustand/react/shallow';
import { animated, useSpring } from '@react-spring/web';

export const Cursor: React.FC = () => {
  const { show, x, y, element } = useCardStore(
    useShallow((state) => ({
      show: state.showCursor,
      x: state.cursorX,
      y: state.cursorY,
      element: state.cursorElement,
    }))
  );

  const styleProps = useSpring({
    from: {
      x: show ? x : undefined,
      y: show ? y : undefined,
      opacity: 0,
    },
    to: {
      x,
      y,
      opacity: show ? 1 : 0,
    },
    config: (key) => {
      switch (key) {
        case 'opacity':
          return {
            tension: 200,
            friction: 20,
          };
        default:
          return {
            tension: 100,
            friction: 20,
          };
      }
    },
  });

  return (
    <animated.div
      className="pointer-events-none fixed hidden sm:block"
      style={styleProps}
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        {element}
      </div>
    </animated.div>
  );
};
