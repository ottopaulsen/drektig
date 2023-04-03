import { useFirestore } from "vuefire";

import { setDoc, collection, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

import type { Individual } from "@/types/Individual";

export const useIndividualStore = defineStore("IndividualStore", () => {
  const db = useFirestore();
  const farmStore = useFarmStore();
  const route = useRoute();

  const individuals = ref<Individual[]>([]);
  let individualsLoaded = ref(false);
  let unsubscribeIndividuals = () => {};

  async function loadIndividuals() {
    if (individualsLoaded.value) {
      return;
    }
    await farmStore.loadFarms();
    const { data } = await useAsyncData("individuals", () => {
      return new Promise((resolve) => {
        individuals.value.splice(0);
        const ref = collection(db, "farms", farmStore.farmId, "individuals");
        unsubscribeIndividuals = onSnapshot(ref, (snapshot) => {
          individuals.value.splice(0);
          snapshot.forEach((doc) => {
            individuals.value.push({ ...doc.data(), id: doc.id } as Individual);
          });
          individualsLoaded.value = true;
          resolve(true);
        });
      });
    });
    return data;
  }

  function unloadIndividuals() {
    unsubscribeIndividuals();
    individualsLoaded.value = false;
    individuals.value.splice(0);
  }

  watch(
    () => farmStore.farmId,
    () => {
      unloadIndividuals();
      if (farmStore.farmId) {
        loadIndividuals();
      }
    }
  );

  const usedIds = computed(() => individuals.value.map((i) => i.id));

  function addIndividual(individual: Individual) {
    let id = "" + individual.number;
    let counter = 2;
    while (usedIds.value.includes(id)) {
      id = `${individual.number}-${counter}`;
      counter++;
    }
    const docRef = doc(db, "farms", farmStore.farmId, "individuals", id);
    setDoc(docRef, individual);
  }

  function saveIndividual(individual: Individual) {
    //@ts-ignore
    const ref = doc(db, "farms", farmStore.farmId, "individuals", individual.id);
    updateDoc(ref, individual);
  }

  function getIndividual(id: string) {
    const ref = computed(() =>
      usedIds.value.includes(id) ? doc(db, "farms", farmStore.farmId, "individuals", id) : null
    );
    return useDocument(ref);
  }

  async function getIndividualSnapshot(id: string) {
    const ref = doc(db, "farms", farmStore.farmId, "individuals", id);
    return await getDoc(ref);
  }

  // Selected individual

  const selectedIndividual = ref<Individual | null>(null);
  const selectedIndividualIsLegal = ref<Boolean>(false);

  watch(
    route,
    async () => {
      await loadIndividuals();
      const individualQuery =
        typeof route.query.individual === "string" ? route.query.individual : null;
      const individualParam = route.params.individualId;
      const individualId = "" + (individualParam || individualQuery);

      selectedIndividualIsLegal.value = usedIds.value.includes(individualId);
      selectedIndividual.value = selectedIndividualIsLegal.value
        ? individuals.value.find((i) => i.id === individualId) ?? null
        : null;
    },
    { immediate: true }
  );

  return {
    getIndividual,
    getIndividualSnapshot,
    individuals,
    loadIndividuals,
    addIndividual,
    saveIndividual,
    selectedIndividual,
    selectedIndividualIsLegal,
    usedIds,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIndividualStore, import.meta.hot));
}
