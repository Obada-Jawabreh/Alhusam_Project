// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           DEFAULT: "#9C27B0",
//           hover: "#7B1FA2",
//           light: "#D1A3D8",
//           dark: "#6A1B9A",
//         },
//         secondary: {
//           light: "#E1F5FE",
//           lighter: "#FFF3E0",
//         },
//         text: {
//           primary: "#4A4A4A",
//           secondary: "#757575",
//         },
//       },
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E88E5",    // الأزرق الرئيسي
          hover: "#1565C0",      // أزرق داكن للهوفر
          light: "#64B5F6",      // أزرق فاتح
          dark: "#0D47A1",       // أزرق غامق
          100: "#E3F2FD",        // أفتح درجة
          200: "#90CAF9",
          300: "#64B5F6",
          400: "#42A5F5",
          500: "#1E88E5",        // اللون الرئيسي
          600: "#1565C0",
          700: "#0D47A1",
          800: "#0A367C",        // درجات إضافية للتناسق
          900: "#072A61"
        },
        secondary: {
          DEFAULT: "#9C27B0",    // البنفسجي الثانوي
          hover: "#7B1FA2",
          light: "#E1F5FE",
          lighter: "#F3E5F5",
          dark: "#6A1B9A",
          100: "#F3E5F5",
          200: "#E1BEE7",
          300: "#CE93D8",
          400: "#BA68C8",
          500: "#9C27B0",
          600: "#7B1FA2",
          700: "#6A1B9A",
          800: "#4A148C",
          900: "#38117A"
        },
        text: {
          primary: "#4A4A4A",    // لون النص الرئيسي
          secondary: "#757575",   // لون النص الثانوي
          light: "#FFFFFF"        // النص الفاتح
        },
        background: {
          light: "#E3F2FD",      // خلفية فاتحة
          white: "#FFFFFF",
          card: "#E1F5FE",
          accent: "#F0F4C3"
        }
      },
      gradients: {
        primary: 'gradient-to-br from-primary-500 via-primary-400 to-primary-300',
        secondary: 'gradient-to-br from-secondary-500 via-secondary-400 to-secondary-300',
        background: 'gradient-to-br from-background-light to-background-white'
      }
    },
  },
  plugins: [],
};