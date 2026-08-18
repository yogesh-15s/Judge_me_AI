"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { VerdictStamp } from "@/components/ui/VerdictStamp";
import { Dices, RefreshCw, Flame, Sparkles, Share2, ArrowRight } from "lucide-react";

const rouletteCases = [
  {
    caseNo: "CASE #0719",
    category: "👕 OUTFIT CHECK",
    title: "AURA MERCHANT",
    stampVariant: "gold" as const,
    auraScore: 920,
    delusion: 10,
    quote: "Full monochrome black linen suit paired with vintage loafers. The honorable court awards +920 Aura instantly.",
  },
  {
    caseNo: "CASE #0332",
    category: "💬 BIO CHECK",
    title: "CERTIFIED NPC",
    stampVariant: "guilty" as const,
    auraScore: -610,
    delusion: 94,
    quote: "Includes 'Work hard play harder 🍻' in bio. Court orders immediate re-education in original phrasing.",
  },
  {
    caseNo: "CASE #0894",
    category: "💘 DATING TEXTS",
    title: "WALKING RED FLAG",
    stampVariant: "guilty" as const,
    auraScore: -999,
    delusion: 99,
    quote: "Replied 'k' after a 3-paragraph emotional confession. Sentence: 50 hours of empathy training.",
  },
  {
    caseNo: "CASE #0205",
    category: "🧠 LIFE CHOICES",
    title: "BEYOND SAVING",
    stampVariant: "guilty" as const,
    auraScore: -1500,
    delusion: 100,
    quote: "Tried to explain Web3 tokenomics at a funeral. The AI Jury could not find a single mitigating factor.",
  },
  {
    caseNo: "CASE #0661",
    category: "📱 PHONE CHECK",
    title: "CHAOTIC NEUTRAL",
    stampVariant: "warning" as const,
    auraScore: +150,
    delusion: 40,
    quote: "4,821 unread Slack messages, 2% battery, but 60FPS homescreen organization. Court remains intrigued.",
  },
];

export default function RoulettePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const currentCase = rouletteCases[currentIndex];

  const handleSpin = () => {
    setIsSpinning(true);
    let spins = 0;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rouletteCases.length);
      spins++;
      if (spins > 10) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 bg-court-grid">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-800/80 text-amber-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Dices className="w-4 h-4 text-amber-500 animate-spin" />
            <span>RANDOM JUDGMENT ROULETTE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            SPIN FOR <span className="text-amber-500">VERDICT</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Cycle through random community case files or test your luck against the court of internet destiny.
          </p>
        </div>

        {/* Spin Wheel Card */}
        <div className="bg-zinc-900/80 border-2 border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl space-y-8 text-center relative overflow-hidden">
          {/* Top Status */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-4">
            <span>{currentCase.caseNo}</span>
            <span className="text-amber-400 font-bold">{currentCase.category}</span>
          </div>

          {/* Verdict Display */}
          <div className={`space-y-6 transition-all duration-150 ${isSpinning ? "opacity-50 blur-[1px]" : "opacity-100"}`}>
            <div className="flex justify-center">
              <VerdictStamp
                text={currentCase.title}
                variant={currentCase.stampVariant}
                rotate="-rotate-2"
                size="lg"
                key={currentCase.caseNo}
              />
            </div>

            <div className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800 max-w-2xl mx-auto">
              <p className="text-lg sm:text-xl font-bold text-zinc-100 italic">
                &ldquo;{currentCase.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 font-mono text-sm">
              <div className="bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-xs">AURA RATING</span>
                <span className={`font-black text-lg ${currentCase.auraScore > 0 ? "text-amber-400" : "text-red-500"}`}>
                  {currentCase.auraScore > 0 ? `+${currentCase.auraScore}` : currentCase.auraScore}
                </span>
              </div>
              <div className="bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block text-xs">DELUSION %</span>
                <span className="font-black text-lg text-red-400">{currentCase.delusion}%</span>
              </div>
            </div>
          </div>

          {/* Action Spin Button */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleSpin}
              disabled={isSpinning}
              variant="gold"
              size="xl"
              className="w-full sm:w-auto"
            >
              <Dices className={`w-6 h-6 ${isSpinning ? "animate-spin" : ""}`} />
              SPIN THE WHEEL 🎲
            </Button>
            <Button href="/judge" variant="secondary" size="xl" className="w-full sm:w-auto">
              SUBMIT MY OWN CASE ⚖
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
