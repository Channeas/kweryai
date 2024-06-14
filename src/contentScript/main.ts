import { createApp } from "vue";
import App from "./App.vue";
import createExtensionContainerAndRoot from "@/utils/createExtensionContainerAndRoot";

const { extensionContainer, extensionRoot } = createExtensionContainerAndRoot();

document.body.appendChild(extensionRoot);

createApp(App).mount(extensionContainer);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ping") {
        sendResponse({ active: true });
    }
});
