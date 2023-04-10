<template>
  <div>
    <EditIndividual :id="$route.params.individualId" />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ["auth"],
  });
</script>
