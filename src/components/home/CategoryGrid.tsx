"use client";

import React from "react";
import Link from "next/link";
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
} from "lucide-react";

const categories = [
  {
    id: "profile",
    title: "Profile",
    emoji: "📸",
    icon: Camera,
    description: "Instagram, LinkedIn, or PFP vibe check.",
    sample: "'Does this picture scream Main Character or Desperate?'",
    casesTried: "24.1k",
    tag: "POPULAR",
    tagColor: "bg-red-950/80 text-red-400 border-red-800",
  },
  {
    id: "bio",
    title: "Bio",
    emoji: "💬",
    icon: MessageSquare,
    description: "Tinder, IG, Twitter, or Hinge bio analysis.",
    sample: "'ENTP • CEO @ Living • Height 6\'1 (since that matters)'",
    casesTried: "19.8k",
    tag: "HIGH CRINGE",
    tagColor: "bg-amber-950/80 text-amber-400 border-amber-800",
  },
  {
    id: "outfit",
    title: "Outfit",
    emoji: "👕",
    icon: Shirt,
    description: "Drip or disaster? Fashion police is active.",
    sample: "'Rate my fit for a 1st date at Applebee\'s'",
    casesTried: "31.4k",
    tag: "HOT",
    tagColor: "bg-red-950/80 text-red-400 border-red-800",
  },
  {
    id: "music",
    title: "Music",
    emoji: "🎵",
    icon: Music,
    description: "Spotify Wrapped, top artists & taste audit.",
    sample: "'Listening to Sad Boy Indie at 3:00 AM'",
    casesTried: "14.2k",
    tag: "NPC RISK",
    tagColor: "bg-zinc-800 text-zinc-300 border-zinc-700",
  },
  {
    id: "dating",
    title: "Dating",
    emoji: "💘",
    icon: Heart,
    description: "Texts, prompts, chat screenshots & red flags.",
    sample: "'He texted \'wyd\' at 2:14 AM after 3 weeks silent'",
    casesTried: "42.9k",
    tag: "RED FLAG",
    tagColor: "bg-red-950/80 text-red-400 border-red-800",
  },
  {
    id: "resume",
    title: "Resume",
    emoji: "🧑‍💻",
    icon: FileCode,
    description: "CV, LinkedIn skills & career buzzwords.",
    sample: "'Synergistic Thought Leader & AI Prompt Ninja'",
    casesTried: "11.6k",
    tag: "CORPORATE",
    tagColor: "bg-zinc-800 text-zinc-300 border-zinc-700",
  },
  {
    id: "phone",
    title: "Phone",
    emoji: "📱",
    icon: Smartphone,
    description: "Homescreen layout, unread emails & battery %.",
    sample: "'14,291 unread emails and 4% battery right now'",
    casesTried: "8.7k",
    tag: "CHAOTIC",
    tagColor: "bg-amber-950/80 text-amber-400 border-amber-800",
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
    tagColor: "bg-red-950/80 text-red-400 border-red-800",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-24 bg-zinc-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase px-3 py-1 bg-red-950/60 rounded-full border border-red-800/60">
              SELECT YOUR EXHIBIT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tighter">
              WHAT CAN WE <span className="text-red-600">JUDGE?</span>
            </h2>
            <p className="text-zinc-400 text-base max-w-xl">
              Choose your category. No aspect of your life is safe from the AI Jury.
            </p>
          </div>

          <Link
            href="/judge"
            className="inline-flex items-center gap-2 text-sm font-bold font-mono text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider group"
          >
            EXPLORE ALL DOCKETS <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
                className="group relative bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/90 hover:border-red-600/70 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 group-hover:border-red-500/50 flex items-center justify-center text-2xl transition-colors">
                      <span>{item.emoji}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-tight mb-2 group-hover:text-red-400 transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Teaser quote */}
                  <div className="bg-zinc-950/80 rounded-lg p-2.5 border border-zinc-800/80 mb-4">
                    <p className="text-[11px] font-mono text-zinc-300 italic truncate">
                      {item.sample}
                    </p>
                  </div>
                </div>

                {/* Footer Count */}
                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>JUDGED: {item.casesTried}</span>
                  <span className="text-red-500 font-bold group-hover:underline">SUBMIT →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
