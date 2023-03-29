// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-icon", "nuxt-swiper", "@nuxtjs/i18n"],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      apiUrl: process.env.API_URL,
    },
  },
  swiper: {
    // modules: ["navigation", "pagination"],
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/main.scss" as *;',
        },
      },
    },
  },

  css: ["@/assets/fonts/spoof/stylesheet.css"],

  plugins: [
    // { src: "@/plugins/aos", ssr: false, mode: "client" },
    { src: "@/plugins/directives/click-outside" },
    { src: "@/plugins/directives/window-scroll" },
    { src: "@/plugins/splide", ssr: false },
  ],
});
