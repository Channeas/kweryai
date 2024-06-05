import { Event } from "@/types/Event";
import handleEvent from "./handleEvent";
import openWelcomePage from "./utils/openWelcomePage";
import handleNewContentScript from "./handleNewContentScript";
import handleStorageChanges from "./handleStorageChanges";

console.log("Service worker works");

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
