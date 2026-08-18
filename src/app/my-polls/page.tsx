"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { PollCard, PollData } from "@/components/polls/PollCard";
import { Button } from "@/components/ui/Button";
import { Scale, User, Gavel, CheckCircle2, Lock, Plus } from "lucide-react";

export default function MyPollsPage() {
  const { user, isAuthenticated, triggerAuth } = useAuth();
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
          // For MVP, show active user's created/voted feed
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
      <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4 text-center bg-court-grid flex items-center justify-center">
        <div className="bg-zinc-900 border-2 border-red-600/70 rounded-3xl p-8 max-w-md mx-auto space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 text-red-500 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase text-white">THE DOCK REQUIRES LOGIN</h2>
            <p className="text-xs text-zinc-400">
              Sign in with Google to view your created questions and verdict history.
            </p>
          </div>
          <Button onClick={() => triggerAuth()} variant="primary" size="lg" className="w-full justify-center">
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 bg-court-grid">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 font-bold font-mono">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                {user.name}&apos;S DOCKET
              </h1>
              <p className="text-xs font-mono text-zinc-400">
                🔒 Anonymous Juror • Identity hidden from public view
              </p>
            </div>
          </div>

          <Link href="/people-decide/create">
            <Button variant="primary" size="md">
              <Plus className="w-4 h-4 mr-1" /> NEW QUESTION
            </Button>
          </Link>
        </div>

        {/* Dashboard Filter Tabs */}
        <div className="flex gap-3 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab("created")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === "created"
                ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            📜 MY CREATED QUESTIONS
          </button>
          <button
            onClick={() => setActiveTab("voted")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === "voted"
                ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            ⚖ MY CAST VERDICTS
          </button>
        </div>

        {/* List of Polls */}
        {isLoading ? (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-500 font-mono text-sm">
            LOADING YOUR DOCKET HISTORY...
          </div>
        ) : polls.length > 0 ? (
          <div className="space-y-8">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-12 text-center space-y-3">
            <p className="text-sm font-mono text-zinc-400">
              {activeTab === "created"
                ? "You haven't put any questions on trial yet."
                : "You haven't cast any jury verdicts yet."}
            </p>
            <Link href="/people-decide">
              <Button variant="secondary" size="md">
                EXPLORE PUBLIC QUESTIONS →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
