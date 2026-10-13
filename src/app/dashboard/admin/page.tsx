"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import {
  Settings,
  Shield,
  Users,
  Database,
  Cpu,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function AdminPage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<"METRICS" | "INTEGRATIONS" | "AUDIT" | "USERS">("METRICS");

  // Simulated Audit Log stream from dev.db
  const auditLogs = [
    { id: "1", type: "USER_LOGIN", desc: "User farmer@mannvayal.ai logged in successfully", time: "10 mins ago", severity: "INFO" },
    { id: "2", type: "SCENARIO_RUN", desc: "Climate What-If Simulator executed (-30% Rain anomaly)", time: "25 mins ago", severity: "INFO" },
    { id: "3", type: "WEATHER_SYNC", desc: "Open-Meteo sync completed for Thanjavur district", time: "42 mins ago", severity: "INFO" },
    { id: "4", type: "SYSTEM_INITIALIZED", desc: "Database seed executed with TNAU baseline guidelines", time: "2 hours ago", severity: "INFO" },
  ];

  const modelVersions = [
    { name: "FAO-33 Yield Response Core", version: "v1.4.2", coverage: "Tamil Nadu, Karnataka, AP", evaluated: "Oct 2026", status: "Active" },
    { name: "Savage Minimax Regret Engine", version: "v2.1.0", coverage: "5-State Climate Matrix", evaluated: "Sep 2026", status: "Active" },
    { name: "Penman-Monteith ET0 Baseline", version: "v1.1.8", coverage: "Cauvery Basin Microclimates", evaluated: "Oct 2026", status: "Active" },
  ];

  const dataIntegrations = [
    { name: "Open-Meteo NWP Grid Feed", status: "ONLINE", latency: "124ms", health: "100%", lastSync: "10m ago" },
    { name: "IMD AAS Climatological Normal", status: "ONLINE", latency: "Local Cache", health: "100%", lastSync: "Today" },
    { name: "TNAU Agronomy Guidance Index", status: "ONLINE", latency: "In-Memory", health: "100%", lastSync: "Seeded" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Platform Operations
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
              <Settings className="w-7 h-7 text-amber-500" />
              Administrative Governance Center
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Data source health, model evaluation tracking, audit logging, and role management.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-[#111A14] border border-gray-200 dark:border-emerald-950 text-xs">
            <button
              onClick={() => setActiveTab("METRICS")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                activeTab === "METRICS" ? "bg-amber-600 text-white" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Models
            </button>
            <button
              onClick={() => setActiveTab("INTEGRATIONS")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                activeTab === "INTEGRATIONS" ? "bg-amber-600 text-white" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Data Feeds
            </button>
            <button
              onClick={() => setActiveTab("AUDIT")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                activeTab === "AUDIT" ? "bg-amber-600 text-white" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Audit Log
            </button>
          </div>
        </div>

        {/* Tab 1: Models & Versions */}
        {activeTab === "METRICS" && (
          <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-500" />
              Calibrated Analytical Model Versions
            </h3>

            <div className="space-y-3">
              {modelVersions.map((mv, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-gray-100 dark:border-emerald-950 bg-gray-50/50 dark:bg-[#152219] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100 text-sm">{mv.name}</div>
                    <div className="text-gray-400 text-[11px]">Coverage: {mv.coverage}</div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <span className="font-mono text-gray-500">{mv.version}</span>
                    <span className="text-[10px] text-gray-400">Eval: {mv.evaluated}</span>
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/10 text-emerald-600">
                      {mv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Integrations Health */}
        {activeTab === "INTEGRATIONS" && (
          <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-500" />
              External Data Source Registry & Health
            </h3>

            <div className="space-y-3">
              {dataIntegrations.map((di, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-gray-100 dark:border-emerald-950 bg-gray-50/50 dark:bg-[#152219] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100 text-sm">{di.name}</div>
                    <div className="text-gray-400 text-[11px]">Latency: {di.latency} • Last Sync: {di.lastSync}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-600">{di.health} Operational</span>
                    <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      {di.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Security & Audit Events */}
        {activeTab === "AUDIT" && (
          <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Shield className="w-5 h-5 text-rose-500" />
                Immutable System Audit Trail
              </h3>
              <span className="text-[10px] text-gray-400 font-mono">No Secrets / Passwords Logged</span>
            </div>

            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-2xl border border-gray-100 dark:border-emerald-950/60 bg-gray-50/50 dark:bg-[#121c15] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {log.type}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">{log.desc}</span>
                  </div>
                  <span className="text-gray-400 text-[10px] font-mono shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
