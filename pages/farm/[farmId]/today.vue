<template>
  <div>
    <div>
      <h3>Hendelser</h3>
    </div>
    <div v-for="event in eventStore.lastEvents">
      <ListEventItem :event="event" :showIndividual="true" />
    </div>
    <div>
      <h3>Ventede hendelser:</h3>
      <p v-for="estimate in estimateStore.estimates">
        <ListEstimateItem :estimate="estimate" :showIndividual="true" />
      </p>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ["auth"],
  });

  const individualStore = useIndividualStore();
  const estimateStore = useEstimateStore();
  const eventStore = useEventStore();
</script>
