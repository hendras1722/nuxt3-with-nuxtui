// tailwind.config.js
module.exports = {
  content: [
    './assets/scss/**/*.scss',
    './components/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      ringColor: {
        red: {
          500: '#f56565', // Example color
        },
      },
    },
  },
}
