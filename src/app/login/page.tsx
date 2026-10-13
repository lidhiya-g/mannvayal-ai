"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import { Sprout, Lock, Mail, KeyRound, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, refreshFarms, t } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otpMode, otpCode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");

      setUser(data.user);
      await refreshFarms();
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const fillQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setOtpMode(false);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-md">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Sign In to MannVayal AI
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Access your farm decision engines and weather scenarios
            </p>
          </div>

          {/* Quick Demo Selector */}
          <div className="p-3 rounded-2xl border border-emerald-900/30 bg-emerald-500/5 text-xs space-y-2">
            <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> One-Click Demo Logins:
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => fillQuickDemo("farmer@mannvayal.ai", "MannVayal@2026")}
                className="p-1.5 rounded-lg border border-emerald-600/30 bg-white dark:bg-[#111A14] text-gray-800 dark:text-gray-200 hover:border-emerald-500 text-center font-medium"
              >
                🌾 Farmer
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo("advisor@mannvayal.ai", "Advisor@2026")}
                className="p-1.5 rounded-lg border border-emerald-600/30 bg-white dark:bg-[#111A14] text-gray-800 dark:text-gray-200 hover:border-emerald-500 text-center font-medium"
              >
                🎓 Advisor
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo("admin@mannvayal.ai", "Admin@2026")}
                className="p-1.5 rounded-lg border border-emerald-600/30 bg-white dark:bg-[#111A14] text-gray-800 dark:text-gray-200 hover:border-emerald-500 text-center font-medium"
              >
                ⚙️ Admin
              </button>
            </div>
          </div>

          {/* Form Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] shadow-sm">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="farmer@mannvayal.ai"
                  />
                </div>
              </div>

              {!otpMode ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-gray-700 dark:text-gray-300">Password</label>
                    <button
                      type="button"
                      onClick={() => setOtpMode(true)}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Use OTP Login instead
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-gray-700 dark:text-gray-300">
                      OTP Code (Dev Demo: 123456)
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpMode(false)}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Use Password instead
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter 6-digit OTP code"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                {loading ? "Authenticating..." : "Sign In to Dashboard"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-5 mt-5 border-t border-gray-100 dark:border-emerald-950 text-center text-xs text-gray-500">
              Don't have an account yet?{" "}
              <Link href="/register" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                Register Farm Profile
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
