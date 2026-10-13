"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { runClimateSimulation, SimulatorResult } from "@/lib/calculations/climateSimulator";
import {
  CloudSunRain,
  Sparkles,
  AlertTriangle,
  Droplets,
  TrendingDown,
  Save,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Info,
} from "lucide-react";

export default function ClimateSimulatorPage() {
  const { activeFarm, t } = useApp();

  const [cropCode, setCropCode] = useState("PADDY");
  const [currentStage, setCurrentStage] = useState("Flowering / Panicle Initiation");
  const [farmAreaAcres, setFarmAreaAcres] = useState(activeFarm?.totalArea || 3.0);
  const [soilType, setSoilType] = useState(activeFarm?.soilType || "Clay Loam");
  const [baselineRainfallMm, setBaselineRainfallMm] = useState(650);
  const [rainfallAnomalyPct, setRainfallAnomalyPct] = useState(-30);
  const [drySpellDurationDays, setDrySpellDurationDays] = useState(12);
  const [temperatureAnomalyC, setTemperatureAnomalyC] = useState(1.8);
  const [availableWaterM3, setAvailableWaterM3] = useState(1500);
  const [hasBorewellOrCanal, setHasBorewellOrCanal] = useState(true);

  const [scenarioName, setScenarioName] = useState("Delayed Northeast Monsoon Simulation");
  const [results, setResults] = useState<SimulatorResult | null>(() => {
    return runClimateSimulation({
      cropCode: "PADDY",
      farmAreaAcres: 3.0,
      soilType: "Clay Loam",
      sowingDate: "2026-08-10",
      currentStage: "Flowering / Panicle Initiation",
      baselineRainfallMm: 650,
      rainfallAnomalyPct: -30,
      drySpellDurationDays: 12,
      temperatureAnomalyC: 1.8,
      availableWaterM3: 1500,
      hasBorewellOrCanal: true,
    });
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  // Quick Preset Scenarios
  const applyPreset = (preset: string) => {
    if (preset === "BASELINE") {
      setRainfallAnomalyPct(0);
      setDrySpellDurationDays(3);
      setTemperatureAnomalyC(0);
      setScenarioName("Historical Normal Monsoon (Baseline)");
    } else if (preset === "DELAYED_MONSOON") {
      setRainfallAnomalyPct(-20);
      setDrySpellDurationDays(14);
      setTemperatureAnomalyC(1.2);
      setScenarioName("Delayed Monsoon Onset (25+ Days)");
    } else if (preset === "DEFICIT_35") {
      setRainfallAnomalyPct(-35);
      setDrySpellDurationDays(15);
      setTemperatureAnomalyC(1.5);
      setScenarioName("Deficit Monsoon (-35% Rainfall)");
    } else if (preset === "SEVERE_DROUGHT") {
      setRainfallAnomalyPct(-50);
      setDrySpellDurationDays(22);
      setTemperatureAnomalyC(2.8);
      setScenarioName("Severe Drought & Heatwave Stress");
    }
    recalculate();
  };

  const recalculate = () => {
    const res = runClimateSimulation({
      cropCode,
      farmAreaAcres: Number(farmAreaAcres),
      soilType,
      sowingDate: "2026-08-10",
      currentStage,
      baselineRainfallMm: Number(baselineRainfallMm),
      rainfallAnomalyPct: Number(rainfallAnomalyPct),
      drySpellDurationDays: Number(drySpellDurationDays),
      temperatureAnomalyC: Number(temperatureAnomalyC),
      availableWaterM3: Number(availableWaterM3),
      hasBorewellOrCanal,
    });
    setResults(res);
    setSavedSuccess(false);
  };

  const handleSaveScenario = async () => {
    setSaving(true);
    try {
      await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmId: activeFarm?.id,
          scenarioName,
          cropCode,
          farmAreaAcres,
          soilType,
          currentStage,
          baselineRainfallMm,
          rainfallAnomalyPct,
          drySpellDurationDays,
          temperatureAnomalyC,
          availableWaterM3,
          hasBorewellOrCanal,
          save: true,
        }),
      });
      setSavedSuccess(true);
    } catch (e) {
      console.error("Save scenario failed:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Flagship Decision Engine #1
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
            <CloudSunRain className="w-7 h-7 text-amber-500" />
            {t.simulator.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t.simulator.subtitle}
          </p>
        </div>

        {/* Preset Buttons Bar */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-gray-100 dark:bg-[#111A14] border border-gray-200 dark:border-emerald-950 text-xs">
          <span className="font-semibold text-gray-700 dark:text-gray-300 px-1">Presets:</span>
          <button
            onClick={() => applyPreset("BASELINE")}
            className="px-3 py-1.5 rounded-xl border bg-white dark:bg-[#16221A] text-gray-800 dark:text-gray-200 hover:border-emerald-500 font-medium"
          >
            Normal Monsoon
          </button>
          <button
            onClick={() => applyPreset("DELAYED_MONSOON")}
            className="px-3 py-1.5 rounded-xl border bg-white dark:bg-[#16221A] text-gray-800 dark:text-gray-200 hover:border-emerald-500 font-medium"
          >
            Delayed Monsoon
          </button>
          <button
            onClick={() => applyPreset("DEFICIT_35")}
            className="px-3 py-1.5 rounded-xl border bg-white dark:bg-[#16221A] text-gray-800 dark:text-gray-200 hover:border-emerald-500 font-medium"
          >
            Deficit (-35%)
          </button>
          <button
            onClick={() => applyPreset("SEVERE_DROUGHT")}
            className="px-3 py-1.5 rounded-xl border bg-white dark:bg-[#16221A] text-gray-800 dark:text-gray-200 hover:border-emerald-500 font-medium text-red-600 dark:text-red-400"
          >
            Severe Drought (+Heat)
          </button>
        </div>

        {/* 2-Column: Interactive Input Controls + Simulation Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Scenario Sliders */}
          <div className="lg:col-span-5 p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-5 text-xs sm:text-sm">
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
              Scenario Parameters
            </h3>

            <div>
              <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Simulation Label
              </label>
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Crop</label>
                <select
                  value={cropCode}
                  onChange={(e) => {
                    setCropCode(e.target.value);
                    recalculate();
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14]"
                >
                  <option value="PADDY">Paddy (நெல்)</option>
                  <option value="RAGI">Finger Millet (கேழ்வரகு)</option>
                  <option value="GROUNDNUT">Groundnut (வேர்க்கடலை)</option>
                  <option value="COTTON">Cotton (பருத்தி)</option>
                  <option value="MAIZE">Maize (மக்காச்சோளம்)</option>
                  <option value="RED_GRAM">Red Gram (துவரை)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Growth Stage</label>
                <select
                  value={currentStage}
                  onChange={(e) => {
                    setCurrentStage(e.target.value);
                    recalculate();
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14]"
                >
                  <option value="Sowing / Nursery">Sowing / Nursery</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering / Panicle Initiation">Flowering / Panicle</option>
                  <option value="Grain Filling">Grain Filling</option>
                  <option value="Maturity">Maturity</option>
                </select>
              </div>
            </div>

            {/* Rainfall Anomaly Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-700 dark:text-gray-300">Rainfall Anomaly:</span>
                <span className={rainfallAnomalyPct < 0 ? "text-red-500 font-bold" : "text-emerald-500 font-bold"}>
                  {rainfallAnomalyPct > 0 ? "+" : ""}{rainfallAnomalyPct}%
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={rainfallAnomalyPct}
                onChange={(e) => {
                  setRainfallAnomalyPct(Number(e.target.value));
                  recalculate();
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>-50% (Drought)</span>
                <span>Normal (0%)</span>
                <span>+50% (Surplus)</span>
              </div>
            </div>

            {/* Dry Spell Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-700 dark:text-gray-300">Dry-Spell Duration:</span>
                <span className="text-amber-500 font-bold">{drySpellDurationDays} Days</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={drySpellDurationDays}
                onChange={(e) => {
                  setDrySpellDurationDays(Number(e.target.value));
                  recalculate();
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Temperature Rise Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-700 dark:text-gray-300">Temperature Rise:</span>
                <span className="text-rose-500 font-bold">+{temperatureAnomalyC}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="5.0"
                step="0.5"
                value={temperatureAnomalyC}
                onChange={(e) => {
                  setTemperatureAnomalyC(Number(e.target.value));
                  recalculate();
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Soil and Area */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Soil Texture</label>
                <select
                  value={soilType}
                  onChange={(e) => {
                    setSoilType(e.target.value);
                    recalculate();
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14]"
                >
                  <option value="Clay Loam">Clay Loam</option>
                  <option value="Black Cotton Soil">Black Cotton Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Sandy Loam">Sandy Loam</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={farmAreaAcres}
                  onChange={(e) => {
                    setFarmAreaAcres(Number(e.target.value));
                    recalculate();
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={recalculate}
                className="w-full py-3 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Run Simulation
              </button>
            </div>
          </div>

          {/* Right Column: Simulation Analytical Results */}
          <div className="lg:col-span-7 space-y-6">
            {results && (
              <>
                {/* Result KPI Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 text-center">
                    <div className="text-[11px] text-gray-500">Risk Score</div>
                    <div className="text-2xl font-black text-gray-900 dark:text-gray-100 my-1">
                      {results.riskScore} / 100
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        results.riskCategory === "CRITICAL"
                          ? "bg-red-500/10 text-red-600"
                          : results.riskCategory === "HIGH"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-emerald-500/10 text-emerald-600"
                      }`}
                    >
                      {results.riskCategory}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 text-center">
                    <div className="text-[11px] text-gray-500">Yield Impact</div>
                    <div className="text-2xl font-black text-rose-600 my-1">
                      {results.estimatedYieldImpactPct}%
                    </div>
                    <span className="text-[10px] text-gray-400">
                      Range: {results.uncertaintyRangePct.min}% to {results.uncertaintyRangePct.max}%
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 text-center">
                    <div className="text-[11px] text-gray-500">Water Shortfall</div>
                    <div className="text-2xl font-black text-blue-600 my-1">
                      {results.waterDeficitMm} mm
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {results.waterDeficitM3.toLocaleString("en-IN")} m³ Vol.
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 text-center">
                    <div className="text-[11px] text-gray-500">Estimated Downside</div>
                    <div className="text-xl font-black text-gray-900 dark:text-gray-100 my-1">
                      ₹{results.estimatedFinancialDownsideInr.toLocaleString("en-IN")}
                    </div>
                    <span className="text-[10px] text-gray-400">At current MSP</span>
                  </div>
                </div>

                {/* Rainfall Comparison Card */}
                <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                    Rainfall & Crop Water Demand Balance
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Simulated Seasonal Rain:</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{results.simulatedRainfallMm} mm (Baseline: {baselineRainfallMm} mm)</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(100, (results.simulatedRainfallMm / 1200) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Paddy Cumulative Demand:</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{results.cropTotalWaterDemandMm} mm</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${Math.min(100, (results.cropTotalWaterDemandMm / 1200) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agronomic Contingency Recommendations */}
                <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {t.simulator.recommendations}
                    </h4>
                    <span className="text-[10px] text-gray-400">TNAU / ICAR Calibrated</span>
                  </div>

                  <div className="space-y-3">
                    {results.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-4 rounded-2xl border border-gray-100 dark:border-emerald-950/60 bg-gray-50/50 dark:bg-[#141F17] space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900 dark:text-gray-100">{rec.titleEn}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              rec.priority === "URGENT"
                                ? "bg-red-500/10 text-red-600"
                                : "bg-amber-500/10 text-amber-600"
                            }`}
                          >
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{rec.descriptionEn}</p>
                        <p className="font-tamil text-emerald-700 dark:text-emerald-400 text-[11px] leading-relaxed">
                          {rec.descriptionTa}
                        </p>
                        <div className="text-[10px] text-gray-400 pt-1 border-t border-gray-100 dark:border-emerald-950/40">
                          <strong>Scientific Basis:</strong> {rec.agronomicBasis}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Save Scenario Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={handleSaveScenario}
                      disabled={saving || savedSuccess}
                      className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      {savedSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-white" /> Saved to Farm History
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Simulation Run"}
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-gray-400">
                      Saves to your farm scenario history
                    </span>
                  </div>
                </div>

                {/* Educational Disclaimer */}
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-800 dark:text-amber-300/80 text-[11px] leading-relaxed flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    {results.dataFreshnessNotice} {results.scientificReference}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
