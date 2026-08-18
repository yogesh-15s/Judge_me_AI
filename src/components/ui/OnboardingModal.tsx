"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "./Button";
import { Gavel, ArrowRight, Sparkles } from "lucide-react";

export function OnboardingModal() {
  const { showModal, saveUserName, userName, isLoaded } = useUser();
  const [nameInput, setNameInput] = useState(userName || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoaded || !showModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setIsSubmitting(true);
    await saveUserName(nameInput.trim());
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-300">
      {/* Background Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 blur-[100px] pointer-events-none rounded-full" />

      {/* Minimal Onboarding Card */}
      <div className="relative w-full max-w-md bg-zinc-900 border-2 border-red-600/70 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center overflow-hidden">
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
          <Gavel className="w-3.5 h-3.5 text-red-500" />
          <span>WELCOME TO THE DOCK ⚖</span>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            WHAT SHOULD WE <span className="text-red-600">CALL YOU?</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">
            Enter your name or alias so the court knows who it is judging.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
              YOUR NAME / ALIAS
            </label>
            <input
              type="text"
              required
              autoFocus
              maxLength={30}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-red-500 rounded-xl px-4 py-3.5 text-base font-bold text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500 font-sans transition-all"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!nameInput.trim() || isSubmitting}
            className="w-full justify-center text-sm py-4 shadow-red-600/40"
          >
            LET&apos;S GO <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <p className="text-[10px] font-mono text-zinc-500">
          🔒 No email, password, or account needed. Just a quick intro.
        </p>
      </div>
    </div>
  );
}
