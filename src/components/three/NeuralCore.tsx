import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useNeural } from '../../context/NeuralContext';

export const NeuralCore: React.FC = () => {
  const { selectNodeById, activeNode, setActiveNode, isReducedMotion, triggerEasterEgg } = useNeural();
  const [hovered, setHovered] = useState(false);

  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const isCoreActive = activeNode === 'core';

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    // Central pulse
    if (innerSphereRef.current) {
      const pulse = 1 + Math.sin(time * 2.5) * 0.05 + (hovered ? 0.08 : 0);
      innerSphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (coronaRef.current) {
      const coronaPulse = 1.3 + Math.sin(time * 1.8 + 1) * 0.08;
      coronaRef.current.scale.set(coronaPulse, coronaPulse, coronaPulse);
      coronaRef.current.rotation.z = time * 0.15;
    }

    // Concentric gyro rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4;
      ring1Ref.current.rotation.y = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.35;
      ring2Ref.current.rotation.z = time * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.2;
      ring3Ref.current.rotation.z = -time * 0.45;
    }

    // Orbiting particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.25;
      particlesRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setActiveNode('core');
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (activeNode === 'core') setActiveNode(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectNodeById('core');
      }}
    >
      {/* Central Core Sphere */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color={hovered || isCoreActive ? '#60A5FA' : '#3B82F6'}
          emissive={hovered || isCoreActive ? '#3B82F6' : '#1D4ED8'}
          emissiveIntensity={hovered ? 2.5 : 1.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Pulsing Energy Corona Shield */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1.35, 24, 24]} />
        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={hovered ? 0.35 : 0.18}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Gyro Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.9, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Gyro Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.3, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Gyro Ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.7, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#22D3EE"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Core Point Light Source */}
      <pointLight
        color="#3B82F6"
        intensity={hovered ? 6 : 4}
        distance={15}
        decay={2}
      />
      <pointLight
        color="#22D3EE"
        intensity={hovered ? 4 : 2.5}
        distance={8}
        decay={2}
      />

      {/* 3D Floating Label */}
      <Html
        position={[0, -2.2, 0]}
        center
        distanceFactor={18}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            opacity: hovered || isCoreActive ? 1 : 0.8,
            transition: 'opacity 0.2s ease-out',
            whiteSpace: 'nowrap'
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#F8FAFC',
              background: 'rgba(12, 18, 32, 0.8)',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              boxShadow: '0 0 12px rgba(59, 130, 246, 0.3)',
              textTransform: 'uppercase'
            }}
          >
            AI CORE
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px',
              letterSpacing: '0.1em',
              color: '#22D3EE',
              textTransform: 'uppercase'
            }}
          >
            ● OPERATIONAL
          </div>
        </div>
      </Html>

      {/* Hidden Easter Egg Node */}
      <mesh
        position={[2.9, 2.5, -1.8]}
        onClick={(e) => {
          e.stopPropagation();
          triggerEasterEgg('human_404');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'help';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color="#EC4899" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};
