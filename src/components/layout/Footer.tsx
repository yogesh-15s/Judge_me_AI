"use client";

import React from "react";
import Link from "next/link";
import { Gavel, ShieldAlert, Sparkles, Scale, Heart, Globe, MessageSquare } from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 pt-16 pb-12 text-zinc-400 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Disclaimer */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <img
                src="/logo.png"
                alt="Judge Me AI Logo"
                className="w-9 h-9 rounded-lg object-cover border border-zinc-800/80 group-hover:scale-105 transition-transform"
              />
              <span className="font-marker text-xl tracking-wide text-white uppercase pt-0.5">
                JUDGE ME <span className="text-red-500 text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 border border-red-800 font-mono -mt-1">AI</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              The internet&apos;s ultimate AI-powered courtroom. Submit photos, bios, outfits, dating profiles, or questionable choices and get brutally honest, dramatic judgment.
            </p>

            {/* Disclaimer pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-900/50 text-red-300 text-xs font-mono">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>For entertainment &amp; emotional damage only. Proceed at your own risk.</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-zinc-200 uppercase font-bold">
              Courtroom Chambers
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/judge" className="hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">⚖</span> Judge Me
                </Link>
              </li>
              <li>
                <Link href="/friends" className="hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-red-500">👥</span> Judge a Friend
                </Link>
              </li>
              <li>
                <Link href="/roulette" className="hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-amber-400">🎲</span> Verdict Roulette
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-red-400 transition-colors flex items-center gap-2">
                  <span className="text-zinc-500">📜</span> How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Live Court Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-zinc-200 uppercase font-bold">
              System Diagnostics
            </h4>
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Court Status:</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Session
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">AI Jury Engine:</span>
                <span className="text-amber-400 font-bold">Unforgiving v2.4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Average Aura:</span>
                <span className="text-red-400 font-bold">-420 Aura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} JUDGE ME AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms of Judgment</span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Appeal Board</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
