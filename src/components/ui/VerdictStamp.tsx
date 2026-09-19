"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { JudgeResponse, VerdictType } from "@/lib/judgePersonas";

// ─── Existing stamp props (backwards-compatible) ──────────────────────────────
interface VerdictStampProps {
  text: string;
  variant?: "guilty" | "gold" | "innocent" | "warning" | "crimson" | "navy";
  rotate?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

export function VerdictStamp({
  text,
  variant = "guilty",
  rotate = "-rotate-12",
  size = "md",
  animate = false,
  className,
}: VerdictStampProps) {

  const variantStyles = {
    guilty:
      "text-[#991B1B] border-[#991B1B] bg-[#991B1B]/10 shadow-[0_0_15px_rgba(153,27,27,0.25)] border-dashed",
    crimson:
      "text-[#991B1B] border-[#991B1B] bg-[#991B1B]/15 shadow-[0_0_20px_rgba(153,27,27,0.3)] border-dashed",
    navy:
      "text-[#1E3A8A] border-[#1E3A8A] bg-[#1E3A8A]/15 shadow-[0_0_20px_rgba(30,58,138,0.3)] border-dashed",
    gold:
      "text-[#997A15] border-[#997A15] bg-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.3)] border-double",
    innocent:
      "text-[#164330] border-[#164330] bg-[#164330]/20 shadow-[0_0_15px_rgba(22,67,48,0.3)] border-solid",
    warning:
      "text-[#B45309] border-[#B45309] bg-[#F59E0B]/20 shadow-[0_0_15px_rgba(180,83,9,0.3)] border-dashed",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1 border-2 font-stamp tracking-widest rounded",
    md: "text-sm md:text-base px-4 py-2 border-[3px] font-stamp tracking-widest rounded-md",
    lg: "text-lg md:text-2xl px-6 py-2.5 border-4 font-stamp tracking-widest rounded-lg",
  };

  return (
    <div
      className={twMerge(
        clsx(
          "inline-flex items-center uppercase font-stamp select-none transition-transform duration-300 opacity-90 backdrop-blur-[1px] mix-blend-multiply",
          variantStyles[variant],
          sizeStyles[size],
          rotate,
          animate ? "animate-stamp-overshoot" : "",
          className
        )
      )}
    >
      <span className="mr-1.5 opacity-80 text-base">⚖</span> {text}
    </div>
  );
}

// ─── Map AI verdicts → stamp variants ────────────────────────────────────────
function verdictToVariant(
  verdict: VerdictType
): "guilty" | "gold" | "innocent" | "warning" | "crimson" | "navy" {
  switch (verdict) {
    case "GUILTY":
      return "crimson";
    case "ACQUITTED":
      return "innocent";
    case "SENTENCED TO TOUCH GRASS":
      return "warning";
    case "PROBATION":
      return "navy";
    default:
      return "guilty";
  }
}

// ─── Full Verdict Document Component ─────────────────────────────────────────
interface VerdictDocumentProps {
  result: JudgeResponse;
  caseNo: string;
  personaTitle: string;
  personaBadge: string;
  submittedTranscript?: string;
  onReset: () => void;
}

export function VerdictDocument({
  result,
  caseNo,
  personaTitle,
  personaBadge,
  submittedTranscript,
  onReset,
}: VerdictDocumentProps) {
  const stampVariant = verdictToVariant(result.verdict);
  const isPositiveAura = result.aura_delta >= 0;

  return (
    <div className="parchment-sheet p-6 sm:p-8 space-y-6 rounded-2xl shadow-2xl animate-paper-slide relative overflow-hidden">
      {/* ── Watermark ──────────────────────────────────────────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none text-9xl">
        ⚖
      </div>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-[#D4AF37]/50 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-typewriter text-xs font-bold text-[#991B1B] uppercase">
              {caseNo}
            </span>
            <span className="text-xs text-[#5C5245] font-typewriter">
              • SWORN COURT JUDGMENT
            </span>
            <span className="text-xs font-typewriter bg-[#2A120D] text-[#F5D77F] px-2 py-0.5 rounded-full border border-[#D4AF37]/50">
              {personaBadge} {personaTitle}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-black text-[#2C261E] uppercase mt-1">
            OFFICIAL DECREE OF THE AI BENCH
          </h3>
          {/* Charge */}
          <p className="text-sm font-typewriter text-[#5C5245] mt-1 italic">
            Charge: &ldquo;{result.charge}&rdquo;
          </p>
        </div>

        {/* Animated Verdict Stamp */}
        <VerdictStamp
          text={result.verdict}
          variant={stampVariant}
          size="md"
          animate={true}
        />
      </div>

      {/* ── Ruled Legal Pad Transcript on Record ───────────────────────────── */}
      {submittedTranscript && (
        <div className="ruled-paper p-4 rounded-xl border border-[#E2D3B5] shadow-inner space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-typewriter font-bold text-[#7A6A54] uppercase tracking-wider">
              TRANSCRIPT FROM RULED LEGAL PAD (ENTERED INTO EVIDENCE):
            </span>
            <span className="text-[9px] font-typewriter text-[#997A15] bg-[#F5D77F]/30 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              EXHIBIT ON FILE
            </span>
          </div>
          <p className="font-typewriter text-xs sm:text-sm text-[#2C261E] italic leading-relaxed whitespace-pre-wrap pt-0.5">
            &ldquo;{submittedTranscript}&rdquo;
          </p>
        </div>
      )}

      {/* ── Closing Argument ───────────────────────────────────────────────── */}
      <div className="bg-[#F7F2E7] rounded-xl p-5 border border-[#E2D3B5] shadow-inner">
        <p className="text-base sm:text-lg text-[#2C261E] font-serif font-bold italic leading-relaxed">
          &ldquo;{result.closing_argument}&rdquo;
        </p>
      </div>

      {/* ── Bureaucratic Tally Ledger ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 font-typewriter text-xs">
        <div className="bg-[#EDE2CE] p-4 rounded-xl border border-[#D8C497] shadow-sm">
          <span className="text-[#5C5245] font-bold block mb-1">
            AURA ADJUSTMENT TALLY:
          </span>
          <p
            className={`text-xl font-black ${
              isPositiveAura ? "text-[#164330]" : "text-[#991B1B]"
            }`}
          >
            {isPositiveAura ? "+" : ""}
            {result.aura_delta} PTS
          </p>
        </div>
        <div className="bg-[#EDE2CE] p-4 rounded-xl border border-[#D8C497] shadow-sm">
          <span className="text-[#5C5245] font-bold block mb-1">
            DELUSION LEDGER INDEX:
          </span>
          <p
            className={`text-xl font-black ${
              result.delusion_index > 70
                ? "text-[#991B1B]"
                : result.delusion_index > 40
                ? "text-[#997A15]"
                : "text-[#164330]"
            }`}
          >
            {result.delusion_index}%
          </p>
        </div>
      </div>

      {/* ── Delusion Bar ───────────────────────────────────────────────────── */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-typewriter text-[#5C5245]">
          <span>DELUSION LEVEL</span>
          <span>{result.delusion_index}/100</span>
        </div>
        <div className="h-2 bg-[#E2D3B5] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${result.delusion_index}%`,
              background:
                result.delusion_index > 70
                  ? "linear-gradient(90deg, #D4AF37, #991B1B)"
                  : result.delusion_index > 40
                  ? "linear-gradient(90deg, #D4AF37, #B45309)"
                  : "linear-gradient(90deg, #D4AF37, #164330)",
            }}
          />
        </div>
      </div>

      {/* ── Recommendation ─────────────────────────────────────────────────── */}
      <div className="bg-[#2A120D] rounded-xl p-4 border border-[#D4AF37]/40">
        <p className="text-xs font-typewriter text-[#D4AF37] font-bold uppercase tracking-widest mb-1">
          JUDICIAL SENTENCE / RECOMMENDATION:
        </p>
        <p className="text-sm font-serif text-[#F5D77F] font-semibold">
          {result.recommendation}
        </p>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-[#E2D3B5] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-typewriter text-[#5C5245]">
          ⚖ Verdict signed &amp; entered into public record. No appeals permitted.
        </span>
        <button
          onClick={onReset}
          className="btn-brass px-5 py-2 text-xs rounded-lg font-serif font-black uppercase tracking-wide"
        >
          TRY ANOTHER CASE FILE
        </button>
      </div>
    </div>
  );
}
