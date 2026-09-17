"use client";

import React, { useState, useEffect } from "react";
import { VerdictStamp } from "../ui/VerdictStamp";
import { Gavel, AlertTriangle, ShieldCheck, Flame, Zap, FileText, CheckCircle2, ChevronRight, Scale, Paperclip } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";

const sampleCases = [
  {
    id: "EXHIBIT #0492",
    category: "💘 Dating Profile",
    subject: "'Looking for a passenger princess to split 50/50'",
    auraScore: -850,
    delusionTarget: 99.4,
    verdict: "WALKING RED FLAG",
    verdictVariant: "crimson" as const,
    rotate: "-rotate-12",
    verdictQuote:
      "The court has reviewed your bio. Claiming to want a passenger princess while enforcing strict 50/50 splitting on boba tea constitutes high treason against aura.",
    evidenceTags: ["Delusional Expectations", "Boba Financials", "Zero Chill"],
  },
  {
    id: "EXHIBIT #0184",
    category: "👕 Outfit Check",
    subject: "Full Tech-wear fit at a cousin's wedding",
    auraScore: 420,
    delusionTarget: 12.0,
    verdict: "AURA MERCHANT",
    verdictVariant: "gold" as const,
    rotate: "rotate-6",
    verdictQuote:
      "Wearing a 14-pocket tactical vest over a suit jacket is insane, yet somehow the honorable court respects the sheer commitment to looking like an NPC boss.",
    evidenceTags: ["Tactical Chic", "Wedding Disruptor", "Main Character"],
  },
  {
    id: "EXHIBIT #0991",
    category: "💬 Instagram Bio",
    subject: "'Founder & CEO @ Living My Best Life 🚀✨'",
    auraScore: -999,
    delusionTarget: 100.0,
    verdict: "CERTIFIED NPC",
    verdictVariant: "crimson" as const,
    rotate: "-rotate-6",
    verdictQuote:
      "Generic quote detected. The court sentences you to 30 days of mandatory original thought and immediate removal of rocket emojis.",
    evidenceTags: ["Emoji Overdose", "Corporate Cringe", "No Unique Thought"],
  },
];

function AnimatedNumber({
  value,
  duration = 800,
  prefix = "",
  suffix = "",
  isFloat = false,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  isFloat?: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;

      setDisplay(current);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [value, duration]);

  const formatted = isFloat
    ? display.toFixed(1)
    : Math.round(display).toLocaleString();

  const formattedWithSign =
    !isFloat && value > 0 ? `+${formatted}` : formatted;

  return (
    <span>
      {prefix}
      {formattedWithSign}
      {suffix}
    </span>
  );
}

export function CaseFileWidget() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const { themeConfig } = useTheme();
  const { playPaperRustle } = useSound();
  const activeCase = sampleCases[activeCaseIndex];

  const handleCaseChange = (newIndex: number) => {
    if (newIndex === activeCaseIndex) return;
    playPaperRustle();
    setIsFlipping(true);
    setTimeout(() => {
      setActiveCaseIndex(newIndex);
      setAnimKey((prev) => prev + 1);
      setIsFlipping(false);
    }, 180);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      {/* Dossier Folder Structure */}
      <div className="relative">
        {/* Manila Folder Tab Header */}
        <div className="flex items-center justify-between px-5 py-2 bg-[#E5D4AB] text-[#2C261E] rounded-t-2xl font-serif font-black text-xs sm:text-sm tracking-wider uppercase border-b border-[#D8C497] w-fit shadow-md">
          <span className="flex items-center gap-2">
            <Paperclip className="w-4 h-4 text-[#7A6438] -rotate-45" />
            CASE FILE — {activeCase.id}
          </span>
        </div>

        {/* Main Manila Folder Body */}
        <div className="dossier-folder p-5 sm:p-6 shadow-2xl rounded-tr-2xl rounded-b-2xl relative overflow-hidden">
          {/* Header Docket */}
          <div className="flex items-center justify-between border-b border-[#D8C497] pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2A120D] border border-[#D4AF37] flex items-center justify-center font-serif font-black text-xs text-[#F5D77F] shadow">
                ⚖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-typewriter text-xs font-bold text-[#991B1B]">
                    {activeCase.id}
                  </span>
                  <span className="text-[10px] bg-[#E5D4AB] border border-[#C8B587] text-[#2C261E] px-2 py-0.5 rounded font-typewriter font-bold">
                    PRIMARY EXHIBIT
                  </span>
                </div>
                <p className="text-xs text-[#5C5245] font-serif">Supreme AI Public Courtroom</p>
              </div>
            </div>

            {/* Exhibit Switcher Navigation Dots */}
            <div className="flex items-center gap-1.5 bg-[#E5D4AB] p-1.5 rounded-xl border border-[#C8B587]">
              {sampleCases.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => handleCaseChange(i)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    i === activeCaseIndex
                      ? "scale-125 bg-[#991B1B] shadow-sm"
                      : "bg-[#A89874] hover:bg-[#7A6438]"
                  }`}
                  title={`View ${c.id}`}
                  aria-label={`View Exhibit ${c.id}`}
                />
              ))}
            </div>
          </div>

          {/* Transitioning Exhibit Content Card */}
          <div
            className={`space-y-4 transition-all duration-200 ${
              isFlipping ? "opacity-0 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 blur-0"
            }`}
          >
            {/* Submitted Evidence Box */}
            <div className="ruled-paper p-4 rounded-xl border border-[#E2D3B5] shadow-inner">
              <div className="flex items-center justify-between text-xs font-typewriter text-[#5C5245] mb-1">
                <span className="tracking-wider">SUBMITTED EVIDENCE TRANSCRIPT</span>
                <span className="text-[#997A15] font-bold">{activeCase.category}</span>
              </div>
              <p className="text-base sm:text-lg font-serif font-bold text-[#2C261E] italic">
                &ldquo;{activeCase.subject}&rdquo;
              </p>
            </div>

            {/* Dynamic Stat Meters with Count-Up Numbers */}
            <div className="grid grid-cols-2 gap-3">
              {/* Aura Rating Ledger Entry */}
              <div className="bg-[#EDE2CE] rounded-xl p-3 border border-[#D8C497]">
                <span className="text-[11px] font-typewriter text-[#5C5245] uppercase tracking-wider block mb-1 font-bold">
                  Aura Ledger Tally
                </span>
                <div className="flex items-baseline gap-1 font-typewriter">
                  <span
                    className="text-2xl font-black"
                    style={{
                      color: activeCase.auraScore < 0 ? "#991B1B" : "#997A15",
                    }}
                  >
                    <AnimatedNumber
                      key={`aura-${animKey}`}
                      value={activeCase.auraScore}
                      duration={850}
                    />
                  </span>
                  <span className="text-xs text-[#5C5245] font-bold">PTS</span>
                </div>
              </div>

              {/* Delusion Index Ledger Entry */}
              <div className="bg-[#EDE2CE] rounded-xl p-3 border border-[#D8C497]">
                <span className="text-[11px] font-typewriter text-[#5C5245] uppercase tracking-wider block mb-1 font-bold">
                  Delusion Index
                </span>
                <div className="flex items-baseline gap-1 font-typewriter">
                  <span className="text-2xl font-black text-[#991B1B]">
                    <AnimatedNumber
                      key={`delusion-${animKey}`}
                      value={activeCase.delusionTarget}
                      duration={850}
                      suffix="%"
                      isFloat={true}
                    />
                  </span>
                  <span className="text-xs font-bold text-[#991B1B]">
                    {activeCase.delusionTarget > 80 ? "CRITICAL" : "MODERATE"}
                  </span>
                </div>
              </div>
            </div>

            {/* Official Sworn Judgment Document Box */}
            <div className="parchment-sheet rounded-xl p-4 border border-[#E2D3B5] relative overflow-hidden min-h-[140px] flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-typewriter font-bold tracking-widest text-[#991B1B] uppercase">
                    OFFICIAL COURT DECREE:
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#2C261E] font-serif leading-relaxed font-bold mb-3 pr-2 sm:pr-8">
                  {activeCase.verdictQuote}
                </p>
              </div>

              {/* Evidence Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeCase.evidenceTags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="text-[10px] font-typewriter bg-[#E5D4AB] text-[#2C261E] border border-[#C8B587] px-2 py-0.5 rounded font-bold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Physical Rubber Stamp Overlay */}
              <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
                <VerdictStamp
                  key={`stamp-${animKey}`}
                  text={activeCase.verdict}
                  variant={activeCase.verdictVariant}
                  rotate={activeCase.rotate}
                  size="sm"
                  animate={true}
                />
              </div>
            </div>
          </div>

          {/* Card Footer & Exhibit Switcher Hint */}
          <div className="mt-4 pt-3 border-t border-[#D8C497] flex items-center justify-between text-xs font-typewriter text-[#5C5245]">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#991B1B] animate-ping" />
              AI Bench Decrees Signed
            </span>
            <button
              onClick={() => handleCaseChange((activeCaseIndex + 1) % sampleCases.length)}
              className="transition-colors flex items-center gap-1 font-bold cursor-pointer text-[#991B1B] hover:text-[#7F1D1D]"
            >
              NEXT EXHIBIT <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
