import { IndividualEvents } from "~~/types/IndividualEvents";
import type { Individual } from "@/types/Individual";

const { daysAfter, isAfter } = useTimeUtils();

const estimateTypes = [
  {
    estimateName: "heat",
    label: "Brunst",
    estimate: (individual: Individual, events: IndividualEvents) => {
      // After 21 days if not pregnant
      // TODO: How long after birth?
      if (isPregnant(events)) {
        return undefined;
      }
      return daysAfter(events.heat, 21);
    },
  },
  {
    estimateName: "inseminated",
    label: "Inseminering",
    estimate: (individual: Individual, events: IndividualEvents) => {
      // 21 days after heat and > 40 days after birth
      if (individual.toBeTakenOut) {
        return undefined;
      }
      if (isPregnant(events)) {
        return undefined;
      }
      if (isInseminated(events)) {
        return undefined;
      }
      let inseminationDate = daysAfter(events.heat, 21);
      if (!events.birth) {
        return inseminationDate;
      }
      const earliest = daysAfter(events.birth, 40);
      while (isAfter(earliest, inseminationDate)) {
        inseminationDate = daysAfter(inseminationDate, 21);
      }
      return inseminationDate;
    },
  },
  {
    estimateName: "pregnancyCheck",
    label: "Drektighetskontroll",
    estimate: (individual: Individual, events: IndividualEvents) => {
      // 35 days  after inseminated and not pregnant
      return isInseminated(events) ? daysAfter(events.inseminated, 35) : undefined;
    },
  },
  {
    estimateName: "birth",
    label: "Kalving",
    estimate: (individual: Individual, events: IndividualEvents) => {
      // Pregnant and 278 days after last inseminated
      // TODO: If two inseminations in 2 days, use the first.
      return isPregnant(events) ? daysAfter(events.inseminated, 278) : undefined;
    },
  },
  {
    estimateName: "dryOut",
    label: "Sining",
    estimate: (individual: Individual, events: IndividualEvents) => {
      // Not later than 60 days before birth
      // Warning 14 days before
      return isPregnant(events) ? daysAfter(events.inseminated, 218) : undefined;
    },
  },
] as EstimateType[];

function isPregnant(events: IndividualEvents): boolean {
  return !!events.pregnant && (!events.birth || events.birth < events.pregnant);
}
function isInseminated(events: IndividualEvents): boolean {
  return (
    !!events.inseminated &&
    !isPregnant(events) &&
    (!events.birth || isAfter(events.inseminated, events.birth))
  );
}

export default estimateTypes;
