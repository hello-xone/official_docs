const { heroui } = require("@heroui/react");
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")

/***  @type {import('tailwindcss').Config} */

const primaryHue = 0

module.exports = {
  content: {
    relative: true,
    files: [
      "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx,html}",
      "./app/**/*.{js,ts,jsx,tsx,mdx,md,html}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx,md,html}",
      "./components/**/*.{js,ts,jsx,tsx,mdx,md,html}",
      "./src/**/*.{js,ts,jsx,tsx,mdx,md,html}",
    ],
  },

  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        primaryHue: {
          DEFAULT: `hsl(${primaryHue}, 100%, 50%)`,
          light: `hsl(${primaryHue}, 100%, 70%)`,
          dark: `hsl(${primaryHue}, 100%, 30%)`,
        },
        grd: {
          '50': '#fff0f0',
          '100': '#ffdddd',
          '200': '#ffc0c0',
          '300': '#ff9494',
          '400': '#ff5757',
          '500': '#ff2323',
          '600': '#ed0000',
          '700': '#d70000',
          '800': '#b10303',
          '900': '#920a0a',
          '950': '#500000',
        },
      },
    },
  },
  plugins: [
    heroui(),
    iconsPlugin({
      collections: getIconCollections(["i-carbon-growth", "i-tabler-blocks", "tabler", "streamline", "icon-park-outline", "tabler", "icon-park-outline", "tdesign", "octicon", "la", "carbon", "teenyicons", "solar", "game-icons", "lucide", "carbon", "gis", "ri", "hugeicons", "fluent", "uil", "token", "mdi", "ph", "lineicons", "icon-park-outline", "material-symbols", "icon-park-outline"]),
    }
    ),
  ],
}

