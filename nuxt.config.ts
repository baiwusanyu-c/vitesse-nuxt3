import { defineNuxtConfig } from 'nuxt'
const lifecycle = process.env.npm_lifecycle_event
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  // css
  css: ['~/assets/style/index.scss'],

  // build
  build: {
    transpile: lifecycle === 'build' ? ['element-plus'] : [],
  },
  experimental: {
    reactivityTransform: true,
    // viteNode: true,
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  typescript: {
    strict: true,
    shim: false,
  },
  components: true,
})
