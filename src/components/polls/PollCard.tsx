"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { VerdictStamp } from "../ui/VerdictStamp";
import { Scale, CheckCircle2, ShieldCheck, Share2, Flame, AlertCircle } from "lucide-react";

export interface PollOptionItem {
  id: string;
  text: string;
  votesCount: number;
}

export interface PollData {
  id: string;
  question: string;
  description?: string;
  category: string;
  options: PollOptionItem[];
  totalVotes: number;
  courtAnalysis?: {
    summary: string;
    verdict: string;
  };
  anonymousStatus?: string;
  hasVoted?: boolean;
  userSelectedOptionId?: string | null;
}

interface PollCardProps {
  poll: PollData;
  onVoteSuccess?: (updatedPoll: PollData) => void;
}

export function PollCard({ poll: initialPoll, onVoteSuccess }: PollCardProps) {
  const { isAuthenticated, user, triggerAuth } = useAuth();
  const [poll, setPoll] = useState<PollData>(initialPoll);
  const [hasVoted, setHasVoted] = useState<boolean>(Boolean(initialPoll.hasVoted));
  const [userSelectedOptionId, setUserSelectedOptionId] = useState<string | null>(
    initialPoll.userSelectedOptionId || null
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [justVotedAnimation, setJustVotedAnimation] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVoteSubmit = async (optionId: string) => {
    // If unauthenticated, trigger Google Auth Modal with callback
    if (!isAuthenticated || !user) {
      triggerAuth(() => handleVoteSubmit(optionId));
      return;
    }

    if (hasVoted || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/polls/${poll.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedOptionId: optionId,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.alreadyVoted && data.poll) {
          setHasVoted(true);
          setPoll(data.poll);
        }
        setErrorMessage(data.error || "Failed to submit verdict.");
        setIsSubmitting(false);
        return;
      }

      // Success!
      setJustVotedAnimation(true);
      setHasVoted(true);
      setUserSelectedOptionId(optionId);
      setPoll(data.poll);
      if (onVoteSuccess) onVoteSuccess(data.poll);

      setTimeout(() => setJustVotedAnimation(false), 2500);
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error casting vote.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-zinc-900/80 border-2 border-zinc-800 hover:border-red-600/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl transition-all duration-300 group overflow-hidden">
      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase">
            ⚖ THE PEOPLE DECIDE
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-xs font-mono text-amber-400 font-bold">{poll.category}</span>
        </div>

        <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
          ANONYMOUS QUESTION
        </span>
      </div>

      {/* Main Question & Description */}
      <div className="space-y-3">
        <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight">
          {poll.question}
        </h3>

        {poll.description && (
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
              CREATOR&apos;S TAKE:
            </span>
            <p className="text-sm text-zinc-300 italic font-medium leading-relaxed">
              &ldquo;{poll.description}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Error / Warning Alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs font-mono">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Voting UI State / Results UI State */}
      {!hasVoted ? (
        /* Pre-Vote State: Big Clickable Options */
        <div className="space-y-3 pt-1">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            CAST YOUR ANONYMOUS VERDICT:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {poll.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleVoteSubmit(option.id)}
                disabled={isSubmitting}
                className="w-full flex items-center justify-between bg-zinc-950 hover:bg-red-950/40 border-2 border-zinc-800 hover:border-red-500 text-white font-extrabold text-base p-4 rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] group/opt"
              >
                <span className="uppercase">{option.text}</span>
                <span className="text-xs font-mono text-red-500 opacity-0 group-hover/opt:opacity-100 transition-opacity">
                  VOTE →
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Post-Vote State: Animated Results & Percentages */
        <div className="space-y-5 pt-1 animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-red-500 font-bold uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {justVotedAnimation ? "VOTE CAST ✓ — THE PEOPLE HAVE SPOKEN" : "YOU ALREADY CAST YOUR VERDICT."}
            </span>
            <span className="text-zinc-500">{poll.totalVotes} ANONYMOUS JURY VOTES</span>
          </div>

          {/* Option Results Bars */}
          <div className="space-y-3">
            {poll.options.map((option) => {
              const isSelected = userSelectedOptionId === option.id;
              const percentage =
                poll.totalVotes > 0 ? Math.round((option.votesCount / poll.totalVotes) * 100) : 0;

              return (
                <div
                  key={option.id}
                  className={`bg-zinc-950 rounded-xl p-4 border relative overflow-hidden transition-all ${
                    isSelected ? "border-red-500 shadow-md shadow-red-950/30" : "border-zinc-800"
                  }`}
                >
                  {/* Progress Fill Bar */}
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                      isSelected
                        ? "bg-gradient-to-r from-red-950/90 to-red-600/40 border-r-2 border-red-500"
                        : "bg-zinc-800/40"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-white uppercase">
                        {option.text}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono bg-red-600 text-white px-2 py-0.5 rounded font-bold">
                          YOUR VERDICT
                        </span>
                      )}
                    </div>

                    <div className="font-mono text-right">
                      <span className="text-base sm:text-lg font-black text-white">{percentage}%</span>
                      <span className="text-[11px] text-zinc-500 ml-1.5">({option.votesCount})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Judge Me Connection: AI Court Analysis */}
          {poll.courtAnalysis && (
            <div className="bg-red-950/30 border-2 border-dashed border-red-900/80 rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-red-500" />
                  ⚖ COURT ANALYSIS
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-200 font-medium">
                {poll.courtAnalysis.summary}
              </p>

              <div className="pt-2 border-t border-red-900/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400 uppercase">FINAL VERDICT:</span>
                <VerdictStamp
                  text={poll.courtAnalysis.verdict}
                  variant="guilty"
                  rotate="-rotate-2"
                  size="sm"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Total Jury Count */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
        <span>{poll.totalVotes.toLocaleString()} Anonymous Jury Members</span>
        <span className="text-zinc-400">Courtroom 03</span>
      </div>
    </div>
  );
}
