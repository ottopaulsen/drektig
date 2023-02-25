<template>
  <div>
    <h1 v-if="isNew">Nytt individ</h1>
    <h1 v-if="!isNew">Rediger individ</h1>
    <section>
      <EditInputNumber label="Nummer" id="number" v-model="individual.number" type="number" />
      <EditInputNumber label="Navn" id="name" v-model="individual.name" type="text" />
    </section>
    <div class="action-button-row">
      <button class="action-button" @click="goOneStepUp">Tilbake</button>
      <button class="action-button" @click="save">Lagre</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({ id: null });
  const { addIndividual, getIndividualSnapshot, saveIndividual } = useFarmStore();
  const router = useRouter();
  const route = useRoute();

  const isNew = computed(() => !props.id);

  const individual = reactive<Individual>({
    number: null,
    name: null,
    id: null,
  });

  async function save() {
    if (isNew.value) {
      addIndividual(individual);
      individual.name = null;
      individual.number = null;
    } else {
      saveIndividual(individual);
    }
  }

  onMounted(() => {
    getIndividualSnapshot(route.params.id).then((ind) => {
      console.log("Git ind: ", ind.data());
      Object.assign(individual, ind.data());
      individual.id = ind.id;
    });
  });

  function goOneStepUp() {
    router.push(route.path.slice(0, route.path.lastIndexOf("/")));
  }
</script>

<style scoped>
  section {
    display: table;
    width: 100%;
  }
</style>
