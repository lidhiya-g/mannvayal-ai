"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { Library, Search, Droplets, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function CropLibraryPage() {
  const [search, setSearch] = useState("");

  const crops = [
    {
      code: "PADDY",
      name: "Paddy / Rice (நெல்)",
      category: "Cereals",
      duration: "135 Days",
      waterRequirement: "1200 mm",
      droughtTolerance: "Low",
      heatTolerance: "Medium",
      soil: "Clay Loam, Alluvial",
      descEn: "Staple wetland crop of Tamil Nadu Cauvery Delta. Highest water requirement. Critical during panicle initiation and flowering.",
      descTa: "காவிரி டெல்டாவின் பிரதான பயிர். அதிக நீர் தேவை உடையது. கருக்கட்டும் மற்றும் பூக்கும் பருவங்களில் நீர் பற்றாக்குறைக்கு மிக உணர்திறன் கொண்டது.",
    },
    {
      code: "RAGI",
      name: "Finger Millet / Ragi (கேழ்வரகு)",
      category: "Millets",
      duration: "105 Days",
      waterRequirement: "450 mm",
      droughtTolerance: "Very High",
      heatTolerance: "High",
      soil: "Red Loam, Sandy Loam",
      descEn: "Climate-resilient nutri-cereal requiring less than 40% of paddy's water demand. Ideal contingency crop during delayed monsoon.",
      descTa: "நெல்லை விட 40% க்கும் குறைவான நீர் தேவைப்படும் ஊட்டச்சத்து மிகுந்த சிறுதானியம். பருவமழை தாமதமாகும் காலங்களில் சிறந்த மாற்றுப்பயிர்.",
    },
    {
      code: "GROUNDNUT",
      name: "Groundnut (வேர்க்கடலை)",
      category: "Oilseeds",
      duration: "110 Days",
      waterRequirement: "550 mm",
      droughtTolerance: "High",
      heatTolerance: "Medium",
      soil: "Sandy Loam, Red Soil",
      descEn: "Nitrogen-fixing legume oilseed. Most critical during peg penetration and pod development.",
      descTa: "மண்ணிற்கு தழைச்சத்து சேர்க்கும் எண்ணெய் வித்துப்பயிர். விழுது இறங்கும் மற்றும் காய் பிடிக்கும் பருவங்களில் நீர் அவசியம்.",
    },
    {
      code: "COTTON",
      name: "Cotton (பருத்தி)",
      category: "Commercial",
      duration: "155 Days",
      waterRequirement: "700 mm",
      droughtTolerance: "Medium",
      heatTolerance: "High",
      soil: "Black Cotton Soil, Deep Loam",
      descEn: "Commercial fiber crop. Sensitive to square drop during hot dry spells.",
      descTa: "வணிக நார் பயிர். கரிசல் மண்ணில் சிறந்தது; பூ மொட்டு உதிர்வதை தடுக்க சீரான ஈரப்பதம் தேவை.",
    },
    {
      code: "MAIZE",
      name: "Maize (மக்காச்சோளம்)",
      category: "Cereals",
      duration: "110 Days",
      waterRequirement: "600 mm",
      droughtTolerance: "Medium",
      heatTolerance: "Medium",
      soil: "Well-drained Loam",
      descEn: "High-yielding cereal. Tasseling and silking stages are acutely sensitive to heat and moisture stress.",
      descTa: "அதிக விளைச்சல் தரும் தானியப்பயிர். ஆண் பூ மற்றும் பெண் பூ வெளிவரும் பருவங்களில் வறட்சி ஏற்படக்கூடாது.",
    },
    {
      code: "RED_GRAM",
      name: "Red Gram / Pigeon Pea (துவரை)",
      category: "Pulses",
      duration: "140 Days",
      waterRequirement: "400 mm",
      droughtTolerance: "High",
      heatTolerance: "High",
      soil: "Red Soil, Deep Loam",
      descEn: "Deep-rooted pulse crop capable of accessing subsoil moisture. Ideal dryland crop.",
      descTa: "ஆழமான வேரமைப்பு கொண்ட மானாவாரி பயறு வகை. வறட்சியை நன்கு தாங்கி வளரும்.",
    },
  ];

  const filteredCrops = crops.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.soil.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Crop Reference Database
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
              <Library className="w-7 h-7 text-emerald-500" />
              Crop Library & Agronomic Guidance
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Calibrated crop profiles based on TNAU Package of Practices & FAO-33 benchmarks.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crops, millets, soils..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.code}
              className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between hover:border-emerald-500 transition-all shadow-xs space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                    {crop.category}
                  </span>
                  <span className="text-xs font-mono text-gray-400 font-bold">{crop.duration}</span>
                </div>

                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{crop.name}</h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{crop.descEn}</p>
                <p className="font-tamil text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  {crop.descTa}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-emerald-900/30 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" /> Season Water Need:
                  </span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{crop.waterRequirement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Drought Resilience:</span>
                  <span className="font-bold text-emerald-600">{crop.droughtTolerance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Suitable Soils:</span>
                  <span className="text-gray-700 dark:text-gray-300 truncate">{crop.soil}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
