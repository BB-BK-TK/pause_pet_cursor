import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./screens/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "from-rose-100",
    "via-orange-50",
    "to-amber-50",
    "from-lime-100",
    "via-stone-50",
    "from-yellow-100",
    "via-mint-50",
    "to-sky-50",
    "from-blue-100",
    "via-slate-50",
    "to-cream-50",
    "from-orange-100",
    "via-yellow-50",
    "from-green-100",
    "via-yellow-50",
    "from-purple-100",
    "via-pink-50",
    "to-blue-50",
    "from-violet-100",
    "via-indigo-50",
    "to-rose-50",
    "from-sky-100",
    "to-orange-50",
    "from-slate-100",
    "to-blue-50",
    "from-cyan-100",
    "to-violet-50",
    "to-teal-50",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
