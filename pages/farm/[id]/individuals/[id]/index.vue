<template>
  <div>
    <div v-if="found" class="title">
      <div>
        <h1>{{ individual?.number }} {{ individual?.name }}</h1>
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
      <p v-if="individual?.toBeTakenOut">Skal slaktes!</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { DateTime } from "luxon";
  const { getIndividual } = useFarmStore();

  definePageMeta({
    middleware: ["auth"],
  });

  const route = useRoute();
  const id = computed(() => route.params.id);
  const individual = getIndividual(id.value);
  const found = computed(() => individual.value && individual.value.id === id.value);

  const title = computed(() => individual.value?.number + " " + individual.value?.name);
  const bornDate = computed(() => DateTime.fromJSDate(individual.value?.born?.toDate()));
  const age = computed(() =>
    individual.value?.born ? DateTime.now().diff(bornDate.value, ["years", "months"]) : undefined
  );

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
