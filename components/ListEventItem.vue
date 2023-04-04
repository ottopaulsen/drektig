<template>
  <div class="list-container">
    <div class="list-box">
      <div>
        <span>{{ date }}</span>
        <span v-if="props.showIndividual">{{ individualText }}</span>
        <span>{{ label }}</span>
      </div>
      <div>
        <Icon name="mdi:delete" size="1.6em" @click="handleDelete" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { DateTime } from "luxon";

  const eventStore = useEventStore();
  const individualStore = useIndividualStore();

  const props = defineProps<{ event: IndividualEvent; showIndividual: Boolean }>();
  const individual = computed(() =>
    individualStore.individuals.find((i) => i.id === props.event.individual)
  );
  const individualText = computed(() => `${individual.value?.number} ${individual.value?.name}`);

  const label = computed(
    () => eventStore.eventTypes.find((t) => t.eventType == props.event.eventType)?.label
  );

  const date = computed(() => DateTime.fromJSDate(props.event.date.toDate()).toISODate());

  function handleDelete() {
    eventStore.deleteEvent(props.event.id);
  }
</script>
