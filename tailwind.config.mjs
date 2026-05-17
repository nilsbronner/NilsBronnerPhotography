/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Fraunces Variable"', 'Fraunces', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        surface: 'var(--surface)',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
