/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ash-grey": {
          50: "#f4f4f5",
          100: "#e4e4e7",
          200: "#d4d4d8",
          300: "#a1a1aa",
          400: "#71717a",
          500: "#52525b",
          600: "#3f3f46",
          700: "#27272a",
          800: "#18181b",
          900: "#09090b",
          950: "#000000",
        },
        // CREAM: Warm foundation to balance the sharp new green
        "soft-linen": {
          50: "#fbfaf8", // Main background
          100: "#f5f2eb",
          200: "#e9e3d6",
          300: "#dbccb5",
          400: "#c7ac8a",
          500: "#b58e65",
          600: "#99714d",
          700: "#7b583c",
          800: "#654935",
          900: "#533d2e",
          950: "#2d2017",
        },
        // NEW BRAND GREEN (#06a51c)
        "olive-leaf": {
          50: "#effef2",
          100: "#dbfce2",
          200: "#bbf7c9",
          300: "#86ef9f",
          400: "#4ade6e",
          500: "#22c54b", // Bright hover state
          600: "#06a51c", // <--- YOUR EXACT BRAND COLOR (Primary Buttons)
          700: "#0d851d", // Darker for depth
          800: "#10691d",
          900: "#0f561b",
          950: "#02300b",
        },
        terracotta: {
          50: "#fef2f2",
          100: "#ffe1e1",
          200: "#ffc7c7",
          300: "#ffa0a0",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
