<template>
  <div class="list-container">
    <div class="list-box">
      <div>
        <span>{{ date }}</span>
        <span v-if="props.showIndividual">{{ individualText }}</span>
        <span>{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { DateTime } from "luxon";
  import type { IndividualEstimate } from "~~/types/IndividualEstimate";

  const estimateStore = useEstimateStore();
  const individualStore = useIndividualStore();

  const props = defineProps<{
    estimate: IndividualEstimate;
    showIndividual: Boolean;
  }>();
  const individual = computed(() =>
    individualStore.individuals.find((i) => i.id === props.estimate.individual)
  );
  const individualText = computed(() => `${individual.value?.number} ${individual.value?.name}`);

  const label = computed(
    () =>
      estimateStore.estimateTypes.find((t) => t.estimateName == props.estimate.estimateType)?.label
  );

  const date = computed(() => DateTime.fromJSDate(props.estimate.date).toISODate());
</script>
