"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemePreset = "crimson" | "neon" | "gold";

export interface ThemeConfig {
  id: ThemePreset;
  name: string;
  tagline: string;
  accent: string;
  accentGlow: string;
  accentMuted: string;
  bg: string;
  bgElevated: string;
  badgeBg: string;
}

export const THEMES: Record<ThemePreset, ThemeConfig> = {
  crimson: {
    id: "crimson",
    name: "Judicial Bench",
    tagline: "Polished Mahogany & Brass High Court",
    accent: "#D4AF37",
    accentGlow: "#F5D77F",
    accentMuted: "#997A15",
    bg: "#1A0B08",
    bgElevated: "#2A120D",
    badgeBg: "rgba(212, 175, 55, 0.18)",
  },
  neon: {
    id: "neon",
    name: "Judicial Felt",
    tagline: "Banker's Desk Hunter-Green Chamber",
    accent: "#D4AF37",
    accentGlow: "#F5D77F",
    accentMuted: "#164330",
    bg: "#0B2016",
    bgElevated: "#0F2F21",
    badgeBg: "rgba(22, 67, 48, 0.4)",
  },
  gold: {
    id: "gold",
    name: "High Tribunal",
    tagline: "Burnished Brass & Sovereign Parchment",
    accent: "#F5D77F",
    accentGlow: "#FFFFFF",
    accentMuted: "#D4AF37",
    bg: "#1A0B08",
    bgElevated: "#2A120D",
    badgeBg: "rgba(245, 215, 127, 0.25)",
  },
};

interface ThemeContextType {
  theme: ThemePreset;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemePreset) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreset>("crimson");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("judge_me_court_theme") as ThemePreset;
      if (saved && THEMES[saved]) {
        setThemeState(saved);
        applyThemeTokens(saved);
      } else {
        applyThemeTokens("crimson");
      }
    } catch {
      applyThemeTokens("crimson");
    }
  }, []);

  const setTheme = (newTheme: ThemePreset) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("judge_me_court_theme", newTheme);
    } catch (e) {
      console.warn("Could not save theme to localStorage", e);
    }
    applyThemeTokens(newTheme);
  };

  const applyThemeTokens = (t: ThemePreset) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const config = THEMES[t];

    root.setAttribute("data-theme", t);
    root.style.setProperty("--color-accent", config.accent);
    root.style.setProperty("--color-accent-glow", config.accentGlow);
    root.style.setProperty("--color-accent-muted", config.accentMuted);
    root.style.setProperty("--color-bg", config.bg);
    root.style.setProperty("--color-bg-elevated", config.bgElevated);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeConfig: THEMES[theme],
        setTheme,
        availableThemes: Object.values(THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
