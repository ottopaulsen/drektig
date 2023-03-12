<template>
  <div class="farm-header">
    <NuxtLink :to="homeTo">
      <Icon class="home-icon" :name="homeIcon" size="1.6em" />
    </NuxtLink>
    <span v-if="farmCount === 1">{{ farmName }} </span>
    <span v-if="farmCount > 1">
      <select name="farms" :value="farmId" @input="changeFarm">
        <option v-for="farm in farms" :value="farm.id">
          {{ farm.name }}
        </option>
      </select>
    </span>
    <div class="header-right">
      <span>
        {{ userName }}
      </span>
      <span class="logout-icon">
        <Icon class="logout-icon" name="mdi:logout" @click="logOut(router)" />
      </span>
    </div>
  </div>
</template>

<script setup>
  const { logOut, userName } = toRefs(useUserStore());
  const { farmCount, farmId, farmName, farms } = toRefs(useFarmStore());

  const route = useRoute();
  const router = useRouter();
  const farmRoute = computed(() => "/farm/" + farmId.value);

  const homeTo = computed(() => (route.path === farmRoute.value ? "/" : farmRoute.value));
  const homeIcon = computed(() => (homeTo.value === "/" ? "mdi:home" : "mdi:barn"));

  function changeFarm(e) {
    router.push({ params: { farmId: e.target.value } });
  }
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

  .header-right {
    font-size: small;
    font-weight: 400;
  }

  .home-icon {
    margin-bottom: 6px;
    margin-right: 6px;
  }

  .logout-icon {
    margin-left: 2px;
  }
</style>
