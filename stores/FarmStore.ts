import { useFirestore } from "vuefire";

import { useCollection } from "vuefire";
import {
  setDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { useLocalStorage } from "@vueuse/core";

import type { Individual } from "@/types/Individual";

export const useFarmStore = defineStore("FarmStore", () => {
  const db = useFirestore();

  const userStore = useUserStore();

  // Farms
  const accessibleFarmsRef = computed(() =>
    userStore.isAuthenticated ? collection(db, "users", userStore.email, "farms") : null
  );
  const accessibleFarms = useCollection(accessibleFarmsRef);
  const accessibleFarmsArr = computed(() => accessibleFarms.value.map((v) => v.id));

  const farmsRef = computed(() => collection(db, "farms"));
  const farmsQuery = computed(() =>
    accessibleFarmsArr.value.length
      ? query(collection(db, "farms"), where(documentId(), "in", accessibleFarmsArr.value))
      : null
  );
  const farms = useCollection(farmsQuery);

  const farmCount = computed(() => farms.value?.length || 0);

  // Selected farm
  const selectedFarmId = useLocalStorage("Drektig:selectedFarmId", "");
  const farmId = computed(() =>
    accessibleFarmsArr.value.includes(selectedFarmId.value) ? selectedFarmId.value : ""
  );
  const selectedFarmRef = computed(() => {
    console.log("farmId.value = " + farmId.value);
    return farmId.value && userStore.isAuthenticated ? doc(db, "farms", farmId.value) : null;
  });
  const selectedFarm = useDocument(selectedFarmRef);

  const farmName = computed(() => selectedFarm.value?.name);

  function setFarm(id: string) {
    console.log("setFarm " + id);
    selectedFarmId.value = id;
    console.log("setFarm after");
  }

  // Individuals
  const individualsRef = computed(() =>
    userStore.isAuthenticated && farmId.value
      ? collection(db, "farms", farmId.value, "individuals")
      : null
  );
  const individuals = useCollection(individualsRef);

  const usedIds = computed(() => individuals.value.map((i) => i.id));

  function addIndividual(individual: Individual) {
    console.log(`Saving ${individual.number} ${individual.name}`);
    console.log("usedIds = ", usedIds.value);
    let id = "" + individual.number;
    let counter = 2;
    while (usedIds.value.includes(id)) {
      id = `${individual.number}-${counter}`;
      counter++;
    }
    const docRef = doc(db, "farms", farmId.value, "individuals", id);
    setDoc(docRef, individual);
  }

  function saveIndividual(individual: Individual) {
    console.log(
      `Saving ${individual.number} ${individual.name} with id ${individual.id}`,
      individual
    );
    const ref = doc(db, "farms", farmId.value, "individuals", individual.id);
    updateDoc(ref, individual);
  }

  function getIndividual(id: string) {
    const ref = computed(() => doc(db, "farms", farmId.value, "individuals", id));
    return useDocument(ref);
  }

  async function getIndividualSnapshot(id: string) {
    const ref = doc(db, "farms", farmId.value, "individuals", id);
    return await getDoc(ref);
  }

  return {
    accessibleFarms,
    farmCount,
    farmName,
    farms,
    farmsRef,
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
