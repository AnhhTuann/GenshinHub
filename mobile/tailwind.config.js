/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#100b13',
          card: '#1b1320',
          border: 'rgba(255,182,202,0.14)',
        },
        sakura: {
          DEFAULT: '#f4729c',
          light: '#ffb6ca',
          soft: '#ffd0dc',
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
