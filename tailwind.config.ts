import { heroui } from "@heroui/theme";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|avatar|breadcrumbs|button|input|modal|navbar|pagination|select|snippet|toast|divider|ripple|spinner|form|listbox|popover|scroll-shadow).js",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#1a202c",
        "blue-light": "#007bff",
        "next-blue": "#016FEE",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        signika: ["var(--font-signika)"],
        jua: ["var(--font-jua)"],
        poppins: ["var(--font-poppins)"],
      },
      boxShadow: {
        "neon-blue":
          "0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 1rem #5271ff, 0 0 0.8rem #5271ff, 0 0 2.8rem #5271ff, inset 0 0 1.3rem #5271ff",
        "neon-white": "0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 1rem #fff, 0 0 0.8rem #fff, 0 0 2.8rem #fff, inset 0 0 1.3rem #fff",
        "ltr-small": "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06),0px 2px 10px 0px rgb(0 0 0 / 0.06)",
        "b-small": "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3);",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
