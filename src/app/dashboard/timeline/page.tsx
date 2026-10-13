"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CropGrowthStage3D from "@/components/visual/CropGrowthStage3D";
import { useApp } from "@/context/AppContext";
import { CROP_PHENOLOGY, CropStageDefinition } from "@/lib/calculations/cropStages";
import {
  CalendarCheck2,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Info,
} from "lucide-react";

export default function TimelinePage() {
  const { activeFarm, t } = useApp();
  const cropCode = activeFarm?.cropCycles?.[0]?.cropCode || "PADDY";
  const stages = CROP_PHENOLOGY[cropCode] || CROP_PHENOLOGY.PADDY;

  const [currentOrder, setCurrentOrder] = useState(4); // Panicle initiation active
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({
    "T-Sowing-1": true,
    "T-Sowing-2": true,
    "T-Veg-1": true,
  });

  const activeStage = stages.find((s) => s.order === currentOrder) || stages[3];

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const advanceStage = () => {
    if (currentOrder < stages.length) {
      setCurrentOrder(currentOrder + 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Flagship Decision Engine #4
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
              <CalendarCheck2 className="w-7 h-7 text-purple-500" />
              {t.timeline.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t.timeline.subtitle}
            </p>
          </div>

          <button
            onClick={advanceStage}
            disabled={currentOrder >= stages.length}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white flex items-center gap-1.5 shadow-sm transition-all"
          >
            Advance to Stage #{Math.min(stages.length, currentOrder + 1)} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8-Stage Phenological Interactive Visualizer */}
        <CropGrowthStage3D
          cropCode={cropCode}
          currentStageOrder={currentOrder}
          onSelectStage={(name) => {
            const found = stages.find((s) => s.nameEn === name);
            if (found) setCurrentOrder(found.order);
          }}
        />

        {/* Active Stage Detail & Action Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Stage Vulnerabilities */}
          <div className="lg:col-span-5 p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gray-400">STAGE #{activeStage.order} DETAILS</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeStage.criticality === "CRITICAL"
                    ? "bg-red-500/10 text-red-600"
                    : activeStage.criticality === "HIGH"
                    ? "bg-amber-500/10 text-amber-600"
                    : "bg-emerald-500/10 text-emerald-600"
                }`}
              >
                {activeStage.criticality} CRITICALITY
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-gray-100">{activeStage.nameEn}</h3>
              <p className="font-tamil text-emerald-600 dark:text-emerald-400 text-xs font-semibold mt-0.5">
                {activeStage.nameTa}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-emerald-900/30 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Stage Duration:</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{activeStage.durationDays} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Water Consumption Share:</span>
                <span className="font-bold text-blue-600">{activeStage.waterFractionPct}% of Season Total</span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-semibold text-xs text-gray-700 dark:text-gray-300 mb-2">Key Climate Risks at this Stage:</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                {activeStage.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contingency Tasks Checklist */}
          <div className="lg:col-span-7 p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                Stage Action Tasks & Rescue Interventions
              </h3>
              <span className="text-xs text-gray-400">TNAU Agronomy Protocol</span>
            </div>

            <div className="space-y-3">
              {activeStage.tasks.map((task, idx) => {
                const taskId = `task-${activeStage.order}-${idx}`;
                const isDone = completedTaskIds[taskId] || false;
                return (
                  <div
                    key={taskId}
                    onClick={() => toggleTask(taskId)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                      isDone
                        ? "bg-gray-50/50 dark:bg-[#0e1611] border-gray-200 dark:border-emerald-950/60 opacity-60"
                        : "bg-white dark:bg-[#16221A] border-gray-200 dark:border-emerald-900/40 hover:border-emerald-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => {}}
                          className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                        />
                        <span className={`font-bold text-xs sm:text-sm ${isDone ? "line-through text-gray-500" : "text-gray-900 dark:text-gray-100"}`}>
                          {task.titleEn}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {task.trigger}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 pl-6 leading-relaxed">
                      {task.descriptionEn}
                    </p>

                    <p className="font-tamil text-[11px] text-emerald-700 dark:text-emerald-400 pl-6 leading-relaxed">
                      {task.descriptionTa}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
