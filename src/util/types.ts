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

type StatusKeys = "accepted" | "pending" | "rejected";

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