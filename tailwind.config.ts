import { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#121212',
        'bg-dark-secondary': '#1E1E1E',
        'neon-pink': '#FF00FF',
        'neon-purple': '#8A2BE2',
        'neon-blue': '#00BFFF',
        'neutral-light': '#F5F5F5',
        'neutral-medium': '#E0E0E0',
      },
      fontFamily: {
        'title': ['var(--font-orbitron)', 'var(--font-rajdhani)', 'sans-serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
        'accent': ['Audiowide', 'Syncopate', 'sans-serif'],
      },
      animation: {
        'wave': 'wave 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
