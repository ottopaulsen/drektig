// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  build: {
    transpile: ["primevue"],
  },
  css: [
    "~/assets/text.css",
    "~/assets/buttons.css",
    "~/assets/lists.css",
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "/node_modules/primeflex/primeflex.css",
  ],
  imports: {
    dirs: ["stores"],
  },
  modules: [
    "nuxt-icon",
    "nuxt-vuefire",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@vueuse/nuxt",
  ],
  runtimeConfig: {},
  ssr: false,
  vuefire: {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: "drektig.firebaseapp.com",
      projectId: "drektig",
      storageBucket: "drektig.appspot.com",
      messagingSenderId: "992366201419",
      appId: "1:992366201419:web:1caa1f4ac1bfbd0d72dbce",
      measurementId: "G-X4FR7WHP75",
    },
    auth: true,
    appCheck: {
      debug: process.env.NODE_ENV !== "production",
      isTokenAutoRefreshEnabled: true,
      provider: "ReCaptchaV3",
      key: "6LfTkkQkAAAAAMrdwJ-Q5nABnQ26zceBQTpmcbV4",
    },
  },
});
