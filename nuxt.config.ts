import { defineNuxtConfig } from "nuxt";
import { transformScript } from "vite-plugin-svg-transform-script";
const lifecycle = process.env.npm_lifecycle_event;
export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
  ],
  // css
  css: ["~/assets/style/index.scss", "~/components/be-ui/style/index.scss"],

  // build
  build: {
    transpile: lifecycle === "build" ? ["element-plus"] : [],
  },
  experimental: {
    reactivityTransform: true,
    // viteNode: true,
  },
  colorMode: {
    classSuffix: "",
  },
  typescript: {
    strict: true,
    shim: false,
  },
  components: true,
  vite: {
    plugins: [
      transformScript({
        input: "./icon/",
        output: "./utils/",
        name: "svg-dict",
        type: "ts",
        format: "default",
      }),
    ],
  },
});
