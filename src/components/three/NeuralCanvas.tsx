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
        camera={{ position: [0, 2.2, isMobile ? 15.5 : 13.5], fov: isMobile ? 62 : 52, near: 0.1, far: 1000 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#03050A', 1);
          scene.fog = new THREE.FogExp2('#03050A', 0.022);
        }}
      >
        <CameraController />
        
        {/* Controlled Ambient & Art-Directed Studio Lighting */}
        <ambientLight intensity={0.5} color="#080F1F" />
        <directionalLight position={[12, 16, 8]} intensity={1.1} color="#818CF8" />
        <directionalLight position={[-12, -8, -6]} intensity={0.7} color="#22D3EE" />

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

