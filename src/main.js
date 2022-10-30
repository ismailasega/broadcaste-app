import { createApp } from "vue";
import { createPinia } from "pinia";
import router from './router/routes'
import App from "./App.vue";

import "./assets/css/main.css";

const app = createApp(App);

app.use(router)

app.use(createPinia());

app.mount("#app");
