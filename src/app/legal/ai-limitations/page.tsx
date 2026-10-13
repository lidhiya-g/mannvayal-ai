"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldAlert, Cpu, AlertCircle, CheckCircle } from "lucide-react";

export default function AiLimitationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Responsible AI Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            AI Limitations & Transparency Statement
          </h1>
          <p className="text-xs text-gray-500 font-mono">Last Reviewed: October 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
            <h2 className="font-bold text-sm mb-2 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              Core Boundary Notice
            </h2>
            <p>
              MannVayal AI separates deterministic mathematical formulas from generative artificial intelligence. We never permit a generative language model to invent weather numbers, chemical dosages, or financial figures.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">1. Two-Tiered Computational Architecture</h2>
            <p>
              <strong>Tier 1 (Deterministic Agronomic Core):</strong> The Climate Simulator, Water Budget Wallet, and Decision Regret Calculator run on strict mathematical algorithms (FAO-33, FAO-56, Savage Minimax). These outputs are mathematically reproducible and rule-bounded.
            </p>
            <p>
              <strong>Tier 2 (Explainable Conversational Advisor):</strong> Natural language queries are grounded in verified TNAU and ICAR text corpora. When an external LLM is invoked, it is constrained to cite specific assumptions and refer to local experts for high-impact decisions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">2. No Unverified "Self-Learning" Claims</h2>
            <p>
              We do not claim that our predictive models automatically learn or retrain themselves on individual user submissions. Machine learning models in agriculture must undergo rigorous chronological validation, cross-season evaluation, and scientific peer review before deployment to avoid propagating accidental biases.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">3. Known Limitations</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-500 dark:text-gray-400">
              <li>Numerical Weather Predictions become significantly less reliable beyond a 7-day forecast horizon.</li>
              <li>Microclimate variations (such as sudden localized thunderstorm cells) may differ from district-wide gridded models.</li>
              <li>Soil moisture holding capacities are estimated by textural class (e.g. Clay Loam vs Sandy Loam) unless a farmer enters laboratory test data.</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
