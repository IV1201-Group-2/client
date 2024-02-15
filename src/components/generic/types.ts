export interface CompetenceList {
  __typename: "CompetenceList";
  data: Array<Competence>;
}

export interface Competence {
  areaOfExpertise: string;
  yearsOfExperience: number;
}

export interface AvailabilityList {
  __typename: "AvailabilityList";
  data: Array<Availability>;
}

export interface Availability {
  start: string;
  end: string;
}

export const emptyCompetenceList = { data: [], __typename: "CompetenceList" } as CompetenceList;
export const emptyAvailabilityList = { data: [], __typename: "AvailabilityList" } as AvailabilityList;
