"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PollCard, PollData } from "@/components/polls/PollCard";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useSound } from "@/context/SoundContext";
import { Scale, Plus, Flame, Sparkles, RefreshCw, Filter, FileText } from "lucide-react";

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
  const { playPaperRustle } = useSound();

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
    <div className="min-h-screen bg-[#1A0B08] text-[#F7F2E7] py-12 px-4 sm:px-6 lg:px-8 bg-court-grid courtroom-vignette">
      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#D4AF37]/50 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] text-xs font-typewriter font-bold tracking-widest uppercase shadow-md">
              <Scale className="w-4 h-4 text-[#D4AF37]" />
              <span>THE DOCKET • GRAND JURY CHAMBERS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F7F2E7] font-serif">
              THE PUBLIC <span className="text-[#D4AF37]">DOCKET.</span>
            </h1>
            <p className="text-[#C4B69C] text-base max-w-lg font-serif">
              Step into the Grand Jury Chambers. Review live community case files and cast your vote on the public record.
            </p>
          </div>

          <Link href="/people-decide/create" onClick={playPaperRustle}>
            <Button variant="primary" size="lg" className="shrink-0 btn-brass shadow-xl">
              <Plus className="w-5 h-5 mr-1.5" /> FILE NEW DOCKET CASE
            </Button>
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-typewriter text-[#C4B69C]">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>FILTER DOCKET RECORDS:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    playPaperRustle();
                  }}
                  className={`text-xs font-serif font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#997A15] border-[#F5D77F] text-[#1A0B08] shadow-md"
                      : "bg-[#2A120D] border-[#3D1C15] text-[#C4B69C] hover:border-[#D4AF37] hover:text-[#F5D77F]"
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
          <div className="parchment-sheet rounded-2xl p-12 text-center text-[#5C5245] font-typewriter text-sm flex items-center justify-center gap-2 border border-[#E2D3B5]">
            <RefreshCw className="w-5 h-5 animate-spin text-[#997A15]" />
            <span>OPENING DOCKET FILES FROM ARCHIVE...</span>
          </div>
        ) : polls.length > 0 ? (
          <div className="space-y-8">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        ) : (
          <div className="dossier-folder p-12 text-center space-y-4 rounded-2xl shadow-xl">
            <FileText className="w-10 h-10 text-[#7A6438] mx-auto" />
            <p className="text-base text-[#2C261E] font-serif font-bold">
              No questions found in this docket category yet.
            </p>
            <Link href="/people-decide/create" onClick={playPaperRustle}>
              <Button variant="primary" size="md" className="btn-brass">
                BE THE FIRST TO FILE A CASE →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
