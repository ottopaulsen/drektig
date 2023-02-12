// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/text.css"],
  ssr: false,
  modules: ["nuxt-icon", "nuxt-vuefire"],
  runtimeConfig: {},

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
