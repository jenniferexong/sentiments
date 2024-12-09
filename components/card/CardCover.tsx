import { CardData } from '@/data/types';
import {
  DoubleSide,
  Euler,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  CURSOR_ELEMENT,
  DEFAULT_CARD_COLOR,
} from '@/data/constants';
import { urlFor } from '@/sanity/lib/image';
import { clamp } from '@/utils';
import { Root, Image } from '@react-three/uikit';
import { useCardStore } from '@/store/cardStore';
import { useShallow } from 'zustand/react/shallow';
import { CardAnimationState } from '@/components/card/types';

const CLOSED_ANGLE = Math.PI - 0.1;
const OPEN_ANGLE = 1;

type Props = CardData;

const position = new Vector3();
const rotation = new Quaternion();
const scale = new Vector3();

const translationMatrix = new Matrix4().makeTranslation(-CARD_WIDTH / 2, 0, 0);
// Flips the cover to show other side
const rotationMatrix = new Matrix4().makeRotationY(Math.PI);
const initialMatrix = new Matrix4()
  .makeRotationY(CLOSED_ANGLE)
  .multiply(translationMatrix)
  .multiply(rotationMatrix);

const tempMatrix = new Matrix4();

export const CardCover: React.FC<Props> = (props) => {
  const { theme } = props;

  const { setShowCursor, setCursorElement } = useCardStore(
    useShallow((state) => ({
      setShowCursor: state.setShowCursor,
      setCursorElement: state.setCursorElement,
    }))
  );

  const coverRef = useRef<Mesh | null>(null);
  const animationState = useRef<CardAnimationState>(CardAnimationState.Closing);
  const currentAngle = useRef<number>(CLOSED_ANGLE);

  // Card opening animation
  useFrame((state, delta) => {
    const cover = coverRef.current;

    const isAnimating =
      (animationState.current === CardAnimationState.Closing &&
        currentAngle.current < CLOSED_ANGLE) ||
      (animationState.current === CardAnimationState.Opening &&
        currentAngle.current > OPEN_ANGLE);

    if (!cover || !isAnimating) {
      return;
    }

    state.events.update?.();
    setCursorElement(CURSOR_ELEMENT[animationState.current]);

    const angleChange = delta * 4 * animationState.current;

    // Fully open = 0
    // Open = 1
    // Closed = π - 0.1
    // Fully closed = π
    currentAngle.current = clamp(
      currentAngle.current + angleChange,
      OPEN_ANGLE,
      CLOSED_ANGLE
    );

    tempMatrix.makeRotationY(currentAngle.current);

    tempMatrix.multiply(translationMatrix);
    tempMatrix.multiply(rotationMatrix);

    tempMatrix.decompose(position, rotation, scale);
    const euler = new Euler().setFromQuaternion(rotation);

    cover.scale.set(scale.x, scale.y, scale.z);
    cover.rotation.set(euler.x, euler.y, euler.z);
    cover.position.set(position.x, position.y, position.z);
    cover.updateMatrix();
  });

  const onHover = () => {
    document.body.style.cursor = 'none';
    setShowCursor(true);
  };

  const onBlur = () => {
    document.body.style.cursor = 'auto';
    setShowCursor(false);
  };

  return (
    <mesh
      ref={coverRef}
      matrix={initialMatrix}
      matrixAutoUpdate={false}
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        animationState.current *= -1;
        console.log('state', animationState.current);
      }}
      onPointerOver={onHover}
      onPointerOut={onBlur}
    >
      <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
      <meshStandardMaterial
        color={theme.cardColor.hex ?? DEFAULT_CARD_COLOR}
        side={DoubleSide}
      />
      {props.coverImage?.asset && (
        <Root
          sizeX={CARD_WIDTH}
          sizeY={CARD_HEIGHT}
          transformTranslateZ={0.1}
          backgroundOpacity={0}
          panelMaterialClass={MeshStandardMaterial}
          flexDirection="row"
          alignItems="center"
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            src={urlFor(props.coverImage.asset).url()}
            width="100%"
            height="auto"
          />
        </Root>
      )}
    </mesh>
  );
};
