"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/Button";
import { Gavel, Plus, Trash2, ArrowRight, ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";

const categories = [
  "Dating",
  "Relationships",
  "Career",
  "Life",
  "Hot Take",
  "Random",
  "Fashion",
  "College",
  "Money",
];

export function CreatePollForm() {
  const router = useRouter();
  const { user, isAuthenticated, triggerAuth } = useAuth();

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Dating");
  const [options, setOptions] = useState<string[]>(["YES", "NO"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      triggerAuth(() => handleSubmit(e));
      return;
    }

    if (!question.trim() || question.trim().length < 5) {
      setErrorMessage("Please enter a valid question (at least 5 characters).");
      return;
    }

    const cleanOptions = options.map((o) => o.trim()).filter((o) => o.length > 0);
    if (cleanOptions.length < 2) {
      setErrorMessage("Please provide at least 2 voting options.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          description: description.trim(),
          category,
          optionTexts: cleanOptions,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to put question on trial.");
        setIsSubmitting(false);
        return;
      }

      // Success! Navigate to main polls feed
      router.push("/people-decide");
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error creating poll.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900/80 border-2 border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-xl max-w-2xl mx-auto">
      <div className="border-b border-zinc-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
          <Gavel className="w-4 h-4 text-red-500" />
          <span>NEW TRIAL DOCKET</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
          PUT A QUESTION <span className="text-red-600">ON TRIAL</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
          Your identity will automatically remain 100% anonymous to the public.
        </p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-4 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs font-mono">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
            1. YOUR QUESTION *
          </label>
          <input
            type="text"
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Should I text my ex?"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500 rounded-xl px-4 py-3.5 text-base font-bold text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500 font-sans transition-all"
          />
        </div>

        {/* Options Inputs (2 to 4) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
              2. VOTING OPTIONS (2 TO 4)
            </label>
            {options.length < 4 && (
              <button
                type="button"
                onClick={handleAddOption}
                className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1 font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> ADD OPTION
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {options.map((optionText, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={optionText}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1} (e.g. ${idx === 0 ? "YES" : "NO"})`}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-zinc-500 focus:outline-none font-sans"
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(idx)}
                    className="p-3 text-zinc-500 hover:text-red-400 rounded-xl bg-zinc-950 border border-zinc-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your Take Optional Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
            3. YOUR TAKE (OPTIONAL)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell the people what YOU think... (e.g. I know it's probably a terrible idea, but I kinda want to)"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500 rounded-xl p-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none font-sans resize-none"
          />
        </div>

        {/* Category Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
            4. CATEGORY
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`text-xs font-bold font-mono px-3.5 py-2 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-950/40"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="xl"
            disabled={isSubmitting}
            className="w-full justify-center shadow-red-600/40"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" />
                SENDING TO THE PEOPLE...
              </span>
            ) : (
              "SEND IT TO THE PEOPLE →"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
