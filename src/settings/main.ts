import { createApp } from "vue";
import App from "./App.vue";
import debugLog from "@/utils/debugLog";

debugLog("Creating settings app");

createApp(App).mount("#app");
