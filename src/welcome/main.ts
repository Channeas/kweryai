import { createApp } from "vue";
import App from "./App.vue";
import debugLog from "@/utils/debugLog";

debugLog("Creating welcome app");

createApp(App).mount("#app");

let hasCreatedChat = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    debugLog("Welcome page received a message", message, sender);

    if (message.type === "showChatOnWelcomePage") {
        if (hasCreatedChat) return;

        debugLog("Inserting chat via content script");

        const script = document.createElement("script");
        script.setAttribute("src", chrome.runtime.getURL("js/script.js"));
        script.onload = () => sendResponse();

        document.body.appendChild(script);
        hasCreatedChat = true;

        return true;
    }
});
