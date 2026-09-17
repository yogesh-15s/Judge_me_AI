"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Gavel,
  HelpCircle,
  Users,
  ArrowRight,
  User,
  Scale,
  LogIn,
  LogOut,
  Flame,
} from "lucide-react";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { SoundToggle } from "../ui/SoundToggle";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

import { useSound } from "@/context/SoundContext";

const navLinks = [
  { name: "The Bench", href: "/judge", icon: Gavel },
  { name: "The Docket", href: "/people-decide", icon: Scale },
  { name: "Issue Subpoena", href: "/friends", icon: Users },
  { name: "Jury Wheel", href: "/roulette", icon: Flame },
  { name: "Court Rules", href: "/how-it-works", icon: HelpCircle },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { userName, openOnboarding } = useUser();
  const { user: authUser, triggerAuth, logout } = useAuth();
  const { themeConfig } = useTheme();

  const { playPaperRustle } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#2A120D]/95 backdrop-blur-md border-b-2 border-[#D4AF37]/60 shadow-2xl shadow-black/80 py-3"
          : "bg-[#2A120D]/80 backdrop-blur-sm border-b-2 border-[#D4AF37]/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          onClick={playPaperRustle}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#997A15] p-0.5 border border-[#F5D77F] shadow-md shadow-black/70 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#1A0B08] rounded-[10px] flex items-center justify-center">
              <span className="text-xl">⚖</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl tracking-wider text-[#F7F2E7] uppercase flex items-center gap-2 pt-0.5 font-bold">
              JUDGE ME AI{" "}
              <span className="text-[10px] px-2 py-0.5 rounded border border-[#D4AF37] font-typewriter font-bold bg-[#1A0B08] text-[#F5D77F] -mt-0.5">
                COURT BENCH
              </span>
            </span>
            <span className="text-[9px] font-typewriter tracking-widest text-[#C4B69C] uppercase">
              Supreme Court of Public Opinion
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1.5 bg-[#1A0B08]/90 p-1.5 rounded-full border border-[#D4AF37]/50 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={playPaperRustle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-serif font-bold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#997A15] text-[#1A0B08] shadow-md shadow-[#D4AF37]/20 border border-[#F5D77F]"
                    : "text-[#EDE2CE] hover:text-[#F5D77F] hover:bg-[#3D1C15]/60"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isActive ? "text-[#1A0B08]" : "text-[#D4AF37]"}`}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Desktop Actions, Themes, Sound, User Badges */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Sound Toggle */}
          <SoundToggle />

          {/* Theme Preset Switcher */}
          <ThemeToggle />

          {authUser ? (
            <div className="flex items-center gap-2">
              <Link
                href="/my-polls"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 hover:border-amber-500/50 text-xs font-mono transition-colors"
                title="My Courtroom Docket"
              >
                <Scale className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold max-w-[90px] truncate">{authUser.name}</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-900/50 text-xs font-mono transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5 text-zinc-500" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => triggerAuth()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-mono transition-colors cursor-pointer"
            >
              <LogIn
                className="w-3.5 h-3.5"
                style={{ color: themeConfig.accent }}
              />
              <span>Jury Sign In</span>
            </button>
          )}

          {userName && (
            <button
              onClick={openOnboarding}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-mono transition-colors"
              title="Click to change your name"
            >
              <User
                className="w-3.5 h-3.5"
                style={{ color: themeConfig.accent }}
              />
              <span className="font-bold max-w-[90px] truncate">{userName}</span>
            </button>
          )}

          <Button
            href="/judge"
            variant="primary"
            size="md"
            style={{ backgroundColor: themeConfig.accent }}
          >
            GET JUDGED <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center gap-2">
          <SoundToggle />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" style={{ color: themeConfig.accent }} />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-zinc-950/98 border-b border-zinc-800 p-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
                    isActive
                      ? "text-white shadow-lg"
                      : "bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800 border border-zinc-800/80"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: themeConfig.accent,
                          boxShadow: `0 0 15px ${themeConfig.accentMuted}`,
                        }
                      : {}
                  }
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-white" : ""}`}
                    style={!isActive ? { color: themeConfig.accent } : {}}
                  />
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Auth and Guest Status */}
            <div className="pt-2 flex flex-col gap-2">
              {authUser ? (
                <div className="flex gap-2">
                  <Link
                    href="/my-polls"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-semibold font-mono"
                  >
                    <Scale className="w-4 h-4 text-amber-500" />
                    <span className="truncate">{authUser.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-red-400 text-xs font-mono cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-zinc-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    triggerAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono cursor-pointer"
                >
                  <LogIn
                    className="w-4 h-4"
                    style={{ color: themeConfig.accent }}
                  />
                  <span>Jury Sign In</span>
                </button>
              )}

              {userName && (
                <button
                  onClick={() => {
                    openOnboarding();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono cursor-pointer"
                >
                  <User
                    className="w-4 h-4"
                    style={{ color: themeConfig.accent }}
                  />
                  <span className="truncate">Alias: {userName}</span>
                </button>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-800/80">
              <Button
                href="/judge"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                style={{ backgroundColor: themeConfig.accent }}
                onClick={() => setMobileMenuOpen(false)}
              >
                GET JUDGED <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
