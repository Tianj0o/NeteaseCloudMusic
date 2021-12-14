import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "./store";
import "normalize.css";
import "@/assets/css/icon.css";
import "@/assets/css/normal.css";
import { setupStore } from "./store";
import { setupRouters } from "./config";
const app = createApp(App);
setupRouters();
app.use(router);
app.use(pinia);
setupStore();

app.mount("#app");
