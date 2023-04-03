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

<style scoped>
  span {
    margin: 0px 10px 0px 6px;
  }
  .list-container {
    width: 100%;
  }

  .list-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: large;
    margin: 8px 0px 0px 0px;
    padding: 8px 8px 8px 8px;
    background-color: rgba(249, 248, 231, 0.474);
    border-width: 1px;
    border-radius: 5px;
    border-color: brown;
    border-style: solid;

    color: black;
  }

  .list-box > span {
    padding: 8px;
  }
</style>
