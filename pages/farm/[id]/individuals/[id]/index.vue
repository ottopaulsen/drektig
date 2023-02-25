<template>
  <div v-if="individual" class="title">
    <div>
      <h1>{{ individual.number }} {{ individual.name }}</h1>
    </div>
    <div>
      <Icon
        name="mdi:pencil-box-outline"
        size="2em"
        @click="$router.push(`${route.fullPath}/edit`)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { collection, doc } from "firebase/firestore";

  const { getIndividual } = useFarmStore();

  definePageMeta({
    middleware: ["auth"],
  });

  const route = useRoute();
  const id = computed(() => route.params.id);
  const individual = getIndividual(id.value);

  const title = computed(() => individual.value?.number + " " + individual.value?.name);

  useHead({
    title,
  });
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
