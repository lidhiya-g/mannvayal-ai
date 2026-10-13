"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import ThemeLanguageControls from "./ThemeLanguageControls";
import { Sprout, Menu, X, LayoutDashboard, Sparkles, UserCheck, Shield } from "lucide-react";

export default function Navbar() {
  const { user, t, logout, language } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/features", label: t.nav.features || "Product" },
    { href: "/how-it-works", label: t.nav.howItWorks || "Solutions" },
    { href: "/#explore-india", label: t.nav.exploreIndia || "Explore India" },
    { href: "/methodology", label: t.nav.climateIntelligence || "Climate Intelligence" },
    { href: "/about", label: t.nav.about || "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-[#080D0A]/90 border-b border-gray-200/80 dark:border-emerald-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-gray-100 font-sans">
                MannVayal
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                AI
              </span>
            </div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 -mt-0.5 hidden sm:inline">
              {language === "ta" ? "மண்வயல் • காலநிலை-வேளாண் வழிகாட்டி" : "Pan-India Climate-to-Crop Decision Engine"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Controls & Auth */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeLanguageControls />

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                {t.nav.dashboard}
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-emerald-950/40"
              >
                {t.nav.signOut}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40 transition-colors"
              >
                {t.nav.signIn}
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-900/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                {t.nav.register}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeLanguageControls />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#080D0A] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#111A14]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-gray-100 dark:border-emerald-950 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white"
                >
                  {t.nav.dashboard}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  {t.nav.signOut}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-emerald-900 text-gray-800 dark:text-gray-200"
                >
                  {t.nav.signIn}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
