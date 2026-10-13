"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Database, ExternalLink, CheckCircle2 } from "lucide-react";

export default function DataSourcesPage() {
  const sources = [
    {
      name: "Open-Meteo High-Resolution NWP API",
      type: "Weather Observations & 7-Day Forecasts",
      coverage: "Global / High-Resolution (1.5km - 11km grids across India)",
      license: "Open Data Commons Attribution License (ODC-By)",
      updateFrequency: "Hourly re-runs",
      role: "Powers live temperature, relative humidity, wind speed, and precipitation forecasts.",
    },
    {
      name: "India Meteorological Department (IMD)",
      type: "Agrometeorological Bulletins & Climatological Normals",
      coverage: "District & Agromet Advisory Service (AAS) level across India",
      license: "Government Public Data / Research Citation",
      updateFrequency: "Bi-weekly advisory bulletins",
      role: "Serves as the benchmark baseline for long-term rainfall normals and monsoon onset dates.",
    },
    {
      name: "Tamil Nadu Agricultural University (TNAU) Agronomy Portal",
      type: "Crop Production Guide & Package of Practices",
      coverage: "Cauvery Delta, Western Zone, Southern Zone of Tamil Nadu",
      license: "Academic Agricultural Extension Reference",
      updateFrequency: "Annual & Seasonal revisions",
      role: "Provides calibrated crop stage durations, water coefficients (Kc), and contingency foliar spray formulas.",
    },
    {
      name: "Food and Agriculture Organization (FAO) Irrigation Paper 33 & 56",
      type: "Yield Response to Water & Penman-Monteith Guidelines",
      coverage: "International Calibrated Agronomic Standards",
      license: "FAO Knowledge Repository",
      updateFrequency: "Standard Baseline Formulations",
      role: "Supplies mathematical foundations for yield response factor Ky and crop evapotranspiration ETc.",
    },
    {
      name: "Central Research Institute for Dryland Agriculture (CRIDA / ICAR)",
      type: "Contingency Agriculture Plans for Extreme Weather",
      coverage: "District-level contingency plans for Tamil Nadu and India",
      license: "ICAR Open Access Publications",
      updateFrequency: "Periodic contingency updates",
      role: "Provides alternate crop shift guidance during severe monsoon delay (>20 days).",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Data Provenance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Data Sources & Registry
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Full transparency on permitted digital data feeds, academic citations, update frequencies, and licensing.
          </p>
        </div>

        <div className="space-y-6">
          {sources.map((src, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-3 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  {src.name}
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 w-fit">
                  {src.type}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {src.role}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-gray-100 dark:border-emerald-950/60 text-[11px] text-gray-500 dark:text-gray-400">
                <div><strong>Coverage:</strong> {src.coverage}</div>
                <div><strong>Licensing:</strong> {src.license}</div>
                <div><strong>Refresh Rate:</strong> {src.updateFrequency}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
