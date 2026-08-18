"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Users, ShieldAlert, Share2, Copy, Check, Sparkles, Gavel, UserCheck } from "lucide-react";

export default function FriendsPage() {
  const [friendName, setFriendName] = useState("");
  const [friendCrime, setFriendCrime] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateSubpoena = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName) return;
    const mockId = Math.random().toString(36).substring(2, 9);
    setGeneratedLink(`https://judgeme.ai/subpoena/${mockId}?target=${encodeURIComponent(friendName)}`);
  };

  const copyToClipboard = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 bg-court-grid">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Users className="w-4 h-4 text-red-500" />
            <span>COURTROOM CHAMBER 02</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            SUBPOENA A <span className="text-red-600">FRIEND</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Expose your friends to the court of public opinion. Send an anonymous subpoena or force them to face the AI Jury.
          </p>
        </div>

        {/* 3 Modes Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:border-red-600/60 transition-colors">
            <span className="text-2xl">📜</span>
            <h3 className="text-lg font-extrabold uppercase text-white">Anonymous Subpoena</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Send them a custom link. When they open it, the AI Jury delivers your pre-configured roast.
            </p>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/60 transition-colors">
            <span className="text-2xl">🔥</span>
            <h3 className="text-lg font-extrabold uppercase text-white">Group Roast</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Submit your entire friend group chat and discover who holds the lowest aura rating.
            </p>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:border-red-600/60 transition-colors">
            <span className="text-2xl">💘</span>
            <h3 className="text-lg font-extrabold uppercase text-white">Couples Court</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Submit both dating profiles or chat logs to determine who is carrying the relationship.
            </p>
          </div>
        </div>

        {/* Subpoena Generator Form */}
        <div className="bg-zinc-900/80 border-2 border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <h2 className="text-xl font-black uppercase text-white tracking-tight flex items-center gap-2">
            <Gavel className="w-5 h-5 text-red-500" />
            ISSUE OFFICIAL SUBPOENA
          </h2>

          <form onSubmit={handleGenerateSubpoena} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                Target Friend&apos;s Name / Handle
              </label>
              <input
                type="text"
                required
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="e.g. Alex (@alex_vibes)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                Friend&apos;s Specific Crime / Questionable Trait
              </label>
              <textarea
                rows={3}
                value={friendCrime}
                onChange={(e) => setFriendCrime(e.target.value)}
                placeholder="e.g. Takes 45 minutes to order coffee, left everyone on read for 3 days, claims to be a crypto wizard..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 font-sans resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anon"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="anon" className="text-xs font-mono text-zinc-300 cursor-pointer">
                Keep subpoena 100% anonymous (Recommended for survival)
              </label>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
              GENERATING SUBPOENA LINK 📜
            </Button>
          </form>

          {/* Generated Link Display */}
          {generatedLink && (
            <div className="bg-zinc-950 border border-red-800/80 rounded-xl p-4 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs font-mono text-red-400">
                <span>SUBPOENA CREATED SUCCESSFULLY</span>
                <span>STATUS: READY TO SERVE</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-300 focus:outline-none"
                />
                <Button onClick={copyToClipboard} variant="secondary" size="sm" className="shrink-0">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "COPIED" : "COPY"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
