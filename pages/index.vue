<template>
  <div>
    <div class="image-container">
      <img src="/ku.jpg" width="250" />
    </div>
    <NuxtLink to="/about">
      <button class="button-front">Om Drektig</button>
    </NuxtLink>
    <NuxtLink v-if="!isAuthenticated" to="login">
      <button class="button-front">Logg inn</button>
    </NuxtLink>
    <NuxtLink v-for="farm in farmStore.farms" :to="`/farm/${farm.id}`">
      <button class="button-front">{{ farm.name }}</button>
    </NuxtLink>
  </div>
</template>

<script setup>
  import { storeToRefs } from "pinia";
  definePageMeta({ layout: "infopage" });

  const { isAuthenticated } = storeToRefs(useUserStore());
  const farmStore = useFarmStore();
</script>

<style scoped>
  .image-container {
    display: flex;
    justify-content: center;
    margin: 24px 0px 12px 0px;
  }
</style>
