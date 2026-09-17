"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSound } from "@/context/SoundContext";
import { VerdictStamp } from "../ui/VerdictStamp";
import { Scale, CheckCircle2, ShieldCheck, Share2, Flame, AlertCircle, Paperclip } from "lucide-react";

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

function formatTallyMarks(pct: number): string {
  if (pct <= 0) return "|";
  const count = Math.min(Math.round(pct / 5), 20);
  const fullGroups = Math.floor(count / 5);
  const remainder = count % 5;
  const fullStr = "卌 ".repeat(fullGroups);
  const remStr = "|".repeat(remainder);
  return (fullStr + remStr).trim() || "|";
}

export function PollCard({ poll: initialPoll, onVoteSuccess }: PollCardProps) {
  const { isAuthenticated, user, triggerAuth } = useAuth();
  const { playGavelSlam, playPaperRustle } = useSound();

  const [poll, setPoll] = useState<PollData>(initialPoll);
  const [hasVoted, setHasVoted] = useState<boolean>(Boolean(initialPoll.hasVoted));
  const [userSelectedOptionId, setUserSelectedOptionId] = useState<string | null>(
    initialPoll.userSelectedOptionId || null
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [justVotedAnimation, setJustVotedAnimation] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVoteSubmit = async (optionId: string) => {
    if (!isAuthenticated || !user) {
      triggerAuth(() => handleVoteSubmit(optionId));
      return;
    }

    if (hasVoted || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    playGavelSlam();

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
    <div className="relative dossier-folder p-6 sm:p-8 space-y-6 shadow-2xl rounded-2xl overflow-hidden group">
      {/* Decorative Brass Grommet & Paper Clip */}
      <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
        <Paperclip className="w-5 h-5 text-[#997A15] -rotate-45" />
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#F5D77F] to-[#997A15] border border-[#1A0B08] shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1A0B08]" />
        </div>
      </div>

      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-[#D8C497] pb-4 pr-12">
        <div className="flex items-center gap-2 font-typewriter text-xs font-bold text-[#5C5245]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#991B1B] animate-pulse" />
          <span className="tracking-widest uppercase">⚖ DOCKET ENTRY #{poll.id.substring(0, 6)}</span>
          <span className="text-[#997A15]">•</span>
          <span className="text-[#997A15] uppercase">{poll.category}</span>
        </div>

        <span className="text-[10px] font-typewriter tracking-wider px-2.5 py-1 rounded bg-[#E5D4AB] border border-[#C8B587] text-[#2C261E] font-bold">
          GRAND JURY CASE
        </span>
      </div>

      {/* Main Question & Description */}
      <div className="space-y-3">
        <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase text-[#2C261E] tracking-tight leading-tight">
          {poll.question}
        </h3>

        {poll.description && (
          <div className="ruled-paper p-4 rounded-xl border border-[#E2D3B5]">
            <span className="text-[10px] font-typewriter text-[#5C5245] uppercase tracking-widest block mb-1">
              PLAINTIFF TESTIMONY / CREATOR STATEMENT:
            </span>
            <p className="text-sm font-typewriter text-[#2C261E] italic font-medium leading-relaxed">
              &ldquo;{poll.description}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-[#991B1B]/15 border border-[#991B1B] rounded-xl text-[#991B1B] text-xs font-typewriter font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Voting UI State */}
      {!hasVoted ? (
        <div className="space-y-3 pt-1">
          <p className="text-xs font-typewriter font-bold text-[#5C5245] uppercase tracking-wider">
            CAST YOUR ANONYMOUS BALLOT:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {poll.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleVoteSubmit(option.id)}
                disabled={isSubmitting}
                className="w-full flex items-center justify-between bg-[#FDFBF7] hover:bg-[#2A120D] text-[#2C261E] hover:text-[#F5D77F] border-2 border-[#E2D3B5] hover:border-[#D4AF37] font-serif font-extrabold text-base p-4 rounded-xl shadow-md transition-all duration-150 active:translate-y-0.5 cursor-pointer group/opt"
              >
                <span className="uppercase">{option.text}</span>
                <span className="text-xs font-typewriter text-[#997A15] group-hover/opt:text-[#F5D77F] opacity-0 group-hover/opt:opacity-100 transition-opacity">
                  VOTE ⚖ →
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Post-Vote State: Green Judicial Felt Tally Slots & Handwritten Tally Marks */
        <div className="space-y-5 pt-1 animate-paper-slide">
          <div className="flex items-center justify-between text-xs font-typewriter">
            <span className="text-[#164330] font-bold uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#164330]" />
              {justVotedAnimation ? "VERDICT CAST ✓ — THE JURY HAS SPOKEN" : "BALLOT ENTERED INTO COURT RECORD"}
            </span>
            <span className="text-[#5C5245] font-bold">{poll.totalVotes} JURY BALLOTS CAST</span>
          </div>

          {/* Option Results Bars */}
          <div className="space-y-3">
            {poll.options.map((option) => {
              const isSelected = userSelectedOptionId === option.id;
              const percentage =
                poll.totalVotes > 0 ? Math.round((option.votesCount / poll.totalVotes) * 100) : 0;
              const tallyMarks = formatTallyMarks(percentage);

              return (
                <div
                  key={option.id}
                  className={`bg-judicial-felt rounded-xl p-4 border relative overflow-hidden transition-all shadow-inner ${
                    isSelected ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/50" : "border-[#164330]"
                  }`}
                >
                  {/* Progress Fill Bar - Banker's Desk Felt Counter */}
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                      isSelected
                        ? "bg-gradient-to-r from-[#164330] to-[#266348] border-r-2 border-[#D4AF37]"
                        : "bg-[#0b2016]/80"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-extrabold text-sm sm:text-base text-[#F7F2E7] uppercase tracking-wide">
                        {option.text}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-typewriter bg-[#D4AF37] text-[#1A0B08] px-2 py-0.5 rounded font-bold">
                          YOUR VERDICT
                        </span>
                      )}
                    </div>

                    <div className="font-typewriter text-right flex items-center gap-3">
                      <span className="text-xs text-[#F5D77F] tracking-widest font-bold hidden sm:inline" title="Handwritten Tally Marks">
                        {tallyMarks}
                      </span>
                      <div>
                        <span className="text-base sm:text-lg font-black text-[#F7F2E7]">{percentage}%</span>
                        <span className="text-[11px] text-[#C4B69C] ml-1.5">({option.votesCount})</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Court Analysis Document */}
          {poll.courtAnalysis && (
            <div className="parchment-sheet rounded-xl p-5 space-y-3 relative overflow-hidden border-2 border-[#D4AF37]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-typewriter font-bold tracking-widest text-[#991B1B] uppercase flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-[#991B1B]" />
                  ⚖ COURT DECREE & JUDICIAL ANALYSIS
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#2C261E] font-serif font-medium leading-relaxed">
                {poll.courtAnalysis.summary}
              </p>

              <div className="pt-2 border-t border-[#E2D3B5] flex items-center justify-between">
                <span className="text-[11px] font-typewriter text-[#5C5245] uppercase font-bold">COURT RULING:</span>
                <VerdictStamp
                  text={poll.courtAnalysis.verdict}
                  variant="crimson"
                  rotate="-rotate-2"
                  size="sm"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Total Jury Count */}
      <div className="pt-4 border-t border-[#D8C497] flex items-center justify-between text-xs font-typewriter text-[#5C5245]">
        <span>{poll.totalVotes.toLocaleString()} Registered Jury Ballots</span>
        <span className="font-bold">Supreme Court Docket Room</span>
      </div>
    </div>
  );
}
