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
      <h3>
        Registrer hendelse:
        {{
          "" +
          selectedEventType?.label +
          (legalIndividual ? " på " + individual?.number + " " + individual?.name : null)
        }}
      </h3>
      <div>
        <div>
          <span>Registrer hendelse: {{ selectedEventType?.label }}</span>
          <span>
            <NuxtLink :to="{ query: { ...route.query, eventType: null } }">
              <Icon name="mdi:pencil-box-outline" size="2em" />
            </NuxtLink>
          </span>
        </div>
        <div v-if="legalIndividual">
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
          v-for="individual in farmStore.individuals"
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
      <div v-if="legalIndividual && legalEventType">
        <p>Oppgi dato:</p>
        <EditInputDate label="Dato" id="event-date" v-model="date" />
        <button class="action-button" @click="save">Lagre</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Timestamp } from "firebase/firestore";
  import { useFarmStore } from "../../../../stores/FarmStore";
  const eventTypes = [
    { eventType: "heat", label: "Brunst" },
    { eventType: "inseminated", label: "Inseminert" },
    { eventType: "pregnant", label: "Drektig" },
    { eventType: "dryOff", label: "Sining" },
    { eventType: "birth", label: "Kalving" },
  ];
  const route = useRoute();
  const eventType = computed(() => route.query.eventType);
  const legalEventType = computed(() =>
    eventTypes.map((t) => t.eventType).includes(eventType.value)
  );
  const selectedEventType = computed(() => eventTypes.find((t) => t.eventType === eventType.value));

  const farmStore = useFarmStore();

  const individualId = computed(() => route.query.individual);

  const individual = computed(() =>
    legalIndividual ? farmStore.individuals.find((i) => i.id === individualId.value) : null
  );

  const legalIndividual = computed(
    () => individualId.value && farmStore.individuals.map((i) => i.id).includes(individualId.value)
  );

  const date = Timestamp.now();

  async function save() {
    const event = {
      eventType: eventType.value,
      individual: individualId.value,
      date,
    };
    farmStore.addEvent(event);
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
