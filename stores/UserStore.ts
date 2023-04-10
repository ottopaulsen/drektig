import type { Router } from "vue-router";
import { useIsCurrentUserLoaded } from "vuefire";

export const useUserStore = defineStore("UserStore", () => {
  const auth = useFirebaseAuth();
  const user = useCurrentUser();
  const isUserLoaded = useIsCurrentUserLoaded();

  const email = computed(() => user.value?.email);
  const userName = computed(() => user.value?.displayName);
  const isAuthenticated = computed(() => {
    const res = isUserLoaded.value && !!user.value?.email;
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
