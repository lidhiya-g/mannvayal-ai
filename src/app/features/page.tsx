"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { CloudSunRain, Calculator, Droplets, CalendarCheck2, Users2, Bot, BookOpenCheck, ArrowRight } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      id: "simulator",
      icon: CloudSunRain,
      color: "text-amber-500 bg-amber-500/10",
      title: "Climate What-If Simulator",
      subtitle: "Deterministic & Stochastic Stress Modeling",
      desc: "Simulate rainfall anomalies from -50% to +50%, dry-spells up to 30 days, delayed sowing windows, and ambient temperature deviations. Based on FAO-33 yield response to water equations with TNAU stage Ky factors.",
      link: "/dashboard/simulator",
    },
    {
      id: "regret",
      icon: Calculator,
      color: "text-emerald-500 bg-emerald-500/10",
      title: "Crop Decision Regret Calculator",
      subtitle: "Savage's Minimax Criterion (1951)",
      desc: "Evaluates multi-crop candidate portfolios across 5 climate states: Normal Monsoon, Deficit (-25%), Severe Drought (-45%), Delayed Sowing, and Heatwave Shock. Computes opportunity regret to identify the safest capital preservation crop.",
      link: "/dashboard/regret-calculator",
    },
    {
      id: "water",
      icon: Droplets,
      color: "text-blue-500 bg-blue-500/10",
      title: "Water Budget Wallet",
      subtitle: "FAO-56 Penman-Monteith Evapotranspiration",
      desc: "Calculates stage-specific ETc demands against borewell availability and farm storage ponds. Features interactive 3D reservoir depth gauges and calculates water savings from Alternate Wetting and Drying (AWD) and drip conversion.",
      link: "/dashboard/water-budget",
    },
    {
      id: "timeline",
      icon: CalendarCheck2,
      color: "text-purple-500 bg-purple-500/10",
      title: "Adaptive Crop Rescue Timeline",
      subtitle: "8 Phenological Stages with Contingency Triggers",
      desc: "Dynamic stage progression from land preparation to harvest. Automatically re-evaluates risks when weather forecasts shift and presents actionable rescue interventions (e.g. 1% KCl foliar spray for drought hardening).",
      link: "/dashboard/timeline",
    },
    {
      id: "advisor",
      icon: Bot,
      color: "text-emerald-600 bg-emerald-600/10",
      title: "Explainable Tamil Farm Advisor",
      subtitle: "Transparent Multilingual Knowledge Engine",
      desc: "Conversational agronomical intelligence providing transparent reasoning chains, data sources, documented assumptions, uncertainty ranges, and clear referrals to local KVK extension officers.",
      link: "/dashboard/advisor",
    },
    {
      id: "community",
      icon: Users2,
      color: "text-indigo-500 bg-indigo-500/10",
      title: "Community Sowing Synchronizer",
      subtitle: "Aggregated, Anonymized Demand Synchronization",
      desc: "Allows consenting farmers in a taluk or canal block to view collective sowing window distributions and forecast peak canal water demand periods to prevent tail-end desiccation.",
      link: "/dashboard/community",
    },
    {
      id: "memory",
      icon: BookOpenCheck,
      color: "text-rose-500 bg-rose-500/10",
      title: "Farm Resilience Memory",
      subtitle: "Personal Longitudinal Agro-Climatic Archive",
      desc: "Records actual harvest quantities, cultivation expenses, rainfall logs, and lessons learned. Enables season-by-season planned versus actual comparisons without claiming automated black-box learning.",
      link: "/dashboard/memory",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Platform Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
            Comprehensive Decision Modules
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Explore the specialized modules engineered to convert complex climate datasets into actionable field choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-xs"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${f.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{f.title}</h2>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">{f.subtitle}</div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {f.desc}
                  </p>
                </div>
                <Link
                  href={f.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Launch Module <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
