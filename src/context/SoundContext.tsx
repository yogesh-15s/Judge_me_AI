"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface SoundContextType {
  muted: boolean;
  toggleMute: () => void;
  playGavelSlam: () => void;
  playStampThud: () => void;
  playPaperRustle: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Off by default as required by specification
  const [muted, setMuted] = useState<boolean>(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("judge_me_sound_muted");
      if (saved !== null) {
        setMuted(saved === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  const getAudioContext = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("judge_me_sound_muted", String(next));
      } catch {
        // ignore
      }
      if (!next) {
        // Initialize context on unmute
        getAudioContext();
      }
      return next;
    });
  };

  /**
   * High-impact acoustic Gavel Strike:
   * 1. Hard transient click (wooden surface impact)
   * 2. Resonant wood cavity punch (low frequency thud with pitch drop)
   * 3. Decay reverb tail
   */
  const playGavelSlam = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Transient click/crack
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(800, now);
    clickOsc.frequency.exponentialRampToValueAtTime(120, now + 0.04);
    clickGain.gain.setValueAtTime(0.7, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.start(now);
    clickOsc.stop(now + 0.05);

    // 2. Heavy wooden impact body
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = "sine";
    bodyOsc.frequency.setValueAtTime(220, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(55, now + 0.25);
    bodyGain.gain.setValueAtTime(0.85, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(ctx.destination);

    bodyOsc.start(now);
    bodyOsc.stop(now + 0.35);

    // 3. Sub-bass chamber rumble
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.45);
    subGain.gain.setValueAtTime(0.5, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.5);
  };

  /**
   * Rubber Stamp Thud SFX:
   * Heavy rubber stamp slap on legal paper.
   */
  const playStampThud = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const stampOsc = ctx.createOscillator();
    const stampGain = ctx.createGain();
    stampOsc.type = "sine";
    stampOsc.frequency.setValueAtTime(150, now);
    stampOsc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
    stampGain.gain.setValueAtTime(0.8, now);
    stampGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    stampOsc.connect(stampGain);
    stampGain.connect(ctx.destination);

    stampOsc.start(now);
    stampOsc.stop(now + 0.18);
  };

  /**
   * Paper Rustle SFX:
   * Filtered noise burst simulating paper sliding or flipping dossier tabs.
   */
  const playPaperRustle = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(1.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.12);
  };

  return (
    <SoundContext.Provider
      value={{ muted, toggleMute, playGavelSlam, playStampThud, playPaperRustle }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
