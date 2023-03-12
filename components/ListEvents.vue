<template>
  <div v-for="event in eventStore.eventsOfSelectedIndividual">
    <ListEventItem :event="event" />
  </div>
</template>

<script setup>
  import { useEventStore } from "@/stores/EventStore";
  const eventStore = useEventStore();
</script>
