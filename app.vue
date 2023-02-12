<template>
  <div>
    <div class="header">
      <div class="header-left">
        <NuxtLink to="/">Drektig</NuxtLink>
      </div>
      <div class="header-right">
        <p v-if="authenticated">
          {{ user.displayName }}
        </p>
      </div>
    </div>
    <div class="content">
      <p v-if="!authenticated">Autentiserer...</p>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
  const user = useCurrentUser();
  console.log({ user: user.value });
  const authenticated = computed(() => {
    return user.value;
  });

  const router = useRouter();
  const route = useRoute();

  // we don't need this watcher on server
  onMounted(() => {
    watch(user, (user, prevUser) => {
      if (prevUser && !user) {
        // user logged out
        router.push("/login");
      } else if (user && typeof route.query.redirect === "string") {
        // user logged in
        router.push(route.query.redirect);
      }
    });
  });

  onErrorCaptured((err, instance, info) => {
    console.log("onErrorCaptured err: ", err);
    console.log("onErrorCaptured info: ", info);
    console.log("onErrorCaptured instance: ", instance);
    console.log("onErrorCaptured end");
  });

  const auth = useFirebaseAuth();
  if (auth) {
    auth.onAuthStateChanged(() => {
      console.log("Auth state changed: ", auth);
    });
  } else {
    console.log("Auth is null");
  }

  useHead({
    title: "Drektig",
  });
</script>

<style scoped>
  .content {
    padding: 8px 8px 0px 8px;
  }
  .header {
    align-items: center;
    background-color: lightgrey;
    display: flex;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
      Geneva, Verdana, sans-serif;
    justify-content: space-between;
    padding: 0px 8px 0px 8px;
  }

  .header-left a {
    font-size: x-large;
    text-decoration: none;
    color: black;
    font-weight: 700;
  }

  .header-right {
    font-size: small;
  }
</style>

<style>
  body {
    margin: 0;
  }
</style>
