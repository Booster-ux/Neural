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
  
  // Highlight if connected to currently active node
  const isConnectedToActive = useMemo(() => {
    if (!activeNode || activeNode === 'core') return false;
    return node.connections.includes(activeNode);
  }, [activeNode, node.connections]);

  const baseColor = useMemo(() => new THREE.Color(node.color), [node.color]);
  const glowColor = useMemo(() => new THREE.Color(node.glowColor), [node.glowColor]);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    // Floating drift
    if (groupRef.current) {
      const floatOffset = Math.sin(time * 1.5 + node.position[0]) * 0.08;
      groupRef.current.position.y = node.position[1] + floatOffset;
    }

    // Outer ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (hovered || isSelected ? 1.2 : 0.4);
    }

    // Node pulsating scale
    if (meshRef.current) {
      const targetScale = isSelected ? 1.35 : hovered ? 1.25 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
    }

    if (outerHaloRef.current) {
      const haloScale = isSelected ? 1.6 : hovered ? 1.45 : isConnectedToActive ? 1.25 : 1.15;
      outerHaloRef.current.scale.lerp(new THREE.Vector3(haloScale, haloScale, haloScale), delta * 5);
      outerHaloRef.current.rotation.x = time * 0.3;
      outerHaloRef.current.rotation.y = time * 0.4;
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
        <sphereGeometry args={[0.65, 24, 24]} />
        <meshStandardMaterial
          color={hovered || isSelected ? glowColor : baseColor}
          emissive={baseColor}
          emissiveIntensity={isSelected ? 3.0 : hovered ? 2.4 : isConnectedToActive ? 1.6 : 0.9}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* Orbiting Tech Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.95, 0.015, 12, 48]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={isSelected || hovered ? 2.0 : 1.0}
        />
      </mesh>

      {/* Outer Holographic Energy Shell */}
      <mesh ref={outerHaloRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial
          color={glowColor}
          wireframe
          transparent
          opacity={isSelected ? 0.45 : hovered ? 0.35 : isConnectedToActive ? 0.2 : 0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point Light emitted by the node */}
      <pointLight
        color={baseColor}
        intensity={isSelected ? 5 : hovered ? 3.5 : isConnectedToActive ? 2 : 1}
        distance={6}
        decay={2}
      />

      {/* 3D Floating HUD Billboard */}
      <Html
        position={[0, -1.2, 0]}
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
            opacity: isSelected || hovered || isDirectlyActive ? 1 : isConnectedToActive ? 0.9 : 0.75,
            transition: 'all 0.2s ease-out',
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
                ? 'rgba(12, 18, 32, 0.9)'
                : 'rgba(8, 13, 22, 0.75)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: `1px solid ${isSelected ? node.color : 'rgba(255, 255, 255, 0.12)'}`,
              boxShadow: isSelected || hovered ? `0 0 10px ${node.glowColor}55` : 'none',
              textTransform: 'uppercase'
            }}
          >
            {node.label}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '7.5px',
              letterSpacing: '0.06em',
              color: node.glowColor,
              textTransform: 'uppercase'
            }}
          >
            ONLINE
          </div>
        </div>
      </Html>
    </group>
  );
};
