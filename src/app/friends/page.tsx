"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useSound } from "@/context/SoundContext";
import { Users, ShieldAlert, Share2, Copy, Check, Sparkles, Gavel, UserCheck, Scroll, Stamp, Award } from "lucide-react";

export default function FriendsPage() {
  const { playPaperRustle, playGavelSlam } = useSound();

  const [friendName, setFriendName] = useState("");
  const [friendCrime, setFriendCrime] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateSubpoena = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName) return;
    playGavelSlam();
    const mockId = Math.random().toString(36).substring(2, 9);
    setGeneratedLink(`https://judgeme.ai/subpoena/${mockId}?target=${encodeURIComponent(friendName)}`);
  };

  const copyToClipboard = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    playPaperRustle();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1A0B08] text-[#F7F2E7] py-12 px-4 sm:px-6 lg:px-8 bg-court-grid courtroom-vignette">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] text-xs font-typewriter font-bold tracking-widest uppercase shadow-md">
            <Users className="w-4 h-4 text-[#D4AF37]" />
            <span>SUBPOENA OFFICE • COURTROOM CHAMBER 02</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F7F2E7] font-serif">
            ISSUE OFFICIAL <span className="text-[#D4AF37]">SUBPOENA</span>
          </h1>
          <p className="text-[#C4B69C] text-sm sm:text-base max-w-xl mx-auto font-serif">
            Summon your friends before the AI Bench. Issue an official writ of subpoena to compel their appearance in the Court of Public Opinion.
          </p>
        </div>

        {/* 3 Modes Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="parchment-sheet rounded-2xl p-6 space-y-3 border-2 border-[#E2D3B5] hover:border-[#D4AF37] transition-all shadow-md">
            <span className="text-3xl">📜</span>
            <h3 className="text-lg font-serif font-black uppercase text-[#2C261E]">Anonymous Subpoena</h3>
            <p className="text-xs font-typewriter text-[#5C5245] leading-relaxed">
              Generate a sworn legal writ link. When opened, the AI Bench executes your custom charge.
            </p>
          </div>
          <div className="parchment-sheet rounded-2xl p-6 space-y-3 border-2 border-[#E2D3B5] hover:border-[#D4AF37] transition-all shadow-md">
            <span className="text-3xl">🔥</span>
            <h3 className="text-lg font-serif font-black uppercase text-[#2C261E]">Group Chat Trial</h3>
            <p className="text-xs font-typewriter text-[#5C5245] leading-relaxed">
              Summon your entire group chat to discover who holds the lowest aura rating under court order.
            </p>
          </div>
          <div className="parchment-sheet rounded-2xl p-6 space-y-3 border-2 border-[#E2D3B5] hover:border-[#D4AF37] transition-all shadow-md">
            <span className="text-3xl">⚖</span>
            <h3 className="text-lg font-serif font-black uppercase text-[#2C261E]">Couples Tribunal</h3>
            <p className="text-xs font-typewriter text-[#5C5245] leading-relaxed">
              Submit chat logs or profiles to determine who carries the relationship.
            </p>
          </div>
        </div>

        {/* Official Court Summons Container */}
        <div className="relative">
          {/* Top Folder Header Tab */}
          <div className="flex items-center justify-between px-6 py-2.5 bg-[#E5D4AB] text-[#2C261E] rounded-t-2xl font-serif font-black text-sm tracking-wider uppercase border-b border-[#D8C497] w-fit shadow-md">
            <span>IN THE COURT OF PUBLIC OPINION — SUMMONS TO APPEAR</span>
          </div>

          <div className="dossier-folder p-6 sm:p-8 space-y-6 rounded-tr-2xl rounded-b-2xl shadow-2xl">
            <h2 className="text-2xl font-serif font-black uppercase text-[#2C261E] tracking-tight flex items-center gap-2.5 border-b border-[#D8C497] pb-4">
              <Scroll className="w-6 h-6 text-[#991B1B]" />
              SWORN WRIT OF SUBPOENA
            </h2>

            <form onSubmit={handleGenerateSubpoena} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-typewriter font-bold text-[#5C5245] uppercase tracking-wider block">
                  1. DEFENDANT / TARGET FRIEND&apos;S NAME OR HANDLE
                </label>
                <input
                  type="text"
                  required
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  placeholder="e.g. Alex (@alex_vibes)"
                  className="w-full bg-[#FDFBF7] border border-[#E2D3B5] rounded-xl px-4 py-3.5 text-sm font-typewriter text-[#2C261E] placeholder:text-[#8C7B64] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-typewriter font-bold text-[#5C5245] uppercase tracking-wider block">
                  2. SPECIFIC CHARGES / QUESTIONABLE BEHAVIOR
                </label>
                <textarea
                  rows={3}
                  value={friendCrime}
                  onChange={(e) => setFriendCrime(e.target.value)}
                  placeholder="e.g. Takes 45 minutes to order coffee, left everyone on read for 3 days, claims to be a crypto wizard..."
                  className="w-full ruled-paper p-4 text-sm font-typewriter text-[#2C261E] placeholder:text-[#8C7B64] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-xl border border-[#E2D3B5] resize-none"
                />
              </div>

              <div className="flex items-center gap-3 bg-[#E5D4AB]/60 p-3 rounded-xl border border-[#D8C497]">
                <input
                  type="checkbox"
                  id="anon"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded border-[#D8C497] bg-[#FDFBF7] text-[#991B1B] focus:ring-[#D4AF37] cursor-pointer"
                />
                <label htmlFor="anon" className="text-xs font-typewriter font-bold text-[#2C261E] cursor-pointer select-none">
                  KEEP SUBPOENA 100% ANONYMOUS (RECOMMENDED FOR SURVIVAL)
                </label>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full justify-center btn-brass py-4">
                SEAL & GENERATE SUBPOENA LINK 📜
              </Button>
            </form>

            {/* Generated Link Display with Gold Wax Seal */}
            {generatedLink && (
              <div className="parchment-sheet border-2 border-[#D4AF37] rounded-xl p-5 space-y-4 animate-paper-slide relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-typewriter text-[#991B1B] font-bold border-b border-[#E2D3B5] pb-3">
                  <span className="flex items-center gap-2">
                    {/* Faux Red/Gold Wax Seal Graphic */}
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#991B1B] to-[#7F1D1D] border-2 border-[#D4AF37] shadow-md flex items-center justify-center text-white text-[10px] font-black">
                      ⚖
                    </div>
                    OFFICIAL COURT WRIT SEALED
                  </span>
                  <span>STATUS: READY FOR SERVICE</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="w-full bg-[#F7F2E7] border border-[#E2D3B5] rounded-lg px-3.5 py-2.5 text-xs font-typewriter font-bold text-[#2C261E] focus:outline-none shadow-inner"
                  />
                  <Button onClick={copyToClipboard} variant="secondary" size="sm" className="shrink-0 bg-[#2A120D] text-[#F7F2E7]">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? "COPIED TO WRIT" : "COPY SUBPOENA"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
