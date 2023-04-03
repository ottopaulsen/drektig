type EstimateType = {
  estimateName: EstimateName;
  label: string;
  estimate: (individual: Individual, events: IndividualEvents) => Date | undefined;
};
