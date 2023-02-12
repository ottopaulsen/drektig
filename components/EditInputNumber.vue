<template>
  <div class="row">
    <div class="col">
      <label :for="props.id ?? props.label">{{ props.label }}: </label>
    </div>
    <div class="col">
      <input
        :id="props.id && props.label"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(["id", "label", "modelValue"]);
  defineEmits(["update:modelValue"]);
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
