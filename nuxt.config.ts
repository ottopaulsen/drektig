// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  css: ["~/assets/text.css"],
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
      apiKey: "AIzaSyAP26h6IRqYhd2Fliho8Vsud5YeApDIAHw",
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
      provider: "ReCaptchaEnterprise",
      key: "6LfTkkQkAAAAAMrdwJ-Q5nABnQ26zceBQTpmcbV4",
    },
  },
});
