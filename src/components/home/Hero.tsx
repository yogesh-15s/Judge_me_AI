"use client";

import React from "react";
import { Button } from "../ui/Button";
import { CaseFileWidget } from "./CaseFileWidget";
import { Gavel, Dices, ShieldAlert, Sparkles, Flame } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-court-grid">
      {/* Background Glow Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs sm:text-sm font-mono font-bold tracking-wider shadow-inner">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>THE HONORABLE AI PRESIDING ⚖</span>
            </div>

            {/* Main Editorial Headlines */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.95] drop-shadow-sm">
                GIVE US <span className="text-red-600 underline decoration-red-600/50 underline-offset-8">SOMETHING.</span>
              </h1>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
                WE&apos;LL JUDGE IT.
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Upload something, tell us something, or give us your questionable life choices. The court will decide your fate with brutal honesty and dramatic roasts.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button href="/judge" variant="primary" size="xl" className="w-full sm:w-auto shadow-red-600/40">
                ⚖ GET JUDGED
              </Button>
              <Button href="/roulette" variant="secondary" size="xl" className="w-full sm:w-auto">
                🎲 SURPRISE ME
              </Button>
            </div>

            {/* Micro Stats Banner */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-800/60 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-black text-white font-mono">100K+</span>
                <span className="text-xs text-zinc-400 font-medium">Cases Tried</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-red-500 font-mono">99.8%</span>
                <span className="text-xs text-zinc-400 font-medium">Emotional Damage</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono">0%</span>
                <span className="text-xs text-zinc-400 font-medium">Mercy Allowed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Case File Interactive Visual */}
          <div className="lg:col-span-5">
            <CaseFileWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
