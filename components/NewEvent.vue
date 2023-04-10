import { useEventStore } from '../stores/EventStore'; import { useIndividualStore } from
'../stores/IndividualStore';
<template>
  <div>
    <div v-if="!eventStore.selectedEventType">
      <h4>Velg hendelse:</h4>
      <SelectEventType />
    </div>
    <div v-if="eventStore.selectedEventType">
      <div>
        <div>
          <span>Hendelse: {{ eventStore.selectedEventType?.label }}</span>
          <span>
            <NuxtLink :to="{ query: { ...route.query, eventType: null } }">
              <Icon name="mdi:pencil-box-outline" size="2em" />
            </NuxtLink>
          </span>
        </div>
      </div>
      <div v-if="individualStore.selectedIndividual">
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
      <h3 v-if="eventStore.selectedEventType && individualStore.selectedIndividual">
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
      <div v-if="!individualStore.selectedIndividual">
        <h4>Velg individ:</h4>
        <SelectIndividual />
        <br />
        <p>
          Her skal bare de som er aktuelt å registrere hendelsen på komme opp, og de skal komme i
          den mest sannsynlige rekkefølgen
        </p>
      </div>
      <div v-if="individualStore.selectedIndividual && eventStore.selectedEventType">
        <EditInputDate label="Dato" id="event-date" v-model="date" />
        <Button label="Lagre" icon="pi pi-check" @click="save" />
      </div>
    </div>
    <div v-if="eventStore.selectedEventType && individualStore.selectedIndividual">
      <h3>Tidligere hendelser:</h3>
      <div>
        <ListEvents />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Timestamp } from "firebase/firestore";

  const eventStore = useEventStore();
  const individualStore = useIndividualStore();
  const route = useRoute();

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
