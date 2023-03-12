import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useIndividualStore } from "./IndividualStore";
import type { EventType } from "../types/EventType";

export const useEventStore = defineStore("EventStore", () => {
  const db = useFirestore();
  const farmStore = useFarmStore();
  const individualStore = useIndividualStore();
  const route = useRoute();

  const eventTypes: EventType[] = [
    { eventType: "heat", label: "Brunst" },
    { eventType: "inseminated", label: "Inseminert" },
    { eventType: "pregnant", label: "Drektig" },
    { eventType: "dryOff", label: "Sining" },
    { eventType: "birth", label: "Kalving" },
  ];

  const eventNames = computed(() => eventTypes.map((t) => t.eventType as string));

  const selectedEventType = ref<EventType | null>(null);

  watch(
    () => route.query.eventType,
    (eventType) => {
      selectedEventType.value =
        eventType && typeof eventType === "string"
          ? eventTypes.find((t) => t.eventType === eventType) ?? null
          : null;
    },
    { immediate: true }
  );

  function addEvent(event: IndividualEvent) {
    const colRef = collection(db, "farms", farmStore.farmId, "events");
    addDoc(colRef, event);
  }

  function deleteEvent(eventId: string) {
    deleteDoc(doc(db, "farms", farmStore.farmId, "events", eventId));
  }

  const eventsOfSelectedIndividual = ref<IndividualEvent[]>([]);
  let unsubscribe = () => {};
  watch(
    () => individualStore.selectedIndividual,
    () => {
      unsubscribe();
      eventsOfSelectedIndividual.value.splice(0);
      if (individualStore.selectedIndividualIsLegal) {
        const q = query(
          collection(db, "farms", farmStore.farmId, "events"),
          where("individual", "==", individualStore.selectedIndividual?.id),
          orderBy("date", "desc")
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            eventsOfSelectedIndividual.value.push({ ...doc.data(), id: doc.id } as IndividualEvent);
          });
        });
      }
    },
    { immediate: true }
  );

  return {
    addEvent,
    deleteEvent,
    eventNames,
    eventsOfSelectedIndividual,
    eventTypes,
    selectedEventType,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventStore, import.meta.hot));
}
