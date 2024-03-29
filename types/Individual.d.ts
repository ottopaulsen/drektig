type Individual = {
  id: string;
  number: number;
  name: string;
  born: Timestamp | null;
  toBeTakenOut: boolean;
};

type IndividualNew = {
  number: number | null;
  name: string | null;
  born: Timestamp | null;
  toBeTakenOut: boolean;
};

export type { Individual, IndividualNew };
