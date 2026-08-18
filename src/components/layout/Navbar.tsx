"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Gavel, Sparkles, Flame, HelpCircle, Users, ArrowRight, User, Scale, LogIn } from "lucide-react";
import { Button } from "../ui/Button";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Judge Me", href: "/judge", icon: Gavel },
  { name: "The People Decide", href: "/people-decide", icon: Scale },
  { name: "Judge a Friend", href: "/friends", icon: Users },
  { name: "Roulette", href: "/roulette", icon: Flame },
  { name: "How It Works", href: "/how-it-works", icon: HelpCircle },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { userName, openOnboarding } = useUser();
  const { user: authUser, triggerAuth } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/50 py-3"
          : "bg-transparent border-b border-zinc-800/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <img
            src="/logo.png"
            alt="Judge Me AI Logo"
            className="w-10 h-10 rounded-xl object-cover border border-zinc-800/80 group-hover:scale-105 transition-transform duration-200 shadow-md shadow-black/50"
          />
          <div className="flex flex-col">
            <span className="font-marker text-lg sm:text-xl tracking-wide text-white uppercase flex items-center gap-1.5 pt-1">
              JUDGE ME <span className="text-red-500 text-[10px] px-1.5 py-0.5 rounded bg-red-950/60 border border-red-800/60 font-mono font-semibold -mt-1">AI</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
              Court of Public Opinion
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-900/40"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-zinc-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Desktop Actions & User Badges */}
        <div className="hidden md:flex items-center gap-2.5">
          {authUser ? (
            <Link
              href="/my-polls"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 hover:border-amber-500/50 text-xs font-mono transition-colors"
              title="My Courtroom Docket"
            >
              <Scale className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-bold max-w-[90px] truncate">{authUser.name}</span>
            </Link>
          ) : (
            <button
              onClick={() => triggerAuth()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-mono transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-red-500" />
              <span>Jury Sign In</span>
            </button>
          )}

          {userName && (
            <button
              onClick={openOnboarding}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-red-600/50 text-xs font-mono transition-colors"
              title="Click to change your name"
            >
              <User className="w-3.5 h-3.5 text-red-500" />
              <span className="font-bold max-w-[90px] truncate">{userName}</span>
            </button>
          )}

          <Button href="/judge" variant="primary" size="md">
            GET JUDGED <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
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
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                      : "bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800 border border-zinc-800/80"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-red-400"}`} />
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-zinc-800/80">
              <Button href="/judge" variant="primary" size="lg" className="w-full justify-center">
                GET JUDGED <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
