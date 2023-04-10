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
      <Button
        label="Tilbake"
        class="p-button-secondary"
        outlined
        icon="pi pi-arrow-up-left"
        @click="goOneStepUp"
      />
      <Button label="Lagre" icon="pi pi-check" @click="save" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Timestamp } from "firebase/firestore";
  import type { Individual } from "../types/Individual";
  const { addIndividual, getIndividualSnapshot, saveIndividual } = useIndividualStore();
  const router = useRouter();
  const route = useRoute();
  const props = defineProps<{ id?: string }>();

  const isNew = computed(() => !props.id);
  const id = ref<string | null>(null);

  const individual = reactive({
    number: null,
    name: null,
    born: Timestamp.now(),
    toBeTakenOut: false,
  });

  async function save() {
    console.log("This is EditIndividual.save");
    if (isNew.value) {
      addIndividual(individual);
      individual.name = null;
      individual.number = null;
      individual.born = Timestamp.now();
      individual.toBeTakenOut = false;
    } else {
      console.log("Calling saveIndividual");
      saveIndividual({ ...individual, id: id.value as string } as Individual);
      router.push(route.path.replace("/edit", ""));
    }
  }

  onMounted(() => {
    if (!props.id) {
      return;
    }
    getIndividualSnapshot(props.id).then((ind) => {
      Object.assign(individual, ind.data());
      id.value = ind.id;
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
