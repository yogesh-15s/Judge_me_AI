"use client";

import React, { useState } from "react";
import { VerdictStamp } from "../ui/VerdictStamp";
import { Gavel, AlertTriangle, ShieldCheck, Flame, Zap, FileText, CheckCircle2, ChevronRight } from "lucide-react";

const sampleCases = [
  {
    id: "CASE #0492",
    category: "💘 Dating Profile",
    subject: "'Looking for a passenger princess to split 50/50'",
    auraScore: -850,
    delusionLevel: "99.4%",
    verdict: "WALKING RED FLAG",
    verdictVariant: "guilty" as const,
    rotate: "-rotate-6",
    verdictQuote:
      "The court has reviewed your bio. Claiming to want a passenger princess while enforcing strict 50/50 splitting on boba tea constitutes high treason against aura.",
    evidenceTags: ["Delusional Expectations", "Boba Financials", "Zero Chill"],
  },
  {
    id: "CASE #0184",
    category: "👕 Outfit Check",
    subject: "Full Tech-wear fit at a cousin's wedding",
    auraScore: +420,
    delusionLevel: "12.0%",
    verdict: "AURA MERCHANT",
    verdictVariant: "gold" as const,
    rotate: "rotate-3",
    verdictQuote:
      "Wearing a 14-pocket tactical vest over a suit jacket is insane, yet somehow the honorable court respects the sheer commitment to looking like an NPC boss.",
    evidenceTags: ["Tactical Chic", "Wedding Disruptor", "Main Character"],
  },
  {
    id: "CASE #0991",
    category: "💬 Instagram Bio",
    subject: "'Founder & CEO @ Living My Best Life 🚀✨'",
    auraScore: -999,
    delusionLevel: "100.0%",
    verdict: "CERTIFIED NPC",
    verdictVariant: "guilty" as const,
    rotate: "-rotate-3",
    verdictQuote:
      "Generic quote detected. The court sentences you to 30 days of mandatory original thought and immediate removal of rocket emojis.",
    evidenceTags: ["Emoji Overdose", "Corporate Cringe", "No Unique Thought"],
  },
];

export function CaseFileWidget() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const activeCase = sampleCases[activeCaseIndex];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Glow behind card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/40 via-amber-500/20 to-red-600/40 rounded-3xl blur-xl opacity-70 animate-pulse-glow" />

      {/* Main Case File Container */}
      <div className="relative bg-zinc-950/90 border-2 border-zinc-800 hover:border-red-900/60 rounded-2xl p-6 shadow-2xl backdrop-blur-xl transition-all duration-300">
        {/* Case File Header Banner */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/80 flex items-center justify-center text-red-400 font-mono font-black text-xs">
              ⚖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-red-500 tracking-wider">
                  {activeCase.id}
                </span>
                <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">
                  EVIDENCE FILE
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">Courtroom Chamber 01</p>
            </div>
          </div>

          {/* Interactive Case Switcher Dots */}
          <div className="flex items-center gap-1.5 bg-zinc-900 p-1.5 rounded-lg border border-zinc-800">
            {sampleCases.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveCaseIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === activeCaseIndex
                    ? "bg-red-500 scale-125 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                    : "bg-zinc-700 hover:bg-zinc-500"
                }`}
                title={`View ${c.id}`}
              />
            ))}
          </div>
        </div>

        {/* Evidence Details */}
        <div className="space-y-4">
          <div className="bg-zinc-900/70 rounded-xl p-4 border border-zinc-800/90">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>SUBMITTED EXHIBIT</span>
              <span className="text-amber-400">{activeCase.category}</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-zinc-100 italic">
              &ldquo;{activeCase.subject}&rdquo;
            </p>
          </div>

          {/* Score Meters */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                Aura Rating
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-xl font-black font-mono ${
                    activeCase.auraScore < 0 ? "text-red-500" : "text-amber-400"
                  }`}
                >
                  {activeCase.auraScore > 0 ? `+${activeCase.auraScore}` : activeCase.auraScore}
                </span>
                <span className="text-xs text-zinc-500 font-mono">PTS</span>
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                Delusion Index
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black font-mono text-red-400">
                  {activeCase.delusionLevel}
                </span>
                <span className="text-xs text-red-500 font-mono">CRITICAL</span>
              </div>
            </div>
          </div>

          {/* Verdict Box & Rubber Stamp */}
          <div className="relative bg-red-950/20 border-2 border-dashed border-red-900/60 rounded-xl p-4 overflow-hidden">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
                OFFICIAL VERDICT:
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium mb-3 pr-2">
              {activeCase.verdictQuote}
            </p>

            {/* Evidence Tags */}
            <div className="flex flex-wrap gap-1.5">
              {activeCase.evidenceTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Rubber Stamp Overlay */}
            <div className="absolute bottom-3 right-3 pointer-events-none">
              <VerdictStamp
                text={activeCase.verdict}
                variant={activeCase.verdictVariant}
                rotate={activeCase.rotate}
                size="sm"
                animate={true}
                key={activeCase.id}
              />
            </div>
          </div>
        </div>

        {/* Footer / Switch hint */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            AI Jury Decision Final
          </span>
          <button
            onClick={() =>
              setActiveCaseIndex((prev) => (prev + 1) % sampleCases.length)
            }
            className="hover:text-red-400 transition-colors flex items-center gap-1 font-bold text-red-500"
          >
            NEXT CASE <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
