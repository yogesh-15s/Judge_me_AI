"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { VerdictStamp } from "@/components/ui/VerdictStamp";
import { useUser } from "@/context/UserContext";
import {
  Gavel,
  Upload,
  Sparkles,
  Flame,
  AlertTriangle,
  Camera,
  MessageSquare,
  Shirt,
  Music,
  Heart,
  FileCode,
  Smartphone,
  Brain,
  CheckCircle2,
  RefreshCw,
  Share2,
} from "lucide-react";

const categories = [
  { id: "profile", name: "Profile", icon: Camera, emoji: "📸" },
  { id: "bio", name: "Bio", icon: MessageSquare, emoji: "💬" },
  { id: "outfit", name: "Outfit", icon: Shirt, emoji: "👕" },
  { id: "music", name: "Music", icon: Music, emoji: "🎵" },
  { id: "dating", name: "Dating", icon: Heart, emoji: "💘" },
  { id: "resume", name: "Resume", icon: FileCode, emoji: "🧑‍💻" },
  { id: "phone", name: "Phone", icon: Smartphone, emoji: "📱" },
  { id: "choices", name: "Life Choices", icon: Brain, emoji: "🧠" },
];

const harshnessLevels = [
  { id: "merciful", name: "Merciful 😇", desc: "Gentle roast with constructive feedback" },
  { id: "honest", name: "Brutally Honest ⚖", desc: "No filter, direct courtroom truth" },
  { id: "destroy", name: "Destroy My Spirit 🔥", desc: "Maximum emotional damage" },
];

export default function JudgePage() {
  const { userName } = useUser();
  const [selectedCategory, setSelectedCategory] = useState("profile");
  const [harshness, setHarshness] = useState("honest");
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [verdictResult, setVerdictResult] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setVerdictResult(null);

    // Simulate AI Jury processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setVerdictResult({
        caseNo: `CASE #${Math.floor(1000 + Math.random() * 9000)}`,
        category: selectedCategory.toUpperCase(),
        title: harshness === "destroy" ? "BEYOND SAVING" : harshness === "merciful" ? "CERTIFIED NPC" : "WALKING RED FLAG",
        stampVariant: harshness === "destroy" ? "guilty" : "warning",
        auraScore: harshness === "destroy" ? -1420 : -420,
        delusion: harshness === "destroy" ? 99 : 82,
        cringeScore: 89,
        roast:
          inputText.trim().length > 0
            ? `${userName ? `Subject ${userName}: ` : ""}The court has analyzed your submission: "${inputText.trim()}". After deliberation, the AI Jury concludes that this exhibit represents an unprecedented breach of public decorum.`
            : `${userName ? `Subject ${userName}: ` : ""}The court reviewed your uploaded exhibit. The evidence against your aesthetic choices is overwhelming and undisputed by all 12 AI jurors.`,
        judgeNote: "Verdict is final. No appeals permitted in Courtroom 01.",
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 bg-court-grid">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Gavel className="w-4 h-4 text-red-500" />
            <span>COURTROOM CHAMBER 01</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            SUBMIT YOUR <span className="text-red-600">CASE</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            {userName ? (
              <span>Alright, <strong className="text-white underline decoration-red-600">{userName}</strong>. Let&apos;s see what the court thinks.</span>
            ) : (
              <span>Choose a category, upload your evidence, select your harshness level, and let the AI Jury sentence you.</span>
            )}
          </p>
        </div>

        {/* Workbench Card */}
        <div className="bg-zinc-900/80 border-2 border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {/* 1. Category Tabs */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
              1. SELECT CATEGORY
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-bold transition-all text-left ${
                      isSelected
                        ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-900/40"
                        : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Evidence Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                2. UPLOAD OR TYPE EVIDENCE
              </label>

              {/* Upload Dropzone Visual */}
              <div className="border-2 border-dashed border-zinc-800 hover:border-red-600/70 rounded-xl p-6 text-center bg-zinc-950/60 transition-colors group cursor-pointer">
                <Upload className="w-8 h-8 text-zinc-500 group-hover:text-red-500 mx-auto mb-2 transition-colors" />
                <p className="text-sm font-bold text-zinc-200">
                  Drop screenshot, photo, or outfit image here
                </p>
                <p className="text-xs text-zinc-500 mt-1">PNG, JPG, WEBP up to 10MB (Mock Upload)</p>
              </div>

              {/* Text Input */}
              <div className="space-y-1">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Or type/paste your bio, text message, dating prompt, or questionable life decision here..."
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-sans resize-none"
                />
              </div>
            </div>

            {/* 3. Harshness Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                3. SELECT HARSHNESS LEVEL
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {harshnessLevels.map((lvl) => {
                  const isSelected = harshness === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setHarshness(lvl.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-red-950/60 border-red-600 text-white shadow-lg shadow-red-950/40"
                          : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      <div className="font-bold text-sm text-white mb-0.5">{lvl.name}</div>
                      <div className="text-xs text-zinc-400">{lvl.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="xl"
              disabled={isProcessing}
              className="w-full justify-center shadow-red-600/40"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  DELIBERATING JURY &amp; SCANNING AURA...
                </span>
              ) : (
                "⚖ SUBMIT TO COURT FOR JUDGMENT"
              )}
            </Button>
          </form>
        </div>

        {/* Verdict Output Preview Drawer */}
        {verdictResult && (
          <div className="bg-zinc-900 border-2 border-red-600/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-red-500">{verdictResult.caseNo}</span>
                <span className="text-xs text-zinc-400 font-mono">• OFFICIAL VERDICT</span>
              </div>
              <VerdictStamp text={verdictResult.title} variant={verdictResult.stampVariant} size="sm" />
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800">
                <p className="text-base text-zinc-200 font-medium leading-relaxed">
                  &ldquo;{verdictResult.roast}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  <span className="text-zinc-400">AURA CHANGE:</span>
                  <p className="text-lg font-black text-red-500">{verdictResult.auraScore} PTS</p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  <span className="text-zinc-400">DELUSION INDEX:</span>
                  <p className="text-lg font-black text-amber-400">{verdictResult.delusion}%</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">⚖ {verdictResult.judgeNote}</span>
              <Button onClick={() => setVerdictResult(null)} variant="secondary" size="sm">
                TRY ANOTHER CASE
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
