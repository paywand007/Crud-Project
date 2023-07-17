import en from "./locales/en.json";
import ckb from "./locales/ckb.json";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "en", // Set the default locale to English
  fallbackLocale: "en",
  messages: {
    en,
    ckb,
  },
});

export default i18n;
