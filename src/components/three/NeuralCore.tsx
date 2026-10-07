import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useNeural } from '../../context/NeuralContext';

export const NeuralCore: React.FC = () => {
  const { selectNodeById, activeNode, setActiveNode, isReducedMotion, triggerEasterEgg, coreState, isMobile } = useNeural();
  const [hovered, setHovered] = useState(false);
  const { pointer } = useThree();

  const groupRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const energyFieldRef = useRef<THREE.Mesh>(null);
  const latticeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const quantumParticlesRef = useRef<THREE.Points>(null);

  const isCoreActive = activeNode === 'core';

  // Layer 4: Generate subtle outer quantum particle dust
  const particleCount = isMobile ? 48 : 80;
  const [particlePositions, particleColors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color('#38BDF8'),
      new THREE.Color('#818CF8'),
      new THREE.Color('#22D3EE'),
      new THREE.Color('#C084FC')
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[i % palette.length];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, [particleCount, isMobile]);

  // State-based dynamic lighting & color schemes
  const stateVisuals = useMemo(() => {
    switch (coreState) {
      case 'processing':
        return {
          coreColor: '#8B5CF6',
          emissiveColor: '#A78BFA',
          coronaColor: '#C084FC',
          lightColor: '#8B5CF6',
          lightIntensity: 6.0,
          speedMult: 1.6,
          label: 'PROCESSING MATRIX'
        };
      case 'observing':
        return {
          coreColor: '#38BDF8',
          emissiveColor: '#60A5FA',
          coronaColor: '#22D3EE',
          lightColor: '#38BDF8',
          lightIntensity: 4.8,
          speedMult: 1.25,
          label: 'OBSERVING TOPOLOGY'
        };
      case 'connected':
        return {
          coreColor: '#22D3EE',
          emissiveColor: '#38BDF8',
          coronaColor: '#67E8F9',
          lightColor: '#22D3EE',
          lightIntensity: 5.5,
          speedMult: 1.4,
          label: 'DATA PIPELINE ACTIVE'
        };
      case 'root_access':
        return {
          coreColor: '#EC4899',
          emissiveColor: '#F472B6',
          coronaColor: '#22D3EE',
          lightColor: '#F43F5E',
          lightIntensity: 7.0,
          speedMult: 2.0,
          label: 'ROOT ACCESS // GRANTED'
        };
      case 'idle':
      default:
        return {
          coreColor: '#3B82F6',
          emissiveColor: '#2563EB',
          coronaColor: '#38BDF8',
          lightColor: '#3B82F6',
          lightIntensity: 3.8,
          speedMult: 0.9,
          label: 'CONTINUOUS PROCESSING'
        };
    }
  }, [coreState]);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();
    const sm = stateVisuals.speedMult;

    // Layer 1 & 2: Organic breathing & pulse with subtle micro-frequencies
    if (innerCoreRef.current) {
      const breathing = Math.sin(time * 1.8 * sm) * 0.04 + Math.sin(time * 0.6) * 0.02;
      const targetScale = (hovered ? 1.08 : 1.0) + breathing;
      innerCoreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4);
    }

    if (energyFieldRef.current) {
      const fieldPulse = 1.35 + Math.sin(time * 2.2 * sm) * 0.06;
      energyFieldRef.current.scale.set(fieldPulse, fieldPulse, fieldPulse);
      energyFieldRef.current.rotation.y = time * 0.12 * sm;
      energyFieldRef.current.rotation.z = time * 0.08 * sm;
    }

    if (latticeRef.current) {
      latticeRef.current.rotation.x = time * 0.15 * sm;
      latticeRef.current.rotation.y = -time * 0.22 * sm;
    }

    // Layer 3: Independent Gimbal / Gyroscopic Ring rotation on non-aligned axes
    // Ring 1: Primary inclination
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.35 * sm + Math.sin(time * 0.2) * 0.08;
      ring1Ref.current.rotation.y = time * 0.22 * sm;
      if (coreState === 'observing') {
        ring1Ref.current.rotation.z = THREE.MathUtils.lerp(ring1Ref.current.rotation.z, pointer.x * 0.4, delta * 3);
      }
    }

    // Ring 2: Counter-axis with slight tilt
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.28 * sm + Math.cos(time * 0.25) * 0.06;
      ring2Ref.current.rotation.z = time * 0.42 * sm;
    }

    // Ring 3: Outer precession ring
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.18 * sm;
      ring3Ref.current.rotation.z = -time * 0.32 * sm + Math.sin(time * 0.3) * 0.1;
    }

    // Layer 4: Subtle quantum dust orbit
    if (quantumParticlesRef.current) {
      quantumParticlesRef.current.rotation.y = time * 0.15 * sm;
      quantumParticlesRef.current.rotation.x = Math.sin(time * 0.12) * 0.1;
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
      {/* LAYER 1: Subtle Inner Energy Field */}
      <mesh ref={energyFieldRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial
          color={stateVisuals.coronaColor}
          transparent
          opacity={hovered || isCoreActive ? 0.28 : 0.14}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* LAYER 2: Core Crystalline Sphere & Micro-Lattice */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshStandardMaterial
          color={stateVisuals.coreColor}
          emissive={stateVisuals.emissiveColor}
          emissiveIntensity={hovered || isCoreActive ? 2.8 : 1.7}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Geodesic Inner Lattice for technical architectural depth */}
      <mesh ref={latticeRef}>
        <icosahedronGeometry args={[1.22, 2]} />
        <meshBasicMaterial
          color={stateVisuals.coronaColor}
          wireframe
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* LAYER 3: Mechanical Gyroscopic Gimbal Rings with tick details */}
      {/* Ring 1 (Inner, tilted on X/Y) */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[1.75, 0.022, 16, 80]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={hovered ? 1.8 : 1.2}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Fine mechanical notch ticks */}
        <mesh position={[1.75, 0, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.04]} />
          <meshBasicMaterial color="#A78BFA" />
        </mesh>
        <mesh position={[-1.75, 0, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.04]} />
          <meshBasicMaterial color="#A78BFA" />
        </mesh>
      </group>

      {/* Ring 2 (Middle, counter-axis) */}
      <group ref={ring2Ref} rotation={[-Math.PI / 3, -0.4, Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[2.15, 0.018, 16, 80]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 1.6 : 1.1}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Fine mechanical notch ticks */}
        <mesh position={[0, 2.15, 0]}>
          <boxGeometry args={[0.04, 0.06, 0.04]} />
          <meshBasicMaterial color="#60A5FA" />
        </mesh>
        <mesh position={[0, -2.15, 0]}>
          <boxGeometry args={[0.04, 0.06, 0.04]} />
          <meshBasicMaterial color="#60A5FA" />
        </mesh>
      </group>

      {/* Ring 3 (Outer, equatorial precession) */}
      <group ref={ring3Ref} rotation={[0.2, Math.PI / 5, -Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[2.55, 0.015, 16, 80]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={hovered ? 1.5 : 1.0}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Fine mechanical notch ticks */}
        <mesh position={[0, 0, 2.55]}>
          <boxGeometry args={[0.04, 0.04, 0.06]} />
          <meshBasicMaterial color="#22D3EE" />
        </mesh>
      </group>

      {/* LAYER 4: Subtle Outer Quantum Particles */}
      <points ref={quantumParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={particleColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Core Point Light Source with dynamic state reactivity */}
      <pointLight
        color={stateVisuals.lightColor}
        intensity={hovered ? stateVisuals.lightIntensity * 1.3 : stateVisuals.lightIntensity}
        distance={16}
        decay={2}
      />
      <pointLight
        color="#22D3EE"
        intensity={hovered ? 3.5 : 2.0}
        distance={9}
        decay={2}
      />

      {/* 3D Floating HUD Label */}
      <Html
        position={[0, -2.1, 0]}
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
            opacity: hovered || isCoreActive || coreState !== 'idle' ? 1 : 0.85,
            transition: 'all 0.25s ease-out',
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
              background: 'rgba(8, 13, 22, 0.85)',
              padding: '3px 10px',
              borderRadius: '6px',
              border: `1px solid ${stateVisuals.emissiveColor}66`,
              boxShadow: `0 0 16px ${stateVisuals.lightColor}33`,
              textTransform: 'uppercase'
            }}
          >
            AI CORE
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px',
              letterSpacing: '0.12em',
              color: stateVisuals.coronaColor,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span style={{ fontSize: '7px' }}>●</span>
            <span>{stateVisuals.label}</span>
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
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#EC4899" transparent opacity={0.65} />
      </mesh>
    </group>
  );
};

