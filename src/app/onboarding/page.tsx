"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import { Sprout, MapPin, Layers, Droplets, Calendar, ArrowRight, AlertCircle } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, refreshFarms, setActiveFarm } = useApp();

  const [form, setForm] = useState({
    name: "என் பண்ணை (My Main Farm)",
    district: user?.district || "Thanjavur",
    village: "Budalur",
    totalArea: "3.0",
    soilType: "Clay Loam",
    irrigationType: "Canal & Borewell",
    primaryCropCode: "PADDY",
    sowingDate: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/farms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create farm profile");

      await refreshFarms();
      if (data.farm) setActiveFarm(data.farm);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to save farm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Step 2 of 2
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Setup Your Farm Profile
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Provide basic field characteristics to calibrate rainfall and water demand algorithms.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] shadow-sm">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                  Farm Name or Identifier *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Cauvery South Field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">District *</label>
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Thanjavur">Thanjavur (தஞ்சாவூர்)</option>
                    <option value="Tiruvarur">Tiruvarur (திருவாரூர்)</option>
                    <option value="Nagapattinam">Nagapattinam (நாகப்பட்டினம்)</option>
                    <option value="Madurai">Madurai (மதுரை)</option>
                    <option value="Coimbatore">Coimbatore (கோயம்புத்தூர்)</option>
                    <option value="Tirunelveli">Tirunelveli (திருநெல்வேலி)</option>
                    <option value="Salem">Salem (சேலம்)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Village / Taluk</label>
                  <input
                    type="text"
                    value={form.village}
                    onChange={(e) => setForm({ ...form, village: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Budalur"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Total Land Area (Acres) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={form.totalArea}
                    onChange={(e) => setForm({ ...form, totalArea: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Soil Texture Class *</label>
                  <select
                    value={form.soilType}
                    onChange={(e) => setForm({ ...form, soilType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Clay Loam">Clay Loam (களிமண் கலந்த வண்டல்)</option>
                    <option value="Black Cotton Soil">Black Cotton Soil (கரிசல் மண்)</option>
                    <option value="Red Soil">Red Soil (செம்மண்)</option>
                    <option value="Sandy Loam">Sandy Loam (மணல் கலந்த செம்மண்)</option>
                    <option value="Alluvial">Alluvial (ஆற்று வண்டல் மண்)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Primary Planned Crop *</label>
                  <select
                    value={form.primaryCropCode}
                    onChange={(e) => setForm({ ...form, primaryCropCode: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="PADDY">Paddy / Rice (நெல்)</option>
                    <option value="RAGI">Finger Millet / Ragi (கேழ்வரகு)</option>
                    <option value="GROUNDNUT">Groundnut (வேர்க்கடலை)</option>
                    <option value="COTTON">Cotton (பருத்தி)</option>
                    <option value="MAIZE">Maize (மக்காச்சோளம்)</option>
                    <option value="RED_GRAM">Red Gram (துவரை)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Irrigation Availability *</label>
                  <select
                    value={form.irrigationType}
                    onChange={(e) => setForm({ ...form, irrigationType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Canal & Borewell">Canal & Borewell (வாய்க்கால் & கிணறு)</option>
                    <option value="Canal only">Canal Turn Only (வாய்க்கால் பாசனம்)</option>
                    <option value="Borewell only">Borewell Only (போர்வெல் பாசனம்)</option>
                    <option value="Drip Irrigation">Drip Micro-Irrigation (சொட்டு நீர்)</option>
                    <option value="Rainfed">Rainfed Dryland (மானாவாரி)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Expected Sowing Date</label>
                <input
                  type="date"
                  value={form.sowingDate}
                  onChange={(e) => setForm({ ...form, sowingDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 transition-all mt-4"
              >
                {loading ? "Initializing Farm Engines..." : "Finish Onboarding & Open Dashboard"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
