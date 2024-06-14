import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

let hasCreatedChat = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "showChatOnWelcomePage") {
        if (hasCreatedChat) return;

        const script = document.createElement("script");
        script.setAttribute("src", chrome.runtime.getURL("js/script.js"));
        script.onload = () => sendResponse();

        document.body.appendChild(script);
        hasCreatedChat = true;

        return true;
    }
});
