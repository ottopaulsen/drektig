<template>
  <div>
    <div class="title">
      <div>
        <h1>Individ</h1>
      </div>
      <div>
        <Icon name="mdi:plus-box" size="2em" @click="$router.push(`${route.fullPath}/new`)" />
      </div>
    </div>

    <NuxtLink
      v-for="individual in individuals"
      :key="individual.id"
      :to="route.path + '/' + individual.id"
    >
      <div class="individual-container">
        <div class="individual-box">
          <span class="individual-number">{{ individual.number }} </span>
          <span class="individual-name">{{ individual.name }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ["auth"],
  });

  const { individuals } = toRefs(useFarmStore());

  const route = useRoute();
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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

  a {
    text-decoration: none;
  }
</style>
