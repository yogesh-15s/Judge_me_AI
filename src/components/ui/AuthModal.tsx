"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./Button";
import { Scale, Lock, ShieldCheck, X } from "lucide-react";

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!showAuthModal) return null;

  const handleGoogleAuth = async () => {
    setIsSigningIn(true);
    // Simulate brief Google OAuth handshake delay
    setTimeout(async () => {
      await signInWithGoogle();
      setIsSigningIn(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 blur-[100px] pointer-events-none rounded-full" />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-zinc-900 border-2 border-red-600/70 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-950/80 border border-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Court Icon */}
        <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-800 text-red-500 flex items-center justify-center mx-auto shadow-lg shadow-red-950/50">
          <Scale className="w-6 h-6" />
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            THE COURT REQUIRES YOUR <span className="text-red-600">VERDICT</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-sm mx-auto leading-relaxed">
            Sign in to cast your vote. Your identity will be 100% hidden from the public.
          </p>
        </div>

        {/* Continue with Google Action */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleGoogleAuth}
            disabled={isSigningIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-zinc-950 font-black text-sm px-6 py-4 rounded-xl shadow-xl transition-all duration-200 active:scale-[0.98] border border-zinc-300 disabled:opacity-70"
          >
            {/* Google Logo SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isSigningIn ? "VERIFYING CREDENTIALS..." : "Continue with Google"}</span>
          </button>
        </div>

        {/* Privacy Lock Note */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-400">
          <Lock className="w-3 h-3 text-red-500" />
          <span>Voter anonymity guaranteed • One vote per juror</span>
        </div>
      </div>
    </div>
  );
}
