"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import {
  Users2,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Layers,
  Sparkles,
  PieChart,
  Calendar,
  CheckCircle,
} from "lucide-react";

export default function CommunitySyncPage() {
  const { activeFarm, t } = useApp();
  const [district, setDistrict] = useState(activeFarm?.district || "Thanjavur");
  const [metrics, setMetrics] = useState<any>(null);
  const [consented, setConsented] = useState(true);

  useEffect(() => {
    fetchCommunityData();
  }, [district]);

  const fetchCommunityData = async () => {
    try {
      const res = await fetch(`/api/community?district=${encodeURIComponent(district)}`);
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics);
      }
    } catch (e) {
      console.error("Failed to load community sync:", e);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Flagship Decision Engine #5
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
              <Users2 className="w-7 h-7 text-indigo-500" />
              {t.nav.community}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Aggregated, privacy-preserving regional sowing calendar to avert synchronized canal water exhaustion.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">District:</span>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-xs font-semibold"
            >
              <option value="Thanjavur">Thanjavur (Cauvery Delta)</option>
              <option value="Tiruvarur">Tiruvarur</option>
              <option value="Madurai">Madurai</option>
              <option value="Coimbatore">Coimbatore</option>
            </select>
          </div>
        </div>

        {/* Privacy Shield Banner */}
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-900 dark:text-indigo-200 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>Cryptographic Privacy Active:</strong> Individual coordinates and farmer names are strictly suppressed. Only aggregated block statistics are calculated.
            </span>
          </div>
          <button
            onClick={() => setConsented(!consented)}
            className="text-[11px] underline font-semibold shrink-0"
          >
            {consented ? "Opt-out of sharing" : "Opt-in to share"}
          </button>
        </div>

        {metrics && (
          <>
            {/* Overview Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40">
                <div className="text-xs text-gray-500">Participating Farms in Block</div>
                <div className="text-2xl font-black text-gray-900 dark:text-gray-100 mt-1">
                  {metrics.totalParticipatingFarms} Farms
                </div>
                <div className="text-[11px] text-gray-400 mt-1">Across 12 Panchayats</div>
              </div>

              <div className="p-5 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40">
                <div className="text-xs text-gray-500">Total Monitored Area</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">
                  {metrics.totalMonitoredAreaAcres} Acres
                </div>
                <div className="text-[11px] text-gray-400 mt-1">Cauvery Delta Tail-End Sector</div>
              </div>

              <div className="p-5 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40">
                <div className="text-xs text-gray-500">Synchronized Water Peak</div>
                <div className="text-base font-bold text-amber-600 mt-1">
                  Late October (Critical)
                </div>
                <div className="text-[11px] text-gray-400 mt-1">70% enter panicle stage together</div>
              </div>
            </div>

            {/* 2-Column: Crop Distribution & Sowing Windows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Crop Distribution */}
              <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-500" />
                  Crop Acreage Distribution ({district})
                </h3>

                <div className="space-y-3">
                  {metrics.cropDistribution.map((crop: any, idx: number) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-gray-800 dark:text-gray-200">{crop.cropName}</span>
                        <span className="font-mono text-emerald-600 font-bold">{crop.percentage}% ({crop.areaAcres} ac)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${crop.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sowing Windows Distribution */}
              <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  Sowing Window Timing Clusters
                </h3>

                <div className="space-y-3">
                  {metrics.sowingWindowDistribution.map((win: any, idx: number) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-gray-800 dark:text-gray-200">{win.window}</span>
                        <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{win.pct}% ({win.count} farms)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${win.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Canal Roster Warning Card */}
            <div className="p-6 rounded-3xl border border-amber-500/30 bg-amber-500/10 space-y-2 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              <div className="font-bold flex items-center gap-2 text-base">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Community Peak Water Advisory:
              </div>
              <p className="leading-relaxed">
                {metrics.projectedWaterDemandPeak.note}
              </p>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
