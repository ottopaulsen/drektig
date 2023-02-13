import { useFirestore } from "vuefire";

import { useCollection } from "vuefire";
import { collection, doc, getDoc } from "firebase/firestore";
import { useLocalStorage } from "@vueuse/core";

export const useFarmStore = defineStore("FarmStore", {
  state: () => {
    const db = useFirestore();
    return {
      farms: useCollection(collection(db, "farms").withConverter(null)),
      selectedFarmId: useLocalStorage("Drektig:selectedFarmId", ""),
    };
  },

  getters: {
    farmCount: (state) => state.farms.length,
    selectedFarm: (state) => state.farms.find((f) => f.id === state.selectedFarmId),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFarmStore, import.meta.hot));
}
