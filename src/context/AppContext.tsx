"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/lib/i18n/languages";
import { getDictionary, TranslationDictionary } from "@/lib/i18n";

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  role: string;
  preferredLang: string;
  state?: string;
  district?: string;
}

export interface Farm {
  id: string;
  name: string;
  state: string;
  district: string;
  village?: string;
  totalArea: number;
  soilType: string;
  irrigationType: string;
  waterCapacityM3?: number;
  cropCycles?: any[];
  weatherCache?: any[];
  climateScenarios?: any[];
  waterBudgets?: any[];
}

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: TranslationDictionary;
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  farms: Farm[];
  activeFarm: Farm | null;
  setActiveFarm: (farm: Farm | null) => void;
  refreshFarms: () => Promise<void>;
  isLiveWeather: boolean;
  setIsLiveWeather: (val: boolean) => void;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(DEFAULT_LANGUAGE);
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("light");
  const [user, setUser] = useState<UserSession | null>(null);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [activeFarm, setActiveFarm] = useState<Farm | null>(null);
  const [isLiveWeather, setIsLiveWeather] = useState<boolean>(true);

  // Initialize from localStorage and fetch current session
  useEffect(() => {
    // 1. Language preference
    const savedLang = localStorage.getItem("mv_lang");
    if (savedLang) {
      setLanguageState(savedLang);
    }

    // 2. Theme preference
    const savedTheme = (localStorage.getItem("mv_theme") as "light" | "dark" | "system") || "light";
    setThemeState(savedTheme);
    applyThemeClass(savedTheme);

    // 3. User session
    fetchUserSession();
  }, []);

  // Update HTML document attributes when language changes
  useEffect(() => {
    const langOpt = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    document.documentElement.lang = language;
    document.documentElement.dir = langOpt?.dir || "ltr";
    localStorage.setItem("mv_lang", language);
  }, [language]);

  const applyThemeClass = (selectedTheme: "light" | "dark" | "system") => {
    const root = document.documentElement;
    const isDark =
      selectedTheme === "dark" ||
      (selectedTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    localStorage.setItem("mv_theme", newTheme);
    applyThemeClass(newTheme);
  };

  const setLanguage = (newLang: string) => {
    setLanguageState(newLang);
    localStorage.setItem("mv_lang", newLang);
  };

  const fetchUserSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          if (data.user.preferredLang) {
            setLanguage(data.user.preferredLang);
          }
          if (data.user.farms && data.user.farms.length > 0) {
            setFarms(data.user.farms);
            setActiveFarm(data.user.farms[0]);
          }
        }
      }
    } catch (e) {
      console.warn("User session check failed:", e);
    }
  };

  const refreshFarms = async () => {
    try {
      const res = await fetch("/api/farms");
      if (res.ok) {
        const data = await res.json();
        setFarms(data.farms || []);
        if (data.farms?.length > 0 && !activeFarm) {
          setActiveFarm(data.farms[0]);
        }
      }
    } catch (e) {
      console.error("Failed to refresh farms:", e);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setFarms([]);
      setActiveFarm(null);
      window.location.href = "/";
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const t = getDictionary(language);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        user,
        setUser,
        farms,
        activeFarm,
        setActiveFarm,
        refreshFarms,
        isLiveWeather,
        setIsLiveWeather,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
