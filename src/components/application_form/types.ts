
export interface CompetenceList {
    __typename: "CompetenceList"
    data: Array<Competence>
}

export interface Competence {
    areaOfExpertise: string,
    yearsOfExperience: number
}

export interface AvailabilityList {
    __typename: "AvailabilityList"
    data: Array<Availability>
}

export interface Availability {
    start: string,
    end: string
}