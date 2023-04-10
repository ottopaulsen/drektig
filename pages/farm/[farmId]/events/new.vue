<template>
  <TabView>
    <TabPanel header="Ny hendelse">
      <NewEvent />
    </TabPanel>
    <TabPanel header="Importer hendelser">
      <ImportEvents />
    </TabPanel>
  </TabView>
</template>

<script setup>
  definePageMeta({
    middleware: ["auth", "route-guard-query-event-type", "route-guard-query-individual"],
  });
</script>
