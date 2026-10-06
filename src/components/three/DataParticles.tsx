import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CONNECTIONS_DATA, NODES_DATA } from '../../data/nodes';
import { useNeural } from '../../context/NeuralContext';

interface ParticlePath {
  start: THREE.Vector3;
  end: THREE.Vector3;
  speed: number;
  offset: number;
  color: THREE.Color;
}

export const DataParticles: React.FC = () => {
  const { isReducedMotion, isMobile } = useNeural();
  const pointsRef = useRef<THREE.Points>(null);

  // Map nodes for position lookup
  const nodesMap = useMemo(() => {
    const map = new Map<string, THREE.Vector3>();
    map.set('core', new THREE.Vector3(0, 0, 0));
    NODES_DATA.forEach(node => {
      map.set(node.id, new THREE.Vector3(...node.position));
    });
    return map;
  }, []);

  // Build particle data paths
  const { particlePaths, totalCount } = useMemo(() => {
    const paths: ParticlePath[] = [];
    const multiplier = isMobile ? 3 : 6;

    CONNECTIONS_DATA.forEach((conn) => {
      const start = nodesMap.get(conn.from);
      const end = nodesMap.get(conn.to);
      if (!start || !end) return;

      const pCount = Math.max(2, Math.floor(conn.particleCount * (multiplier / 6)));
      for (let i = 0; i < pCount; i++) {
        paths.push({
          start,
          end,
          speed: conn.speed * (0.15 + Math.random() * 0.15),
          offset: Math.random(),
          color: new THREE.Color(i % 2 === 0 ? '#22D3EE' : '#8B5CF6')
        });
      }
    });

    // Core radiating pulses
    NODES_DATA.forEach((node) => {
      const start = new THREE.Vector3(0, 0, 0);
      const end = new THREE.Vector3(...node.position);
      const pCount = isMobile ? 2 : 4;
      for (let i = 0; i < pCount; i++) {
        paths.push({
          start,
          end,
          speed: 0.2 + Math.random() * 0.15,
          offset: Math.random(),
          color: new THREE.Color('#3B82F6')
        });
      }
    });

    return { particlePaths: paths, totalCount: paths.length };
  }, [nodesMap, isMobile]);

  // Buffer geometries
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(totalCount * 3);
    const cols = new Float32Array(totalCount * 3);

    particlePaths.forEach((path, i) => {
      pos[i * 3] = path.start.x;
      pos[i * 3 + 1] = path.start.y;
      pos[i * 3 + 2] = path.start.z;

      cols[i * 3] = path.color.r;
      cols[i * 3 + 1] = path.color.g;
      cols[i * 3 + 2] = path.color.b;
    });

    return [pos, cols];
  }, [particlePaths, totalCount]);

  useFrame((state) => {
    if (!pointsRef.current || isReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < totalCount; i++) {
      const path = particlePaths[i];
      // Calculate interpolation progress (0 to 1 loop)
      const progress = (time * path.speed + path.offset) % 1;

      // Linear interpolation between start and end
      array[i * 3] = path.start.x + (path.end.x - path.start.x) * progress;
      array[i * 3 + 1] = path.start.y + (path.end.y - path.start.y) * progress;
      array[i * 3 + 2] = path.start.z + (path.end.z - path.start.z) * progress;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={totalCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={totalCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.12 : 0.16}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
