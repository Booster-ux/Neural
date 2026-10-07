import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { TechNode } from '../../types';
import { useNeural } from '../../context/NeuralContext';

interface NeuralNodeProps {
  node: TechNode;
}

export const NeuralNode: React.FC<NeuralNodeProps> = ({ node }) => {
  const { selectNodeById, selectedNode, activeNode, setActiveNode, isReducedMotion } = useNeural();
  const [hovered, setHovered] = useState(false);

  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerHaloRef = useRef<THREE.Mesh>(null);

  const isSelected = selectedNode?.id === node.id;
  const isDirectlyActive = activeNode === node.id;
  
  // Highlight if connected to currently selected/active node
  const isConnectedToFocused = useMemo(() => {
    const focusId = selectedNode?.id || (activeNode !== 'core' ? activeNode : null);
    if (!focusId) return false;
    return node.connections.includes(focusId);
  }, [selectedNode, activeNode, node.connections]);

  const hasAnySelection = !!selectedNode;
  const isDimmed = hasAnySelection && !isSelected && !isConnectedToFocused;

  const baseColor = useMemo(() => new THREE.Color(node.color), [node.color]);
  const glowColor = useMemo(() => new THREE.Color(node.glowColor), [node.glowColor]);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    // Organic floating drift with unique phase offset per node
    if (groupRef.current) {
      const floatY = Math.sin(time * 1.2 + node.position[0] * 1.5) * 0.07;
      const floatX = Math.cos(time * 0.9 + node.position[2]) * 0.04;
      groupRef.current.position.y = node.position[1] + floatY;
      groupRef.current.position.x = node.position[0] + floatX;
    }

    // Outer ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (isSelected ? 1.0 : hovered ? 0.8 : 0.25);
    }

    // Node pulsating scale based on selection state
    if (meshRef.current) {
      const targetScale = isSelected ? 1.3 : hovered ? 1.2 : isConnectedToFocused ? 1.05 : isDimmed ? 0.85 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }

    if (outerHaloRef.current) {
      const haloScale = isSelected ? 1.55 : hovered ? 1.4 : isConnectedToFocused ? 1.2 : 1.1;
      outerHaloRef.current.scale.lerp(new THREE.Vector3(haloScale, haloScale, haloScale), delta * 4);
      outerHaloRef.current.rotation.x = time * 0.25;
      outerHaloRef.current.rotation.y = time * 0.35;
    }
  });

  return (
    <group
      ref={groupRef}
      position={node.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setActiveNode(node.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (activeNode === node.id) setActiveNode(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectNodeById(node.id);
      }}
    >
      {/* Node Core Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.58, 28, 28]} />
        <meshStandardMaterial
          color={isSelected || hovered ? glowColor : baseColor}
          emissive={baseColor}
          emissiveIntensity={isSelected ? 2.8 : hovered ? 2.2 : isConnectedToFocused ? 1.5 : isDimmed ? 0.35 : 0.85}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Precision Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0.2, 0]}>
        <torusGeometry args={[0.88, 0.014, 12, 64]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={isSelected || hovered ? 1.8 : isDimmed ? 0.2 : 0.8}
          transparent
          opacity={isDimmed ? 0.25 : 0.9}
        />
      </mesh>

      {/* Outer Holographic Geometric Shell */}
      <mesh ref={outerHaloRef}>
        <octahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial
          color={glowColor}
          wireframe
          transparent
          opacity={isSelected ? 0.45 : hovered ? 0.35 : isConnectedToFocused ? 0.18 : isDimmed ? 0.03 : 0.09}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Local Point Light Source */}
      <pointLight
        color={baseColor}
        intensity={isSelected ? 4.5 : hovered ? 3.0 : isConnectedToFocused ? 1.8 : isDimmed ? 0.2 : 0.9}
        distance={6}
        decay={2}
      />

      {/* 3D Floating HUD Billboard */}
      <Html
        position={[0, -1.15, 0]}
        center
        distanceFactor={16}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            opacity: isSelected || hovered || isDirectlyActive ? 1 : isConnectedToFocused ? 0.85 : isDimmed ? 0.35 : 0.75,
            transition: 'all 0.25s ease-out',
            whiteSpace: 'nowrap'
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: isSelected || hovered ? '#FFFFFF' : '#F8FAFC',
              background: isSelected
                ? 'rgba(59, 130, 246, 0.4)'
                : hovered
                ? 'rgba(12, 18, 32, 0.92)'
                : 'rgba(8, 13, 22, 0.8)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: `1px solid ${isSelected ? node.color : isDimmed ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.12)'}`,
              boxShadow: isSelected || hovered ? `0 0 12px ${node.glowColor}55` : 'none',
              textTransform: 'uppercase'
            }}
          >
            {node.label}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '7.5px',
              letterSpacing: '0.08em',
              color: node.glowColor,
              textTransform: 'uppercase'
            }}
          >
            {isSelected ? '● ACTIVE' : 'ONLINE'}
          </div>
        </div>
      </Html>
    </group>
  );
};

