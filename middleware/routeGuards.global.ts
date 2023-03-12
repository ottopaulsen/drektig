export default defineNuxtRouteMiddleware(async (to, from) => {
  const farmStore = useFarmStore();
  const individualStore = useIndividualStore();

  // Only accept farms that the user can access
  if (to.path.startsWith("/farm/")) {
    await farmStore.loadFarms();
    if (
      typeof to.params.farmId !== "string" ||
      !farmStore.accessibleFarms.includes(to.params.farmId)
    ) {
      return abortNavigation();
    }
    individualStore.loadIndividuals();
  }

  // Only accept individuals existing at the selected farm
  if (to.params.individualId) {
    await individualStore.loadIndividuals();
    if (
      typeof to.params.individualId !== "string" ||
      !individualStore.usedIds.includes(to.params.individualId)
    ) {
      return abortNavigation();
    }
  }
});
