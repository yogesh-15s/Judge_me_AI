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
    "inline-flex items-center justify-center font-serif font-bold tracking-wider uppercase transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#1a0b08] disabled:opacity-50 disabled:pointer-events-none rounded-xl active:translate-y-0.5 active:shadow-inner cursor-pointer select-none";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#997A15] text-[#1A0B08] font-black border border-[#F5D77F] shadow-[0_4px_15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.6)] hover:brightness-110 hover:shadow-[0_6px_20px_rgba(212,175,55,0.4)]",
    secondary:
      "bg-[#2A120D] hover:bg-[#3D1C15] text-[#F7F2E7] border border-[#D4AF37]/40 shadow-md shadow-black/50 hover:border-[#D4AF37]",
    outline:
      "bg-transparent hover:bg-[#D4AF37]/15 text-[#F5D77F] hover:text-white border-2 border-[#D4AF37] shadow-sm",
    ghost:
      "bg-transparent hover:bg-[#3D1C15]/60 text-[#EDE2CE] hover:text-white border border-transparent",
    gold:
      "bg-gradient-to-r from-[#F5D77F] via-[#D4AF37] to-[#997A15] text-[#1A0B08] font-black shadow-lg shadow-[#D4AF37]/30 border border-[#F5D77F]",
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
