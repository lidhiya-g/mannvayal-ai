"use client";
import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { User, Mail, Globe2, Shield, Save, Lock, CheckCircle2, AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/languages";

export default function ProfilePage() {
  const { user, setUser, setLanguage, language } = useApp();


  const [fullName, setFullName] = useState("");
  const [preferredLang, setPreferredLang] = useState("en");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [curPwd, setCurPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdError, setPwdError] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setPreferredLang(user.preferredLang || language || "en");
    }
  }, [user, language]);

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="text-gray-400 text-sm">Not signed in</div>
          <Link href="/login" className="text-xs text-emerald-600 hover:underline">Sign In</Link>
        </div>
      </div>
    );
  }

  const initials = user.fullName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { year:"numeric", month:"long" }) : "N/A";

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setSaved(false); setError("");
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName.trim(), preferredLang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setUser(data.user);
      setLanguage(preferredLang);
      localStorage.setItem("mv_lang", preferredLang);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(""); setPwdMsg("");
    if (newPwd !== confirmPwd) { setPwdError("Passwords do not match"); return; }
    if (newPwd.length < 8) { setPwdError("Password must be at least 8 characters"); return; }
    setPwdSaving(true);
    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: curPwd, newPassword: newPwd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setPwdMsg("Password changed successfully.");
      setCurPwd(""); setNewPwd(""); setConfirmPwd("");
    } catch (err: any) {
      setPwdError(err.message);
    } finally {
      setPwdSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-emerald-950/30 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">My Profile</h1>
            <p className="text-xs text-gray-500">Manage your account, language, and security settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Avatar Card */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-5 text-center shadow-sm">
              <div className="w-20 h-20 rounded-full avatar-gradient flex items-center justify-center text-white text-2xl font-black mx-auto shadow-lg shadow-emerald-900/20">
                {initials}
              </div>
              <div>
                <div className="font-bold text-base text-gray-900 dark:text-gray-100">{user.fullName}</div>
                <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
                <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="w-2.5 h-2.5" /> {user.role}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-emerald-950 space-y-2 text-xs text-left">
                <div className="flex justify-between"><span className="text-gray-500">Member Since</span><span className="font-medium text-gray-900 dark:text-gray-100">{memberSince}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Verified</span><span className="font-medium text-emerald-600">{user.isVerified ? "Yes" : "No"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Language</span><span className="font-medium text-gray-900 dark:text-gray-100">{SUPPORTED_LANGUAGES.find(l => l.code === (user.preferredLang || "en"))?.name || "English"}</span></div>
              </div>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] shadow-sm">
              <h2 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-5 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" /> Profile Information
              </h2>
              {saved && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Profile saved successfully!
                </div>
              )}
              {error && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text" required minLength={2} maxLength={100}
                      value={fullName} onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Email Address (Read-only)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="email" value={user.email} readOnly className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-emerald-950 bg-gray-50 dark:bg-[#080D0A] text-gray-500 cursor-not-allowed" />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-600" /> Preferred Language
                  </label>
                  <select
                    value={preferredLang} onChange={(e) => setPreferredLang(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-white dark:bg-[#111A14] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>{lang.name} ({lang.nativeName})</option>
                    ))}
                  </select>
                  <p className="text-[10px] text-gray-400 mt-1">Changing this will update the platform language immediately and save to your profile.</p>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-500" /> Role
                  </label>
                  <div className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-emerald-950 bg-gray-50 dark:bg-[#080D0A] text-gray-500 text-xs">{user.role}</div>
                </div>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold btn-primary disabled:opacity-60">
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] shadow-sm">
              <h2 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-5 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-500" /> Change Password
              </h2>
              {pwdMsg && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> {pwdMsg}
                </div>
              )}
              {pwdError && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {pwdError}
                </div>
              )}
              <form onSubmit={handleChangePassword} className="space-y-4 text-xs sm:text-sm">
                {[{ label:"Current Password", val:curPwd, set:setCurPwd }, { label:"New Password (min 8 chars)", val:newPwd, set:setNewPwd }, { label:"Confirm New Password", val:confirmPwd, set:setConfirmPwd }].map((field, i) => (
                  <div key={i}>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">{field.label}</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password" required value={field.val} onChange={(e) => field.set(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                ))}
                <button type="submit" disabled={pwdSaving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-60 transition-colors">
                  <Lock className="w-3.5 h-3.5" />
                  {pwdSaving ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
