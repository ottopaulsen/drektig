<template>
  <div class="row">
    <div class="col">
      <label :for="id">{{ props.label }}: </label>
    </div>
    <div class="col">
      <Checkbox v-model="checked" :binary="true" @input="update" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    id: { type: String, required: false, default: null },
    label: { type: String, required: false, default: "label" },
    modelValue: { type: Boolean, required: false, default: false },
  });

  const checked = ref(props.modelValue === true);
  const emit = defineEmits(["update:modelValue"]);
  const id = computed(() => props.id && props.label);

  watch(
    () => props.modelValue,
    () => {
      checked.value = props.modelValue === true;
    },
    { immediate: true }
  );

  function update(value) {
    emit("update:modelValue", value);
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
