"use client";

import React from "react";
import { Upload, Scale, Sparkles, Gavel, Skull, ArrowRight, FileText } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "SUBMIT EXHIBIT",
    subtitle: "Attach your evidence.",
    description:
      "Drop a photo, bio, outfit screenshot, text message, dating profile, or a questionable life choice.",
    icon: Upload,
    badge: "EXHIBIT A",
  },
  {
    step: "02",
    title: "BENCH DELIBERATION",
    subtitle: "The court analyzes it.",
    description:
      "Our AI Bench scans for delusion, aura ledger index, fashion crimes, and red flags with 0% mercy.",
    icon: Scale,
    badge: "TRIAL IN SESSION",
  },
  {
    step: "03",
    title: "RECEIVE DECREE",
    subtitle: "Discover your sentence.",
    description:
      "Receive your official stamped court judgment, aura tally breakdown, and sworn decree.",
    icon: Gavel,
    badge: "FINAL SENTENCE",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-[#1A0B08] relative border-t-2 border-b-2 border-[#D4AF37]/40 bg-court-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-typewriter font-bold tracking-widest text-[#F5D77F] uppercase px-3 py-1 bg-[#2A120D] rounded-full border border-[#D4AF37] shadow">
            COURTROOM PROCEDURE & PROTOCOL
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase text-[#F7F2E7] tracking-tight">
            HOW THE <span className="text-[#D4AF37]">TRIALS</span> WORK
          </h2>
          <p className="text-[#C4B69C] text-base sm:text-lg font-serif">
            Three swift steps between you and your sworn decree before the AI Bench.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative dossier-folder rounded-2xl p-8 space-y-5 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl group border border-[#E2D3B5]"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between border-b border-[#D8C497] pb-3">
                  <span className="text-4xl sm:text-5xl font-serif font-black text-[#997A15] group-hover:text-[#991B1B] transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-typewriter font-bold tracking-wider px-2.5 py-1 rounded bg-[#E5D4AB] border border-[#C8B587] text-[#2C261E]">
                    {item.badge}
                  </span>
                </div>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-[#2A120D] border border-[#D4AF37] flex items-center justify-center text-[#F5D77F] group-hover:scale-110 transition-all duration-300 shadow">
                  <Icon className="w-7 h-7 text-[#F5D77F]" />
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-black text-[#2C261E] uppercase tracking-tight flex items-center gap-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-[#991B1B] font-typewriter">
                    {item.subtitle}
                  </p>
                  <p className="text-sm font-typewriter text-[#5C5245] leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
