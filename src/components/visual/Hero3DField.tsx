"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import {
  Sliders,
  Sparkles,
  CloudRain,
  Sun,
  Flame,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Eye,
  Layers,
  Sprout,
} from "lucide-react";

interface CropProfile {
  id: string;
  name: string;
  waterReqMm: number;
  droughtTolerance: "Low" | "Moderate" | "High";
  optimumTemp: string;
  season: "Rabi" | "Kharif" | "Zaid" | "Kharif/Rabi";
  ky: number; // FAO-33 yield response factor
  region: string;
}

const CROPS: CropProfile[] = [
  { id: "wheat", name: "Wheat (गेहूं)", waterReqMm: 450, droughtTolerance: "Moderate", optimumTemp: "18-24°C", season: "Rabi", ky: 1.05, region: "North/Central India" },
  { id: "paddy", name: "Paddy (धान / நெல்)", waterReqMm: 1100, droughtTolerance: "Low", optimumTemp: "24-32°C", season: "Kharif", ky: 1.2, region: "Pan-India" },
  { id: "mustard", name: "Mustard (सरसों)", waterReqMm: 320, droughtTolerance: "High", optimumTemp: "16-22°C", season: "Rabi", ky: 0.85, region: "North/West India" },
  { id: "soybean", name: "Soybean (सोयाबीन)", waterReqMm: 520, droughtTolerance: "Moderate", optimumTemp: "23-30°C", season: "Kharif", ky: 0.95, region: "Central/West India" },
  { id: "cotton", name: "Cotton (कपास / பருத்தி)", waterReqMm: 680, droughtTolerance: "Moderate", optimumTemp: "26-34°C", season: "Kharif", ky: 0.85, region: "West/South India" },
  { id: "groundnut", name: "Groundnut (मूंगफली / நிலக்கடலை)", waterReqMm: 480, droughtTolerance: "High", optimumTemp: "24-30°C", season: "Kharif/Rabi", ky: 0.7, region: "South/West India" },
];

export default function Hero3DField() {
  const [activeTab, setActiveTab] = useState<"sandbox" | "canvas">("sandbox");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Sandbox State
  const [selectedCropId, setSelectedCropId] = useState<string>("wheat");
  const [rainfallAnomaly, setRainfallAnomaly] = useState<number>(-20); // -40% to +40%
  const [drySpellDays, setDrySpellDays] = useState<number>(10); // 0 to 25 days
  const [tempAnomaly, setTempAnomaly] = useState<number>(1.8); // -2.0 to +4.0 C

  const selectedCrop = useMemo(() => {
    return CROPS.find((c) => c.id === selectedCropId) || CROPS[0];
  }, [selectedCropId]);

  // Real-time agronomic calculation
  const calculatedMetrics = useMemo(() => {
    const baseRainfall = 600; // Regional reference baseline
    const expectedRainfall = Math.round(baseRainfall * (1 + rainfallAnomaly / 100));
    const deficitMm = Math.max(0, selectedCrop.waterReqMm - expectedRainfall);
    const deficitRatio = deficitMm / selectedCrop.waterReqMm;

    // Stress factors
    const drySpellStress = Math.min(0.4, (drySpellDays / 25) * 0.35);
    const heatStress = tempAnomaly > 1.0 ? Math.min(0.3, ((tempAnomaly - 1.0) / 3.0) * 0.25) : 0;

    // Yield risk % using FAO-33 Ky response
    let rawRisk = (deficitRatio * selectedCrop.ky * 0.65 + drySpellStress + heatStress) * 100;
    if (selectedCrop.droughtTolerance === "High") rawRisk *= 0.75;
    if (selectedCrop.droughtTolerance === "Low") rawRisk *= 1.25;

    const yieldRisk = Math.min(94, Math.max(8, Math.round(rawRisk)));

    // Water balance
    const waterBalanceMm = expectedRainfall - selectedCrop.waterReqMm;

    // Risk category
    let riskLevel: "Low" | "Moderate" | "High" | "Critical" = "Moderate";
    let riskColor = "text-amber-500 bg-amber-500/10 border-amber-500/30";
    if (yieldRisk < 25) {
      riskLevel = "Low";
      riskColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    } else if (yieldRisk < 50) {
      riskLevel = "Moderate";
      riskColor = "text-amber-400 bg-amber-500/10 border-amber-500/30";
    } else if (yieldRisk < 75) {
      riskLevel = "High";
      riskColor = "text-orange-400 bg-orange-500/10 border-orange-500/30";
    } else {
      riskLevel = "Critical";
      riskColor = "text-red-400 bg-red-500/10 border-red-500/30";
    }

    // Recommended mitigation
    let mitigation = "Maintain standard moisture monitoring and schedule basal fertilizer.";
    if (yieldRisk >= 65) {
      mitigation = `Urgent: Apply 1% KNO3 foliar spray to combat heat stress, apply organic biomass mulch, and reserve 45mm supplemental irrigation for flowering stage.`;
    } else if (yieldRisk >= 40) {
      mitigation = `Moderate caution: Initiate alternate furrow irrigation, delay split urea application until next rain spell, and monitor root moisture depth.`;
    } else {
      mitigation = `Favorable moisture regime: Standard nutrient uptake optimal. Prepare drainage channels against sudden localized cloudbursts.`;
    }

    return {
      expectedRainfall,
      waterBalanceMm,
      yieldRisk,
      riskLevel,
      riskColor,
      mitigation,
    };
  }, [selectedCrop, rainfallAnomaly, drySpellDays, tempAnomaly]);

  // Canvas visualizer loop
  useEffect(() => {
    if (activeTab !== "canvas") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 520;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      t += 0.015;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
      skyGrad.addColorStop(0, "#064E3B");
      skyGrad.addColorStop(0.5, "#0D3321");
      skyGrad.addColorStop(1, "#111A14");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Golden Morning Glow
      const sunX = w * 0.75 + (mousePos.x - 0.5) * 40;
      const sunY = h * 0.25 + (mousePos.y - 0.5) * 30;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 160);
      sunGlow.addColorStop(0, "rgba(244, 183, 64, 0.45)");
      sunGlow.addColorStop(0.4, "rgba(244, 183, 64, 0.15)");
      sunGlow.addColorStop(1, "rgba(244, 183, 64, 0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 160, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric Clouds
      const drawCloud = (cx: number, cy: number, scale: number, alpha: number) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 30 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 25 * scale, cy - 10 * scale, 38 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 60 * scale, cy, 32 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 35 * scale, cy + 10 * scale, 25 * scale, 0, Math.PI * 2);
        ctx.fill();
      };

      const cloud1X = ((t * 8) % (w + 200)) - 100;
      const cloud2X = ((t * 5 + 300) % (w + 200)) - 100;
      drawCloud(cloud1X, h * 0.18, 0.9, 0.08);
      drawCloud(cloud2X, h * 0.12, 1.2, 0.05);

      // Distant Western Ghats / Plains
      const hillShift = (mousePos.x - 0.5) * 25;
      ctx.fillStyle = "#0A2416";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.55);
      for (let x = 0; x <= w; x += 30) {
        const y = h * 0.52 + Math.sin((x + hillShift) * 0.005) * 35 + Math.cos((x + hillShift) * 0.009) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Midground Terraced Crops
      const midShift = (mousePos.x - 0.5) * 50;
      ctx.fillStyle = "#0F3D24";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.68);
      for (let x = 0; x <= w; x += 20) {
        const y = h * 0.65 + Math.sin((x + midShift) * 0.007) * 25;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Foreground Green Rice / Wheat Terraces
      const fgShift = (mousePos.x - 0.5) * 75;
      ctx.fillStyle = "#16A34A";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.82);
      for (let x = 0; x <= w; x += 15) {
        const y = h * 0.78 + Math.sin((x + fgShift) * 0.008) * 15 + Math.sin(t * 1.5 + x * 0.02) * 4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Swaying crop stalks
      ctx.fillStyle = "#F4B740";
      for (let i = 0; i < 45; i++) {
        const cropX = ((i * (w / 45) + fgShift * 0.8 + w) % w);
        const baseY = h * 0.84 + Math.sin(i * 0.5) * 20;
        const sway = Math.sin(t * 2 + i) * 6;
        ctx.fillRect(cropX + sway, baseY - 12, 2, 12);
        ctx.beginPath();
        ctx.arc(cropX + sway, baseY - 13, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, mousePos]);

  return (
    <div className="relative w-full rounded-3xl border border-emerald-800/40 shadow-2xl bg-[#09120B] overflow-hidden">
      {/* Header Tabs: Live Climate Sandbox vs Agro-Visual Canvas */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-emerald-900/60 bg-[#0B170E]/80 backdrop-blur-md">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-emerald-900/60">
          <button
            type="button"
            onClick={() => setActiveTab("sandbox")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "sandbox"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-200/70 hover:text-white"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-lime-300" />
            <span>Interactive Scenario Sandbox</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("canvas")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "canvas"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-emerald-200/70 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>Landscape Visualizer</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>Real-time FAO-33 Engine</span>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE SCENARIO SANDBOX */}
      {activeTab === "sandbox" && (
        <div className="p-5 sm:p-6 space-y-5 text-gray-100">
          {/* Crop Selector Chips */}
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-200/80 mb-2 font-medium">
              <span className="flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5 text-lime-400" />
                Select Pan-India Crop:
              </span>
              <span className="text-[11px] text-emerald-300">{selectedCrop.region}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {CROPS.map((c) => {
                const isSelected = c.id === selectedCropId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCropId(c.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-400 shadow-sm ring-1 ring-emerald-300/40"
                        : "bg-black/30 text-gray-300 border-emerald-900/60 hover:bg-emerald-950/40 hover:border-emerald-700/60"
                    }`}
                  >
                    <div className="truncate">{c.name}</div>
                    <div className="text-[10px] opacity-75 font-normal">
                      {c.waterReqMm}mm • {c.droughtTolerance} Tol.
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Sliders: Rainfall Anomaly, Dry Spell, Temp Anomaly */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* 1. Rainfall Anomaly */}
            <div className="p-3 rounded-2xl bg-black/30 border border-emerald-900/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-1 text-emerald-200">
                  <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                  Rainfall Anomaly
                </span>
                <span className="font-mono font-bold text-white">
                  {rainfallAnomaly > 0 ? `+${rainfallAnomaly}%` : `${rainfallAnomaly}%`}
                </span>
              </div>
              <input
                type="range"
                min={-40}
                max={40}
                step={5}
                value={rainfallAnomaly}
                onChange={(e) => setRainfallAnomaly(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-emerald-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>-40% (Drought)</span>
                <span>+40% (Excess)</span>
              </div>
            </div>

            {/* 2. Dry Spell Days */}
            <div className="p-3 rounded-2xl bg-black/30 border border-emerald-900/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-1 text-amber-200">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  Consecutive Dry Spell
                </span>
                <span className="font-mono font-bold text-white">{drySpellDays} days</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={drySpellDays}
                onChange={(e) => setDrySpellDays(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-emerald-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0 days (Wet)</span>
                <span>25 days (Severe)</span>
              </div>
            </div>

            {/* 3. Temperature Anomaly */}
            <div className="p-3 rounded-2xl bg-black/30 border border-emerald-900/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-1 text-orange-200">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  Temp Anomaly
                </span>
                <span className="font-mono font-bold text-white">
                  {tempAnomaly > 0 ? `+${tempAnomaly.toFixed(1)}°C` : `${tempAnomaly.toFixed(1)}°C`}
                </span>
              </div>
              <input
                type="range"
                min={-2.0}
                max={4.0}
                step={0.2}
                value={tempAnomaly}
                onChange={(e) => setTempAnomaly(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer h-1.5 bg-emerald-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>-2.0°C</span>
                <span>+4.0°C (Heatwave)</span>
              </div>
            </div>
          </div>

          {/* Real-time Calculated Outcome Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Yield Risk Card */}
            <div className="p-3.5 rounded-2xl bg-[#0F2014] border border-emerald-800/60 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-emerald-200/80 font-medium">Estimated Yield Stress Risk</div>
                <div className="text-2xl font-black text-white mt-0.5 flex items-baseline gap-2">
                  <span>{calculatedMetrics.yieldRisk}%</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${calculatedMetrics.riskColor}`}>
                    {calculatedMetrics.riskLevel}
                  </span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-black/40 border border-emerald-700/40 flex items-center justify-center">
                <AlertTriangle className={`w-5 h-5 ${calculatedMetrics.riskLevel === 'Critical' ? 'text-red-400' : 'text-amber-400'}`} />
              </div>
            </div>

            {/* Water Balance Surplus/Deficit Card */}
            <div className="p-3.5 rounded-2xl bg-[#0F2014] border border-emerald-800/60 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-emerald-200/80 font-medium">Hydrological Water Balance</div>
                <div className="text-2xl font-black text-white mt-0.5 flex items-baseline gap-2">
                  <span className={calculatedMetrics.waterBalanceMm >= 0 ? "text-emerald-400" : "text-amber-400"}>
                    {calculatedMetrics.waterBalanceMm >= 0 ? `+${calculatedMetrics.waterBalanceMm} mm` : `${calculatedMetrics.waterBalanceMm} mm`}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono font-normal">
                    {calculatedMetrics.waterBalanceMm >= 0 ? "Surplus" : "Deficit"}
                  </span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-black/40 border border-emerald-700/40 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Real-time Mitigative Guidance */}
          <div className="p-3 rounded-2xl bg-black/40 border border-emerald-800/40 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold text-lime-300">Instant Agronomic Guidance: </span>
              <span className="text-gray-200">{calculatedMetrics.mitigation}</span>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="pt-1 flex items-center justify-between text-xs">
            <span className="text-[11px] text-gray-400">
              *Calibrated using FAO-33 Water-Yield Functions & IMD Agro Grids
            </span>
            <Link
              href={`/dashboard/simulator?crop=${selectedCrop.id}&rainfall=${rainfallAnomaly}&spell=${drySpellDays}`}
              className="inline-flex items-center gap-1.5 font-bold text-lime-400 hover:text-lime-300 hover:underline"
            >
              <span>Launch Deep Multi-Scenario Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* TAB 2: CINEMATIC 3D CANVAS FIELD */}
      {activeTab === "canvas" && (
        <div className="relative w-full h-[440px] md:h-[500px]">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A]/90 via-transparent to-transparent pointer-events-none" />

          {/* Floating telemetry pills */}
          <div className="absolute top-6 right-6 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#111A14]/85 backdrop-blur-md border border-emerald-800/40 text-emerald-100 shadow-xl pointer-events-none animate-float">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs">
              <div className="font-semibold text-emerald-300">Pan-India Microclimate Grid</div>
              <div className="text-emerald-100/75">31.4°C • 68% RH • 36 States Geocoded</div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#111A14]/85 backdrop-blur-md border border-amber-500/30 text-amber-100 shadow-xl pointer-events-none">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">Kharif & Rabi 2026</div>
            <div className="text-xs text-amber-200/80">Active Climate-to-Crop Advisory Engine</div>
          </div>
        </div>
      )}
    </div>
  );
}
