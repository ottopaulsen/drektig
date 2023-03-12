<template>
  <div>
    <div>
      <h1>I dag</h1>
    </div>
    <div v-for="event in eventStore.eventsOfAllIndividuals">
      <ListEventItem :event="event" :showIndividual="true" />
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ["auth"],
  });

  const eventStore = useEventStore();
</script>
