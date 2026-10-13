import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "MannVayal AI | Predict Climate. Protect Crops. Empower Farmers.",
  description:
    "MannVayal AI is a full-stack climate-smart agriculture and decision engine for Indian smallholder farmers. Simulate climate what-if scenarios, minimize crop decision regret, and manage water budgets.",
  keywords: [
    "MannVayal",
    "Climate Smart Agriculture",
    "Tamil Nadu Farming",
    "Crop Decision Regret",
    "Water Budget Wallet",
    "Cauvery Delta",
    "TNAU",
    "ICAR",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ta" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/20 selection:text-emerald-800 dark:selection:text-emerald-200">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
