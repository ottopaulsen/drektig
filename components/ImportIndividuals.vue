<template>
  <div>
    Bruk et
    <a
      href="https://docs.google.com/spreadsheets/d/17tWMWc7ouxwfzNuEI1vu8vaNSMw6Bwc9cyvn-4noNoE/edit?usp=sharing"
      target="_new"
    >
      regneark som dette
    </a>
    for å importere data
    <h3>Lim inn data fra regneark her:</h3>
    <Textarea v-model="inputData" rows="5" cols="50" />
    <DataTable :value="tableData">
      <Column field="line" header="Linje" v-tooltip="messages"></Column>
      <Column field="number" header="Nummer"></Column>
      <Column header="Navn">
        <template #body="slotProps">
          <span v-tooltip.top="'Hallo der'">{{ slotProps.data.name }}</span>
        </template>
      </Column>
      <Column field="born" header="Født"></Column>
      <Column header="Skal slaktes">
        <template #body="slotProps">
          <span>{{ slotProps.data.toBeTakenOut ? "Skal slaktes" : "" }}</span>
        </template>
      </Column>
    </DataTable>
    <p v-for="message in messages">{{ message }}</p>
    <Button
      :label="`Lagre ${tableData.length} individ`"
      :disabled="messages.length || !tableData.length"
      @click="save"
    />
  </div>
</template>

<script lang="ts" setup>
  import Textarea from "primevue/textarea";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import { IndividualNew } from "~~/types/Individual";
  const router = useRouter();
  const route = useRoute();

  const individualStore = useIndividualStore();
  const inputData = ref("");
  const lines = computed(() => (inputData.value ? inputData.value.split("\n") : []));
  const lineData = computed(() => lines.value.map((line) => line.split("\t")));
  const tableData = computed(() =>
    lineData.value.map((line, i) => ({
      line: i + 1,
      number: line[0],
      name: line[1],
      born: line[2],
      toBeTakenOut: !!line[3],
    }))
  );
  const messages = computed(() => {
    const res = [];
    tableData.value.forEach((row) => {
      const number = Number.parseInt(row.number);
      if (isNaN(number) || number < 0) {
        res.push(`Linje ${row.line}: Nummer (${row.number}) må være et positivt heltall`);
      } else if (individualStore.usedNumbers.includes(number)) {
        console.log({ row, number });
        res.push(
          `Linje ${row.line}: Nummer ${number} er allerede brukt på ${
            individualStore.getByNumber(number)[0].name
          }`
        );
      }
      if (individualStore.usedNames.includes(`${row.name}`)) {
        res.push(
          `Linje ${row.line}: Navn ${row.name} er allerede brukt på ${
            individualStore.getByName(row.name)[0].number
          }`
        );
      }
      if (!row.name) {
        res.push(`Linje ${row.line}: Navn mangler`);
      }
      if (isNaN(Date.parse(row.born))) {
        res.push(`Linje ${row.line}: Ugyldig fødselsdato`);
      }
    });
    return res;
  });

  function save() {
    tableData.value.forEach((i) => {
      const individual = {
        number: Number(i.number),
        name: i.name,
        born: Date.parse(i.born),
        toBeTakenOut: !!i.toBeTakenOut,
      } as IndividualNew;
      individualStore.addIndividual(individual);
    });
    router.push(route.path.replace("/new", ""));
  }
</script>
