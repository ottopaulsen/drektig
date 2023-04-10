<template>
  <div>
    <NuxtLink
      v-for="type in eventStore.eventTypes"
      :to="{ query: { ...route.query, eventType: type.eventType } }"
    >
      <button class="button-front">{{ type.label }}</button>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
  const eventStore = useEventStore();
  const route = useRoute();
</script>
