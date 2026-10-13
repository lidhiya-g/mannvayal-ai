"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ALL_INDIAN_STATES_AND_UTS, StateOrUTInfo, DistrictInfo, searchLocations } from "@/lib/geo/indiaGeoData";
import { MapPin, Search, Compass, CloudRain, Sprout, Layers, CheckCircle2, ChevronDown } from "lucide-react";

export interface SelectedLocation {
  state: string;
  district: string;
  subdistrict?: string;
  zone?: string;
  agroClimaticZone?: string;
  typicalAnnualRainfallMm?: number;
  majorCrops?: string[];
  majorSoils?: string[];
  primaryAgroContext?: string;
  coordinates?: { lat: number; lng: number };
}

interface LocationExplorerProps {
  initialState?: string;
  initialDistrict?: string;
  initialSubdistrict?: string;
  onChange?: (loc: SelectedLocation) => void;
  compact?: boolean;
  showCardSummary?: boolean;
  className?: string;
}

export default function LocationExplorer({
  initialState = "Punjab",
  initialDistrict = "Ludhiana",
  initialSubdistrict = "",
  onChange,
  compact = false,
  showCardSummary = true,
  className = "",
}: LocationExplorerProps) {
  const [selectedState, setSelectedState] = useState<string>(initialState);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>(initialSubdistrict);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchLocations>>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Get current state object
  const currentStateObj = useMemo(() => {
    return ALL_INDIAN_STATES_AND_UTS.find((s) => s.name.toLowerCase() === selectedState.toLowerCase()) || ALL_INDIAN_STATES_AND_UTS[0];
  }, [selectedState]);

  // Districts for current state
  const availableDistricts = useMemo(() => {
    return currentStateObj ? currentStateObj.districts : [];
  }, [currentStateObj]);

  // Current district object
  const currentDistrictObj = useMemo(() => {
    return availableDistricts.find((d) => d.name.toLowerCase() === selectedDistrict.toLowerCase()) || availableDistricts[0] || null;
  }, [availableDistricts, selectedDistrict]);

  // Subdistricts / Taluks for current district
  const availableSubdistricts = useMemo(() => {
    return currentDistrictObj ? currentDistrictObj.subdistricts : [];
  }, [currentDistrictObj]);

  // Sync state changes to parent callback
  useEffect(() => {
    if (!currentDistrictObj || !currentStateObj) return;

    const loc: SelectedLocation = {
      state: currentStateObj.name,
      district: currentDistrictObj.name,
      subdistrict: selectedSubdistrict || currentDistrictObj.subdistricts[0] || "",
      zone: currentStateObj.zone,
      agroClimaticZone: currentStateObj.agroClimaticZone,
      typicalAnnualRainfallMm: currentDistrictObj.typicalAnnualRainfallMm,
      majorCrops: currentDistrictObj.majorCrops,
      majorSoils: currentDistrictObj.majorSoils,
      primaryAgroContext: currentDistrictObj.primaryAgroContext,
      coordinates: { lat: currentDistrictObj.latitude, lng: currentDistrictObj.longitude },
    };

    if (onChange) {
      onChange(loc);
    }
  }, [selectedState, selectedDistrict, selectedSubdistrict]);

  // Handle autocomplete search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    const results = searchLocations(searchQuery);
    setSearchResults(results);
    setShowSearchDropdown(results.length > 0);
  }, [searchQuery]);

  const handleSelectSearchResult = (item: any) => {
    setSelectedState(item.state);
    if (item.district) {
      setSelectedDistrict(item.district);
    }
    if (item.subdistrict) {
      setSelectedSubdistrict(item.subdistrict);
    }
    setSearchQuery("");
    setShowSearchDropdown(false);
  };

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const stateObj = ALL_INDIAN_STATES_AND_UTS.find((s) => s.name === stateName);
    if (stateObj && stateObj.districts.length > 0) {
      const firstDistrict = stateObj.districts[0];
      setSelectedDistrict(firstDistrict.name);
      setSelectedSubdistrict(firstDistrict.subdistricts[0] || "");
    } else {
      setSelectedDistrict("");
      setSelectedSubdistrict("");
    }
  };

  const handleDistrictChange = (districtName: string) => {
    setSelectedDistrict(districtName);
    const distObj = availableDistricts.find((d) => d.name === districtName);
    if (distObj && distObj.subdistricts.length > 0) {
      setSelectedSubdistrict(distObj.subdistricts[0]);
    } else {
      setSelectedSubdistrict("");
    }
  };

  // Browser Geolocation quick picker
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Find closest district in our Pan-India dataset
        let closestDist: DistrictInfo | null = null;
        let closestDistDiff = Infinity;
        let matchedStateName = "";

        for (const s of ALL_INDIAN_STATES_AND_UTS) {
          for (const d of s.districts) {
            const dist = Math.hypot(d.latitude - latitude, d.longitude - longitude);
            if (dist < closestDistDiff) {
              closestDistDiff = dist;
              closestDist = d;
              matchedStateName = s.name;
            }
          }
        }

        if (closestDist && matchedStateName) {
          setSelectedState(matchedStateName);
          setSelectedDistrict(closestDist.name);
          setSelectedSubdistrict(closestDist.subdistricts[0] || "");
        }
        setIsLocating(false);
      },
      (err) => {
        console.warn("Geolocation lookup error:", err);
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Autocomplete Search & Geolocation Button */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
              placeholder="Search any Indian State, District, or Tehsil (e.g. Ludhiana, Nashik, Thanjavur, Indore)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-emerald-950/80 bg-white dark:bg-[#111A14] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
            />
          </div>

          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            title="Auto-detect closest Indian district from GPS"
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-xs font-semibold whitespace-nowrap transition-colors"
          >
            <Compass className={`w-3.5 h-3.5 ${isLocating ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{isLocating ? "Locating..." : "Use GPS"}</span>
          </button>
        </div>

        {/* Autocomplete Dropdown */}
        {showSearchDropdown && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 z-30 max-h-60 overflow-y-auto rounded-xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] shadow-xl divide-y divide-gray-100 dark:divide-emerald-950/50">
            {searchResults.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSearchResult(item)}
                className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 transition-colors flex items-start gap-2.5"
              >
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span>{item.label}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-gray-100 dark:bg-emerald-950 text-gray-600 dark:text-emerald-300">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    {item.details}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cascading Dropdowns: State -> District -> Subdistrict */}
      <div className={`grid gap-3 ${compact ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-3"}`}>
        {/* State or UT */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            State / Union Territory (36)
          </label>
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-gray-200 dark:border-emerald-950/80 bg-white dark:bg-[#111A14] text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
            >
              {ALL_INDIAN_STATES_AND_UTS.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.zone})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* District */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            District ({availableDistricts.length})
          </label>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              disabled={availableDistricts.length === 0}
              className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-gray-200 dark:border-emerald-950/80 bg-white dark:bg-[#111A14] text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer disabled:opacity-50"
            >
              {availableDistricts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Subdistrict / Tehsil */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Tehsil / Taluk / Block
          </label>
          <div className="relative">
            <select
              value={selectedSubdistrict}
              onChange={(e) => setSelectedSubdistrict(e.target.value)}
              disabled={availableSubdistricts.length === 0}
              className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-gray-200 dark:border-emerald-950/80 bg-white dark:bg-[#111A14] text-xs font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer disabled:opacity-50"
            >
              {availableSubdistricts.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Real-time Agro-Climatic Intelligence Card */}
      {showCardSummary && currentDistrictObj && currentStateObj && (
        <div className="rounded-2xl p-4 bg-emerald-50/70 dark:bg-[#0D1610] border border-emerald-200/80 dark:border-emerald-950 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 dark:border-emerald-950/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">
                {currentDistrictObj.name}, {currentStateObj.name}
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                {currentStateObj.zone} India
              </span>
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 font-mono">
              <Compass className="w-3 h-3 text-emerald-500" />
              {currentDistrictObj.latitude.toFixed(2)}°N, {currentDistrictObj.longitude.toFixed(2)}°E
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs">
            {/* Zone & Rainfall */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-[11px]">
                <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                <span>Normal Annual Rainfall</span>
              </div>
              <div className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                ~{currentDistrictObj.typicalAnnualRainfallMm} mm / year
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                Zone: {currentStateObj.agroClimaticZone}
              </div>
            </div>

            {/* Dominant Crops */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-[11px]">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                <span>Key Regional Crops</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {currentDistrictObj.majorCrops.map((crop, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-[#111A14] border border-emerald-100 dark:border-emerald-950 text-gray-800 dark:text-gray-200"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Soil Profiles */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-[11px]">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>Major Soil Types</span>
              </div>
              <div className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
                {currentDistrictObj.majorSoils.join(", ")}
              </div>
            </div>
          </div>

          {currentDistrictObj.primaryAgroContext && (
            <p className="mt-3 pt-2.5 border-t border-emerald-100/60 dark:border-emerald-950/50 text-[11px] text-gray-600 dark:text-gray-400 italic">
              💡 {currentDistrictObj.primaryAgroContext}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
