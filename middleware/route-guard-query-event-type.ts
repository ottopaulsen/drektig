export default defineNuxtRouteMiddleware(async (to, from) => {
  const eventStore = useEventStore();
  if (
    to.query.eventType &&
    (typeof to.query.eventType !== "string" || !eventStore.eventNames.includes(to.query.eventType))
  ) {
    return abortNavigation();
  }
});
