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
import type { EventType } from "../types/EventType";

const { daysFromToday } = useTimeUtils();

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
  let unsubscribeOne = () => {};
  watch(
    () => individualStore.selectedIndividual,
    () => {
      unsubscribeOne();
      eventsOfSelectedIndividual.value.splice(0);
      if (individualStore.selectedIndividualIsLegal) {
        const q = query(
          collection(db, "farms", farmStore.farmId, "events"),
          where("individual", "==", individualStore.selectedIndividual?.id),
          orderBy("date", "desc")
        );
        unsubscribeOne = onSnapshot(q, (snapshot) => {
          eventsOfSelectedIndividual.value.splice(0);
          snapshot.forEach((doc) => {
            eventsOfSelectedIndividual.value.push({ ...doc.data(), id: doc.id } as IndividualEvent);
          });
        });
      }
    },
    { immediate: true }
  );

  const filterDays = ref(3);

  // TODO: Remove this and use only lastEvents with paging.
  const eventsOfAllIndividuals = ref<IndividualEvent[]>([]);
  let unsubscribeAll = () => {};
  watch(
    () => farmStore.farmId,
    () => {
      unsubscribeAll();
      eventsOfAllIndividuals.value.splice(0);
      if (farmStore.farmId) {
        const q = query(
          collection(db, "farms", farmStore.farmId, "events"),
          where("date", ">=", daysFromToday(-filterDays.value)),
          orderBy("date", "desc")
        );
        unsubscribeAll = onSnapshot(q, (snapshot) => {
          eventsOfAllIndividuals.value.splice(0);
          snapshot.forEach((doc) => {
            eventsOfAllIndividuals.value.push({ ...doc.data(), id: doc.id } as IndividualEvent);
          });
        });
      }
    },
    { immediate: true }
  );

  const lastEvents = ref<IndividualEvent[]>([]);
  let unsubscribeLast = () => {};
  watch(
    () => farmStore.farmId,
    () => {
      unsubscribeLast();
      lastEvents.value.splice(0);
      if (farmStore.farmId) {
        const q = query(
          collection(db, "farms", farmStore.farmId, "events"),
          orderBy("date", "desc"),
          orderBy("individual"),
          orderBy("eventType"),
          where("date", ">=", daysFromToday(-360))
        );
        const eventMap = new Map();
        unsubscribeLast = onSnapshot(q, (snapshot) => {
          lastEvents.value.splice(0);
          eventMap.clear();
          snapshot.forEach((doc) => {
            const { individual, eventType } = doc.data();
            const key = `${individual}_${eventType}`;
            if (!eventMap.has(key)) {
              eventMap.set(key, doc);
            }
            lastEvents.value.splice(0);
            eventMap.forEach((doc) => {
              lastEvents.value.push({ ...doc.data(), id: doc.id } as IndividualEvent);
            });
          });
        });
      }
    },
    { immediate: true }
  );

  // const individualEvents = ref<{ [index: string]: { [index: string]: Timestamp } }>({});
  // individualStore.usedIds.forEach((id) => {
  //   individualEvents.value[id] = {};
  // });
  // lastEvents.value.forEach((event) => {
  //   individualEvents.value[event.individual][event.eventType] = event.date;
  // });

  const individualEvents = computed(() => {
    const res = {} as { [index: string]: { [index: string]: Date } };
    individualStore.usedIds.forEach((id) => {
      res[id] = {};
    });
    lastEvents.value.forEach((event) => {
      res[event.individual][event.eventType] = event.date.toDate();
    });
    return res;
  });

  return {
    addEvent,
    deleteEvent,
    eventNames,
    eventsOfSelectedIndividual,
    eventsOfAllIndividuals,
    eventTypes,
    filterDays,
    individualEvents,
    lastEvents,
    selectedEventType,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventStore, import.meta.hot));
}
