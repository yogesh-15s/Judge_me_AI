"use client";

import React, { useState, useEffect } from "react";
import { Scale } from "lucide-react";

export const COURT_LOADING_STRINGS = [
  "Reviewing evidence...",
  "Consulting the jury...",
  "Calculating emotional damage...",
  "Cross-examining your choices...",
  "Sentencing in progress...",
  "Deliberating in chambers...",
  "Gavel primed for impact...",
];

interface LoadingCopyProps {
  className?: string;
  intervalMs?: number;
  showIcon?: boolean;
}

export function LoadingCopy({
  className = "",
  intervalMs = 2200,
  showIcon = true,
}: LoadingCopyProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % COURT_LOADING_STRINGS.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <div className={`inline-flex items-center gap-2 font-mono text-xs ${className}`}>
      {showIcon && (
        <Scale className="w-3.5 h-3.5 animate-spin text-[var(--color-accent)]" style={{ animationDuration: "3s" }} />
      )}
      <span className="animate-pulse tracking-wide">{COURT_LOADING_STRINGS[index]}</span>
    </div>
  );
}
