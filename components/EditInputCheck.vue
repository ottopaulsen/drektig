<template>
  <div class="row">
    <div class="col">
      <label :for="props.id ?? props.label">{{ props.label }}: </label>
    </div>
    <div class="col">
      <input
        :id="props.id && props.label"
        type="checkbox"
        :value="modelValue"
        :checked="modelValue === true"
        v-model="checked"
        @input="update"
      />
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

  function update(event) {
    emit("update:modelValue", event.target.checked);
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
