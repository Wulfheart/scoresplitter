import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";

let pinia = createPinia();

createApp(App).use(pinia).mount("#app");
