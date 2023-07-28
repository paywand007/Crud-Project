// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDataTable } from "vuetify/labs/VDataTable";
import { VDataIterator } from "vuetify/labs/VDataIterator";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { useI18n } from "vue-i18n";

import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import i18n from "./i18n.ts";

export default createVuetify({
  components: {
    VDataTable,
    VDataIterator,
    ...components,
  },
  directives,
  locale: {
    // Set the available languages
    adapter: createVueI18nAdapter({ i18n, useI18n }),
    rtl: {
      ckb: true,
    },
  },
});
