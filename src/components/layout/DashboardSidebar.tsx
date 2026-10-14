"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  LayoutDashboard, CloudSunRain, Calculator, Droplets, CalendarCheck2,
  Users2, Bot, BookOpenCheck, Library, BellRing, ShieldCheck,
  FileText, Settings, Sprout, Building2, X, UserCircle2
} from "lucide-react";

interface SidebarProps { onClose?: () => void; }

export default function DashboardSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, t } = useApp();

  const agriLinks = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/dashboard/simulator", label: t.nav.simulator, icon: CloudSunRain },
    { href: "/dashboard/regret-calculator", label: t.nav.regretCalculator, icon: Calculator },
    { href: "/dashboard/water-budget", label: t.nav.waterBudget, icon: Droplets },
    { href: "/dashboard/timeline", label: t.nav.timeline, icon: CalendarCheck2 },
    { href: "/dashboard/crop-library", label: "Crop Library", icon: Library },
  ];

  const ruralLinks = [
    { href: "/dashboard/village-development", label: "Village Development", icon: Building2 },
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

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={onClose}
        className={`group flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
          isActive
            ? "bg-emerald-600 text-white font-semibold shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#111A14] hover:text-gray-900 dark:hover:text-gray-100"
        }`}
      >
        <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-gray-400 dark:text-gray-500"}`} />
        <span className="truncate">{label}</span>
        {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse-soft" />}
      </Link>
    );
  };

  return (
    <aside className="w-64 h-full flex flex-col border-r border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#080D0A] p-4 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-5 mb-2 border-b border-gray-100 dark:border-emerald-950">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <Sprout className="w-4 h-4 text-emerald-100" />
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900 dark:text-gray-100">MannVayal AI</div>
            <div className="text-[9px] text-gray-500 dark:text-gray-400">Agri &amp; Rural Intelligence</div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto space-y-5 py-2 pr-1 custom-scrollbar">
        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 px-3 py-1 flex items-center gap-1.5">
            <Sprout className="w-3 h-3" /> Smart Agriculture
          </div>
          {agriLinks.map((item) => <NavLink key={item.href} {...item} />)}
        </div>

        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 px-3 py-1 flex items-center gap-1.5">
            <Building2 className="w-3 h-3" /> Rural Development
          </div>
          {ruralLinks.map((item) => <NavLink key={item.href} {...item} />)}
        </div>

        <div className="space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 px-3 py-1">
            AI &amp; Governance
          </div>
          {commonLinks.map((item) => <NavLink key={item.href} {...item} />)}
        </div>

        {showAdmin && (
          <div className="space-y-1 pt-1 border-t border-gray-100 dark:border-emerald-950">
            <NavLink href="/dashboard/admin" label={t.nav.admin} icon={Settings} />
          </div>
        )}
      </div>

      {/* User profile footer */}
      {user && (
        <div className="pt-3 border-t border-gray-100 dark:border-emerald-950">
          <Link
            href="/dashboard/profile"
            onClick={onClose}
            className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#111A14] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full avatar-gradient flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.fullName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-xs text-gray-900 dark:text-gray-100 truncate">{user.fullName}</div>
              <div className="text-[10px] text-gray-400 truncate">{user.role}</div>
            </div>
            <UserCircle2 className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors shrink-0" />
          </Link>
        </div>
      )}
    </aside>
  );
}
