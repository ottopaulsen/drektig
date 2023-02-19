import { useFirestore } from "vuefire";

import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { useLocalStorage } from "@vueuse/core";

export const useFarmStore = defineStore("FarmStore", () => {
  const db = useFirestore();

  const { isAuthenticated } = toRefs(useUserStore());
  const farmSource = computed(() => (isAuthenticated.value ? collection(db, "farms") : null));
  const farms = ref<Farm[] | null>(null);
  useCollection(farmSource, { target: farms });

  const selectedFarmId = useLocalStorage("Drektig:selectedFarmId", "");

  const farmCount = computed(() => farms.value?.length || 0);
  const selectedFarm = computed(() => farms.value?.find((f) => f.id === selectedFarmId.value));
  const farmName = computed(() => selectedFarm.value?.name);

  function setFarm(id: string) {
    selectedFarmId.value = id;
  }

  return {
    farms,
    selectedFarmId,
    farmCount,
    farmName,
    setFarm,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFarmStore, import.meta.hot));
}
