<template>
  <div>
    Bruk et
    <a
      href="https://docs.google.com/spreadsheets/d/12g65375V-PY2-lAE7hHZ59gfzzw4-Pu8t9ry1UGejSQ/edit?usp=sharing"
      target="_new"
    >
      regneark som dette
    </a>
    for å importere data
    <h3>Lim inn data fra regneark her:</h3>
    <Textarea v-model="inputData" rows="5" cols="50" />
    <DataTable :value="tableData">
      <Column field="line" header="Linje" v-tooltip="messages"></Column>
      <Column field="number" header="Individ nummer"></Column>
      <Column field="event" header="Hendelse"></Column>
      <Column field="date" header="Dato"></Column>
    </DataTable>
    <p v-for="message in messages">{{ message }}</p>
    <Button
      :label="`Lagre ${tableData.length} hendelser`"
      :disabled="messages.length || !tableData.length"
      @click="save"
    />
  </div>
</template>

<script lang="ts" setup>
  import { Timestamp } from "firebase/firestore";
  import Textarea from "primevue/textarea";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import { useIndividualStore } from "../stores/IndividualStore";
  import { EventName } from "../types/EventName";
  const router = useRouter();
  const route = useRoute();
  const eventStore = useEventStore();
  const individualStore = useIndividualStore();

  const inputData = ref("");
  const lines = computed(() => (inputData.value ? inputData.value.split("\n") : []));
  const lineData = computed(() => lines.value.map((line) => line.split("\t")));
  const tableData = computed(() =>
    lineData.value.map((line, i) => ({
      line: i + 1,
      number: line[0],
      event: line[1],
      date: line[2],
      raw: line,
    }))
  );

  const messages = computed(() => {
    const res = [];
    tableData.value.forEach((row) => {
      const number = Number.parseInt(row.number);
      if (!individualStore.usedNumbers.includes(number)) {
        res.push(`Linje ${row.line}: Individ nummer ${row.number} finnes ikke`);
      }
      if (!eventStore.eventNames.includes(row.event)) {
        res.push(
          `Linje ${row.line}: Feil hendelsestype: ${row.event}. Tillate hendelsestyper er: ${eventStore.eventNames}`
        );
      }
      if (isNaN(Date.parse(row.date))) {
        res.push(`Linje ${row.line}: Ugyldig dato: ${row.raw[2]}`);
      }
    });
    return res;
  });

  function save() {
    tableData.value.forEach((e) => {
      const event = {
        individual: e.number,
        eventType: e.event,
        date: Timestamp.fromMillis(Date.parse(e.date)),
      } as IndividualEvent;
      eventStore.addEvent(event);
    });
    // router.push(route.path.replace("/new", ""));
  }
</script>

<style scoped>
  textarea {
    width: 100%;
  }
</style>
