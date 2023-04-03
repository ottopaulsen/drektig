<template>
  <div v-for="event in eventStore.eventsOfSelectedIndividual">
    <ListEventItem :event="event" />
  </div>
</template>

<script setup>
  const eventStore = useEventStore();
</script>
