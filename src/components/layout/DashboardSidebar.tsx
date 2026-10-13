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
  X,
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, t } = useApp();

  const links = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/dashboard/simulator", label: t.nav.simulator, icon: CloudSunRain },
    { href: "/dashboard/regret-calculator", label: t.nav.regretCalculator, icon: Calculator },
    { href: "/dashboard/water-budget", label: t.nav.waterBudget, icon: Droplets },
    { href: "/dashboard/timeline", label: t.nav.timeline, icon: CalendarCheck2 },
    { href: "/dashboard/community", label: t.nav.community, icon: Users2 },
    { href: "/dashboard/advisor", label: t.nav.advisor, icon: Bot },
    { href: "/dashboard/memory", label: t.nav.memory, icon: BookOpenCheck },
    { href: "/dashboard/crop-library", label: "Crop Library", icon: Library },
    { href: "/dashboard/weather-alerts", label: t.nav.alerts, icon: BellRing },
    { href: "/dashboard/confidence", label: t.nav.confidence, icon: ShieldCheck },
    { href: "/dashboard/reports", label: t.nav.reports, icon: FileText },
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
            <div className="text-[10px] text-gray-400 font-tamil">மண்வயல் முடிவகக் கூடம்</div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto space-y-1 py-2 pr-1 custom-scrollbar">
        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 px-3 py-1">
          Decision Engines
        </div>
        {links.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
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

        {showAdmin && (
          <>
            <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 px-3 pt-4 pb-1">
              Governance
            </div>
            <Link
              href="/dashboard/admin"
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                pathname === "/dashboard/admin"
                  ? "bg-amber-600 text-white font-semibold shadow-xs"
                  : "text-amber-700 dark:text-amber-400/90 hover:bg-amber-50 dark:hover:bg-amber-950/20"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{t.nav.admin}</span>
            </Link>
          </>
        )}
      </div>

      {/* User profile capsule at footer */}
      <div className="pt-3 border-t border-gray-100 dark:border-emerald-950 flex items-center justify-between">
        <div className="truncate pr-2">
          <div className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
            {user?.fullName || "Guest Farmer"}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
            {user?.role || "FARMER"}
          </div>
        </div>
      </div>
    </aside>
  );
}
