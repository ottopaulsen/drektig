// https://nuxt.com/docs/api/configuration/nuxt-config
import firebaseCredentials from "./firebase";
export default defineNuxtConfig({
  modules: [
    // ... other modules
    "nuxt-vuefire",
  ],

  vuefire: {
    config: firebaseCredentials,
    admin: {
      serviceAccount: "path/to/credentials.json",
    },
  },
  auth: true,
});
