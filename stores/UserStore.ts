import type { Router } from "vue-router";
import { useIsCurrentUserLoaded } from "vuefire";

export const useUserStore = defineStore("UserStore", () => {
  const auth = useFirebaseAuth();
  const user = useCurrentUser();
  const isUserLoaded = useIsCurrentUserLoaded();

  const email = computed(() => user.value?.email);
  const userName = computed(() => user.value?.displayName);
  const isAuthenticated = computed(() => {
    console.log("isUserLoaded.value = " + isUserLoaded.value);
    console.log("user.value = ", user.value);
    console.log("user.value.email = ", user.value?.email);
    const res = isUserLoaded.value && !!user.value?.email;
    console.log("isAuthenticated returns " + res);
    return res;
  });

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
