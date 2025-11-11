// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],

  css: [
    '~/assets/styles/bootstrap-custom.scss',
    '~/assets/styles/other-custom.css',
    '@fontsource/open-sans',
    '@fontsource/open-sans/500.css',
    '@fontsource/open-sans/700.css',
  ],
});
