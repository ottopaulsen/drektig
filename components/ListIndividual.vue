<template>
  <div class="individual-container">
    <div class="individual-box">
      <span class="individual-number">{{ individual.number }} </span>
      <span class="individual-name">{{ individual.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Individual } from "../types/Individual";

  const props = defineProps<{ individual: Individual }>();
</script>

<style scoped>
  .individual-container {
    width: 100%;
  }

  .individual-box {
    font-size: large;
    margin: 8px 0px 0px 0px;
    padding: 8px 8px 8px 8px;
    background-color: rgba(249, 248, 231, 0.474);
    border-width: 1px;
    border-radius: 5px;
    border-color: brown;
    border-style: solid;

    color: black;
  }

  .individual-box > span {
    padding: 8px;
  }

  .individual-number {
    font-size: x-large;
  }
</style>
