"use client";

import React from "react";
import Link from "next/link";
import { useSound } from "@/context/SoundContext";
import {
  Camera,
  MessageSquare,
  Shirt,
  Music,
  Heart,
  FileCode,
  Smartphone,
  Brain,
  ArrowUpRight,
  Flame,
  FileText,
} from "lucide-react";

const categories = [
  {
    id: "profile",
    title: "Profile Exhibit",
    emoji: "📸",
    icon: Camera,
    description: "Instagram, LinkedIn, or PFP vibe check.",
    sample: "'Does this picture scream Main Character or Desperate?'",
    casesTried: "24.1k",
    tag: "POPULAR",
  },
  {
    id: "bio",
    title: "Affidavit / Bio",
    emoji: "💬",
    icon: MessageSquare,
    description: "Tinder, IG, Twitter, or Hinge bio analysis.",
    sample: "'ENTP • CEO @ Living • Height 6\'1 (since that matters)'",
    casesTried: "19.8k",
    tag: "HIGH CRINGE",
  },
  {
    id: "outfit",
    title: "Outfit Evidence",
    emoji: "👕",
    icon: Shirt,
    description: "Drip or disaster? Fashion police is active.",
    sample: "'Rate my fit for a 1st date at Applebee\'s'",
    casesTried: "31.4k",
    tag: "HOT",
  },
  {
    id: "music",
    title: "Audio Record",
    emoji: "🎵",
    icon: Music,
    description: "Spotify Wrapped, top artists & taste audit.",
    sample: "'Listening to Sad Boy Indie at 3:00 AM'",
    casesTried: "14.2k",
    tag: "NPC RISK",
  },
  {
    id: "dating",
    title: "Dating Docket",
    emoji: "💘",
    icon: Heart,
    description: "Texts, prompts, chat screenshots & red flags.",
    sample: "'He texted \'wyd\' at 2:14 AM after 3 weeks silent'",
    casesTried: "42.9k",
    tag: "RED FLAG",
  },
  {
    id: "resume",
    title: "Career Dossier",
    emoji: "🧑‍💻",
    icon: FileCode,
    description: "CV, LinkedIn skills & career buzzwords.",
    sample: "'Synergistic Thought Leader & AI Prompt Ninja'",
    casesTried: "11.6k",
    tag: "CORPORATE",
  },
  {
    id: "phone",
    title: "Device Log",
    emoji: "📱",
    icon: Smartphone,
    description: "Homescreen layout, unread emails & battery %.",
    sample: "'14,291 unread emails and 4% battery right now'",
    casesTried: "8.7k",
    tag: "CHAOTIC",
  },
  {
    id: "choices",
    title: "Life Choices",
    emoji: "🧠",
    icon: Brain,
    description: "Questionable impulse buys & late-night ideas.",
    sample: "'Bought a $300 espresso machine while behind on rent'",
    casesTried: "28.5k",
    tag: "DELUSIONAL",
  },
];

export function CategoryGrid() {
  const { playPaperRustle } = useSound();

  return (
    <section className="py-24 bg-[#1A0B08] relative border-t-2 border-[#D4AF37]/40 bg-court-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#D8C497]/50 pb-8">
          <div className="space-y-3">
            <span className="text-xs font-typewriter font-bold tracking-widest text-[#F5D77F] uppercase px-3 py-1 bg-[#2A120D] rounded-full border border-[#D4AF37] shadow">
              EXHIBIT CLASSIFICATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase text-[#F7F2E7] tracking-tight">
              SELECT YOUR <span className="text-[#D4AF37]">COURT DOCKET</span>
            </h2>
            <p className="text-[#C4B69C] text-base max-w-xl font-serif">
              Choose your category. No exhibit of your life is exempt from trial before the AI Bench.
            </p>
          </div>

          <Link
            href="/judge"
            onClick={playPaperRustle}
            className="inline-flex items-center gap-2 text-sm font-bold font-typewriter text-[#F5D77F] hover:text-white transition-colors uppercase tracking-wider group"
          >
            EXPLORE ALL COURT DOCKETS <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={`/judge?category=${item.id}`}
                onClick={playPaperRustle}
                className="group relative dossier-folder rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between border border-[#E2D3B5] hover:border-[#D4AF37]"
              >
                <div>
                  {/* Top Bar: Icon + Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#2A120D] border border-[#D4AF37] flex items-center justify-center text-2xl transition-colors shadow">
                      <span>{item.emoji}</span>
                    </div>
                    <span className="text-[10px] font-typewriter font-bold px-2.5 py-1 rounded bg-[#E5D4AB] border border-[#C8B587] text-[#2C261E]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-serif font-extrabold text-[#2C261E] uppercase tracking-tight mb-2 group-hover:text-[#991B1B] transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#7A6438] group-hover:text-[#991B1B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs font-typewriter text-[#5C5245] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Teaser quote */}
                  <div className="ruled-paper rounded-lg p-2.5 border border-[#E2D3B5] mb-4">
                    <p className="text-[11px] font-typewriter text-[#2C261E] italic truncate">
                      {item.sample}
                    </p>
                  </div>
                </div>

                {/* Footer Count */}
                <div className="pt-3 border-t border-[#D8C497] flex items-center justify-between text-[11px] font-typewriter text-[#5C5245]">
                  <span>TRIED: {item.casesTried}</span>
                  <span className="text-[#991B1B] font-bold group-hover:underline">SUBMIT →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
