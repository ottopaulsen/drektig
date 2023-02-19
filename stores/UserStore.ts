import type { Router } from "vue-router";

export const useUserStore = defineStore("UserStore", () => {
  const auth = useFirebaseAuth();
  const user = useCurrentUser();

  const email = computed(() => user.value?.email);
  const userName = computed(() => user.value?.displayName);
  const isAuthenticated = computed(() => !!user.value);

  function init() {
    console.info("Auth init");
    if (auth) {
      auth.onAuthStateChanged((user) => {
        console.info("Auth state changed: ", user);
      });
    }
  }

  async function logOut(router: Router) {
    if (auth) {
      await auth.signOut().then(() => {
        console.log("userStore.logOut push /");
        router.push("/");
      });
    }
  }

  return {
    auth,
    email,
    userName,
    isAuthenticated,
    init,
    logOut,
  };
});
