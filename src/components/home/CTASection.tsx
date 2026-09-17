"use client";

import React from "react";
import { Button } from "../ui/Button";
import { useSound } from "@/context/SoundContext";
import { ArrowRight, Gavel, Flame, ShieldAlert, Scale } from "lucide-react";

export function CTASection() {
  const { playPaperRustle } = useSound();

  return (
    <section className="py-24 relative overflow-hidden bg-[#1A0B08] bg-court-grid courtroom-vignette">
      {/* Background Radial Glow */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="dossier-folder rounded-3xl p-10 sm:p-16 shadow-2xl space-y-8 relative overflow-hidden border-2 border-[#D4AF37]">
          {/* Top Decorative Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] text-xs font-typewriter font-bold tracking-widest uppercase shadow">
            <Gavel className="w-4 h-4 text-[#D4AF37] animate-bounce" />
            <span>ORDER IN THE COURTROOM ⚖</span>
          </div>

          {/* Large Dramatic Headline */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black uppercase text-[#2C261E] tracking-tight leading-none">
              READY TO STAND <span className="text-[#991B1B]">TRIAL?</span>
            </h2>
            <p className="text-[#5C5245] text-base sm:text-xl max-w-2xl mx-auto pt-2 font-serif font-bold">
              The AI Bench is in session. Submit your exhibit now and face your sworn decree with 0% mercy.
            </p>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button href="/judge" onClick={playPaperRustle} variant="primary" size="xl" className="w-full sm:w-auto btn-brass py-4 px-8">
              STEP BEFORE THE BENCH <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <Button href="/how-it-works" onClick={playPaperRustle} variant="secondary" size="xl" className="w-full sm:w-auto bg-[#2A120D] text-[#F7F2E7] border border-[#D4AF37]">
              JUDICIAL RULES 📜
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-xs font-typewriter text-[#5C5245] pt-4 font-bold">
            🔒 100% Anonymous Judicial Privilege • Instant Decree • No Registration Required
          </p>
        </div>
      </div>
    </section>
  );
}
