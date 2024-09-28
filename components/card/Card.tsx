'use client';

import { CardData } from '@/data/types';
import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DoubleSide, Matrix4 } from 'three';
import { CARD_RATIO, DEFAULT_CARD_COLOR } from '@/data/constants';
import { urlFor } from '@/sanity/lib/image';
import { CardContent } from '@/components/card/CardContent';
import Image from 'next/image';

type Props = CardData;

export const CARD_WIDTH = 3;
export const CARD_HEIGHT = CARD_WIDTH * CARD_RATIO;
const CARD_WIDTH_PX = 600;
const CARD_HEIGHT_PX = CARD_WIDTH_PX * CARD_RATIO;

export const Card: React.FC<Props> = (props) => {
  const { theme } = props;

  return (
    <div className="fixed inset-0">
      <Canvas shadows={false} gl={{ localClippingEnabled: true }}>
        <color attach="background" args={['#151515']} />
        <ambientLight intensity={0.1} />
        <directionalLight
          color="white"
          position={[-2, 3, 1]}
          intensity={10}
          castShadow
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
          shadow-normalBias={-0.01}
        />
        <PerspectiveCamera position={[-1, 2, 7]} makeDefault />
        <OrbitControls target={[CARD_WIDTH / 2, 0, 0]} />
        {/* Outside page */}
        <mesh
          matrix={new Matrix4()
            // .makeRotationY(2.5)
            .multiply(new Matrix4().makeTranslation(-CARD_WIDTH / 2, 0, 0))
            .multiply(new Matrix4().makeRotationY(Math.PI))}
          matrixAutoUpdate={false}
          castShadow
        >
          <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
          <meshStandardMaterial
            color={theme.cardColor.hex ?? DEFAULT_CARD_COLOR}
            side={DoubleSide}
          />
          <Html
            transform
            occlude
            scale={0.5}
            distanceFactor={2}
            position={[0, 0, 0.01]}
            material={<meshStandardMaterial side={DoubleSide} opacity={0.1} />}
          >
            <div
              className="pointer-events-none relative scale-[2] select-none"
              style={{
                width: `${CARD_WIDTH_PX}px`,
                height: `${CARD_HEIGHT_PX}px`,
              }}
            >
              {props.coverImage?.asset && (
                <Image
                  src={urlFor(props.coverImage.asset).url()}
                  alt=""
                  fill
                  objectFit="contain"
                />
              )}
            </div>
          </Html>
        </mesh>
        {/* Inside page */}
        <mesh position={[CARD_WIDTH / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
          <meshStandardMaterial
            side={DoubleSide}
            color={theme.cardColor.hex ?? DEFAULT_CARD_COLOR}
          />
        </mesh>
        <CardContent {...props} />
      </Canvas>
    </div>
  );
};
