"use client";

import React, { useState, useEffect } from "react";
import { PollCard, PollData } from "./PollCard";
import { Button } from "../ui/Button";
import { Flame, RefreshCw, ArrowRight } from "lucide-react";

export function RandomPollWidget() {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/polls?sort=trending");
      const data = await res.json();
      if (data.polls && data.polls.length > 0) {
        setPolls(data.polls);
        setCurrentIndex(Math.floor(Math.random() * data.polls.length));
      }
    } catch (e) {
      console.error("Failed to fetch random polls", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (polls.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % polls.length);
  };

  const currentPoll = polls[currentIndex];

  return (
    <section className="py-24 bg-zinc-950 relative border-t border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-800/80 text-amber-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>PUBLIC OPINION ROULETTE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            WHAT DOES THE <span className="text-amber-500">INTERNET THINK?</span>
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto">
            Cast your anonymous verdict on live community questions and see how your opinion compares.
          </p>
        </div>

        {/* Card Display */}
        {isLoading ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center text-zinc-500 font-mono text-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
            <span>FETCHING QUESTION ON TRIAL...</span>
          </div>
        ) : currentPoll ? (
          <div className="space-y-6">
            <PollCard key={currentPoll.id} poll={currentPoll} />

            <div className="flex items-center justify-center">
              <Button onClick={handleNextQuestion} variant="gold" size="lg">
                NEXT QUESTION <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
