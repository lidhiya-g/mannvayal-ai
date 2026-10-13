"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Terms of Use
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Platform Terms of Service
          </h1>
          <p className="text-xs text-gray-500 font-mono">Last Updated: October 2026</p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-xs">
            <strong className="block font-bold mb-1">Key Agronomic Limitation Notice:</strong>
            MannVayal AI provides educational, decision-support, and scenario simulation tools. It is not an insurance policy, a certified agronomic prescription service, or an official meteorological forecast bureau.
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the MannVayal AI platform, you agree to these Terms of Use. If you do not agree with these terms, do not access or use the software.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">2. No Guarantee of Yield or Financial Return</h2>
            <p>
              Agricultural yields depend upon innumerable microscopic and macroeconomic factors, including microclimate anomalies, localized pest outbreaks, groundwater depletion, input quality, and market volatility. MannVayal AI models simulate scenario responses under calibrated baseline assumptions, but strictly make no representations, warranties, or guarantees regarding harvest quantities or financial outcomes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">3. Verification with Local Extension Officers</h2>
            <p>
              Before applying agrochemical inputs, shifting large-scale sowing dates, or altering canal rotations, farmers are strongly advised to consult their local Assistant Agricultural Officer (AAO) or district Krishi Vigyan Kendra (KVK).
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
