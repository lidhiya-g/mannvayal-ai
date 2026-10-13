"use client";

import React from "react";
import { Droplet, AlertTriangle, CheckCircle } from "lucide-react";

interface ReservoirProps {
  fillPercentage: number; // 0 to 100
  availableM3: number;
  demandM3: number;
  netBalanceM3: number;
  isDeficit: boolean;
  daysRemaining: number;
}

export default function ReservoirVisualizer({
  fillPercentage,
  availableM3,
  demandM3,
  netBalanceM3,
  isDeficit,
  daysRemaining,
}: ReservoirProps) {
  const clampedFill = Math.max(5, Math.min(100, fillPercentage));

  return (
    <div className="relative p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Farm Reservoir & Borewell Reserve</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Interactive Water Storage Simulation</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border">
          {isDeficit ? (
            <span className="flex items-center gap-1 text-red-600 dark:text-red-400 border-red-500/20 bg-red-500/10">
              <AlertTriangle className="w-3.5 h-3.5" /> Deficit Alert
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
              <CheckCircle className="w-3.5 h-3.5" /> Buffer Sufficient
            </span>
          )}
        </div>
      </div>

      {/* 3D-styled Tank Visualization */}
      <div className="relative w-full h-44 rounded-2xl bg-gray-100 dark:bg-[#080D0A] border border-gray-200 dark:border-emerald-950 overflow-hidden flex flex-col justify-end p-2">
        {/* Metric Graduation Marks */}
        <div className="absolute top-2 left-3 text-[10px] text-gray-400 dark:text-gray-500 font-mono">100% Capacity</div>
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-[10px] text-gray-400 dark:text-gray-500 font-mono">50% Storage</div>
        <div className="absolute bottom-2 left-3 text-[10px] text-gray-400 dark:text-gray-500 font-mono">0% Critical</div>

        {/* Animated Water Body */}
        <div
          className={`relative w-full rounded-xl transition-all duration-700 ease-out flex items-center justify-center overflow-hidden ${
            isDeficit
              ? "bg-gradient-to-t from-amber-600/70 to-blue-500/70"
              : "bg-gradient-to-t from-blue-700 to-cyan-500"
          }`}
          style={{ height: `${clampedFill}%` }}
        >
          {/* Wave effect overlay */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent animate-pulse" />
          
          <div className="relative text-white font-bold text-xs sm:text-sm drop-shadow">
            {availableM3.toLocaleString("en-IN")} m³ Available ({Math.round(clampedFill)}%)
          </div>
        </div>

        {/* Crop Demand Target Threshold Line */}
        <div
          className="absolute left-0 right-0 border-t-2 border-dashed border-red-500 pointer-events-none flex justify-end pr-3"
          style={{ bottom: `${Math.min(95, (demandM3 / Math.max(availableM3 * 1.5, 1)) * 100)}%` }}
        >
          <span className="text-[10px] font-semibold text-red-500 bg-white/90 dark:bg-black/90 px-1 rounded -translate-y-1/2">
            Demand: {demandM3.toLocaleString("en-IN")} m³
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#16221A] border border-gray-100 dark:border-emerald-900/30">
          <div className="text-[11px] text-gray-500 dark:text-gray-400">Available Storage</div>
          <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{availableM3.toLocaleString("en-IN")} m³</div>
        </div>
        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#16221A] border border-gray-100 dark:border-emerald-900/30">
          <div className="text-[11px] text-gray-500 dark:text-gray-400">Net Balance</div>
          <div className={`text-sm font-bold ${netBalanceM3 < 0 ? "text-red-500" : "text-emerald-500"}`}>
            {netBalanceM3 > 0 ? "+" : ""}{netBalanceM3.toLocaleString("en-IN")} m³
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#16221A] border border-gray-100 dark:border-emerald-900/30">
          <div className="text-[11px] text-gray-500 dark:text-gray-400">Days Remaining</div>
          <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {daysRemaining > 100 ? "100+ Days" : `${daysRemaining} Days`}
          </div>
        </div>
      </div>
    </div>
  );
}
