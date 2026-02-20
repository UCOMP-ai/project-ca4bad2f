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
          foreground: "var(--color-text)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-text)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-text)",
        },
        background: "var(--color-background)",
        foreground: "var(--color-text)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        
        // --- OVERRIDES FOR AI GENERATED HARDCODED COLORS ---
        // Map common hardcoded colors to tokens so changes are reflected
        white: "var(--color-text)", // Text-white becomes Text-primary color
        black: "var(--color-background)",
        slate: {
            900: "var(--color-background)",
            800: "var(--color-surface)",
            50: "var(--color-text)",
        },
        gray: {
            300: "var(--color-text)", // dim text
            400: "var(--color-text)",
        },
        purple: {
            900: "var(--color-secondary)",
            500: "var(--color-primary)",
            400: "var(--color-primary)",
        },
        blue: {
            500: "var(--color-accent)",
            600: "var(--color-accent)",
        },
        pink: {
            500: "var(--color-secondary)",
        },
        violet: {
            500: "var(--color-primary)",
        },
        indigo: {
            500: "var(--color-accent)",
        },
        // ---------------------------------------------------

        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(210 40% 98%)",
        },
        muted: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(215.4 16.3% 46.9%)",
        },
        popover: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-text)",
        },
        card: {
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
