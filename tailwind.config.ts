import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/app/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppins: "var(--font-poppins)",
    },
    container: {
      center: true,
      padding: "0.5rem",
      screens: {
        "2xl": "1500px",
      },
    },
  },
  plugins: [],
};
export default config;
