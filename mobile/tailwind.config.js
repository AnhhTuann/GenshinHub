/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#080810',
          card: '#0f0f1a',
          border: 'rgba(255,255,255,0.08)',
        },
        gold: {
          DEFAULT: '#cfa858',
          light: '#f5d399',
          dark: '#a07830',
        },
        pyro: '#ef4723',
        hydro: '#1e90ff',
        anemo: '#33ccb3',
        electro: '#a855f7',
        dendro: '#4ade80',
        cryo: '#7dd3fc',
        geo: '#eab308',
      },
    },
  },
  plugins: [],
}
