import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "pastel-blue": "#AEC6CF",
        "pastel-dark": "#5D737E",
        primary: "#2a8c4a",
        secondary: "#9bfab0",
        terciary: "#ffffff",
      },
    },
  },
  plugins: [],
};

export default config;
