<template>
  <div class="row">
    <div class="col">
      <label :for="props.id ?? props.label">{{ props.label }}: </label>
    </div>
    <div class="col">
      <input :id="props.id && props.label" type="props.type" v-model="dateInput" @change="update" />
    </div>
  </div>
</template>

<script setup>
  import { Timestamp } from "@firebase/firestore";
  import { DateTime } from "luxon";

  const props = defineProps(["id", "label", "modelValue"]);
  const emit = defineEmits(["update:modelValue"]);

  const dateInput = ref(null);
  const date = computed(() => {
    return new Date(dateInput.value ?? "");
  });

  const isLegalDate = computed(() => {
    return date.value.toString() !== "Invalid Date";
  });

  const timestamp = computed(() => (isLegalDate.value ? Timestamp.fromDate(date.value) : null));

  watch(
    () => props.modelValue,
    () => {
      dateInput.value = DateTime.fromJSDate(props.modelValue?.toDate()).toISODate();
    },
    { immediate: true }
  );

  function update() {
    console.log("update " + timestamp.value);
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

  input {
    margin-top: 4px;
  }
</style>
