<template>
  <div>
    <h1 v-if="isNew">Nytt individ</h1>
    <h1 v-if="!isNew">Rediger individ</h1>
    <section>
      <EditInputText label="Nummer" id="number" v-model="individual.number" type="number" />
      <EditInputText label="Navn" id="name" v-model="individual.name" type="text" />
      <EditInputDate label="Født" id="born" v-model="individual.born" type="text" />
      <EditInputCheck label="Skal slaktes" id="toBeTakenOut" v-model="individual.toBeTakenOut" />
    </section>
    <div class="action-button-row">
      <button class="action-button" @click="goOneStepUp">Tilbake</button>
      <button class="action-button" @click="save">Lagre</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Individual } from "../types/Individual";
  const { addIndividual, getIndividualSnapshot, saveIndividual } = useIndividualStore();
  const router = useRouter();
  const route = useRoute();
  const props = defineProps({ id: null });

  const isNew = computed(() => !props.id);

  const individual = reactive<Individual>({
    number: null,
    name: null,
    id: null,
    born: null,
    toBeTakenOut: false,
  });

  async function save() {
    if (isNew.value) {
      addIndividual(individual);
      individual.name = null;
      individual.number = null;
      individual.born = null;
      individual.toBeTakenOut = false;
    } else {
      saveIndividual(individual);
    }
  }

  onMounted(() => {
    getIndividualSnapshot(route.params.individualId).then((ind) => {
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
