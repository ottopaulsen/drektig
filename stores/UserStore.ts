import { User } from "firebase/auth";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      auth: useFirebaseAuth(),
      user: useCurrentUser(),
    };
  },

  getters: {
    email: (state) => state.user?.email,
    userName: (state) => state.user?.displayName,
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    init() {
      console.info("Auth init");
      if (this.auth) {
        this.auth.onAuthStateChanged((user) => {
          console.info("Auth state changed: ", user);
        });
      }
    },
  },
});
