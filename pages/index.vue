<template>
  <div>
    <div class="button-panel">
      <NuxtLink to="individuals"><button class="button-front">Individ</button></NuxtLink>
      <NuxtLink to="calendar"><button class="button-front">Kalender</button></NuxtLink>
      <NuxtLink to="today"><button class="button-front">I dag</button></NuxtLink>
      <NuxtLink to="events/new"><button class="button-front">Ny hendelse</button></NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ["auth"],
    layout: "frontpage",
  });
</script>

<style scoped>
  .button-panel {
    margin: 12px 0px 12px 0px;
  }

  .button-front {
    width: 100%;
    height: 10vh;
    font-size: xx-large;
    margin: 8px 0px 0px 0px;
    background-color: rgba(66, 107, 25, 0.474);
  }
</style>
