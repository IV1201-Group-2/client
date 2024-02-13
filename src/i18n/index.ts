import { createI18n, useI18n } from "vue-i18n"
import en from "./locales/en.json"
import sv from "./locales/sv.json"

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  warnHtmlMessage: false,
  legacy: false,
  globalInjection: true,
  messages: { en, sv }
})
