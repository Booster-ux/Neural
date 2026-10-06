import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useNeural } from '../../context/NeuralContext';

export const CameraController: React.FC = () => {
  const {
    cameraFocusTarget,
    cameraDistance,
    isReducedMotion,
    isMobile,
    selectedNode,
    viewMode
  } = useNeural();

  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera, pointer } = useThree();

  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 2, 14));

  // Handle focus updates
  useEffect(() => {
    if (cameraFocusTarget) {
      targetLookAt.current.set(...cameraFocusTarget);

      if (selectedNode) {
        // Calculate offset position for selected node view
        const offset = new THREE.Vector3(...selectedNode.position).normalize().multiplyScalar(cameraDistance);
        // Slightly elevated angle
        targetCamPos.current.set(
          selectedNode.position[0] + (offset.x > 0 ? 3.5 : -3.5),
          selectedNode.position[1] + 1.8,
          selectedNode.position[2] + 4.5
        );
      } else if (viewMode === 'architecture') {
        targetCamPos.current.set(0, 1.5, 12);
      } else {
        targetCamPos.current.set(0, 2, cameraDistance);
      }
    } else {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 2, 14);
    }
  }, [cameraFocusTarget, cameraDistance, selectedNode, viewMode]);

  useFrame((state, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    const time = state.clock.getElapsedTime();
    const lerpSpeed = Math.min(1, delta * 3.5);

    // Smoothly interpolate camera target (lookAt)
    controls.target.lerp(targetLookAt.current, lerpSpeed);

    // If no specific node is selected and reduced motion is off, apply gentle ambient drift + subtle mouse parallax
    if (!selectedNode && !isReducedMotion) {
      const parallaxX = pointer.x * 0.8;
      const parallaxY = pointer.y * 0.5;

      const idleX = Math.sin(time * 0.15) * 1.5 + parallaxX;
      const idleY = 2 + Math.cos(time * 0.12) * 0.8 + parallaxY;
      const idleZ = 14 + Math.sin(time * 0.1) * 0.6;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, idleX, lerpSpeed * 0.5);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, idleY, lerpSpeed * 0.5);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, idleZ, lerpSpeed * 0.5);
    } else if (selectedNode) {
      camera.position.lerp(targetCamPos.current, lerpSpeed);
    }

    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      enablePan={false}
      enableZoom={true}
      minDistance={isMobile ? 5 : 4}
      maxDistance={isMobile ? 22 : 26}
      maxPolarAngle={Math.PI * 0.85}
      minPolarAngle={Math.PI * 0.15}
      rotateSpeed={isMobile ? 0.7 : 0.85}
      zoomSpeed={0.9}
    />
  );
};
