<template>
  <div class="title">
    <div>
      <h1>Individ</h1>
    </div>
    <div>
      <Icon name="mdi:plus-box" size="2em" @click="$router.push(`${route.fullPath}/new`)" />
    </div>
  </div>

  <li v-for="individual in individuals" :key="individual.id">
    <NuxtLink :to="'/individuals/' + individual.id"
      ><span>{{ individual.number }} {{ individual.name }}</span></NuxtLink
    >
  </li>
</template>

<script setup>
  import { useFirestore } from "vuefire";

  import { useCollection } from "vuefire";
  import { collection } from "firebase/firestore";

  definePageMeta({
    middleware: ["auth"],
  });

  const db = useFirestore();
  const individuals = useCollection(collection(db, "individuals"));

  const router = useRouter();
  const route = useRoute();
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
