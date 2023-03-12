type EventTypeHeat = { eventType: "heat"; label: "Brunst" };
type EventTypeInseminated = { eventType: "inseminated"; label: "Inseminert" };
type EventTypePregnant = { eventType: "pregnant"; label: "Drektig" };
type EventTypeDryOff = { eventType: "dryOff"; label: "Sining" };
type EventTypeBirth = { eventType: "birth"; label: "Kalving" };

type EventType =
  | EventTypeHeat
  | EventTypeInseminated
  | EventTypePregnant
  | EventTypeDryOff
  | EventTypeBirth;

export type {
  EventType,
  EventTypeHeat,
  EventTypeInseminated,
  EventTypePregnant,
  EventTypeDryOff,
  EventTypeBirth,
};
