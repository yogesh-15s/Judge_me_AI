import React from "react";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SampleVerdicts } from "@/components/home/SampleVerdicts";
import { RandomPollWidget } from "@/components/polls/RandomPollWidget";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Hero />
      <HowItWorks />
      <CategoryGrid />
      <SampleVerdicts />
      <RandomPollWidget />
      <CTASection />
    </main>
  );
}

