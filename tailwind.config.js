/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080c",
          900: "#0b0b12",
          850: "#0f0f17",
          800: "#13131d",
          700: "#1b1b27",
          600: "#272735",
        },
        bone: {
          50: "#f7f5ef",
          100: "#eeeae0",
          200: "#d8d2c3",
          300: "#b7aea0",
        },
        amber: {
          DEFAULT: "#ff6b35",
          soft: "#ff8a5c",
          deep: "#d4481e",
          glow: "rgba(255,107,53,0.45)",
        },
        neon: {
          DEFAULT: "#22d3ee",
          soft: "#67e8f9",
          deep: "#0891b2",
          glow: "rgba(34,211,238,0.4)",
        },
        iris: {
          DEFAULT: "#7c6cff",
          soft: "#a99bff",
          deep: "#4f3fd6",
        },
        lime: {
          DEFAULT: "#c4f061",
          deep: "#8fb83b",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(255,107,53,0.35)",
        "glow-cyan": "0 0 60px -10px rgba(34,211,238,0.35)",
        "inner-soft": "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "0.85" },
          "50%": { opacity: "0.45" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        ticker: "ticker 40s linear infinite",
      },
    },
  },
  plugins: [],
};
