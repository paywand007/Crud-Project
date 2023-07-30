import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./plugins/veeValidate.ts";
import router from "./router.ts";
import i18n from "./plugins/i18n.ts";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(i18n);
app.use(vuetify).mount("#app");
