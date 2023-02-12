<template>
  <div class="breadcrum">
    <span class="back" @click="router.back()">&lt;</span>
    <span v-for="(item, i) in clickable" :key="i" @click="router.push('/' + item.path)">
      {{ item.text }} /
    </span>
    <span v-for="(item, i) in last" :key="i">{{ item }}</span>
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
</script>

<style scoped>
  .back {
    margin-right: 6px;
  }
</style>
