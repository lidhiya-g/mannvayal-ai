"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { BellRing, AlertTriangle, CloudRain, SunMedium, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function WeatherAlertsPage() {
  const { activeFarm } = useApp();

  const [alerts, setAlerts] = useState([
    {
      id: "A1",
      type: "DRY_SPELL",
      title: "Consecutive Dry-Spell Warning (12+ Days)",
      severity: "HIGH",
      date: "Active (Oct 13 - Oct 25)",
      impact: "Soil moisture depletion entering critical reproductive panicle initiation window.",
      recommendedAction: "Apply Alternate Wetting and Drying (AWD) pacing and inspect perimeter bunds for leaks.",
      dismissed: false,
    },
    {
      id: "A2",
      type: "HEAT_SPIKE",
      title: "Anthesis Daytime Temperature Alert (>35°C)",
      severity: "MEDIUM",
      date: "Forecasted Thursday",
      impact: "Pollen desiccation risk if midday humidity falls below 45%.",
      recommendedAction: "Schedule light morning irrigation to buffer canopy microclimate temperature.",
      dismissed: false,
    },
    {
      id: "A3",
      type: "CANAL_ROSTER",
      title: "Canal Roster Turn Expiry Notice",
      severity: "INFO",
      date: "Next Sunday",
      impact: "Grand Anicut distribution turn completes. Tail-end gates will close for 8-day rotation.",
      recommendedAction: "Top up farm pond storage buffer before Sunday 18:00 IST.",
      dismissed: false,
    },
  ]);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, dismissed: true } : a)));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Automated Early Warning
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
            <BellRing className="w-7 h-7 text-rose-500" />
            Weather Alerts & Threshold Triggers
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Rule-based climate alerts derived from IMD agromet thresholds and localized 7-day NWP forecasts.
          </p>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 rounded-3xl border bg-white dark:bg-[#111A14] transition-all space-y-3 ${
                alert.dismissed
                  ? "opacity-50 border-gray-200 dark:border-emerald-950/40"
                  : alert.severity === "HIGH"
                  ? "border-amber-500/40 shadow-xs"
                  : "border-gray-200 dark:border-emerald-900/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`p-2 rounded-xl ${
                      alert.severity === "HIGH"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-blue-500/10 text-blue-600"
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                      {alert.title}
                    </h3>
                    <div className="text-[11px] text-gray-400 font-mono">{alert.date}</div>
                  </div>
                </div>

                {!alert.dismissed && (
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    Dismiss Alert
                  </button>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Agro-Climatic Impact:</strong> {alert.impact}
                </p>
                <p className="text-emerald-700 dark:text-emerald-400">
                  <strong>Recommended Contingency:</strong> {alert.recommendedAction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
