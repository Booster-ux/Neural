import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CONNECTIONS_DATA, NODES_DATA } from '../../data/nodes';
import { useNeural } from '../../context/NeuralContext';

interface ParticlePath {
  start: THREE.Vector3;
  end: THREE.Vector3;
  fromId: string;
  toId: string;
  speed: number;
  offset: number;
  color: THREE.Color;
  size: number;
  pulsePhase: number;
}

export const DataParticles: React.FC = () => {
  const { isReducedMotion, isMobile, selectedNode, activeNode } = useNeural();
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

  // Build particle data paths with varied speed, size and color
  const { particlePaths, totalCount } = useMemo(() => {
    const paths: ParticlePath[] = [];
    const multiplier = isMobile ? 3 : 5;

    CONNECTIONS_DATA.forEach((conn) => {
      const start = nodesMap.get(conn.from);
      const end = nodesMap.get(conn.to);
      if (!start || !end) return;

      const pCount = Math.max(2, Math.floor(conn.particleCount * (multiplier / 5)));
      for (let i = 0; i < pCount; i++) {
        const isPrimary = conn.type === 'primary';
        const particleColor = isPrimary
          ? (i % 2 === 0 ? new THREE.Color('#22D3EE') : new THREE.Color('#38BDF8'))
          : conn.type === 'cross_cutting'
          ? new THREE.Color('#34D399')
          : new THREE.Color('#A78BFA');

        paths.push({
          start,
          end,
          fromId: conn.from,
          toId: conn.to,
          speed: conn.speed * (0.16 + (i * 0.04) % 0.12),
          offset: (i / pCount) + Math.random() * 0.05,
          color: particleColor,
          size: 0.12 + (i % 3) * 0.04,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    });

    // Central Core radiating telemetry pulses to major systems
    NODES_DATA.forEach((node, nIdx) => {
      const start = new THREE.Vector3(0, 0, 0);
      const end = new THREE.Vector3(...node.position);
      const pCount = isMobile ? 2 : 3;

      for (let i = 0; i < pCount; i++) {
        paths.push({
          start,
          end,
          fromId: 'core',
          toId: node.id,
          speed: 0.22 + (nIdx % 3) * 0.03,
          offset: (i / pCount) + Math.random() * 0.1,
          color: new THREE.Color(i % 2 === 0 ? '#38BDF8' : '#8B5CF6'),
          size: 0.14,
          pulsePhase: Math.random() * Math.PI
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

    const focusedId = selectedNode?.id || (activeNode !== 'core' ? activeNode : null);

    for (let i = 0; i < totalCount; i++) {
      const path = particlePaths[i];
      const isRouteActive = focusedId && (path.fromId === focusedId || path.toId === focusedId);
      
      // Speed multiplier on active routes
      const speedMultiplier = isRouteActive ? 1.8 : 1.0;
      // Calculate interpolation progress (0 to 1 loop with organic ease)
      const rawProgress = (time * path.speed * speedMultiplier + path.offset) % 1;
      
      // Smooth sinusoidal packet movement
      const progress = rawProgress;

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
        size={isMobile ? 0.11 : 0.14}
        vertexColors
        transparent
        opacity={selectedNode ? 0.95 : 0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

