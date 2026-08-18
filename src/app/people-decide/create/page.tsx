import React from "react";
import { CreatePollForm } from "@/components/polls/CreatePollForm";
import { Scale } from "lucide-react";

export default function CreatePollPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 bg-court-grid">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            ASK THE <span className="text-red-600">INTERNET.</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
            You have an opinion. Let&apos;s see if the internet agrees.
          </p>
        </div>

        <CreatePollForm />
      </div>
    </div>
  );
}
