/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#c6102c',
        secondary: '#f8f9fa',
        dark: '#1f2937',
        light: '#f8f9fa',
        gray: '#f5f5f5',
        border: '#e0e0e0'
      }
    },
  },
  plugins: [],
}