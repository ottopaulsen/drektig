<template>
  <div class="row">
    <div class="col">
      <label :for="id">{{ props.label }}</label>
    </div>
    <div class="col">
      <Calendar :id="id" v-model="date" dateFormat="yy-mm-dd" @update:modelValue="update" />
    </div>
  </div>
</template>

<script setup>
  import { Timestamp } from "@firebase/firestore";

  const props = defineProps(["id", "label", "modelValue"]);
  const emit = defineEmits(["update:modelValue"]);
  const id = computed(() => props.id && props.label);

  let date = ref(Date.now());

  const timestamp = computed(() => Timestamp.fromDate(date.value));

  watch(
    () => props.modelValue,
    () => {
      date.value = props.modelValue?.toDate() || Date.now();
    },
    { immediate: true }
  );

  function update() {
    emit("update:modelValue", timestamp.value);
  }
</script>

<style scoped>
  .row {
    display: table-row;
  }

  .col {
    display: table-cell;
  }
</style>
