"use client";

import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import ThemeLanguageControls from "./ThemeLanguageControls";
import LiveDataBadge from "../visual/LiveDataBadge";
import { useApp } from "@/context/AppContext";
import { Menu, Sprout, ChevronDown, Bell, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { farms, activeFarm, setActiveFarm, t } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#080D0A] text-gray-900 dark:text-gray-100 font-sans transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 h-screen sticky top-0">
        <DashboardSidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10">
            <DashboardSidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Operational Bar */}
        <header className="h-18 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-emerald-950/60 bg-white dark:bg-[#111A14] flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-emerald-950/40 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Farm Selector Dropdown */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Sprout className="w-4 h-4" />
              </div>

              {farms.length > 0 ? (
                <div className="relative">
                  <select
                    aria-label="Select Active Farm"
                    value={activeFarm?.id || ""}
                    onChange={(e) => {
                      const f = farms.find((item) => item.id === e.target.value);
                      if (f) setActiveFarm(f);
                    }}
                    className="appearance-none font-semibold text-xs sm:text-sm bg-transparent pr-7 py-1 text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer"
                  >
                    {farms.map((f) => (
                      <option key={f.id} value={f.id} className="bg-white dark:bg-[#111A14]">
                        {f.name} ({f.totalArea} ac • {f.district})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              ) : (
                <Link
                  href="/onboarding"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add Farm Profile
                </Link>
              )}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LiveDataBadge />
            </div>

            <ThemeLanguageControls />

            <Link
              href="/dashboard/weather-alerts"
              className="p-2 rounded-full text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-emerald-950/40 relative"
              title="Weather Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
