import { createApp } from "vue";
import App from "./App.vue";

const extensionContainer = document.createElement("div");
extensionContainer.setAttribute("id", "extensionContainer");

document.body.appendChild(extensionContainer);

createApp(App).mount("#extensionContainer");

console.log("Hello from the content script 42", extensionContainer);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ping") {
        sendResponse({ active: true });
    }
});
