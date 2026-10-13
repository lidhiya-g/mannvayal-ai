"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { AdvisorResponse } from "@/lib/advisorKnowledge";
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Info,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export default function FarmAdvisorPage() {
  const { activeFarm, language, t } = useApp();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "advisor"; text?: string; responseData?: AdvisorResponse }[]
  >([
    {
      role: "advisor",
      text:
        language === "ta"
          ? "வணக்கம்! நான் உங்கள் மண்வயல் வேளாண் ஆலோசகர். பருவமழை தாமதம், காய்ச்சலும் பாய்ச்சலும் பாசனம், மாற்றுப்பயிர்கள் அல்லது பயிர் பாதுகாப்பு பற்றி எதையும் கேளுங்கள். ஒவ்வொரு பதிலுக்கும் விரிவான காரணங்களும், ஆதாரங்களும் வழங்கப்படும்."
          : "Vanakkam! I am your MannVayal Explainable Farm Advisor. Ask me anything regarding monsoon delays, AWD irrigation pacing, contingency crops, or pest thresholds. Every answer provides full transparent reasoning and TNAU citations.",
    },
  ]);

  const quickQuestions =
    language === "ta"
      ? [
          "பருவமழை தாமதமானால் என்ன மாற்றுப்பயிர் செய்யலாம்?",
          "காய்ச்சலும் பாய்ச்சலும் (AWD) பாசனம் எப்படி செய்வது?",
          "ஜல் ஜீவன் இயக்கத்தின் கீழ் கிராம குடிநீர் குழாய் இணைப்பு வழிகாட்டுதல் என்ன?",
          "கிராம வளர்ச்சி முன்னுரிமை கணிப்பான் எவ்வாறு கணக்கிடுகிறது?",
        ]
      : [
          "What contingency crops work best if monsoon is delayed?",
          "How do I practice Alternate Wetting and Drying (AWD)?",
          "What is the Jal Jeevan Mission rural drinking water mandate?",
          "How does the Village Development Priority Planner calculate composite scores?",
        ];

  const handleAsk = async (queryText?: string) => {
    const q = queryText || question;
    if (!q.trim()) return;

    const userMsg = { role: "user" as const, text: q };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          language: language === "ta" ? "ta" : "en",
          farmContext: {
            crop: activeFarm?.cropCycles?.[0]?.cropCode || "PADDY",
            stage: activeFarm?.cropCycles?.[0]?.currentStage || "Panicle Initiation",
            district: activeFarm?.district || "Thanjavur",
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Advisor query failed");

      setMessages((prev) => [...prev, { role: "advisor", responseData: data.response }]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "advisor",
          text: "Failed to connect to the advisor engine. Please check your network or try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Flagship Decision Engine #6
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2 mt-1">
            <Bot className="w-7 h-7 text-emerald-500" />
            {t.advisor.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t.advisor.subtitle}
          </p>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> {t.advisor.suggestedQuestions}:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] hover:border-emerald-500 text-gray-700 dark:text-gray-300 transition-colors shadow-2xs text-left"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat History & Explanation Cards */}
        <div className="p-4 sm:p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#0c130f] shadow-xs min-h-[420px] flex flex-col justify-between space-y-6">
          <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
            {messages.map((msg, idx) => {
              if (msg.role === "user") {
                return (
                  <div key={idx} className="flex justify-end">
                    <div className="max-w-xl p-4 rounded-2xl bg-emerald-600 text-white text-xs sm:text-sm font-medium shadow-sm">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              // Advisor response card
              const resp = msg.responseData;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-4">
                    {/* Main Direct Answer */}
                    <div className="p-5 rounded-2xl border border-gray-100 dark:border-emerald-950 bg-gray-50/70 dark:bg-[#111A14] text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                      {resp ? resp.answer : msg.text}
                    </div>

                    {/* Transparent Reasoning Chain & Evidence */}
                    {resp && (
                      <div className="p-5 rounded-2xl border border-emerald-900/30 bg-emerald-950/10 dark:bg-[#142319] space-y-4 text-xs">
                        {/* Reasoning Chain */}
                        <div>
                          <div className="font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Transparent Reasoning Chain:
                          </div>
                          <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                            {resp.explanationChain.map((step, sIdx) => (
                              <li key={sIdx} className="leading-relaxed">
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Documented Assumptions */}
                        <div>
                          <div className="font-semibold text-gray-500 mb-1">Assumptions & Soil Context:</div>
                          <ul className="list-disc pl-4 space-y-0.5 text-gray-500 dark:text-gray-400 text-[11px]">
                            {resp.assumptions.map((asmp, aIdx) => (
                              <li key={aIdx}>{asmp}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Suggested Next Steps */}
                        <div>
                          <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Actionable Next Steps:
                          </div>
                          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                            {resp.suggestedNextSteps.map((step, nIdx) => (
                              <li key={nIdx} className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold">→</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Data Sources Citations */}
                        <div className="pt-2 border-t border-emerald-900/30 flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-400">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                            <span>
                              Citations: {resp.dataSources.map((d) => `${d.title} (${d.publisher}, ${d.year})`).join("; ")}
                            </span>
                          </div>
                          <span className="font-mono px-2 py-0.5 rounded bg-emerald-900/30 text-emerald-300">
                            Uncertainty: {resp.uncertaintyLevel}
                          </span>
                        </div>

                        {/* Mandatory KVK Disclaimers */}
                        <div className="pt-2 border-t border-emerald-900/30 text-[11px] text-amber-700 dark:text-amber-300/80 leading-relaxed flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                          <span>{resp.disclaimer}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 p-4">
                <span className="animate-spin text-base">⏳</span>
                Analyzing farm context and cross-referencing TNAU/ICAR knowledge base...
              </div>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-emerald-950"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.advisor.inputPlaceholder}
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 dark:border-emerald-900/60 bg-transparent text-xs sm:text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white shadow-sm flex items-center justify-center shrink-0 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
