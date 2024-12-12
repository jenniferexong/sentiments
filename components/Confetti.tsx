// CONFETTI COMPONENT BY ANDERSON MANCINI AND ROMAIN HERAULT
// Based on: https://github.com/JamesChan21/threejs-confetti
// Based on: https://github.com/daniel-lundin/dom-confetti

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh, Object3D, Vector3 } from 'three';

type Props = {
  isExploding?: boolean;
  amount?: number;
  rate?: number; // be careful with this number. Can freze your app
  radius?: number;
  areaWidth?: number;
  areaHeight?: number;
  fallingHeight?: number;
  fallingSpeed?: number;
  anchorX?: number;
  anchorY?: number;
  colors?: string[];
};

const CONFETTI_GEOMETRY: THREE.PlaneGeometry = new THREE.PlaneGeometry(
  0.03,
  0.03,
  1,
  1
);

class Confetto extends Mesh {
  life: number;
  destination: Vector3;
  rotateSpeed: Vector3;

  constructor(color: string, destination: Vector3) {
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    });

    super(CONFETTI_GEOMETRY, material);

    this.life = 1;
    this.destination = destination;
    (this.rotateSpeed = new Vector3(
      Math.random() * 0.8 - 0.4,
      Math.random() * 0.8 - 0.4,
      Math.random() * 0.8 - 0.4
    )),
      (this.castShadow = false);

    const size = Math.random() * 1.5 + 1;
    this.scale.set(size, size, size);
    this.rotation.set(
      Math.random() * 360,
      Math.random() * 360,
      Math.random() * 360
    );
  }
}

class Boom extends Object3D {
  life: number;

  constructor(position: Vector3) {
    super();
    (this.life = Math.random() * 5 + 5), this.position.setX(position.x);
    this.position.setY(position.y);
    this.position.setZ(position.z);
  }
}

/**
 * @param {Object} options
 * @param {Boolean | undefined} options.isExploding Enable exploding
 * @param {Number | undefined} options.amount The amount of particles
 * @param {Number | undefined} options.rate Increases or decreases the frequency for particles. Don't set it too high.
 * @param {Number | undefined} options.radius The radius of each explosion.
 * @param {Number | undefined} options.areaWidth The area width for explosion.
 * @param {Number | undefined} options.areaHeight The area height for explosion.
 * @param {Number | undefined} options.fallingHeight Height for the particles to fall from
 * @param {Number | undefined} options.fallingSpeed The speed of particles
 * @param {(string)[] | undefined} options.colors Array of Hex color codes for particles. Example: ["#0000ff", "#ff0000", "#ffff00"]
 *
 */

export const Confetti: React.FC<Props> = ({
  isExploding = false,
  amount = 100,
  rate = 3, // be careful with this number. Can freze your app
  radius = 15,
  areaWidth = 3,
  areaHeight = 3,
  anchorX = 0,
  anchorY = 0,
  fallingHeight = 10,
  fallingSpeed = 8,
  colors = ['#0000ff', '#ff0000', '#ffff00'],
}) => {
  const groupRef = useRef<Mesh | null>(null);
  const [booms, setBooms] = useState<Boom[]>([]);

  rate = rate / 100;

  const dispose = (boom: Boom) => {
    for (let i = 0; i < boom.children.length; i++) {
      const particle: Mesh = boom.children[i] as Mesh;
      // particle.material.dispose();
      particle.geometry.dispose();
      boom.remove(particle);
    }
    groupRef.current?.remove(boom);
  };

  function explode() {
    const position = new Vector3(
      anchorX + (-(areaWidth / 2) + areaWidth * Math.random()),
      anchorY + (-(areaHeight / 2) + areaHeight * Math.random()),
      // fallingHeight + areaHeight - fallingSpeed,
      0
      // -(areaWidth / 2) + areaWidth * Math.random()
    );

    const boom: Boom = new Boom(position);
    groupRef.current?.add(boom);
    booms.push(boom);

    for (let i = 0; i < amount; i++) {
      const destination = new Vector3(
        (Math.random() - 0.5) * (radius * 2) * Math.random(),
        radius * 2 * Math.random(),
        Math.random() * radius
      );
      const particle: Confetto = new Confetto(
        colors[Math.floor(Math.random() * colors.length)],
        destination
      );

      boom.add(particle);
    }
  }

  useFrame(() => {
    if (isExploding && Math.random() < rate) explode();

    // let particleAmount = 0;

    for (let i = 0; i < booms.length; i++) {
      const boom = booms[i];

      for (let k = 0; k < boom.children.length; k++) {
        let particle = boom.children[k] as Confetto;

        particle.destination.y -= THREE.MathUtils.randFloat(0.1, 0.3);
        particle.life -= THREE.MathUtils.randFloat(0.005, 0.01);

        const speedX =
          ((particle.destination.x - particle.position.x) / 200) * fallingSpeed;
        const speedY =
          ((particle.destination.y - particle.position.y) / 200) * fallingSpeed;
        const speedZ =
          ((particle.destination.z - particle.position.z) / 200) * fallingSpeed;

        particle.position.x += speedX;
        particle.position.y += speedY;
        particle.position.z += speedZ;

        particle.rotation.y += particle.rotateSpeed.y;
        particle.rotation.x += particle.rotateSpeed.x;
        particle.rotation.z += particle.rotateSpeed.z;

        if (!Array.isArray(particle.material)) {
          particle.material.opacity -= THREE.MathUtils.randFloat(0.005, 0.01);
        }

        if (particle.position.y < -fallingHeight) {
          if (!Array.isArray(particle.material)) {
            particle.material.dispose();
          }
          particle.geometry.dispose();
          boom.remove(particle);
        }
      }

      if (boom.children.length <= 0) {
        dispose(boom);
        setBooms(booms.filter((b) => b !== boom));
      }
      // particleAmount += boom.children.length;
    }
  });

  return <mesh ref={groupRef} />;
};
