<template>
  <div class="breadcrum">
    <span class="back-icon-span">
      <Icon class="back-icon" name="mdi:arrow-left-thick" size="1.5em" @click="goBack" />
    </span>
    <span class="back-icon-span">
      <Icon
        class="back-icon"
        :class="path.length <= 2 ? 'back-icon-disabled' : null"
        name="mdi:arrow-up-thick"
        size="1.5em"
        @click="goOneStepUp()"
      />
    </span>
  </div>
</template>

<script setup>
  const router = useRouter();
  const route = useRoute();

  const path = computed(() => route.path.split("/").filter((v) => v));
  const clickable = computed(() =>
    path.value
      .filter((v, i) => i < path.value.length - 1)
      .map((v, i) => ({ text: v, path: path.value.slice(0, i + 1).join("/") }))
  );
  const last = computed(() => path.value.filter((v, i) => i === path.value.length - 1));

  const backCount = ref(0);

  function goBack() {
    router.back();
    backCount.value++;
  }

  function goOneStepUp() {
    if (path.value.length > 1) {
      router.push(route.path.slice(0, route.path.lastIndexOf("/")));
      backCount.value = 0;
    }
  }
</script>

<style scoped>
  .back {
    margin-right: 6px;
  }

  .back-icon {
    margin-left: 4px;
    margin-right: 4px;
  }

  .back-icon-disabled {
    color: #dddddd;
  }
</style>
