<template>
  <div>
    <div class="content">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
  const router = useRouter();
  const route = useRoute();

  useHead({
    title: "Drektig",
  });

  const userStore = useUserStore();
  const user = useCurrentUser();

  onMounted(() => {
    userStore.init();

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

  .header-left,
  select {
    font-size: large;
    text-decoration: none;
    color: black;
    font-weight: 700;
    border: none;
    background-color: inherit;
  }

  .header-right {
    font-size: small;
  }

  .home-icon {
    margin-bottom: 6px;
    margin-right: 6px;
  }
</style>

<style>
  body {
    margin: 0;
  }
</style>
