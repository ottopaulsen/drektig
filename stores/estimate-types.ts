import { IndividualEvents } from "~~/types/IndividualEvents";
import type { Individual } from "@/types/Individual";

const { daysAfter, isAfter } = useTimeUtils();

const estimateTypes = [
  {
    estimateName: "heat",
    label: "Brunst",
    estimate: (individual: Individual, events: IndividualEvents) => {
      return daysAfter(events.heat, 21);
    },
  },
  {
    estimateName: "insemination",
    label: "Inseminering",
    estimate: (individual: Individual, events: IndividualEvents) => {
      if (individual.toBeTakenOut) {
        return undefined;
      }
      return daysAfter(events.heat, 21);
    },
  },
  {
    estimateName: "pregnancyCheck",
    label: "Drektighetskontroll",
    estimate: (individual: Individual, events: IndividualEvents) => {
      return daysAfter(events.inseminated, 40);
    },
  },
  {
    estimateName: "birth",
    label: "Kalving",
    estimate: (individual: Individual, events: IndividualEvents) => {
      if (!isAfter(events.pregnant, events.inseminated)) {
        return undefined;
      }
      return daysAfter(events.inseminated, 278);
    },
  },
] as EstimateType[];

export default estimateTypes;
