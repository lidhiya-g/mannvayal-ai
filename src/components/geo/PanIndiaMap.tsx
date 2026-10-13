"use client";

import React, { useState, useMemo } from "react";
import { ALL_INDIAN_STATES_AND_UTS, StateOrUTInfo } from "@/lib/geo/indiaGeoData";
import { MapPin, CloudRain, Sprout, Layers, Compass, ArrowRight, ShieldCheck, Sparkles, Filter } from "lucide-react";

interface PanIndiaMapProps {
  onSelectState?: (stateName: string) => void;
  selectedStateName?: string;
  className?: string;
}

const REGIONAL_ZONES = [
  { id: "ALL", label: "All India (36)" },
  { id: "North", label: "North (8)" },
  { id: "South", label: "South (6)" },
  { id: "West", label: "West (4)" },
  { id: "Central", label: "Central (2)" },
  { id: "East", label: "East (4)" },
  { id: "North-East", label: "North-East (8)" },
  { id: "Islands", label: "Islands (2)" },
];

export default function PanIndiaMap({
  onSelectState,
  selectedStateName = "Punjab",
  className = "",
}: PanIndiaMapProps) {
  const [activeZone, setActiveZone] = useState<string>("ALL");
  const [hoveredState, setHoveredState] = useState<StateOrUTInfo | null>(null);
  const [activeStateName, setActiveStateName] = useState<string>(selectedStateName);

  const filteredStates = useMemo(() => {
    if (activeZone === "ALL") return ALL_INDIAN_STATES_AND_UTS;
    return ALL_INDIAN_STATES_AND_UTS.filter((s) => s.zone === activeZone);
  }, [activeZone]);

  const activeState = useMemo(() => {
    return ALL_INDIAN_STATES_AND_UTS.find((s) => s.name === activeStateName) || ALL_INDIAN_STATES_AND_UTS[0];
  }, [activeStateName]);

  const handleStateClick = (state: StateOrUTInfo) => {
    setActiveStateName(state.name);
    if (onSelectState) {
      onSelectState(state.name);
    }
  };

  // Calculate high-level totals
  const totalDistricts = useMemo(() => {
    return ALL_INDIAN_STATES_AND_UTS.reduce((acc, s) => acc + s.districts.length, 0);
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header bar with zone filters & nationwide metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-emerald-950/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Pan-India Agricultural Coverage
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              28 States & 8 Union Territories
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
            Explore India's Agro-Climatic Intelligence
          </h3>
        </div>

        {/* Metric pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#111A14] border border-gray-200 dark:border-emerald-950 text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold text-gray-900 dark:text-gray-100">36</span> States & UTs
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#111A14] border border-gray-200 dark:border-emerald-950 text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold text-gray-900 dark:text-gray-100">15</span> Planning Zones
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#111A14] border border-gray-200 dark:border-emerald-950 text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-bold text-gray-900 dark:text-gray-100">100%</span> Software-Only
          </div>
        </div>
      </div>

      {/* Zone filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1 mr-0.5" />
        {REGIONAL_ZONES.map((zone) => (
          <button
            key={zone.id}
            type="button"
            onClick={() => setActiveZone(zone.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeZone === zone.id
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20"
                : "bg-gray-100 dark:bg-[#111A14] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-emerald-950/60"
            }`}
          >
            {zone.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive State Selector & Detailed Zone Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: State Badges / Interactive Selector Grid (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0E1610] rounded-2xl border border-gray-200 dark:border-emerald-950/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Click any State or UT to load regional climate profile:</span>
            <span className="font-mono text-[11px]">{filteredStates.length} shown</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[460px] overflow-y-auto pr-1">
            {filteredStates.map((state) => {
              const isSelected = activeState.id === state.id;
              return (
                <button
                  key={state.id}
                  type="button"
                  onClick={() => handleStateClick(state)}
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
                  className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-900/25 ring-2 ring-emerald-400/40"
                      : "bg-gray-50 dark:bg-[#131F16] text-gray-800 dark:text-gray-200 border-gray-200/80 dark:border-emerald-950/70 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 w-full">
                    <span className="font-bold truncate">{state.name}</span>
                    <span
                      className={`text-[9px] font-extrabold px-1 rounded uppercase ${
                        isSelected
                          ? "bg-emerald-700 text-white"
                          : "bg-gray-200 dark:bg-emerald-950 text-gray-600 dark:text-emerald-400"
                      }`}
                    >
                      {state.id.replace("IN-", "")}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] opacity-80">
                    <span>{state.zone}</span>
                    <span>{state.districts.length} dist.</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-emerald-950/60 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>Source: Survey of India & Planning Commission Agro-Climatic Zones</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              Pan-India Geocoded
            </span>
          </div>
        </div>

        {/* Right: Selected State Dossier & Agro-Climatic Profile (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900/90 via-[#0B150E] to-[#064E3B] text-white rounded-2xl border border-emerald-800/50 p-6 shadow-xl space-y-5">
          {/* State Title & Zone */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {activeState.type === "STATE" ? "State" : "Union Territory"}
                </span>
                <span className="text-xs text-emerald-200/80 font-mono">
                  {activeState.id}
                </span>
              </div>
              <h4 className="text-2xl font-black mt-1 text-white tracking-tight">
                {activeState.name}
              </h4>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Capital: {activeState.capital} • {activeState.zone} India
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-emerald-800/60 border border-emerald-600/40 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-emerald-300 uppercase font-semibold">Districts</span>
              <span className="text-sm font-extrabold text-white">{activeState.districts.length}</span>
            </div>
          </div>

          {/* Agro-Climatic Zone */}
          <div className="p-3.5 rounded-xl bg-black/30 border border-emerald-800/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold">
              <Layers className="w-3.5 h-3.5 text-lime-400" />
              <span>Agro-Climatic Classification</span>
            </div>
            <p className="text-sm font-bold text-gray-100">
              {activeState.agroClimaticZone}
            </p>
          </div>

          {/* Key Districts & Normal Rainfall Range */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-emerald-200">
              <span className="flex items-center gap-1">
                <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                Key Agricultural Districts:
              </span>
              <span className="font-mono text-[11px] text-emerald-300">
                Rainfall & Crops
              </span>
            </div>

            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {activeState.districts.map((d) => (
                <div
                  key={d.id}
                  className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/30 text-xs space-y-1 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{d.name}</span>
                    <span className="text-emerald-300 font-mono text-[11px]">
                      ~{d.typicalAnnualRainfallMm} mm/yr
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {d.majorCrops.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-black/40 text-emerald-200 border border-emerald-700/40"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="text-[10px] text-emerald-200/70 truncate">
                    Soils: {d.majorSoils.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action button: Simulate in this state */}
          <div className="pt-2">
            <a
              href={`/dashboard/simulator?state=${encodeURIComponent(activeState.name)}&district=${encodeURIComponent(
                activeState.districts[0]?.name || ""
              )}`}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-lime-400 hover:bg-lime-300 text-gray-950 flex items-center justify-center gap-2 shadow-lg shadow-lime-950/30 transition-all"
            >
              <Sprout className="w-4 h-4 text-emerald-900" />
              <span>Simulate Climate Scenarios for {activeState.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
