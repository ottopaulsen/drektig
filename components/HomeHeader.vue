<template>
  <div class="farm-header">
    <NuxtLink to="/"> Drektig </NuxtLink>
    <div v-if="isAuthenticated" class="header-right">
      <span>
        {{ userName }}
      </span>
      <span class="logout-icon">
        <Icon class="logout-icon" name="mdi:logout" @click="logOut(router)" />
      </span>
    </div>
    <div v-if="!isAuthenticated" class="header-right">
      <span>
        <NuxtLink to="/login">
          <button>Innlogging</button>
        </NuxtLink>
      </span>
    </div>
  </div>
</template>

<script setup>
  const { logOut, userName, isAuthenticated } = toRefs(useUserStore());
  const router = useRouter();
</script>

<style scoped>
  .farm-header {
    align-items: center;
    background-color: #fafafa;
    display: flex;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
      Geneva, Verdana, sans-serif;
    justify-content: space-between;
    font-size: x-large;
  }

  .header-left,
  .header-right {
    font-size: small;
    font-weight: 400;
  }

  .logout-icon {
    margin-left: 2px;
  }

  a {
    text-decoration: none;
  }
</style>
