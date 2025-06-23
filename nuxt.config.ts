// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    rootId: 'MSA',
    rootTag: 'MSA',
  },

  icon: {
    serverBundle: {
      collections: ['ion'], // <!--- this
    },
  },

  devtools: { enabled: true, vscode: {} },

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/devtools',
    '@nuxt/icon',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Roboto: true,
          Mulish: true,
          Nunito: true,
        },
      },
    ],
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
  ],

  css: ['~/assets/scss/main.scss', '~/assets/scss/nuxtui.css'],

  colorMode: {
    preference: 'light',
  },

  compatibilityDate: '2025-01-14',
})
