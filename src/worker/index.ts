import { Event } from "@/types/Event";
import handleEvent from "./handleEvent";
import handleNewContentScript from "./handleNewContentScript";
import handleStorageChanges from "./handleStorageChanges";
import insertContentScript from "./utils/insertContentScript";
import openWelcomePage from "./utils/openWelcomePage";
import sendNotification from "@/utils/sendNotification";

console.log("Service worker works");

chrome.action.onClicked.addListener(async (tab) => {
    if (!tab?.id) return;

    const isChromePage = tab.url?.startsWith("chrome://");
    if (isChromePage) {
        sendNotification(
            "Unable to insert chat",
            "Unfortunately KweryAI does not work on Chrome pages"
        );
        return;
    }

    await insertContentScript(tab.id);
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
