import { Event } from "@/types/Event";
import handleEvent from "./handleEvent";
import handleNewContentScript from "./handleNewContentScript";
import handleStorageChanges from "./handleStorageChanges";
import insertContentScript from "./utils/insertContentScript";
import openWelcomePage from "./utils/openWelcomePage";

console.log("Service worker works");

chrome.action.onClicked.addListener(async (tab) => {
    if (!tab?.id) return;
    await insertContentScript(tab.id, tab.url);
});

const contextMenuInsertId = "insertKweryAI";

chrome.contextMenus.create({
    documentUrlPatterns: [
        "*://*/*",
        `chrome-extension://${chrome.runtime.id}/welcome.html`
    ],
    id: contextMenuInsertId,
    title: "Insert KweryAI chat"
});

chrome.contextMenus.onClicked.addListener(async ({ menuItemId }, tab) => {
    switch (menuItemId) {
        case contextMenuInsertId:
            if (!tab?.id) break;
            await insertContentScript(tab.id, tab.url);
            break;
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.isEvent) {
        handleEvent(message.eventBody as Event, sender, sendResponse);
        return true;
    }

    if (message.isContentScriptSetup) {
        handleNewContentScript(sender);
    }
});

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        openWelcomePage();
    }
});

chrome.storage.local.onChanged.addListener(async (changes) => {
    handleStorageChanges(changes);
});
