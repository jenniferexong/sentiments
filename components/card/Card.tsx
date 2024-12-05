'use client';

import { CardData } from '@/data/types';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { CARD_HEIGHT, CARD_WIDTH, DEFAULT_CARD_COLOR } from '@/data/constants';
import { CardContent } from '@/components/card/CardContent';
import { CardCover } from '@/components/card/CardCover';

type Props = CardData;

export const Card: React.FC<Props> = (props) => {
  const { theme } = props;

  return (
    <div className="fixed inset-0">
      <Canvas shadows={false} gl={{ localClippingEnabled: true }}>
        <color attach="background" args={['#151515']} />
        <ambientLight intensity={2} />
        <directionalLight
          color="white"
          position={[-2, 3, 1]}
          intensity={2}
          castShadow
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
          shadow-normalBias={-0.01}
        />
        <PerspectiveCamera
          position={[CARD_WIDTH * 1.2, 1, CARD_WIDTH * 2.4]}
          makeDefault
        />
        {/* TODO: Make target the inside page on mobile */}
        <OrbitControls target={[CARD_WIDTH / 2, 0, 0]} />
        <CardCover {...props} />
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
