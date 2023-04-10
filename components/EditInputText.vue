<template>
  <div class="row">
    <div class="col">
      <label :for="id">{{ props.label }}</label>
    </div>
    <div class="col">
      <InputText :id="id" type="props.type" v-model="text" @update:modelValue="update" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(["id", "label", "modelValue", "type"]);
  const emit = defineEmits(["update:modelValue"]);
  const id = computed(() => props.id && props.label);
  const text = ref(null);

  watch(
    () => props.modelValue,
    () => {
      text.value = props.modelValue;
    },
    { immediate: true }
  );

  function update() {
    emit("update:modelValue", text.value);
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
