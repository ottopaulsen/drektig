export default defineNuxtRouteMiddleware(async (to, from) => {
  const individualStore = useIndividualStore();
  await individualStore.loadIndividuals();
  if (
    to.query.individual &&
    (typeof to.query.individual !== "string" ||
      !individualStore.usedIds.includes(to.query.individual))
  ) {
    return abortNavigation();
  }
});
