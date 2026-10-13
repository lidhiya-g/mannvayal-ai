"use client";

import React from "react";
import { CROP_PHENOLOGY } from "@/lib/calculations/cropStages";
import { CheckCircle2, ChevronRight, AlertCircle, Droplets } from "lucide-react";

interface CropGrowthProps {
  cropCode: string;
  currentStageOrder?: number;
  onSelectStage?: (stageName: string) => void;
}

export default function CropGrowthStage3D({
  cropCode = "PADDY",
  currentStageOrder = 4,
  onSelectStage,
}: CropGrowthProps) {
  const stages = CROP_PHENOLOGY[cropCode] || CROP_PHENOLOGY.PADDY;

  return (
    <div className="w-full p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Crop Phenology & Vulnerability Timeline</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">8 Stage-Specific Resilience Windows (TNAU / FAO-33)</p>
        </div>
        <div className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Stage {currentStageOrder} of 8 Active
        </div>
      </div>

      {/* Horizontal Stage Sequence */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {stages.map((st) => {
          const isActive = st.order === currentStageOrder;
          const isPassed = st.order < currentStageOrder;

          let badgeColor = "bg-gray-100 dark:bg-emerald-950/40 text-gray-600 dark:text-gray-400";
          if (st.criticality === "CRITICAL") badgeColor = "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
          else if (st.criticality === "HIGH") badgeColor = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";

          return (
            <div
              key={st.stageCode}
              onClick={() => onSelectStage && onSelectStage(st.nameEn)}
              className={`cursor-pointer rounded-2xl p-3 border transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-[#132B1E]"
                  : isPassed
                  ? "border-gray-200 dark:border-emerald-900/40 bg-gray-50/50 dark:bg-[#111A14] opacity-80"
                  : "border-gray-200 dark:border-emerald-900/20 bg-white dark:bg-[#0A120D] hover:border-emerald-400"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold font-mono text-gray-400">#{st.order}</span>
                  {isPassed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : isActive ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700" />
                  )}
                </div>

                <div className="font-semibold text-xs text-gray-900 dark:text-gray-100 line-clamp-1 mb-0.5">
                  {st.nameEn.split("/")[0]}
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1 mb-2 font-tamil">
                  {st.nameTa}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-emerald-900/30 flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400 font-medium">
                  <Droplets className="w-3 h-3" /> {st.waterFractionPct}%
                </span>
                <span className={`px-1.5 py-0.5 rounded font-semibold text-[9px] border ${badgeColor}`}>
                  {st.criticality}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
