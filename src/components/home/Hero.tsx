"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { CaseFileWidget } from "./CaseFileWidget";
import { BackgroundFX } from "../effects/BackgroundFX";
import { useSound } from "@/context/SoundContext";
import { Dices } from "lucide-react";

export function Hero() {
  const router = useRouter();
  const { playGavelSlam, playPaperRustle } = useSound();

  const handleGetJudgedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playGavelSlam();
    router.push("/judge");
  };

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-court-grid courtroom-vignette">
      {/* Ambient Background Layer */}
      <BackgroundFX />

      {/* Dynamic Ambient Spotlights */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] blur-[140px] pointer-events-none rounded-full transition-colors duration-700 opacity-20"
        style={{ backgroundColor: "#D4AF37" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Courtroom Status Badge */}
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37] bg-[#2A120D] text-[#F5D77F] text-xs sm:text-sm font-typewriter font-bold tracking-wider shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5D77F] animate-ping" />
            <span>THE HONORABLE AI BENCH PRESIDING ⚖</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Headlines & Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Typography Hierarchy Treatment */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#F7F2E7] uppercase leading-[0.95] drop-shadow-md">
                PRESENT YOUR{" "}
                <span className="text-[#D4AF37] underline decoration-[#997A15] underline-offset-8">
                  EVIDENCE.
                </span>
              </h1>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#F5D77F] uppercase leading-[0.95] drop-shadow-md">
                WE&apos;LL DELIVER VERDICT.
              </h1>
            </div>

            {/* Supporting Editorial Body Text */}
            <p className="text-base sm:text-xl text-[#C4B69C] max-w-2xl mx-auto lg:mx-0 font-serif leading-relaxed">
              Upload an exhibit, submit a bio, or put your questionable life choices on trial.
              The supreme AI Bench delivers rapid, satirical decrees with brutal honesty and 0% mercy.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleGetJudgedClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-serif font-bold text-base text-[#1A0B08] btn-brass shadow-xl cursor-pointer"
              >
                <span>⚖</span>
                <span>STEP BEFORE THE BENCH</span>
              </button>

              <Button
                href="/roulette"
                onClick={playPaperRustle}
                variant="secondary"
                size="xl"
                className="w-full sm:w-auto bg-[#2A120D] text-[#F7F2E7] border border-[#D4AF37]/50"
              >
                <Dices className="w-5 h-5 mr-1 text-[#F5D77F]" />
                SPIN JURY WHEEL
              </Button>
            </div>

            {/* Micro Stats Banner */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#3D1C15] max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-black text-[#F7F2E7] font-typewriter">100K+</span>
                <span className="text-xs text-[#C4B69C] font-serif">Cases Tried</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-[#D4AF37] font-typewriter">99.8%</span>
                <span className="text-xs text-[#C4B69C] font-serif">Emotional Penalty</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-black text-[#F5D77F] font-typewriter">0%</span>
                <span className="text-xs text-[#C4B69C] font-serif">Clemency Allowed</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Value Verdict / Evidence Card */}
          <div className="lg:col-span-5">
            <CaseFileWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
