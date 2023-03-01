<template>
  <div>
    <div class="title">
      <div>
        <h1>Individ</h1>
      </div>
      <div>
        <Icon name="mdi:plus-box" size="2em" @click="$router.push(`${route.fullPath}/new`)" />
      </div>
    </div>

    <NuxtLink
      v-for="individual in individuals"
      :key="individual.id"
      :to="route.path + '/' + individual.id"
    >
      <ListIndividual :individual="individual" />
    </NuxtLink>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ["auth"],
  });

  const { individuals } = toRefs(useFarmStore());

  const route = useRoute();
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    text-decoration: none;
  }
</style>
