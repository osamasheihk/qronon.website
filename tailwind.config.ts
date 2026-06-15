import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        navy: "#0b132b",
        panel: "#f5f8f6",
        line: "#dce5e1",
        cyan: "#32d4df",
        green: "#79c9ac",
        amber: "#e5ad56",
        red: "#dd6b6b"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(7, 17, 31, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
