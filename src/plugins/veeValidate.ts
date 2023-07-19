import { defineRule } from "vee-validate";
import { useI18n } from "vue-i18n";
import i18n from "../i18n.ts";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return i18n.global.t("require");
  }
  return true;
});
