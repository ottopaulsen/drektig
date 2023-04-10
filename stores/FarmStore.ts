import { useFirestore } from "vuefire";

import { collection, query, where, documentId, onSnapshot } from "firebase/firestore";

export const useFarmStore = defineStore("FarmStore", () => {
  const db = useFirestore();
  const farmsLoaded = ref(false);

  const accessibleFarms = ref<string[]>([]);
  const farms = ref<Farm[]>([]);
  const farmCount = computed(() => farms.value.length);

  let unsubscribeAccessibleFarms = () => {};
  let unsubscribeFarms = () => {};
  async function loadFarms() {
    if (farmsLoaded.value) {
      return;
    }
    await getCurrentUser();
    const { data } = await useAsyncData("farms", () => {
      return new Promise((resolve, reject) => {
        const accessibleFarmsRef = collection(db, "users", userStore.email, "farms");
        unsubscribeAccessibleFarms = onSnapshot(accessibleFarmsRef, (snapshot) => {
          snapshot.forEach((doc) => {
            accessibleFarms.value.push(doc.id);
          });
          const farmsQuery = query(
            collection(db, "farms"),
            where(documentId(), "in", accessibleFarms.value)
          );
          unsubscribeFarms = onSnapshot(farmsQuery, (snapshot) => {
            farms.value = [];
            snapshot.forEach((doc) => {
              farms.value.push({ ...doc.data(), id: doc.id } as Farm);
            });
            farmsLoaded.value = true;
            resolve(farmCount.value);
          });
        });
      });
    });
    return data;
  }

  function unloadFarms() {
    unsubscribeAccessibleFarms();
    unsubscribeFarms();
    farmsLoaded.value = false;
    accessibleFarms.value = [];
    farms.value = [];
  }

  const userStore = useUserStore();

  watch(
    () => userStore.email,
    () => {
      unloadFarms();
    }
  );

  // Selected farm
  const farmId = ref("");
  const selectedFarm = computed(() => farms.value.find((f) => f.id === farmId.value));
  const farmName = computed(() => selectedFarm.value?.name);

  const route = useRoute();
  watch(
    () => route.params.farmId,
    () => {
      if (typeof route.params.farmId === "string") {
        farmId.value = route.params.farmId;
      }
    },
    { immediate: true }
  );

  loadFarms();

  return {
    accessibleFarms,
    farmCount,
    farmName,
    farms,
    farmId,
    loadFarms,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFarmStore, import.meta.hot));
}
