import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        academic: {
          navy: {
            950: "#060D17",
            900: "#0A192F",
            800: "#112240",
            700: "#1D3557",
          },
          blue: {
            700: "#0369A1",
            600: "#0284C7",
            500: "#0EA5E9",
            400: "#38BDF8",
          },
          slate: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E1",
            700: "#334155",
            800: "#1E293B",
          }
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      }
    },
  },
  plugins: [],
};
export default config;
