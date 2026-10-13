/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#16A34A",
          foreground: "#FFFFFF",
          forest: "#064E3B",
          emerald: "#10B981",
        },
        gold: {
          DEFAULT: "#F4B740",
          light: "#FDE68A",
          dark: "#D97706",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // MannVayal specific tokens
        brand: {
          green: "#16A34A",
          forest: "#064E3B",
          emerald: "#10B981",
          gold: "#F4B740",
          dark: "#080D0A",
          darkCard: "#111A14",
          light: "#F8FAF7",
          whiteCard: "#FFFFFF",
          textLight: "#17211A",
          textDark: "#F3F7F3",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        tamil: ["var(--font-tamil)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        }
      },
      animation: {
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};
