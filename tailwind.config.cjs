/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // preflight: false, // 添加这一行
  },
  // important: true,
};
