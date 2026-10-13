"use client";

import React, { useState, useEffect, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LocationExplorer, { SelectedLocation } from "@/components/geo/LocationExplorer";
import {
  VillageProfileData,
  VillageIndicator,
  PriorityItem,
  computePriorityScore,
} from "@/lib/rural/villageDataService";
import {
  Building2,
  Droplets,
  Zap,
  Route,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Download,
  Plus,
  Compass,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Briefcase,
  Users2,
  FileSpreadsheet,
  Trash2,
  Clock,
} from "lucide-react";

export default function VillageDevelopmentDashboard() {
  const [selectedState, setSelectedState] = useState<string>("Punjab");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Ludhiana");
  const [selectedVillage, setSelectedVillage] = useState<string>("Seh");
  const [villageData, setVillageData] = useState<VillageProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Active view tab: "assessment" | "gaps" | "livelihoods" | "planner" | "progress"
  const [activeTab, setActiveTab] = useState<"assessment" | "gaps" | "livelihoods" | "planner" | "progress">("assessment");

  // Priority planner state
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newPriorityForm, setNewPriorityForm] = useState({
    title: "",
    category: "WATER" as PriorityItem["category"],
    urgency: 4,
    communityImpact: 5,
    feasibility: 4,
    proposedAction: "",
    responsibleStakeholder: "Gram Panchayat & Jal Shakti Vibhag",
    targetCompletionMonths: 6,
    evidenceNotes: "",
  });

  // Fetch village profile data
  const fetchVillageData = async (state: string, dist: string, vil: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/village?state=${encodeURIComponent(state)}&district=${encodeURIComponent(dist)}&village=${encodeURIComponent(vil)}`);
      if (res.ok) {
        const json = await res.json();
        setVillageData(json.profile);
      }
    } catch (e) {
      console.error("Failed to load village profile:", e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch active priorities
  const fetchPriorities = async () => {
    try {
      const res = await fetch("/api/village/priorities");
      if (res.ok) {
        const json = await res.json();
        setPriorities(json.priorities || []);
      }
    } catch (e) {
      console.error("Failed to load priorities:", e);
    }
  };

  useEffect(() => {
    fetchVillageData(selectedState, selectedDistrict, selectedVillage);
    fetchPriorities();
  }, [selectedState, selectedDistrict, selectedVillage]);

  // Handle location update from LocationExplorer
  const handleLocationChange = (loc: SelectedLocation) => {
    setSelectedState(loc.state);
    setSelectedDistrict(loc.district);
    if (loc.subdistrict) {
      setSelectedVillage(loc.subdistrict);
    }
  };

  // Add priority handler
  const handleAddPriority = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/village/priorities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPriorityForm),
      });
      if (res.ok) {
        const json = await res.json();
        setPriorities([json.priority, ...priorities]);
        setShowAddModal(false);
        setNewPriorityForm({
          title: "",
          category: "WATER",
          urgency: 4,
          communityImpact: 5,
          feasibility: 4,
          proposedAction: "",
          responsibleStakeholder: "Gram Panchayat & Jal Shakti Vibhag",
          targetCompletionMonths: 6,
          evidenceNotes: "",
        });
      }
    } catch (err) {
      console.error("Failed to add priority:", err);
    }
  };

  // Status toggle handler
  const handleUpdateStatus = async (id: string, newStatus: PriorityItem["status"]) => {
    try {
      const res = await fetch("/api/village/priorities", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setPriorities(priorities.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete priority handler
  const handleDeletePriority = async (id: string) => {
    try {
      const res = await fetch(`/api/village/priorities?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        setPriorities(priorities.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete priority:", err);
    }
  };

  // Live computed score for the new priority modal
  const modalLiveScore = useMemo(() => {
    return computePriorityScore(
      newPriorityForm.urgency,
      newPriorityForm.communityImpact,
      newPriorityForm.feasibility
    );
  }, [newPriorityForm.urgency, newPriorityForm.communityImpact, newPriorityForm.feasibility]);

  // Overall Development Index & Counts
  const metrics = useMemo(() => {
    if (!villageData) return { total: 0, adequate: 0, gaps: 0, unavailable: 0, index: 0 };
    const total = villageData.indicators.length;
    const adequate = villageData.indicators.filter((i) => i.status === "ADEQUATE").length;
    const gaps = villageData.indicators.filter((i) => i.status === "MILD_GAP" || i.status === "DEFICIT").length;
    const unavailable = villageData.indicators.filter((i) => i.status === "DATA_UNAVAILABLE").length;
    return {
      total,
      adequate,
      gaps,
      unavailable,
      index: Math.round((adequate / total) * 100),
    };
  }, [villageData]);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl">
        {/* TOP HEADER & TITLE */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-emerald-950/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Module B • Rural Resource & Development Intelligence
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Gram Panchayat & Village Planning
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              Village Resource Assessment & Priority Planner
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              Evidence-based infrastructure benchmarking, rural livelihood diversification, and transparent Panchayat development prioritization.
            </p>
          </div>

          {/* Action buttons: Export CSV & Add Priority */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`/api/village/export?format=csv&state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}&village=${encodeURIComponent(selectedVillage)}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40 transition-colors shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export Priority Report (CSV)</span>
            </a>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Village Priority</span>
            </button>
          </div>
        </div>

        {/* LOCATION SELECTOR & SUMMARY HERO */}
        <div className="p-5 sm:p-6 rounded-3xl border border-gray-200 dark:border-emerald-950/80 bg-white dark:bg-[#0E1711] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-emerald-950/60 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" /> Pan-India Geographic Filter
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              Population: ~{villageData?.population.toLocaleString()} • Households: {villageData?.households}
            </span>
          </div>

          <LocationExplorer
            initialState={selectedState}
            initialDistrict={selectedDistrict}
            onChange={handleLocationChange}
            compact={true}
            showCardSummary={false}
          />

          {/* Quick Metrics KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-[#122217] border border-emerald-200 dark:border-emerald-900/50">
              <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">Development Index</div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
                {metrics.index}%
              </div>
              <div className="text-[10px] text-emerald-600/80 mt-0.5">Met Standards</div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-[#201D11] border border-amber-200 dark:border-amber-900/50">
              <div className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">Identified Gaps</div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                {metrics.gaps}
              </div>
              <div className="text-[10px] text-amber-600/80 mt-0.5">Below Official Target</div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-[#111A24] border border-blue-200 dark:border-blue-900/50">
              <div className="text-[11px] text-blue-800 dark:text-blue-300 font-medium">Agri-Dependence</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                {villageData?.livelihoodSummary.agriDependencePct}%
              </div>
              <div className="text-[10px] text-blue-500/80 mt-0.5">Primary Livelihood</div>
            </div>

            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-[#1E1224] border border-purple-200 dark:border-purple-900/50">
              <div className="text-[11px] text-purple-800 dark:text-purple-300 font-medium">Active Priorities</div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-0.5">
                {priorities.length}
              </div>
              <div className="text-[10px] text-purple-500/80 mt-0.5">Panchayat Action List</div>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-200 dark:border-emerald-950 scrollbar-none">
          {[
            { id: "assessment", label: "B1. Resource Assessment", count: metrics.total },
            { id: "gaps", label: "B2. Infrastructure Gaps", count: metrics.gaps },
            { id: "livelihoods", label: "B3. Livelihood Insights" },
            { id: "planner", label: "B4. Priority Planner", count: priorities.length },
            { id: "progress", label: "B5. Progress & Tracking" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20"
                  : "bg-gray-100 dark:bg-[#111A14] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-emerald-950/60"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? "bg-emerald-700 text-white" : "bg-gray-200 dark:bg-emerald-950 text-gray-700 dark:text-emerald-300"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB B1: VILLAGE RESOURCE ASSESSMENT */}
        {activeTab === "assessment" && villageData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Verified Public Indicators & Mission Antyodaya Benchmarks</span>
              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                8 Core Dimensions Analyzed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {villageData.indicators.map((ind, idx) => {
                let badgeColor = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300";
                let statusLabel = "Adequate";
                if (ind.status === "MILD_GAP") {
                  badgeColor = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300";
                  statusLabel = "Mild Gap";
                } else if (ind.status === "DEFICIT") {
                  badgeColor = "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300";
                  statusLabel = "Deficit";
                } else if (ind.status === "DATA_UNAVAILABLE") {
                  badgeColor = "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 border-gray-300";
                  statusLabel = "Data Unavailable";
                }

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-gray-200 dark:border-emerald-950/70 bg-white dark:bg-[#111A14] flex flex-col justify-between shadow-2xs space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-emerald-950 text-gray-600 dark:text-emerald-300 uppercase">
                          {ind.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {ind.name}
                      </h4>
                      <div className="text-xl font-black text-gray-900 dark:text-gray-100 mt-2 flex items-baseline gap-1">
                        <span>{ind.observedValue}</span>
                        {ind.unit && <span className="text-xs font-normal text-gray-500">{ind.unit}</span>}
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        {ind.gapDescription}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gray-100 dark:border-emerald-950/60 text-[10px] space-y-1 text-gray-400">
                      <div className="flex justify-between">
                        <span>Benchmark Target:</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                          {ind.benchmarkValue}
                        </span>
                      </div>
                      <div className="truncate" title={ind.benchmarkSource}>
                        Std: {ind.benchmarkSource}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB B2: INFRASTRUCTURE GAP ASSESSMENT */}
        {activeTab === "gaps" && villageData && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#19150B] border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Transparent Gap Calculation Policy: </span>
                Gaps are derived solely by comparing verified village indicators against published Central Ministry standards (Jal Jeevan Mission, PMGSY, IPHS, RTE, SBM-G). No values are fabricated. Indicators lacking local validation are held under "Data Unavailable".
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-emerald-950/80 bg-white dark:bg-[#111A14] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-[#0A120D] border-b border-gray-200 dark:border-emerald-950 text-gray-500 dark:text-gray-400 font-semibold">
                    <tr>
                      <th className="p-3.5">Indicator Assessed</th>
                      <th className="p-3.5">Observed Value</th>
                      <th className="p-3.5">Reference Benchmark</th>
                      <th className="p-3.5">Gap Severity</th>
                      <th className="p-3.5">Benchmark Source</th>
                      <th className="p-3.5">Data Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-emerald-950/50 text-gray-700 dark:text-gray-300">
                    {villageData.indicators.map((ind, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-emerald-950/20">
                        <td className="p-3.5 font-bold text-gray-900 dark:text-gray-100">
                          {ind.name}
                        </td>
                        <td className="p-3.5 font-mono">
                          {ind.observedValue} {ind.unit}
                        </td>
                        <td className="p-3.5 font-mono text-gray-500">
                          {ind.benchmarkValue}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ind.status === 'ADEQUATE'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : ind.status === 'MILD_GAP'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                              : ind.status === 'DEFICIT'
                              ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}>
                            {ind.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-gray-500 dark:text-gray-400">
                          {ind.benchmarkSource}
                        </td>
                        <td className="p-3.5 font-mono text-[10px]">
                          {ind.confidence}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB B3: RURAL LIVELIHOOD INSIGHTS */}
        {activeTab === "livelihoods" && villageData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Livelihood Profile Card */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" /> Primary Occupation
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
                  {villageData.livelihoodSummary.primaryOccupation}
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-emerald-950/60">
                    <span className="text-gray-500">Agri-Dependence:</span>
                    <span className="font-bold text-emerald-600">{villageData.livelihoodSummary.agriDependencePct}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-emerald-950/60">
                    <span className="text-gray-500">Seasonal Migration:</span>
                    <span className="font-bold text-amber-600">{villageData.livelihoodSummary.seasonalMigrationPct}%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Agricultural Lean Months:</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {villageData.livelihoodSummary.leanSeasonMonths.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Local Cooperatives & FPOs */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Users2 className="w-4 h-4" /> Cooperatives & FPOs
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  Active Community Producer Groups
                </h3>
                <ul className="space-y-2 text-xs">
                  {villageData.livelihoodSummary.localFPOsAndCooperatives.map((fpo, i) => (
                    <li key={i} className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#152019] border border-gray-100 dark:border-emerald-950 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{fpo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skill Training Programs Available */}
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" /> Rural Skill Programs
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  Govt Skill Development Linkages
                </h3>
                <ul className="space-y-2 text-xs">
                  {villageData.livelihoodSummary.skillTrainingProgramsAvailable.map((prog, i) => (
                    <li key={i} className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#152019] border border-gray-100 dark:border-emerald-950 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Evidence-backed local enterprise opportunities */}
            <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-4">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lime-500" />
                Evidence-Grounded Micro-Enterprise Opportunities
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Formulated based on local crop residue volumes, surplus commodities, and cold-chain deficits.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {villageData.livelihoodSummary.potentialEnterprises.map((ent, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-[#132319] border border-emerald-200/80 dark:border-emerald-900/60 text-xs space-y-2"
                  >
                    <div className="font-bold text-emerald-900 dark:text-emerald-200">
                      Opportunity #{idx + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {ent}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB B4: VILLAGE DEVELOPMENT PRIORITY PLANNER */}
        {activeTab === "planner" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-[#122217] border border-emerald-200 dark:border-emerald-900/60">
              <div>
                <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                  Transparent Multi-Factor Scoring Formula
                </h3>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-0.5 font-mono">
                  Priority Score = (Urgency × 0.40) + (Community Impact × 0.40) + (Feasibility × 0.20) [Max 5.0]
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap shadow-sm"
              >
                + Add Proposed Action
              </button>
            </div>

            {/* List of active priorities */}
            <div className="space-y-4">
              {priorities.map((pri) => (
                <div
                  key={pri.id}
                  className="p-5 rounded-3xl border border-gray-200 dark:border-emerald-950/80 bg-white dark:bg-[#111A14] shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-emerald-950/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400">{pri.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-emerald-950 text-gray-700 dark:text-emerald-300">
                        {pri.category}
                      </span>
                      <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">
                        {pri.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-lime-400/20 border border-lime-500/40 text-xs font-black text-gray-900 dark:text-lime-300">
                        <span>Score: {pri.compositeScore.toFixed(1)} / 5.0</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeletePriority(pri.id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-lg"
                        title="Delete priority"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Proposed Action: </span>
                    {pri.proposedAction}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-1 text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Responsible Entity:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{pri.responsibleStakeholder}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Timeline:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{pri.targetCompletionMonths} Months</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Status:</span>
                      <select
                        value={pri.status}
                        onChange={(e) => handleUpdateStatus(pri.id, e.target.value as any)}
                        className="px-2 py-1 rounded-lg border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-xs font-semibold cursor-pointer"
                      >
                        <option value="IDENTIFIED">IDENTIFIED</option>
                        <option value="PROPOSED">PROPOSED</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Factor Breakdown:</span>
                      <span className="text-[11px] font-mono">U:{pri.urgency} | I:{pri.communityImpact} | F:{pri.feasibility}</span>
                    </div>
                  </div>

                  {pri.evidenceNotes && (
                    <div className="pt-2 text-[11px] text-gray-500 dark:text-gray-400 italic border-t border-gray-100 dark:border-emerald-950/40">
                      📋 Evidence: {pri.evidenceNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB B5: PROGRESS & TRACKING */}
        {activeTab === "progress" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] text-center space-y-2">
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {priorities.filter((p) => p.status === "RESOLVED").length} / {priorities.length}
                </div>
                <div className="text-xs font-bold text-gray-700 dark:text-gray-300">Completed Actions</div>
                <div className="text-[11px] text-gray-400">Panchayat resolutions executed</div>
              </div>

              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] text-center space-y-2">
                <div className="text-3xl font-black text-amber-500">
                  {priorities.filter((p) => p.status === "IN_PROGRESS").length}
                </div>
                <div className="text-xs font-bold text-gray-700 dark:text-gray-300">Under Active Execution</div>
                <div className="text-[11px] text-gray-400">Civil works or scheme applications</div>
              </div>

              <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] text-center space-y-2">
                <div className="text-3xl font-black text-blue-500">
                  {priorities.filter((p) => p.status === "PROPOSED").length}
                </div>
                <div className="text-xs font-bold text-gray-700 dark:text-gray-300">Proposed / In Gram Sabha</div>
                <div className="text-[11px] text-gray-400">Awaiting funding approvals</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-3">
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                Village Progress Audit Log
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Maintains a transparent record separating measured outcomes, reported community needs, and projected completions.
              </p>
              <div className="divide-y divide-gray-100 dark:divide-emerald-950/50 text-xs">
                {priorities.map((p) => (
                  <div key={p.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{p.title}</span>
                      <span className="text-[10px] text-gray-400 ml-2">Updated: {p.lastUpdated}</span>
                    </div>
                    <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD VILLAGE DEVELOPMENT PRIORITY */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-lg rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#0D1610] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-emerald-950 pb-3">
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-500" />
                  Record Village Development Priority
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddPriority} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    Need / Problem Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPriorityForm.title}
                    onChange={(e) => setNewPriorityForm({ ...newPriorityForm, title: e.target.value })}
                    placeholder="e.g. Deepen village community percolation pond for summer recharge"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Category *</label>
                    <select
                      value={newPriorityForm.category}
                      onChange={(e) => setNewPriorityForm({ ...newPriorityForm, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-xs text-gray-900 dark:text-gray-100"
                    >
                      <option value="WATER">WATER</option>
                      <option value="HEALTH">HEALTH</option>
                      <option value="EDUCATION">EDUCATION</option>
                      <option value="CONNECTIVITY">CONNECTIVITY</option>
                      <option value="SANITATION">SANITATION</option>
                      <option value="POWER">POWER</option>
                      <option value="LIVELIHOOD">LIVELIHOOD</option>
                      <option value="DIGITAL">DIGITAL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                      Target Months
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={36}
                      value={newPriorityForm.targetCompletionMonths}
                      onChange={(e) => setNewPriorityForm({ ...newPriorityForm, targetCompletionMonths: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Sliders: Urgency, Impact, Feasibility */}
                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-emerald-950 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Urgency (Weight: 40%)</span>
                    <span className="font-mono font-bold">{newPriorityForm.urgency} / 5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={newPriorityForm.urgency}
                    onChange={(e) => setNewPriorityForm({ ...newPriorityForm, urgency: Number(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Community Impact (Weight: 40%)</span>
                    <span className="font-mono font-bold">{newPriorityForm.communityImpact} / 5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={newPriorityForm.communityImpact}
                    onChange={(e) => setNewPriorityForm({ ...newPriorityForm, communityImpact: Number(e.target.value) })}
                    className="w-full accent-blue-500"
                  />

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Feasibility (Weight: 20%)</span>
                    <span className="font-mono font-bold">{newPriorityForm.feasibility} / 5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={newPriorityForm.feasibility}
                    onChange={(e) => setNewPriorityForm({ ...newPriorityForm, feasibility: Number(e.target.value) })}
                    className="w-full accent-amber-500"
                  />

                  <div className="pt-2 border-t border-gray-200 dark:border-emerald-950 flex justify-between items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span>Calculated Composite Score:</span>
                    <span className="text-base font-black font-mono">{modalLiveScore.toFixed(1)} / 5.0</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    Proposed Action *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={newPriorityForm.proposedAction}
                    onChange={(e) => setNewPriorityForm({ ...newPriorityForm, proposedAction: e.target.value })}
                    placeholder="Specific actionable work, scheme linkage, or civil repair required"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    Responsible Stakeholder / Dept
                  </label>
                  <input
                    type="text"
                    value={newPriorityForm.responsibleStakeholder}
                    onChange={(e) => setNewPriorityForm({ ...newPriorityForm, responsibleStakeholder: e.target.value })}
                    placeholder="e.g. Gram Panchayat, Block Development Officer, Discom"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                    Supporting Evidence / Survey Note
                  </label>
                  <input
                    type="text"
                    value={newPriorityForm.evidenceNotes}
                    onChange={(e) => setNewPriorityForm({ ...newPriorityForm, evidenceNotes: e.target.value })}
                    placeholder="e.g. 12% drinking water gap noted in Jal Jeevan audit"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-900/20"
                  >
                    Save Priority
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
