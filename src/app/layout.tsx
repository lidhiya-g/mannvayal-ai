import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "MannVayal AI | Smarter Farms. Stronger Villages. A Prosperous Bharat.",
  description:
    "AI-Powered Climate Risk Analysis, Smart Crop Planning, Rural Resource Assessment, and Sustainable Village Development Platform across India. Samriddh Annadata, Samriddh Bharat.",
  keywords: [
    "MannVayal AI",
    "Samriddh Annadata Samriddh Bharat",
    "Climate Risk Analysis",
    "Smart Crop Planning",
    "Rural Resource Assessment",
    "Village Infrastructure Gaps",
    "Panchayat Priority Planner",
    "Jal Jeevan Mission",
    "PMGSY",
    "ICAR",
    "Mission Antyodaya",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/20 selection:text-emerald-800 dark:selection:text-emerald-200">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
