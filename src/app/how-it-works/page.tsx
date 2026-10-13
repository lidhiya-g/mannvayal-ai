"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Create Your Farm Profile",
      desc: "Specify your state, district (e.g. Thanjavur, Madurai), village, land area, soil texture (Clay Loam, Black Cotton, Sandy Loam), and available water source (Borewell, Canal, Rainfed). No GPS hardware or field probes required.",
      points: ["Takes under 2 minutes", "Multi-farm support per account", "No hardware required"],
    },
    {
      num: "02",
      title: "Real-Time Weather Integration",
      desc: "MannVayal AI cross-references your district against high-resolution Numerical Weather Prediction (NWP) grids from Open-Meteo and India Meteorological Department (IMD) climatological normals.",
      points: ["7-Day precipitation & temp trends", "Live vs Simulated toggle", "Source provenance timestamps"],
    },
    {
      num: "03",
      title: "Simulate What-If Climate Shocks",
      desc: "Adjust scenario sliders to test late monsoon arrivals (10-30 days delay), dry-spells, or rainfall deficits (-50% to +50%). The FAO-33 engine calculates the exact yield impact on your crop's current growth stage.",
      points: ["Yield response factor Ky modeling", "Stage sensitivity calculation", "Financial downside estimation"],
    },
    {
      num: "04",
      title: "Evaluate Crop Decision Regrets",
      desc: "Before buying expensive seeds, compare candidate crops across 5 climate states. The Savage Minimax Regret criterion identifies the crop that cushions you against catastrophic losses if the rains fail.",
      points: ["Cost of cultivation breakdown", "Sensitivity & tradeoff charts", "Opportunity regret analysis"],
    },
    {
      num: "05",
      title: "Plan Water Budget & Stage Rescues",
      desc: "Track daily crop evapotranspiration (ETc) against available storage. Receive stage-specific alerts (e.g. mandatory water depth during panicle initiation) and mark tasks completed as your crop progresses.",
      points: ["AWD water saving calculations", "8 growth stages with action checklists", "Log actual harvest in Farm Resilience Memory"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Farmer Journey
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
            How MannVayal AI Operates
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            From initial farm inputs to climate simulation, regret comparison, water planning, and harvest outcome tracking.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] flex flex-col md:flex-row gap-6 items-start shadow-xs"
            >
              <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                {st.num}
              </div>
              <div className="space-y-3 flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{st.title}</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{st.desc}</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  {st.points.map((p, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all"
          >
            Start Exploring With Your Farm <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
