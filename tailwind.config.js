/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1d1d1f",
        "ink-soft": "#5d5d64",
        "ink-muted": "#77777e",
        paper: "#fffdf9",
        "paper-soft": "#f6f3ed",
        "paper-warm": "#f4ebdd",
        line: "rgba(29, 29, 31, 0.11)",
        maroon: "#8f1538",
        "maroon-dark": "#621027",
        saffron: "#eba92f",
        green: "#1f5b48",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          '"Noto Sans Tamil"',
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        body: "0.005em",
        label: "0.035em",
        control: "0.01em",
        heading: "-0.02em",
        display: "-0.025em",
      },
      borderRadius: {
        sm: "16px",
        md: "24px",
        lg: "36px",
      },
      boxShadow: {
        sm: "0 12px 30px rgba(68, 42, 23, 0.08)",
        md: "0 24px 70px rgba(68, 42, 23, 0.14)",
      },
      screens: {
        // Named "mw*" (max-width), not "max-*": Tailwind reserves the
        // "max-" prefix for its own built-in max-[value] arbitrary
        // variant syntax, so a custom screen named "max-1024" silently
        // fails to register as a variant at all.
        mw1024: { max: "1024px" },
        mw820: { max: "820px" },
        mw560: { max: "560px" },
      },
      width: {
        shell: "min(1480px, calc(100% - 48px))",
      },
      maxWidth: {
        shell: "1480px",
      },
      keyframes: {
        "loading-pulse": {
          "50%": { opacity: "0.55", transform: "scale(0.96)" },
        },
      },
      animation: {
        "loading-pulse": "loading-pulse 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
