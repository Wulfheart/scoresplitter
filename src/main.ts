import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css"; // optional for styling

let pinia = createPinia();

createApp(App).use(pinia).use(VueTippy).mount("#app");
