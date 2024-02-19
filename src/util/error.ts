/**
 * Specifies errors that can be returned from backend APIs.
 */
export enum RESTError {
  /* Common errors */
  None = "none",
  Unknown = "UNKNOWN",
  MissingParameters = "MISSING_PARAMETERS",

  /* Registration */
  InvalidEmail = "INVALID_EMAIL",
  UsernameTaken = "USERNAME_TAKEN",
  EmailTaken = "EMAIL_TAKEN",
  PnrTaken = "PNR_TAKEN",

  /* Login */
  MissingPassword = "MISSING_PASSWORD",
  WrongIdentity = "WRONG_IDENTITY",
  WrongPassword = "WRONG_PASSWORD",
  AlreadyLoggedIn = "ALREADY_LOGGED_IN"
}
