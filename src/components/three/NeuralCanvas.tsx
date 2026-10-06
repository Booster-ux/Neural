import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { StarField } from './StarField';
import { NeuralCore } from './NeuralCore';
import { NeuralNode } from './NeuralNode';
import { NeuralConnections } from './NeuralConnections';
import { DataParticles } from './DataParticles';
import { CameraController } from './CameraController';
import { ArchitectureScene3D } from './ArchitectureScene3D';
import { NODES_DATA } from '../../data/nodes';
import { useNeural } from '../../context/NeuralContext';

export const NeuralCanvas: React.FC = () => {
  const { viewMode, isMobile } = useNeural();

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 2, 14], fov: isMobile ? 65 : 55, near: 0.1, far: 1000 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#03050A', 1);
          scene.fog = new THREE.FogExp2('#03050A', 0.025);
        }}
      >
        <CameraController />
        
        {/* Cinematic Ambient and Key Lighting */}
        <ambientLight intensity={0.4} color="#0E1B33" />
        <directionalLight position={[10, 15, 10]} intensity={1.2} color="#8B5CF6" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#22D3EE" />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#3B82F6" distance={20} />

        <Suspense fallback={null}>
          <StarField />

          {viewMode === 'architecture' ? (
            <ArchitectureScene3D />
          ) : (
            <group>
              <NeuralCore />
              {NODES_DATA.map((node) => (
                <NeuralNode key={node.id} node={node} />
              ))}
              <NeuralConnections />
              <DataParticles />
            </group>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
