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

  definePageMeta({
    middleware: ["auth"],
  });

  const route = useRoute();

  const db = useFirestore();

  const id = computed(() => route.params.id);

  const individualSource = computed(() => doc(collection(db, "individuals"), id.value));
  const individual = useDocument(individualSource);

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
