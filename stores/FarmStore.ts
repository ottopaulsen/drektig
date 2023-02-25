import { useFirestore } from "vuefire";

import { useCollection } from "vuefire";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocalStorage } from "@vueuse/core";

export const useFarmStore = defineStore("FarmStore", () => {
  const db = useFirestore();

  const { isAuthenticated } = toRefs(useUserStore());

  // Farms
  const farmsRef = computed(() => (isAuthenticated.value ? collection(db, "farms") : null));
  const farms = ref<Farm[] | null>(null);
  useCollection(farmsRef, { target: farms });
  const farmCount = computed(() => farms.value?.length || 0);

  // Selected farm
  const selectedFarmId = useLocalStorage("Drektig:selectedFarmId", "");
  // const selectedFarm = computed(() => farms.value?.find((f) => f.id === selectedFarmId.value));
  const selectedFarmRef = computed(() =>
    selectedFarmId.value ? doc(db, "farms", selectedFarmId.value) : null
  );
  const selectedFarm = ref<Farm | null>(null);
  useDocument(selectedFarmRef, { target: selectedFarm });

  const farmName = computed(() => selectedFarm.value?.name);

  function setFarm(id: string) {
    selectedFarmId.value = id;
  }

  // Individuals
  const individualsRef = computed(() =>
    isAuthenticated.value && selectedFarmId.value
      ? collection(db, "farms", selectedFarmId.value, "individuals")
      : null
  );
  const individuals = ref<Individual[] | null>(null);
  useCollection(individualsRef, { target: individuals });

  function addIndividual(individual: Individual) {
    console.log(`Saving ${individual.number} ${individual.name}`);
    addDoc(collection(db, "farms", selectedFarmId.value, "individuals"), individual);
  }

  function saveIndividual(individual: Individual) {
    console.log(`Saving ${individual.number} ${individual.name} with id ${individual.id}`);
    const ref = doc(db, "farms", selectedFarmId.value, "individuals", individual.id);
    updateDoc(ref, individual);
  }

  function getIndividual(id: string) {
    const ref = computed(() => doc(db, "farms", selectedFarmId.value, "individuals", id));
    return useDocument(ref);
  }

  async function getIndividualSnapshot(id: string) {
    const ref = doc(db, "farms", selectedFarmId.value, "individuals", id);
    return await getDoc(ref);
  }

  return {
    farmCount,
    farmName,
    farms,
    getIndividual,
    getIndividualSnapshot,
    individuals,
    selectedFarmId,
    addIndividual,
    saveIndividual,
    setFarm,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFarmStore, import.meta.hot));
}
