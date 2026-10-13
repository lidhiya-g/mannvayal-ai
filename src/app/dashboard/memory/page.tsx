"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { BookOpenCheck, Plus, Sparkles, TrendingUp, Calendar, AlertCircle, FileText } from "lucide-react";

export default function FarmMemoryPage() {
  const { activeFarm, t } = useApp();

  const [entries, setEntries] = useState([
    {
      id: "J1",
      date: "2026-08-10",
      title: "Samba 2026 Direct Sowing Completed",
      category: "SOWING",
      content: "CR-1009 Sub-1 sown across 3.5 acres with certified seed and Pseudomonas seed treatment.",
      rainfallMm: "0 mm",
    },
    {
      id: "J2",
      date: "2026-09-02",
      title: "Canal Roster First Turn Irrigation",
      category: "IRRIGATION",
      content: "Grand Anicut canal water received for 48 hours. Paddies irrigated to 3cm depth.",
      rainfallMm: "14.2 mm",
    },
    {
      id: "J3",
      date: "2026-09-20",
      title: "Installed Field AWD Perforated Pipes",
      category: "WATER_MANAGEMENT",
      content: "3 PVC perforated observation tubes installed across field to regulate water pacing.",
      rainfallMm: "4.0 mm",
    },
  ]);

  const [historicalOutcomes, setHistoricalOutcomes] = useState([
    {
      season: "Kuruvai 2025",
      crop: "Paddy (ADT-43)",
      plannedYieldKg: 8400,
      actualYieldKg: 7950,
      plannedCostInr: 95000,
      actualCostInr: 91200,
      realizedPricePerKg: 22.8,
      netProfitInr: 90060,
      learnings: "Adopting AWD during vegetative stage saved 4 irrigation cycles without dropping grain test weight.",
    },
    {
      season: "Samba 2024",
      crop: "Paddy (CR-1009)",
      plannedYieldKg: 8200,
      actualYieldKg: 7400,
      plannedCostInr: 92000,
      actualCostInr: 96000,
      realizedPricePerKg: 22.0,
      netProfitInr: 66800,
      learnings: "Northeast monsoon deficit (-20%) required extra borewell diesel pumping. Early sowing avoids tail-end water stress.",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("OBSERVATION");

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newEntry = {
      id: `J${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      title: newTitle,
      category: newCategory,
      content: newContent,
      rainfallMm: "0 mm",
    };
    setEntries([newEntry, ...entries]);
    setNewTitle("");
    setNewContent("");
    setShowAddModal(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Longitudinal Archive
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
              <BookOpenCheck className="w-7 h-7 text-rose-500" />
              {t.nav.memory}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Personalized seasonal records: planned versus actual yields, expenses, and lessons learned.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Add Journal Entry
          </button>
        </div>

        {/* Planned vs Actual Seasonal Performance Review */}
        <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                Historical Season Outcomes (Planned vs Actual)
              </h3>
              <p className="text-xs text-gray-400">Longitudinal farm resilience records</p>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold">2 Seasons Recorded</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {historicalOutcomes.map((ho, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-gray-100 dark:border-emerald-950 bg-gray-50/50 dark:bg-[#152219] space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{ho.season}</span>
                  <span className="font-semibold text-emerald-600">{ho.crop}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div>
                    <span className="text-gray-400 text-[10px] block">Yield (Planned vs Actual):</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {ho.plannedYieldKg} kg → {ho.actualYieldKg} kg
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Expense (Planned vs Actual):</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      ₹{ho.plannedCostInr.toLocaleString("en-IN")} → ₹{ho.actualCostInr.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-emerald-900/30">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">Key Farmer Learning:</span>
                  <p className="text-gray-600 dark:text-gray-300 italic">{ho.learnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farm Journal Entries */}
        <div className="p-6 rounded-3xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
            Current Season Field Journal
          </h3>

          <div className="space-y-3">
            {entries.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-gray-100 dark:border-emerald-950/60 bg-gray-50/50 dark:bg-[#121c15] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-gray-100">{item.title}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.content}</p>
                </div>

                <div className="text-right text-[11px] text-gray-400 shrink-0 font-mono">
                  <div>{item.date}</div>
                  <div>Rain: {item.rainfallMm}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for new Journal Entry */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#111A14] border border-gray-200 dark:border-emerald-950 space-y-4">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">Add Field Journal Note</h3>
              <form onSubmit={handleAddEntry} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100"
                    placeholder="e.g. Weed management or fertilizer top dressing"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14]"
                  >
                    <option value="OBSERVATION">General Observation</option>
                    <option value="IRRIGATION">Irrigation Event</option>
                    <option value="PEST_MONITORING">Pest / Disease Scouting</option>
                    <option value="WEATHER_EVENT">Weather Shock Event</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Observation Details</label>
                  <textarea
                    rows={3}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 resize-none"
                    placeholder="Record field conditions, observations, or action taken..."
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl border text-gray-600 dark:text-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold"
                  >
                    Save Entry
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
