import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#0a0f1d",
          card: "rgba(16, 24, 48, 0.7)",
          border: "rgba(0, 242, 254, 0.2)",
          cyan: "#00f2fe",
          blue: "#4facfe",
        },
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 242, 254, 0.35)",
        "neon-strong": "0 0 35px rgba(79, 172, 254, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;