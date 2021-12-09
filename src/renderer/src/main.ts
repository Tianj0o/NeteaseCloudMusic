import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "./store";
import "normalize.css";
import "@/assets/css/icon.css";
import { setupStore } from "./store";
import { setupRouters } from "./config";
const app = createApp(App);

app.use(router);
app.use(pinia);
setupStore();
setupRouters();
app.mount("#app");
