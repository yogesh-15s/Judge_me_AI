"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useSound } from "@/context/SoundContext";
import {
  Gavel,
  Scale,
  ShieldCheck,
  Flame,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Brain,
  Zap,
  Lock,
  BookOpen,
} from "lucide-react";

const faqs = [
  {
    q: "Will this trial hurt my feelings?",
    a: "Highly likely. The AI Bench is programmed with zero filter, brutal honesty, and maximum emotional penalty. Select 'Plea Deal / Clemency 😇' if you are feeling fragile.",
  },
  {
    q: "How does the AI Bench calculate Aura Points?",
    a: "Our proprietary judicial algorithm evaluates original thought, cringe coefficient, effort-to-reward ratio, and cultural relevance to award or deduct Aura Points.",
  },
  {
    q: "Can I appeal an official court verdict?",
    a: "All decrees delivered by the AI Bench are final and binding in the court of public opinion. However, you may resubmit with improved evidence.",
  },
  {
    q: "Is my evidence stored or sold to third parties?",
    a: "Never. Exhibits submitted to the court are processed anonymously and kept strictly within the courtroom chamber.",
  },
  {
    q: "Can I subpoena my friends anonymously?",
    a: "Yes! Use the Subpoena Office feature to send an official court writ link directly to their inbox or chat.",
  },
];

export default function HowItWorksPage() {
  const { playPaperRustle } = useSound();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#1A0B08] text-[#F7F2E7] py-12 px-4 sm:px-6 lg:px-8 bg-court-grid courtroom-vignette">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] text-xs font-typewriter font-bold tracking-widest uppercase shadow-md">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>JUDICIAL CODE • COURTROOM RULES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F7F2E7] font-serif">
            RULES OF THE <span className="text-[#D4AF37]">COURT</span>
          </h1>
          <p className="text-[#C4B69C] text-sm sm:text-base max-w-xl mx-auto font-serif">
            Everything you need to know about the AI Bench algorithm, aura ledger metrics, and courtroom procedure.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="parchment-sheet rounded-2xl p-6 space-y-3 border-2 border-[#E2D3B5] shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] flex items-center justify-center font-serif font-black">
              1
            </div>
            <h3 className="text-lg font-serif font-black uppercase text-[#2C261E]">1. Aura Ledger Index</h3>
            <p className="text-xs font-typewriter text-[#5C5245] leading-relaxed">
              Quantitative rating of your overall presence, originality, and main-character energy recorded in court logs.
            </p>
          </div>

          <div className="parchment-sheet rounded-2xl p-6 space-y-3 border-2 border-[#E2D3B5] shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] flex items-center justify-center font-serif font-black">
              2
            </div>
            <h3 className="text-lg font-serif font-black uppercase text-[#2C261E]">2. Cringe Detector</h3>
            <p className="text-xs font-typewriter text-[#5C5245] leading-relaxed">
              Advanced neural scanning for cliché bios, corporate speak, toxic text messaging, and questionable outfits.
            </p>
          </div>

          <div className="parchment-sheet rounded-2xl p-6 space-y-3 border-2 border-[#E2D3B5] shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] flex items-center justify-center font-serif font-black">
              3
            </div>
            <h3 className="text-lg font-serif font-black uppercase text-[#2C261E]">3. Judicial Privilege</h3>
            <p className="text-xs font-typewriter text-[#5C5245] leading-relaxed">
              What transpires in court stays in court. Submissions are processed statelessly with absolute privacy.
            </p>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="dossier-folder rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <h2 className="text-2xl font-serif font-black uppercase text-[#2C261E] tracking-tight flex items-center gap-2.5 border-b border-[#D8C497] pb-4">
            <Gavel className="w-6 h-6 text-[#991B1B]" />
            JUDICIAL PROCEDURE & FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="parchment-sheet border border-[#E2D3B5] rounded-xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => {
                      setOpenFaq(isOpen ? null : i);
                      playPaperRustle();
                    }}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-serif font-bold text-sm sm:text-base text-[#2C261E] hover:text-[#997A15] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#991B1B] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#5C5245] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm font-typewriter text-[#5C5245] leading-relaxed border-t border-[#E2D3B5] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#D8C497] text-center">
            <Button href="/judge" onClick={playPaperRustle} variant="primary" size="lg" className="btn-brass py-4">
              STEP INTO THE COURTROOM BENCH ⚖
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
