"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface VerdictStampProps {
  text: string;
  variant?: "guilty" | "gold" | "innocent" | "warning";
  rotate?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

export function VerdictStamp({
  text,
  variant = "guilty",
  rotate = "-rotate-3",
  size = "md",
  animate = false,
  className,
}: VerdictStampProps) {
  const variantStyles = {
    guilty:
      "text-red-500 border-red-500/90 bg-red-950/30 shadow-[0_0_15px_rgba(239,68,68,0.25)]",
    gold:
      "text-amber-400 border-amber-400/90 bg-amber-950/30 shadow-[0_0_15px_rgba(251,191,36,0.25)]",
    innocent:
      "text-emerald-400 border-emerald-400/90 bg-emerald-950/30 shadow-[0_0_15px_rgba(52,211,153,0.25)]",
    warning:
      "text-orange-400 border-orange-400/90 bg-orange-950/30 shadow-[0_0_15px_rgba(251,146,60,0.25)]",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1 border-2 font-black tracking-widest rounded",
    md: "text-sm md:text-base px-3.5 py-1.5 border-3 font-extrabold tracking-widest rounded-md",
    lg: "text-lg md:text-xl px-5 py-2 border-4 font-black tracking-widest rounded-lg",
  };

  return (
    <div
      className={twMerge(
        clsx(
          "inline-flex items-center uppercase font-mono select-none transition-transform duration-300",
          variantStyles[variant],
          sizeStyles[size],
          rotate,
          animate && "animate-stamp",
          className
        )
      )}
    >
      <span className="mr-1 opacity-70">⚖</span> {text}
    </div>
  );
}
