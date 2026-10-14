"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import ThemeLanguageControls from "./ThemeLanguageControls";
import {
  Sprout, Menu, X, LayoutDashboard, Sparkles,
  ChevronDown, User, LogOut, UserCircle2
} from "lucide-react";

export default function Navbar() {
  const { user, t, logout, language } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/features", label: t.nav.features },
    { href: "/how-it-works", label: t.nav.howItWorks },
    { href: "/#explore-india", label: t.nav.exploreIndia },
    { href: "/methodology", label: t.nav.climateIntelligence },
    { href: "/about", label: t.nav.about },
  ];

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  const subtitleText = t.tagline || "Smarter Farms. Stronger Villages.";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/92 dark:bg-[#080D0A]/92 border-b border-gray-200/80 dark:border-emerald-950/60 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 group-hover:shadow-emerald-600/30 transition-all duration-200">
            <Sprout className="w-[18px] h-[18px] text-emerald-100" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-gray-100">MannVayal</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">AI</span>
            </div>
            <span className="text-[9px] text-gray-500 dark:text-gray-400 hidden sm:block -mt-0.5 font-medium tracking-wide truncate max-w-[180px]">
              {subtitleText}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-animated pb-0.5 transition-colors duration-200 ${
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold active"
                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeLanguageControls />
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-900/20 hover:-translate-y-0.5 transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                {t.nav.dashboard}
              </Link>
              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  id="profile-menu-btn"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full avatar-gradient flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                    {getInitials(user.fullName)}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                </button>
                {profileOpen && (
                  <div role="menu" aria-labelledby="profile-menu-btn" className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#111A14] rounded-2xl border border-gray-200 dark:border-emerald-950 shadow-xl py-2 animate-slide-down z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-emerald-950">
                      <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{user.fullName}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
                      <span className="mt-1 inline-flex px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">{user.role}</span>
                    </div>
                    <div className="py-1">
                      <Link href="/dashboard/profile" role="menuitem" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 transition-colors">
                        <User className="w-4 h-4 text-gray-400" /> My Profile
                      </Link>
                      <Link href="/dashboard" role="menuitem" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 transition-colors">
                        <LayoutDashboard className="w-4 h-4 text-gray-400" /> {t.nav.dashboard}
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-gray-100 dark:border-emerald-950">
                      <button onClick={() => { setProfileOpen(false); logout(); }} role="menuitem" className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                        <LogOut className="w-4 h-4" /> {t.nav.signOut}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40 transition-colors">
                {t.nav.signIn}
              </Link>
              <Link href="/register" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:-translate-y-0.5 transition-all">
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                {t.nav.register}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeLanguageControls />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40 transition-colors">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-b border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#080D0A] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold" : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#111A14]"}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-gray-100 dark:border-emerald-950 flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20">
                  <div className="w-8 h-8 rounded-full avatar-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">{getInitials(user.fullName)}</div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">{user.fullName}</div>
                    <div className="text-[10px] text-gray-500 truncate">{user.role}</div>
                  </div>
                </div>
                <Link href="/dashboard/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-emerald-900 text-gray-700 dark:text-gray-200">
                  <UserCircle2 className="w-4 h-4" /> My Profile
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white">
                  {t.nav.dashboard}
                </Link>
                <button onClick={() => { setMobileMenuOpen(false); logout(); }} className="w-full text-center py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400">
                  {t.nav.signOut}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2.5 rounded-xl text-xs font-semibold border border-gray-200 dark:border-emerald-900 text-gray-800 dark:text-gray-200">{t.nav.signIn}</Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-center py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white">{t.nav.register}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
