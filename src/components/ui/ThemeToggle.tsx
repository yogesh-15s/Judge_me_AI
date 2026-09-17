"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, ThemePreset } from "@/context/ThemeContext";
import { Palette, Check } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, availableThemes } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTheme = availableThemes.find((t) => t.id === theme) || availableThemes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 shadow-sm"
        title="Switch Court Theme"
        aria-label="Courtroom Theme"
      >
        <span
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor] transition-colors"
          style={{ backgroundColor: currentTheme.accent, color: currentTheme.accentGlow }}
        />
        <span className="hidden sm:inline font-semibold">{currentTheme.name}</span>
        <Palette className="w-3.5 h-3.5 text-zinc-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-950/95 border border-zinc-800 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800/80 mb-1">
            Courtroom Chamber Theme
          </div>
          <div className="space-y-1">
            {availableThemes.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id as ThemePreset);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                    isSelected
                      ? "bg-zinc-800/80 text-white font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: t.accent,
                        boxShadow: `0 0 10px ${t.accentGlow}`,
                      }}
                    />
                    <div>
                      <div className="font-semibold text-zinc-200">{t.name}</div>
                      <div className="text-[10px] text-zinc-400 font-sans">{t.tagline}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
