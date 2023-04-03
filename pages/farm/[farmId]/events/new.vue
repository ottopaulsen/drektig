<template>
  <div>
    <div v-if="!eventStore.selectedEventType">
      <h1>Ny hendelse</h1>
      <NuxtLink
        v-for="type in eventStore.eventTypes"
        :to="{ query: { ...route.query, eventType: type.eventType } }"
      >
        <button class="button-front">{{ type.label }}</button>
      </NuxtLink>
    </div>
    <div v-if="eventStore.selectedEventType">
      <h3>
        Registrer hendelse:
        {{
          "" +
          eventStore.selectedEventType?.label +
          (individualStore.selectedIndividualIsLegal
            ? " på " +
              individualStore.selectedIndividual?.number +
              " " +
              individualStore.selectedIndividual?.name
            : "")
        }}
      </h3>
      <div>
        <div>
          <span>Registrer hendelse: {{ eventStore.selectedEventType?.label }}</span>
          <span>
            <NuxtLink :to="{ query: { ...route.query, eventType: null } }">
              <Icon name="mdi:pencil-box-outline" size="2em" />
            </NuxtLink>
          </span>
        </div>
        <div v-if="individualStore.selectedIndividualIsLegal">
          <span
            >Individ:
            {{
              individualStore.selectedIndividual?.number +
              " " +
              individualStore.selectedIndividual?.name
            }}</span
          >
          <span>
            <NuxtLink :to="{ query: { ...route.query, individual: null } }">
              <Icon name="mdi:pencil-box-outline" size="2em" />
            </NuxtLink>
          </span>
        </div>
      </div>
      <div v-if="!individualStore.selectedIndividualIsLegal">
        <p>Velg individ:</p>

        <NuxtLink
          v-for="individual in individualStore.individuals"
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
      <div v-if="individualStore.selectedIndividualIsLegal && eventStore.selectedEventType">
        <EditInputDate label="Dato" id="event-date" v-model="date" />
        <button class="action-button" @click="save">Lagre</button>
      </div>
    </div>
    <div>
      <ListEvents />
    </div>
  </div>
</template>

<script setup>
  import { Timestamp } from "firebase/firestore";

  definePageMeta({
    middleware: ["auth", "route-guard-query-event-type"],
  });

  const route = useRoute();
  const eventStore = useEventStore();
  const individualStore = useIndividualStore();

  const date = ref(Timestamp.now());

  async function save() {
    const event = {
      eventType: eventStore.selectedEventType.eventType,
      individual: individualStore.selectedIndividual.id,
      date: date.value,
    };
    eventStore.addEvent(event);
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
