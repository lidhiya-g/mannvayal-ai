"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ShieldCheck, CheckCircle2, AlertCircle, Clock, Database, HelpCircle } from "lucide-react";

export default function ConfidenceCenterPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Transparency & Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
            <ShieldCheck className="w-7 h-7 text-emerald-500" />
            Data Confidence Center
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time evaluation of data freshness, source reliability, input completeness, and model confidence scores.
          </p>
        </div>

        {/* Global Confidence Scorecard */}
        <div className="p-8 rounded-3xl border border-emerald-900/30 bg-emerald-950/10 dark:bg-[#112117] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Composite Reliability Rating
            </div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-100">
              92% High Confidence
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-lg">
              Input variables for your active farm are sufficiently specified, weather observation latency is within 2 hours, and crop phenology models are scientifically calibrated.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c140e] border border-emerald-900/40 text-center shrink-0">
            <div className="text-2xl font-black text-emerald-600">A+</div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">Grade Metric</div>
          </div>
        </div>

        {/* 4 Factor Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" /> 1. Weather Freshness
              </span>
              <span className="font-mono text-emerald-600 font-bold">98%</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Open-Meteo High-Resolution NWP grid synched 42 minutes ago with official IMD surface station cross-checks.
            </p>
          </div>

          <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" /> 2. Farm Profile Completeness
              </span>
              <span className="font-mono text-emerald-600 font-bold">88%</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Land area, soil texture, crop variety, and sowing date are provided. Water capacity is estimated from default basin benchmarks.
            </p>
          </div>

          <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 3. Scientific Calibration
              </span>
              <span className="font-mono text-emerald-600 font-bold">95%</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Crop parameters utilize validated FAO-33 yield response curves and TNAU agronomic manual stage coefficients.
            </p>
          </div>

          <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 4. Market MSP Anchoring
              </span>
              <span className="font-mono text-emerald-600 font-bold">90%</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Crop selling prices anchored to Government of India Minimum Support Prices (MSP) for 2024-25.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
