<template>
  <div>
    <div class="button-panel">
      <NuxtLink :to="`/farm/${selectedFarmId}/individuals`"
        ><button class="button-front">Individ</button></NuxtLink
      >
      <NuxtLink to="calendar"><button class="button-front">Kalender</button></NuxtLink>
      <NuxtLink to="today"><button class="button-front">I dag</button></NuxtLink>
      <NuxtLink to="events/new"><button class="button-front">Ny hendelse</button></NuxtLink>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ["auth"],
  });

  const { selectedFarmId, setFarm } = useFarmStore();
  const route = useRoute();
  watch(
    () => route.params.id,
    (value) => {
      setFarm(value);
    },
    { immediate: true }
  );
</script>
