import { IndividualEvents } from "~~/types/IndividualEvents";
import type { Individual } from "@/types/Individual";

const { daysAfter, isAfter } = useTimeUtils();

const estimateTypes = [
  {
    estimateName: "heat",
    label: "Brunst",
    estimate: (individual: Individual, events: IndividualEvents) => {
      // After 21 days if not pregnant
      return daysAfter(events.heat, 21);
    },
  },
  {
    estimateName: "insemination",
    label: "Inseminering",
    estimate: (individual: Individual, events: IndividualEvents) => {
      // 21 days after heat and > 40 days after birth
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
      // 35 days  after insemination and not pregnant
      return daysAfter(events.inseminated, 35);
    },
  },
  {
    estimateName: "birth",
    label: "Kalving",
    estimate: (individual: Individual, events: IndividualEvents) => {
      // Pregnant and 278 days after last insemination
      // If two inseminations in 2 days, use the first.
      if (!isAfter(events.pregnant, events.inseminated)) {
        return undefined;
      }
      return daysAfter(events.inseminated, 278);
    },
  },
  {
    estimateName: "dryOut",
    label: "Sining",
    estimate: (individual: Individual, events: IndividualEvents) => {
      // Not later than 60 days before birth
      // Warning 14 days before
      if (!isAfter(events.pregnant, events.inseminated)) {
        return undefined;
      }
      return daysAfter(events.inseminated, 218);
    },
  },
] as EstimateType[];

export default estimateTypes;
