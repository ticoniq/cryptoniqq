import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontSize: {
        "clamp-lg": "clamp(2rem, 2vw + 2rem, 4rem)",
        "clamp-slg": "clamp(1.2rem, 1.7vw + 1.5rem, 2.5rem)",
        "clamp-md": "clamp(1rem, 1.5vw + 1.2rem, 2rem)",
        "clamp-sm": "clamp(0.875rem, 1vw + 0.75rem, 1.5rem)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          primary: "hsl(var(--brand-primary))",
          onSurface: "hsl(var(--brand-on-surface))",
          secondary: "hsl(var(--brand-secondary))",
          secondary2: "hsl(var(--brand-secondary2))",
          surface: "hsl(var(--brand-surface))",
          surfaceMain: "hsl(var(--brand-surface-main))",
          interactive: "hsl(var(--brand-interactive))",
          critical: "hsl(var(--brand-critical))",
          warning: "hsl(var(--brand-warning))",
          success: "hsl(var(--brand-success))",
          highlight: "hsl(var(--brand-highlight))",
          decorative: "hsl(var(--brand-decorative))",
          hover: "hsl(var(--brand-hover))",
          bg: "hsl(var(--brand-bg))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        sway: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(15deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: 'shake 0.5s ease-in-out',
        sway: 'sway 0.6s ease-out',
      },
      fontFamily: {
        DMSans: ["DM Sans", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      backgroundImage: theme => ({
        'hero-pattern': "url('/assets/images/background.png')",
        'custom-gradient': "linear-gradient(to right, #4f46e5, #3b82f6)",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
