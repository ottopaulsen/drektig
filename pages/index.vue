<template>
  <div class="image-container">
    <img src="/ku.jpg" width="250" />
  </div>
  <NuxtLink to="/about">
    <button class="button-front">Om Drektig</button>
  </NuxtLink>
  <NuxtLink v-if="!isAuthenticated" to="login">
    <button class="button-front">Logg inn</button>
  </NuxtLink>
  <NuxtLink v-for="farm in farms" :to="`/farm/${farm.id}`">
    <button class="button-front">{{ farm.name }}</button>
  </NuxtLink>
</template>

<script setup>
  definePageMeta({ layout: "infopage" });

  const { isAuthenticated } = toRefs(useUserStore());
  const { farms } = toRefs(useFarmStore());
</script>

<style scoped>
  .header {
    align-items: center;
    background-color: #fafafa;
    display: flex;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
      Geneva, Verdana, sans-serif;
    justify-content: center;
    font-size: x-large;
    padding: 8px 8px 8px 8px;
  }

  .loggedIn {
    align-items: center;
    background-color: lightgrey;
    display: flex;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
      Geneva, Verdana, sans-serif;
    justify-content: space-between;
    font-size: small;
    padding: 8px 8px 8px 8px;
  }

  .image-container {
    display: flex;
    justify-content: center;
    margin: 24px 0px 12px 0px;
  }
</style>
