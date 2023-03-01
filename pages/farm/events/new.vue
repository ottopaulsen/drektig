<template>
  <div>
    <div v-if="!legalEventType">
      <h1>Ny hendelse</h1>
      <NuxtLink
        v-for="type in eventTypes"
        :to="{ query: { ...route.query, eventType: type.eventType } }"
      >
        <button class="button-front">{{ type.label }}</button>
      </NuxtLink>
    </div>
    <div v-if="legalEventType">
      <h2>
        Registrer hendelse:
        {{
          "" +
          selectedEventType?.label +
          (legalIndividual ? " på " + individual?.number + " " + individual?.name : null)
        }}
      </h2>
      <div>
        <div>
          <span>Registrer hendelse: {{ selectedEventType?.label }}</span>
          <span>
            <NuxtLink :to="{ query: { ...route.query, eventType: null } }">
              <Icon name="mdi:pencil-box-outline" size="2em" />
            </NuxtLink>
          </span>
        </div>
        <div>
          <span>Individ: {{ individual?.number + " " + individual?.name }}</span>
          <span>
            <NuxtLink :to="{ query: { ...route.query, individual: null } }">
              <Icon name="mdi:pencil-box-outline" size="2em" />
            </NuxtLink>
          </span>
        </div>
      </div>
      <div v-if="!legalIndividual">
        <p>Velg individ:</p>

        <NuxtLink
          v-for="individual in individuals"
          :key="individual.id"
          :to="{ query: { ...route.query, individual: individual.id } }"
        >
          <ListIndividual :individual="individual" />
        </NuxtLink>
        <br />
        <p>
          Her skal bare de som er aktuelt å registrere hendelsen på komme opp, og de skal komme i
          den mest sannsynlige rekkefølgen
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const eventTypes = [
    { eventType: "heat", label: "Brunst" },
    { eventType: "inseminated", label: "Inseminert" },
    { eventType: "pregnant", label: "Drektig" },
    { eventType: "birth", label: "Kalving" },
  ];
  const route = useRoute();
  const eventType = computed(() => route.query.eventType);
  const legalEventType = computed(() =>
    eventTypes.map((t) => t.eventType).includes(eventType.value)
  );
  const selectedEventType = computed(() => eventTypes.find((t) => t.eventType === eventType.value));

  const { individuals } = toRefs(useFarmStore());

  const individualId = computed(() => route.query.individual);

  const { getIndividual } = useFarmStore();
  const individual = getIndividual(individualId.value);
  const legalIndividual = computed(() => !!individual.value?.id);
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
