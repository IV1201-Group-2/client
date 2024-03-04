/**
 * Specifies the parameters required for registering a user.
 */
export interface RegistrationForm {
  name: string;
  surname: string;
  email: string;
  pnr: string;
  username: string;
  password: string;
}

export type StatusKeys = "accept" | "pending" | "reject";

/**
 * Specifies the statuses an application be set to by the recruiter.
 */
export type Statuses = {
  [status in StatusKeys]: {
    i18nPath: string;
    icon: string;
    color: string;
  };
};

/**
 * Specifies a row in the admin panel list of applications
 */
export interface ApplicantRow {
  personal_info: {
    name: string;
    surname: string;
    person_id: number;
    pnr: string;
    email: string;
  };
  competences: {
    competence_id: number;
    years_of_experience: number;
  }[];
  availabilities: {
    from_date: string;
    to_date: string;
  }[];
  status: "Pending" | "Reject" | "Accept" | "UNHANDLED";
  actions: "mdi-eye";
}

/**
 * Specifies a competence item in a format persistable by the database
 */
export interface CompetenceIdAndYears {
  competence_id: number;
  years_of_experience: number;
}

/**
 * Specifies a competence item in a format that can be rendered on the client
 */
export interface CompetenceIdAndI18nKey extends Omit<CompetenceIdAndYears, "years_of_experience"> {
  i18n_key: string;
}
