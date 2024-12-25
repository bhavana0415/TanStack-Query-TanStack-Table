import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["Brush Script MT", "Brush Script Std", "sans-serif"],
      },
      colors: {
        "custom-hover": "var(--customColorTwo)",
      },
      screens: {
        xsm: "300px",
        custom: "1080px",
      },
    },
  },
  variants: {
    extend: {
      transform: ["hover", "focus"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "scrollbar-width": "none" /* For Firefox */,
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none" /* For Chrome, Safari, and Opera */,
        },
      });
    },
  ],
} satisfies Config;
