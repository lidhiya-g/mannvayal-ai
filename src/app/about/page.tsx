"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sprout, Target, Eye, ShieldCheck, Heart, Sparkles, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            About MannVayal AI
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
            Climate Resilience for Every Farmer in India
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            MannVayal AI ("மண்வயல்") was born from a fundamental recognition: climate change is not a future projection for Indian smallholder farmers—it is an immediate daily reality.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Our Mission</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Help Indian farmers make better-informed agricultural decisions using climate data, crop information, water planning, financial risk analysis, and accessible AI-powered guidance.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Our Vision</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Make reliable agricultural decision support accessible to small and marginal farmers, regardless of language, location, or technical expertise, with zero requirement for costly hardware or sensors.
            </p>
          </div>
        </div>

        {/* Responsible AI Principles */}
        <div className="p-8 rounded-3xl border border-emerald-900/30 bg-emerald-950/10 dark:bg-[#0c1811] space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            Our Responsible AI Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">1. Transparent Reasoning</h3>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                Every recommendation links back to scientific principles (FAO-33, TNAU guidelines). We never present black-box conclusions.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">2. No False Promises</h3>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                We never guarantee crop yields, profits, rainfall, or the success of agricultural interventions under changing climate.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">3. Farmer Agency</h3>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                Decision support empowers the farmer to evaluate alternatives, but final farming choices always remain strictly with the grower.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">4. Privacy by Design</h3>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                Farm coordinates and personal records are never shared publicly. Community synchronizations are purely aggregated and anonymized.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
