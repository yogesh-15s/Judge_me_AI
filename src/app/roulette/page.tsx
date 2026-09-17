"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { VerdictStamp } from "@/components/ui/VerdictStamp";
import { useSound } from "@/context/SoundContext";
import { Dices, RefreshCw, Flame, Sparkles, Share2, ArrowRight, Gavel } from "lucide-react";

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
    title: "MAXIMUM SENTENCE",
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
  const { playPaperRustle, playGavelSlam } = useSound();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const currentCase = rouletteCases[currentIndex];

  const handleSpin = () => {
    setIsSpinning(true);
    let spins = 0;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rouletteCases.length);
      playPaperRustle();
      spins++;
      if (spins > 10) {
        clearInterval(interval);
        setIsSpinning(false);
        playGavelSlam();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#1A0B08] text-[#F7F2E7] py-12 px-4 sm:px-6 lg:px-8 bg-court-grid courtroom-vignette">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] text-xs font-typewriter font-bold tracking-widest uppercase shadow-md">
            <Dices className="w-4 h-4 text-[#D4AF37] animate-spin" />
            <span>COURT CHAMBER ROULETTE • JURY WHEEL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F7F2E7] font-serif">
            SPIN THE <span className="text-[#D4AF37]">JURY WHEEL</span>
          </h1>
          <p className="text-[#C4B69C] text-sm sm:text-base max-w-xl mx-auto font-serif">
            Cycle through random community case files or test your luck against the supreme court of internet destiny.
          </p>
        </div>

        {/* Spin Wheel Card */}
        <div className="dossier-folder rounded-2xl p-8 shadow-2xl space-y-8 text-center relative overflow-hidden">
          {/* Top Status */}
          <div className="flex items-center justify-between text-xs font-typewriter text-[#5C5245] border-b border-[#D8C497] pb-4 font-bold">
            <span>{currentCase.caseNo}</span>
            <span className="text-[#997A15]">{currentCase.category}</span>
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
                animate={!isSpinning}
              />
            </div>

            <div className="parchment-sheet rounded-2xl p-6 border border-[#E2D3B5] max-w-2xl mx-auto shadow-inner">
              <p className="text-lg sm:text-xl font-serif font-bold text-[#2C261E] italic leading-relaxed">
                &ldquo;{currentCase.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 font-typewriter text-sm">
              <div className="bg-[#EDE2CE] px-5 py-2.5 rounded-xl border border-[#D8C497]">
                <span className="text-[#5C5245] block text-xs font-bold">AURA TALLY</span>
                <span className={`font-black text-lg ${currentCase.auraScore > 0 ? "text-[#997A15]" : "text-[#991B1B]"}`}>
                  {currentCase.auraScore > 0 ? `+${currentCase.auraScore}` : currentCase.auraScore} PTS
                </span>
              </div>
              <div className="bg-[#EDE2CE] px-5 py-2.5 rounded-xl border border-[#D8C497]">
                <span className="text-[#5C5245] block text-xs font-bold">DELUSION INDEX</span>
                <span className="font-black text-lg text-[#991B1B]">{currentCase.delusion}%</span>
              </div>
            </div>
          </div>

          {/* Action Spin Button */}
          <div className="pt-4 border-t border-[#D8C497] flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleSpin}
              disabled={isSpinning}
              variant="primary"
              size="xl"
              className="w-full sm:w-auto btn-brass px-8"
            >
              <Dices className={`w-6 h-6 ${isSpinning ? "animate-spin" : ""}`} />
              SPIN JURY WHEEL 🎲
            </Button>
            <Button href="/judge" variant="secondary" size="xl" className="w-full sm:w-auto bg-[#2A120D] text-[#F7F2E7]">
              SUBMIT MY OWN EXHIBIT ⚖
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
