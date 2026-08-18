"use client";

import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-wide uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30 hover:shadow-red-600/50 border border-red-500/50",
    secondary:
      "bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/60 hover:border-zinc-500",
    outline:
      "bg-transparent hover:bg-red-950/40 text-red-400 hover:text-red-300 border-2 border-red-600/60 hover:border-red-500",
    ghost:
      "bg-transparent hover:bg-zinc-800/60 text-zinc-300 hover:text-white border border-transparent",
    gold:
      "bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black shadow-lg shadow-amber-500/20 border border-amber-400/50",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
    xl: "text-lg px-8 py-4 gap-3 font-extrabold tracking-wider",
  };

  const combinedClasses = twMerge(
    clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
