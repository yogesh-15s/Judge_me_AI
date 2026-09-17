"use client";

import React from "react";
import { useSound } from "@/context/SoundContext";
import { Volume2, VolumeX } from "lucide-react";

export function SoundToggle() {
  const { muted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      className={`flex items-center justify-center p-2 rounded-full border text-xs transition-all duration-200 cursor-pointer ${
        muted
          ? "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
          : "bg-zinc-900 border-zinc-700 text-zinc-100 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
      }`}
      title={muted ? "Unmute Courtroom Audio (SFX on)" : "Mute Courtroom Audio (SFX off)"}
      aria-label="Courtroom Audio Toggle"
    >
      {muted ? (
        <VolumeX className="w-4 h-4 text-zinc-400" />
      ) : (
        <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
      )}
    </button>
  );
}
