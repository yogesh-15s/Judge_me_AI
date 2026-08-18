"use client";

import React from "react";
import { Upload, Scale, Sparkles, Gavel, Skull, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "SUBMIT",
    subtitle: "Give us something.",
    description:
      "Drop a photo, bio, outfit screenshot, text message, dating profile, or a questionable decision.",
    icon: Upload,
    accentColor: "border-zinc-700 text-zinc-300",
    badge: "EXHIBIT A",
  },
  {
    step: "02",
    title: "GET JUDGED",
    subtitle: "The court analyzes it.",
    description:
      "Our AI Jury scans for delusion, aura index, fashion crimes, and red flags with zero filter.",
    icon: Scale,
    accentColor: "border-red-600/80 text-red-500 bg-red-950/20",
    badge: "TRIAL IN SESSION",
  },
  {
    step: "03",
    title: "FACE THE VERDICT",
    subtitle: "Discover your fate.",
    description:
      "Receive your official stamped verdict card, aura breakdown, and shareable roast certificate.",
    icon: Skull,
    accentColor: "border-amber-500/80 text-amber-400 bg-amber-950/20",
    badge: "FINAL SENTENCE",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-zinc-950 relative border-t border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase px-3 py-1 bg-red-950/60 rounded-full border border-red-800/60">
            COURTROOM PROCEDURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tighter">
            HOW THE <span className="text-red-600">TRIALS</span> WORK
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Three swift steps between you and absolute emotional destruction.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-8 space-y-5 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-zinc-700 group-hover:text-red-500 transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                    {item.badge}
                  </span>
                </div>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:border-red-600/50 transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-red-400 font-mono">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed pt-1">
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
