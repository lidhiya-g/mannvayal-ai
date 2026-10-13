"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero3DField from "@/components/visual/Hero3DField";
import LiveDataBadge from "@/components/visual/LiveDataBadge";
import PanIndiaMap from "@/components/geo/PanIndiaMap";
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
  Building2,
  HeartPulse,
  GraduationCap,
  Route,
  Zap,
  Briefcase,
  AlertTriangle,
  FileSpreadsheet,
  Compass,
} from "lucide-react";

export default function HomePage() {
  const { t, language } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does MannVayal AI require IoT devices, soil probes, or drone hardware?",
      a: "No. MannVayal AI is a 100% software-only platform. It operates entirely using farmer-reported farm profiles, publicly available high-resolution weather grids (Open-Meteo & IMD), official agronomic models (ICAR and state agricultural universities), and verified village data (Mission Antyodaya, Jal Jeevan Mission, PMGSY). No hardware installation is required.",
    },
    {
      q: "How does the platform integrate agriculture with rural development?",
      a: "MannVayal AI addresses both farm-level climate risks and village-level infrastructure gaps under one unified architecture. Farmers make informed crop and water decisions, while Gram Panchayat leaders and village officers assess public utilities (drinking water, roads, health, power, education) and plan development priorities with transparent multi-factor scoring.",
    },
    {
      q: "How are village infrastructure gaps assessed and benchmarked?",
      a: "Observed or reported village indicators are compared directly against official Central Ministry benchmarks—such as 100% piped tap water (Jal Jeevan Mission), all-weather road access (PMGSY), PHC within 5km (Indian Public Health Standards), primary school within 1km (RTE), and individual toilet coverage (SBM-G). Gaps are calculated transparently with published data sources.",
    },
    {
      q: "What is the formula behind the Village Development Priority Planner?",
      a: "Priority rankings use a transparent, documented composite score: Priority Score = (Urgency × 0.40) + (Community Impact × 0.40) + (Feasibility × 0.20), on a 1.0 to 5.0 scale. Scores are open, auditable, and never presented as automated bureaucratic diktats.",
    },
    {
      q: "How does the platform ensure Pan-India coverage?",
      a: "MannVayal AI supports all 28 Indian States and 8 Union Territories through an authoritative Local Government Directory (LGD) hierarchy (State → District → Subdistrict/Block → Village). It incorporates regional cropping patterns across northern wheat belts, central soybean tracts, western cotton corridors, and southern delta paddies.",
    },
    {
      q: "Are yield predictions or village funding allocations guaranteed?",
      a: "No. Agriculture and rural governance depend on local ecological and administrative variables. MannVayal AI explicitly provides scenario-based decision support, confidence levels, and verified citations. It does not provide deterministic yield or funding guarantees.",
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

                {/* DUAL PILLAR PRIMARY CALLS TO ACTION */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-all hover:scale-102"
                  >
                    <Leaf className="w-4 h-4 text-emerald-200" />
                    <span>{t.hero.exploreFarm}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/dashboard/village-development"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.hero.seeHowItWorks}</span>
                  </Link>
                </div>

                <div className="pt-4 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-emerald-950/60 text-xs">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100">Zero Hardware</div>
                    <div className="text-gray-500">100% Software-Only</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100">28 States & 8 UTs</div>
                    <div className="text-gray-500">Pan-India LGD Hierarchy</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100">13 Indian Langs</div>
                    <div className="text-gray-500">English Default + Regional</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Interactive Sandbox & Visualizer */}
              <div className="lg:col-span-6">
                <Hero3DField />
              </div>
            </div>
          </div>
        </section>

        {/* NATIONWIDE METRICS & IMPACT BAR */}
        <section className="py-8 bg-emerald-900 text-white border-b border-emerald-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-emerald-800/60">
              <div className="p-2">
                <div className="text-3xl font-black text-lime-400">36</div>
                <div className="text-xs text-emerald-200 font-medium mt-1">States & Union Territories</div>
              </div>
              <div className="p-2">
                <div className="text-3xl font-black text-white">15</div>
                <div className="text-xs text-emerald-200 font-medium mt-1">Agro-Climatic Zones</div>
              </div>
              <div className="p-2">
                <div className="text-3xl font-black text-lime-400">8</div>
                <div className="text-xs text-emerald-200 font-medium mt-1">Village Resource Dimensions</div>
              </div>
              <div className="p-2">
                <div className="text-3xl font-black text-white">13</div>
                <div className="text-xs text-emerald-200 font-medium mt-1">Indian Languages Supported</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: INTERCONNECTED CHALLENGES FACING AGRICULTURE & RURAL COMMUNITIES */}
        <section className="py-16 sm:py-20 border-b border-gray-100 dark:border-emerald-950/40 bg-gray-50/50 dark:bg-[#0A120D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                The Interconnected Challenge
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                Why Farm Climate Risks & Village Infrastructure Are Inseparable
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                A farmer's crop resilience depends not only on seeds and weather forecasts, but on reliable village electricity feeders, all-weather road market access, and drinking water security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">Erratic Weather & Capital Losses</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Delayed monsoons, dry spells during panicle initiation, and sudden unseasonal rains destroy marginal farmer capital without prior risk simulation.
                </p>
              </div>

              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">Village Public Utility Gaps</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Uneven drinking water networks, erratic power feeders for drip irrigation, and poor road connectivity stall post-harvest transit and village health.
                </p>
              </div>

              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">Siloed Village Planning</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Gram Panchayats often lack unified data to prioritize urgent works, resulting in subjective budget allocations without documented evidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: MODULE A — SMART AGRICULTURE INTELLIGENCE */}
        <section className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Module A • Smart Agriculture Intelligence
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                Data-Driven Decision Architecture for Farms
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Farmers cannot control the monsoon, but they can simulate risk, compare regret, and budget scarce water with scientific clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* A1: Climate Risk Analysis */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between hover:border-emerald-500 transition-all shadow-xs space-y-3">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                    <CloudSunRain className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">
                    A1. Climate Risk Analysis
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Evaluates rainfall anomalies (-50% to +50%), consecutive dry-spell days, and heat stress. Cites IMD and Open-Meteo resolution grids with explicit confidence tags.
                  </p>
                </div>
                <Link
                  href="/dashboard/simulator"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Analyze Farm Risk <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* A2: Smart Crop Selection */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between hover:border-emerald-500 transition-all shadow-xs space-y-3">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">
                    A2. Smart Crop Selection
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Evaluates candidate crops across 5 erratic climate states using Savage's Minimax Regret criterion. Protects capital against drought instead of chasing fragile top yields.
                  </p>
                </div>
                <Link
                  href="/dashboard/regret-calculator"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Evaluate Crop Regrets <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* A3: Scenario Simulation */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between hover:border-emerald-500 transition-all shadow-xs space-y-3">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">
                    A3. Water Budget Wallet
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Balances crop ETc demands against borewell hours, farm ponds, and effective rainfall. Features AWD alternate wetting & drying water-saving models.
                  </p>
                </div>
                <Link
                  href="/dashboard/water-budget"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Calculate Water Balance <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* A4: Rescue Timeline */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between hover:border-emerald-500 transition-all shadow-xs space-y-3">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                    <CalendarCheck2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">
                    A4. Stage Rescue Timeline
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    8-stage growth progression with active alert evaluations. Track critical flowering water thresholds, foliar sprays, and mark completed field rescue tasks.
                  </p>
                </div>
                <Link
                  href="/dashboard/timeline"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  View Stage Timeline <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: MODULE B — VILLAGE RESOURCE AND DEVELOPMENT INTELLIGENCE */}
        <section className="py-16 sm:py-24 bg-gray-50/70 dark:bg-[#0A110D] border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Module B • Village Resource and Development Intelligence
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                Data-Driven Rural Development for Gram Panchayats
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Assess public utilities, benchmark infrastructure against official standards, identify livelihood gaps, and plan village works with transparent priority scores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* B1: Village Resource Assessment */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between shadow-xs space-y-3">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">
                    B1. Resource Assessment
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Evaluates 8 core dimensions: piped drinking water, PMGSY roads, electricity hours, PHC health distance, school access, sanitation, and digital CSCs.
                  </p>
                </div>
                <Link
                  href="/dashboard/village-development"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline pt-2"
                >
                  View Village Resources <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* B2: Infrastructure Gap Assessment */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between shadow-xs space-y-3">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">
                    B2. Infrastructure Gaps
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Compares observed values against official targets (Jal Jeevan Mission, PMGSY, IPHS, SBM-G). Honest "Data Unavailable" labels preserve truth.
                  </p>
                </div>
                <Link
                  href="/dashboard/village-development"
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Inspect Gaps <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* B3: Rural Livelihood Insights */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between shadow-xs space-y-3">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">
                    B3. Livelihood Insights
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Analyzes agricultural dependence, lean-season slack periods, dairy cooperatives, and evidence-grounded micro-enterprises like bio-briquettes and solar cold rooms.
                  </p>
                </div>
                <Link
                  href="/dashboard/village-development"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Explore Enterprises <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* B4: Priority Planner */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between shadow-xs space-y-3">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">
                    B4. Priority Planner
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Transparent formula: Priority Score = (Urgency × 0.4) + (Impact × 0.4) + (Feasibility × 0.2). Allows Gram Panchayats to track action items and export reports.
                  </p>
                </div>
                <Link
                  href="/dashboard/village-development"
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline pt-2"
                >
                  Open Priority Planner <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PAN-INDIA INTERACTIVE MAP & REGIONAL EXPLORER */}
        <section id="explore-india" className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Authoritative Geographic Hierarchy
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                Pan-India Agricultural & Rural Intelligence Atlas
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                From the wheat plains of Punjab and soybean belts of Madhya Pradesh to the cotton tracts of Maharashtra and paddy deltas of the South—explore localized climate and rural baselines across all 36 Indian States and Union Territories.
              </p>
            </div>

            <PanIndiaMap />
          </div>
        </section>

        {/* HOW THE PLATFORM WORKS */}
        <section className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40 bg-gray-50/50 dark:bg-[#0A120D]">
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
                  title: "Enter Farm & Village Baseline",
                  desc: "Select your State, District, and Block without requiring complex GPS hardware or physical sensors.",
                },
                {
                  step: "02",
                  title: "Simulate Climate & Resource Shocks",
                  desc: "Model rainfall deficits and evaluate village utility coverage against official National benchmarks.",
                },
                {
                  step: "03",
                  title: "Compare Regret & Prioritize Needs",
                  desc: "Choose crops that minimize worst-case drought regret and score village works by urgency, impact, and feasibility.",
                },
                {
                  step: "04",
                  title: "Execute & Record Outcomes",
                  desc: "Follow stage rescue tasks, track Panchayat resolution status, and export official CSV reports.",
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
        <section className="py-16 sm:py-20 border-b border-gray-100 dark:border-emerald-950/40">
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
                  Agricultural terminology and village indicators structured in your mother tongue, with English default and right-to-left layout for Urdu.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
              {[
                { name: "English (Default)", code: "en", en: "English" },
                { name: "தமிழ்", code: "ta", en: "Tamil" },
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
        <section className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40 bg-gray-50/50 dark:bg-[#0A120D]">
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
              Smarter Farms. Stronger Villages. A Prosperous Bharat.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect agricultural decision science with transparent village resource planning. No physical sensors required—just scientific decision support across all 36 Indian States and UTs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-2xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-900/30 transition-all hover:scale-105"
              >
                Launch Agricultural Engines
              </Link>
              <Link
                href="/dashboard/village-development"
                className="px-8 py-4 rounded-2xl text-sm font-semibold border border-emerald-300 dark:border-emerald-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40 transition-colors"
              >
                Launch Village Priority Planner
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
