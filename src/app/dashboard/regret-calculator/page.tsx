"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { calculateCropRegret, CandidateCropInput, CLIMATE_SCENARIOS } from "@/lib/calculations/regretCalculator";
import {
  Calculator,
  Plus,
  Trash2,
  Sparkles,
  AlertTriangle,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function RegretCalculatorPage() {
  const { t, activeFarm } = useApp();

  const [candidates, setCandidates] = useState<CandidateCropInput[]>([
    {
      id: "C1",
      cropCode: "PADDY",
      cropName: "Paddy (Traditional Wetland)",
      farmAreaAcres: activeFarm?.totalArea || 3.0,
      seedCostInr: 2500,
      fertilizerCostInr: 6500,
      labourCostInr: 14000,
      irrigationCostInr: 3500,
      otherInputCostsInr: 2000,
      expectedYieldKgPerAcre: 2400,
      expectedSellingPricePerKg: 23.5,
    },
    {
      id: "C2",
      cropCode: "RAGI",
      cropName: "Finger Millet / Ragi (Climate-Resilient)",
      farmAreaAcres: activeFarm?.totalArea || 3.0,
      seedCostInr: 1200,
      fertilizerCostInr: 2800,
      labourCostInr: 6500,
      irrigationCostInr: 1000,
      otherInputCostsInr: 1500,
      expectedYieldKgPerAcre: 1100,
      expectedSellingPricePerKg: 42.9,
    },
    {
      id: "C3",
      cropCode: "GROUNDNUT",
      cropName: "Groundnut (Legume Cash Crop)",
      farmAreaAcres: activeFarm?.totalArea || 3.0,
      seedCostInr: 4500,
      fertilizerCostInr: 4000,
      labourCostInr: 8500,
      irrigationCostInr: 1500,
      otherInputCostsInr: 2000,
      expectedYieldKgPerAcre: 1050,
      expectedSellingPricePerKg: 67.8,
    },
  ]);

  const [analysis, setAnalysis] = useState(() => calculateCropRegret(candidates));

  const handleUpdateCandidate = (index: number, field: keyof CandidateCropInput, value: any) => {
    const updated = [...candidates];
    updated[index] = { ...updated[index], [field]: value };
    setCandidates(updated);
    setAnalysis(calculateCropRegret(updated));
  };

  const addCandidate = () => {
    const newCrop: CandidateCropInput = {
      id: `C${Date.now()}`,
      cropCode: "COTTON",
      cropName: "Cotton / Kapas",
      farmAreaAcres: activeFarm?.totalArea || 3.0,
      seedCostInr: 3500,
      fertilizerCostInr: 5000,
      labourCostInr: 12000,
      irrigationCostInr: 2500,
      otherInputCostsInr: 2500,
      expectedYieldKgPerAcre: 900,
      expectedSellingPricePerKg: 75.2,
    };
    const updated = [...candidates, newCrop];
    setCandidates(updated);
    setAnalysis(calculateCropRegret(updated));
  };

  const removeCandidate = (id: string) => {
    if (candidates.length <= 1) return;
    const updated = candidates.filter((c) => c.id !== id);
    setCandidates(updated);
    setAnalysis(calculateCropRegret(updated));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Flagship Decision Engine #2
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
            <Calculator className="w-7 h-7 text-emerald-500" />
            {t.regret.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t.regret.subtitle}
          </p>
        </div>

        {/* Minimax Regret Highlight Banner */}
        <div className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-[#102418] shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <h2 className="font-bold text-sm sm:text-base text-emerald-950 dark:text-emerald-100">
                Minimax Regret Recommendation: {analysis.minimaxCropName}
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-600 text-white w-fit">
              Safest Capital Preservation Choice
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
            {analysis.keyInsightsEn.map((insight, idx) => (
              <p key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{insight}</span>
              </p>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-500/20 text-[11px] font-tamil text-emerald-800 dark:text-emerald-300">
            {analysis.keyInsightsTa[0]}
          </div>
        </div>

        {/* Candidate Crop Cards (Inputs) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
              Candidate Crop Plans ({candidates.length})
            </h3>
            <button
              onClick={addCandidate}
              className="px-3.5 py-1.5 rounded-xl border border-emerald-600/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Alternative Crop
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.map((c, idx) => {
              const summary = analysis.candidateSummary.find((s) => s.cropId === c.id);
              return (
                <div
                  key={c.id}
                  className={`p-5 rounded-3xl border bg-white dark:bg-[#111A14] transition-all space-y-4 ${
                    summary?.isMinimaxRecommendation
                      ? "border-emerald-500 ring-2 ring-emerald-500/20"
                      : "border-gray-200 dark:border-emerald-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">Plan #{idx + 1}</span>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 line-clamp-1">{c.cropName}</h4>
                    </div>
                    {candidates.length > 1 && (
                      <button
                        onClick={() => removeCandidate(c.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                        title="Remove crop"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Input Cost Breakdown */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <label className="text-gray-500 block">Seeds / Acre (₹)</label>
                      <input
                        type="number"
                        value={c.seedCostInr}
                        onChange={(e) => handleUpdateCandidate(idx, "seedCostInr", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-emerald-900/50 bg-transparent font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 block">Fertilizer (₹)</label>
                      <input
                        type="number"
                        value={c.fertilizerCostInr}
                        onChange={(e) => handleUpdateCandidate(idx, "fertilizerCostInr", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-emerald-900/50 bg-transparent font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 block">Labour / Acre (₹)</label>
                      <input
                        type="number"
                        value={c.labourCostInr}
                        onChange={(e) => handleUpdateCandidate(idx, "labourCostInr", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-emerald-900/50 bg-transparent font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 block">Irrigation (₹)</label>
                      <input
                        type="number"
                        value={c.irrigationCostInr}
                        onChange={(e) => handleUpdateCandidate(idx, "irrigationCostInr", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-emerald-900/50 bg-transparent font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 block">Yield (Kg/Acre)</label>
                      <input
                        type="number"
                        value={c.expectedYieldKgPerAcre}
                        onChange={(e) => handleUpdateCandidate(idx, "expectedYieldKgPerAcre", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-emerald-900/50 bg-transparent font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 block">Price / Kg (₹)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={c.expectedSellingPricePerKg}
                        onChange={(e) => handleUpdateCandidate(idx, "expectedSellingPricePerKg", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded-lg border border-gray-200 dark:border-emerald-900/50 bg-transparent font-mono"
                      />
                    </div>
                  </div>

                  {/* Calculated KPI Box */}
                  <div className="pt-3 border-t border-gray-100 dark:border-emerald-900/30 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Cultivation Cost:</span>
                      <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                        ₹{summary?.totalCostInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Normal Net Return:</span>
                      <span className="font-mono font-bold text-emerald-600">
                        ₹{summary?.normalNetReturnInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Severe Drought Worst Case:</span>
                      <span className={`font-mono font-bold ${summary?.worstCaseNetReturnInr! < 0 ? "text-red-500" : "text-gray-700"}`}>
                        ₹{summary?.worstCaseNetReturnInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-gray-100 dark:border-emerald-900/20">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Maximum Regret:</span>
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                        ₹{summary?.maxRegretInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5-State Scenario Payoff & Regret Matrix */}
        <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                Decision Payoff Matrix Across 5 Climate States
              </h3>
              <p className="text-xs text-gray-500">
                Net returns (₹) and calculated regret vs optimal choice in each weather state
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
              Savage Minimax Matrix
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-emerald-950 text-gray-500 font-semibold">
                  <th className="py-2.5 px-3">Climate State</th>
                  {candidates.map((c) => (
                    <th key={c.id} className="py-2.5 px-3 font-semibold text-gray-800 dark:text-gray-200">
                      {c.cropName.split(" ")[0]} (Net / Regret)
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-emerald-950/60 font-mono">
                {CLIMATE_SCENARIOS.map((sc) => (
                  <tr key={sc.key} className="hover:bg-gray-50/50 dark:hover:bg-[#16221A]/50">
                    <td className="py-3 px-3 font-sans font-medium text-gray-800 dark:text-gray-200">
                      <div>{sc.nameEn}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{sc.probabilityLabel}</div>
                    </td>
                    {candidates.map((c) => {
                      const outcome = analysis.scenarioOutcomes.find(
                        (o) => o.cropId === c.id && o.scenarioKey === sc.key
                      );
                      return (
                        <td key={c.id} className="py-3 px-3">
                          <div className={outcome?.netReturnInr! < 0 ? "text-red-500 font-bold" : "text-emerald-600 font-bold"}>
                            ₹{outcome?.netReturnInr.toLocaleString("en-IN")}
                          </div>
                          <div className="text-[10px] text-amber-600 dark:text-amber-400">
                            Regret: ₹{outcome?.regretInr.toLocaleString("en-IN")}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-800 dark:text-amber-300/80 text-[11px] leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <div>{analysis.decisionDisclaimer}</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
