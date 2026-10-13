"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/languages";
import { Sun, Moon, Laptop, Globe } from "lucide-react";

export default function ThemeLanguageControls() {
  const { language, setLanguage, theme, setTheme, t } = useApp();

  return (
    <div className="flex items-center gap-2">
      {/* 13 Indian Languages Selector */}
      <div className="relative flex items-center">
        <label htmlFor="language-select" className="sr-only">Select Language</label>
        <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute left-2.5 pointer-events-none" />
        <select
          id="language-select"
          aria-label="Select Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="appearance-none pl-8 pr-7 py-1.5 text-xs font-medium rounded-full border border-gray-300 dark:border-emerald-800/50 bg-white dark:bg-[#111A14] text-gray-900 dark:text-gray-100 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-sm transition-colors"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-white dark:bg-[#111A14] text-gray-900 dark:text-gray-100">
              {lang.nativeName} ({lang.name})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">
          ▼
        </div>
      </div>

      {/* Global Theme Toggle */}
      <div className="flex items-center rounded-full border border-gray-300 dark:border-emerald-800/50 bg-white dark:bg-[#111A14] p-0.5 shadow-sm">
        <button
          onClick={() => setTheme("light")}
          title={t.common.themeLight}
          className={`p-1.5 rounded-full transition-colors ${
            theme === "light"
              ? "bg-amber-100 text-amber-700 shadow-xs"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          title={t.common.themeDark}
          className={`p-1.5 rounded-full transition-colors ${
            theme === "dark"
              ? "bg-emerald-900/60 text-emerald-300 shadow-xs"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setTheme("system")}
          title={t.common.themeSystem}
          className={`p-1.5 rounded-full transition-colors ${
            theme === "system"
              ? "bg-gray-200 dark:bg-emerald-800/40 text-gray-800 dark:text-gray-100 shadow-xs"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
