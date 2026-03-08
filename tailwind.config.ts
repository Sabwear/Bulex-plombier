import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00917e',
          hover: '#007465',
          light: '#e6f5f3',
          mid: '#c4e9e4',
        },
        gray: {
          50: '#f8f9fa',
          100: '#f2f4f5',
          200: '#e8ecee',
          300: '#d1d8db',
          400: '#9da8ad',
          600: '#5a6872',
          800: '#2b3640',
          900: '#1a2229',
        },
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1200px',
        },
      },
    },
  },
  plugins: [],
};
export default config;
