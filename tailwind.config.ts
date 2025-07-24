import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Aangilam brand colors
        nova: {
          50: "hsl(var(--nova-50))",
          100: "hsl(var(--nova-100))",
          200: "hsl(var(--nova-200))",
          300: "hsl(var(--nova-300))",
          400: "hsl(var(--nova-400))",
          500: "hsl(var(--nova-500))",
          600: "hsl(var(--nova-600))",
          700: "hsl(var(--nova-700))",
          800: "hsl(var(--nova-800))",
          900: "hsl(var(--nova-900))",
        },
        electric: {
          50: "hsl(var(--electric-50))",
          100: "hsl(var(--electric-100))",
          200: "hsl(var(--electric-200))",
          300: "hsl(var(--electric-300))",
          400: "hsl(var(--electric-400))",
          500: "hsl(var(--electric-500))",
          600: "hsl(var(--electric-600))",
          700: "hsl(var(--electric-700))",
          800: "hsl(var(--electric-800))",
          900: "hsl(var(--electric-900))",
        },
        cyber: {
          50: "hsl(var(--cyber-50))",
          100: "hsl(var(--cyber-100))",
          200: "hsl(var(--cyber-200))",
          300: "hsl(var(--cyber-300))",
          400: "hsl(var(--cyber-400))",
          500: "hsl(var(--cyber-500))",
          600: "hsl(var(--cyber-600))",
          700: "hsl(var(--cyber-700))",
          800: "hsl(var(--cyber-800))",
          900: "hsl(var(--cyber-900))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        aurora:
          "linear-gradient(45deg, hsl(var(--nova-500)), hsl(var(--electric-500)), hsl(var(--cyber-500)), hsl(var(--nova-600)))",
        "nova-glow":
          "linear-gradient(135deg, hsl(var(--nova-400)) 0%, hsl(var(--electric-500)) 50%, hsl(var(--cyber-400)) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        gradient: "gradient 8s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        "bounce-slow": "bounce-slow 3s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
