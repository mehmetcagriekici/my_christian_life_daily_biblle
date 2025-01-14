import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans], // Default sans-serif stack
        serifPrimary: ["Merriweather", ...defaultTheme.fontFamily.serif], // For primary serif
        serifSecondary: ["Lora", ...defaultTheme.fontFamily.serif], // For secondary serif
        ui: ["Inter", ...defaultTheme.fontFamily.sans], // Add Inter for UI
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
