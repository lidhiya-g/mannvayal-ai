"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  LayoutDashboard,
  CloudSunRain,
  Calculator,
  Droplets,
  CalendarCheck2,
  Users2,
  Bot,
  BookOpenCheck,
  Library,
  BellRing,
  ShieldCheck,
  FileText,
  Settings,
  Sprout,
  Building2,
  X,
  Compass,
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, t, language } = useApp();

  const agriLinks = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/dashboard/simulator", label: t.nav.simulator, icon: CloudSunRain },
    { href: "/dashboard/regret-calculator", label: t.nav.regretCalculator, icon: Calculator },
    { href: "/dashboard/water-budget", label: t.nav.waterBudget, icon: Droplets },
    { href: "/dashboard/timeline", label: t.nav.timeline, icon: CalendarCheck2 },
    { href: "/dashboard/crop-library", label: "Crop Library", icon: Library },
  ];

  const ruralLinks = [
    { href: "/dashboard/village-development", label: "Village Development & Planner", icon: Building2 },
    { href: "/dashboard/community", label: t.nav.community, icon: Users2 },
    { href: "/dashboard/reports", label: t.nav.reports, icon: FileText },
  ];

  const commonLinks = [
    { href: "/dashboard/advisor", label: t.nav.advisor, icon: Bot },
    { href: "/dashboard/memory", label: t.nav.memory, icon: BookOpenCheck },
    { href: "/dashboard/weather-alerts", label: t.nav.alerts, icon: BellRing },
    { href: "/dashboard/confidence", label: t.nav.confidence, icon: ShieldCheck },
  ];

  const showAdmin = user?.role === "PLATFORM_ADMIN" || user?.role === "ADVISOR";

  return (
    <aside className="w-64 h-full flex flex-col border-r border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#080D0A] p-4 select-none">
      {/* Brand & Mobile close button */}
      <div className="flex items-center justify-between pb-5 mb-2 border-b border-gray-100 dark:border-emerald-950">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <Sprout className="w-4 h-4 text-emerald-100" />
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1">
              MannVayal AI
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400">
              {language === "ta" ? "மண்வயல் முடிவகக் கூடம்" : "Agri & Rural Intelligence"}
            </div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-1 custom-scrollbar">
        {/* SECTION 1: SMART AGRICULTURE */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 px-3 py-1 flex items-center gap-1.5">
            <Sprout className="w-3 h-3" />
            <span>Smart Agriculture</span>
          </div>
          {agriLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#111A14] hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400 dark:text-gray-500"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* SECTION 2: RURAL DEVELOPMENT */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 px-3 py-1 flex items-center gap-1.5">
            <Building2 className="w-3 h-3" />
            <span>Rural Development</span>
          </div>
          {ruralLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#111A14] hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400 dark:text-gray-500"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* SECTION 3: SHARED AI & GOVERNANCE */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 px-3 py-1">
            AI & Governance
          </div>
          {commonLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#111A14] hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400 dark:text-gray-500"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {showAdmin && (
          <div className="space-y-1 pt-1 border-t border-gray-100 dark:border-emerald-950">
            <Link
              href="/dashboard/admin"
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                pathname === "/dashboard/admin"
                  ? "bg-emerald-600 text-white font-semibold shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#111A14]"
              }`}
            >
              <Settings className="w-4 h-4 text-amber-500" />
              <span>Admin Center</span>
            </Link>
          </div>
        )}
      </div>

      {/* User profile footer */}
      {user && (
        <div className="pt-3 border-t border-gray-100 dark:border-emerald-950 flex items-center justify-between text-xs">
          <div className="min-w-0">
            <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">{user.fullName}</div>
            <div className="text-[10px] text-gray-400 truncate font-mono">{user.role}</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected" />
        </div>
      )}
    </aside>
  );
}
