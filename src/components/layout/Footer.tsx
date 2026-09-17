"use client";

import React from "react";
import Link from "next/link";
import { useSound } from "@/context/SoundContext";
import { Gavel, ShieldAlert, Sparkles, Scale, Heart, Globe, MessageSquare } from "lucide-react";

export function Footer() {
  const { playPaperRustle } = useSound();

  return (
    <footer className="bg-[#1A0B08] border-t-2 border-[#D4AF37]/50 pt-16 pb-12 text-[#C4B69C] relative overflow-hidden bg-court-grid">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#D4AF37]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Disclaimer */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" onClick={playPaperRustle} className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#997A15] p-0.5 border border-[#F5D77F] shadow-md shadow-black/70 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#1A0B08] rounded-[10px] flex items-center justify-center">
                  <span className="text-xl">⚖</span>
                </div>
              </div>
              <span className="font-serif text-xl tracking-wider text-[#F7F2E7] uppercase font-bold pt-0.5">
                JUDGE ME AI <span className="text-[10px] px-2 py-0.5 rounded border border-[#D4AF37] font-typewriter font-bold bg-[#1A0B08] text-[#F5D77F] -mt-0.5">HIGH BENCH</span>
              </span>
            </Link>

            <p className="text-sm font-serif text-[#C4B69C] leading-relaxed max-w-md">
              The supreme AI-powered courtroom of the internet. Submit exhibits, affidavits, outfits, dating profiles, or questionable choices for rapid, binding judicial decrees.
            </p>

            {/* Disclaimer pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#2A120D] border border-[#D4AF37]/60 text-[#F5D77F] text-xs font-typewriter">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>For entertainment &amp; judicial satire only. Proceed at your own risk.</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-typewriter tracking-widest text-[#F5D77F] uppercase font-bold border-b border-[#3D1C15] pb-2">
              Courtroom Chambers
            </h4>
            <ul className="space-y-2 text-sm font-serif font-bold">
              <li>
                <Link href="/judge" onClick={playPaperRustle} className="hover:text-[#F5D77F] transition-colors flex items-center gap-2">
                  <span className="text-[#D4AF37]">⚖</span> The Bench
                </Link>
              </li>
              <li>
                <Link href="/people-decide" onClick={playPaperRustle} className="hover:text-[#F5D77F] transition-colors flex items-center gap-2">
                  <span className="text-[#D4AF37]">📜</span> The Docket
                </Link>
              </li>
              <li>
                <Link href="/friends" onClick={playPaperRustle} className="hover:text-[#F5D77F] transition-colors flex items-center gap-2">
                  <span className="text-[#D4AF37]">👥</span> Issue Subpoena
                </Link>
              </li>
              <li>
                <Link href="/roulette" onClick={playPaperRustle} className="hover:text-[#F5D77F] transition-colors flex items-center gap-2">
                  <span className="text-[#F5D77F]">🎲</span> Jury Wheel
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" onClick={playPaperRustle} className="hover:text-[#F5D77F] transition-colors flex items-center gap-2">
                  <span className="text-[#C4B69C]">📜</span> Judicial Rules
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Live Court Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-typewriter tracking-widest text-[#F5D77F] uppercase font-bold border-b border-[#3D1C15] pb-2">
              Courtroom System Diagnostics
            </h4>
            <div className="bg-[#2A120D] border border-[#D4AF37]/50 rounded-xl p-4 space-y-3 font-typewriter text-xs shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[#C4B69C]">Courtroom Status:</span>
                <span className="flex items-center gap-1.5 text-[#F5D77F] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#F5D77F] animate-ping" />
                  Bench In Session
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#C4B69C]">AI Jury Engine:</span>
                <span className="text-[#F5D77F] font-bold">Unforgiving Bench v3.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#C4B69C]">Average Aura Tally:</span>
                <span className="text-[#991B1B] font-bold">-420 Aura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#3D1C15] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-typewriter text-[#8C7B64]">
          <p>© {new Date().getFullYear()} JUDGE ME AI. All judicial decrees signed &amp; binding.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#F5D77F] transition-colors cursor-pointer">Privacy Privilege</span>
            <span>•</span>
            <span className="hover:text-[#F5D77F] transition-colors cursor-pointer">Judicial Code</span>
            <span>•</span>
            <span className="hover:text-[#F5D77F] transition-colors cursor-pointer">Supreme Appeal Board</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
