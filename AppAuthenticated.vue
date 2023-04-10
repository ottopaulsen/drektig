<template>
  <div>
    <div class="header">
      <div v-if="farmStore.farmCount > 0" class="header-left">
        <Icon
          class="home-icon"
          name="mdi:barn"
          size="1.6em"
          @click="$router.push(`${route.fullPath}/edit`)"
        />
        <span v-if="farmStore.farmCount === 1">{{ farmStore.farms[0].name }} </span>
        <span v-if="farmStore.farmCount > 1">
          <select name="farms" v-model="farmStore.selectedFarmId">
            <option v-for="farm in farmStore.farms" :value="farm.id">
              {{ farm.name }}
            </option>
          </select>
        </span>
      </div>
      <div v-if="!farmStore.farmCount">
        <span>Ingen gård tilgjengelig</span>
      </div>
      <div class="header-right">
        <p>
          {{ user.displayName }}
        </p>
      </div>
    </div>
    <div class="content">
      <p>{{ farmStore.selectedFarmId }} {{ farmStore.selectedFarm?.name }}</p>
      <p v-if="!authenticated">Autentiserer...</p>
      <NuxtLayout>
        <NuxtPage v-if="farmStore.selectedFarm" />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
  //
  // TO DO (otto):
  // Wrap all content that needs authentication in one component, and
  // do not show it if not authenticated!
  //

  const farmStore = useFarmStore();

  const user = useCurrentUser();
  const authenticated = computed(() => {
    return user.value;
  });

  const router = useRouter();
  const route = useRoute();

  // we don't need this watcher on server
  onMounted(() => {
    watch(user, (user, prevUser) => {
      if (!user) {
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
