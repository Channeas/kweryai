import { createApp } from "vue";
import App from "./App.vue";
import ChatApp from "@/contentScript/App.vue";
import createExtensionContainerAndRoot from "@/utils/createExtensionContainerAndRoot";

createApp(App).mount("#app");

let hasCreatedChat = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ping") {
        sendResponse({ active: hasCreatedChat });
    }

    if (message.type === "showChatOnWelcomePage") {
        if (hasCreatedChat) return;

        const { extensionContainer, extensionRoot } =
            createExtensionContainerAndRoot();

        document.body.appendChild(extensionRoot);

        createApp(ChatApp).mount(extensionContainer);

        hasCreatedChat = true;
    }
});
