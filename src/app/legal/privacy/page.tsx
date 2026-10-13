"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Lock, UserCheck, Trash2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Data Governance & Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Farmer Privacy Policy
          </h1>
          <p className="text-xs text-gray-500 font-mono">Last Updated: October 2026</p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">1. Data Ownership & Sovereignty</h2>
            <p>
              You own all agricultural, financial, and personal information you enter into MannVayal AI. We believe that smallholder agricultural data sovereignty is a fundamental right. We do not sell your personal data or individual farm locations to third-party advertisers, commodity speculators, or agribusiness marketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">2. Minimal Data Collection Principle</h2>
            <p>
              We only collect data strictly necessary to run decision calculations (e.g. state, district, soil type, crop name, approximate land area). You are not required to provide precise GPS boundaries or sensitive personal finance account numbers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">3. Community Synchronization & Privacy Suppression</h2>
            <p>
              Participation in the Community Sowing Synchronizer is strictly opt-in and requires your explicit consent. When participating, individual farm names, specific coordinates, and contact details are completely suppressed. Data is displayed exclusively as aggregated taluk-level or district-level percentages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">4. Right to Deletion & Data Portability</h2>
            <p>
              You may request export of all your farm records in standard CSV/PDF format, or request full deletion of your account and related observations at any time.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
