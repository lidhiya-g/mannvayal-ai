"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to submit message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left info column */}
          <div className="md:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Get in Touch
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Liaison & Support
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Have questions regarding data integrations, institutional partnerships with FPOs or KVKs, or agricultural advisory feedback?
            </p>

            <div className="space-y-4 pt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">Email Inquiries</div>
                  <div>support@mannvayal.ai</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">Regional Focus</div>
                  <div>Cauvery Delta & Tamil Nadu Agro-Ecological Zones</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form column */}
          <div className="md:col-span-7">
            <div className="p-8 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] shadow-xs">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Send Message</h2>

              {success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Your inquiry has been securely recorded. An agricultural coordinator will review it shortly.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. S. Ramanathan"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="farmer@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Inquiry or Agronomic Feedback"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-900/60 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder="Write your feedback, question, or partnership inquiry here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending..." : "Submit Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
