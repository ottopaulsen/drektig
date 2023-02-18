<template>
  <div class="farm-header">
    <NuxtLink :to="homeTo">
      <Icon class="home-icon" :name="homeIcon" size="1.6em" />
    </NuxtLink>
    <span v-if="farmCount === 1">{{ farmName }} </span>
    <span v-if="farmCount > 1">
      <select name="farms" v-model="selectedFarmId">
        <option v-for="farm in farms" :value="farm.id">
          {{ farm.name }}
        </option>
      </select>
    </span>
    <div class="header-right">
      <select name="userMenu">
        <option>
          {{ userName }}
        </option>
        <option>Log out</option>
      </select>
    </div>
  </div>
</template>

<script setup>
  const { auth, userName, isAuthenticated } = toRefs(useUserStore());
  const { farmCount, farmName, farms, selectedFarmId } = toRefs(useFarmStore());

  const logOut = () => {
    console.log("Logging out");
    auth.value.signOut();
  };

  const route = useRoute();
  const farmRoute = ref("/farm/" + selectedFarmId.value);

  const homeTo = computed(() => (route.path === farmRoute.value ? "/" : farmRoute.value));
  const homeIcon = computed(() => (homeTo.value === "/" ? "mdi:home" : "mdi:barn"));
</script>

<style scoped>
  .farm-header {
    align-items: center;
    background-color: #fafafa;
    display: flex;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
      Geneva, Verdana, sans-serif;
    justify-content: space-between;
    font-size: x-large;
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

  .header-right > select {
    font-size: small;
    font-weight: 400;
  }

  .home-icon {
    margin-bottom: 6px;
    margin-right: 6px;
  }
</style>
