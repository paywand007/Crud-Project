import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./plugins/veeValidate.ts";
import routes from "./plugins/router";
import i18n from "./i18n.ts";

createApp(App).use(routes).use(vuetify).use(i18n).mount("#app");
