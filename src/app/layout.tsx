import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoSans = Noto_Sans({ subsets: ["latin", "devanagari"], variable: "--font-noto", weight: ["400", "500", "600", "700"], display: "swap" });


export const metadata: Metadata = {
  title: "MannVayal AI | Smarter Farms. Stronger Villages.",
  description:
    "AI-Powered Climate Risk Analysis, Smart Crop Planning, Rural Resource Assessment, and Sustainable Village Development Platform across India.",
  keywords: [
    "MannVayal AI",
    "Climate Risk Analysis",
    "Smart Crop Planning",
    "Rural Resource Assessment",
    "Village Infrastructure Gaps",
    "Panchayat Priority Planner",
    "Jal Jeevan Mission",
    "PMGSY",
    "ICAR",
    "Mission Antyodaya",
    "Agriculture AI India",
    "Farm Decision Platform",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${notoSans.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/20 selection:text-emerald-800 dark:selection:text-emerald-200">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
