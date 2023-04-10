<template>
  <div>
    <NuxtLink
      v-for="individual in individualStore.individuals"
      :key="individual.id"
      :to="{ query: { ...route.query, individual: individual.id } }"
    >
      <ListIndividual :individual="individual" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
  const individualStore = useIndividualStore();
  const route = useRoute();
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
