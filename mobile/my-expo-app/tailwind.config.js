/** @type {import('tailwindcss').Config} */
module.exports = {
    
      content: ["./App.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
    
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          // shadcn token mapping – keep in sync with web
          primary:  { DEFAULT: "#4f46e5", foreground: "#ffffff" },
          secondary:{ DEFAULT: "#6b7280", foreground: "#ffffff" },
          background: "#f9fafb",
          "background-dark": "#111827",
        },
      },
    },
    plugins: [],
}
