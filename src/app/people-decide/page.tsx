"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PollCard, PollData } from "@/components/polls/PollCard";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Scale, Plus, Flame, Sparkles, RefreshCw, Filter } from "lucide-react";

const categories = [
  "Trending",
  "Newest",
  "Dating",
  "Relationships",
  "Career",
  "Life",
  "Hot Take",
  "Random",
  "College",
  "Money",
];

export default function PeopleDecidePage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("Trending");
  const [polls, setPolls] = useState<PollData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPolls();
  }, [selectedCategory, user?.id]);

  const fetchPolls = async () => {
    setIsLoading(true);
    try {
      let sort = "trending";
      let cat = selectedCategory;

      if (selectedCategory === "Newest") {
        sort = "newest";
        cat = "All";
      } else if (selectedCategory === "Trending") {
        sort = "trending";
        cat = "All";
      }

      const userIdQuery = user?.id ? `&userId=${encodeURIComponent(user.id)}` : "";
      const res = await fetch(`/api/polls?category=${encodeURIComponent(cat)}&sort=${sort}${userIdQuery}`);
      const data = await res.json();
      if (data.polls) {
        setPolls(data.polls);
      }
    } catch (e) {
      console.error("Failed to fetch polls", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 bg-court-grid">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
              <Scale className="w-4 h-4 text-red-500" />
              <span>THE PEOPLE DECIDE • PUBLIC COURT</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
              ASK THE <span className="text-red-600">INTERNET.</span>
            </h1>
            <p className="text-zinc-400 text-base max-w-lg">
              You have an opinion. Let&apos;s see if the internet agrees. Anonymous jury voting in real-time.
            </p>
          </div>

          <Link href="/people-decide/create">
            <Button variant="primary" size="lg" className="shrink-0 shadow-red-600/40">
              <Plus className="w-5 h-5 mr-1.5" /> PUT QUESTION ON TRIAL
            </Button>
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Filter className="w-3.5 h-3.5 text-red-500" />
            <span>FILTER DOCKETS:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-mono font-bold px-4 py-2 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-900/40"
                      : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feed of Poll Cards */}
        {isLoading ? (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-500 font-mono text-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-red-500" />
            <span>LOADING COURTROOM DOCKETS...</span>
          </div>
        ) : polls.length > 0 ? (
          <div className="space-y-8">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-12 text-center space-y-4">
            <p className="text-base text-zinc-400 font-medium">
              No questions found in this docket category yet.
            </p>
            <Link href="/people-decide/create">
              <Button variant="primary" size="md">
                BE THE FIRST TO ASK THE INTERNET →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
