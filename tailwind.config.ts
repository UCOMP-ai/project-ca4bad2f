import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ["class"],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-background)", // Usually text on primary is inverse
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-background)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-text)",
        },
        background: "var(--color-background)",
        foreground: "var(--color-text)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        muted: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text)", // opacity handled by class
        },
        card: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text)",
        },
        popover: {
            DEFAULT: "var(--color-surface)",
            foreground: "var(--color-text)",
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--border-radius)",
        md: "calc(var(--border-radius) - 2px)",
        sm: "calc(var(--border-radius) - 4px)",
        DEFAULT: "var(--border-radius)",
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        button: 'var(--shadow-button)',
        hover: 'var(--shadow-hover)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
