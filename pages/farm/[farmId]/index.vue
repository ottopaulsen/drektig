<template>
  <div>
    <div class="button-panel">
      <NuxtLink :to="`/farm/${farmId}/individuals`"
        ><button class="button-front">Individ</button>
      </NuxtLink>
      <NuxtLink :to="`/farm/${farmId}/calendar`"
        ><button class="button-front">Kalender</button>
      </NuxtLink>
      <NuxtLink :to="`/farm/${farmId}/today`"><button class="button-front">I dag</button></NuxtLink>
      <NuxtLink :to="`/farm/${farmId}/events/new`"
        ><button class="button-front">Ny hendelse</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import { storeToRefs } from "pinia";
  definePageMeta({
    middleware: ["auth"],
  });

  const { farmId } = storeToRefs(useFarmStore());
</script>
