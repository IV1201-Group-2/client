import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import vuetify from "./vuetify";
const app = createApp({
  ...App
});

export const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(i18n);

app.mount("#app");
