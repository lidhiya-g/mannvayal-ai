"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReservoirVisualizer from "@/components/visual/ReservoirVisualizer";
import { useApp } from "@/context/AppContext";
import { calculateWaterBudget, WaterBudgetResult, WaterBudgetInput } from "@/lib/calculations/waterBudget";
import { Droplets, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, Info, ArrowRight } from "lucide-react";

export default function WaterBudgetPage() {
  const { activeFarm, t } = useApp();

  const [farmAreaValue, setFarmAreaValue] = useState(activeFarm?.totalArea || 3.0);
  const [areaUnit, setAreaUnit] = useState<"ACRES" | "HECTARES" | "CENTS">("ACRES");
  const [cropCode, setCropCode] = useState("PADDY");
  const [cropStage, setCropStage] = useState("Flowering / Panicle Initiation");
  const [planningPeriodDays, setPlanningPeriodDays] = useState(30);
  const [availableWaterVolumeM3, setAvailableWaterVolumeM3] = useState(3800);
  const [storageCapacityM3, setStorageCapacityM3] = useState(5000);
  const [expectedRainfallMm, setExpectedRainfallMm] = useState(55);
  const [irrigationMethod, setIrrigationMethod] = useState<"FLOOD" | "FURROW" | "DRIP" | "SPRINKLER" | "AWD_PADDY">("FLOOD");
  const [soilTexture, setSoilTexture] = useState<"CLAY_LOAM" | "SANDY_LOAM" | "RED_SOIL" | "BLACK_COTTON">("CLAY_LOAM");

  const [budget, setBudget] = useState<WaterBudgetResult>(() => {
    return calculateWaterBudget({
      farmAreaValue: 3.0,
      areaUnit: "ACRES",
      cropCode: "PADDY",
      cropStage: "Flowering / Panicle Initiation",
      planningPeriodDays: 30,
      availableWaterVolumeM3: 3800,
      storageCapacityM3: 5000,
      expectedRainfallMm: 55,
      irrigationMethod: "FLOOD",
      soilTexture: "CLAY_LOAM",
    });
  });

  const recalculate = () => {
    const res = calculateWaterBudget({
      farmAreaValue: Number(farmAreaValue),
      areaUnit,
      cropCode,
      cropStage,
      planningPeriodDays: Number(planningPeriodDays),
      availableWaterVolumeM3: Number(availableWaterVolumeM3),
      storageCapacityM3: Number(storageCapacityM3),
      expectedRainfallMm: Number(expectedRainfallMm),
      irrigationMethod,
      soilTexture,
    });
    setBudget(res);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Flagship Decision Engine #3
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
            <Droplets className="w-7 h-7 text-blue-500" />
            {t.water.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t.water.subtitle}
          </p>
        </div>

        {/* 2-Column: Visualizer & Parameters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 3D Reservoir Visualizer & KPIs */}
          <div className="lg:col-span-7 space-y-6">
            <ReservoirVisualizer
              fillPercentage={budget.reservoirFillPct}
              availableM3={budget.availableWaterSupplyM3}
              demandM3={budget.grossIrrigationDemandM3}
              netBalanceM3={budget.netWaterBalanceM3}
              isDeficit={budget.isDeficit}
              daysRemaining={budget.daysOfWaterRemaining}
            />

            {/* Stage Water Rationing Guidance */}
            <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Agronomic Water Allocation Advice (TNAU / FAO-56)
              </h3>

              <div className="space-y-2 text-xs">
                {budget.allocationAdviceEn.map((adv, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-[#16221A] text-gray-700 dark:text-gray-300">
                    {adv}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-emerald-900/30 text-[11px] font-tamil text-emerald-700 dark:text-emerald-400">
                {budget.allocationAdviceTa[0]}
              </div>

              {/* Water saving potential with AWD or Drip */}
              {budget.waterSavingWithDripM3 > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs">
                  <strong>Micro-Irrigation Conservation:</strong> Shifting to drip irrigation would save{" "}
                  <strong>{budget.waterSavingWithDripM3.toLocaleString("en-IN")} m³</strong> of water over this {planningPeriodDays}-day period.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Input Parameters Form */}
          <div className="lg:col-span-5 p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
              Water Wallet Controls
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Planning Period</label>
                <select
                  value={planningPeriodDays}
                  onChange={(e) => {
                    setPlanningPeriodDays(Number(e.target.value));
                    recalculate();
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14]"
                >
                  <option value="15">15 Days (Critical Window)</option>
                  <option value="30">30 Days (Stage Window)</option>
                  <option value="60">60 Days (Mid-Season)</option>
                  <option value="90">90 Days (Full Season)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Irrigation Method</label>
                <select
                  value={irrigationMethod}
                  onChange={(e) => {
                    setIrrigationMethod(e.target.value as any);
                    recalculate();
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14]"
                >
                  <option value="FLOOD">Flood (வாய்க்கால் - 40% Eff)</option>
                  <option value="AWD_PADDY">AWD Paddy (காய்ச்சலும் பாய்ச்சலும் - 70%)</option>
                  <option value="FURROW">Furrow (பார் பாசனம் - 60%)</option>
                  <option value="SPRINKLER">Sprinkler (தெளிப்பு நீர் - 75%)</option>
                  <option value="DRIP">Drip (சொட்டு நீர் - 90%)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-gray-700 dark:text-gray-300">Available Water Supply:</span>
                <span className="font-mono text-blue-600 font-bold">{availableWaterVolumeM3.toLocaleString("en-IN")} m³</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={availableWaterVolumeM3}
                onChange={(e) => {
                  setAvailableWaterVolumeM3(Number(e.target.value));
                  recalculate();
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="text-[10px] text-gray-400">
                Combined storage across borewell pumping quota and farm pond
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-gray-700 dark:text-gray-300">Expected Rainfall (mm):</span>
                <span className="font-mono text-emerald-600 font-bold">{expectedRainfallMm} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                step="5"
                value={expectedRainfallMm}
                onChange={(e) => {
                  setExpectedRainfallMm(Number(e.target.value));
                  recalculate();
                }}
                className="w-full accent-emerald-600 cursor-pointer"
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
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Growth Stage</label>
                <select
                  value={cropStage}
                  onChange={(e) => {
                    setCropStage(e.target.value);
                    recalculate();
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14]"
                >
                  <option value="Vegetative">Vegetative (Kc=1.10)</option>
                  <option value="Flowering / Panicle Initiation">Flowering (Kc=1.35 Peak)</option>
                  <option value="Grain Filling">Grain Filling (Kc=1.20)</option>
                  <option value="Maturity">Maturity (Kc=0.90)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Land Area</label>
                <input
                  type="number"
                  step="0.5"
                  value={farmAreaValue}
                  onChange={(e) => {
                    setFarmAreaValue(Number(e.target.value));
                    recalculate();
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Area Unit</label>
                <select
                  value={areaUnit}
                  onChange={(e) => {
                    setAreaUnit(e.target.value as any);
                    recalculate();
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14]"
                >
                  <option value="ACRES">Acres</option>
                  <option value="HECTARES">Hectares</option>
                  <option value="CENTS">Cents</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={recalculate}
              className="w-full py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 mt-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" /> Recalculate Water Balance
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
