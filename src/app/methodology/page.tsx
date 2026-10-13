"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, Calculator, Droplets, ShieldAlert, Cpu } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Scientific Provenance & Rigor
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
            Agricultural Data & Methodology
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            MannVayal AI replaces opaque black-box assertions with documented agronomic formulas, peer-reviewed equations, and explicit uncertainty parameters.
          </p>
        </div>

        {/* Core Mathematical Formulations */}
        <div className="space-y-8">
          {/* 1. FAO-33 Equation */}
          <div className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  FAO-33 Yield Response to Water (Doorenbos & Kassam)
                </h2>
                <div className="text-xs text-gray-400 font-mono">Yield Reduction vs Evapotranspiration Deficit</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0c140e] border border-gray-200 dark:border-emerald-950/80 font-mono text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
              (1 - Y_actual / Y_max) = Ky * (1 - ET_actual / ET_max)
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Where <strong>Ky</strong> represents the yield response factor. Crops with Ky &gt; 1 (such as Paddy at Ky=1.15, or Maize at tasseling Ky=1.5) suffer disproportionately severe yield drops when water deficits coincide with reproductive and flowering stages. Millets (Finger Millet Ky=0.70) demonstrate high tolerance.
            </p>
          </div>

          {/* 2. Savage's Minimax Regret */}
          <div className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Savage's Minimax Regret Criterion (1951)
                </h2>
                <div className="text-xs text-gray-400 font-mono">Decision Analysis Under Climate Uncertainty</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0c140e] border border-gray-200 dark:border-emerald-950/80 font-mono text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
              Regret R(c, s) = BestReturn(s) - Return(c, s)
              <br />
              Recommended Choice = argmin_c [ max_s R(c, s) ]
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Rather than assuming a farmer knows the exact monsoon outcome, our engine evaluates candidate crops across 5 discrete states of nature (Normal Monsoon, Deficit -25%, Severe Drought -45%, Delayed Sowing, Heat Shock). The Minimax crop minimizes the maximum potential regret, preventing catastrophic debt.
            </p>
          </div>

          {/* 3. FAO-56 Penman-Monteith */}
          <div className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  FAO-56 Crop Evapotranspiration & Water Budget
                </h2>
                <div className="text-xs text-gray-400 font-mono">Consumptive Water Use Equation</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0c140e] border border-gray-200 dark:border-emerald-950/80 font-mono text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
              ETc = Kc * ET0
              <br />
              Gross Irrigation Requirement = (ETc - Effective Rainfall) / Irrigation Efficiency
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Stage crop coefficients (Kc) calibrate water consumption dynamically across 8 phenological phases. Irrigation efficiencies account for the difference between conventional flood irrigation (40% efficiency), furrow (60%), and micro-drip systems (90%).
            </p>
          </div>
        </div>

        {/* Data Provenance & Distinction */}
        <div className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Data Category Distinctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm pt-2">
            <div>
              <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">Observations</div>
              <p className="text-gray-500 dark:text-gray-400">
                Official historical records and meteorological surface recordings retrieved from IMD and global reanalysis grids.
              </p>
            </div>
            <div>
              <div className="font-bold text-blue-700 dark:text-blue-400 mb-1">Forecasts</div>
              <p className="text-gray-500 dark:text-gray-400">
                Short-range 7-day Numerical Weather Prediction (NWP) outputs subject to natural meteorological variance.
              </p>
            </div>
            <div>
              <div className="font-bold text-amber-700 dark:text-amber-400 mb-1">Model Simulations</div>
              <p className="text-gray-500 dark:text-gray-400">
                Calculated What-If projections based on farmer inputs and calibrated response functions, strictly labelled as scenarios.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
