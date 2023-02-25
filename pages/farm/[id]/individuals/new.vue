<template>
  <div>
    <EditIndividual :id="null" />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ["auth"],
  });
</script>
