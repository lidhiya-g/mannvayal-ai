"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Radio, Database, RefreshCw } from "lucide-react";

export default function LiveDataBadge() {
  const { isLiveWeather, setIsLiveWeather, t } = useApp();

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors shadow-sm bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/40">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          {isLiveWeather ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          )}
        </span>
        <span className={isLiveWeather ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}>
          {isLiveWeather ? t.hero.liveIndicator : t.hero.demoIndicator}
        </span>
      </div>

      <button
        onClick={() => setIsLiveWeather(!isLiveWeather)}
        title="Toggle between Live meteorological feed and simulated scenario"
        className="ml-1 text-[11px] underline opacity-75 hover:opacity-100 flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-300"
      >
        <RefreshCw className="w-2.5 h-2.5" />
        {isLiveWeather ? "Switch to Demo" : "Switch to Live"}
      </button>
    </div>
  );
}
