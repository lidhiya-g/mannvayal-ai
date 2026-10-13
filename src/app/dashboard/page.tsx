"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import {
  CloudSun,
  Droplets,
  AlertTriangle,
  CalendarCheck2,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Bot,
  Calculator,
  CloudSunRain,
  Sprout,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { user, activeFarm, isLiveWeather, t } = useApp();
  const [weather, setWeather] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [tasks, setTasks] = useState<any[]>([
    {
      id: "T1",
      title: "Maintain 2.5cm water standing buffer",
      stage: "Panicle Initiation",
      priority: "URGENT",
      isCompleted: false,
    },
    {
      id: "T2",
      title: "1% Potassium Nitrate foliar spray",
      stage: "Panicle Initiation",
      priority: "HIGH",
      isCompleted: true,
    },
    {
      id: "T3",
      title: "Inspect field AWD tube water level",
      stage: "Vegetative",
      priority: "MEDIUM",
      isCompleted: false,
    },
  ]);

  useEffect(() => {
    fetchWeather();
  }, [activeFarm?.district, isLiveWeather]);

  const fetchWeather = async () => {
    setLoadingWeather(true);
    try {
      const district = activeFarm?.district || "Thanjavur";
      const res = await fetch(`/api/weather?district=${encodeURIComponent(district)}&sim=${!isLiveWeather}`);
      if (res.ok) {
        const data = await res.json();
        setWeather(data.weather);
      }
    } catch (e) {
      console.error("Failed to load weather:", e);
    } finally {
      setLoadingWeather(false);
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  const activeCropCycle = activeFarm?.cropCycles?.[0] || {
    cropCode: "PADDY",
    currentStage: "Panicle Initiation (கருக்கட்டும் பருவம்)",
    sowingDate: "2026-08-10",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Farm & User Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span>{t.dashboard.greeting}, {user?.fullName || "Farmer"}</span>
              <span className="text-xl">🌾</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Active Field: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{activeFarm?.name || "Cauvery Delta Farm"}</span> • {activeFarm?.district || "Thanjavur"}, {activeFarm?.totalArea || 3.5} Acres ({activeFarm?.soilType || "Clay Loam"})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/simulator"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> Run Scenario
            </Link>
          </div>
        </div>

        {/* Top 3 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Climate Risk Index */}
          <div className="p-5 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>{t.dashboard.riskScore}</span>
              <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-amber-500/10 text-amber-600 border border-amber-500/20">
                MODERATE
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
              42 / 100
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              <span className="text-amber-500 font-semibold">12-day dry spell</span> potential detected
            </div>
          </div>

          {/* Card 2: Current Crop & Phenology Stage */}
          <div className="p-5 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>{t.dashboard.currentCrop}</span>
              <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                Stage 4 of 8
              </span>
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
              {activeCropCycle.cropCode === "PADDY" ? "Paddy (CR-1009 Sub-1)" : activeCropCycle.cropCode}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-tamil mt-1">
              கருக்கட்டும் பருவம் (Panicle Initiation)
            </div>
          </div>

          {/* Card 3: Water Budget Balance */}
          <div className="p-5 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>{t.dashboard.waterSummary}</span>
              <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-blue-500/10 text-blue-600 border border-blue-500/20">
                SURPLUS
              </span>
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-gray-100">
              +650 m³
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
              ~26 days storage buffer remaining
            </div>
          </div>

          {/* Card 4: Data Provenance & Freshness */}
          <div className="p-5 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>{t.dashboard.confidenceLevel}</span>
              <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/10 text-emerald-600">
                94% High
              </span>
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              TNAU Calibrated
            </div>
            <div className="text-[10px] text-gray-400 mt-1 truncate">
              Synced: Today, 06:00 IST
            </div>
          </div>
        </div>

        {/* Microclimate Weather & 7-Day Forecast */}
        <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <CloudSun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                  {weather?.locationName || activeFarm?.district || "Thanjavur"} Microclimate & 7-Day Outlook
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Source: {weather?.source || "Open-Meteo High-Resolution Model"}
                </p>
              </div>
            </div>

            <button
              onClick={fetchWeather}
              className="text-xs text-gray-500 hover:text-emerald-600 flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingWeather ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Current conditions banner */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#16221A] border border-gray-100 dark:border-emerald-900/30 flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 font-mono">
                {weather?.current?.temperatureC ?? 31.4}°C
              </div>
              <div>
                <div className="font-semibold text-xs text-gray-800 dark:text-gray-200">
                  {weather?.current?.conditionText || "Partly Cloudy"}
                </div>
                <div className="text-[11px] text-gray-500">
                  Relative Humidity: {weather?.current?.relativeHumidityPct ?? 68}% • Wind: {weather?.current?.windSpeedKmh ?? 12} km/h
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-bold">Today's Rain:</span> {weather?.current?.precipitationMm ?? 2.4} mm
            </div>
          </div>

          {/* 7-Day Forecast Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {(weather?.dailyForecast || [
              { dayName: "Tue", tempMaxC: 34, tempMinC: 25, precipitationMm: 2.4, conditionText: "Scattered Showers" },
              { dayName: "Wed", tempMaxC: 35, tempMinC: 26, precipitationMm: 0.0, conditionText: "Sunny" },
              { dayName: "Thu", tempMaxC: 35, tempMinC: 25, precipitationMm: 4.1, conditionText: "Passing Clouds" },
              { dayName: "Fri", tempMaxC: 33, tempMinC: 24, precipitationMm: 12.0, conditionText: "Monsoon Showers" },
              { dayName: "Sat", tempMaxC: 32, tempMinC: 24, precipitationMm: 8.5, conditionText: "Light Rain" },
              { dayName: "Sun", tempMaxC: 33, tempMinC: 25, precipitationMm: 1.0, conditionText: "Partly Cloudy" },
              { dayName: "Mon", tempMaxC: 34, tempMinC: 25, precipitationMm: 0.0, conditionText: "Clear" },
            ]).map((day: any, idx: number) => (
              <div
                key={idx}
                className="p-3 rounded-2xl border border-gray-100 dark:border-emerald-950/60 bg-white dark:bg-[#111A14] text-center space-y-1 shadow-2xs"
              >
                <div className="text-xs font-bold text-gray-500">{day.dayName}</div>
                <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                  {day.tempMaxC}° / {day.tempMinC}°
                </div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium flex items-center justify-center gap-0.5">
                  <Droplets className="w-2.5 h-2.5" />
                  {day.precipitationMm} mm
                </div>
                <div className="text-[9px] text-gray-400 truncate">{day.conditionText}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column: Active Tasks & Decision Engines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Pending Agronomic Tasks */}
          <div className="lg:col-span-6 p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  {t.dashboard.pendingTasks}
                </h3>
              </div>
              <Link href="/dashboard/timeline" className="text-xs font-semibold text-emerald-600 hover:underline">
                View Timeline
              </Link>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    task.isCompleted
                      ? "bg-gray-50/50 dark:bg-[#0c140e] border-gray-200 dark:border-emerald-950/60 opacity-60"
                      : "bg-white dark:bg-[#16221A] border-gray-200 dark:border-emerald-900/40 hover:border-emerald-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => {}}
                      className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                    />
                    <div>
                      <div className={`text-xs font-semibold ${task.isCompleted ? "line-through text-gray-500" : "text-gray-900 dark:text-gray-100"}`}>
                        {task.title}
                      </div>
                      <div className="text-[10px] text-gray-400">{task.stage}</div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      task.priority === "URGENT"
                        ? "bg-red-500/10 text-red-600"
                        : task.priority === "HIGH"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quick Launch Engines */}
          <div className="lg:col-span-6 p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
              {t.dashboard.quickTools}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/dashboard/simulator"
                className="p-4 rounded-2xl border border-gray-200 dark:border-emerald-900/30 bg-gray-50/50 dark:bg-[#141F17] hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                    <CloudSunRain className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-gray-900 dark:text-gray-100">Climate What-If</div>
                  <div className="text-[11px] text-gray-500">Test rainfall & temperature stress</div>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 pt-2 flex items-center gap-1">
                  Open Engine <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/dashboard/regret-calculator"
                className="p-4 rounded-2xl border border-gray-200 dark:border-emerald-900/30 bg-gray-50/50 dark:bg-[#141F17] hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-2">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-gray-900 dark:text-gray-100">Regret Calculator</div>
                  <div className="text-[11px] text-gray-500">Minimax crop decision comparison</div>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 pt-2 flex items-center gap-1">
                  Open Engine <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/dashboard/water-budget"
                className="p-4 rounded-2xl border border-gray-200 dark:border-emerald-900/30 bg-gray-50/50 dark:bg-[#141F17] hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-2">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-gray-900 dark:text-gray-100">Water Wallet</div>
                  <div className="text-[11px] text-gray-500">30-day storage & AWD balance</div>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 pt-2 flex items-center gap-1">
                  Open Engine <ArrowRight className="w-3 h-3" />
                </div>
              </Link>

              <Link
                href="/dashboard/advisor"
                className="p-4 rounded-2xl border border-gray-200 dark:border-emerald-900/30 bg-gray-50/50 dark:bg-[#141F17] hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-2">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-gray-900 dark:text-gray-100">Tamil Advisor</div>
                  <div className="text-[11px] text-gray-500">Explainable agronomical guidance</div>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 pt-2 flex items-center gap-1">
                  Ask Questions <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
