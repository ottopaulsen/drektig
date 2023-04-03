import { IndividualEvents } from "~~/types/IndividualEvents";
import { useIndividualStore } from "./IndividualStore";
import type { Individual } from "@/types/Individual";
import type { IndividualEstimate } from "@/types/IndividualEstimate";
import type { IndividualEstimates } from "@/types/IndividualEstimates";
import estimateTypes from "./estimate-types";

const { daysAfter } = useTimeUtils();

export const useEstimateStore = defineStore("EstimateStore", () => {
  const eventStore = useEventStore();
  const individualStore = useIndividualStore();

  const individualEstimates = computed(() => {
    const res = {} as { [index: string]: IndividualEstimates };
    individualStore.individuals.forEach((individual) => {
      res[individual.id] = calculateEstimates(
        individual,
        eventStore.individualEvents[individual.id]
      );
    });
    return res;
  });

  const estimates = computed(() => {
    const res: IndividualEstimate[] = [];
    Object.keys(individualEstimates.value).forEach((individualId) =>
      Object.keys(individualEstimates.value[individualId]).forEach((estimateType) => {
        res.push({
          individual: individualId,
          estimateType,
          date: individualEstimates.value[individualId][estimateType],
        });
      })
    );
    console.log("This is estimates computed in EstimatesStore");
    console.log(res);
    return res.sort((a, b) => a.date.valueOf() - b.date.valueOf());
  });

  return { individualEstimates, estimates, estimateTypes };
});

function calculateEstimates(individual: Individual, events: IndividualEvents): IndividualEstimates {
  console.log("calculateEstimates", events);
  const res = {} as IndividualEstimates;
  estimateTypes.forEach((type) => {
    const est = type.estimate(individual, events);
    if (est) {
      res[type.estimateName] = est;
    }
  });
  return res;
}
