"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

interface GavelSceneProps {
  isStriking: boolean;
  onImpact: () => void;
  reducedMotion?: boolean;
}

export function GavelScene({
  isStriking,
  onImpact,
  reducedMotion = false,
}: GavelSceneProps) {
  const { themeConfig } = useTheme();

  // Root group for floating + parallax
  const groupRef = useRef<THREE.Group>(null);
  // Striking arm pivot (rotates around sounding block)
  const pivotRef = useRef<THREE.Group>(null);

  // Slam state tracking
  const slamProgressRef = useRef<number>(-1);
  const hasImpactedRef = useRef<boolean>(false);

  // Parse accent colors into Three.Color
  const accentColor = useMemo(() => new THREE.Color(themeConfig.accent), [themeConfig.accent]);
  const accentGlow = useMemo(() => new THREE.Color(themeConfig.accentGlow), [themeConfig.accentGlow]);

  // Materials
  const obsidianMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0d0d12"),
        roughness: 0.22,
        metalness: 0.82,
      }),
    []
  );

  const glowRingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accentGlow,
        emissive: accentGlow,
        emissiveIntensity: 1.8,
        roughness: 0.2,
        metalness: 0.5,
      }),
    [accentGlow]
  );

  const strikePlateMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#16161d"),
        roughness: 0.3,
        metalness: 0.9,
      }),
    []
  );

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (!groupRef.current) return;

    // 1. Mouse Parallax (Damped lerp toward cursor)
    if (!reducedMotion) {
      const targetParallaxX = (state.pointer.y * 0.25);
      const targetParallaxY = (state.pointer.x * 0.35);

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetParallaxX,
        4,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetParallaxY,
        4,
        delta
      );
    }

    // 2. Idle floating bob
    if (slamProgressRef.current < 0 && !reducedMotion) {
      groupRef.current.position.y = Math.sin(time * 1.8) * 0.12;
      groupRef.current.position.x = Math.cos(time * 1.1) * 0.06;
    }

    // 3. Gavel Slam Striking Sequence
    if (isStriking && slamProgressRef.current < 0) {
      slamProgressRef.current = 0;
      hasImpactedRef.current = false;
    }

    if (slamProgressRef.current >= 0 && pivotRef.current) {
      slamProgressRef.current += delta * 2.6; // ~0.4s strike cycle

      const p = slamProgressRef.current;

      if (p < 0.2) {
        // Anticipation wind-up: raise gavel up backwards
        const windup = p / 0.2;
        pivotRef.current.rotation.z = THREE.MathUtils.lerp(0.3, 0.9, windup);
        pivotRef.current.position.y = THREE.MathUtils.lerp(0, 0.4, windup);
      } else if (p < 0.5) {
        // Fast strike down
        const strike = (p - 0.2) / 0.3;
        const easedStrike = Math.pow(strike, 3);
        pivotRef.current.rotation.z = THREE.MathUtils.lerp(0.9, -0.65, easedStrike);
        pivotRef.current.position.y = THREE.MathUtils.lerp(0.4, -0.15, easedStrike);

        // Check impact threshold
        if (p >= 0.46 && !hasImpactedRef.current) {
          hasImpactedRef.current = true;
          onImpact();
        }
      } else if (p < 0.75) {
        // Recoil bounce
        const recoil = (p - 0.5) / 0.25;
        pivotRef.current.rotation.z = THREE.MathUtils.lerp(-0.65, -0.2, Math.sin(recoil * Math.PI));
        pivotRef.current.position.y = THREE.MathUtils.lerp(-0.15, 0.05, Math.sin(recoil * Math.PI));
      } else if (p < 1.0) {
        // Return to resting idle
        const recover = (p - 0.75) / 0.25;
        pivotRef.current.rotation.z = THREE.MathUtils.lerp(-0.35, 0.3, recover);
        pivotRef.current.position.y = THREE.MathUtils.lerp(0, 0, recover);
      } else {
        // Strike cycle finished
        pivotRef.current.rotation.z = 0.3;
        pivotRef.current.position.y = 0;
        slamProgressRef.current = -1;
      }
    }
  });

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} />
      <pointLight
        position={[-3, 2, 2]}
        color={accentColor}
        intensity={3.5}
        distance={10}
      />
      <pointLight
        position={[2, -1, 3]}
        color={accentGlow}
        intensity={2.8}
        distance={8}
      />

      {/* Main Gavel Rig Group */}
      <group ref={groupRef} position={[0, 0.1, 0]}>
        {/* Sound Block / Anvil (Stationary impact base) */}
        <group position={[0.6, -1.2, 0]}>
          {/* Main Octagonal Base */}
          <mesh material={obsidianMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.9, 1.05, 0.25, 8]} />
          </mesh>
          {/* Glowing Striking Inset */}
          <mesh position={[0, 0.13, 0]} material={strikePlateMaterial}>
            <cylinderGeometry args={[0.75, 0.75, 0.05, 16]} />
          </mesh>
          <mesh position={[0, 0.14, 0]} material={glowRingMaterial}>
            <torusGeometry args={[0.72, 0.025, 8, 32]} />
          </mesh>
        </group>

        {/* Pivot for Gavel Arm */}
        <group ref={pivotRef} position={[0, 0, 0]} rotation={[0.1, 0.2, 0.3]}>
          {/* Gavel Head Assembly */}
          <group position={[0.7, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            {/* Center Barrel */}
            <mesh material={obsidianMaterial} castShadow>
              <cylinderGeometry args={[0.38, 0.38, 1.2, 16]} />
            </mesh>

            {/* Left Striking Face */}
            <mesh position={[0, 0.68, 0]} material={obsidianMaterial}>
              <cylinderGeometry args={[0.42, 0.38, 0.22, 16]} />
            </mesh>
            <mesh position={[0, 0.81, 0]} material={strikePlateMaterial}>
              <cylinderGeometry args={[0.39, 0.42, 0.08, 16]} />
            </mesh>
            {/* Emissive Ring Left */}
            <mesh position={[0, 0.58, 0]} material={glowRingMaterial}>
              <torusGeometry args={[0.39, 0.03, 8, 24]} />
            </mesh>

            {/* Right Striking Face */}
            <mesh position={[0, -0.68, 0]} material={obsidianMaterial}>
              <cylinderGeometry args={[0.38, 0.42, 0.22, 16]} />
            </mesh>
            <mesh position={[0, -0.81, 0]} material={strikePlateMaterial}>
              <cylinderGeometry args={[0.42, 0.39, 0.08, 16]} />
            </mesh>
            {/* Emissive Ring Right */}
            <mesh position={[0, -0.58, 0]} material={glowRingMaterial}>
              <torusGeometry args={[0.39, 0.03, 8, 24]} />
            </mesh>

            {/* Center Glowing Band */}
            <mesh position={[0, 0, 0]} material={glowRingMaterial}>
              <torusGeometry args={[0.385, 0.025, 8, 24]} />
            </mesh>
          </group>

          {/* Gavel Handle Assembly */}
          <group position={[0.7, 0.6, 0]} rotation={[0, 0, 0]}>
            {/* Handle Rod */}
            <mesh position={[0, -1.1, 0]} material={obsidianMaterial} castShadow>
              <cylinderGeometry args={[0.1, 0.13, 2.2, 16]} />
            </mesh>

            {/* Handle Neck Collar */}
            <mesh position={[0, -0.15, 0]} material={glowRingMaterial}>
              <cylinderGeometry args={[0.14, 0.12, 0.12, 16]} />
            </mesh>

            {/* Ergonomic Grip Contours */}
            <mesh position={[0, -1.5, 0]} material={obsidianMaterial}>
              <cylinderGeometry args={[0.15, 0.13, 0.8, 16]} />
            </mesh>
            <mesh position={[0, -1.5, 0]} material={glowRingMaterial}>
              <torusGeometry args={[0.152, 0.015, 8, 20]} />
            </mesh>
            <mesh position={[0, -1.75, 0]} material={glowRingMaterial}>
              <torusGeometry args={[0.152, 0.015, 8, 20]} />
            </mesh>

            {/* Pommel Cap */}
            <mesh position={[0, -2.25, 0]} material={obsidianMaterial}>
              <sphereGeometry args={[0.18, 16, 16]} />
            </mesh>
            <mesh position={[0, -2.2, 0]} material={glowRingMaterial}>
              <torusGeometry args={[0.17, 0.02, 8, 20]} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}
