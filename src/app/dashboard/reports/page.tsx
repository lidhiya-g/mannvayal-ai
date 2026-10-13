"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { FileText, Download, Printer, CheckCircle2, Sprout } from "lucide-react";

export default function ReportsPage() {
  const { activeFarm, user } = useApp();
  const [downloaded, setDownloaded] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Field,Value\n" +
      `Farm Name,${activeFarm?.name || "Cauvery Delta Farm"}\n` +
      `District,${activeFarm?.district || "Thanjavur"}\n` +
      `Total Area (Acres),${activeFarm?.totalArea || 3.5}\n` +
      `Soil Texture,${activeFarm?.soilType || "Clay Loam"}\n` +
      `Primary Crop,Paddy (CR-1009 Sub-1)\n` +
      `Active Stage,Panicle Initiation\n` +
      `Water Balance (m3),+650\n` +
      `Climate Risk Index,42 (MODERATE)\n` +
      `Generated Date,${new Date().toISOString()}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mannvayal_report_${activeFarm?.district || "farm"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Export Center
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
              <FileText className="w-7 h-7 text-emerald-500" />
              Farm Agro-Climatic Report Generator
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Generate formatted PDF summaries and CSV data sheets for farm loans, crop insurance reviews, or FPO records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-emerald-950 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </button>
            <button
              onClick={downloadCSV}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" /> {downloaded ? "Downloaded!" : "Export CSV"}
            </button>
          </div>
        </div>

        {/* Formatted Report Sheet Preview */}
        <div className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] shadow-sm space-y-6 print:shadow-none print:border-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-6 border-gray-200 dark:border-emerald-900/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">
                  MannVayal AI Agro-Climatic Report
                </h2>
                <div className="text-xs text-gray-500 font-tamil">
                  மண்வயல் • பண்ணை காலநிலை இடர் & நீர் வரவு-செலவு அறிக்கை
                </div>
              </div>
            </div>

            <div className="text-right text-xs text-gray-400 font-mono">
              <div>Date: {new Date().toLocaleDateString("en-IN")}</div>
              <div>Report ID: MV-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>
          </div>

          {/* Section 1: Farmer & Field Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px]">Farmer Name</span>
              <strong className="text-gray-900 dark:text-gray-100">{user?.fullName || "Murugan Selvam"}</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">District & State</span>
              <strong className="text-gray-900 dark:text-gray-100">{activeFarm?.district || "Thanjavur"}, Tamil Nadu</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Cultivated Area</span>
              <strong className="text-gray-900 dark:text-gray-100">{activeFarm?.totalArea || 3.5} Acres</strong>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Soil Texture</span>
              <strong className="text-gray-900 dark:text-gray-100">{activeFarm?.soilType || "Clay Loam"}</strong>
            </div>
          </div>

          {/* Section 2: Crop & Phenology Status */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#16221A] border border-gray-100 dark:border-emerald-900/30 text-xs space-y-2">
            <div className="font-bold text-gray-900 dark:text-gray-100">Active Crop Phenology</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-gray-400 block text-[10px]">Crop Variety:</span>
                <span className="font-semibold">Paddy (CR-1009 Sub-1 Samba)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Current Growth Phase:</span>
                <span className="font-semibold text-emerald-600">Panicle Initiation (கருக்கட்டும் பருவம்)</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Irrigation Method:</span>
                <span className="font-semibold">{activeFarm?.irrigationType || "Canal & Borewell"}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Water Budget & Climate Simulation Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-gray-100 dark:border-emerald-950/60 space-y-1">
              <span className="font-bold text-gray-900 dark:text-gray-100 block mb-1">Water Wallet Status</span>
              <div className="flex justify-between">
                <span className="text-gray-500">Available Storage:</span>
                <span className="font-mono font-bold">3,800 m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Net 30-Day Balance:</span>
                <span className="font-mono font-bold text-emerald-600">+650 m³ (Buffer Safe)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-gray-100 dark:border-emerald-950/60 space-y-1">
              <span className="font-bold text-gray-900 dark:text-gray-100 block mb-1">Climate Stress Evaluation</span>
              <div className="flex justify-between">
                <span className="text-gray-500">Risk Score:</span>
                <span className="font-mono font-bold text-amber-500">42 / 100 (Moderate)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Simulated Rain Deviation:</span>
                <span className="font-mono font-bold">-30% Deficit Tested</span>
              </div>
            </div>
          </div>

          {/* Section 4: Mandatory Agronomic Attestation */}
          <div className="pt-4 border-t border-gray-200 dark:border-emerald-900/30 text-[10px] text-gray-400 leading-relaxed">
            Attestation: Calculations derived from FAO-33 yield response formulas and TNAU agronomic benchmarks. Not an insurance guarantee. Generated electronically via MannVayal AI.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
