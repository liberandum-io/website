/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      extend: {
          colors: {
              neutral: {
                  0: 'rgba(365, 365, 365)',
                  50: 'rgba(251, 250, 255)',
                  500: 'rgba(247, 247, 245)',
              },
              secondary: '#ec5078',
              primary: '#7fb432',
              tertiary: '#feb942',
              dark: '#0c1529',
          },
      },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
