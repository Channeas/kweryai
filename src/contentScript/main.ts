import { createApp } from "vue";
import App from "./App.vue";
import debugLog from "@/utils/debugLog";

debugLog("Content script inserted. Attempting to create extension root");

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

debugLog("Extension root created and inserted");

// This prevents an initial transition on some elements when the stylesheet loads
styleSheet.onload = () => {
    debugLog("Stylesheet inserted. Creating chat app");

    createApp(App).mount(extensionContainer);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    debugLog("Content script received a message", message, sender);

    if (message.type === "ping") {
        sendResponse({ active: true });
    }
});
