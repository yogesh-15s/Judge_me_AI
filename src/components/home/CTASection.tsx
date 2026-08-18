"use client";

import React from "react";
import { Button } from "../ui/Button";
import { ArrowRight, Gavel, Flame, ShieldAlert } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-zinc-950">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-crimson pointer-events-none opacity-80" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border-2 border-red-600/50 rounded-3xl p-10 sm:p-16 shadow-2xl space-y-8 backdrop-blur-xl relative overflow-hidden">
          {/* Top Decorative Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-700/80 text-red-400 text-xs font-mono font-black tracking-widest uppercase">
            <Gavel className="w-4 h-4 text-red-500 animate-bounce" />
            <span>ORDER IN THE COURTROOM ⚖</span>
          </div>

          {/* Large Dramatic Headline */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tighter leading-none">
              READY TO BE <span className="text-red-600">JUDGED?</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto pt-2 font-medium">
              The court is in session. Submit your evidence now and face your verdict with zero filter.
            </p>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button href="/judge" variant="primary" size="xl" className="w-full sm:w-auto shadow-red-600/50">
              GET JUDGED <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <Button href="/how-it-works" variant="secondary" size="xl" className="w-full sm:w-auto">
              READ THE RULES 📜
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-xs font-mono text-zinc-500 pt-4">
            🔒 100% Anonymous • No Logins Required • Instant Emotional Damage
          </p>
        </div>
      </div>
    </section>
  );
}
