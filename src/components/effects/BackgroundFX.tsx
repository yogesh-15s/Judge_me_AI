"use client";

import React, { useEffect, useRef } from "react";

const EVIDENCE_SNIPPETS = [
  "EXHIBIT A",
  "🚩 RED FLAG",
  "AURA -500",
  "DELUSION 99%",
  "GUILTY ⚖",
  "EXHIBIT B",
  "CASE #0492",
  "CRINGE ⚠️",
  "MAIN CHAR 🌟",
  "NO MERCY",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  size: number;
  alpha: number;
  maxAlpha: number;
  rotation: number;
  vRot: number;
}

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create particles
    const count = Math.min(18, Math.floor(width / 70));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.3 + 0.15),
        text: EVIDENCE_SNIPPETS[Math.floor(Math.random() * EVIDENCE_SNIPPETS.length)],
        size: Math.random() * 3 + 9, // 9px - 12px
        alpha: 0,
        maxAlpha: Math.random() * 0.12 + 0.05, // very subtle 5% - 17%
        rotation: (Math.random() - 0.5) * 0.2,
        vRot: (Math.random() - 0.5) * 0.002,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(50, time - lastTime);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Read accent color from document
      const accentGlow =
        getComputedStyle(document.documentElement).getPropertyValue("--color-accent-glow").trim() ||
        "#ff4d5e";

      for (const p of particles) {
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.rotation += p.vRot * (dt / 16);

        // Fade in / out
        if (p.y < height * 0.8 && p.alpha < p.maxAlpha) {
          p.alpha += 0.005;
        }

        // Wrap around top to bottom
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
          p.alpha = 0;
          p.text = EVIDENCE_SNIPPETS[Math.floor(Math.random() * EVIDENCE_SNIPPETS.length)];
        }
        if (p.x < -60) p.x = width + 50;
        if (p.x > width + 60) p.x = -50;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `600 ${p.size}px monospace`;
        ctx.fillStyle = accentGlow;
        ctx.globalAlpha = p.alpha;

        // Draw small badge container
        const textMetrics = ctx.measureText(p.text);
        const padX = 6;
        const padY = 3;
        const tagW = textMetrics.width + padX * 2;
        const tagH = p.size + padY * 2;

        ctx.fillStyle = "rgba(20, 20, 26, 0.4)";
        ctx.strokeStyle = accentGlow;
        ctx.lineWidth = 0.6;
        ctx.strokeRect(-padX, -p.size, tagW, tagH);
        ctx.fillRect(-padX, -p.size, tagW, tagH);

        ctx.fillStyle = "#ffffff";
        ctx.fillText(p.text, 0, 0);

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Subtle canvas particle field for floating evidence tags */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* 2. CRT Scanline Overlay (3-4% opacity) */}
      <div className="absolute inset-0 crt-scanlines opacity-[0.035]" />

      {/* 3. Soft vignette gradient fading the grid borders */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, transparent 20%, rgba(10, 10, 12, 0.5) 60%, var(--color-bg) 100%)",
        }}
      />
    </div>
  );
}
