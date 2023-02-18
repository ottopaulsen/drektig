<template>
  <div class="header">Drektig</div>
  <div v-if="isAuthenticated" class="loggedIn">
    <span> Innlogget som {{ name }} </span>
    <span @click="logOut">Logg ut</span>
  </div>
  <NuxtLink v-if="!isAuthenticated" to="login">
    <button class="button-front">Logg inn</button>
  </NuxtLink>
  <NuxtLink v-for="farm in farms" :to="`/farm/${farm.id}`">
    <button class="button-front">{{ farm.name }}</button>
  </NuxtLink>
</template>

<script setup>
  definePageMeta({ layout: "frontpage" });

  const { auth, userName: name, isAuthenticated } = toRefs(useUserStore());
  const { farms } = toRefs(useFarmStore());

  const logOut = () => {
    console.log("Logging out");
    auth.value.signOut();
  };
</script>

<style scoped>
  .header {
    align-items: center;
    background-color: #fafafa;
    display: flex;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
      Geneva, Verdana, sans-serif;
    justify-content: center;
    font-size: x-large;
    padding: 8px 8px 8px 8px;
  }

  .loggedIn {
    align-items: center;
    background-color: lightgrey;
    display: flex;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
      Geneva, Verdana, sans-serif;
    justify-content: space-between;
    font-size: small;
    padding: 8px 8px 8px 8px;
  }
</style>
