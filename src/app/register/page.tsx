"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/languages";
import { Sprout, User, Mail, Phone, Lock, MapPin, Globe, AlertCircle, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setLanguage } = useApp();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    preferredLang: "ta",
    state: "Tamil Nadu",
    district: "Thanjavur",
    consentAgreed: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!form.consentAgreed) {
      setError("You must accept the terms and privacy conditions to register");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setUser(data.user);
      setLanguage(form.preferredLang);
      router.push("/onboarding");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-md">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Create Your Farmer Profile
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Empower your seasonal decisions with climate-smart simulation
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] shadow-sm">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Murugan Selvam"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="farmer@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Min 6 characters"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Preferred Language</label>
                  <select
                    value={form.preferredLang}
                    onChange={(e) => setForm({ ...form, preferredLang: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.nativeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">State</label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">District</label>
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
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={form.consentAgreed}
                    onChange={(e) => setForm({ ...form, consentAgreed: e.target.checked })}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>
                    I consent to the Terms of Service and Privacy Policy. I understand that MannVayal AI provides model-based decision support and does not guarantee yield or financial profits.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all mt-4"
              >
                {loading ? "Registering Account..." : "Continue to Farm Setup"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-5 mt-5 border-t border-gray-100 dark:border-emerald-950 text-center text-xs text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
