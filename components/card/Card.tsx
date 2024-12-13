'use client';

import { CardData } from '@/data/types';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { CardContent } from '@/components/card/CardContent';
import { CardCover } from '@/components/card/CardCover';
import { MouseEventHandler, Suspense } from 'react';
import { Cursor } from '@/components/Cursor';
import { useCardStore } from '@/store/cardStore';
import { Loading } from '@/components/Loading';

type Props = CardData;

const CardScene: React.FC<Props> = (props) => {
  const { width } = props.size;
  const setCursorPosition = useCardStore((state) => state.setCursorPosition);

  const handleMouseMove: MouseEventHandler = (e) => {
    setCursorPosition(e.clientX, e.clientY);
  };

  return (
    <div className="fixed inset-0">
      <Canvas
        shadows={false}
        gl={{ localClippingEnabled: true }}
        onMouseMove={handleMouseMove}
      >
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
          position={[width * 1.2, 1, width * 2.4]}
          makeDefault
        />
        {/* TODO: Make target the inside page on mobile */}
        <OrbitControls target={[width / 2, 0, 0]} maxDistance={8} />
        <CardCover {...props} />
        <CardContent {...props} />
      </Canvas>
    </div>
  );
};

export const Card: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <CardScene {...props} />
      <Cursor />
    </Suspense>
  );
};
