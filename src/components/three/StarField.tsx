import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNeural } from '../../context/NeuralContext';

interface StarFieldProps {
  count?: number;
}

export const StarField: React.FC<StarFieldProps> = ({ count }) => {
  const { isReducedMotion, isMobile } = useNeural();
  const pointsRef = useRef<THREE.Points>(null);

  // Optimize particle count for mobile
  const particleCount = useMemo(() => {
    if (count) return count;
    return isMobile ? 350 : 900;
  }, [count, isMobile]);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const colorPalette = [
      new THREE.Color('#3B82F6'), // Blue
      new THREE.Color('#8B5CF6'), // Violet
      new THREE.Color('#22D3EE'), // Cyan
      new THREE.Color('#94A3B8'), // Muted slate
      new THREE.Color('#F8FAFC'), // Bright white
    ];

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution around neural network
      const radius = 12 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, [particleCount]);

  useFrame((_, delta) => {
    if (pointsRef.current && !isReducedMotion) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.08 : 0.095}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
