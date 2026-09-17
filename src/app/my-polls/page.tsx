"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useSound } from "@/context/SoundContext";
import { PollCard, PollData } from "@/components/polls/PollCard";
import { Button } from "@/components/ui/Button";
import { Scale, User, Gavel, CheckCircle2, Lock, Plus } from "lucide-react";

export default function MyPollsPage() {
  const { user, isAuthenticated, triggerAuth } = useAuth();
  const { playPaperRustle } = useSound();

  const [polls, setPolls] = useState<PollData[]>([]);
  const [activeTab, setActiveTab] = useState<"created" | "voted">("created");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id) {
      fetchMyData();
    } else {
      setIsLoading(false);
    }
  }, [user?.id, activeTab]);

  const fetchMyData = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/polls?userId=${encodeURIComponent(user.id)}`);
      const data = await res.json();
      if (data.polls) {
        if (activeTab === "voted") {
          setPolls(data.polls.filter((p: PollData) => p.hasVoted));
        } else {
          setPolls(data.polls);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#1A0B08] text-[#F7F2E7] py-20 px-4 text-center bg-court-grid flex items-center justify-center courtroom-vignette">
        <div className="dossier-folder border-2 border-[#D4AF37] rounded-3xl p-8 max-w-md mx-auto space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-black uppercase text-[#2C261E]">THE DOCKET REQUIRES AUTHENTICATION</h2>
            <p className="text-xs font-typewriter text-[#5C5245] font-bold">
              Sign in with Google to view your created questions and verdict history.
            </p>
          </div>
          <Button onClick={() => triggerAuth()} variant="primary" size="lg" className="w-full justify-center btn-brass py-3.5">
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A0B08] text-[#F7F2E7] py-12 px-4 sm:px-6 lg:px-8 bg-court-grid courtroom-vignette">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#D4AF37]/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2A120D] border border-[#D4AF37] flex items-center justify-center text-[#F5D77F] font-bold font-typewriter shadow">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black uppercase text-[#F7F2E7] tracking-tight">
                {user.name}&apos;S PERSONAL DOCKET
              </h1>
              <p className="text-xs font-typewriter text-[#C4B69C] font-bold">
                🔒 Sworn Anonymous Juror • Identity protected under judicial privilege
              </p>
            </div>
          </div>

          <Link href="/people-decide/create" onClick={playPaperRustle}>
            <Button variant="primary" size="md" className="btn-brass">
              <Plus className="w-4 h-4 mr-1" /> FILE NEW DOCKET CASE
            </Button>
          </Link>
        </div>

        {/* Dashboard Filter Tabs */}
        <div className="flex gap-3 border-b border-[#3D1C15] pb-3">
          <button
            onClick={() => {
              setActiveTab("created");
              playPaperRustle();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
              activeTab === "created"
                ? "bg-gradient-to-r from-[#D4AF37] to-[#997A15] text-[#1A0B08] shadow-md border border-[#F5D77F]"
                : "bg-[#2A120D] text-[#C4B69C] hover:text-[#F5D77F]"
            }`}
          >
            📜 MY CREATED DOCKETS
          </button>
          <button
            onClick={() => {
              setActiveTab("voted");
              playPaperRustle();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
              activeTab === "voted"
                ? "bg-gradient-to-r from-[#D4AF37] to-[#997A15] text-[#1A0B08] shadow-md border border-[#F5D77F]"
                : "bg-[#2A120D] text-[#C4B69C] hover:text-[#F5D77F]"
            }`}
          >
            ⚖ MY CAST VERDICTS
          </button>
        </div>

        {/* List of Polls */}
        {isLoading ? (
          <div className="parchment-sheet rounded-2xl p-12 text-center text-[#5C5245] font-typewriter text-sm border border-[#E2D3B5]">
            RETRIEVING DOCKET ARCHIVE...
          </div>
        ) : polls.length > 0 ? (
          <div className="space-y-8">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        ) : (
          <div className="dossier-folder p-12 text-center space-y-3 rounded-2xl shadow-xl">
            <p className="text-sm font-typewriter font-bold text-[#2C261E]">
              {activeTab === "created"
                ? "You haven't filed any docket cases yet."
                : "You haven't cast any jury ballots yet."}
            </p>
            <Link href="/people-decide" onClick={playPaperRustle}>
              <Button variant="secondary" size="md" className="bg-[#2A120D] text-[#F7F2E7]">
                EXPLORE PUBLIC DOCKET →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
