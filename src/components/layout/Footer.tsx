"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Sprout, ShieldAlert } from "lucide-react";

export default function Footer() {
  const { t, language } = useApp();

  return (
    <footer className="border-t border-gray-200 dark:border-emerald-950/60 bg-gray-50/60 dark:bg-[#080D0A] text-gray-600 dark:text-gray-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-white">
                <Sprout className="w-4 h-4 text-emerald-200" />
              </div>
              <span className="font-bold text-base text-gray-900 dark:text-gray-100">MannVayal AI</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              {t.tagline}
            </p>
            {language !== "en" && t.taglineTamil && (
              <p className="font-medium text-emerald-600 dark:text-emerald-400">
                {t.taglineTamil}
              </p>
            )}
            <p className="text-[11px] text-gray-400 dark:text-gray-500">
              AI-powered platform for climate risk analysis, smart crop planning, and rural development.
            </p>
          </div>

          {/* Decision Engines */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Decision Engines</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard/simulator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.simulator}</Link></li>
              <li><Link href="/dashboard/regret-calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.regretCalculator}</Link></li>
              <li><Link href="/dashboard/water-budget" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.waterBudget}</Link></li>
              <li><Link href="/dashboard/timeline" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.timeline}</Link></li>
              <li><Link href="/dashboard/advisor" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.advisor}</Link></li>
            </ul>
          </div>

          {/* Data & Governance */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Data &amp; Governance</h4>
            <ul className="space-y-2">
              <li><Link href="/methodology" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Agronomic Methodology &amp; FAO-33</Link></li>
              <li><Link href="/legal/data-sources" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Official Data Sources Registry</Link></li>
              <li>
                <Link href="/legal/ai-limitations" className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> AI Limitations &amp; Transparency
                </Link>
              </li>
              <li><Link href="/dashboard/confidence" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Data Confidence Center</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Transparency &amp; Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact &amp; KVK Liaison</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Farmer Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Use &amp; Disclaimers</Link></li>
              <li><span className="text-[11px] text-gray-500 block pt-1">100% Software Platform (No Hardware Required)</span></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200/90 text-[11px] leading-relaxed mb-8">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Mandatory Agronomic &amp; Financial Disclaimer:
          </div>
          MannVayal AI is a decision-support and scenario-modeling platform. All predictions, water balances, and regret calculations are model-based estimations derived from historical climatological distributions and agronomic benchmarks (TNAU / ICAR / FAO-33). They do not constitute guaranteed yields, insured returns, or certified weather forecasts. Always consult your local Agricultural Extension Officer or Krishi Vigyan Kendra for critical decisions.
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-200 dark:border-emerald-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <div>&copy; {new Date().getFullYear()} MannVayal AI. Dedicated to Indian smallholder farmers.</div>
          <div className="flex items-center gap-4">
            <span>Serving Farmers Across India</span>
            <span>&bull;</span>
            <span>13 Indian Languages Supported</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
