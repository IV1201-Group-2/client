import type { Statuses } from "./types";

/**
 * Contains the i18n key, icon and color used for initalizing Vuetify chips describing the various application statuses.
 */
export const statuses: Statuses = {
  accepted: {
    i18nPath: "accepted",
    icon: "mdi-check-circle",
    color: "success"
  },
  pending: {
    i18nPath: "pending",
    icon: "mdi-minus-circle",
    color: "orange"
  },
  rejected: {
    i18nPath: "rejected",
    icon: "mdi-close-circle",
    color: "red"
  }
};
