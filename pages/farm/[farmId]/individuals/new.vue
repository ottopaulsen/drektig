<template>
  <div>
    <TabView>
      <TabPanel header="Nytt individ">
        <EditIndividual :id="null" />
      </TabPanel>
      <TabPanel header="Importer">
        <ImportIndividuals />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
  import TabView from "primevue/tabview";
  import TabPanel from "primevue/tabpanel";

  definePageMeta({
    middleware: ["auth"],
  });

  const importIndividuals = ref(false);
</script>
