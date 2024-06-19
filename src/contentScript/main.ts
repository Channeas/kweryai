import { createApp } from "vue";
import App from "./App.vue";

const extensionRoot = document.createElement("div");
extensionRoot.setAttribute("id", "kwery-extension-root");
const shadow = extensionRoot.attachShadow({ mode: "open" });

const extensionContainer = document.createElement("div");
extensionContainer.setAttribute("id", "kwery-extension-container");
shadow.appendChild(extensionContainer);

const styleSheet = document.createElement("link");
styleSheet.setAttribute("rel", "stylesheet");
styleSheet.setAttribute("href", chrome.runtime.getURL("css/script.css"));
shadow.appendChild(styleSheet);

document.body.appendChild(extensionRoot);

// This prevents an initial transition on some elements when the stylesheet loads
styleSheet.onload = () => {
    createApp(App).mount(extensionContainer);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ping") {
        sendResponse({ active: true });
    }
});
