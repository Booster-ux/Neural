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
  const targetCamPos = useRef(new THREE.Vector3(0, 2.2, isMobile ? 15.5 : 13.5));

  // Handle focus target and camera mode transitions (Section 09)
  useEffect(() => {
    if (selectedNode) {
      // STATE 2: FOCUS on selected node with calculated cinematic offset
      targetLookAt.current.set(...selectedNode.position);
      
      const nodePos = new THREE.Vector3(...selectedNode.position);
      const isRight = nodePos.x > 0;
      const isTop = nodePos.y > 0;

      // Position camera with an art-directed 3/4 elevated vantage
      const offsetX = isRight ? 3.2 : -3.2;
      const offsetY = isTop ? 1.6 : 1.2;
      const offsetZ = 4.2;

      targetCamPos.current.set(
        nodePos.x + offsetX,
        nodePos.y + offsetY,
        nodePos.z + offsetZ
      );
    } else if (cameraFocusTarget && cameraFocusTarget[0] === 0 && cameraFocusTarget[1] === 0 && cameraFocusTarget[2] === 0 && cameraDistance <= 7) {
      // STATE 3: CORE view
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 1.2, cameraDistance);
    } else if (viewMode === 'architecture') {
      // Architecture stacked view
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 1.2, isMobile ? 13.5 : 11.5);
    } else {
      // STATE 1: OVERVIEW view
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 2.2, isMobile ? 15.5 : 13.5);
    }
  }, [cameraFocusTarget, cameraDistance, selectedNode, viewMode, isMobile]);

  useFrame((state, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    const time = state.clock.getElapsedTime();
    // Smooth cinematic damping rate
    const lerpSpeed = Math.min(1, delta * 3.2);

    // Smoothly interpolate camera target (lookAt)
    controls.target.lerp(targetLookAt.current, lerpSpeed);

    // If in overview mode, apply gentle subtle mouse parallax and ambient drift
    if (!selectedNode && viewMode === 'system' && !isReducedMotion) {
      const parallaxX = pointer.x * (isMobile ? 0.3 : 0.8);
      const parallaxY = pointer.y * (isMobile ? 0.2 : 0.5);

      const idleX = Math.sin(time * 0.12) * 1.2 + parallaxX;
      const idleY = 2.2 + Math.cos(time * 0.1) * 0.6 + parallaxY;
      const baseDistance = isMobile ? 15.5 : 13.5;
      const idleZ = baseDistance + Math.sin(time * 0.08) * 0.4;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, idleX, lerpSpeed * 0.6);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, idleY, lerpSpeed * 0.6);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, idleZ, lerpSpeed * 0.6);
    } else {
      camera.position.lerp(targetCamPos.current, lerpSpeed);
    }

    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      enablePan={false}
      enableZoom={true}
      minDistance={isMobile ? 5 : 4}
      maxDistance={isMobile ? 24 : 26}
      maxPolarAngle={Math.PI * 0.82}
      minPolarAngle={Math.PI * 0.18}
      rotateSpeed={isMobile ? 0.65 : 0.8}
      zoomSpeed={0.85}
    />
  );
};

