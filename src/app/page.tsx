"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero3DField from "@/components/visual/Hero3DField";
import LiveDataBadge from "@/components/visual/LiveDataBadge";
import { useApp } from "@/context/AppContext";
import {
  CloudSunRain,
  Calculator,
  Droplets,
  CalendarCheck2,
  Users2,
  Bot,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BarChart3,
  HelpCircle,
  Mail,
  ChevronDown,
  Layers,
  Leaf,
  Globe2,
} from "lucide-react";

export default function HomePage() {
  const { t, language } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does MannVayal AI require IoT sensors, field probes, or drone hardware?",
      a: "No. MannVayal AI is a 100% software-only decision platform. It operates entirely using farmer-reported farm profiles, publicly available high-resolution weather feeds (Open-Meteo & IMD grids), and calibrated agronomic models from TNAU and ICAR. You do not need to purchase or install any hardware devices.",
    },
    {
      q: "What is the Crop Decision Regret Calculator and how does it help?",
      a: "Rather than guessing which crop will yield maximum profit under perfect conditions, Savage's Minimax Regret criterion compares crops across multiple erratic climate scenarios (e.g., normal monsoon, delayed monsoon, 30% deficit rainfall, severe drought). It identifies the crop choice that protects your investment capital by minimizing worst-case financial regret.",
    },
    {
      q: "Are the recommendations and yield forecasts guaranteed?",
      a: "No. Agricultural outcomes are subject to complex local environmental and ecological factors. MannVayal AI explicitly provides scenario-based decision support, confidence ranges, and verified data citations. It does not provide deterministic yield or profit guarantees.",
    },
    {
      q: "Can I use MannVayal AI in my regional language?",
      a: "Yes. MannVayal AI natively supports 13 Indian languages, with primary dedicated support for Tamil (தமிழ்), Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese, and Urdu (with RTL layout support).",
    },
    {
      q: "How is community data shared in the Community Sowing Synchronizer?",
      a: "Community synchronization is strictly opt-in and privacy-preserving. Only aggregated crop acreages and sowing windows at the taluk or district level are computed to identify collective water demand peaks. Individual farm identities and GPS coordinates are never publicly revealed.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {t.hero.badgeText}
                  </span>
                  <LiveDataBadge />
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
                  {t.hero.headline}
                </h1>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t.hero.subheadline}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-all hover:scale-102"
                  >
                    <span>{t.hero.exploreFarm}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/how-it-works"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold border border-gray-300 dark:border-emerald-800/60 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40 transition-colors"
                  >
                    {t.hero.seeHowItWorks}
                  </Link>
                </div>

                <div className="pt-4 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-emerald-950/60 text-xs">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100">Zero Hardware</div>
                    <div className="text-gray-500">100% Software Solution</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100">FAO-33 & TNAU</div>
                    <div className="text-gray-500">Calibrated Crop Models</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100">13 Indian Langs</div>
                    <div className="text-gray-500">Tamil & Regional First</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive 3D Canvas Field */}
              <div className="lg:col-span-6">
                <Hero3DField />
              </div>
            </div>
          </div>
        </section>

        {/* CORE PRODUCT ENGINES OVERVIEW */}
        <section className="py-16 sm:py-24 bg-gray-50/60 dark:bg-[#0c130f] border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Integrated Agro-Climatic Intelligence
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                Beyond Weather Forecasts: True Decision Architecture
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Farmers cannot control the monsoon, but they can simulate risk, compare regret, and allocate water with scientific clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1: Climate What-If Simulator */}
              <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                    <CloudSunRain className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {t.simulator.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Simulate rainfall deficits (-50% to +50%), dry-spells up to 30 days, and temperature spikes. Review quantified yield impacts and TNAU contingency guidance.
                  </p>
                </div>
                <Link
                  href="/dashboard/simulator"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Run What-If Simulation <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Feature 2: Crop Decision Regret Calculator */}
              <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {t.regret.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Compares candidate crops across 5 climate states. Identifies the choice that minimizes maximum capital regret under drought conditions instead of chasing fragile top profits.
                  </p>
                </div>
                <Link
                  href="/dashboard/regret-calculator"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Evaluate Crop Regrets <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Feature 3: Water Budget Wallet */}
              <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {t.water.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Interactive water wallet balancing ETc crop demands against borewell hours, farm ponds, and effective rainfall. Features AWD adoption savings models.
                  </p>
                </div>
                <Link
                  href="/dashboard/water-budget"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Calculate Water Balance <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Feature 4: Adaptive Crop Rescue Timeline */}
              <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                    <CalendarCheck2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {t.timeline.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    8-stage growth progression with active alert evaluations. Track critical panicle initiation water thresholds, foliar sprays, and mark completed field rescue tasks.
                  </p>
                </div>
                <Link
                  href="/dashboard/timeline"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  View Stage Timeline <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Feature 5: Explainable Tamil Farm Advisor */}
              <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {t.advisor.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Transparent conversational AI in Tamil and English. Cites verified TNAU & ICAR publications, lists assumptions, and notes explicit uncertainty levels.
                  </p>
                </div>
                <Link
                  href="/dashboard/advisor"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Consult Tamil Advisor <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Feature 6: Community Sowing Synchronizer */}
              <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {t.nav.community}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Privacy-preserving aggregated view of regional crop distribution and synchronized water peaks to avoid canal tail-end drying crises.
                  </p>
                </div>
                <Link
                  href="/dashboard/community"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Explore Community Map <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CLIMATE-TO-CROP WORKFLOW STEPS */}
        <section className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                End-to-End Workflow
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                How MannVayal Empowers Decisions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Enter Farm Baseline",
                  desc: "Specify your district, soil type, and farm area without requiring complex GPS or hardware sensors.",
                },
                {
                  step: "02",
                  title: "Simulate Climate Shocks",
                  desc: "Model late monsoon onset, dry spells, and heatwaves using calibrated FAO-33 water-yield response curves.",
                },
                {
                  step: "03",
                  title: "Compare Regret & Water",
                  desc: "Evaluate alternative crops and manage your 30-day water wallet to prevent sudden irrigation depletion.",
                },
                {
                  step: "04",
                  title: "Execute & Record Outcomes",
                  desc: "Follow stage-specific rescue checklists and save actual seasonal yields in Farm Resilience Memory.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950/60 bg-white dark:bg-[#111A14] space-y-3"
                >
                  <div className="text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13 SUPPORTED INDIAN LANGUAGES SECTION */}
        <section className="py-16 sm:py-20 bg-gray-50/50 dark:bg-[#0c130f] border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Globe2 className="w-4 h-4" /> Multilingual Inclusion
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                  Built for India: 13 Regional Languages
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Agricultural terminology carefully structured in your mother tongue, with full Right-to-Left support for Urdu.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
              {[
                { name: "தமிழ்", code: "ta", en: "Tamil" },
                { name: "English", code: "en", en: "English" },
                { name: "हिन्दी", code: "hi", en: "Hindi" },
                { name: "తెలుగు", code: "te", en: "Telugu" },
                { name: "ಕನ್ನಡ", code: "kn", en: "Kannada" },
                { name: "മലയാളം", code: "ml", en: "Malayalam" },
                { name: "বাংলা", code: "bn", en: "Bengali" },
                { name: "मराठी", code: "mr", en: "Marathi" },
                { name: "ગુજરાતી", code: "gu", en: "Gujarati" },
                { name: "ਪੰਜਾਬੀ", code: "pa", en: "Punjabi" },
                { name: "ଓଡ଼ିଆ", code: "or", en: "Odia" },
                { name: "অসমীয়া", code: "as", en: "Assamese" },
                { name: "اردو (RTL)", code: "ur", en: "Urdu" },
              ].map((lang) => (
                <div
                  key={lang.code}
                  className="p-3.5 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/30 shadow-2xs"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">{lang.name}</div>
                  <div className="text-[10px] text-gray-400">{lang.en}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Transparent Governance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-gray-200 dark:border-emerald-950/80 rounded-2xl bg-white dark:bg-[#111A14] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 hover:text-emerald-600"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-emerald-950/40 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="py-16 bg-gradient-to-b from-emerald-900/10 to-transparent">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              Ready to Turn Climate Uncertainty into Clear Decisions?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Start by selecting your district and simulating weather scenarios on your farm. No hardware, no complex sensors—just scientific decision support.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-2xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-900/30 transition-all hover:scale-105"
              >
                Launch Decision Engines
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 rounded-2xl text-sm font-semibold border border-gray-300 dark:border-emerald-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40 transition-colors"
              >
                Create Free Farmer Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
