"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero3DField from "@/components/visual/Hero3DField";
import LiveDataBadge from "@/components/visual/LiveDataBadge";
import PanIndiaMap from "@/components/geo/PanIndiaMap";
import { useApp } from "@/context/AppContext";
import {
  CloudSunRain, Calculator, Droplets, CalendarCheck2,
  ArrowRight, CheckCircle2, Sparkles, BarChart3, ChevronDown,
  Leaf, Globe2, Building2, HeartPulse, GraduationCap, Zap,
  Briefcase, AlertTriangle, FileSpreadsheet, MapPin, Sprout, Wind, Shield, TrendingUp, Cpu
} from "lucide-react";

const fadeUp = { hidden:{ opacity:0, y:32 }, visible:{ opacity:1, y:0, transition:{ duration:0.6, ease:"easeOut" } } };
const stagger = { visible:{ transition:{ staggerChildren:0.12 } } };
const cardAnim = { hidden:{ opacity:0, y:24, scale:0.97 }, visible:{ opacity:1, y:0, scale:1, transition:{ duration:0.5, ease:"easeOut" } } };

export default function HomePage() {
  const { t } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q:"Does MannVayal AI require IoT devices, soil probes, or drone hardware?", a:"No. MannVayal AI is a 100% software-only platform. It operates using farmer-reported farm profiles, publicly available weather grids (Open-Meteo and IMD), official agronomic models (ICAR and state agricultural universities), and verified village data. No hardware installation is required." },
    { q:"How does the platform integrate agriculture with rural development?", a:"MannVayal AI addresses both farm-level climate risks and village-level infrastructure gaps under one unified architecture. Farmers make informed crop and water decisions, while Gram Panchayat leaders assess public utilities and plan development priorities with transparent multi-factor scoring." },
    { q:"How are village infrastructure gaps assessed?", a:"Observed village indicators are compared against official Central Ministry benchmarks: Jal Jeevan Mission (piped water), PMGSY (roads), IPHS (PHC within 5km), RTE (school within 1km), and SBM-G (sanitation). Gaps are calculated transparently with published data sources." },
    { q:"What formula does the Village Development Priority Planner use?", a:"Priority Score = (Urgency x 0.40) + (Community Impact x 0.40) + (Feasibility x 0.20), on a 1.0 to 5.0 scale. All scores are open, auditable, and never presented as automated bureaucratic diktats." },
    { q:"Does MannVayal AI cover all regions of India?", a:"Yes. MannVayal AI supports all 28 Indian States and 8 Union Territories through the Local Government Directory (LGD) hierarchy: State, District, Subdistrict/Block, and Village. It incorporates regional cropping patterns across all major agricultural zones." },
    { q:"Are yield predictions or village funding allocations guaranteed?", a:"No. MannVayal AI provides scenario-based decision support with confidence levels and verified citations. It does not provide deterministic yield or funding guarantees." },
  ];

  const agriFeatures = [
    { id:"A1", icon:CloudSunRain, color:"icon-bg-amber",   hb:"hover:border-amber-400/50",   title:"Climate Risk Analysis",   desc:"Evaluates rainfall anomalies (-50% to +50%), dry-spell days, and heat stress with IMD and Open-Meteo grids with explicit confidence tags.", href:"/dashboard/simulator",           cta:"Analyze Farm Risk" },
    { id:"A2", icon:Calculator,   color:"icon-bg-emerald", hb:"hover:border-emerald-400/50", title:"Smart Crop Selection",    desc:"Minimax Regret criterion across 5 erratic climate states. Protects capital against drought instead of chasing fragile top yields.",            href:"/dashboard/regret-calculator",   cta:"Evaluate Crop Regrets" },
    { id:"A3", icon:Droplets,     color:"icon-bg-blue",    hb:"hover:border-blue-400/50",    title:"Water Budget Wallet",     desc:"Balances crop ETc demands against borewell hours, farm ponds, and effective rainfall with AWD alternate wetting and drying models.",         href:"/dashboard/water-budget",        cta:"Calculate Water Balance" },
    { id:"A4", icon:CalendarCheck2, color:"icon-bg-purple", hb:"hover:border-purple-400/50", title:"Stage Rescue Timeline",  desc:"8-stage growth progression with active alert evaluations. Track critical flowering thresholds and field rescue tasks.",                      href:"/dashboard/timeline",            cta:"View Stage Timeline" },
  ];

  const ruralFeatures = [
    { id:"B1", icon:Building2,     color:"icon-bg-blue",    title:"Resource Assessment",  desc:"Evaluates 8 core dimensions: piped drinking water, PMGSY roads, electricity, PHC health distance, school access, sanitation, and digital CSCs.", href:"/dashboard/village-development", cta:"View Village Resources" },
    { id:"B2", icon:AlertTriangle, color:"icon-bg-amber",   title:"Infrastructure Gaps",  desc:"Compares observed values against official targets (Jal Jeevan Mission, PMGSY, IPHS, SBM-G). Honest Data Unavailable labels preserve truth.",     href:"/dashboard/village-development", cta:"Inspect Gaps" },
    { id:"B3", icon:Briefcase,     color:"icon-bg-emerald", title:"Livelihood Insights",  desc:"Analyzes agricultural dependence, lean-season periods, dairy cooperatives, and evidence-grounded micro-enterprises like solar cold rooms.",          href:"/dashboard/village-development", cta:"Explore Enterprises" },
    { id:"B4", icon:FileSpreadsheet, color:"icon-bg-purple", title:"Priority Planner",   desc:"Priority Score = (Urgency x 0.4) + (Impact x 0.4) + (Feasibility x 0.2). Gram Panchayats can track action items and export official CSV reports.", href:"/dashboard/village-development", cta:"Open Priority Planner" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">

        {/* HERO */}
        <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden border-b border-gray-100 dark:border-emerald-950/40">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-transparent to-sky-50/40 dark:from-emerald-950/20 dark:via-transparent dark:to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="lg:col-span-6 space-y-6">
                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-weather-pulse" />
                    {t.hero.badgeText}
                  </span>
                  <LiveDataBadge />
                </motion.div>
                <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight gradient-text-green">
                  {t.hero.headline}
                </motion.h1>
                <motion.p variants={fadeUp} className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">{t.hero.subheadline}</motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/dashboard" className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold btn-primary">
                    <Leaf className="w-4 h-4 text-emerald-200 animate-leaf-float" /><span>{t.hero.exploreFarm}</span><ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/dashboard/village-development" className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 transition-colors">
                    <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span>{t.hero.seeHowItWorks}</span>
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp} className="pt-4 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-emerald-950/60 text-xs">
                  {[{ label:"Zero Hardware", sub:"100% Software-Only" }, { label:"28 States and 8 UTs", sub:"Full India Coverage" }, { label:"13 Indian Langs", sub:"English Default" }].map((s, i) => (
                    <div key={i}><div className="font-bold text-gray-900 dark:text-gray-100">{s.label}</div><div className="text-gray-500">{s.sub}</div></div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="lg:col-span-6">
                <Hero3DField />
              </motion.div>
            </div>
          </div>
        </section>

        {/* METRICS BAR */}
        <section className="py-8 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-emerald-700/40">
              {[{ val:"36", label:"States and Union Territories", c:"text-lime-400" }, { val:"15", label:"Agro-Climatic Zones", c:"text-white" }, { val:"8", label:"Village Resource Dimensions", c:"text-lime-400" }, { val:"13", label:"Indian Languages Supported", c:"text-white" }].map((item, i) => (
                <div key={i} className="p-2">
                  <div className={"text-3xl font-black " + item.c}>{item.val}</div>
                  <div className="text-xs text-emerald-200 font-medium mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHALLENGE */}
        <section className="py-16 sm:py-20 border-b border-gray-100 dark:border-emerald-950/40 bg-gray-50/50 dark:bg-[#0A120D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-12 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">The Interconnected Challenge</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">Why Farm Climate Risks and Village Infrastructure Are Inseparable</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">A farmer's crop resilience depends on reliable village electricity, all-weather roads, and drinking water security, not just seeds and weather forecasts.</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[{ icon:Wind, color:"icon-bg-amber", title:"Erratic Weather and Capital Losses", desc:"Delayed monsoons, dry spells during panicle initiation, and unseasonal rains destroy marginal farmer capital without prior risk simulation." }, { icon:Zap, color:"icon-bg-blue", title:"Village Public Utility Gaps", desc:"Uneven drinking water networks, erratic power feeders, and poor road connectivity stall post-harvest transit and village health." }, { icon:Cpu, color:"icon-bg-purple", title:"Siloed Village Planning", desc:"Gram Panchayats often lack unified data to prioritize urgent works, resulting in subjective budget allocations without documented evidence." }].map((c, i) => (
                  <motion.div key={i} variants={cardAnim} className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950 bg-white dark:bg-[#111A14] space-y-3 shadow-sm card-hover">
                    <div className={"w-10 h-10 rounded-2xl " + c.color + " flex items-center justify-center"}><c.icon className="w-5 h-5" /></div>
                    <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{c.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{c.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* MODULE A */}
        <section className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Module A - Smart Agriculture Intelligence</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">Data-Driven Decision Architecture for Farms</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Farmers cannot control the monsoon, but they can simulate risk, compare regret, and budget scarce water with scientific clarity.</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agriFeatures.map((f) => (
                  <motion.div key={f.id} variants={cardAnim} className={"p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between shadow-sm card-hover space-y-3 group " + f.hb}>
                    <div>
                      <div className={"w-12 h-12 rounded-2xl " + f.color + " flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"}><f.icon className="w-6 h-6" /></div>
                      <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">{f.id}. {f.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                    </div>
                    <Link href={f.href} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:gap-2 transition-all pt-2">{f.cta} <ArrowRight className="w-3.5 h-3.5" /></Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* MODULE B */}
        <section className="py-16 sm:py-24 bg-gray-50/70 dark:bg-[#0A110D] border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Module B - Village Resource and Development Intelligence</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">Data-Driven Rural Development for Gram Panchayats</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Assess public utilities, benchmark infrastructure against official standards, and plan village works with transparent priority scores.</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ruralFeatures.map((f) => (
                  <motion.div key={f.id} variants={cardAnim} className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#111A14] flex flex-col justify-between shadow-sm card-hover space-y-3 group">
                    <div>
                      <div className={"w-12 h-12 rounded-2xl " + f.color + " flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"}><f.icon className="w-6 h-6" /></div>
                      <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-2">{f.id}. {f.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                    </div>
                    <Link href={f.href} className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2 transition-all pt-2">{f.cta} <ArrowRight className="w-3.5 h-3.5" /></Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* MAP */}
        <section id="explore-india" className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Authoritative Geographic Hierarchy</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">Agricultural and Rural Intelligence Atlas</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">From the wheat plains of Punjab to the paddy deltas of the South, explore localized climate and rural baselines across all 36 Indian States and Union Territories.</p>
              </motion.div>
              <motion.div variants={fadeUp}><PanIndiaMap /></motion.div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40 bg-gray-50/50 dark:bg-[#0A120D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">End-to-End Workflow</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">How MannVayal Empowers Decisions</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[{ step:"01", icon:MapPin, title:"Enter Farm and Village Baseline", desc:"Select your State, District, and Block without GPS hardware or physical sensors." }, { step:"02", icon:CloudSunRain, title:"Simulate Climate and Resource Shocks", desc:"Model rainfall deficits and evaluate village utility coverage against National benchmarks." }, { step:"03", icon:BarChart3, title:"Compare Regret and Prioritize Needs", desc:"Choose crops minimizing worst-case drought regret and score village works by urgency and impact." }, { step:"04", icon:CheckCircle2, title:"Execute and Record Outcomes", desc:"Follow stage rescue tasks, track Panchayat resolution status, and export CSV reports." }].map((item, i) => (
                  <motion.div key={i} variants={cardAnim} className="p-6 rounded-3xl border border-gray-200 dark:border-emerald-950/60 bg-white dark:bg-[#111A14] space-y-3 card-hover group">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">{item.step}</div>
                      <div className="w-8 h-8 rounded-xl icon-bg-emerald flex items-center justify-center group-hover:scale-110 transition-transform"><item.icon className="w-4 h-4" /></div>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-16 sm:py-20 border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Why MannVayal AI</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">Built for Farmers and Rural Communities</h2>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[{ icon:Shield, color:"icon-bg-emerald", title:"Evidence-Based and Transparent", desc:"Every prediction cites its source: IMD, Open-Meteo, TNAU, ICAR, FAO-33. No black-box AI." }, { icon:Sprout, color:"icon-bg-amber", title:"No Hardware Required", desc:"100% software-only. Works on any smartphone or computer. No sensors or drones needed." }, { icon:Globe2, color:"icon-bg-blue", title:"13 Regional Languages", desc:"Full UI in English, Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, and more." }, { icon:TrendingUp, color:"icon-bg-purple", title:"Climate-Smart Crop Planning", desc:"Minimax regret decision science protects your capital even when the monsoon fails." }, { icon:HeartPulse, color:"icon-bg-rose", title:"Village Health and Education", desc:"Benchmarks healthcare and school access against IPHS and RTE standards." }, { icon:GraduationCap, color:"icon-bg-teal", title:"KVK and ICAR Verified", desc:"All advisories verified against TNAU Crop Production Guide and ICAR advisory archives." }].map((b, i) => (
                  <motion.div key={i} variants={cardAnim} className="flex gap-4 p-5 rounded-2xl border border-gray-200 dark:border-emerald-950/60 bg-white dark:bg-[#111A14] shadow-sm card-hover">
                    <div className={"w-10 h-10 rounded-xl " + b.color + " flex items-center justify-center shrink-0 mt-0.5"}><b.icon className="w-5 h-5" /></div>
                    <div><h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">{b.title}</h3><p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{b.desc}</p></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* LANGUAGES */}
        <section className="py-16 sm:py-20 border-b border-gray-100 dark:border-emerald-950/40 bg-gray-50/60 dark:bg-[#0A120D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider"><Globe2 className="w-4 h-4" /> Multilingual Inclusion</div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">Built for India: 13 Regional Languages</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Agricultural terminology in your mother tongue, with English as the default language.</p>
                </div>
              </motion.div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
                {[{ name:"English", en:"Default" }, { name:"தமிழ்", en:"Tamil" }, { name:"हिन्दी", en:"Hindi" }, { name:"తెలుగు", en:"Telugu" }, { name:"ಕನ್ನಡ", en:"Kannada" }, { name:"മലയാളം", en:"Malayalam" }, { name:"বাংলা", en:"Bengali" }, { name:"मराठी", en:"Marathi" }, { name:"ગુજરાતી", en:"Gujarati" }, { name:"ਪੰਜਾਬੀ", en:"Punjabi" }, { name:"ଓଡ଼ିଆ", en:"Odia" }, { name:"অসমীয়া", en:"Assamese" }, { name:"اردو", en:"Urdu (RTL)" }].map((lang, i) => (
                  <motion.div key={i} variants={cardAnim} className="p-3.5 rounded-2xl border bg-white dark:bg-[#111A14] border-gray-200 dark:border-emerald-900/30 shadow-sm hover:border-emerald-400/60 transition-colors">
                    <div className="font-bold text-sm text-gray-900 dark:text-gray-100">{lang.name}</div>
                    <div className="text-[10px] text-gray-400">{lang.en}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 border-b border-gray-100 dark:border-emerald-950/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center mb-12 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Transparent Governance</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
              </motion.div>
              <div className="space-y-4">
                {faqs.map((faq, idx) => { const isOpen = openFaq === idx; return (
                  <motion.div key={idx} variants={cardAnim} className="border border-gray-200 dark:border-emerald-950/80 rounded-2xl bg-white dark:bg-[#111A14] overflow-hidden">
                    <button onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full text-left p-5 flex items-center justify-between font-semibold text-sm text-gray-900 dark:text-gray-100 hover:text-emerald-600 transition-colors">
                      <span>{faq.q}</span>
                      <ChevronDown className={"w-4 h-4 text-gray-400 transition-transform duration-200 " + (isOpen ? "rotate-180" : "")} />
                    </button>
                    {isOpen && <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-emerald-950/40 pt-3">{faq.a}</div>}
                  </motion.div>
                );})}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:from-emerald-950/30 dark:via-[#080D0A] dark:to-[#080D0A] pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
                <Sprout className="w-6 h-6 text-emerald-600 animate-leaf-float" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Get Started Today</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">Smarter Farms. Stronger Villages.</motion.h2>
              <motion.p variants={fadeUp} className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Connect agricultural decision science with transparent village resource planning. No physical sensors required, scientific decision support across all 36 Indian States and UTs.</motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/dashboard" className="px-8 py-4 rounded-2xl text-sm font-semibold btn-primary">Launch Agricultural Engines</Link>
                <Link href="/dashboard/village-development" className="px-8 py-4 rounded-2xl text-sm font-semibold border border-emerald-300 dark:border-emerald-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-emerald-950/40 transition-colors">Launch Village Priority Planner</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
