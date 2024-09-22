import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#151515',
        error: '#EE4F4F',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        'ubunto-mono': ['var(--font-ubunto-mono)'],
        'reddit-mono': ['var(--font-reddit-mono)'],
      },
    },
  },
  plugins: [],
};
export default config;
