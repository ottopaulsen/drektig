<template>
  <div>
    <div class="title">
      <div>
        <h1>{{ title }}</h1>
      </div>
      <div>
        <Icon
          name="mdi:pencil-box-outline"
          size="2em"
          @click="$router.push(`${route.fullPath}/edit`)"
        />
      </div>
    </div>
    <div>
      <p>Født: {{ bornDate.toISODate() }}</p>
      <p v-if="age">
        Alder:
        {{
          age.years +
          " år" +
          (Math.round(age.months) ? " og " + Math.round(age.months) + " måneder" : "")
        }}
      </p>
      <p v-if="individualStore.selectedIndividual?.toBeTakenOut">Skal slaktes!</p>
    </div>

    <h3>Events:</h3>
    <div v-for="event in eventStore.eventsOfSelectedIndividual">
      <ListEventItem :showIndividual="false" :event="event" />
    </div>

    <h3>Estimates:</h3>
    <div v-for="estimate in estimates">
      <ListEstimateItem :estimate="estimate" :showIndividual="false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  //@ts-ignore
  import { DateTime } from "luxon";
  const individualStore = useIndividualStore();

  const eventStore = useEventStore();
  const estimateStore = useEstimateStore();

  definePageMeta({
    middleware: ["auth"],
  });

  const route = useRoute();

  const title = computed(
    () =>
      individualStore.selectedIndividual?.number + " " + individualStore.selectedIndividual?.name
  );
  const bornDate = computed(() =>
    DateTime.fromJSDate(individualStore.selectedIndividual?.born?.toDate())
  );
  const age = computed(() =>
    individualStore.selectedIndividual?.born
      ? DateTime.now().diff(bornDate.value, ["years", "months"])
      : undefined
  );
  const estimates = computed(() => {
    const indEst = estimateStore.individualEstimates[individualStore.selectedIndividual?.id];
    const keys = Object.keys(indEst);
    return keys.map((key) => ({ estimateType: key, date: indEst[key] }));
  });

  useHead({
    title,
  });
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
