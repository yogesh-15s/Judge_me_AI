"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { GavelScene } from "./GavelScene";
import { useSound } from "@/context/SoundContext";
import { useTheme } from "@/context/ThemeContext";

interface Hero3DProps {
  onSlamImpact?: () => void;
  triggerSlamExternal?: number; // increments to trigger external slam
}

export function Hero3D({ onSlamImpact, triggerSlamExternal = 0 }: Hero3DProps) {
  const [mounted, setMounted] = useState(false);
  const [isStriking, setIsStriking] = useState(false);
  const [hasImpacted, setHasImpacted] = useState(false);
  const [showShockwave, setShowShockwave] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  const { playGavelSlam } = useSound();
  const { themeConfig } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const initialSlamTriggered = useRef(false);

  useEffect(() => {
    setMounted(true);

    // Detect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    // Detect WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    // Auto-slam on page load after brief dramatic delay
    const initialTimer = setTimeout(() => {
      if (!initialSlamTriggered.current && !mq.matches) {
        initialSlamTriggered.current = true;
        triggerSlam();
      }
    }, 700);

    return () => clearTimeout(initialTimer);
  }, []);

  // Listen for external trigger (e.g. from GET JUDGED button)
  useEffect(() => {
    if (triggerSlamExternal > 0) {
      triggerSlam();
    }
  }, [triggerSlamExternal]);

  const triggerSlam = useCallback(() => {
    if (isStriking) return;
    setIsStriking(true);
    // Reset striking state after animation completes
    setTimeout(() => {
      setIsStriking(false);
    }, 850);
  }, [isStriking]);

  const handleImpact = useCallback(() => {
    setHasImpacted(true);

    // 1. Audio
    playGavelSlam();

    // 2. Visual shockwave
    setShowShockwave(true);
    setTimeout(() => setShowShockwave(false), 700);

    // 3. Screen shake
    if (!reducedMotion) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 240);

      // 4. Chromatic flash
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 140);
    }

    // 5. Propagate impact to notify parent (e.g. to reveal verdict card)
    if (onSlamImpact) {
      onSlamImpact();
    }
  }, [playGavelSlam, reducedMotion, onSlamImpact]);

  if (!mounted) {
    return (
      <div className="w-full h-80 sm:h-96 md:h-[460px] flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-zinc-800 animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-80 sm:h-96 md:h-[460px] select-none ${
        isShaking ? "slam-shake" : ""
      }`}
    >
      {/* Chromatic Flash Overlay */}
      {showFlash && (
        <div
          className="fixed inset-0 pointer-events-none z-50 animate-chromatic-flash"
          style={{ backgroundColor: themeConfig.accent, mixBlendMode: "screen" }}
        />
      )}

      {/* Radial Shockwave Ring at strike impact coordinate */}
      {showShockwave && (
        <div className="absolute top-[68%] left-[58%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          <div
            className="w-48 h-48 sm:w-72 sm:h-72 rounded-full border-4 animate-shockwave"
            style={{
              borderColor: themeConfig.accentGlow,
              boxShadow: `0 0 45px ${themeConfig.accentGlow}`,
            }}
          />
        </div>
      )}

      {/* 3D WebGL Canvas or Fallback */}
      {webglSupported ? (
        <Canvas
          camera={{ position: [0, 0.4, 5.2], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          style={{ background: "transparent" }}
        >
          <GavelScene
            isStriking={isStriking}
            onImpact={handleImpact}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      ) : (
        /* Low-Power / Fallback Poster */
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div
            className="w-40 h-40 rounded-full border-2 flex items-center justify-center text-6xl shadow-2xl animate-pulse"
            style={{
              borderColor: themeConfig.accent,
              boxShadow: `0 0 50px ${themeConfig.accentGlow}`,
              backgroundColor: themeConfig.bgElevated,
            }}
          >
            ⚖
          </div>
          <p className="mt-4 font-mono text-xs text-zinc-400">
            [High Court Chamber Active]
          </p>
        </div>
      )}

      {/* Interactive Quick Slam Action pill */}
      <button
        type="button"
        onClick={triggerSlam}
        disabled={isStriking}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white hover:border-zinc-700 shadow-md backdrop-blur-md cursor-pointer transition-all active:scale-95 disabled:opacity-50"
      >
        <span>⚡</span>
        <span>SLAM GAVEL</span>
      </button>
    </div>
  );
}
