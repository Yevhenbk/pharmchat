import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGrey: '#18181A',
        secondaryGrey: '#27272a',
        teritaryGrey: '#94949D',
        buttonHover: '#bbbbbb',
      },
    },
  },
  plugins: [],
};
export default config;
