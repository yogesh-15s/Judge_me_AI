"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
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
} from "lucide-react";

const faqs = [
  {
    q: "Will this hurt my feelings?",
    a: "Highly likely. The AI Jury is programmed with zero filter, brutal honesty, and high emotional damage potential. Select 'Merciful 😇' if you are feeling fragile.",
  },
  {
    q: "How does the AI Jury calculate Aura Points?",
    a: "Our proprietary algorithm evaluates original thought, cringe coefficient, effort-to-reward ratio, and cultural relevance to award or deduct Aura Points.",
  },
  {
    q: "Can I appeal an official verdict?",
    a: "All verdicts delivered by the AI Bench are final and binding in the court of internet opinion. However, you may resubmit with improved evidence.",
  },
  {
    q: "Is my data stored or sold to third parties?",
    a: "Never. Exhibits submitted to the court are processed anonymously and kept strictly within the courtroom chamber.",
  },
  {
    q: "Can I judge my friends without them knowing?",
    a: "Yes! Use the Subpoena a Friend feature to send anonymous roast links directly to their inbox or chat.",
  },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 bg-court-grid">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span>THE RULES OF THE COURT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            HOW <span className="text-red-600">JUDGE ME</span> WORKS
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about the AI Jury engine, aura metrics, and courtroom procedure.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800 text-red-500 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white">1. Aura Index</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Quantitative rating of your overall presence, originality, and main-character energy.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-500 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white">2. Red Flag Detector</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Advanced neural scanning for toxic phrasing, cliché bios, and questionable outfit choices.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800 text-red-500 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white">3. Courtroom Privacy</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              What happens in court stays in court. Submissions are processed statelessly without logins.
            </p>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-zinc-900/80 border-2 border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <h2 className="text-2xl font-black uppercase text-white tracking-tight flex items-center gap-2">
            <Gavel className="w-6 h-6 text-red-500" />
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm text-zinc-200 hover:text-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-red-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-zinc-900 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800 text-center">
            <Button href="/judge" variant="primary" size="lg">
              READY? STEP INTO THE COURTROOM ⚖
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
