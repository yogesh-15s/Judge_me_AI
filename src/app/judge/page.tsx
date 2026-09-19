"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import { Button } from "@/components/ui/Button";
import { VerdictDocument } from "@/components/ui/VerdictStamp";
import { LoadingCopy } from "@/components/ui/LoadingCopy";
import { useUser } from "@/context/UserContext";
import {
  PERSONA_CONFIGS,
  PersonaType,
  JudgeResponse,
} from "@/lib/judgePersonas";
import {
  Gavel,
  Upload,
  X,
  Camera,
  MessageSquare,
  Shirt,
  Music,
  Heart,
  FileCode,
  Smartphone,
  Brain,
  FileText,
  Scale,
  ImageIcon,
  AlertTriangle,
} from "lucide-react";

// ─── Category definitions ─────────────────────────────────────────────────────
const categories = [
  { id: "profile", name: "Profile Exhibit", icon: Camera, emoji: "📸" },
  { id: "bio", name: "Affidavit / Bio", icon: MessageSquare, emoji: "💬" },
  { id: "outfit", name: "Outfit Evidence", icon: Shirt, emoji: "👕" },
  { id: "music", name: "Audio Record", icon: Music, emoji: "🎵" },
  { id: "dating", name: "Dating Docket", icon: Heart, emoji: "💘" },
  { id: "resume", name: "Career Dossier", icon: FileCode, emoji: "🧑‍💻" },
  { id: "phone", name: "Device Log", icon: Smartphone, emoji: "📱" },
  { id: "choices", name: "Life Choices", icon: Brain, emoji: "🧠" },
];

// ─── Uploaded image state ─────────────────────────────────────────────────────
interface UploadedImage {
  id: string;
  name: string;
  mimeType: string;
  base64Data: string;
  previewUrl: string;
}

// ─── Persona Selector card ────────────────────────────────────────────────────
function PersonaCard({
  persona,
  isActive,
  onClick,
}: {
  persona: (typeof PERSONA_CONFIGS)[PersonaType];
  isActive: boolean;
  onClick: () => void;
}) {
  const borderColor =
    persona.id === "normal"
      ? isActive
        ? "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        : "border-[#E2D3B5]"
      : persona.id === "sigma"
      ? isActive
        ? "border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.35)]"
        : "border-[#E2D3B5]"
      : isActive
      ? "border-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.35)]"
      : "border-[#E2D3B5]";

  const activeBg =
    persona.id === "normal"
      ? "bg-[#2A120D]"
      : persona.id === "sigma"
      ? "bg-[#0F172A]"
      : "bg-[#2A120D]";

  const accentText =
    persona.id === "normal"
      ? "text-[#F5D77F]"
      : persona.id === "sigma"
      ? "text-[#93C5FD]"
      : "text-[#FCA5A5]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer group overflow-hidden ${borderColor} ${
        isActive ? activeBg : "bg-[#FDFBF7] hover:border-[#D4AF37]"
      }`}
    >
      {/* Active glow strip */}
      {isActive && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5 opacity-80"
          style={{ background: persona.accentColor }}
        />
      )}

      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5 select-none">
          {persona.badge}
        </span>
        <div className="flex-1 min-w-0">
          <div
            className={`font-serif font-extrabold text-sm mb-0.5 ${
              isActive ? accentText : "text-[#2C261E]"
            }`}
          >
            {persona.title}
          </div>
          <div
            className={`text-xs font-typewriter leading-snug ${
              isActive ? "text-[#C4B69C]" : "text-[#5C5245]"
            }`}
          >
            {persona.subtitle}
          </div>
        </div>
        {isActive && (
          <div
            className="w-2 h-2 rounded-full mt-1.5 shrink-0 animate-pulse"
            style={{ background: persona.accentColor }}
          />
        )}
      </div>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function JudgePage() {
  const { userName } = useUser();
  const fileInputId = useId();

  // Form state
  const [selectedCategory, setSelectedCategory] = useState("profile");
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>("normal");
  const [inputText, setInputText] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Processing & result state
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verdictResult, setVerdictResult] = useState<JudgeResponse | null>(null);
  const [submittedTranscript, setSubmittedTranscript] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [docketNumber, setDocketNumber] = useState("7842");

  useEffect(() => {
    setDocketNumber(String(Math.floor(1000 + Math.random() * 9000)));
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Image helpers (client-side resize to prevent massive payload timeouts) ───
  const resizeImage = (file: File): Promise<{ base64Data: string; previewUrl: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 1200;
          let { width, height } = img;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          const base64Data = compressedDataUrl.split(",")[1];
          resolve({ base64Data, previewUrl: compressedDataUrl });
        };
        img.onerror = () => {
          resolve({ base64Data: rawUrl.split(",")[1], previewUrl: rawUrl });
        };
        img.src = rawUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const allowed = ["image/png", "image/jpeg", "image/webp"];
      const fileArr = Array.from(files).filter((f) =>
        allowed.includes(f.type)
      );
      if (!fileArr.length) return;

      const newImages: UploadedImage[] = await Promise.all(
        fileArr.map(async (file) => {
          const { base64Data, previewUrl } = await resizeImage(file);
          return {
            id: `${Date.now()}-${Math.random()}`,
            name: file.name,
            mimeType: "image/jpeg",
            base64Data,
            previewUrl,
          };
        })
      );

      setUploadedImages((prev) => [...prev, ...newImages].slice(0, 4)); // cap at 4
    },
    []
  );

  const removeImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Drag-and-drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  // ── Submit handler ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const hasText = inputText.trim().length > 0;
    const hasImages = uploadedImages.length > 0;

    if (!hasText && !hasImages) {
      setError(
        "The court requires at least one piece of evidence — upload a photo or type something."
      );
      return;
    }

    setIsProcessing(true);
    setVerdictResult(null);
    setSubmittedTranscript(hasText ? inputText.trim() : "");
    const generatedCase = `CASE #${Math.floor(1000 + Math.random() * 9000)}`;
    setCaseNo(generatedCase);

    try {
      const response = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona: selectedPersona,
          contextText: hasText ? inputText.trim() : undefined,
          images: hasImages
            ? uploadedImages.map(({ mimeType, base64Data }) => ({
                mimeType,
                base64Data,
              }))
            : undefined,
          category: selectedCategory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "The AI bench is temporarily unavailable.");
      }

      setVerdictResult(data.verdict as JudgeResponse);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error occurred.";
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setVerdictResult(null);
    setInputText("");
    setUploadedImages([]);
    setSubmittedTranscript("");
    setError(null);
  };

  const activePersona = PERSONA_CONFIGS[selectedPersona];

  return (
    <div className="min-h-screen bg-[#1A0B08] text-[#F7F2E7] py-12 px-4 sm:px-6 lg:px-8 bg-court-grid courtroom-vignette">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">

        {/* ── Page Header ────────────────────────────────────────────────────── */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A120D] border border-[#D4AF37] text-[#F5D77F] text-xs font-typewriter font-bold tracking-widest uppercase shadow-md">
            <Gavel className="w-4 h-4 text-[#D4AF37]" />
            <span>EXHIBIT SUBMISSION WORKBENCH • CHAMBER 01</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F7F2E7] font-serif">
            SUBMIT YOUR{" "}
            <span className="text-[#D4AF37] underline decoration-[#997A15]">
              EXHIBIT A
            </span>
          </h1>
          <p className="text-[#C4B69C] text-sm sm:text-base max-w-xl mx-auto font-serif">
            {userName ? (
              <span>
                Stand before the Bench,{" "}
                <strong className="text-[#F5D77F] underline">{userName}</strong>
                . Present your evidence for AI trial.
              </span>
            ) : (
              <span>
                Select an exhibit category, attach your evidence, choose your
                judge, and face the AI Bench.
              </span>
            )}
          </p>
        </div>

        {/* ── Dossier Folder ──────────────────────────────────────────────────── */}
        <div className="relative">
          {/* Folder Tab */}
          <div className="flex items-center justify-between px-6 py-2.5 bg-[#E5D4AB] text-[#2C261E] rounded-t-2xl font-serif font-extrabold text-sm sm:text-base tracking-wider uppercase border-b border-[#D8C497] w-fit shadow-md">
            <span className="flex items-center gap-2" suppressHydrationWarning>
              <FileText className="w-4 h-4 text-[#7A6438]" />
              EXHIBIT DOSSIER — DOCKET #{docketNumber}
            </span>
          </div>

          {/* Dossier Body */}
          <div className="dossier-folder p-6 sm:p-8 space-y-8 rounded-tr-2xl rounded-b-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* ── Step 1: Category ───────────────────────────────────────── */}
              <div className="space-y-3">
                <label className="text-xs font-typewriter font-bold text-[#5C5245] uppercase tracking-wider block">
                  1. SELECT EXHIBIT CLASSIFICATION
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                        }}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-serif font-bold transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#2A120D] border-[#D4AF37] text-[#F5D77F] shadow-lg"
                            : "bg-[#FDFBF7] border-[#E2D3B5] text-[#2C261E] hover:border-[#D4AF37] hover:bg-[#FAF4E8]"
                        }`}
                      >
                        <span className="text-base">{cat.emoji}</span>
                        <span className="truncate">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Step 2: Evidence Upload ────────────────────────────────── */}
              <div className="space-y-3">
                <label className="text-xs font-typewriter font-bold text-[#5C5245] uppercase tracking-wider block">
                  2. ATTACH PHYSICAL OR TYPED EVIDENCE
                </label>

                {/* Drop zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`parchment-sheet border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 group cursor-pointer ${
                    isDragging
                      ? "border-[#D4AF37] bg-[#FAF4E8] scale-[1.01]"
                      : "border-[#D4AF37] hover:border-[#997A15]"
                  }`}
                >
                  <input
                    id={fileInputId}
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="sr-only"
                    onChange={(e) =>
                      e.target.files && processFiles(e.target.files)
                    }
                  />
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    <Upload
                      className={`w-8 h-8 transition-transform ${
                        isDragging
                          ? "scale-125 text-[#D4AF37]"
                          : "text-[#997A15] group-hover:scale-110"
                      }`}
                    />
                    <p className="text-sm font-serif font-bold text-[#2C261E]">
                      {isDragging
                        ? "Drop to submit as exhibit…"
                        : "Drag & drop or click to attach evidence"}
                    </p>
                    <p className="text-xs font-typewriter text-[#5C5245]">
                      PNG, JPG, WEBP — up to 4 files
                    </p>
                  </div>
                </div>

                {/* Image previews */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {uploadedImages.map((img) => (
                      <div
                        key={img.id}
                        className="relative rounded-xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-md group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.previewUrl}
                          alt={img.name}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-[#1A0B08]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(img.id);
                            }}
                            className="p-1.5 rounded-full bg-[#991B1B] text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-[#1A0B08]/80 px-2 py-0.5">
                          <p className="text-[9px] font-typewriter text-[#F5D77F] truncate">
                            <ImageIcon className="w-2.5 h-2.5 inline mr-0.5" />
                            {img.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Text input */}
                <div className="space-y-1">
                  <span className="text-[10px] font-typewriter text-[#5C5245] uppercase tracking-widest block">
                    TYPE TRANSCRIPT ON RULED LEGAL PAD:
                  </span>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or paste your bio, dating prompt, text message, or questionable life decision here…"
                    rows={4}
                    className="w-full ruled-paper p-4 text-sm font-typewriter text-[#2C261E] placeholder:text-[#7A6A54] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-xl border border-[#E2D3B5] resize-none shadow-inner"
                  />
                </div>
              </div>

              {/* ── Step 3: Persona Selector ───────────────────────────────── */}
              <div className="space-y-3">
                <label className="text-xs font-typewriter font-bold text-[#5C5245] uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-[#997A15]" />
                  3. SELECT YOUR JUDICIAL PANEL
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(["normal", "sigma", "brutal"] as PersonaType[]).map((pid) => (
                    <PersonaCard
                      key={pid}
                      persona={PERSONA_CONFIGS[pid]}
                      isActive={selectedPersona === pid}
                      onClick={() => {
                        setSelectedPersona(pid);
                      }}
                    />
                  ))}
                </div>

                {/* Active persona mini descriptor */}
                <div className="rounded-lg bg-[#2A120D] border border-[#D4AF37]/30 px-4 py-2 flex items-center gap-2">
                  <span className="text-base">{activePersona.badge}</span>
                  <p className="text-xs font-typewriter text-[#C4B69C]">
                    <span className="text-[#F5D77F] font-bold">
                      {activePersona.title}:
                    </span>{" "}
                    {activePersona.subtitle}
                  </p>
                </div>
              </div>

              {/* ── Error Banner ───────────────────────────────────────────── */}
              {error && (
                <div className="flex items-start gap-2.5 rounded-xl bg-[#991B1B]/10 border border-[#991B1B]/40 px-4 py-3">
                  <AlertTriangle className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                  <p className="text-sm font-typewriter text-[#991B1B] font-bold">
                    {error}
                  </p>
                </div>
              )}

              {/* ── Submit Button ──────────────────────────────────────────── */}
              <Button
                type="submit"
                variant="primary"
                size="xl"
                disabled={isProcessing}
                className="w-full justify-center btn-brass py-4 text-lg"
              >
                {isProcessing ? (
                  <LoadingCopy className="text-[#1A0B08] text-sm font-typewriter" />
                ) : (
                  "⚖ SUBMIT EXHIBIT TO BENCH FOR JUDGMENT"
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* ── Verdict Document ───────────────────────────────────────────────── */}
        {verdictResult && (
          <VerdictDocument
            result={verdictResult}
            caseNo={caseNo}
            personaTitle={activePersona.title}
            personaBadge={activePersona.badge}
            submittedTranscript={submittedTranscript}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
