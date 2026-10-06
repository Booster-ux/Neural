import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ARCHITECTURE_LAYERS } from '../../data/architecture';
import { useNeural } from '../../context/NeuralContext';
import { soundManager } from '../../services/soundService';

export const ArchitectureScene3D: React.FC = () => {
  const { selectedLayerId, setSelectedLayerId, isReducedMotion } = useNeural();
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const groupRef = useRef<THREE.Group>(null);
  const packetsRef = useRef<THREE.Points>(null);

  // Packet animation
  const packetCount = 40;
  const packetData = React.useMemo(() => {
    const pos = new Float32Array(packetCount * 3);
    const cols = new Float32Array(packetCount * 3);
    const speeds = new Float32Array(packetCount);
    const directions = new Float32Array(packetCount); // 1 = down, -1 = up

    for (let i = 0; i < packetCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;

      cols[i * 3] = 0.13; // Cyan/Blue
      cols[i * 3 + 1] = 0.82;
      cols[i * 3 + 2] = 0.93;

      speeds[i] = 1.2 + Math.random() * 1.8;
      directions[i] = Math.random() > 0.4 ? 1 : -1;
    }
    return { pos, cols, speeds, directions };
  }, []);

  useFrame((_, delta) => {
    if (isReducedMotion) return;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }

    if (packetsRef.current) {
      const posAttr = packetsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < packetCount; i++) {
        array[i * 3 + 1] -= packetData.speeds[i] * delta * packetData.directions[i];

        // Wrap around bounds [-4.5, 4.5]
        if (array[i * 3 + 1] < -4.5) array[i * 3 + 1] = 4.5;
        if (array[i * 3 + 1] > 4.5) array[i * 3 + 1] = -4.5;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Stacked 3D Architectural Slabs */}
      {ARCHITECTURE_LAYERS.map((layer) => {
        const isSelected = selectedLayerId === layer.id;
        const isHovered = hoveredLayer === layer.id;
        const baseColor = new THREE.Color(layer.color);

        return (
          <group key={layer.id} position={layer.position}>
            {/* Glass Slab */}
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredLayer(layer.id);
                soundManager.playHover();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHoveredLayer(null);
                document.body.style.cursor = 'auto';
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLayerId(isSelected ? null : layer.id);
                soundManager.playSelect();
              }}
            >
              <boxGeometry args={[7, 0.25, 4]} />
              <meshStandardMaterial
                color={isSelected ? baseColor : isHovered ? '#1E293B' : '#0F172A'}
                emissive={baseColor}
                emissiveIntensity={isSelected ? 0.9 : isHovered ? 0.5 : 0.2}
                transparent
                opacity={isSelected ? 0.9 : 0.75}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing Edge Wireframe */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[7.02, 0.26, 4.02]} />
              <meshBasicMaterial
                color={baseColor}
                wireframe
                transparent
                opacity={isSelected ? 0.9 : isHovered ? 0.7 : 0.3}
              />
            </mesh>

            {/* Floating 3D HUD Tag */}
            <Html
              position={[3.8, 0, 0]}
              center
              distanceFactor={14}
              style={{ pointerEvents: 'none' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isSelected ? 'rgba(59, 130, 246, 0.4)' : 'rgba(12, 18, 32, 0.85)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${layer.color}`,
                  boxShadow: `0 0 10px ${layer.color}44`,
                  color: '#F8FAFC',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ color: layer.color }}>L{layer.level}</span>
                <span>{layer.name}</span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Traveling Data Packets between layers */}
      <points ref={packetsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={packetCount}
            array={packetData.pos}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={packetCount}
            array={packetData.cols}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
