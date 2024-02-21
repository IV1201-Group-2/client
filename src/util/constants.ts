import type { Statuses } from "./types";

/**
 * Contains the i18n key, icon and color used for initalizing Vuetify chips describing the various application statuses.
 */
export const statuses: Statuses = {
  accept: {
    i18nPath: "accept",
    icon: "mdi-check-circle",
    color: "success"
  },
  pending: {
    i18nPath: "pending",
    icon: "mdi-minus-circle",
    color: "orange"
  },
  reject: {
    i18nPath: "reject",
    icon: "mdi-close-circle",
    color: "red"
  }
};
