import { createApp } from "vue";
import App from "./App.vue";

const extensionContainer = document.createElement("div");
extensionContainer.setAttribute("id", "kwery-extension-container");

document.body.appendChild(extensionContainer);

createApp(App).mount("#kwery-extension-container");

console.log("Hello from the content script 42", extensionContainer);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ping") {
        sendResponse({ active: true });
    }
});
